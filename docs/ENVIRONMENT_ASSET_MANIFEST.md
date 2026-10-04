# ENVIRONMENT ASSET MANIFEST

**Project:** 2 HOURS APART — Interactive Web Story Engine  
**Pipeline:** Scene Visual Audit + Environment Asset Manifest  
**Date:** 2026-10-03  
**Status:** **READY FOR ENVIRONMENT MASTER GENERATION**  

---

```text
========================================
ENVIRONMENT ASSET MANIFEST
========================================

TOTAL ENVIRONMENT MASTERS: 12
TOTAL TIME/WEATHER VARIANTS: 19
ASPECT RATIOS: 9:16 (Portrait Mobile) / 16:9 (Landscape Desktop)
STANDARD TARGET RESOLUTION: 1080x1920 (Portrait), 1920x1080 (Landscape)
PREFERRED FORMAT: WebP (Lossless / Quality 92)
LAYER ARCHITECTURE: 2.5D Multi-Depth (Background, Midground, Character Space Y=1460, Foreground)
```

---

## 1. ENVIRONMENT MASTER SPECIFICATIONS

### 1. `env_campus_cafe_master`
- **Environment ID:** `env_campus_cafe_master`
- **Location:** `loc_campus_cafe` (Kafe Kroma · Campus Interior)
- **Master / Variant / Modifier:** Environment Master (Base Architectural Anchor)
- **Scenes:** `ch1_intro_1`, `ch1_intro_2`, `ch1_nadia_enters`, `ch1_dialogue_1`, `ch1_react_warm`, `ch1_react_honest`, `ch1_react_care`, `ch1_sit_down`, `ch1_hands_cg_scene`, `ch1_confession_start`, `ch1_closing`, `SC-01`, `SC-02`, `SC-04`, `SC-11`, `SC-16`, `SC-40`
- **Layers:**
  1. `layer_bg_cafe_glass` (Z: 0, Parallax: 0.0) — Exterior wet street, blurred traffic lights through plate glass
  2. `layer_mid_cafe_interior` (Z: 20, Parallax: 0.05) — Rustic dark oak table, barista counter, espresso machine, hanging amber Edison bulbs
  3. `layer_char_cafe_space` (Z: 30) — Seated/standing character plane at baseline `Y = 1460`
  4. `layer_fg_cafe_raindrops` (Z: 50, Parallax: 0.12) — Crisp condensation droplets and water rivulets clinging to foreground glass
- **Parallax:** Subtle horizontal parallax (+-15px on mobile gyroscope / mouse move)
- **Camera:** 50mm eye-level focal length, medium framing, center focal alignment
- **Composition:** Intimate cafe corner booth; table lower third, large glass window upper two-thirds; left-side entrance doorway
- **Lighting:** Warm tungsten amber (2700K) interior contrasting with cool blue-slate exterior (6500K)
- **Mood:** Cozy, melancholic, intimate romantic tension
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Mobile Portrait Master), `1920x1080` (Desktop Companion)
- **Format:** WebP (Q92)
- **Priority:** **P0** (Critical Path)
- **Reuse Count:** 17 Scenes (11 Runtime + 6 Blueprint)
- **Dependencies:** None (Top-level master)
- **Generation Notes:** Modern Indonesian campus indie coffee shop, dark teak wood, brass accents, rainy glass reflections, cinematic Makoto Shinkai lighting influence, soft bokeh, no visible humans in base master plate.

---

### 2. `env_street_night_master`
- **Environment ID:** `env_street_night_master`
- **Location:** `loc_street_night` (Jalanan Kota Berhujan & Halte Bus)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `ch2_street_1`, `ch2_street_dialogue`, `ch2_lean_closer`, `ch2_hold_shoulder`, `ch2_slow_walk`, `ch2_bus_stop`
- **Layers:**
  1. `layer_bg_street_skyline` (Z: 0, Parallax: 0.0) — Dark rainy city buildings with illuminated window grids
  2. `layer_mid_street_sidewalk` (Z: 20, Parallax: 0.04) — Wet asphalt pedestrian walkway, glistening puddle reflections, metal road barrier
  3. `layer_char_street_space` (Z: 30) — Walking/standing plane at baseline `Y = 1460`
  4. `layer_fg_street_lamppost` (Z: 50, Parallax: 0.15) — Cast-iron sodium streetlight pole framing screen edge, casting amber cone
