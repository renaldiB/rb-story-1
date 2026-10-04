"""
repair_all_character_bases.py
Repairs and defringes base sprites for all 10 characters:
1. Reconstructs Nana's viewer-left shoulder seamlessly using symmetrical master crop.
2. Removes white halo / background bleed from hair and silhouettes across all characters.
3. Clears trapped background pockets (hair loops, under-arm gaps).
4. Saves defringed bases to both assets/ and public/assets/ directories.
"""

import os
import shutil
import hashlib
import cv2
import numpy as np
from PIL import Image

BASE_DIR = os.path.abspath(".")

def compute_sha256(path: str) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def decontaminate_edges(img_bgra: np.ndarray, bg_color_bgr=None, is_dark_hair=True) -> np.ndarray:
    """
    Decontaminates semi-transparent alpha fringes:
    - Inpaints edge RGB from the opaque core so boundary pixels contain zero background bleed.
    - Suppresses bright halo on dark hair.
    """
    b, g, r, a = cv2.split(img_bgra)
    h, w = a.shape
    
    # Clean very weak translucent noise
    a_clean = np.where(a <= 5, 0, a)
    
    # Opaque core mask where colors are 100% genuine
    core_mask = (a_clean >= 210).astype(np.uint8)
    
    # Edge mask needing color correction (semi-transparent boundary)
    edge_mask = ((a_clean > 0) & (a_clean < 210)).astype(np.uint8)
    
    bgr = cv2.merge([b, g, r])
    
    # Inpaint edge RGB from the opaque core using Navier-Stokes/Telea
    # This bleeds the genuine character color outwards over the alpha fringe
    bgr_inpainted = cv2.inpaint(bgr, edge_mask, 3, cv2.INPAINT_TELEA)
    
    # For dark hair, ensure hair edges don't retain any bright fringe
    if is_dark_hair:
        # Dark hair mask in opaque core
        dark_hair = (core_mask > 0) & (bgr[:, :, 2] < 95) & (bgr[:, :, 1] < 90) & (bgr[:, :, 0] < 90)
        dark_hair_dil = cv2.dilate(dark_hair.astype(np.uint8), cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (7, 7)))
        hair_edge = (dark_hair_dil > 0) & (a_clean > 0) & (a_clean < 240)
        
        # Clamp hair edge brightness to natural dark tones
        for c in range(3):
            bgr_inpainted[:, :, c] = np.where(hair_edge, np.minimum(bgr_inpainted[:, :, c], 55), bgr_inpainted[:, :, c])
            
    out_bgra = np.dstack([bgr_inpainted, a_clean])
    return out_bgra

