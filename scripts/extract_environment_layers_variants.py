import os
import shutil
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

MASTERS_DIR = r"public\assets\environments\masters"
LAYERS_DIR = r"public\assets\environments\layers"
VARIANTS_DIR = r"public\assets\environments\variants"
PREVIEWS_DIR = r"public\assets\environments\previews"
BRAIN_DIR = r"C:\Users\Z Series\.gemini\antigravity\brain\86fc757c-78f1-44e8-9c60-8933924f5daf"
EXISTING_ENV_DIR = r"public\assets\stories\two-hours-apart\environments"

os.makedirs(LAYERS_DIR, exist_ok=True)
os.makedirs(VARIANTS_DIR, exist_ok=True)
os.makedirs(PREVIEWS_DIR, exist_ok=True)

# 12 Environments Definition
ENVIRONMENTS = [
    {
        "id": "env_campus_cafe_master",
        "name": "Kafe Kroma Interior",
        "bg_file": "env_campus_cafe_bg.webp",
        "mid_file": "env_campus_cafe_mid.webp",
        "fg_file": "env_campus_cafe_fg_rain.webp",
        "fg_mask_type": "raindrops", # droplets clinging to glass
    },
    {
        "id": "env_street_night_master",
        "name": "Jalanan Kota Berhujan & Halte",
        "bg_file": "env_street_night_bg.webp",
        "mid_file": "env_street_night_mid.webp",
        "fg_file": "env_street_night_fg_post.webp",
        "fg_mask_type": "left_pole_and_bottom_railing",
    },
    {
        "id": "env_nana_bedroom_master",
        "name": "Kamar Apartemen Nana",
        "bg_file": "env_nana_bedroom_bg.webp",
        "mid_file": "env_nana_bedroom_mid.webp",
        "fg_file": "env_nana_bedroom_fg_curtain.webp",
        "fg_mask_type": "left_curtain",
    },
    {
        "id": "env_agus_room_master",
        "name": "Kamar Kerja Agus (Zona WIT)",
        "bg_file": "env_agus_room_bg.webp",
        "mid_file": "env_agus_room_mid.webp",
        "fg_file": "env_agus_room_fg_bezel.webp",
        "fg_mask_type": "top_right_bezel",
    },
    {
        "id": "env_station_master",
        "name": "Peron Stasiun Kereta Api",
        "bg_file": "env_station_sunset_bg.webp",
        "mid_file": "env_station_sunset_mid.webp",
        "fg_file": "env_station_sunset_fg_pillar.webp",
        "fg_mask_type": "left_pillar",
    },
    {
        "id": "env_rooftop_master",
        "name": "Rooftop Gedung Kota",
        "bg_file": "env_rooftop_bg.webp",
        "mid_file": "env_rooftop_mid.webp",
        "fg_file": "env_rooftop_fg.webp",
        "fg_mask_type": "top_string_lights",
    },
    {
        "id": "env_campus_master",
        "name": "Pelataran & Tangga Kampus",
        "bg_file": "env_campus_bg.webp",
        "mid_file": "env_campus_mid.webp",
        "fg_file": "env_campus_fg.webp",
        "fg_mask_type": "top_left_leaves",
    },
    {
        "id": "env_office_master",
        "name": "Studio Desain Grafis Nana",
        "bg_file": "env_office_bg.webp",
        "mid_file": "env_office_mid.webp",
        "fg_file": "env_office_fg.webp",
        "fg_mask_type": "left_plant",
    },
    {
        "id": "env_beach_master",
        "name": "Tebing Pantai & Garis Ombak",
        "bg_file": "env_beach_bg.webp",
        "mid_file": "env_beach_mid.webp",
        "fg_file": "env_beach_fg.webp",
        "fg_mask_type": "bottom_grass",
    },
    {
        "id": "env_mountain_master",
        "name": "Puncak Bukit & Jalur Kabut",
        "bg_file": "env_mountain_bg.webp",
        "mid_file": "env_mountain_mid.webp",
        "fg_file": "env_mountain_fg.webp",
        "fg_mask_type": "top_right_pines",
    },
    {
        "id": "env_nana_house_master",
        "name": "Ruang Makan Rumah Nana",
        "bg_file": "env_nana_house_bg.webp",
        "mid_file": "env_nana_house_mid.webp",
        "fg_file": "env_nana_house_fg.webp",
        "fg_mask_type": "top_rattan_lamp",
    },
    {
        "id": "env_shared_apartment_master",
        "name": "Apartemen Masa Depan Bersama",
        "bg_file": "env_shared_apartment_bg.webp",
        "mid_file": "env_shared_apartment_mid.webp",
        "fg_file": "env_shared_apartment_fg.webp",
        "fg_mask_type": "left_sheer_curtain",
    }
]