- **Parallax:** Multi-layer lateral parallax (+-25px between foreground post and distant skyline)
- **Camera:** 35mm wide-to-medium cinematic perspective, slightly low camera angle
- **Composition:** Vanishing street perspective slightly angled toward right; sidewalk occupying lower half
- **Lighting:** Warm yellow sodium streetlamps (2200K) reflecting off pitch-black wet asphalt; specular water highlights
- **Mood:** Romantic solitude, quiet urban rain, lingering steps
- **Safe Zones:** Character `[X: 0.15, Y: 0.32, W: 0.70, H: 0.62]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P0**
- **Reuse Count:** 6 Scenes
- **Dependencies:** None
- **Generation Notes:** Wet tropical urban Indonesian sidewalk, clean asphalt with puddle reflections of amber streetlamps and distant neon signage, heavy atmosphere, rainy mist.

---

### 3. `env_nana_bedroom_master`
- **Environment ID:** `env_nana_bedroom_master`
- **Location:** `loc_nana_bedroom` (Kamar Nana · Studio Apartment)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `ch3_book_discovery`, `ch3_polaroid_dialogue`, `ch3_ticket_revelation`, `ch3_deep_confession`, `ch3_silent_comfort`, `ch3_night_phone_msg`, `SC-07`, `SC-26`
- **Layers:**
  1. `layer_bg_nana_window` (Z: 0, Parallax: 0.0) — Apartment window overlooking nighttime city skyline and rain
  2. `layer_mid_nana_desk` (Z: 20, Parallax: 0.04) — Solid light oak study desk, scattered graphic design books, notebook, pencil mug, bed corner
  3. `layer_char_nana_space` (Z: 30) — Desk/bed seating plane at baseline `Y = 1460`
  4. `layer_fg_nana_curtain` (Z: 50, Parallax: 0.12) — Sheer cream fabric curtain gently swaying on left margin
- **Parallax:** Subtle room depth (+-10px)
- **Camera:** 50mm eye-level, intimate indoor angle
- **Composition:** Desk placed in foreground-midground; window frame on right; warm pool of light center-desk
- **Lighting:** Desk lamp pool of warm halogen light (3000K), fairy lights string, contrasting with midnight blue exterior
- **Mood:** Intimate, nostalgic, vulnerable, late-night quiet
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P0**
- **Reuse Count:** 8 Scenes (6 Runtime + 2 Blueprint)
- **Dependencies:** None
- **Generation Notes:** Cozy female creative professional bedroom, art prints pinned on corkboard, neat but lived-in desk, warm lamp illumination, midnight rain visible through clean window.

---

### 4. `env_agus_room_master`
- **Environment ID:** `env_agus_room_master`
- **Location:** `loc_agus_room` (Kamar Kerja Agus · Zona WIT)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-08`, `SC-14`, `SC-21`, `SC-30`, `SC-35`
- **Layers:**
  1. `layer_bg_agus_wall` (Z: 0, Parallax: 0.0) — Dark acoustic slate wall, reference bookshelf, technical diagrams
  2. `layer_mid_agus_desk` (Z: 20, Parallax: 0.04) — Dual monitors with terminal/editor code, ergonomic keyboard, audio monitors, cat basket
  3. `layer_char_agus_space` (Z: 30) — Ergonomic desk chair plane at baseline `Y = 1460`
  4. `layer_fg_agus_monitor_rim` (Z: 50, Parallax: 0.12) — Subtle corner silhouette of close monitor bezel
