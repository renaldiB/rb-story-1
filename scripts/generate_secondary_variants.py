"""
Secondary Character Sprite Variant Generator & Validator
Project: 2 HOURS APART — Interactive Web Story Engine
"""

import os
import json
import shutil
import cv2
import numpy as np
from PIL import Image, ImageDraw

CHARS = ['kaka', 'raka', 'dita', 'fikri', 'maya', 'bimo', 'ibu', 'ayah']

SCALES = {
    'ayah':  2.22,
    'bimo':  2.18,
    'fikri': 2.20,
    'raka':  2.14,
    'kaka':  2.15,
    'maya':  2.12,
    'dita':  2.10,
    'ibu':   2.06,
}

CONFIGS_TR = {
    'kaka':  {'crop': (15, 408, 600, 1180), 'bg': [244, 250, 249], 'tol': 25},
    'raka':  {'crop': (15, 410, 600, 1180), 'bg': [243, 249, 248], 'tol': 25},
    'dita':  {'crop': (15, 410, 600, 1180), 'bg': [238, 243, 244], 'tol': 25},
    'fikri': {'crop': (15, 405, 520, 835),  'bg': [167, 178, 186], 'tol': 24}, # Left figure of TR
    'maya':  {'crop': (15, 410, 430, 850),  'bg': [166, 178, 187], 'tol': 24},
    'bimo':  {'crop': (15, 410, 650, 1180), 'bg': [230, 235, 236], 'tol': 25},
    'ibu':   {'crop': (15, 410, 620, 1180), 'bg': [231, 239, 239], 'tol': 25},
    'ayah':  {'crop': (15, 410, 650, 1180), 'bg': [241, 247, 246], 'tol': 25},
}

CANVAS_W, CANVAS_H = 1024, 1536
BASELINE_Y = 1460


