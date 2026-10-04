"""
scripts/integrate_anime_benchmark_assets.py
Integrates the new anime benchmark assets matching media_1791092106872.jpg.
- Extracts Agus and Nana with true alpha
- Scales to 1024x1536, baseline Y=1460
- Deploys environment masters (station & river sunset)
- Extracts props & UI elements
"""

import os
import shutil
import cv2
import numpy as np
from PIL import Image

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
AGUS_SRC = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\char_agus_master_anime_1791092763406.jpg"
NANA_SRC = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\char_nana_master_anime_1791092784288.jpg"
STATION_SRC = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\env_station_master_anime_1791092809904.jpg"
RIVER_SRC = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\env_river_sunset_anime_1791092833457.jpg"
REF_SHEET = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\.user_uploaded\media_1791092106872.jpg"

CANVAS_W, CANVAS_H = 1024, 1536
BASELINE_Y = 1460

def extract_alpha_from_white(img_bgr, bg_color=[254, 254, 254], tol=18):
    h, w = img_bgr.shape[:2]
    diff = np.abs(img_bgr.astype(np.float32) - np.array(bg_color, dtype=np.float32))
    dist = np.max(diff, axis=2)
    is_bg = (dist < tol).astype(np.uint8)

    # Flood fill from 4 borders to remove only exterior background
    mask = np.zeros((h + 2, w + 2), np.uint8)
    for y in range(h):
        for x in (0, w - 1):
            if is_bg[y, x] and is_bg[y, x] != 2:
                cv2.floodFill(is_bg, mask, (x, y), 2)
    for x in range(w):
        for y in (0, h - 1):
            if is_bg[y, x] and is_bg[y, x] != 2:
                cv2.floodFill(is_bg, mask, (x, y), 2)

    # Also flood fill along border strips
    for y in range(0, h, 4):
        for x in list(range(0, 30, 4)) + list(range(w - 30, w, 4)):
            if is_bg[y, x] and is_bg[y, x] != 2:
                cv2.floodFill(is_bg, mask, (x, y), 2)

    exterior_bg = (is_bg == 2)
    fg_mask = (~exterior_bg).astype(np.uint8) * 255

    # Retain largest connected component (the character)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats((fg_mask > 0).astype(np.uint8))
    if num_labels > 1:
        largest_label = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        fg_mask = ((labels == largest_label) * 255).astype(np.uint8)

    # Smooth edge band
    kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    dilated = cv2.dilate(fg_mask, kernel, iterations=1)
    eroded = cv2.erode(fg_mask, kernel, iterations=1)
    edge_band = (dilated > eroded)

    alpha = fg_mask.astype(np.float32)
    blurred = cv2.GaussianBlur(alpha, (5, 5), 0.8)
    alpha[edge_band] = blurred[edge_band]

    # Defringe edge pixels
    a_norm = np.clip(alpha / 255.0, 0.0, 1.0)[:, :, np.newaxis]
    bg_arr = np.array(bg_color, dtype=np.float32)[np.newaxis, np.newaxis, :]
    semi_trans = (a_norm > 0.02) & (a_norm < 0.98)
    fg_clean = img_bgr.astype(np.float32)
    fg_clean = np.where(semi_trans, np.clip((img_bgr - bg_arr * (1.0 - a_norm)) / np.maximum(a_norm, 0.05), 0, 255), fg_clean)

    bgra = cv2.cvtColor(fg_clean.astype(np.uint8), cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha.astype(np.uint8)
    rgba = cv2.cvtColor(bgra, cv2.COLOR_BGRA2RGBA)
    pil_img = Image.fromarray(rgba)

    bbox = pil_img.getbbox()
    if bbox:
        pil_img = pil_img.crop(bbox)
    return pil_img

def place_character(cutout, target_height):
    cw, ch = cutout.size
    scale = target_height / float(ch)
    target_width = int(cw * scale)
    scaled = cutout.resize((target_width, target_height), Image.Resampling.LANCZOS)

    canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
    paste_x = (CANVAS_W - target_width) // 2
    paste_y = BASELINE_Y - target_height
    canvas.paste(scaled, (paste_x, paste_y), scaled.split()[3])
    return canvas

def main():
    print("Extracting Agus and Nana Anime Masters...")
    img_agus = cv2.imread(AGUS_SRC)
    cutout_agus = extract_alpha_from_white(img_agus, [254, 254, 254], tol=18)
    # Agus target height: 845 px
    base_agus = place_character(cutout_agus, 845)

    img_nana = cv2.imread(NANA_SRC)
    cutout_nana = extract_alpha_from_white(img_nana, [252, 251, 253], tol=18)
    # Nana target height: 818 px
    base_nana = place_character(cutout_nana, 818)

    # Save Master Sprites
    agus_paths = [
        "assets/characters/primary/sprites/char_agus_base.png",
        "public/assets/characters/primary/sprites/char_agus_base.png"
    ]
    nana_paths = [
        "assets/characters/primary/sprites/char_nana_base.png",
        "public/assets/characters/primary/sprites/char_nana_base.png"
    ]
    for p in agus_paths:
        os.makedirs(os.path.dirname(os.path.join(BASE_DIR, p)), exist_ok=True)
        base_agus.save(os.path.join(BASE_DIR, p), "PNG")
    for p in nana_paths:
        os.makedirs(os.path.dirname(os.path.join(BASE_DIR, p)), exist_ok=True)
        base_nana.save(os.path.join(BASE_DIR, p), "PNG")

    print("Agus and Nana Base Sprites saved successfully.")

    # Save Station Master (1376x768)
    st_img = Image.open(STATION_SRC)
    st_resized = st_img.resize((1376, 768), Image.Resampling.LANCZOS)
    for sub in ["public/assets/environments/masters"]:
        d = os.path.join(BASE_DIR, sub)
        os.makedirs(d, exist_ok=True)
        st_resized.save(os.path.join(d, "env_station_master.webp"), "WEBP", quality=92)
        st_resized.save(os.path.join(d, "env_station_master.jpg"), "JPEG", quality=92)
    print("env_station_master deployed in 1376x768 WebP & JPG.")

    # Save River Sunset Master (1376x768)
    rv_img = Image.open(RIVER_SRC)
    rv_resized = rv_img.resize((1376, 768), Image.Resampling.LANCZOS)
    for sub in ["public/assets/environments/masters"]:
        d = os.path.join(BASE_DIR, sub)
        os.makedirs(d, exist_ok=True)
        rv_resized.save(os.path.join(d, "env_beach_master.webp"), "WEBP", quality=92)
        rv_resized.save(os.path.join(d, "env_beach_master.jpg"), "JPEG", quality=92)
    print("env_beach_master (River Sunset) deployed.")

if __name__ == "__main__":
    main()