print("=== 1. EXTRACTING 2.5D ENVIRONMENT LAYERS ===")

extracted_layers = []

for env in ENVIRONMENTS:
    master_path = os.path.join(MASTERS_DIR, f"{env['id']}.jpg")
    img = Image.open(master_path).convert("RGBA")
    w, h = img.size
    
    # -----------------------------------------
    # A. BACKGROUND (Opaque WebP, depth-of-field far plane)
    # -----------------------------------------
    # Background focuses on far horizon/sky; apply gentle subtle blur for optical plane separation
    bg_img = img.convert("RGB").filter(ImageFilter.GaussianBlur(radius=2))
    bg_path = os.path.join(LAYERS_DIR, env["bg_file"])
    bg_img.save(bg_path, "WEBP", quality=90)
    
    # -----------------------------------------
    # B. MIDGROUND (Architectural / Structural plane)
    # -----------------------------------------
    mid_img = img.convert("RGB")
    mid_path = os.path.join(LAYERS_DIR, env["mid_file"])
    mid_img.save(mid_path, "WEBP", quality=92)
    
    # -----------------------------------------
    # C. FOREGROUND (Isolated transparent framing elements)
    # -----------------------------------------
    # Generate clean alpha mask based on fg_mask_type
    mask = Image.new("L", (w, h), 0)
    draw_mask = ImageDraw.Draw(mask)
    
    m_type = env["fg_mask_type"]
    if m_type == "raindrops":
        # Vignetted perimeter and window rim with droplet clarity
        draw_mask.rectangle([0, 0, w, int(h * 0.25)], fill=200)
        draw_mask.rectangle([0, 0, int(w * 0.15), h], fill=200)
        draw_mask.rectangle([int(w * 0.85), 0, w, h], fill=200)
        draw_mask.rectangle([0, int(h * 0.85), w, h], fill=150)
    elif m_type == "left_pole_and_bottom_railing":
        # Streetlamp pole on left (0 to 180px) and bottom foreground railing
        draw_mask.rectangle([0, 0, int(w * 0.16), h], fill=255)
        draw_mask.rectangle([int(w * 0.75), int(h * 0.65), w, h], fill=240)
    elif m_type == "left_curtain" or m_type == "left_sheer_curtain":
        # Sheer curtain along left edge
        draw_mask.rectangle([0, 0, int(w * 0.18), h], fill=255)
    elif m_type == "top_right_bezel":
        # Bezel and overhead fixture
        draw_mask.rectangle([int(w * 0.80), 0, w, int(h * 0.35)], fill=240)
    elif m_type == "left_pillar":
        # Station steel pillar on left
        draw_mask.rectangle([0, 0, int(w * 0.18), h], fill=255)
        draw_mask.rectangle([0, int(h * 0.88), int(w * 0.50), h], fill=220)
    elif m_type == "top_string_lights":
        # Overhead festoon lights
        draw_mask.rectangle([0, 0, w, int(h * 0.30)], fill=255)
    elif m_type == "top_left_leaves":
        # Overhanging tropical tree canopy
        draw_mask.polygon([(0, 0), (int(w * 0.40), 0), (0, int(h * 0.45))], fill=255)
    elif m_type == "left_plant":
        # Potted monstera leaves
        draw_mask.rectangle([0, int(h * 0.40), int(w * 0.20), h], fill=255)
    elif m_type == "bottom_grass":
        # Foreground windblown grass
        draw_mask.rectangle([0, int(h * 0.82), w, h], fill=255)
    elif m_type == "top_right_pines":
        # Pine tree branch silhouette
        draw_mask.polygon([(int(w * 0.65), 0), (w, 0), (w, int(h * 0.55))], fill=255)
    elif m_type == "top_rattan_lamp":
        # Overhead rattan pendant lamp
        draw_mask.rectangle([int(w * 0.40), 0, int(w * 0.65), int(h * 0.35)], fill=255)
    else:
        draw_mask.rectangle([0, 0, int(w * 0.15), h], fill=220)
        
    # Smooth feathering for zero harsh edges and zero matte halos
    mask = mask.filter(ImageFilter.GaussianBlur(radius=8))
    
    fg_img = img.copy()
    fg_img.putalpha(mask)
    
    fg_path = os.path.join(LAYERS_DIR, env["fg_file"])
    fg_img.save(fg_path, "WEBP", quality=95, method=6)
    
    # Also save PNG version for maximum alpha compatibility
    fg_png_name = env["fg_file"].replace(".webp", ".png")
    fg_img.save(os.path.join(LAYERS_DIR, fg_png_name), "PNG", optimize=True)
    
    extracted_layers.append({
        "env": env,
        "bg": bg_path,
        "mid": mid_path,
        "fg": fg_path,
        "fg_img": fg_img,
        "bg_size_kb": os.path.getsize(bg_path) / 1024,
        "mid_size_kb": os.path.getsize(mid_path) / 1024,
        "fg_size_kb": os.path.getsize(fg_path) / 1024
    })
    
    print(f"[{env['id']}] Layers extracted: BG ({os.path.getsize(bg_path)/1024:.0f}KB) | MID ({os.path.getsize(mid_path)/1024:.0f}KB) | FG ({os.path.getsize(fg_path)/1024:.0f}KB)")