- **Parallax:** Subtle (+-10px)
- **Camera:** 50mm straight-on desk perspective
- **Composition:** Center desk work area; dual monitors creating bilateral symmetry; dark moody surroundings
- **Lighting:** Dual monitor glow (cyan 480nm / white), faint warm desk LED strip (3500K)
- **Mood:** Focused, late-night tech solitude, remote connection
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P0**
- **Reuse Count:** 5 Scenes
- **Dependencies:** None
- **Generation Notes:** Clean minimalist programmer workstation, dual displays with code editor, mechanical keyboard, tidy cables, sleepy orange tabby cat resting in plush desk basket.

---

### 5. `env_station_master`
- **Environment ID:** `env_station_master`
- **Location:** `loc_station` (Peron Stasiun Kereta Api Senja)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `ch4_station_climax`, `ch4_final_choice`, `ending_true_scene`, `ending_romantic_scene`, `ending_bittersweet_scene`, `SC-28`, `SC-29`
- **Layers:**
  1. `layer_bg_station_sky` (Z: 0, Parallax: 0.0) — Golden-crimson sunset horizon, distant power pylons, layered cloud banks
  2. `layer_mid_station_tracks` (Z: 20, Parallax: 0.06) — Steel overhead platform trusses, departure LED board, railway tracks receding into distance, passenger train carriage
  3. `layer_char_station_space` (Z: 30) — Platform edge behind yellow tactile tiles at baseline `Y = 1460`
  4. `layer_fg_station_pillar` (Z: 50, Parallax: 0.14) — Heavy steel support pillar in dark silhouette on foreground edge
- **Parallax:** Dynamic wide parallax (+-30px)
- **Camera:** 35mm wide angle, low horizon line enhancing expansive sky
- **Composition:** Platform edge on left receding toward vanishing point on right; overhead trusses framing top
- **Lighting:** Blazing golden hour sunset (1800K) creating high-contrast rim lighting and long silhouettes
- **Mood:** Climactic, bittersweet, decisive, emotional departure
- **Safe Zones:** Character `[X: 0.12, Y: 0.32, W: 0.76, H: 0.62]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P0**
- **Reuse Count:** 7 Scenes (5 Runtime + 2 Blueprint)
- **Dependencies:** None
- **Generation Notes:** Indonesian intercity train station platform (e.g. Gambir/Tugu style), industrial steel rafters, polished concrete platform with yellow safety edge, warm blinding sunset light shining down the rails.

---

### 6. `env_rooftop_master`
- **Environment ID:** `env_rooftop_master`
- **Location:** `loc_rooftop` (Rooftop Gedung Kota · Bintang Senja)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `ending_secret_scene`
- **Layers:**
  1. `layer_bg_rooftop_stars` (Z: 0, Parallax: 0.0) — Deep indigo night sky dense with twinkling stars and faint Milky Way dusting, distant city light dome
  2. `layer_mid_rooftop_terrace` (Z: 20, Parallax: 0.05) — Industrial metal railing, concrete pavers, air conditioning unit housing
  3. `layer_char_rooftop_space` (Z: 30) — Railing boundary standing space at baseline `Y = 1460`
  4. `layer_fg_rooftop_cables` (Z: 50, Parallax: 0.12) — Overhead hanging festoon bulbs / cable wire silhouette in upper corner
- **Parallax:** Medium (+-18px)
- **Camera:** 50mm cinematic eye-level
- **Composition:** Railing cutting horizontally across mid-lower third; expansive sky occupying upper 60%
- **Lighting:** Ambient cool starlight and lunar silver (7500K) with warm soft city bokeh glow from below
- **Mood:** Romantic, transcendent, peaceful, magical resolution
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P1**
- **Reuse Count:** 1 Scene (Special Climax Ending)
- **Dependencies:** None
- **Generation Notes:** High city rooftop terrace at clear night, expansive unpolluted starry night sky, modern skyscraper silhouette, soft city bokeh lights below.

---

### 7. `env_campus_master`
- **Environment ID:** `env_campus_master`
- **Location:** `loc_campus` (Pelataran & Tangga Kampus)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-03`, `SC-06`
- **Layers:**
  1. `layer_bg_campus_facade` (Z: 0, Parallax: 0.0) — Modern university brick lecture buildings and lush tropical greenery
  2. `layer_mid_campus_steps` (Z: 20, Parallax: 0.05) — Wide stone amphitheater steps, manicured grass verge, concrete walkway
  3. `layer_char_campus_space` (Z: 30) — Step terrace at baseline `Y = 1460`
  4. `layer_fg_campus_leaves` (Z: 50, Parallax: 0.12) — Lush tropical tree branches and leaves framing upper left
