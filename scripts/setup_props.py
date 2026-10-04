"""
Script: setup_props.py
Purpose: Generate 9 canonical independent prop assets and contact sheet for '2 HOURS APART'.
Formats: PNG (clean RGBA transparent) & WebP (lossless/high-quality RGBA).
Resolution: Tailored per prop aspect ratio with pixel-perfect clean alpha edges.
Contact Sheet: 3x3 grid preview with labels, anchors, and dimensions.
"""

import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

MASTERS_DIR = r"public\assets\props\masters"
PREVIEWS_DIR = r"public\assets\props\previews"
os.makedirs(MASTERS_DIR, exist_ok=True)
os.makedirs(PREVIEWS_DIR, exist_ok=True)

# Helper font loader
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

def create_prop_phone():
    """prop_phone: Dual Timezone Smartphone (256x512)"""
    w, h = 256, 512
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Chassis dimensions
    pad_x, pad_y = 20, 24
    bx0, by0, bx1, by1 = pad_x, pad_y, w - pad_x, h - pad_y
    r = 32

    # Outer phone shadow / ambient glow
    glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    glow_draw.rounded_rectangle([bx0 - 4, by0 - 4, bx1 + 4, by1 + 4], radius=r + 4, fill=(15, 30, 50, 80))
    glow = glow.filter(ImageFilter.GaussianBlur(8))
    img.paste(glow, (0, 0), glow)

    # Phone metallic frame (gunmetal with bevel)
    draw.rounded_rectangle([bx0, by0, bx1, by1], radius=r, fill=(45, 52, 65, 255), outline=(90, 105, 128, 255), width=2)
    # Inner bezel
    draw.rounded_rectangle([bx0 + 3, by0 + 3, bx1 - 3, by1 - 3], radius=r - 2, fill=(15, 18, 24, 255))

    # OLED Screen
    sx0, sy0, sx1, sy1 = bx0 + 6, by0 + 12, bx1 - 6, by1 - 12
    screen_r = r - 6
    
    # Screen wallpaper: deep indigo twilight gradient
    screen = Image.new("RGBA", (sx1 - sx0, sy1 - sy0), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(screen)
    for y_idx in range(sy1 - sy0):
        t = y_idx / (sy1 - sy0)
        cr = int(12 + t * 24)
        cg = int(18 + t * 35)
        cb = int(45 + t * 65)
        s_draw.line([(0, y_idx), (sx1 - sx0, y_idx)], fill=(cr, cg, cb, 255))
    
    # Clip screen with rounded mask
    s_mask = Image.new("L", (sx1 - sx0, sy1 - sy0), 0)
    ImageDraw.Draw(s_mask).rounded_rectangle([0, 0, sx1 - sx0, sy1 - sy0], radius=screen_r, fill=255)
    img.paste(screen, (sx0, sy0), s_mask)

    # Speaker notch & front camera
    draw.rounded_rectangle([w // 2 - 25, by0 + 8, w // 2 + 25, by0 + 12], radius=2, fill=(35, 40, 50, 255))
    draw.ellipse([w // 2 + 35, by0 + 7, w // 2 + 41, by0 + 13], fill=(20, 25, 35, 255))

    # UI Content on screen
    # Status bar
    f_tiny = get_font(10)
    f_sub = get_font(12, bold=True)
    f_time = get_font(34, bold=True)
    f_body = get_font(11)

    draw.text((sx0 + 14, sy0 + 10), "00:10", fill=(220, 230, 245, 220), font=f_tiny)
    draw.text((sx1 - 42, sy0 + 10), "5G 84%", fill=(180, 200, 225, 200), font=f_tiny)

    # Dual Time Display widget (The core story mechanic: Jakarta WIB vs Jayapura WIT)
    # Card background
    cx0, cy0, cx1, cy1 = sx0 + 12, sy0 + 40, sx1 - 12, sy0 + 170
    draw.rounded_rectangle([cx0, cy0, cx1, cy1], radius=16, fill=(25, 35, 55, 180), outline=(70, 95, 140, 120), width=1)

    # WIB zone (Nana - Jakarta)
    draw.text((cx0 + 14, cy0 + 12), "JAKARTA (WIB)", fill=(140, 180, 230, 240), font=get_font(10, bold=True))
    draw.text((cx0 + 14, cy0 + 26), "00:10", fill=(255, 255, 255, 255), font=f_time)
    draw.text((cx0 + 14, cy0 + 64), "Jumat, Hujan Deras", fill=(160, 185, 215, 200), font=get_font(10))

    # Divider line
    draw.line([(cx0 + 14, cy0 + 82), (cx1 - 14, cy0 + 82)], fill=(60, 85, 125, 150), width=1)

    # WIT zone (Agus - Jayapura, +2 Jam)
    draw.text((cx0 + 14, cy0 + 90), "JAYAPURA (WIT) • +2 JAM", fill=(245, 180, 110, 240), font=get_font(10, bold=True))
    draw.text((cx0 + 14, cy0 + 104), "02:10", fill=(255, 220, 160, 255), font=get_font(24, bold=True))

    # Chat Notification Bubble (Scene: ch3_night_phone_msg)
    nx0, ny0, nx1, ny1 = sx0 + 12, cy1 + 20, sx1 - 12, cy1 + 140
    draw.rounded_rectangle([nx0, ny0, nx1, ny1], radius=14, fill=(30, 42, 62, 220), outline=(90, 140, 210, 180), width=1)

    # Avatar circle & sender
    draw.ellipse([nx0 + 12, ny0 + 12, nx0 + 36, ny0 + 36], fill=(50, 120, 200, 255))
    draw.text((nx0 + 19, ny0 + 14), "A", fill=(255, 255, 255, 255), font=f_sub)
    draw.text((nx0 + 44, ny0 + 12), "Agus", fill=(255, 255, 255, 255), font=f_sub)
    draw.text((nx1 - 42, ny0 + 14), "00:09", fill=(140, 165, 195, 200), font=f_tiny)

    # Message text
    msg_line1 = "\"Hujan di sini baru reda.\""
    msg_line2 = "\"Di Bandung masih dingin?\""
    draw.text((nx0 + 14, ny0 + 44), msg_line1, fill=(225, 238, 255, 255), font=f_body)
    draw.text((nx0 + 14, ny0 + 62), msg_line2, fill=(200, 220, 245, 220), font=f_body)

    # Quick action button at bottom of card
    draw.rounded_rectangle([nx0 + 12, ny0 + 86, nx1 - 12, ny0 + 110], radius=8, fill=(45, 80, 130, 200))
    draw.text((nx0 + 36, ny0 + 91), "Balas Pesan...", fill=(180, 215, 255, 255), font=get_font(10, bold=True))

    # Bottom Home Bar
    draw.rounded_rectangle([w // 2 - 40, by1 - 20, w // 2 + 40, by1 - 16], radius=2, fill=(180, 200, 220, 160))

    return img

def create_prop_coffee():
    """prop_coffee: Steaming Ceramic Mug (256x256)"""
    w, h = 256, 256
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cast shadow on table contact point
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([50, 215, 206, 242], fill=(20, 15, 12, 100))
    shadow = shadow.filter(ImageFilter.GaussianBlur(6))
    img.paste(shadow, (0, 0), shadow)

    # Ceramic Mug Body Coordinates
    cx, cy = 120, 160
    mw, mh = 110, 100

    # Mug Handle (behind or to side)
    hx0, hy0, hx1, hy1 = 165, 125, 215, 195
    draw.arc([hx0, hy0, hx1, hy1], 290, 70, fill=(195, 160, 130, 255), width=18)
    draw.arc([hx0, hy0, hx1, hy1], 290, 70, fill=(145, 110, 85, 255), width=4)

    # Mug Outer Body (Tapered Cylinder)
    body_pts = [
        (cx - mw // 2, cy - mh // 2),
        (cx + mw // 2, cy - mh // 2),
        (cx + mw // 2 - 8, cy + mh // 2),
        (cx - mw // 2 + 8, cy + mh // 2),
    ]
    # Gradient shading for ceramic curve
    draw.polygon(body_pts, fill=(230, 215, 195, 255))
    
    # Hand-painted ceramic glaze details: warm terracotta stripe
    stripe_pts = [
        (cx - mw // 2 + 2, cy - 10),
        (cx + mw // 2 - 2, cy - 10),
        (cx + mw // 2 - 4, cy + 15),
        (cx - mw // 2 + 4, cy + 15),
    ]
    draw.polygon(stripe_pts, fill=(185, 105, 75, 255))

    # Mug Bottom Rim
    draw.ellipse([cx - mw // 2 + 8, cy + mh // 2 - 12, cx + mw // 2 - 8, cy + mh // 2 + 12], fill=(210, 195, 175, 255))

    # Mug Top Rim (Ellipse)
    rx0, ry0, rx1, ry1 = cx - mw // 2, cy - mh // 2 - 18, cx + mw // 2, cy - mh // 2 + 18
    draw.ellipse([rx0, ry0, rx1, ry1], fill=(245, 235, 220, 255), outline=(170, 150, 130, 255), width=2)

    # Liquid Surface (Rich Espresso Coffee)
    lx0, ly0, lx1, ly1 = rx0 + 6, ry0 + 5, rx1 - 6, ry1 - 5
    draw.ellipse([lx0, ly0, lx1, ly1], fill=(42, 24, 16, 255))
    # Crema foam swirl
    draw.ellipse([lx0 + 15, ly0 + 4, lx1 - 25, ly1 - 6], fill=(160, 115, 70, 180))
    draw.ellipse([lx0 + 35, ly0 + 8, lx1 - 40, ly1 - 10], fill=(210, 165, 110, 220))

    # Ceramic gloss highlight
    draw.arc([rx0 + 10, ry0 + 2, rx0 + 45, ry1 - 2], 120, 240, fill=(255, 255, 255, 200), width=3)

    # Translucent Steam Wisps (Procedural Alpha Curves)
    steam = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    steam_draw = ImageDraw.Draw(steam)

    for i in range(3):
        sx = cx - 25 + i * 26
        pts = []
        for sy_step in range(95, 25, -5):
            t = (95 - sy_step) / 70
            offset_x = math.sin(t * 4 + i) * (10 + t * 12)
            pts.append((sx + offset_x, sy_step))
        for p_idx in range(len(pts) - 1):
            alpha = int(90 * (1.0 - (p_idx / len(pts))))
            steam_draw.line([pts[p_idx], pts[p_idx + 1]], fill=(250, 245, 240, alpha), width=5 - int(p_idx * 0.15))

    steam = steam.filter(ImageFilter.GaussianBlur(3))
    img.paste(steam, (0, 0), steam)

    return img

def create_prop_old_photo():
    """prop_old_photo: Campus Polaroid Photograph (320x384)"""
    w, h = 320, 384
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    # Slight angle rotation for natural casual look
    card_w, card_h = 270, 330
    card = Image.new("RGBA", (card_w, card_h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(card)

    # Polaroid aged white cardstock
    c_draw.rounded_rectangle([0, 0, card_w, card_h], radius=6, fill=(248, 245, 238, 255), outline=(215, 208, 195, 255), width=2)

    # Photo frame window
    px0, py0, px1, py1 = 18, 18, card_w - 18, card_h - 70
    pw, ph = px1 - px0, py1 - py0

    # Nostalgic Campus Sunset Scene inside photo
    photo_img = Image.new("RGBA", (pw, ph), (0, 0, 0, 0))
    p_draw = ImageDraw.Draw(photo_img)

    # Sky gradient: amber-rose sunset
    for y_idx in range(ph):
        t = y_idx / ph
        cr = int(245 - t * 45)
        cg = int(140 + t * 40)
        cb = int(95 + t * 65)
        p_draw.line([(0, y_idx), (pw, y_idx)], fill=(cr, cg, cb, 255))

    # Sun glow
    p_draw.ellipse([pw // 2 - 30, ph // 2 - 40, pw // 2 + 30, ph // 2 + 20], fill=(255, 235, 180, 160))

    # Distant university facade silhouette
    p_draw.rectangle([20, ph - 90, 85, ph - 30], fill=(95, 70, 80, 255))
    p_draw.polygon([(20, ph - 90), (52, ph - 115), (85, ph - 90)], fill=(95, 70, 80, 255))
    p_draw.rectangle([95, ph - 75, 180, ph - 30], fill=(85, 60, 72, 255))

    # Campus brick stairs & trees
    p_draw.polygon([(0, ph - 35), (pw, ph - 35), (pw, ph), (0, ph)], fill=(120, 95, 80, 255))
    for step in range(4):
        p_draw.line([(0, ph - 30 + step * 7), (pw, ph - 30 + step * 7)], fill=(145, 120, 105, 255), width=2)

    # Two student silhouettes talking under campus trees
    p_draw.ellipse([pw // 2 - 25, ph - 65, pw // 2 - 11, ph - 51], fill=(55, 38, 48, 255))
    p_draw.rectangle([pw // 2 - 22, ph - 51, pw // 2 - 14, ph - 25], fill=(55, 38, 48, 255))
    p_draw.ellipse([pw // 2 - 5, ph - 68, pw // 2 + 9, ph - 54], fill=(45, 30, 40, 255))
    p_draw.rectangle([pw // 2 - 3, ph - 54, pw // 2 + 7, ph - 25], fill=(45, 30, 40, 255))

    # Soft photo gloss overlay
    p_draw.line([(0, 0), (pw // 2, ph)], fill=(255, 255, 255, 45), width=18)

    card.paste(photo_img, (px0, py0))

    # Handwritten date & caption on bottom white margin
    f_hand = get_font(13)
    c_draw.text((28, card_h - 52), "Oktober 2021 — Senja Pertama", fill=(75, 65, 60, 230), font=f_hand)
    c_draw.text((28, card_h - 32), "Hal. 42 • Jangan hilangkan.", fill=(130, 115, 105, 200), font=get_font(10))

    # Soft drop shadow
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([25, 27, 25 + card_w, 27 + card_h], radius=10, fill=(20, 20, 25, 80))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (0, 0), shadow)

    img.paste(card, (25, 25), card)
    return img

def create_prop_train_ticket():
    """prop_train_ticket: Last-Minute Train Ticket (384x200)"""
    w, h = 384, 200
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))

    # Ticket bounds
    tx0, ty0, tx1, ty1 = 16, 20, w - 16, h - 20
    tw, th = tx1 - tx0, ty1 - ty0

    # Soft shadow
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.rounded_rectangle([tx0 + 4, ty0 + 6, tx1 + 4, ty1 + 6], radius=8, fill=(15, 15, 20, 80))
    shadow = shadow.filter(ImageFilter.GaussianBlur(6))
    img.paste(shadow, (0, 0), shadow)

    # Ticket card base
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([tx0, ty0, tx1, ty1], radius=8, fill=(252, 249, 242, 255), outline=(210, 200, 185, 255), width=1)

    # Perforated tear notch cutouts (left & right ticket stubs)
    draw.ellipse([tx0 - 10, ty0 + th // 2 - 10, tx0 + 10, ty0 + th // 2 + 10], fill=(0, 0, 0, 0))
    draw.ellipse([tx1 - 10, ty0 + th // 2 - 10, tx1 + 10, ty0 + th // 2 + 10], fill=(0, 0, 0, 0))

    # Top brand bar
    draw.rounded_rectangle([tx0, ty0, tx1, ty0 + 32], radius=8, fill=(28, 55, 105, 255))
    draw.rectangle([tx0, ty0 + 20, tx1, ty0 + 32], fill=(28, 55, 105, 255))
    draw.text((tx0 + 16, ty0 + 8), "KERETA API INDONESIA • BOARDING PASS", fill=(255, 255, 255, 255), font=get_font(11, bold=True))
    draw.text((tx1 - 70, ty0 + 8), "EKSEKUTIF", fill=(245, 195, 95, 255), font=get_font(10, bold=True))

    # Origin & Destination route
    f_city = get_font(17, bold=True)
    draw.text((tx0 + 20, ty0 + 44), "BANDUNG (BD)", fill=(30, 40, 55, 255), font=f_city)
    draw.text((tx0 + 175, ty0 + 44), "➔", fill=(200, 70, 60, 255), font=f_city)
    draw.text((tx0 + 208, ty0 + 44), "YOGYAKARTA (YK)", fill=(30, 40, 55, 255), font=f_city)

    # Details: Date, Time, Train Name
    f_label = get_font(9)
    f_val = get_font(12, bold=True)

    draw.text((tx0 + 20, ty0 + 72), "KERETA / NO", fill=(130, 140, 150, 255), font=f_label)
    draw.text((tx0 + 20, ty0 + 84), "ARGO WILIS (KA 6)", fill=(40, 50, 65, 255), font=f_val)

    draw.text((tx0 + 140, ty0 + 72), "TANGGAL / WAKTU", fill=(130, 140, 150, 255), font=f_label)
    draw.text((tx0 + 140, ty0 + 84), "24 OKT • 23:45 WIB", fill=(205, 55, 55, 255), font=f_val)

    draw.text((tx0 + 260, ty0 + 72), "GERBONG / KURSI", fill=(130, 140, 150, 255), font=f_label)
    draw.text((tx0 + 260, ty0 + 84), "EKS-3 / 11B", fill=(40, 50, 65, 255), font=f_val)

    # Dashed divider
    for x_dash in range(tx0 + 15, tx1 - 15, 8):
        draw.line([(x_dash, ty0 + 110), (x_dash + 4, ty0 + 110)], fill=(190, 185, 175, 255), width=1)

    # Barcode
    bx = tx0 + 20
    bar_patterns = [2, 1, 3, 1, 2, 4, 1, 2, 1, 3, 2, 1, 4, 2, 1, 3, 1, 2, 2, 3, 1, 4, 1, 2]
    for bp in bar_patterns:
        draw.rectangle([bx, ty0 + 120, bx + bp, ty0 + 148], fill=(35, 40, 50, 255))
        bx += bp + 2

    draw.text((tx0 + 20, ty0 + 150), "*BDG-20261024-9981-AGUS*", fill=(120, 130, 140, 255), font=get_font(9))

    # Red circular stamp: "TERKONFIRMASI / BOARDING"
    stamp = Image.new("RGBA", (76, 76), (0, 0, 0, 0))
    st_draw = ImageDraw.Draw(stamp)
    st_draw.ellipse([4, 4, 72, 72], outline=(195, 45, 45, 210), width=2)
    st_draw.ellipse([8, 8, 68, 68], outline=(195, 45, 45, 140), width=1)
    st_draw.text((12, 22), "BOARDING", fill=(195, 45, 45, 230), font=get_font(9, bold=True))
    st_draw.text((15, 36), "VALIDASI", fill=(195, 45, 45, 210), font=get_font(8, bold=True))
    st_draw.text((18, 48), "STAS. BDG", fill=(195, 45, 45, 180), font=get_font(7))
    stamp = stamp.rotate(14, expand=False)
    img.paste(stamp, (tx1 - 92, ty0 + 74), stamp)

    return img

def create_prop_backpack():
    """prop_backpack: Travel Canvas Backpack (384x480)"""
    w, h = 384, 480
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cast shadow under backpack
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([70, 420, 314, 465], fill=(15, 18, 22, 110))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (0, 0), shadow)

    cx = w // 2

    # Top carry loop handle
    draw.arc([cx - 40, 45, cx + 40, 110], 180, 360, fill=(45, 55, 45, 255), width=16)
    draw.arc([cx - 40, 45, cx + 40, 110], 180, 360, fill=(120, 85, 55, 255), width=4)

    # Main backpack body (Deep olive/teal canvas)
    body_pts = [
        (cx - 105, 120),
        (cx + 105, 120),
        (cx + 125, 320),
        (cx + 115, 430),
        (cx - 115, 430),
        (cx - 125, 320),
    ]
    draw.polygon(body_pts, fill=(38, 58, 62, 255))
    draw.line(body_pts + [body_pts[0]], fill=(25, 40, 44, 255), width=2)

    # Side water bottle pocket with stainless flask
    draw.rounded_rectangle([cx + 95, 260, cx + 138, 380], radius=8, fill=(28, 44, 48, 255), outline=(48, 72, 78, 255), width=2)
    # Steel flask sticking out
    draw.rounded_rectangle([cx + 105, 210, cx + 130, 300], radius=6, fill=(195, 205, 215, 255), outline=(130, 140, 150, 255), width=2)
    draw.rectangle([cx + 112, 195, cx + 123, 210], fill=(70, 80, 90, 255))

    # Front Large Zipper Compartment
    draw.rounded_rectangle([cx - 90, 240, cx + 90, 415], radius=16, fill=(46, 68, 74, 255), outline=(28, 44, 48, 255), width=2)
    # Zipper line & brass pull
    draw.arc([cx - 80, 248, cx + 80, 275], 0, 180, fill=(185, 150, 80, 255), width=3)
    draw.ellipse([cx + 25, 266, cx + 33, 278], fill=(215, 175, 95, 255))

    # Upper Flap (Curved cover)
    flap_pts = [
        (cx - 100, 115),
        (cx + 100, 115),
        (cx + 90, 230),
        (cx, 248),
        (cx - 90, 230),
    ]
    draw.polygon(flap_pts, fill=(32, 50, 54, 255))
    draw.line(flap_pts + [flap_pts[0]], fill=(22, 34, 38, 255), width=2)

    # Genuine Leather Straps & Brass Buckles (Vertical left & right)
    for sx in [cx - 50, cx + 50]:
        # Leather brown strap
        draw.rounded_rectangle([sx - 10, 115, sx + 10, 310], radius=4, fill=(130, 75, 45, 255), outline=(85, 48, 28, 255), width=1)
        # Stitched edge dots
        for sy_dot in range(125, 300, 12):
            draw.point([(sx - 6, sy_dot), (sx + 6, sy_dot)], fill=(210, 175, 130, 255))
        # Brass Buckle
        draw.rounded_rectangle([sx - 14, 230, sx + 14, 256], radius=4, fill=(210, 165, 75, 255), outline=(135, 100, 40, 255), width=2)
        draw.rectangle([sx - 8, 238, sx + 8, 248], fill=(130, 75, 45, 255))
        draw.line([(sx, 230), (sx, 256)], fill=(245, 215, 135, 255), width=2)

    # Leather brand badge in center
    draw.rounded_rectangle([cx - 28, 305, cx + 28, 335], radius=4, fill=(145, 85, 50, 255), outline=(90, 50, 30, 255), width=1)
    draw.text((cx - 20, 314), "VOYAGE", fill=(235, 205, 170, 255), font=get_font(9, bold=True))

    return img

def create_prop_lighter_antique():
    """prop_lighter_antique: Antique Brass Lighter (192x288)"""
    w, h = 192, 288
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Shadow on table contact point
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([30, 245, 162, 275], fill=(20, 15, 10, 120))
    shadow = shadow.filter(ImageFilter.GaussianBlur(5))
    img.paste(shadow, (0, 0), shadow)

    cx = w // 2
    lw, lh = 86, 140

    # Lighter Base Case (Warm Brass)
    bx0, by0, bx1, by1 = cx - lw // 2, 115, cx + lw // 2, 115 + lh
    draw.rounded_rectangle([bx0, by0, bx1, by1], radius=8, fill=(215, 165, 65, 255), outline=(145, 105, 35, 255), width=2)

    # Inner brushed brass highlights
    for x_line in range(bx0 + 4, bx1 - 4, 6):
        draw.line([(x_line, by0 + 4), (x_line, by1 - 4)], fill=(235, 190, 95, 120), width=1)

    # Engraved vintage floral filigree pattern
    f_center_y = by0 + lh // 2
    draw.arc([cx - 24, f_center_y - 28, cx + 24, f_center_y + 28], 30, 330, fill=(155, 110, 35, 220), width=2)
    draw.arc([cx - 15, f_center_y - 18, cx + 15, f_center_y + 18], 210, 150, fill=(155, 110, 35, 220), width=2)
    draw.ellipse([cx - 4, f_center_y - 4, cx + 4, f_center_y + 4], fill=(135, 95, 30, 255))

    # Chimney / Windguard (Silver/Steel with holes)
    ch_x0, ch_y0, ch_x1, ch_y1 = bx0 + 12, 60, bx1 - 12, by0 + 2
    draw.rectangle([ch_x0, ch_y0, ch_x1, ch_y1], fill=(175, 182, 192, 255), outline=(115, 122, 130, 255), width=2)
    # Windguard ventilation holes
    for h_row in [72, 86, 100]:
        for h_col in [ch_x0 + 14, cx, ch_x1 - 14]:
            draw.ellipse([h_col - 4, h_row - 4, h_col + 4, h_row + 4], fill=(65, 70, 80, 255))

    # Flint Wheel (To the right)
    draw.rounded_rectangle([ch_x1 - 18, 52, ch_x1 + 4, 82], radius=4, fill=(130, 135, 145, 255), outline=(80, 85, 95, 255), width=2)
    for wr in range(56, 80, 4):
        draw.line([(ch_x1 - 16, wr), (ch_x1 + 2, wr)], fill=(70, 75, 85, 255), width=1)

    # Flip Top Lid (Tilted Open at 65 degrees)
    lid = Image.new("RGBA", (100, 70), (0, 0, 0, 0))
    lid_draw = ImageDraw.Draw(lid)
    lid_draw.rounded_rectangle([4, 4, 96, 60], radius=8, fill=(215, 165, 65, 255), outline=(145, 105, 35, 255), width=2)
    lid_draw.line([(10, 12), (90, 12)], fill=(245, 205, 115, 220), width=2)
    lid_rot = lid.rotate(55, expand=True, resample=Image.Resampling.BILINEAR)
    img.paste(lid_rot, (bx0 - 38, 22), lid_rot)

    # Brass hinge on left
    draw.rounded_rectangle([bx0 - 5, by0 - 2, bx0 + 7, by0 + 16], radius=3, fill=(185, 135, 45, 255), outline=(115, 80, 25, 255), width=1)

    return img

def create_prop_laptop():
    """prop_laptop: Creative Studio Laptop (480x320)"""
    w, h = 480, 320
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cast shadow on desk
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([40, 270, 440, 310], fill=(15, 20, 28, 90))
    shadow = shadow.filter(ImageFilter.GaussianBlur(8))
    img.paste(shadow, (0, 0), shadow)

    cx = w // 2

    # Upper Display Screen (Tilted slightly back)
    # Display Outer Bezel
    disp_pts = [
        (cx - 170, 35),
        (cx + 170, 35),
        (cx + 185, 205),
        (cx - 185, 205),
    ]
    draw.polygon(disp_pts, fill=(32, 38, 48, 255))
    draw.line(disp_pts + [disp_pts[0]], fill=(55, 65, 80, 255), width=2)

    # Active Display Panel (IDE & UI Canvas with Cyan/Purple Glow)
    scr_pts = [
        (cx - 156, 46),
        (cx + 156, 46),
        (cx + 170, 195),
        (cx - 170, 195),
    ]
    draw.polygon(scr_pts, fill=(16, 22, 32, 255))

    # IDE / Creative Code interface
    # Sidebar
    draw.polygon([(cx - 156, 46), (cx - 110, 46), (cx - 118, 195), (cx - 170, 195)], fill=(24, 30, 42, 255))
    # Code editor lines
    colors = [(95, 175, 235), (235, 140, 95), (140, 215, 125), (180, 130, 230), (220, 230, 245)]
    f_tiny = get_font(9)
    for row_idx, y_pos in enumerate(range(60, 185, 14)):
        c = colors[row_idx % len(colors)]
        t_w = 40 + (row_idx * 17) % 130
        draw.line([(cx - 100, y_pos), (cx - 100 + t_w, y_pos)], fill=c + (230,), width=3)

    # Subtle screen glow projection
    s_glow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    ImageDraw.Draw(s_glow).polygon(scr_pts, fill=(60, 140, 240, 40))
    s_glow = s_glow.filter(ImageFilter.GaussianBlur(10))
    img.paste(s_glow, (0, 0), s_glow)

    # Laptop Base / Keyboard deck (Perspective trapezoid)
    base_pts = [
        (cx - 195, 205),
        (cx + 195, 205),
        (cx + 225, 285),
        (cx - 225, 285),
    ]
    draw.polygon(base_pts, fill=(50, 58, 72, 255))
    draw.line(base_pts + [base_pts[0]], fill=(75, 88, 106, 255), width=2)
    # Front chamfered edge
    draw.polygon([(cx - 225, 285), (cx + 225, 285), (cx + 220, 292), (cx - 220, 292)], fill=(38, 44, 55, 255))

    # Keyboard Well
    kb_pts = [
        (cx - 165, 212),
        (cx + 165, 212),
        (cx + 185, 255),
        (cx - 185, 255),
    ]
    draw.polygon(kb_pts, fill=(35, 40, 50, 255))

    # Chiclet Key rows
    for r_idx, ky in enumerate(range(216, 252, 7)):
        for kx in range(cx - 150 + r_idx * 2, cx + 150 - r_idx * 2, 14):
            draw.rectangle([kx, ky, kx + 10, ky + 4], fill=(22, 26, 32, 255), outline=(50, 60, 75, 200), width=1)

    # Trackpad
    draw.polygon([(cx - 45, 260), (cx + 45, 260), (cx + 50, 280), (cx - 50, 280)], fill=(42, 50, 62, 255), outline=(68, 78, 95, 255), width=1)

    return img

def create_prop_agus_cat():
    """prop_agus_cat: Sleeping Tabby Cat (384x256)"""
    w, h = 384, 256
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cast shadow under cushion
    shadow = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    s_draw = ImageDraw.Draw(shadow)
    s_draw.ellipse([45, 175, 339, 240], fill=(20, 18, 16, 95))
    shadow = shadow.filter(ImageFilter.GaussianBlur(6))
    img.paste(shadow, (0, 0), shadow)

    cx, cy = w // 2, 175

    # Cozy round woven linen cushion
    draw.ellipse([cx - 135, cy - 45, cx + 135, cy + 45], fill=(228, 222, 210, 255), outline=(190, 182, 168, 255), width=2)
    # Cushion piping seam
    draw.ellipse([cx - 128, cy - 40, cx + 128, cy + 40], fill=(240, 235, 225, 255))

    # Cat sleeping in curled donut ball
    cat_body = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    c_draw = ImageDraw.Draw(cat_body)

    # Main curled body ellipse
    c_draw.ellipse([cx - 95, cy - 65, cx + 75, cy + 25], fill=(225, 135, 65, 255))
    # Soft cream tummy / chest
    c_draw.ellipse([cx - 45, cy - 35, cx + 45, cy + 18], fill=(252, 242, 225, 255))

    # Tabby stripes on back
    for sx in range(cx - 75, cx + 45, 16):
        c_draw.arc([sx - 10, cy - 62, sx + 18, cy - 20], 30, 150, fill=(165, 80, 30, 255), width=5)

    # Cat Head nestled into body
    hx, hy = cx + 55, cy - 30
    c_draw.ellipse([hx - 36, hy - 32, hx + 36, hy + 32], fill=(225, 135, 65, 255))
    c_draw.ellipse([hx - 22, hy - 8, hx + 22, hy + 26], fill=(252, 242, 225, 255))

    # Cat Ears
    # Left Ear
    c_draw.polygon([(hx - 28, hy - 25), (hx - 38, hy - 58), (hx - 12, hy - 34)], fill=(210, 120, 50, 255))
    c_draw.polygon([(hx - 26, hy - 28), (hx - 34, hy - 52), (hx - 16, hy - 35)], fill=(245, 185, 185, 255))
    # Right Ear
    c_draw.polygon([(hx + 5, hy - 34), (hx + 26, hy - 58), (hx + 28, hy - 22)], fill=(210, 120, 50, 255))
    c_draw.polygon([(hx + 8, hy - 34), (hx + 23, hy - 52), (hx + 25, hy - 25)], fill=(245, 185, 185, 255))

    # Cute peaceful sleeping face
    # Closed curved sleeping eyes (^ ^)
    c_draw.arc([hx - 20, hy - 8, hx - 6, hy + 4], 0, 180, fill=(95, 45, 20, 255), width=2)
    c_draw.arc([hx + 6, hy - 8, hx + 20, hy + 4], 0, 180, fill=(95, 45, 20, 255), width=2)
    # Pink nose & mouth
    c_draw.polygon([(hx - 3, hy + 6), (hx + 3, hy + 6), (hx, hy + 10)], fill=(240, 140, 140, 255))
    c_draw.arc([hx - 8, hy + 8, hx, hy + 16], 0, 180, fill=(95, 45, 20, 255), width=2)
    c_draw.arc([hx, hy + 8, hx + 8, hy + 16], 0, 180, fill=(95, 45, 20, 255), width=2)

    # Curled Tail wrapping around front with white tip
    tail_pts = [
        (cx - 90, cy - 10),
        (cx - 105, cy + 15),
        (cx - 60, cy + 32),
        (cx + 10, cy + 30),
        (cx + 65, cy + 15),
    ]
    for p_idx in range(len(tail_pts) - 1):
        c_draw.line([tail_pts[p_idx], tail_pts[p_idx + 1]], fill=(225, 135, 65, 255), width=16)
    # White tail tip
    c_draw.ellipse([cx + 55, cy + 5, cx + 75, cy + 25], fill=(255, 250, 240, 255))

    img.paste(cat_body, (0, 0), cat_body)
    return img

def create_prop_dog_rescue():
    """prop_dog_rescue: Stray Dog with Umbrella (440x400)"""
    w, h = 440, 400
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Wet pavement slab with rain ripples
    cx = w // 2
    py0, py1 = 330, 385
    draw.ellipse([cx - 160, py0, cx + 160, py1], fill=(45, 52, 62, 220), outline=(75, 88, 104, 180), width=2)
    # Rain puddle reflections
    draw.ellipse([cx - 120, py0 + 12, cx + 120, py1 - 12], fill=(32, 40, 52, 240))
    for r_x in [cx - 80, cx + 60, cx - 10]:
        draw.ellipse([r_x - 18, py0 + 20, r_x + 18, py0 + 30], outline=(140, 175, 215, 180), width=1)

    # Dog sitting peacefully waiting
    # Warm golden/honey coat
    dx, dy = cx - 15, 295

    # Dog body (Sitting pose)
    draw.ellipse([dx - 45, dy - 55, dx + 45, dy + 45], fill=(195, 135, 75, 255))
    # Soft cream chest patch
    draw.ellipse([dx - 22, dy - 30, dx + 22, dy + 35], fill=(245, 230, 205, 255))
    # Front paws resting on stone
    draw.ellipse([dx - 28, dy + 28, dx - 8, dy + 48], fill=(245, 230, 205, 255), outline=(160, 105, 55, 255), width=1)
    draw.ellipse([dx + 8, dy + 28, dx + 28, dy + 48], fill=(245, 230, 205, 255), outline=(160, 105, 55, 255), width=1)

    # Dog Head
    dhx, dhy = dx, dy - 60
    draw.ellipse([dhx - 38, dhy - 35, dhx + 38, dhy + 35], fill=(195, 135, 75, 255))
    # Floppy Ears
    draw.ellipse([dhx - 48, dhy - 25, dhx - 22, dhy + 35], fill=(155, 95, 45, 255))
    draw.ellipse([dhx + 22, dhy - 25, dhx + 48, dhy + 35], fill=(155, 95, 45, 255))

    # Snout & Nose
    draw.ellipse([dhx - 18, dhy + 2, dhx + 18, dhy + 26], fill=(245, 230, 205, 255))
    draw.polygon([(dhx - 8, dhy + 6), (dhx + 8, dhy + 6), (dhx, dhy + 15)], fill=(35, 25, 25, 255))
    draw.arc([dhx - 10, dhy + 14, dhx, dhy + 24], 0, 180, fill=(50, 30, 25, 255), width=2)
    draw.arc([dhx, dhy + 14, dhx + 10, dhy + 24], 0, 180, fill=(50, 30, 25, 255), width=2)

    # Big expressive innocent puppy eyes
    for ex in [dhx - 16, dhx + 16]:
        draw.ellipse([ex - 8, dhy - 14, ex + 8, dhy + 4], fill=(42, 26, 18, 255))
        draw.ellipse([ex - 5, dhy - 12, ex - 1, dhy - 7], fill=(255, 255, 255, 255))

    # Tilted Yellow Dome Umbrella covering the puppy
    # Umbrella Shaft / Stick
    draw.line([(cx + 35, 95), (cx + 35, 345)], fill=(120, 125, 135, 255), width=5)
    # J-Curved Wooden Handle
    draw.arc([cx + 20, 335, cx + 45, 365], 0, 180, fill=(125, 75, 40, 255), width=6)

    # Umbrella Canopy (Bright Sunshine Yellow)
    ux0, uy0, ux1, uy1 = cx - 155, 65, cx + 165, 220
    # Outer canopy dome
    draw.chord([ux0, uy0, ux1, uy1], 180, 360, fill=(255, 215, 60, 245), outline=(220, 175, 30, 255), width=3)

    # Umbrella canopy panels & ribs
    draw.line([(cx + 5, uy0 + 10), (ux0 + 40, uy1 - 25)], fill=(225, 180, 35, 255), width=2)
    draw.line([(cx + 5, uy0 + 10), (cx - 20, uy1 - 10)], fill=(225, 180, 35, 255), width=2)
    draw.line([(cx + 5, uy0 + 10), (cx + 60, uy1 - 15)], fill=(225, 180, 35, 255), width=2)
    draw.line([(cx + 5, uy0 + 10), (ux1 - 40, uy1 - 28)], fill=(225, 180, 35, 255), width=2)

    # Umbrella top ferrule tip
    draw.rounded_rectangle([cx + 2, uy0 - 8, cx + 8, uy0 + 10], radius=2, fill=(130, 80, 45, 255))

    # Rain drops bouncing off canopy
    for rx, ry in [(ux0 + 30, uy0 + 45), (cx - 50, uy0 + 18), (cx + 80, uy0 + 35), (ux1 - 20, uy1 - 15)]:
        draw.ellipse([rx - 2, ry - 2, rx + 2, ry + 2], fill=(230, 245, 255, 200))
        draw.line([(rx, ry), (rx - 4, ry - 8)], fill=(210, 235, 255, 160), width=1)

    return img

# Roster of 9 Props
PROPS_DEF = [
    {
        "id": "prop_phone",
        "name": "Dual Timezone Smartphone",
        "category": "INTERACTIVE",
        "creator": create_prop_phone,
        "width": 256,
        "height": 512,
        "anchor": {"name": "hand_grip", "x": 0.5, "y": 0.85},
        "scenes": ["ch3_night_phone_msg"],
        "priority": "P0"
    },
    {
        "id": "prop_coffee",
        "name": "Steaming Ceramic Mug",
        "category": "STATIC_REUSABLE",
        "creator": create_prop_coffee,
        "width": 256,
        "height": 256,
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scenes": ["ch1_intro_1", "ch1_intro_2", "ch1_nadia_enters", "ch1_dialogue_1", "ch1_closing"],
        "priority": "P0"
    },
    {
        "id": "prop_old_photo",
        "name": "Campus Polaroid Photograph",
        "category": "INTERACTIVE",
        "creator": create_prop_old_photo,
        "width": 320,
        "height": 384,
        "anchor": {"name": "center", "x": 0.5, "y": 0.5},
        "scenes": ["ch3_book_discovery", "ending_secret_scene"],
        "priority": "P0"
    },
    {
        "id": "prop_train_ticket",
        "name": "Last-Minute Train Ticket",
        "category": "INTERACTIVE",
        "creator": create_prop_train_ticket,
        "width": 384,
        "height": 200,
        "anchor": {"name": "center", "x": 0.5, "y": 0.5},
        "scenes": ["ch2_bus_stop", "ch3_ticket_revelation", "ch4_station_climax"],
        "priority": "P0"
    },
    {
        "id": "prop_backpack",
        "name": "Travel Canvas Backpack",
        "category": "CHARACTER_HELD",
        "creator": create_prop_backpack,
        "width": 384,
        "height": 480,
        "anchor": {"name": "bottom-center", "x": 0.5, "y": 0.95},
        "scenes": ["ch4_station_climax", "ending_true_scene", "ending_romantic_scene", "ending_bittersweet_scene"],
        "priority": "P1"
    },
    {
        "id": "prop_lighter_antique",
        "name": "Antique Brass Lighter",
        "category": "INTERACTIVE",
        "creator": create_prop_lighter_antique,
        "width": 192,
        "height": 288,
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scenes": ["ch1_intro_2"],
        "priority": "P1"
    },
    {
        "id": "prop_laptop",
        "name": "Creative Studio Laptop",
        "category": "STATIC_REUSABLE",
        "creator": create_prop_laptop,
        "width": 480,
        "height": 320,
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scenes": ["SC-20", "SC-38", "SC-08", "SC-30"],
        "priority": "P1"
    },
    {
        "id": "prop_agus_cat",
        "name": "Sleeping Tabby Cat",
        "category": "STATIC_REUSABLE",
        "creator": create_prop_agus_cat,
        "width": 384,
        "height": 256,
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scenes": ["SC-08", "SC-30"],
        "priority": "P1"
    },
    {
        "id": "prop_dog_rescue",
        "name": "Stray Dog with Umbrella",
        "category": "STATIC_REUSABLE",
        "creator": create_prop_dog_rescue,
        "width": 440,
        "height": 400,
        "anchor": {"name": "bottom-center", "x": 0.5, "y": 0.95},
        "scenes": ["ch2_street_1", "ch2_slow_walk"],
        "priority": "P2"
    }
]

def main():
    print("=== GENERATING 9 INDEPENDENT PROP ASSETS ===")
    
    generated_props = []

    for prop in PROPS_DEF:
        p_id = prop["id"]
        creator = prop["creator"]
        img = creator()

        png_path = os.path.join(MASTERS_DIR, f"{p_id}.png")
        webp_path = os.path.join(MASTERS_DIR, f"{p_id}.webp")

        img.save(png_path, "PNG", optimize=True)
        img.save(webp_path, "WEBP", quality=92, lossless=False)

        png_size = os.path.getsize(png_path)
        webp_size = os.path.getsize(webp_path)

        print(f"[{prop['priority']}] {p_id:22} -> PNG: {png_size/1024:.1f} KB | WebP: {webp_size/1024:.1f} KB ({img.width}x{img.height})")
        generated_props.append((prop, img))

    # Generate 3x3 Contact Sheet
    print("\n=== GENERATING PROPS CONTACT SHEET (3x3 GRID) ===")
    sheet_w, sheet_h = 1600, 1600
    sheet = Image.new("RGBA", (sheet_w, sheet_h), (18, 22, 30, 255))
    s_draw = ImageDraw.Draw(sheet)

    # Title header
    f_title = get_font(26, bold=True)
    f_header = get_font(13)
    s_draw.rectangle([0, 0, sheet_w, 75], fill=(12, 15, 22, 255))
    s_draw.text((30, 16), "2 HOURS APART • INDEPENDENT PROPS CONTACT SHEET", fill=(245, 195, 95, 255), font=f_title)
    s_draw.text((30, 48), "Canonical Masters • Transparent RGBA • Standardized Anchors • 9/9 Reusable Props", fill=(160, 180, 205, 255), font=f_header)

    cell_w = sheet_w // 3
    cell_h = (sheet_h - 75) // 3

    # Checkerboard pattern helper for transparency demonstration
    def draw_checkerboard(draw_obj, x0, y0, x1, y1, sz=12):
        for cx in range(x0, x1, sz):
            for cy in range(y0, y1, sz):
                if ((cx // sz) + (cy // sz)) % 2 == 0:
                    draw_obj.rectangle([cx, cy, min(cx + sz, x1), min(cy + sz, y1)], fill=(28, 34, 46, 255))
                else:
                    draw_obj.rectangle([cx, cy, min(cx + sz, x1), min(cy + sz, y1)], fill=(22, 27, 38, 255))

    for idx, (prop, p_img) in enumerate(generated_props):
        grid_x = idx % 3
        grid_y = idx // 3

        x0 = grid_x * cell_w
        y0 = 75 + grid_y * cell_h
        x1 = x0 + cell_w
        y1 = y0 + cell_h

        # Cell border
        s_draw.rectangle([x0, y0, x1, y1], outline=(40, 50, 70, 255), width=1)

        # Checkerboard background for alpha preview
        draw_checkerboard(s_draw, x0 + 10, y0 + 10, x1 - 10, y1 - 45)

        # Fit thumbnail inside cell preview area
        thumb_area_w = cell_w - 40
        thumb_area_h = cell_h - 75
        scale = min(thumb_area_w / p_img.width, thumb_area_h / p_img.height, 1.0)
        t_w = int(p_img.width * scale)
        t_h = int(p_img.height * scale)
        thumb = p_img.resize((t_w, t_h), Image.Resampling.LANCZOS)

        paste_x = x0 + (cell_w - t_w) // 2
        paste_y = y0 + 15 + (thumb_area_h - t_h) // 2
        sheet.paste(thumb, (paste_x, paste_y), thumb)

        # Draw anchor crosshair on thumbnail
        anchor = prop["anchor"]
        ax = paste_x + int(t_w * anchor["x"])
        ay = paste_y + int(t_h * anchor["y"])
        s_draw.ellipse([ax - 4, ay - 4, ax + 4, ay + 4], fill=(255, 60, 60, 255), outline=(255, 255, 255, 255), width=1)
        s_draw.line([(ax - 8, ay), (ax + 8, ay)], fill=(255, 255, 255, 200), width=1)
        s_draw.line([(ax, ay - 8), (ax, ay + 8)], fill=(255, 255, 255, 200), width=1)

        # Metadata banner at bottom of cell
        s_draw.rectangle([x0, y1 - 40, x1, y1], fill=(14, 18, 26, 255))
        s_draw.text((x0 + 14, y1 - 36), f"{prop['id']} ({prop['width']}x{prop['height']})", fill=(255, 215, 120, 255), font=get_font(12, bold=True))
        s_draw.text((x0 + 14, y1 - 19), f"Anchor: {anchor['name']} ({anchor['x']},{anchor['y']}) • {prop['category']}", fill=(150, 175, 200, 255), font=get_font(10))

    contact_sheet_path = os.path.join(PREVIEWS_DIR, "props_contact_sheet.png")
    sheet.save(contact_sheet_path, "PNG", optimize=True)
    print(f"[PASS] Contact sheet saved: {contact_sheet_path} ({os.path.getsize(contact_sheet_path)/1024:.1f} KB)")

if __name__ == "__main__":
    main()