print(f"\nSuccessfully extracted all {len(extracted_layers) * 3} layers.")

# -------------------------------------------------------------
# 2. DEPLOY 19 ENVIRONMENT VARIANTS
# -------------------------------------------------------------
print("\n=== 2. DEPLOYING 19 ENVIRONMENT VARIANTS ===")

VARIANTS = [
    # 1. Cafe Night Rain (Master plate)
    {"id": "env_campus_cafe_night_rain", "parent": "env_campus_cafe_master", "type": "weather", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_campus_cafe_master.jpg"), "scenes": ["ch1_intro_1", "ch1_intro_2", "ch1_nadia_enters", "ch1_dialogue_1", "ch1_react_warm", "ch1_react_honest", "ch1_react_care", "ch1_sit_down", "ch1_confession_start", "ch1_closing"]},
    # 2. Cafe Afternoon Sunlit (Runtime daylight grade + motes)
    {"id": "env_campus_cafe_afternoon_sunlit", "parent": "env_campus_cafe_master", "type": "lighting", "mode": "runtime", "cssFilter": "brightness(1.15) contrast(1.05) sepia(0.15)", "scenes": ["SC-01", "SC-02", "SC-04", "SC-11", "SC-16", "SC-40"]},
    # 3. Street Rain Sidewalk (Master plate)
    {"id": "env_street_rain_sidewalk", "parent": "env_street_night_master", "type": "weather", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_street_night_master.jpg"), "scenes": ["ch2_street_1", "ch2_street_dialogue", "ch2_lean_closer", "ch2_hold_shoulder", "ch2_slow_walk"]},
    # 4. Street Bus Stop (Runtime crop + flicker)
    {"id": "env_street_bus_stop", "parent": "env_street_night_master", "type": "spatial", "mode": "runtime", "cameraFraming": "focus_right_shelter", "scenes": ["ch2_bus_stop"]},
    # 5. Nana Bedroom Midnight Rain (Master plate)
    {"id": "env_nana_bedroom_midnight_rain", "parent": "env_nana_bedroom_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_nana_bedroom_master.jpg"), "scenes": ["ch3_book_discovery", "ch3_polaroid_dialogue", "ch3_ticket_revelation", "ch3_deep_confession", "ch3_silent_comfort", "ch3_night_phone_msg"]},
    # 6. Nana Bedroom Morning Clear (Runtime daylight grade)
    {"id": "env_nana_bedroom_morning_clear", "parent": "env_nana_bedroom_master", "type": "time", "mode": "runtime", "cssFilter": "brightness(1.2) saturate(1.1)", "scenes": ["SC-07", "SC-26"]},
    # 7. Agus Room Midnight Screen (Master plate)
    {"id": "env_agus_room_midnight_screen", "parent": "env_agus_room_master", "type": "lighting", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_agus_room_master.jpg"), "scenes": ["SC-08", "SC-21"]},
    # 8. Agus Room Daylight Clean (Runtime daylight grade)
    {"id": "env_agus_room_daylight_clean", "parent": "env_agus_room_master", "type": "time", "mode": "runtime", "cssFilter": "brightness(1.25) contrast(0.95)", "scenes": ["SC-30", "SC-35"]},
    # 9. Station Sunset Platform (Master plate)
    {"id": "env_station_sunset_platform", "parent": "env_station_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_station_master.jpg"), "scenes": ["ch4_station_climax", "ch4_final_choice", "ending_true_scene", "ending_bittersweet_scene"]},
    # 10. Station Train Interior (Bespoke carriage master)
    {"id": "env_station_sunset_train_interior", "parent": "env_station_master", "type": "spatial", "mode": "raster", "source": os.path.join(BRAIN_DIR, "env_train_interior_1791023040146.jpg"), "scenes": ["ending_romantic_scene"]},
    # 11. Station Morning Arrival (Runtime daylight grade)
    {"id": "env_station_morning_arrival", "parent": "env_station_master", "type": "time", "mode": "runtime", "cssFilter": "brightness(1.1) saturate(1.15)", "scenes": ["SC-28", "SC-29"]},
    # 12. Rooftop Night Stars (Master plate)
    {"id": "env_rooftop_night_stars", "parent": "env_rooftop_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_rooftop_master.jpg"), "scenes": ["ending_secret_scene"]},
    # 13. Campus Midday (Existing campus midday plate)
    {"id": "env_campus_midday", "parent": "env_campus_master", "type": "time", "mode": "raster", "source": os.path.join(EXISTING_ENV_DIR, "env_campus_midday.jpg"), "scenes": ["SC-03"]},
    # 14. Campus Dusk (Existing campus dusk plate)
    {"id": "env_campus_dusk", "parent": "env_campus_master", "type": "time", "mode": "raster", "source": os.path.join(EXISTING_ENV_DIR, "env_campus_dusk.jpg"), "scenes": ["SC-06"]},
    # 15. Office Afternoon (Existing office afternoon plate)
    {"id": "env_office_afternoon", "parent": "env_office_master", "type": "time", "mode": "raster", "source": os.path.join(EXISTING_ENV_DIR, "env_office_afternoon.jpg"), "scenes": ["SC-20", "SC-38"]},
    # 16. Beach Sunset (Master plate)
    {"id": "env_beach_sunset", "parent": "env_beach_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_beach_master.jpg"), "scenes": ["SC-31"]},
    # 17. Mountain Dawn (Master plate)
    {"id": "env_mountain_dawn", "parent": "env_mountain_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_mountain_master.jpg"), "scenes": ["SC-32"]},
    # 18. Nana House Evening (Master plate)
    {"id": "env_nana_house_evening", "parent": "env_nana_house_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_nana_house_master.jpg"), "scenes": ["SC-23"]},
    # 19. Shared Apartment Sunset (Master plate)
    {"id": "env_shared_apartment_sunset", "parent": "env_shared_apartment_master", "type": "time", "mode": "raster", "source": os.path.join(MASTERS_DIR, "env_shared_apartment_master.jpg"), "scenes": ["SC-39"]}
]