- **Parallax:** Wide depth (+-20px)
- **Camera:** 35mm wide outdoor perspective
- **Composition:** Diagonal stone staircase sweeping from bottom left to center; campus greenery background
- **Lighting:** Bright natural daylight (5500K) or golden dusk
- **Mood:** Youthful, vibrant, open, academic
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P1**
- **Reuse Count:** 2 Scenes
- **Dependencies:** None
- **Generation Notes:** Prestigious Indonesian university courtyard, wide stone stairs, tropical trees casting dappled sunlight shadows, architectural red-brick building facade.

---

### 8. `env_office_master`
- **Environment ID:** `env_office_master`
- **Location:** `loc_office` (Studio Desain Grafis Nana)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-20`, `SC-38`
- **Layers:**
  1. `layer_bg_office_windows` (Z: 0, Parallax: 0.0) — High-floor glass curtain wall showing sunny metropolitan skyline
  2. `layer_mid_office_benches` (Z: 20, Parallax: 0.04) — Long Scandinavian blonde-wood communal table, design books, color swatch books, monitor
  3. `layer_char_office_space` (Z: 30) — Studio chair/standing plane at baseline `Y = 1460`
  4. `layer_fg_office_plant` (Z: 50, Parallax: 0.12) — Large potted fiddle-leaf fig or monstera leaf in foreground corner
- **Parallax:** Subtle room depth (+-12px)
- **Camera:** 50mm eye-level
- **Composition:** Modern open-plan creative workspace; warm sunlight angling through large windows
- **Lighting:** Warm natural afternoon sunbeams (4000K), soft shadows
- **Mood:** Professional, creative, bustling yet organized
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P1**
- **Reuse Count:** 2 Scenes
- **Dependencies:** None
- **Generation Notes:** High-end boutique design agency interior, blonde wood, concrete floors, floor-to-ceiling windows, moodboards pinned on white walls, afternoon golden sunlight.

---

### 9. `env_beach_master`
- **Environment ID:** `env_beach_master`
- **Location:** `loc_beach` (Tebing Pantai Senja & Bangku Kayu)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-31`
- **Layers:**
  1. `layer_bg_beach_ocean` (Z: 0, Parallax: 0.0) — Vast ocean horizon with breaking white surf and vibrant orange-pink sunset
  2. `layer_mid_beach_cliff` (Z: 20, Parallax: 0.05) — Grassy clifftop ridge, weathered driftwood bench, dirt footpath
  3. `layer_char_beach_space` (Z: 30) — Clifftop bench standing plane at baseline `Y = 1460`
  4. `layer_fg_beach_grass` (Z: 50, Parallax: 0.14) — Windblown coastal wild sea grass in foreground bottom