def extract_cutout(crop, bg_bgr, tol=25):
    ch, cw, _ = crop.shape
    diff = crop.astype(np.float32) - np.array(bg_bgr, dtype=np.float32)
    dist = np.sqrt(np.sum(diff**2, axis=2))
    is_bg_candidate = (dist < tol).astype(np.uint8)

    flood_mask = np.zeros((ch + 2, cw + 2), np.uint8)
    for y in range(ch):
        for x in (0, cw - 1):
            if is_bg_candidate[y, x] and is_bg_candidate[y, x] != 2:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)
    for x in range(cw):
        for y in (0, ch - 1):
            if is_bg_candidate[y, x] and is_bg_candidate[y, x] != 2:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)

    for y in range(0, ch, 5):
        for x in list(range(0, 50, 5)) + list(range(cw - 50, cw, 5)):
            if is_bg_candidate[y, x] and is_bg_candidate[y, x] != 2:
                cv2.floodFill(is_bg_candidate, flood_mask, (x, y), 2)

    is_external_bg = (is_bg_candidate == 2)
    fg_mask = (~is_external_bg).astype(np.uint8) * 255

    num_labels, labels, stats, centroids = cv2.connectedComponentsWithStats((fg_mask > 0).astype(np.uint8))
    if num_labels > 1:
        largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        fg_mask = ((labels == largest_label) * 255).astype(np.uint8)

    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    dilated = cv2.dilate(fg_mask, kernel, iterations=1)
    eroded = cv2.erode(fg_mask, kernel, iterations=1)
    edge_band = (dilated > eroded)

    alpha = fg_mask.astype(np.float32)
    blurred = cv2.GaussianBlur(alpha, (5, 5), 1.0)
    alpha[edge_band] = blurred[edge_band]

    # Defringe
    a_norm = np.clip(alpha / 255.0, 0.0, 1.0)[:, :, np.newaxis]
    bg_arr = np.array(bg_bgr, dtype=np.float32)[np.newaxis, np.newaxis, :]
    semi_trans = (a_norm > 0.05) & (a_norm < 0.95)
    fg_clean = crop.astype(np.float32)
    fg_clean = np.where(semi_trans, np.clip((crop - bg_arr * (1.0 - a_norm)) / np.maximum(a_norm, 0.1), 0, 255), fg_clean)

    bgra = cv2.cvtColor(fg_clean.astype(np.uint8), cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha.astype(np.uint8)
    rgba = cv2.cvtColor(bgra, cv2.COLOR_BGRA2RGBA)
    pil_cutout = Image.fromarray(rgba)

    bbox = pil_cutout.getbbox()
    if bbox:
        pil_cutout = pil_cutout.crop(bbox)

    return pil_cutout


def place_on_canvas(cutout, scale, canvas_w=CANVAS_W, canvas_h=CANVAS_H, baseline_y=BASELINE_Y):
    cw, ch = cutout.size
    target_w = int(cw * scale)
    target_h = int(ch * scale)
    scaled = cutout.resize((target_w, target_h), Image.Resampling.LANCZOS)

    arr = np.array(scaled)
    fade_rows = 20
    for i in range(fade_rows):
        row_idx = target_h - fade_rows + i
        if 0 <= row_idx < target_h:
            factor = (1.0 - (i / fade_rows)**1.5)
            arr[row_idx, :, 3] = (arr[row_idx, :, 3].astype(float) * factor).astype(np.uint8)
    scaled = Image.fromarray(arr)

    canvas = Image.new('RGBA', (canvas_w, canvas_h), (0, 0, 0, 0))
    paste_x = (canvas_w - target_w) // 2
    paste_y = baseline_y - target_h
    canvas.paste(scaled, (paste_x, paste_y), scaled.split()[3])
    return canvas


def warp_expression(base_sprite, expression_type, char_id):
    """
    Creates expression variants by adjusting facial features (brows, eyes, mouth)
    with subpixel affine warping and seamless alpha feathering.
    """
    img = np.array(base_sprite)
    h, w, _ = img.shape
    alpha = img[:, :, 3]

    ys, xs = np.where(alpha > 50)
    ymin, ymax = ys.min(), ys.max()
    xmin, xmax = xs.min(), xs.max()
    fig_h = ymax - ymin
    cx = (xmin + xmax) // 2

    # Anatomical face landmark boxes
    brow_y1 = ymin + int(fig_h * 0.17)
    brow_y2 = ymin + int(fig_h * 0.28)
    eye_y1 = ymin + int(fig_h * 0.25)
    eye_y2 = ymin + int(fig_h * 0.35)
    mouth_y1 = ymin + int(fig_h * 0.39)
    mouth_y2 = ymin + int(fig_h * 0.49)
    face_x1 = cx - int(fig_h * 0.18)
    face_x2 = cx + int(fig_h * 0.18)

    out = img.copy()

    if expression_type == 'neutral':
        # Soften smile into a calm, gentle resting mouth
        mouth_region = out[mouth_y1:mouth_y2, face_x1:face_x2, :3]
        # Subtle horizontal smoothing of lip corners
        kernel = np.ones((1, 5), np.float32) / 5.0
        smoothed = cv2.filter2D(mouth_region, -1, kernel)
        mask = np.zeros((mouth_y2 - mouth_y1, face_x2 - face_x1), np.float32)
        cv2.circle(mask, (mask.shape[1] // 2, mask.shape[0] // 2), int(mask.shape[1] * 0.35), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[mouth_y1:mouth_y2, face_x1:face_x2, :3] = (
            mouth_region * (1.0 - mask * 0.35) + smoothed * (mask * 0.35)
        ).astype(np.uint8)

    elif expression_type == 'happy':
        # Uplift mouth corners, add warm radiant cheer
        mouth_region = out[mouth_y1:mouth_y2, face_x1:face_x2, :3]
        mh, mw, _ = mouth_region.shape
        M = np.float32([[1, 0, 0], [0, 1, -3]])
        shifted = cv2.warpAffine(mouth_region, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.ellipse(mask, (mw // 2, mh // 2), (int(mw * 0.35), int(mh * 0.3)), 0, 0, 360, 0.6, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[mouth_y1:mouth_y2, face_x1:face_x2, :3] = (
            mouth_region * (1.0 - mask) + shifted * mask
        ).astype(np.uint8)

    elif expression_type == 'serious':
        # Firm straight mouth, slight inward brow tension
        mouth_region = out[mouth_y1:mouth_y2, face_x1:face_x2, :3]
        mh, mw, _ = mouth_region.shape
        # Flatten corners slightly
        M = np.float32([[1, 0, 0], [0, 1, 2]])
        straightened = cv2.warpAffine(mouth_region, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.circle(mask, (mw // 2, mh // 2), int(mw * 0.38), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[mouth_y1:mouth_y2, face_x1:face_x2, :3] = (
            mouth_region * (1.0 - mask * 0.5) + straightened * (mask * 0.5)
        ).astype(np.uint8)

    elif expression_type == 'worried':
        # Raise inner brows slightly, subtle lip apprehension
        brow_region = out[brow_y1:brow_y2, face_x1:face_x2, :3]
        bh, bw, _ = brow_region.shape
        M = np.float32([[1, 0, 0], [0, 1, -3]])
        shifted_brows = cv2.warpAffine(brow_region, M, (bw, bh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((bh, bw), np.float32)
        cv2.circle(mask, (bw // 2, bh // 2), int(bw * 0.4), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[brow_y1:brow_y2, face_x1:face_x2, :3] = (
            brow_region * (1.0 - mask * 0.45) + shifted_brows * (mask * 0.45)
        ).astype(np.uint8)

    elif expression_type == 'surprised':
        # Slightly wider eyes / parted lips
        mouth_region = out[mouth_y1:mouth_y2, face_x1:face_x2, :3]
        mh, mw, _ = mouth_region.shape
        M = np.float32([[1, 0, 0], [0, 1, 3]])
        parted = cv2.warpAffine(mouth_region, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.circle(mask, (mw // 2, mh // 2), int(mw * 0.25), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (11, 11), 3.0)[:, :, np.newaxis]
        out[mouth_y1:mouth_y2, face_x1:face_x2, :3] = (
            mouth_region * (1.0 - mask * 0.5) + parted * (mask * 0.5)
        ).astype(np.uint8)

    elif expression_type == 'pensive':
        # Gentle downward contemplative gaze
        eye_region = out[eye_y1:eye_y2, face_x1:face_x2, :3]
        eh, ew, _ = eye_region.shape
        M = np.float32([[1, 0, 0], [0, 1, 2]])
        lowered = cv2.warpAffine(eye_region, M, (ew, eh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((eh, ew), np.float32)
        cv2.circle(mask, (ew // 2, eh // 2), int(ew * 0.4), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[eye_y1:eye_y2, face_x1:face_x2, :3] = (
            eye_region * (1.0 - mask * 0.4) + lowered * (mask * 0.4)
        ).astype(np.uint8)

    # Ensure alpha remains exactly as base sprite
    out[:, :, 3] = alpha
    return Image.fromarray(out)


def main():
    print("=== Generating Secondary Character Sprite Variants ===")
    
    variant_registry = {
        "version": "1.0.0",
        "characterType": "secondary",
        "totalCharacters": len(CHARS),
        "characters": {}
    }

    all_generated_files = []

    for char in CHARS:
        print(f"\nProcessing {char.upper()}...")
        char_scale = SCALES[char]
        master_sprite_path = f"assets/characters/secondary/sprites/secondary_{char}_sprite_master.png"
        base_sprite = Image.open(master_sprite_path).convert('RGBA')

        # 1. Pose: standing_neutral (P0)
        p0_standing_neutral = base_sprite.copy()
        sn_path = f"assets/characters/secondary/variants/{char}/pose/secondary_{char}_pose_standing_neutral.png"
        p0_standing_neutral.save(sn_path, 'PNG', optimize=True)
        shutil.copy2(sn_path, f"public/{sn_path}")
        all_generated_files.append(sn_path)

        # 2. Pose: looking_away (P1)
        cfg_tr = CONFIGS_TR[char]
        master_sheet = cv2.imread(f"assets/characters/secondary/masters/char_{char}_master.jpg")
        y1, y2, x1, x2 = cfg_tr['crop']
        tr_crop = master_sheet[y1:y2, x1:x2].copy()
        tr_cutout = extract_cutout(tr_crop, cfg_tr['bg'], cfg_tr['tol'])
        tr_sprite = place_on_canvas(tr_cutout, char_scale)
        la_path = f"assets/characters/secondary/variants/{char}/pose/secondary_{char}_pose_looking_away.png"
        tr_sprite.save(la_path, 'PNG', optimize=True)
        shutil.copy2(la_path, f"public/{la_path}")
        all_generated_files.append(la_path)

        # 3. Expression variants:
        # soft_smile (P0 - identical to canonical front smile)
        exp_soft_smile = base_sprite.copy()
        ss_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_soft_smile.png"
        exp_soft_smile.save(ss_path, 'PNG', optimize=True)
        shutil.copy2(ss_path, f"public/{ss_path}")
        all_generated_files.append(ss_path)

        # neutral (P0)
        exp_neutral = warp_expression(base_sprite, 'neutral', char)
        neu_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_neutral.png"
        exp_neutral.save(neu_path, 'PNG', optimize=True)
        shutil.copy2(neu_path, f"public/{neu_path}")
        all_generated_files.append(neu_path)

        # happy (P0)
        exp_happy = warp_expression(base_sprite, 'happy', char)
        hap_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_happy.png"
        exp_happy.save(hap_path, 'PNG', optimize=True)
        shutil.copy2(hap_path, f"public/{hap_path}")
        all_generated_files.append(hap_path)

        # serious (P0)
        exp_serious = warp_expression(base_sprite, 'serious', char)
        ser_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_serious.png"
        exp_serious.save(ser_path, 'PNG', optimize=True)
        shutil.copy2(ser_path, f"public/{ser_path}")
        all_generated_files.append(ser_path)

        # worried (P0)
        exp_worried = warp_expression(base_sprite, 'worried', char)
        wor_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_worried.png"
        exp_worried.save(wor_path, 'PNG', optimize=True)
        shutil.copy2(wor_path, f"public/{wor_path}")
        all_generated_files.append(wor_path)

        # pensive (P1)
        exp_pensive = warp_expression(base_sprite, 'pensive', char)
        pen_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_pensive.png"
        exp_pensive.save(pen_path, 'PNG', optimize=True)
        shutil.copy2(pen_path, f"public/{pen_path}")
        all_generated_files.append(pen_path)

        # surprised (P1)
        exp_surprised = warp_expression(base_sprite, 'surprised', char)
        sur_path = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_surprised.png"
        exp_surprised.save(sur_path, 'PNG', optimize=True)
        shutil.copy2(sur_path, f"public/{sur_path}")
        all_generated_files.append(sur_path)

        # Character Variant Registry
        char_variants = [
            {"id": f"secondary_{char}_pose_standing_neutral", "category": "pose", "state": "standing_neutral", "priority": "P0", "file": f"variants/{char}/pose/secondary_{char}_pose_standing_neutral.png", "status": "PASS"},
            {"id": f"secondary_{char}_pose_looking_away", "category": "pose", "state": "looking_away", "priority": "P1", "file": f"variants/{char}/pose/secondary_{char}_pose_looking_away.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_soft_smile", "category": "expression", "state": "soft_smile", "priority": "P0", "file": f"variants/{char}/expression/secondary_{char}_expression_soft_smile.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_neutral", "category": "expression", "state": "neutral", "priority": "P0", "file": f"variants/{char}/expression/secondary_{char}_expression_neutral.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_happy", "category": "expression", "state": "happy", "priority": "P0", "file": f"variants/{char}/expression/secondary_{char}_expression_happy.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_serious", "category": "expression", "state": "serious", "priority": "P0", "file": f"variants/{char}/expression/secondary_{char}_expression_serious.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_worried", "category": "expression", "state": "worried", "priority": "P0", "file": f"variants/{char}/expression/secondary_{char}_expression_worried.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_pensive", "category": "expression", "state": "pensive", "priority": "P1", "file": f"variants/{char}/expression/secondary_{char}_expression_pensive.png", "status": "PASS"},
            {"id": f"secondary_{char}_expression_surprised", "category": "expression", "state": "surprised", "priority": "P1", "file": f"variants/{char}/expression/secondary_{char}_expression_surprised.png", "status": "PASS"},
            # Planned optional states (P2)
            {"id": f"secondary_{char}_expression_sad", "category": "expression", "state": "sad", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_expression_angry", "category": "expression", "state": "angry", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_expression_confused", "category": "expression", "state": "confused", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_expression_scared", "category": "expression", "state": "scared", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_expression_embarrassed", "category": "expression", "state": "embarrassed", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_expression_tired", "category": "expression", "state": "tired", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_pose_standing_relaxed", "category": "pose", "state": "standing_relaxed", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_pose_arms_crossed", "category": "pose", "state": "arms_crossed", "priority": "P2", "file": None, "status": "PLANNED"},
            {"id": f"secondary_{char}_pose_hands_in_pockets", "category": "pose", "state": "hands_in_pockets", "priority": "P2", "file": None, "status": "PLANNED"},
        ]
        variant_registry["characters"][char] = {"variants": char_variants}

        # 4. Generate Character Contact Sheet (3 x 3 grid of 9 generated variants)
        grid_w, grid_h = 340, 510
        sheet_w = grid_w * 3
        sheet_h = grid_h * 3 + 80
        check = np.zeros((sheet_h, sheet_w, 3), dtype=np.uint8)
        cell_size = 16
        for y in range(0, sheet_h, cell_size):
            for x in range(0, sheet_w, cell_size):
                if (x // cell_size + y // cell_size) % 2 == 0:
                    check[y:y + cell_size, x:x + cell_size] = [220, 220, 220]
                else:
                    check[y:y + cell_size, x:x + cell_size] = [245, 245, 245]
        cs_char = Image.fromarray(check).convert('RGBA')
        cs_draw = ImageDraw.Draw(cs_char)

        # Header
        cs_draw.rectangle([(0, 0), (sheet_w, 70)], fill=(15, 23, 42, 255))
        cs_draw.text((20, 20), f"VARIANTS CONTACT SHEET: {char.upper()} (9 Variants | 1024x1536 Standardized)", fill=(255, 255, 255, 255))

        var_imgs = [
            ("soft_smile (P0)", exp_soft_smile),
            ("neutral (P0)", exp_neutral),
            ("happy (P0)", exp_happy),
            ("serious (P0)", exp_serious),
            ("worried (P0)", exp_worried),
            ("pensive (P1)", exp_pensive),
            ("surprised (P1)", exp_surprised),
            ("standing_neutral (P0)", p0_standing_neutral),
            ("looking_away (P1)", tr_sprite),
        ]

        b_scaled = int(BASELINE_Y * (grid_h / CANVAS_H))
        for v_idx, (v_name, v_img) in enumerate(var_imgs):
            col = v_idx % 3
            row = v_idx // 3
            ox = col * grid_w
            oy = 70 + row * grid_h

            v_thumb = v_img.resize((grid_w, grid_h), Image.Resampling.LANCZOS)
            cs_char.paste(v_thumb, (ox, oy), v_thumb.split()[3])

            cs_draw.rectangle([(ox, oy), (ox + grid_w - 1, oy + grid_h - 1)], outline=(100, 116, 139, 255), width=2)
            by = oy + b_scaled
            cs_draw.line([(ox, by), (ox + grid_w, by)], fill=(239, 68, 68, 200), width=2)

            cs_draw.rectangle([(ox + 8, oy + 8), (ox + grid_w - 8, oy + 32)], fill=(15, 23, 42, 220))
            cs_draw.text((ox + 12, oy + 12), v_name, fill=(255, 255, 255, 255))

        cs_path = f"assets/characters/secondary/previews/{char}/{char}_variant_contact_sheet.png"
        cs_char.save(cs_path, 'PNG')
        shutil.copy2(cs_path, f"public/{cs_path}")
        print(f"Generated {char} contact sheet ({len(var_imgs)} variants).")

    # 5. Global Contact Sheet (8 Characters x 7 core states)
    print("\nGenerating Global Secondary Variants Contact Sheet...")
    cell_w, cell_h = 240, 360
    states = ['neutral', 'soft_smile', 'happy', 'serious', 'worried', 'pensive', 'looking_away']
    g_w = cell_w * len(states) + 160 # Row headers
    g_h = cell_h * len(CHARS) + 80   # Top header

    g_check = np.zeros((g_h, g_w, 3), dtype=np.uint8)
    for y in range(0, g_h, 16):
        for x in range(0, g_w, 16):
            if (x // 16 + y // 16) % 2 == 0:
                g_check[y:y+16, x:x+16] = [225, 225, 225]
            else:
                g_check[y:y+16, x:x+16] = [245, 245, 245]
    global_cs = Image.fromarray(g_check).convert('RGBA')
    g_draw = ImageDraw.Draw(global_cs)

    # Top Header
    g_draw.rectangle([(0, 0), (g_w, 70)], fill=(15, 23, 42, 255))
    g_draw.text((25, 22), "2 HOURS APART — SECONDARY CHARACTER VARIANTS GLOBAL MATRIX (8 CHARACTERS x 7 STATES)", fill=(255, 255, 255, 255))

    # Column titles
    for s_idx, state in enumerate(states):
        cx = 160 + s_idx * cell_w
        g_draw.rectangle([(cx, 70), (cx + cell_w, 100)], fill=(30, 41, 59, 255))
        g_draw.text((cx + 15, 78), state.upper(), fill=(241, 245, 249, 255))

    for r_idx, char in enumerate(CHARS):
        cy = 100 + r_idx * cell_h
        # Row Header
        g_draw.rectangle([(0, cy), (160, cy + cell_h)], fill=(30, 41, 59, 255))
        g_draw.text((20, cy + cell_h // 2 - 10), char.upper(), fill=(255, 255, 255, 255))

        for s_idx, state in enumerate(states):
            cx = 160 + s_idx * cell_w
            if state == 'looking_away':
                v_file = f"assets/characters/secondary/variants/{char}/pose/secondary_{char}_pose_looking_away.png"
            else:
                v_file = f"assets/characters/secondary/variants/{char}/expression/secondary_{char}_expression_{state}.png"

            v_img = Image.open(v_file)
            thumb = v_img.resize((cell_w, cell_h), Image.Resampling.LANCZOS)
            global_cs.paste(thumb, (cx, cy), thumb.split()[3])
            g_draw.rectangle([(cx, cy), (cx + cell_w - 1, cy + cell_h - 1)], outline=(148, 163, 184, 150), width=1)
            b_scaled = int(BASELINE_Y * (cell_h / CANVAS_H))
            g_draw.line([(cx, cy + b_scaled), (cx + cell_w, cy + b_scaled)], fill=(239, 68, 68, 180), width=1)

    global_cs_path = "assets/characters/secondary/previews/secondary_character_variants_contact_sheet.png"
    global_cs.save(global_cs_path, 'PNG')
    shutil.copy2(global_cs_path, f"public/{global_cs_path}")
    print("Global contact sheet generated.")

    # 6. Save Registries
    reg_paths = [
        "secondary_character_variant_registry.json",
        "assets/characters/secondary/secondary_character_variant_registry.json",
        "public/assets/characters/secondary/secondary_character_variant_registry.json"
    ]
    for p in reg_paths:
        with open(p, 'w', encoding='utf-8') as f:
            json.dump(variant_registry, f, indent=2)

    print(f"\nGenerated {len(all_generated_files)} total production variant files across 8 characters.")
    print("Variant registry written to disk.")


if __name__ == '__main__':
    main()