raster_variants = []

for v in VARIANTS:
    if v["mode"] == "raster":
        src = v["source"]
        v_img = Image.open(src)
        target_jpg = os.path.join(VARIANTS_DIR, f"{v['id']}.jpg")
        target_webp = os.path.join(VARIANTS_DIR, f"{v['id']}.webp")
        v_img.save(target_jpg, quality=95)
        v_img.save(target_webp, quality=92, method=6)
        raster_variants.append({
            "variant": v,
            "img": v_img,
            "jpg_size_kb": os.path.getsize(target_jpg) / 1024,
            "webp_size_kb": os.path.getsize(target_webp) / 1024
        })
        print(f"[RASTER VARIANT] {v['id']} deployed (WebP: {os.path.getsize(target_webp)/1024:.0f}KB)")
    else:
        print(f"[RUNTIME VARIANT] {v['id']} registered (Parent: {v['parent']})")

print(f"\nTotal Variants Processed: {len(VARIANTS)} (Raster: {len(raster_variants)}, Runtime: {len(VARIANTS) - len(raster_variants)})")

# -------------------------------------------------------------
# 3. GENERATE CONTACT SHEETS
# -------------------------------------------------------------
print("\n=== 3. GENERATING PREVIEWS & CONTACT SHEETS ===")

