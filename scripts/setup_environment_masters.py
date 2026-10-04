import os
import shutil
from PIL import Image, ImageDraw, ImageFont

BRAIN_DIR = r"C:\Users\Z Series\.gemini\antigravity\brain\86fc757c-78f1-44e8-9c60-8933924f5daf"
EXISTING_ENV_DIR = r"public\assets\stories\two-hours-apart\masters\environments"
TARGET_MASTERS_DIR = r"public\assets\environments\masters"
TARGET_PREVIEWS_DIR = r"public\assets\environments\previews"
STORY_ENV_DIR = r"public\assets\stories\two-hours-apart\masters\environments"

os.makedirs(TARGET_MASTERS_DIR, exist_ok=True)
os.makedirs(TARGET_PREVIEWS_DIR, exist_ok=True)
os.makedirs(STORY_ENV_DIR, exist_ok=True)

ENVIRONMENTS = [
    {
        "id": "env_campus_cafe_master",
        "name": "Kafe Kroma Interior",
        "location": "loc_campus_cafe",
        "source": os.path.join(EXISTING_ENV_DIR, "env_campus_cafe.jpg"),
        "legacy_name": "env_campus_cafe.jpg"
    },
    {
        "id": "env_street_night_master",
        "name": "Jalanan Kota Berhujan & Halte",
        "location": "loc_street_night",
        "source": os.path.join(BRAIN_DIR, "env_street_night_1791021443411.jpg"),
        "legacy_name": "env_street_night.jpg"
    },
    {
        "id": "env_nana_bedroom_master",
        "name": "Kamar Apartemen Nana",
        "location": "loc_nana_bedroom",
        "source": os.path.join(EXISTING_ENV_DIR, "env_nana_bedroom.jpg"),
        "legacy_name": "env_nana_bedroom.jpg"
    },
    {
        "id": "env_agus_room_master",
        "name": "Kamar Kerja Agus (Zona WIT)",
        "location": "loc_agus_room",
        "source": os.path.join(EXISTING_ENV_DIR, "env_agus_room.jpg"),
        "legacy_name": "env_agus_room.jpg"
    },
    {
        "id": "env_station_master",
        "name": "Peron Stasiun Kereta Api",
        "location": "loc_station",
        "source": os.path.join(BRAIN_DIR, "env_station_sunset_1791021461934.jpg"),
        "legacy_name": "env_station.jpg"
    },
    {
        "id": "env_rooftop_master",
        "name": "Rooftop Gedung Kota",
        "location": "loc_rooftop",
        "source": os.path.join(BRAIN_DIR, "env_rooftop_night_1791021502362.jpg"),
        "legacy_name": "env_rooftop.jpg"
    },
    {
        "id": "env_campus_master",
        "name": "Pelataran & Tangga Kampus",
        "location": "loc_campus",
        "source": os.path.join(EXISTING_ENV_DIR, "env_campus.jpg"),
        "legacy_name": "env_campus.jpg"
    },
    {
        "id": "env_office_master",
        "name": "Studio Desain Grafis Nana",
        "location": "loc_office",
        "source": os.path.join(EXISTING_ENV_DIR, "env_office.jpg"),
        "legacy_name": "env_office.jpg"
    },
    {
        "id": "env_beach_master",
        "name": "Tebing Pantai Senja",
        "location": "loc_beach",
        "source": os.path.join(BRAIN_DIR, "env_beach_sunset_1791021530765.jpg"),
        "legacy_name": "env_beach.jpg"
    },
    {
        "id": "env_mountain_master",
        "name": "Puncak Bukit & Jalur Kabut",
        "location": "loc_mountain",
        "source": os.path.join(BRAIN_DIR, "env_mountain_dawn_1791021555407.jpg"),
        "legacy_name": "env_mountain.jpg"
    },
    {
        "id": "env_nana_house_master",
        "name": "Rumah Keluarga Nana",
        "location": "loc_nana_house",
        "source": os.path.join(BRAIN_DIR, "env_nana_house_1791021584254.jpg"),
        "legacy_name": "env_nana_house.jpg"
    },
    {
        "id": "env_shared_apartment_master",
        "name": "Apartemen Masa Depan Bersama",
        "location": "loc_shared_apartment",
        "source": os.path.join(BRAIN_DIR, "env_shared_apartment_1791021611468.jpg"),
        "legacy_name": "env_shared_apartment.jpg"
    }
]

print("=== DEPLOYING 12 ENVIRONMENT MASTERS ===")

processed_images = []

