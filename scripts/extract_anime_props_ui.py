"""
scripts/extract_anime_props_ui.py
Extracts props and UI from media_1791092106872.jpg with clean alpha.
"""

import os
import cv2
import numpy as np
from PIL import Image

REF_PATH = r"C:\Users\Z Series\.gemini\antigravity\brain\7334400d-5c1d-4d38-a574-9e1f74d38e63\.user_uploaded\media_1791092106872.jpg"
BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

def extract_from_dark(crop_bgr, threshold=20):
    # Black background extraction
    gray = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2GRAY)
    alpha = np.clip((gray.astype(np.float32) - threshold) / 30.0, 0.0, 1.0)
    alpha = (alpha * 255).astype(np.uint8)

    # Smooth alpha edges
    alpha = cv2.GaussianBlur(alpha, (3, 3), 0.5)

    bgra = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2BGRA)
    bgra[:, :, 3] = alpha
    rgba = cv2.cvtColor(bgra, cv2.COLOR_BGRA2RGBA)
    pil_img = Image.fromarray(rgba)
    bbox = pil_img.getbbox()
    if bbox:
        pil_img = pil_img.crop(bbox)
    return pil_img

def main():
    img = cv2.imread(REF_PATH)
    if img is None:
        print("Could not load reference image.")
        return

    items = {
        "prop_umbrella_black": ((185, 275, 870, 940), 2.5),
        "prop_umbrella_transparent": ((185, 275, 925, 985), 2.5),
        "prop_backpack_school": ((245, 315, 860, 915), 3.0),
        "prop_phone_anime": ((285, 340, 950, 980), 4.0),
        "prop_tumbler": ((325, 385, 890, 920), 4.0),
        "prop_notebook": ((340, 395, 920, 985), 3.5),
        "prop_station_sign": ((395, 455, 885, 980), 3.0),
        "ui_dialogue_box": ((610, 675, 660, 795), 2.5),
        "ui_choices": ((610, 675, 795, 900), 2.5),
        "ui_controls": ((605, 675, 910, 980), 2.5),
    }

    props_dir = os.path.join(BASE_DIR, "public", "assets", "props", "items")
    ui_dir = os.path.join(BASE_DIR, "public", "assets", "ui")
    os.makedirs(props_dir, exist_ok=True)
    os.makedirs(ui_dir, exist_ok=True)

    for name, (box, scale) in items.items():
        y1, y2, x1, x2 = box
        crop = img[y1:y2, x1:x2]
        extracted = extract_from_dark(crop)
        w, h = extracted.size
        upscaled = extracted.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)

        target_dir = ui_dir if "ui_" in name else props_dir
        png_path = os.path.join(target_dir, f"{name}.png")
        webp_path = os.path.join(target_dir, f"{name}.webp")

        upscaled.save(png_path, "PNG")
        upscaled.save(webp_path, "WEBP", quality=92)
        print(f"Saved {name}: {upscaled.size}")

if __name__ == "__main__":
    main()