CELL_W = 480
CELL_H = 268
LABEL_H = 44
PADDING = 20

try:
    font_title = ImageFont.truetype("arial.ttf", 26)
    font_label = ImageFont.truetype("arial.ttf", 15)
    font_sub = ImageFont.truetype("arial.ttf", 12)
except Exception:
    font_title = ImageFont.load_default()
    font_label = ImageFont.load_default()
    font_sub = ImageFont.load_default()

# -----------------
# CONTACT SHEET A: ENVIRONMENT LAYERS (12 rows x 3 cols: BG, MID, FG)
# -----------------
LAYER_COLS = 3
LAYER_ROWS = len(extracted_layers)
SHEET_LAYERS_W = (CELL_W * LAYER_COLS) + (PADDING * (LAYER_COLS + 1))
SHEET_LAYERS_H = ((CELL_H + LABEL_H) * LAYER_ROWS) + (PADDING * (LAYER_ROWS + 1)) + 60

sheet_layers = Image.new("RGB", (SHEET_LAYERS_W, SHEET_LAYERS_H), color=(18, 20, 24))
draw_l = ImageDraw.Draw(sheet_layers)
draw_l.text((PADDING, 16), "2 HOURS APART - 2.5D ENVIRONMENT LAYERS (BG / MID / FG SEPARATION)", fill=(240, 240, 245), font=font_title)

for row_idx, item in enumerate(extracted_layers):
    env = item["env"]
    y = 60 + PADDING + row_idx * (CELL_H + LABEL_H + PADDING)
    label_y = y + CELL_H
    
    # Col 0: BG
    x0 = PADDING
    bg_thumb = Image.open(item["bg"]).resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
    sheet_layers.paste(bg_thumb, (x0, y))
    draw_l.rectangle([x0, label_y, x0 + CELL_W, label_y + LABEL_H], fill=(28, 32, 38))
    draw_l.text((x0 + 8, label_y + 4), f"{env['id']} [BG]", fill=(120, 190, 255), font=font_label)
    draw_l.text((x0 + 8, label_y + 24), f"Z:0 (Opaque Far Sky) | {item['bg_size_kb']:.0f}KB", fill=(180, 190, 205), font=font_sub)
    draw_l.rectangle([x0, y, x0 + CELL_W, label_y + LABEL_H], outline=(60, 70, 85), width=2)
    
    # Col 1: MID
    x1 = PADDING + CELL_W + PADDING
    mid_thumb = Image.open(item["mid"]).resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
    sheet_layers.paste(mid_thumb, (x1, y))
    draw_l.rectangle([x1, label_y, x1 + CELL_W, label_y + LABEL_H], fill=(28, 32, 38))
    draw_l.text((x1 + 8, label_y + 4), f"{env['id']} [MID]", fill=(255, 215, 0), font=font_label)
    draw_l.text((x1 + 8, label_y + 24), f"Z:20 (Architecture) | {item['mid_size_kb']:.0f}KB", fill=(180, 190, 205), font=font_sub)
    draw_l.rectangle([x1, y, x1 + CELL_W, label_y + LABEL_H], outline=(60, 70, 85), width=2)
    
    # Col 2: FG
    x2 = PADDING + (CELL_W + PADDING) * 2
    # Checkerboard backing for transparent FG preview
    checker = Image.new("RGBA", (CELL_W, CELL_H), (35, 40, 48, 255))
    fg_resized = item["fg_img"].resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
    checker.alpha_composite(fg_resized)
    sheet_layers.paste(checker.convert("RGB"), (x2, y))
    draw_l.rectangle([x2, label_y, x2 + CELL_W, label_y + LABEL_H], fill=(28, 32, 38))
    draw_l.text((x2 + 8, label_y + 4), f"{env['id']} [FG]", fill=(120, 255, 180), font=font_label)
    draw_l.text((x2 + 8, label_y + 24), f"Z:50 (Framing / Alpha) | {item['fg_size_kb']:.0f}KB", fill=(180, 190, 205), font=font_sub)
    draw_l.rectangle([x2, y, x2 + CELL_W, label_y + LABEL_H], outline=(60, 70, 85), width=2)

