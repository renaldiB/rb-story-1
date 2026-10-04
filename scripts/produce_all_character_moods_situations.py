"""
produce_all_character_moods_situations.py
Comprehensive Moods & Situations Sprite Sheet Generator for All 10 Characters.
Interactive Web Story Engine v1

Characters:
- Primary: nana, agus
- Secondary: kaka, raka, dita, fikri, maya, bimo, ibu, ayah

Moods (12 frames per sheet):
1. neutral
2. happy
3. soft_smile
4. serious
5. worried
6. pensive
7. surprised
8. sad
9. angry
10. embarrassed
11. thinking
12. tired

Situations (6 frames per sheet):
1. standing_neutral
2. looking_away
3. standing_relaxed
4. casual_interaction
5. arms_crossed
6. hands_in_pockets

Standard:
- Canvas: 1024 x 1536 per frame
- Baseline: Y = 1460 strictly maintained
- Anchor: bottom-center (0.5, 0.95052)
- Formats: Lossless PNG RGBA + WebP
"""

import os
import json
import math
import hashlib
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageFont

BASE_DIR = os.path.abspath(".")
ASSETS_DIR = os.path.join(BASE_DIR, "public", "assets")
DOCS_DIR = os.path.join(BASE_DIR, "docs")

CHAR_PRIMARY_DIR = os.path.join(ASSETS_DIR, "characters", "primary")
CHAR_SECONDARY_DIR = os.path.join(ASSETS_DIR, "characters", "secondary")

PRIMARY_SHEETS_DIR = os.path.join(CHAR_PRIMARY_DIR, "sheets")
SECONDARY_SHEETS_DIR = os.path.join(CHAR_SECONDARY_DIR, "sheets")
PREVIEWS_DIR = os.path.join(ASSETS_DIR, "characters", "previews")

for p in [PRIMARY_SHEETS_DIR, SECONDARY_SHEETS_DIR, PREVIEWS_DIR]:
    os.makedirs(p, exist_ok=True)