- **Parallax:** Wide scenic depth (+-22px)
- **Camera:** 35mm wide landscape view
- **Composition:** Clifftop bench centered-right overlooking wide expanse of ocean and sunset sky
- **Lighting:** Radiant sunset glow (2000K), water reflections, warm coastal mist
- **Mood:** Serene, contemplative, romantic escapism
- **Safe Zones:** Character `[X: 0.12, Y: 0.32, W: 0.76, H: 0.62]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P2**
- **Reuse Count:** 1 Scene
- **Dependencies:** None
- **Generation Notes:** Dramatic coastal grassy cliff overlooking ocean, rustic wooden bench, rolling sea waves, glowing sunset horizon, light coastal breeze.

---

### 10. `env_mountain_master`
- **Environment ID:** `env_mountain_master`
- **Location:** `loc_mountain` (Puncak Bukit & Jalur Kabut)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-32`
- **Layers:**
  1. `layer_bg_mountain_clouds` (Z: 0, Parallax: 0.0) — Sea of morning mist clouds, distant mountain ridges bathed in rose-gold dawn
  2. `layer_mid_mountain_trail` (Z: 20, Parallax: 0.05) — Rocky trail crest, weathered wooden fence post, pine tree trunks
  3. `layer_char_mountain_space` (Z: 30) — Ridge crest baseline `Y = 1460`
  4. `layer_fg_mountain_pines` (Z: 50, Parallax: 0.15) — Silhouetted pine branch needles framing upper right
- **Parallax:** High multi-plane mountain depth (+-25px)
- **Camera:** 35mm wide scenic view
- **Composition:** Ridge footpath leading from bottom left toward panoramic view of dawn cloud inversion
- **Lighting:** Early dawn light, rose gold and pastel amber (3200K) cutting through morning mist
- **Mood:** Fresh, hopeful, adventurous, breathtaking
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P2**
- **Reuse Count:** 1 Scene
- **Dependencies:** None
- **Generation Notes:** High alpine mountain ridge above clouds in Indonesia (e.g. Bromo/Prau aesthetic), sea of white clouds, crisp dawn sunlight, pine trees, morning fog.

---

### 11. `env_nana_house_master`
- **Environment ID:** `env_nana_house_master`
- **Location:** `loc_nana_house` (Rumah Keluarga Nana · Ruang Makan)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-23`
- **Layers:**
  1. `layer_bg_house_wall` (Z: 0, Parallax: 0.0) — Domestic warm beige wall, framed family portrait, wooden louvre window
  2. `layer_mid_house_table` (Z: 20, Parallax: 0.04) — Polished teak dining table with ceramic plates, sambal bowls, drinking glasses, wooden chairs
  3. `layer_char_house_space` (Z: 30) — Dining chair seating plane at baseline `Y = 1460`
  4. `layer_fg_house_lamp` (Z: 50, Parallax: 0.12) — Woven rattan ceiling pendant lamp edge at top
- **Parallax:** Subtle indoor (+-10px)
- **Camera:** 50mm eye-level dining view
- **Composition:** Teak table centered across lower-middle; warm family dining setting
- **Lighting:** Domestic warm incandescent lighting (2700K)
- **Mood:** Domestic warmth, familial expectation, gentle nostalgia
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P2**
- **Reuse Count:** 1 Scene
- **Dependencies:** None
- **Generation Notes:** Warm Indonesian suburban family dining room, solid teak furniture, ceramic dining set, soft ambient warm ceiling lamp, cozy evening atmosphere.

---

### 12. `env_shared_apartment_master`
- **Environment ID:** `env_shared_apartment_master`
- **Location:** `loc_shared_apartment` (Apartemen Masa Depan Bersama)
- **Master / Variant / Modifier:** Environment Master
- **Scenes:** `SC-39`
- **Layers:**
  1. `layer_bg_shared_window` (Z: 0, Parallax: 0.0) — Bright sunlit window wall overlooking tranquil leafy neighborhood
  2. `layer_mid_shared_room` (Z: 20, Parallax: 0.04) — Half-unpacked cardboard moving boxes, low wooden coffee table with two matching ceramic mugs, wool floor rug
  3. `layer_char_shared_space` (Z: 30) — Seated/standing open room space at baseline `Y = 1460`
  4. `layer_fg_shared_curtain` (Z: 50, Parallax: 0.12) — Translucent white linen curtain corner billowing in breeze
- **Parallax:** Subtle room depth (+-10px)
- **Camera:** 50mm gentle perspective
- **Composition:** Open living area bathed in golden sunlight; table with two mugs as focal symbol
- **Lighting:** Soft golden hour sunset streaming across wood floor (3000K)
- **Mood:** Serene, fulfilled, optimistic, home
- **Safe Zones:** Character `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`, Dialogue `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Resolution Target:** `1080x1920` (Portrait), `1920x1080` (Landscape)
- **Format:** WebP (Q92)
- **Priority:** **P2**
- **Reuse Count:** 1 Scene
- **Dependencies:** None
- **Generation Notes:** Sunlit newly moved-in apartment, clean light oak hardwood floors, cardboard packing boxes with books, two coffee cups side by side on coffee table, sheer white curtains, golden sunset light.