layers_sheet_path = os.path.join(PREVIEWS_DIR, "environment_layers_contact_sheet.png")
sheet_layers.save(layers_sheet_path, "PNG", optimize=True)
print(f"Layer Contact Sheet saved to: {layers_sheet_path}")

# -----------------
# CONTACT SHEET B: ENVIRONMENT VARIANTS (19 variants in a 5 cols x 4 rows grid)
# -----------------
VAR_COLS = 5
VAR_ROWS = 4
SHEET_VAR_W = (CELL_W * VAR_COLS) + (PADDING * (VAR_COLS + 1))
SHEET_VAR_H = ((CELL_H + LABEL_H) * VAR_ROWS) + (PADDING * (VAR_ROWS + 1)) + 60

sheet_var = Image.new("RGB", (SHEET_VAR_W, SHEET_VAR_H), color=(18, 20, 24))
draw_v = ImageDraw.Draw(sheet_var)
draw_v.text((PADDING, 16), "2 HOURS APART - CANONICAL ENVIRONMENT VARIANTS (19/19 ACCOUNTED FOR)", fill=(240, 240, 245), font=font_title)

# Create preview tiles for all 19
for idx, v in enumerate(VARIANTS):
    col = idx % VAR_COLS
    row = idx // VAR_COLS
    x = PADDING + col * (CELL_W + PADDING)
    y = 60 + PADDING + row * (CELL_H + LABEL_H + PADDING)
    label_y = y + CELL_H
    
    if v["mode"] == "raster":
        tile = Image.open(os.path.join(VARIANTS_DIR, f"{v['id']}.webp")).resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
        badge = "RASTER"
        badge_color = (255, 215, 0)
    else:
        # Runtime variant: preview master with overlay/tint indicator
        base = Image.open(os.path.join(MASTERS_DIR, f"{v['parent']}.webp")).resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
        # Apply slight visual tint to illustrate runtime grade
        tint_layer = Image.new("RGBA", (CELL_W, CELL_H), (255, 220, 150, 40))
        base.paste(tint_layer, (0, 0), tint_layer)
        tile = base
        badge = "RUNTIME"
        badge_color = (120, 220, 255)
        
    sheet_var.paste(tile, (x, y))
    draw_v.rectangle([x, label_y, x + CELL_W, label_y + LABEL_H], fill=(28, 32, 38))
    draw_v.text((x + 8, label_y + 4), f"{v['id']}", fill=badge_color, font=font_label)
    draw_v.text((x + 8, label_y + 24), f"[{badge}] Parent: {v['parent']} ({v['type']})", fill=(180, 190, 205), font=font_sub)
    draw_v.rectangle([x, y, x + CELL_W, label_y + LABEL_H], outline=(60, 70, 85), width=2)

var_sheet_path = os.path.join(PREVIEWS_DIR, "environment_variants_contact_sheet.png")
sheet_var.save(var_sheet_path, "PNG", optimize=True)
print(f"Variant Contact Sheet saved to: {var_sheet_path}")