def repair_nana_base():
    print("Repairing Nana Base Sprite...")
    master_path = os.path.join(BASE_DIR, "assets", "characters", "primary", "masters", "char_nana_master.png")
    master = cv2.imread(master_path)
    if master is None:
        raise FileNotFoundError(f"Missing Nana master: {master_path}")

    # Symmetrical crop around Nana's facial center (cx=440, y=21..512, x=200..680)
    crop = master[21:512, 200:680].copy()
    ch, cw, _ = crop.shape
    cx = cw // 2 # 240

    right_half = crop[:, cx:cw]
    left_mirror = cv2.flip(right_half, 1)

    # Clean dark hair artifact in left_mirror at x < 90, y > 330
    is_hair_in_mirror = (left_mirror[:, :, 0] < 100) & (left_mirror[:, :, 1] < 100) & (left_mirror[:, :, 2] < 120) & (np.arange(left_mirror.shape[1])[None, :] < 90) & (np.arange(left_mirror.shape[0])[:, None] > 330)
    left_mirror_clean = left_mirror.copy()
    for y in range(330, ch):
        for x in range(90):
            if is_hair_in_mirror[y, x]:
                left_mirror_clean[y, x] = left_mirror[y, min(x + 25, 120)]

    # Nana's own hair mask from crop connected to head
    is_hair = (crop[:, :, 2] < 110) & (crop[:, :, 1] < 90) & (crop[:, :, 0] < 80)
    num, labels, stats, centroids = cv2.connectedComponentsWithStats(is_hair.astype(np.uint8))
    top_labels = set(labels[21:60, 200:300].flatten()) - {0}
    nana_hair_mask = np.isin(labels, list(top_labels))

    res = crop.copy()
    for y in range(300, ch):
        for x in range(0, cx):
            if nana_hair_mask[y, x]:
                res[y, x] = crop[y, x]
            elif x > 210 and y < 380:
                w = (x - 210) / 30.0
                res[y, x] = np.clip(crop[y, x].astype(float) * w + left_mirror_clean[y, x].astype(float) * (1 - w), 0, 255).astype(np.uint8)
            else:
                res[y, x] = left_mirror_clean[y, x]

    # Background detection with strict tolerance 12
    bg_bgr = np.array([246, 251, 250], dtype=np.float32)
    diff = np.sqrt(np.sum((res.astype(np.float32) - bg_bgr)**2, axis=2))
    is_bg_candidate = (diff < 12).astype(np.uint8)

    flood_mask = np.zeros((ch + 2, cw + 2), np.uint8)
    for y in range(ch):
        for x in (0, cw - 1):
            if is_bg_candidate[y, x] and is_bg_candidate[y, x] != 2:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)
    for x in range(cw):
        for y in (0, ch - 1):
            if is_bg_candidate[y, x] and is_bg_candidate[y, x] != 2:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)

    # Clear trapped hair loops
    for y in range(250, 360, 2):
        for x in range(80, 130, 2):
            if is_bg_candidate[y, x] == 1 and diff[y, x] < 10:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)

    is_external_bg = (is_bg_candidate == 2)
    fg_mask = (~is_external_bg).astype(np.uint8) * 255

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats((fg_mask > 0).astype(np.uint8))
    if num_labels > 1:
        largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        fg_mask = ((labels == largest_label) * 255).astype(np.uint8)

    # Edge feather
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    eroded = cv2.erode(fg_mask, kernel, iterations=1)
    dilated = cv2.dilate(fg_mask, kernel, iterations=1)
    edge_band = (dilated > eroded)

    alpha = fg_mask.astype(np.float32)
    blurred = cv2.GaussianBlur(alpha, (5, 5), 1.0)
    alpha[edge_band] = blurred[edge_band]

    # Combine into BGRA
    bgra = np.dstack([res, alpha.astype(np.uint8)])
    bgra_clean = decontaminate_edges(bgra, bg_color_bgr=[246, 251, 250], is_dark_hair=True)

    cutout = Image.fromarray(cv2.cvtColor(bgra_clean, cv2.COLOR_BGRA2RGBA))

    # Scale to canonical size: 822 height, canvas 1024x1536, baseline Y=1460
    scale = 822.0 / cutout.height
    target_w = int(round(cutout.width * scale))
    scaled = cutout.resize((target_w, 822), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (1024, 1536), (0, 0, 0, 0))
    paste_x = (1024 - target_w) // 2
    paste_y = 1460 - 822
    canvas.paste(scaled, (paste_x, paste_y), scaled)

    # Save to both locations
    p1 = os.path.join(BASE_DIR, "assets", "characters", "primary", "sprites", "char_nana_base.png")
    p2 = os.path.join(BASE_DIR, "public", "assets", "characters", "primary", "sprites", "char_nana_base.png")
    canvas.save(p1, "PNG", optimize=True)
    canvas.save(p2, "PNG", optimize=True)
    print(f"  -> Saved Nana base: {p1} & {p2}")
    return canvas

def repair_agus_base():
    print("Repairing Agus Base Sprite...")
    p1 = os.path.join(BASE_DIR, "assets", "characters", "primary", "sprites", "char_agus_base.png")
    p2 = os.path.join(BASE_DIR, "public", "assets", "characters", "primary", "sprites", "char_agus_base.png")
    
    img = cv2.imread(p1, cv2.IMREAD_UNCHANGED)
    b, g, r, a = cv2.split(img)
    
    # 1. Clear the taupe background strip under Agus's arm (y: 710..940, x: 409..500)
    diff_bg = np.sqrt((b.astype(float) - 170)**2 + (g.astype(float) - 181)**2 + (r.astype(float) - 189)**2)
    arm_hole = (diff_bg < 30) & (np.arange(img.shape[0])[:, None] >= 710) & (np.arange(img.shape[0])[:, None] <= 940) & (np.arange(img.shape[1])[None, :] >= 409) & (np.arange(img.shape[1])[None, :] <= 505)
    a[arm_hole] = 0
    
    # 2. Decontaminate hair edges
    cleaned_bgra = decontaminate_edges(np.dstack([b, g, r, a]), bg_color_bgr=[170, 181, 189], is_dark_hair=True)
    
    pil_img = Image.fromarray(cv2.cvtColor(cleaned_bgra, cv2.COLOR_BGRA2RGBA))
    pil_img.save(p1, "PNG", optimize=True)
    pil_img.save(p2, "PNG", optimize=True)
    print(f"  -> Saved Agus base: {p1} & {p2}")
    return pil_img