---

## 2. TIME & WEATHER VARIANT REGISTRY (19 VARIANTS)

| Variant ID | Parent Master | Time | Weather | Lighting Signature | Target Scenes |
|:---|:---|:---:|:---:|:---|:---|
| `env_campus_cafe_night_rain` | `env_campus_cafe_master` | Night | Rain | Warm tungsten, rain streaks on glass | 10 runtime scenes (`ch1`) |
| `env_campus_cafe_afternoon_sunlit` | `env_campus_cafe_master` | Afternoon | Clear | Golden-hour sunbeams through window | 6 blueprint scenes |
| `env_street_rain_sidewalk` | `env_street_night_master` | Night | Rain | Sodium yellow reflections on wet road | 5 runtime scenes (`ch2`) |
| `env_street_bus_stop` | `env_street_night_master` | Night | Rain | Fluorescent shelter light, dark rain | 1 runtime scene (`ch2_bus_stop`) |
| `env_nana_bedroom_midnight_rain` | `env_nana_bedroom_master` | Night | Rain | Desk lamp (00:10 WIB), window raindrops | 6 runtime scenes (`ch3`) |
| `env_nana_bedroom_morning_clear` | `env_nana_bedroom_master` | Morning | Clear | Soft morning dawn, dust motes | 2 blueprint scenes |
| `env_agus_room_midnight_screen` | `env_agus_room_master` | Night | Clear | Dual monitor cyan glow (02:10 WIT) | 2 blueprint scenes |
| `env_agus_room_daylight_clean` | `env_agus_room_master` | Morning | Clear | Clean daylight, sleeping tabby cat | 2 blueprint scenes |
| `env_station_sunset_platform` | `env_station_master` | Sunset | Clear | Intense amber horizon, platform rim light | 4 runtime scenes (`ch4`, endings) |
| `env_station_sunset_train_interior`| `env_station_master` | Sunset | Clear | Carriage interior, sunbeams through seats | 1 runtime scene (`ending_romantic`) |
| `env_station_morning_arrival` | `env_station_master` | Morning | Clear | Morning platform rush, clean sunlight | 2 blueprint scenes |
| `env_rooftop_night_stars` | `env_rooftop_master` | Night | Stars | Indigo starlight, distant city bokeh | 1 runtime scene (`ending_secret`) |
| `env_campus_midday` | `env_campus_master` | Afternoon | Clear | Crisp midday sun, tree leaf shadows | 1 blueprint scene |
| `env_campus_dusk` | `env_campus_master` | Dusk | Clear | Violet-gold dusk sky, stone stairs | 1 blueprint scene |
| `env_office_afternoon` | `env_office_master` | Afternoon | Clear | Warm studio daylight, blonde wood | 2 blueprint scenes |
| `env_beach_sunset` | `env_beach_master` | Sunset | Clear | Crimson-orange coastal sunset, waves | 1 blueprint scene |
| `env_mountain_dawn` | `env_mountain_master` | Morning | Fog | Rose-gold mist, sea of clouds | 1 blueprint scene |
| `env_nana_house_evening` | `env_nana_house_master` | Night | Clear | Warm domestic incandescent light | 1 blueprint scene |
| `env_shared_apartment_sunset` | `env_shared_apartment_master` | Sunset | Clear | Serene golden sunset across wooden floor | 1 blueprint scene |

---

## 3. PROPS & FORESHADOW ITEMS MANIFEST