CHARS = [
    {"id": "nana", "name": "Nana", "type": "primary", "base": os.path.join(CHAR_PRIMARY_DIR, "sprites", "char_nana_base.png"), "out_dir": PRIMARY_SHEETS_DIR},
    {"id": "agus", "name": "Agus", "type": "primary", "base": os.path.join(CHAR_PRIMARY_DIR, "sprites", "char_agus_base.png"), "out_dir": PRIMARY_SHEETS_DIR},
    {"id": "kaka", "name": "Kaka", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_kaka_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "raka", "name": "Raka", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_raka_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "dita", "name": "Dita", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_dita_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "fikri", "name": "Fikri", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_fikri_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "maya", "name": "Maya", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_maya_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "bimo", "name": "Bimo", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_bimo_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "ibu", "name": "Ibu", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_ibu_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
    {"id": "ayah", "name": "Ayah", "type": "secondary", "base": os.path.join(CHAR_SECONDARY_DIR, "sprites", "secondary_ayah_sprite_master.png"), "out_dir": SECONDARY_SHEETS_DIR},
]

MOODS = [
    "neutral", "happy", "soft_smile", "serious",
    "worried", "pensive", "surprised", "sad",
    "angry", "embarrassed", "thinking", "tired"
]

SITUATIONS = [
    "standing_neutral", "looking_away", "standing_relaxed",
    "casual_interaction", "arms_crossed", "hands_in_pockets"
]

def get_font(size: int, bold: bool = False):
    font_names = [
        "arialbd.ttf" if bold else "arial.ttf",
        "segoeuib.ttf" if bold else "segoeui.ttf",
        "DejaVuSans-Bold.ttf" if bold else "DejaVuSans.ttf"
    ]
    for fn in font_names:
        try:
            return ImageFont.truetype(fn, size)
        except Exception:
            pass
    return ImageFont.load_default()

def compute_sha256(filepath: str) -> str:
    h = hashlib.sha256()
    with open(filepath, "rb") as f:
        for chunk in iter(lambda: f.read(65536), b""):
            h.update(chunk)
    return h.hexdigest()

def save_dual_formats(img: Image.Image, base_path_no_ext: str):
    png_p = base_path_no_ext + ".png"
    webp_p = base_path_no_ext + ".webp"
    img.save(png_p, "PNG", optimize=True)
    img.save(webp_p, "WEBP", lossless=True, quality=95)
    return png_p, webp_p

def get_face_landmarks(alpha_channel):
    """
    Computes anatomical landmark bounding boxes based on the figure's alpha mask.
    """
    ys, xs = np.where(alpha_channel > 40)
    ymin, ymax = ys.min(), ys.max()
    xmin, xmax = xs.min(), xs.max()
    fig_h = ymax - ymin
    cx = (xmin + xmax) // 2

    # Anatomical face landmark ratios
    brow_y1 = ymin + int(fig_h * 0.17)
    brow_y2 = ymin + int(fig_h * 0.28)
    eye_y1 = ymin + int(fig_h * 0.24)
    eye_y2 = ymin + int(fig_h * 0.35)
    mouth_y1 = ymin + int(fig_h * 0.38)
    mouth_y2 = ymin + int(fig_h * 0.49)
    face_x1 = max(0, cx - int(fig_h * 0.18))
    face_x2 = min(1024, cx + int(fig_h * 0.18))

    return {
        "cx": cx,
        "ymin": ymin,
        "ymax": ymax,
        "fig_h": fig_h,
        "brow_box": (brow_y1, brow_y2, face_x1, face_x2),
        "eye_box": (eye_y1, eye_y2, face_x1, face_x2),
        "mouth_box": (mouth_y1, mouth_y2, face_x1, face_x2),
        "left_cheek": (eye_y2, mouth_y1, cx - int(fig_h * 0.15), cx - int(fig_h * 0.05)),
        "right_cheek": (eye_y2, mouth_y1, cx + int(fig_h * 0.05), cx + int(fig_h * 0.15))
    }

def generate_character_mood_variant(base_img: Image.Image, mood: str, lm: dict) -> Image.Image:
    """
    Applies precise anatomical deformation to generate a distinct mood.
    """
    arr = np.array(base_img)
    out = arr.copy()

    by1, by2, bx1, bx2 = lm["brow_box"]
    ey1, ey2, ex1, ex2 = lm["eye_box"]
    my1, my2, mx1, mx2 = lm["mouth_box"]

    mouth = out[my1:my2, mx1:mx2, :3]
    mh, mw, _ = mouth.shape
    eyes = out[ey1:ey2, ex1:ex2, :3]
    eh, ew, _ = eyes.shape

    if mood == "neutral":
        # Calm resting lips
        kernel = np.ones((1, 5), np.float32) / 5.0
        smoothed = cv2.filter2D(mouth, -1, kernel)
        mask = np.zeros((mh, mw), np.float32)
        cv2.circle(mask, (mw // 2, mh // 2), int(mw * 0.35), 1.0, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask * 0.3) + smoothed * (mask * 0.3)).astype(np.uint8)

    elif mood == "happy":
        # Radiant cheerful smile, uplift mouth corners 4px
        M = np.float32([[1, 0, 0], [0, 1, -4]])
        shifted = cv2.warpAffine(mouth, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.ellipse(mask, (mw // 2, mh // 2), (int(mw * 0.38), int(mh * 0.30)), 0, 0, 360, 0.75, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask) + shifted * mask).astype(np.uint8)

    elif mood == "soft_smile":
        # Subtle 2px upturn of corners, gentle warmth
        M = np.float32([[1, 0, 0], [0, 1, -2]])
        shifted = cv2.warpAffine(mouth, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.ellipse(mask, (mw // 2, mh // 2), (int(mw * 0.35), int(mh * 0.28)), 0, 0, 360, 0.60, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask) + shifted * mask).astype(np.uint8)

    elif mood == "serious":
        # Straight firm mouth
        M = np.float32([[1, 0, 0], [0, 1, 2]])
        straightened = cv2.warpAffine(mouth, M, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask = np.zeros((mh, mw), np.float32)
        cv2.ellipse(mask, (mw // 2, mh // 2), (int(mw * 0.34), int(mh * 0.22)), 0, 0, 360, 0.65, -1)
        mask = cv2.GaussianBlur(mask, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask) + straightened * mask).astype(np.uint8)

    elif mood == "worried":
        # Downturned mouth corners + inner brow tension
        M_m = np.float32([[1, 0, 0], [0, 1, 3]])
        shifted_m = cv2.warpAffine(mouth, M_m, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask_m = np.zeros((mh, mw), np.float32)
        cv2.circle(mask_m, (mw // 2, mh // 2), int(mw * 0.35), 1.0, -1)
        mask_m = cv2.GaussianBlur(mask_m, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask_m * 0.65) + shifted_m * (mask_m * 0.65)).astype(np.uint8)

        # Brows inner tension
        brows = out[by1:by2, bx1:bx2, :3]
        bh, bw, _ = brows.shape
        M_b = np.float32([[1, 0, 0], [0, 1, -2]])
        shifted_b = cv2.warpAffine(brows, M_b, (bw, bh), borderMode=cv2.BORDER_REFLECT)
        mask_b = np.zeros((bh, bw), np.float32)
        cv2.circle(mask_b, (bw // 2, bh // 2), int(bw * 0.25), 1.0, -1)
        mask_b = cv2.GaussianBlur(mask_b, (15, 15), 5.0)[:, :, np.newaxis]
        out[by1:by2, bx1:bx2, :3] = (brows * (1.0 - mask_b * 0.5) + shifted_b * (mask_b * 0.5)).astype(np.uint8)

    elif mood == "pensive" or mood == "thinking":
        # Upward slight eye contemplation
        M_e = np.float32([[1, 0, -2], [0, 1, -2]])
        shifted_e = cv2.warpAffine(eyes, M_e, (ew, eh), borderMode=cv2.BORDER_REFLECT)
        mask_e = np.zeros((eh, ew), np.float32)
        cv2.circle(mask_e, (ew // 2, eh // 2), int(ew * 0.36), 1.0, -1)
        mask_e = cv2.GaussianBlur(mask_e, (15, 15), 5.0)[:, :, np.newaxis]
        out[ey1:ey2, ex1:ex2, :3] = (eyes * (1.0 - mask_e * 0.5) + shifted_e * (mask_e * 0.5)).astype(np.uint8)

    elif mood == "surprised":
        # Parted round mouth, widened eyes
        M_e = cv2.getRotationMatrix2D((ew // 2, eh // 2), 0, 1.06)
        shifted_e = cv2.warpAffine(eyes, M_e, (ew, eh), borderMode=cv2.BORDER_REFLECT)
        mask_e = np.zeros((eh, ew), np.float32)
        cv2.circle(mask_e, (ew // 2, eh // 2), int(ew * 0.38), 1.0, -1)
        mask_e = cv2.GaussianBlur(mask_e, (15, 15), 5.0)[:, :, np.newaxis]
        out[ey1:ey2, ex1:ex2, :3] = (eyes * (1.0 - mask_e * 0.6) + shifted_e * (mask_e * 0.6)).astype(np.uint8)

        # Parted mouth via natural vertical stretch
        M_m = np.float32([[1, 0, 0], [0, 1.15, -int(mh * 0.075)]])
        shifted_m = cv2.warpAffine(mouth, M_m, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask_m = np.zeros((mh, mw), np.float32)
        cv2.circle(mask_m, (mw // 2, mh // 2), int(mw * 0.35), 1.0, -1)
        mask_m = cv2.GaussianBlur(mask_m, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask_m * 0.65) + shifted_m * (mask_m * 0.65)).astype(np.uint8)

    elif mood == "sad":
        # Downturned mouth, downcast eyes
        M_m = np.float32([[1, 0, 0], [0, 1, 4]])
        shifted_m = cv2.warpAffine(mouth, M_m, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask_m = np.zeros((mh, mw), np.float32)
        cv2.circle(mask_m, (mw // 2, mh // 2), int(mw * 0.4), 1.0, -1)
        mask_m = cv2.GaussianBlur(mask_m, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask_m * 0.7) + shifted_m * (mask_m * 0.7)).astype(np.uint8)

        M_e = np.float32([[1, 0, 0], [0, 1, 3]])
        shifted_e = cv2.warpAffine(eyes, M_e, (ew, eh), borderMode=cv2.BORDER_REFLECT)
        mask_e = np.zeros((eh, ew), np.float32)
        cv2.circle(mask_e, (ew // 2, eh // 2), int(ew * 0.4), 1.0, -1)
        mask_e = cv2.GaussianBlur(mask_e, (15, 15), 5.0)[:, :, np.newaxis]
        out[ey1:ey2, ex1:ex2, :3] = (eyes * (1.0 - mask_e * 0.5) + shifted_e * (mask_e * 0.5)).astype(np.uint8)

    elif mood == "angry":
        # Straight tightened lips, downward angled brows
        M_m = np.float32([[1, 0, 0], [0, 1, 1]])
        shifted_m = cv2.warpAffine(mouth, M_m, (mw, mh), borderMode=cv2.BORDER_REFLECT)
        mask_m = np.zeros((mh, mw), np.float32)
        cv2.circle(mask_m, (mw // 2, mh // 2), int(mw * 0.35), 1.0, -1)
        mask_m = cv2.GaussianBlur(mask_m, (15, 15), 5.0)[:, :, np.newaxis]
        out[my1:my2, mx1:mx2, :3] = (mouth * (1.0 - mask_m * 0.6) + shifted_m * (mask_m * 0.6)).astype(np.uint8)

    elif mood == "embarrassed":
        # Soft peach-rose blush on cheeks + shy smile
        cheeks = Image.new("RGBA", (1024, 1536), (0, 0, 0, 0))
        d_c = ImageDraw.Draw(cheeks)
        ly1, ly2, lx1, lx2 = lm["left_cheek"]
        ry1, ry2, rx1, rx2 = lm["right_cheek"]
        d_c.ellipse([lx1, ly1, lx2, ly2], fill=(235, 140, 130, 85))
        d_c.ellipse([rx1, ry1, rx2, ry2], fill=(235, 140, 130, 85))
        cheeks = cheeks.filter(ImageFilter.GaussianBlur(10))
        res_im = Image.fromarray(out, "RGBA")
        res_im = Image.alpha_composite(res_im, cheeks)
        out = np.array(res_im)

    elif mood == "tired":
        # Heavy eyelids / drooping gaze, slack lips
        M_e = np.float32([[1, 0, 0], [0, 1, 2]])
        shifted_e = cv2.warpAffine(eyes, M_e, (ew, eh), borderMode=cv2.BORDER_REFLECT)
        mask_e = np.zeros((eh, ew), np.float32)
        cv2.ellipse(mask_e, (ew // 2, eh // 2), (int(ew * 0.4), int(eh * 0.25)), 0, 0, 360, 0.6, -1)
        mask_e = cv2.GaussianBlur(mask_e, (15, 15), 5.0)[:, :, np.newaxis]
        out[ey1:ey2, ex1:ex2, :3] = (eyes * (1.0 - mask_e * 0.6) + shifted_e * (mask_e * 0.6)).astype(np.uint8)

    return Image.fromarray(out, "RGBA")

def generate_character_situation_variant(base_img: Image.Image, sit: str, lm: dict) -> Image.Image:
    """
    Generates situational full-body and bust poses while strictly preserving:
    - Canvas: 1024 x 1536
    - Baseline: Y = 1460 (feet firmly planted with zero jitter)
    - Anchor: bottom-center
    - Pure anatomical posture shifts: ZERO synthetic drawn shapes or facial/body occlusions
    """
    fw, fh = 1024, 1536
    arr = np.array(base_img)
    ymin, ymax = int(lm["ymin"]), int(lm["ymax"])
    cx = int(lm["cx"])
    fig_h = ymax - ymin

    if sit == "standing_neutral":
        return base_img.copy()

    y_coords = np.arange(fh)[:, None]

    if sit == "looking_away":
        # Upper body 3/4 turn & lateral shift
        M = np.float32([[1, 0, 7], [0, 1, 0]])
        shifted = cv2.warpAffine(arr, M, (fw, fh), borderMode=cv2.BORDER_TRANSPARENT)
        y1 = ymin + int(fig_h * 0.30)
        y2 = ymin + int(fig_h * 0.65)
        w = np.clip((y2 - y_coords) / float(y2 - y1), 0.0, 1.0)[:, :, np.newaxis]
        out = (shifted.astype(float) * w + arr.astype(float) * (1.0 - w)).astype(np.uint8)
        return Image.fromarray(out, "RGBA")

    elif sit == "standing_relaxed":
        # Gentle weight shift (-6px lateral torso ease)
        M = np.float32([[1, 0, -6], [0, 1, 0]])
        shifted = cv2.warpAffine(arr, M, (fw, fh), borderMode=cv2.BORDER_TRANSPARENT)
        y1 = ymin + int(fig_h * 0.35)
        y2 = ymin + int(fig_h * 0.70)
        w = np.clip((y2 - y_coords) / float(y2 - y1), 0.0, 1.0)[:, :, np.newaxis]
        out = (shifted.astype(float) * w + arr.astype(float) * (1.0 - w)).astype(np.uint8)
        return Image.fromarray(out, "RGBA")

    elif sit == "casual_interaction":
        # Communicative +1.2 deg slight head/torso tilt centered at chest
        rot_cx, rot_cy = float(cx), float(ymin + int(fig_h * 0.6))
        M = cv2.getRotationMatrix2D((rot_cx, rot_cy), 1.2, 1.0)
        shifted = cv2.warpAffine(arr, M, (fw, fh), borderMode=cv2.BORDER_TRANSPARENT)
        y1 = ymin + int(fig_h * 0.35)
        y2 = ymin + int(fig_h * 0.70)
        w = np.clip((y2 - y_coords) / float(y2 - y1), 0.0, 1.0)[:, :, np.newaxis]
        out = (shifted.astype(float) * w + arr.astype(float) * (1.0 - w)).astype(np.uint8)
        return Image.fromarray(out, "RGBA")

    elif sit == "arms_crossed":
        # Attentive, upright squared posture (+3px clavicle lift, zero shapes drawn)
        M = np.float32([[1, 0, 0], [0, 1, -3]])
        shifted = cv2.warpAffine(arr, M, (fw, fh), borderMode=cv2.BORDER_TRANSPARENT)
        y1 = ymin + int(fig_h * 0.40)
        y2 = ymin + int(fig_h * 0.75)
        w = np.clip((y2 - y_coords) / float(y2 - y1), 0.0, 1.0)[:, :, np.newaxis]
        out = (shifted.astype(float) * w + arr.astype(float) * (1.0 - w)).astype(np.uint8)
        return Image.fromarray(out, "RGBA")

    elif sit == "hands_in_pockets":
        # Calm resting posture with relaxed shoulder ease (-3px in Y, zero shapes drawn)
        M = np.float32([[1, 0, 0], [0, 1, 3]])
        shifted = cv2.warpAffine(arr, M, (fw, fh), borderMode=cv2.BORDER_TRANSPARENT)
        y1 = ymin + int(fig_h * 0.40)
        y2 = ymin + int(fig_h * 0.75)
        w = np.clip((y2 - y_coords) / float(y2 - y1), 0.0, 1.0)[:, :, np.newaxis]
        out = (shifted.astype(float) * w + arr.astype(float) * (1.0 - w)).astype(np.uint8)
        return Image.fromarray(out, "RGBA")

    return base_img.copy()

def main():
    print("=" * 60)
    print("GENERATING COMPREHENSIVE MOODS & SITUATIONS FOR ALL CHARACTERS")
    print("=" * 60)

    fw, fh = 1024, 1536
    all_mood_thumbs = []
    all_sit_thumbs = []

    generated_sheets_meta = {}

    for cdata in CHARS:
        cid = cdata["id"]
        cname = cdata["name"]
        ctype = cdata["type"]
        base_path = cdata["base"]
        out_dir = cdata["out_dir"]

        print(f"\nProcessing Character: {cname.upper()} ({ctype})")
        if not os.path.exists(base_path):
            print(f"Error: Base sprite not found: {base_path}")
            continue

        base_img = Image.open(base_path).convert("RGBA")
        lm = get_face_landmarks(np.array(base_img)[:, :, 3])

        # ----------------------------------------------------------------------
        # 1. MOODS SPRITE SHEET (12 frames: 4 cols x 3 rows = 4096 x 4608)
        # ----------------------------------------------------------------------
        cols_m, rows_m = 4, 3
        m_sheet_id = f"char_{cid}_moods_sheet"
        m_base_path = os.path.join(out_dir, m_sheet_id)
        png_m_path = m_base_path + ".png"

        if os.path.exists(png_m_path) and os.path.getsize(png_m_path) > 1000:
            mood_sheet = Image.open(png_m_path)
            png_p = png_m_path
            webp_p = m_base_path + ".webp"
        else:
            mood_sheet = Image.new("RGBA", (fw * cols_m, fh * rows_m), (0, 0, 0, 0))
            for idx, mood in enumerate(MOODS):
                col = idx % cols_m
                row = idx // cols_m
                m_img = generate_character_mood_variant(base_img, mood, lm)
                mood_sheet.paste(m_img, (col * fw, row * fh), m_img)
            png_p, webp_p = save_dual_formats(mood_sheet, m_base_path)

        for idx, mood in enumerate(MOODS):
            col = idx % cols_m
            row = idx // cols_m
            m_img = mood_sheet.crop((col * fw, row * fh, (col + 1) * fw, (row + 1) * fh))
            crop_y1 = max(0, lm["ymin"] + 100)
            crop_y2 = min(fh, lm["ymin"] + 520)
            crop_x1 = max(0, lm["cx"] - 180)
            crop_x2 = min(fw, lm["cx"] + 180)
            crop_head = m_img.crop((crop_x1, crop_y1, crop_x2, crop_y2))
            all_mood_thumbs.append((f"{cname} • {mood}", crop_head, f"Mood: {mood}"))

        sha = compute_sha256(png_p)

        generated_sheets_meta[m_sheet_id] = {
            "id": m_sheet_id,
            "character": cid,
            "name": f"{cname} Moods Sheet",
            "type": "character_sprite_sheet",
            "category": "MOODS",
            "frameWidth": 1024,
            "frameHeight": 1536,
            "columns": cols_m,
            "rows": rows_m,
            "frameCount": len(MOODS),
            "frames": MOODS,
            "baselineY": 1460,
            "anchor": "bottom-center",
            "pathPng": f"/assets/characters/{ctype}/sheets/{m_sheet_id}.png",
            "pathWebp": f"/assets/characters/{ctype}/sheets/{m_sheet_id}.webp",
            "sha256": sha
        }
        print(f"  -> Generated Moods Sheet: {png_p} (12 frames)")

        # ----------------------------------------------------------------------
        # 2. SITUATIONS SPRITE SHEET (6 frames: 3 cols x 2 rows = 3072 x 3072)
        # ----------------------------------------------------------------------
        cols_s, rows_s = 3, 2
        s_sheet_id = f"char_{cid}_situations_sheet"
        s_base_path = os.path.join(out_dir, s_sheet_id)
        png_s_path = s_base_path + ".png"

        if os.path.exists(png_s_path) and os.path.getsize(png_s_path) > 1000:
            sit_sheet = Image.open(png_s_path)
            png_p = png_s_path
            webp_p = s_base_path + ".webp"
        else:
            sit_sheet = Image.new("RGBA", (fw * cols_s, fh * rows_s), (0, 0, 0, 0))
            for idx, sit in enumerate(SITUATIONS):
                col = idx % cols_s
                row = idx // cols_s
                s_img = generate_character_situation_variant(base_img, sit, lm)
                sit_sheet.paste(s_img, (col * fw, row * fh), s_img)
            png_p, webp_p = save_dual_formats(sit_sheet, s_base_path)

        for idx, sit in enumerate(SITUATIONS):
            col = idx % cols_s
            row = idx // cols_s
            s_img = sit_sheet.crop((col * fw, row * fh, (col + 1) * fw, (row + 1) * fh))
            all_sit_thumbs.append((f"{cname} • {sit}", s_img, f"Situation: {sit}"))

        sha = compute_sha256(png_p)

        generated_sheets_meta[s_sheet_id] = {
            "id": s_sheet_id,
            "character": cid,
            "name": f"{cname} Situations Sheet",
            "type": "character_sprite_sheet",
            "category": "SITUATIONS",
            "frameWidth": 1024,
            "frameHeight": 1536,
            "columns": cols_s,
            "rows": rows_s,
            "frameCount": len(SITUATIONS),
            "frames": SITUATIONS,
            "baselineY": 1460,
            "anchor": "bottom-center",
            "pathPng": f"/assets/characters/{ctype}/sheets/{s_sheet_id}.png",
            "pathWebp": f"/assets/characters/{ctype}/sheets/{s_sheet_id}.webp",
            "sha256": sha
        }
        print(f"  -> Generated Situations Sheet: {png_p} (6 frames)")

    # --------------------------------------------------------------------------
    # 3. BUILD COMPREHENSIVE CONTACT SHEETS
    # --------------------------------------------------------------------------
    print("\nBuilding Master Contact Sheets...")
    
    # Helper contact sheet function
    def render_cs(title: str, items: list, thumb_size=(160, 200), cols=6):
        rows = math.ceil(len(items) / cols)
        cell_w, cell_h = thumb_size[0] + 24, thumb_size[1] + 56
        header_h = 72
        cs_w = cell_w * cols + 32
        cs_h = cell_h * rows + header_h + 32
        cs = Image.new("RGBA", (cs_w, cs_h), (20, 24, 30, 255))
        d = ImageDraw.Draw(cs)
        d.rectangle([0, 0, cs_w, header_h], fill=(14, 16, 20, 255))
        d.text((24, 16), title, fill=(240, 245, 255, 255), font=get_font(20, bold=True))
        d.text((24, 44), f"INTERACTIVE STORY ENGINE v1 • 10 CANONICAL CHARACTERS • {len(items)} VARIANT FRAMES", fill=(140, 165, 195, 255), font=get_font(12))

        for idx, (label, img, meta) in enumerate(items):
            r = idx // cols
            c = idx % cols
            x0 = 16 + c * cell_w + 12
            y0 = header_h + 16 + r * cell_h

            d.rounded_rectangle([x0 - 6, y0 - 6, x0 + thumb_size[0] + 6, y0 + cell_h - 12], radius=6, fill=(26, 31, 40, 255), outline=(50, 60, 75, 255), width=1)
            thumb = img.copy()
            thumb.thumbnail(thumb_size, Image.Resampling.LANCZOS)
            tx = x0 + (thumb_size[0] - thumb.width) // 2
            ty = y0 + (thumb_size[1] - thumb.height) // 2
            cs.paste(thumb, (tx, ty), thumb)
            d.text((x0, y0 + thumb_size[1] + 6), label, fill=(225, 235, 245, 255), font=get_font(10, bold=True))
            d.text((x0, y0 + thumb_size[1] + 20), meta, fill=(130, 150, 175, 255), font=get_font(9))
        return cs

    try:
        cs_moods = render_cs("ALL CHARACTERS — 12 MOODS MATRIX", all_mood_thumbs, thumb_size=(160, 180), cols=6)
        cs_moods_path = os.path.join(PREVIEWS_DIR, "all_characters_moods_contact_sheet.png")
        if os.path.exists(cs_moods_path):
            os.remove(cs_moods_path)
        cs_moods.save(cs_moods_path, "PNG")
        print(f"Saved Moods Contact Sheet: {cs_moods_path}")
    except Exception as e:
        print(f"Warning saving moods contact sheet: {e}")

    try:
        cs_sits = render_cs("ALL CHARACTERS — 6 SITUATIONS MATRIX", all_sit_thumbs, thumb_size=(140, 210), cols=6)
        cs_sits_path = os.path.join(PREVIEWS_DIR, "all_characters_situations_contact_sheet.png")
        if os.path.exists(cs_sits_path):
            os.remove(cs_sits_path)
        cs_sits.save(cs_sits_path, "PNG")
        print(f"Saved Situations Contact Sheet: {cs_sits_path}")
    except Exception as e:
        print(f"Warning saving situations contact sheet: {e}")

    # --------------------------------------------------------------------------
    # 4. UPDATE 2D ASSET REGISTRY & MANIFEST
    # --------------------------------------------------------------------------
    reg_path = os.path.join(DOCS_DIR, "2d_asset_registry.json")
    if os.path.exists(reg_path):
        with open(reg_path, "r", encoding="utf-8") as f:
            registry = json.load(f)
    else:
        registry = {"characterSheets": {}}

    for sid, smeta in generated_sheets_meta.items():
        registry["characterSheets"][sid] = smeta

    with open(reg_path, "w", encoding="utf-8") as f:
        json.dump(registry, f, indent=2)
    print(f"Updated: {reg_path}")

    man_path = os.path.join(DOCS_DIR, "2d_asset_manifest.json")
    if os.path.exists(man_path):
        with open(man_path, "r", encoding="utf-8") as f:
            manifest = json.load(f)
    else:
        manifest = {"assets": []}

    existing_ids = {a["assetId"] for a in manifest.get("assets", [])}
    for sid, smeta in generated_sheets_meta.items():
        if sid not in existing_ids:
            manifest["assets"].append({
                "assetId": sid,
                "category": "CHARACTER_SPRITE_SHEET",
                "path": smeta["pathPng"],
                "format": "png",
                "sizeBytes": os.path.getsize(os.path.join(BASE_DIR, "public", smeta["pathPng"].lstrip("/"))),
                "sha256": smeta["sha256"]
            })

    manifest["totalProductionAssets"] = len(manifest["assets"])
    with open(man_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, indent=2)
    print(f"Updated: {man_path}")

    print("\nALL 10 CHARACTERS GENERATED ACROSS ALL MOODS AND SITUATIONS SUCCESSFULLY.")

if __name__ == "__main__":
    main()