for env in ENVIRONMENTS:
    src = env["source"]
    if not os.path.exists(src):
        raise FileNotFoundError(f"Missing source file: {src}")
    
    img = Image.open(src)
    w, h = img.size
    print(f"[{env['id']}] Source: {src} ({w}x{h})")
    
    # Save standard jpg and webp to TARGET_MASTERS_DIR
    target_jpg = os.path.join(TARGET_MASTERS_DIR, f"{env['id']}.jpg")
    target_webp = os.path.join(TARGET_MASTERS_DIR, f"{env['id']}.webp")
    
    img.save(target_jpg, quality=95)
    img.save(target_webp, quality=92, method=6)
    
    # Mirror to STORY_ENV_DIR
    story_jpg = os.path.join(STORY_ENV_DIR, env["legacy_name"])
    shutil.copyfile(target_jpg, story_jpg)
    
    # Also save with canonical id in story env dir
    shutil.copyfile(target_jpg, os.path.join(STORY_ENV_DIR, f"{env['id']}.jpg"))
    shutil.copyfile(target_webp, os.path.join(STORY_ENV_DIR, f"{env['id']}.webp"))
    
    processed_images.append({
        "env": env,
        "image": img,
        "size_kb_jpg": os.path.getsize(target_jpg) / 1024,
        "size_kb_webp": os.path.getsize(target_webp) / 1024
    })

print("\nAll 12 environment masters deployed successfully.")

# GENERATE CONTACT SHEET
print("\n=== GENERATING CONTACT SHEET ===")
# 4 columns, 3 rows grid
# Cell size: 480 x 268 (16:9) + 40px label bar
CELL_W = 480
CELL_H = 268
LABEL_H = 44
GRID_COLS = 4
GRID_ROWS = 3
PADDING = 20

SHEET_W = (CELL_W * GRID_COLS) + (PADDING * (GRID_COLS + 1))
SHEET_H = ((CELL_H + LABEL_H) * GRID_ROWS) + (PADDING * (GRID_ROWS + 1)) + 60 # +60 for title header

sheet = Image.new("RGB", (SHEET_W, SHEET_H), color=(18, 20, 24))
draw = ImageDraw.Draw(sheet)

# Draw Title Header
try:
    font_title = ImageFont.truetype("arial.ttf", 26)
    font_label = ImageFont.truetype("arial.ttf", 15)
    font_sub = ImageFont.truetype("arial.ttf", 12)
except Exception:
    font_title = ImageFont.load_default()
    font_label = ImageFont.load_default()
    font_sub = ImageFont.load_default()

draw.text((PADDING, 16), "2 HOURS APART - CANONICAL ENVIRONMENT MASTERS (12/12 APPROVED)", fill=(240, 240, 245), font=font_title)

for idx, item in enumerate(processed_images):
    col = idx % GRID_COLS
    row = idx // GRID_COLS
    
    x = PADDING + col * (CELL_W + PADDING)
    y = 60 + PADDING + row * (CELL_H + LABEL_H + PADDING)
    
    # Resize thumbnail
    thumb = item["image"].resize((CELL_W, CELL_H), Image.Resampling.LANCZOS)
    sheet.paste(thumb, (x, y))
    
    # Draw label box below thumbnail
    label_y = y + CELL_H
    draw.rectangle([x, label_y, x + CELL_W, label_y + LABEL_H], fill=(28, 32, 38))
    
    # Text
    env_id = item["env"]["id"]
    env_name = item["env"]["name"]
    loc_id = item["env"]["location"]
    size_info = f"1376x768 | WebP: {item['size_kb_webp']:.0f}KB | JPG: {item['size_kb_jpg']:.0f}KB"
    
    draw.text((x + 8, label_y + 4), f"{env_id} ({env_name})", fill=(255, 215, 0), font=font_label)
    draw.text((x + 8, label_y + 24), f"Location: {loc_id} | {size_info}", fill=(180, 190, 205), font=font_sub)
    
    # Border
    draw.rectangle([x, y, x + CELL_W, label_y + LABEL_H], outline=(60, 70, 85), width=2)

contact_sheet_path = os.path.join(TARGET_PREVIEWS_DIR, "environment_masters_contact_sheet.png")
sheet.save(contact_sheet_path, "PNG", optimize=True)
print(f"Contact sheet saved to: {contact_sheet_path}")

# Also mirror to story previews
story_preview_dir = r"public\assets\stories\two-hours-apart\previews"
os.makedirs(story_preview_dir, exist_ok=True)
shutil.copyfile(contact_sheet_path, os.path.join(story_preview_dir, "environment_masters_contact_sheet.png"))
print("Contact sheet mirrored to story previews.")