def repair_secondary_bases():
    print("Repairing Secondary Character Base Sprites...")
    sec_chars = [
        ('kaka',  [244, 250, 249]),
        ('raka',  [243, 249, 248]),
        ('dita',  [238, 243, 244]),
        ('fikri', [167, 178, 186]),
        ('maya',  [166, 178, 187]),
        ('bimo',  [230, 235, 236]),
        ('ibu',   [231, 239, 239]),
        ('ayah',  [241, 247, 246]),
    ]
    for cid, bg_color in sec_chars:
        p1 = os.path.join(BASE_DIR, "assets", "characters", "secondary", "sprites", f"secondary_{cid}_sprite_master.png")
        p2 = os.path.join(BASE_DIR, "public", "assets", "characters", "secondary", "sprites", f"secondary_{cid}_sprite_master.png")
        if not os.path.exists(p1) and not os.path.exists(p2):
            continue
        read_path = p1 if os.path.exists(p1) else p2
        img = cv2.imread(read_path, cv2.IMREAD_UNCHANGED)
        
        # Decontaminate
        cleaned = decontaminate_edges(img, bg_color_bgr=bg_color, is_dark_hair=True)
        pil_img = Image.fromarray(cv2.cvtColor(cleaned, cv2.COLOR_BGRA2RGBA))
        
        if os.path.exists(os.path.dirname(p1)):
            pil_img.save(p1, "PNG", optimize=True)
        if os.path.exists(os.path.dirname(p2)):
            pil_img.save(p2, "PNG", optimize=True)
        print(f"  -> Decontaminated {cid.upper()}: {p2}")

def update_primary_sprite_registry():
    print("Updating primary character sprite registry...")
    nana_path = os.path.join(BASE_DIR, "assets", "characters", "primary", "sprites", "char_nana_base.png")
    agus_path = os.path.join(BASE_DIR, "assets", "characters", "primary", "sprites", "char_agus_base.png")
    
    nana_hash = compute_sha256(nana_path)
    agus_hash = compute_sha256(agus_path)
    
    reg_paths = [
        os.path.join(BASE_DIR, "primary_character_sprite_registry.json"),
        os.path.join(BASE_DIR, "assets", "characters", "primary", "manifests", "primary_character_sprite_registry.json"),
        os.path.join(BASE_DIR, "public", "assets", "characters", "primary", "manifests", "primary_character_sprite_registry.json"),
    ]
    
    for rp in reg_paths:
        if os.path.exists(rp):
            with open(rp, "r", encoding="utf-8") as f:
                data = json.load(f)
            data["characters"]["nana"]["checksumSha256"] = nana_hash
            data["characters"]["nana"]["fileSizeBytes"] = os.path.getsize(nana_path)
            data["characters"]["agus"]["checksumSha256"] = agus_hash
            data["characters"]["agus"]["fileSizeBytes"] = os.path.getsize(agus_path)
            with open(rp, "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2)
            print(f"  -> Updated registry: {rp}")
            
    # Also update validation script hash
    val_path = os.path.join(BASE_DIR, "scripts", "validate-primary-character-variants.ts")
    if os.path.exists(val_path):
        with open(val_path, "r", encoding="utf-8") as f:
            content = f.read()
        # Replace nana hash
        old_hash = "128138caf2c91b314c89fe5444abf4ed2623dcb27b7afc5bfc307b8ad22e59e1"
        if old_hash in content:
            content = content.replace(old_hash, nana_hash)
            with open(val_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  -> Updated {val_path} with new Nana hash: {nana_hash}")

    # Also update generate_primary_variants.py hash
    gen_path = os.path.join(BASE_DIR, "scripts", "generate_primary_variants.py")
    if os.path.exists(gen_path):
        with open(gen_path, "r", encoding="utf-8") as f:
            content = f.read()
        old_hash = "128138caf2c91b314c89fe5444abf4ed2623dcb27b7afc5bfc307b8ad22e59e1"
        if old_hash in content:
            content = content.replace(old_hash, nana_hash)
            with open(gen_path, "w", encoding="utf-8") as f:
                f.write(content)
            print(f"  -> Updated {gen_path} with new Nana hash: {nana_hash}")

if __name__ == "__main__":
    import json
    repair_nana_base()
    repair_agus_base()
    repair_secondary_bases()
    update_primary_sprite_registry()
    print("ALL BASE SPRITES SUCCESSFULLY REPAIRED AND DEFRINGED.")