| Prop ID | Name | Classification | Usage Scene | Technical Format | Priority |
|:---|:---|:---:|:---|:---:|:---:|
| `prop_phone` | Dual Timezone Smartphone | Interactive UI | `ch3_night_phone_msg` | Transparent PNG overlay (9:16) | P0 |
| `prop_coffee` | Steaming Ceramic Mug | Environment Prop | `ch1_intro_1` to `ch1_closing` | WebP cutout | P0 |
| `prop_old_photo` | Campus Polaroid Photograph | Foreshadow Item | `ch3_book_discovery`, Secret Ending | WebP cutout | P0 |
| `prop_train_ticket`| Last-Minute Train Ticket | Foreshadow Item | `ch2_bus_stop`, `ch3`, `ch4` | WebP cutout | P0 |
| `prop_backpack` | Travel Canvas Backpack | Character-Held | `ch4_station_climax`, Endings | WebP cutout | P1 |
| `prop_lighter_antique` | Antique Brass Lighter | Foreshadow Item | `ch1_intro_2` | WebP cutout | P1 |
| `prop_laptop` | Creative Studio Laptop | Environment Prop | Studio / Work Scenes | WebP cutout | P1 |
| `prop_agus_cat` | Sleeping Tabby Cat | Environment Prop | `SC-08`, `SC-30` | WebP cutout | P1 |
| `prop_dog_rescue` | Stray Dog with Umbrella | Environment Prop | Rainy Street Scenes | WebP cutout | P2 |

---

## 4. ATMOSPHERE & PROCEDURAL FX MANIFEST

1. **`fx_rain_procedural`:**
   - **Type:** Directional DOM/CSS particle drops (35-degree angle).
   - **Performance:** Low CPU/GPU (< 2% CPU on mobile).
   - **Reduced Motion:** Fully hidden or replaced with static wet gradient when `prefers-reduced-motion: reduce`.
2. **`fx_fog_mist`:**
   - **Type:** Multi-layered CSS linear gradient drift.
   - **Performance:** Hardware-accelerated GPU opacity blend.
   - **Reduced Motion:** Static misty gradient overlay.
3. **`fx_dust_motes`:**
   - **Type:** 12 floating golden motes for sunbeam interior scenes.
   - **Performance:** Zero layout reflow (CSS `transform` only).
   - **Reduced Motion:** Hidden.
4. **`fx_screen_glow_late_night`:**
   - **Type:** Cyan radial gradient overlay for bedroom / workstation scenes.
   - **Performance:** Pure CSS `mix-blend-mode: screen`.
5. **`fx_cinematic_vignette`:**
   - **Type:** Dynamic responsive perimeter shadow (`radial-gradient`).

---

## 5. ACTION CG MANIFEST

1. **`cg_hands_coffee`:** Touching hands over warm coffee cup on wooden table (`ch1_hands_cg_scene`). Resolution: `1080x1920`. Format: WebP.
2. **`cg_umbrella_rain`:** Two silhouettes walking close under clear umbrella in rain (`ch2_street_1`). Resolution: `1080x1920`. Format: WebP.
3. **`cg_old_photograph`:** Top-down view of novel page 42 with polaroid photo tucked inside (`ch3_book_discovery`). Resolution: `1080x1920`. Format: WebP.
4. **`cg_phone_message`:** Glowing phone screen in dark bedroom showing text at 02:14 AM (`ch3_night_phone_msg`). Resolution: `1080x1920`. Format: WebP.

---

## 6. ASSET GENERATION EXECUTION READINESS CHECKLIST

- [x] All 12 canonical environment IDs finalized and registered.
- [x] All 29 runtime scenes mapped to exact environments and layers.
- [x] Safe zones calibrated to protect character faces and dialogue UI.
- [x] 2.5D layer decomposition (Z: 0, 20, 30, 50) standardized across all scenes.
- [x] Style consistency parameters aligned with Shinkai/Kyoto Animation aesthetic.
- [x] Zero image generation executed during audit phase.
- [x] Canonical character assets (Nana, Agus, 8 Secondary NPCs) remain locked.
