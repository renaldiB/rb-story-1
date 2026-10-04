# MASTER ASSET AUDIT SUITE (GABUNGAN 5 FILE AUDIT)

**Project:** 2 HOURS APART (Interactive Web Story Engine)  
**Date:** 2026-10-03  
**Status:** Unified Reference Document  

Dokumen ini merupakan gabungan utuh dari 5 file audit aset:
1. `docs/ASSET_PIPELINE_AUDIT.md`
2. `docs/CHARACTER_CONSISTENCY_REVIEW.md`
3. `docs/SCENE_ASSET_COVERAGE.md`
4. `docs/NEXT_ASSET_PRIORITY.md`
5. `docs/ASSET_PERFORMANCE_AUDIT.md`

---
---

# BAGIAN 1: ASSET PIPELINE AUDIT REPORT
*(Sumber: `docs/ASSET_PIPELINE_AUDIT.md`)*

**Project:** 2 HOURS APART (Interactive Web Story Engine)  
**Date:** 2026-10-02  
**Audit Scope:** Public/src assets, procedural SVG layers, canonical 2.5D raster master assets, UI icons, FX shaders.

---

## 1. CHARACTER AUDIT

| Character ID | Display Name | Files Found | Expressions Found | Poses Found | Outfits Found | Master Identity Found? | Consistency System Found? | Status | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `char_nana` | Nana (Protagonist, 24) | `char_nana_master.jpg` | 4 (Smile, Pensive, Emotional, Sleepy Yawn) | 2 (Portrait Forward, Phone Hold) | 1 (Oversized Cream Knit Sweater) | YES (Locked Master Sheet) | YES (`docs/04_VISUAL_STYLE_AND_IMAGE_GENERATION_BIBLE.md`) | COMPLETE (Master Locked) | **KEEP** |
| `char_agus` | Agus (Main Character, 24) | `char_agus_master.jpg` | 4 (Smile, Exhausted/Tired, Laughing Phone, Deep Gaze) | 2 (Glasses Adjust, Phone Call) | 1 (Charcoal Zip Hoodie + Headphones) | YES (Locked Master Sheet) | YES (`docs/04_VISUAL_STYLE_AND_IMAGE_GENERATION_BIBLE.md`) | COMPLETE (Master Locked) | **KEEP** |
| `char_kaka` | Kaka (Nana's Best Friend) | None | 0 | 0 | 0 | NO | YES (Defined in Asset Bible) | MISSING | **MISSING** |
| `char_raka` | Raka (Agus's Coworker) | Procedural SVG (`visualService.tsx`) | 1 (Generic Vector) | 1 | 1 | NO | NO | PARTIAL (Placeholder) | **REMAP / REVIEW** |
| `char_dita` | Dita (Nana's Art Colleague) | None | 0 | 0 | 0 | NO | YES (Asset Bible) | MISSING | **MISSING** |
| `char_fikri` | Fikri (Nana's Boss) | None | 0 | 0 | 0 | NO | YES (Asset Bible) | MISSING | **MISSING** |
| `char_maya` | Maya (Agus's Friend/Coworker) | Procedural SVG (`visualService.tsx`) | 1 (Generic Vector) | 1 | 1 | NO | NO | PARTIAL (Placeholder) | **REMAP / REVIEW** |
| `char_bimo` | Bimo (Nana's Childhood Friend) | None | 0 | 0 | 0 | NO | YES (Asset Bible) | MISSING | **MISSING** |
| `char_ibu_nana` | Ibu Nana (Nana's Mother) | None | 0 | 0 | 0 | NO | YES (Asset Bible) | MISSING | **MISSING** |
| `char_ayah_nana` | Ayah Nana (Nana's Father) | None | 0 | 0 | 0 | NO | YES (Asset Bible) | MISSING | **MISSING** |

---

## 2. ENVIRONMENT AUDIT

| Environment ID | Environment Name | Base Asset | Layers | Lighting Variants | Weather Variants | Time Variants | Status | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `env_nana_bedroom` | Nana's Bedroom | `env_nana_bedroom.jpg` | 2.5D Ready (Window, Desk, Fairy Lights) | Tungsten Lamp + Moonlight | Rain (Window droplets), Clear | Midnight (00:10) | COMPLETE | **KEEP** |
| `env_agus_room` | Agus's Workspace | `env_agus_room.jpg` | 2.5D Ready (Desk, Dual Screens, Window) | Dual Monitor Glow + Desk Lamp | Clear / City Haze | Late Night (02:10) | COMPLETE | **KEEP** |
| `env_campus_cafe` | The Bookshelf Café | `env_campus_cafe.jpg` | 2.5D Ready (Window Garden, Tables, Counter) | Warm Golden Hour Sunlight | Clear / Sunlit | Afternoon (15:00) | COMPLETE | **KEEP** |
| `env_nana_house` | Nana's Family Living Room | None | 0 | None | None | Morning/Evening | MISSING | **MISSING** |
| `env_campus` | Campus Courtyard / Stairs | Procedural SVG (`visualService.tsx`) | Flattened Vector | Midday sun | Clear | Noon | PARTIAL | **REMAP** |
| `env_office` | Nana's Design Agency | None | 0 | Fluorescent / Afternoon | Overcast | Afternoon | MISSING | **MISSING** |
| `env_mountain` | Sunrise Overlook (Trip) | None | 0 | Sunrise Coral/Amber | Morning Fog | Dawn (05:30) | MISSING | **MISSING** |
| `env_beach` | Coastal Shore / Sunset | Procedural SVG (`visualService.tsx`) | Flattened Vector | Golden Sunset | Gentle breeze | Sunset (17:30) | PARTIAL | **REMAP** |
| `env_station` | Transit Train Station | None | 0 | Platform halogen lamps | Overcast | Night (21:00) | MISSING | **MISSING** |
| `env_airport` | Departure Gate / Terminal | None | 0 | Clean modern concourse | Rain / Night | Midnight | MISSING | **MISSING** |

---

## 3. PROP AUDIT

| Prop ID | Name | File | Reusable? | Vector / Raster | Status | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `prop_phone` | Smartphone (Dual Time UI) | In-Engine Vector / Canvas Component | YES (All Acts) | Vector / Diegetic JSX | COMPLETE | **KEEP / REUSE** |
| `prop_old_photo` | First Campus Polaroid Photo | Embedded in SVG / Asset Bible spec | YES (Act 1 & Act 5) | Vector / Spec | PARTIAL | **REMAP** |
| `prop_coffee` | Ceramic Coffee / Paper Cup | In Environment Artwork (`env_campus_cafe`, `env_nana_bedroom`) | YES | Integrated Raster | COMPLETE | **REUSE** |
| `prop_laptop` | Work Laptop | In Environment Artwork (`env_campus_cafe`, `env_agus_room`) | YES | Integrated Raster | COMPLETE | **REUSE** |
| `prop_dog_rescue` | Rescued Stray Dog | Defined in Asset Bible | Act 3 & Endings | Raster | MISSING | **MISSING** |
| `prop_agus_cat` | Sleeping Orange Tabby Cat | Integrated in `env_agus_room.jpg` | YES | Integrated Raster | COMPLETE | **REUSE** |
| `prop_train_ticket` | Physical Transit Ticket | Diegetic Component (`DiegeticInterface.tsx`) | YES (Act 4-5) | Vector / JSX | COMPLETE | **KEEP / REUSE** |

---

## 4. FX AUDIT

| FX ID | Description | Implementation Engine | Configurable? | Status | Classification |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `fx_rain` | Falling rain streaks & splash droplets | `AtmosphereLayer.tsx` (Canvas 2D RAF) | YES (density, speed, wind) | COMPLETE | **KEEP** |
| `fx_mist_fog` | Drifting atmospheric mist & fog layers | `AtmosphereLayer.tsx` (Multi-layered sin wave) | YES (opacity, speed) | COMPLETE | **KEEP** |
| `fx_dust_motes` | Floating indoor dust particles in lightbeams | `AtmosphereLayer.tsx` (Particle buffer) | YES (particle count, turbulence) | COMPLETE | **KEEP** |
| `fx_screen_glow` | Pulsing smartphone / monitor blue light | CSS keyframe glow in `DiegeticInterface.tsx` | YES | COMPLETE | **KEEP** |
| `fx_vignette` | Cinematic edge darkness & mood tint | SVG filter & CSS radial gradient | YES (8 emotional presets) | COMPLETE | **KEEP** |

---

## 5. UI ASSETS AUDIT

| UI Component | Asset Path / Implementation | Scalable? | Status | Classification |
| :--- | :--- | :--- | :--- | :--- |
| Action Icons (Settings, History, Save, Sound) | `lucide-react` + `public/icons.svg` | YES (Vector SVG) | COMPLETE | **KEEP** |
| Dialogue Box | `src/components/DialogueBox.tsx` (CSS glassmorphism, responsive) | YES (CSS) | COMPLETE | **KEEP** |
| Choice Menu | `src/components/ChoiceMenu.tsx` (Lucide icons, subtle hover sheen) | YES (CSS) | COMPLETE | **KEEP** |
| Diegetic Phone Interface | `src/components/DiegeticInterface.tsx` (Interactive modal, chat history) | YES (CSS/JSX) | COMPLETE | **KEEP** |
| Scene Debug HUD | `src/components/SceneDebugOverlay.tsx` (Live FPS, frame budget, memory, VRAM) | YES (CSS/JSX) | COMPLETE | **KEEP** |
| Favicon & Hero Branding | `public/favicon.svg`, `src/assets/hero.png` | YES | COMPLETE | **KEEP** |

---
---

# BAGIAN 2: CHARACTER CONSISTENCY REVIEW & MASTER LOCK
*(Sumber: `docs/CHARACTER_CONSISTENCY_REVIEW.md`)*

**Project:** 2 HOURS APART  
**Date:** 2026-10-02  
**Audit Target:** Protagonist Nana (`char_nana`) & Main Character Agus (`char_agus`)

---

## 1. NANA AUDIT (`char_nana_master.jpg`)

### 1.1 Anatomy & Facial Analysis
- **Face Structure:** Soft oval jawline, gentle cheek contours, natural chin taper. Unaltered across all 4 views.
- **Eyes:** Almond-shaped dark chestnut irises, delicate lower lash line, soft catchlights. Emotional expressions maintain correct eye scale without distortion.
- **Eyebrows & Nose:** Naturally arched soft brows, petite subtle nose bridge with soft shading.
- **Hair Architecture:** Shoulder-length, textured loose waves in dark chestnut brown, feathered curtain bangs framing forehead and cheekbones. Parting position is strictly uniform.
- **Complexion:** Fair Southeast Asian skin tone with warm peach undertones. Zero color shifts between emotional states.
- **Age Representation:** Solid 24-year-old aesthetic, balancing youthful warmth with post-college creative maturity.
- **Wardrobe Consistency:** Oversized cream ribbed knit sweater with wide collar and ribbed texture across all 4 portraits.

### 1.2 Verdict & Status
- **Status:** **100% CONSISTENT — LOCKED AS CANONICAL NANA MASTER**
- **Action:** Retain as the definitive reference image for all future sprite cropping, expression variants, and CG appearances. Do NOT regenerate.

---

## 2. AGUS AUDIT (`char_agus_master.jpg`)

### 2.1 Anatomy & Facial Analysis
- **Face Structure:** Defined masculine jawline with soft chin, clean neck line, realistic ears properly aligned with eye level.
- **Glasses:** Round thin dark wireframe spectacles with anti-glare reflection. Scale and bridge position are identical across all views.
- **Eyes & Expression:** Thoughtful, slightly hooded dark brown eyes, realistic eye-smile creases in laughing expression, tired under-eye shading in late-night monitor pose.
- **Hair Architecture:** Tousled textured black hair with casual side-swept bangs, natural volume without excessive spikiness.
- **Complexion:** Neutral fair Asian skin tone; late-night view accurately incorporates cool blue monitor light bounce on skin without altering base pigmentation.
- **Age Representation:** Solid 24-year-old junior tech worker / remote engineer.
- **Wardrobe Consistency:** Charcoal zip hoodie, white inner crewneck, studio monitor headphones resting comfortably around neck.

### 2.2 Verdict & Status
- **Status:** **100% CONSISTENT — LOCKED AS CANONICAL AGUS MASTER**
- **Action:** Retain as the definitive reference image for all future sprite cropping, pose variants, and CG appearances. Do NOT regenerate.

---

## 3. SECONDARY CHARACTERS STATUS

| Character | Current Asset | Consistency Status | Action Required |
| :--- | :--- | :--- | :--- |
| `char_kaka` | None | Not yet generated | Generate when entering Act 2 Chapter 6 |
| `char_dita` | None | Not yet generated | Generate when entering Act 4 Chapter 11 |
| `char_fikri` | None | Not yet generated | Generate when entering Act 4 Chapter 11 |
| `char_maya` | None | Not yet generated | Generate when entering Act 3 Chapter 8 |
| `char_bimo` | None | Not yet generated | Generate when entering Act 3 Chapter 9 |
| `char_ibu_nana` | None | Not yet generated | Generate when entering Act 4 Chapter 12 |
| `char_ayah_nana` | None | Not yet generated | Generate when entering Act 4 Chapter 12 |

---

## 4. MASTER REFERENCE FILE DIRECTORY
- Nana Master: `public/assets/stories/two-hours-apart/characters/char_nana_master.jpg`
- Agus Master: `public/assets/stories/two-hours-apart/characters/char_agus_master.jpg`

---
---

# BAGIAN 3: SCENE → ASSET COVERAGE MATRIX
*(Sumber: `docs/SCENE_ASSET_COVERAGE.md`)*

**Project:** 2 HOURS APART  
**Date:** 2026-10-03  
**Specification Reference:** `docs/03_ASSET_BIBLE.md`, `docs/CANONICAL_CHARACTER_REGISTRY.md` (6 Acts, 19 Chapters, 40 Scenes)

---

## 1. ACT 1 — BEFORE THE DISTANCE

| Scene | Scene Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-01** | Pertemuan Tak Sengaja | `env_campus_cafe` | `char_nana`, `char_agus` | `prop_coffee`, `prop_laptop` | `fx_dust_motes` | Golden Sunbeam (15:00) | None | **100% READY** |
| **SC-02** | Percakapan Pertama | `env_campus_cafe` | `char_nana`, `char_agus` | `prop_coffee` | None | Warm Interior | None | **100% READY** |
| **SC-03** | Rutinitas Baru | `env_campus` | `char_nana`, `char_agus` | `prop_phone` | None | Midday Daylight | `env_campus` (raster) | **PARTIAL** (SVG placeholder) |
| **SC-04** | Menjelang Malam | `env_campus_cafe` | `char_nana`, `char_agus` | `prop_coffee` | None | Twilight Amber | None | **100% READY** |
| **SC-05** | Pilihan Awal (CHOICE 1) | `env_campus_cafe` | `char_nana`, `char_agus` | `prop_coffee` | None | Twilight Amber | None | **100% READY** |
| **SC-06** | Pengakuan & Perpisahan | `env_campus` | `char_nana`, `char_agus` | `prop_old_photo` | `fx_mist_fog` | Dusk (18:30) | `env_campus` (raster) | **PARTIAL** (SVG placeholder) |

*Act 1 Coverage:* **4 READY, 2 PARTIAL, 0 MISSING (Total: 6)**

---

## 2. ACT 2 — TWO HOURS APART

| Scene | Scene Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-07** | Pagi Pertama di Dua Zona | `env_nana_bedroom` | `char_nana` | `prop_phone` | None | Dawn Sunbeam (07:00) | None | **100% READY** |
| **SC-08** | Hari Sibuk Agus | `env_agus_room` | `char_agus` | `prop_agus_cat`, `prop_laptop` | None | Screen Glow (02:10) | None | **100% READY** |
| **SC-09** | Telepon yang Terlewat (CHOICE 2) | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_rain` | Midnight Lamp (00:10) | None | **100% READY** |
| **SC-10** | Panggilan Tengah Malam | `env_nana_bedroom` | `char_nana`, `char_agus` (phone) | `prop_phone` | `fx_screen_glow` | Dual Split Lighting | None | **100% READY** |
| **SC-11** | Nasihat Kaka (Kakak Nana) | `env_campus_cafe` | `char_nana`, `char_kaka` | `prop_coffee` | None | Afternoon | `char_kaka` sprite | **PARTIAL** |
| **SC-12** | Menghitung Selisih | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_screen_glow` | Midnight Blue | None | **100% READY** |

*Act 2 Coverage:* **5 READY, 1 PARTIAL, 0 MISSING (Total: 6)**

---

## 3. ACT 3 — THE ROUTINE

| Scene | Scene Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-13** | Pola yang Mulai Lelah | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_screen_glow` | Dim Tungsten | None | **100% READY** |
| **SC-14** | Maya di Lingkaran Agus | `env_agus_room` | `char_agus`, `char_maya` | `prop_laptop` | None | Afternoon Work | `char_maya` sprite | **PARTIAL** |
| **SC-15** | Kejujuran vs Menahan (CHOICE 3) | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_rain` | Rain Reflection | None | **100% READY** |
| **SC-16** | Bimo Mengajak Keluar | `env_campus_cafe` | `char_nana`, `char_bimo` | `prop_coffee` | None | Afternoon | `char_bimo` sprite | **PARTIAL** |
| **SC-17** | Menyelamatkan Anak Anjing | `env_nana_bedroom` | `char_nana` | `prop_dog_rescue` | `fx_rain` | Warm Interior | `prop_dog_rescue` | **PARTIAL** |
| **SC-18** | Pertengkaran Kecil Pertama | `env_nana_bedroom` | `char_nana`, `char_agus` (call) | `prop_phone` | None | High Contrast | None | **100% READY** |
| **SC-19** | Ruang Dingin | `env_nana_bedroom` | `char_nana` | `prop_phone` | None | Cool Shadow | None | **100% READY** |

*Act 3 Coverage:* **4 READY, 3 PARTIAL, 0 MISSING (Total: 7)**

---

## 4. ACT 4 — THE DISTANCE BETWEEN US

| Scene | Scene Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-20** | Tawaran Promosi Nana | `env_office` | `char_nana` | `prop_laptop` | None | Studio Bright | `env_office` | **MISSING** |
| **SC-21** | Agus Menghadapi Deadline | `env_agus_room` | `char_agus` | `prop_laptop`, `prop_agus_cat` | None | 02:10 Screen Glow | None | **100% READY** |
| **SC-22** | Prioritas Bertabrakan (CHOICE 4) | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_rain` | Deep Midnight | None | **100% READY** |
| **SC-23** | Nasihat Orang Tua | `env_nana_house` | `char_nana`, `char_ibu_nana`, `char_ayah_nana`, `char_raka` | `prop_coffee` | None | Warm Domestic | `env_nana_house`, `char_ibu_nana` | **MISSING** |
| **SC-24** | Rencana yang Tertunda | `env_nana_bedroom` | `char_nana` | `prop_phone` | None | Dim Lamp | None | **100% READY** |
| **SC-25** | Titik Kritis (CHOICE 5) | `env_nana_bedroom` | `char_nana`, `char_agus` (call) | `prop_phone` | `fx_screen_glow` | Dramatic Shadow | None | **100% READY** |
| **SC-26** | Keputusan Membeli Tiket | `env_nana_bedroom` | `char_nana` | `prop_train_ticket`, `prop_phone` | None | Soft Morning | None (JSX Ticket) | **100% READY** |

*Act 4 Coverage:* **5 READY, 0 PARTIAL, 2 MISSING (Total: 7)**

---

## 5. ACT 5 — THE TRIP

| Scene | Scene Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-27** | Keberangkatan | `env_station` | `char_nana` | `prop_backpack` | `fx_mist_fog` | Platform Halogen | `env_station` | **MISSING** |
| **SC-28** | Tiba di Kota Agus | `env_station` | `char_nana`, `char_agus` | `prop_backpack` | None | Morning Arrival | `env_station` | **MISSING** |
| **SC-29** | Pertemuan Fisik Kembali | `env_station` | `char_nana`, `char_agus` | None | None | Warm Daylight | `env_station` | **MISSING** |
| **SC-30** | Mengunjungi Tempat Kerja | `env_agus_room` | `char_nana`, `char_agus` | `prop_agus_cat` | None | Natural Daylight | None | **100% READY** |
| **SC-31** | Malam di Tepi Pantai (CHOICE 6) | `env_beach` | `char_nana`, `char_agus` | `prop_coffee` | `fx_mist_fog` | Twilight / Coastal | `env_beach` (raster) | **PARTIAL** (SVG placeholder) |
| **SC-32** | Percakapan Puncak Bukit (CHOICE 7)| `env_mountain` | `char_nana`, `char_agus` | None | `fx_mist_fog` | Sunrise Dawn | `env_mountain` | **MISSING** |
| **SC-33** | Menjelang Kepulangan | `env_station` | `char_nana`, `char_agus` | `prop_backpack` | None | Overcast Evening | `env_station` | **MISSING** |

*Act 5 Coverage:* **1 READY, 1 PARTIAL, 5 MISSING (Total: 7)**

---

## 6. ACT 6 — ENDINGS & SECRET ROUTE

| Scene | Ending Title | Environment | Characters | Props | FX | Lighting | Missing Assets | Coverage Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-34** | Pilihan Terakhir (CHOICE 8) | `env_station` | `char_nana`, `char_agus` | `prop_phone` | `fx_mist_fog` | Platform Amber | `env_station` | **MISSING** |
| **SC-35** | **Ending A:** Arah yang Sama | `env_agus_room` | `char_nana`, `char_agus` | `prop_laptop`, `prop_agus_cat` | None | Bright Morning Sun | None | **100% READY** |
| **SC-36** | **Ending B:** Bertahan di Jarak | `env_nana_bedroom` | `char_nana` | `prop_phone` | `fx_screen_glow` | Midnight Blue | None | **100% READY** |
| **SC-37** | **Ending C:** Dua Jam yang Abadi| `env_campus_cafe` | `char_nana` | `prop_coffee` | `fx_rain` | Melancholic Dusk | None | **100% READY** |
| **SC-38** | **Ending D:** Jalur Masing-Masing| `env_office` | `char_nana` | `prop_laptop` | None | Office Daylight | `env_office` | **MISSING** |
| **SC-39** | **Ending E:** Jalan Pulang (Secret)| `env_campus_cafe` | `char_nana`, `char_agus` | `prop_old_photo` | `fx_dust_motes` | Golden Hour | None | **100% READY** |
| **SC-40** | Epilog & Resolusi | `env_campus_cafe` / `env_nana_bedroom` | `char_nana`, `char_agus` | `prop_phone` | `fx_dust_motes` | Warm Sunrise | None | **100% READY** |

*Act 6 Coverage:* **5 READY, 0 PARTIAL, 2 MISSING (Total: 7)**

---

## 7. MATHEMATICAL VERIFICATION & SUMMARY

### 7.1 Act-by-Act Breakdown
| Act | Title | Scenes | READY | PARTIAL | MISSING | Readiness % |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Act 1** | Before the Distance | 6 | 4 | 2 | 0 | 66.7% (100% with SVG) |
| **Act 2** | Two Hours Apart | 6 | 5 | 1 | 0 | 83.3% |
| **Act 3** | The Routine | 7 | 4 | 3 | 0 | 57.1% |
| **Act 4** | The Distance Between Us | 7 | 5 | 0 | 2 | 71.4% |
| **Act 5** | The Trip | 7 | 1 | 1 | 5 | 14.3% |
| **Act 6** | Endings & Epilogue | 7 | 5 | 0 | 2 | 71.4% |
| **TOTAL**| **All 6 Acts** | **40** | **24** | **7** | **9** | **60.0% (77.5% with SVG)** |

### 7.2 Proof of Mathematical Invariant
$$\text{READY (24)} + \text{PARTIAL (7)} + \text{MISSING (9)} = 40 \text{ TOTAL SCENES}$$
$$\frac{24}{40} = 60.0\% \quad \big| \quad \frac{7}{40} = 17.5\% \quad \big| \quad \frac{9}{40} = 22.5\% \quad \big| \quad \sum = 100.0\%$$

---
---

# BAGIAN 4: NEXT ASSET PRODUCTION PRIORITY
*(Sumber: `docs/NEXT_ASSET_PRIORITY.md`)*

**Project:** 2 HOURS APART  
**Purpose:** Staged production roadmap preventing premature asset clutter and ensuring strict character consistency.

---

## 1. PRIORITY 1 — CRITICAL (PROTOTYPE BASELINE & ACT 1–2 COMPLETION)

Assets required to make the core story experience and Act 1 & 2 100% visually complete:

| Asset ID | Category | Description | Status | Source / Action |
| :--- | :--- | :--- | :--- | :--- |
| `char_nana` | Character Master | Nana 24yo (4 expressions: smile, pensive, emotional, sleepy) | **DONE** | Locked at `public/.../char_nana_master.jpg` |
| `char_agus` | Character Master | Agus 24yo (4 expressions: smile, tired, laughing phone, deep gaze) | **DONE** | Locked at `public/.../char_agus_master.jpg` |
| `env_nana_bedroom` | Environment | Nana's room at 00:10 midnight, rain on window, warm lamp | **DONE** | Locked at `public/.../env_nana_bedroom.jpg` |
| `env_agus_room` | Environment | Agus's workspace at 02:10 late night, dual monitors, sleeping cat | **DONE** | Locked at `public/.../env_agus_room.jpg` |
| `env_campus_cafe` | Environment | The Bookshelf Café on sunlit afternoon, warm wooden interior | **DONE** | Locked at `public/.../env_campus_cafe.jpg` |
| `prop_phone` | Prop / UI | Dual time clock widget (00:10 vs 02:10) and interactive chat | **DONE** | Implemented in `DiegeticInterface.tsx` |
| `env_campus` | Environment | Campus courtyard and stone steps for SC-03 & SC-06 | **PENDING** | Generate high-res raster to replace SVG |
| `env_office` | Environment | Nana's graphic design studio for SC-20 & Ending D | **PENDING** | Generate high-res raster |

---

## 2. PRIORITY 2 — IMPORTANT (ACT 3 & ACT 4 EXPANSION)

Assets required when players progress through Act 3 (The Routine) and Act 4 (The Distance Between Us):

| Asset ID | Category | Description | Role / Significance |
| :--- | :--- | :--- | :--- |
| `char_kaka` | Character | Nana's older sister (Age 29, pragmatic, protective) | Confidante in SC-11 |
| `char_maya` | Character | Agus's female tech teammate (Age 25) | Triggers Nana's unspoken anxiety in SC-14 |
| `char_bimo` | Character | Nana's studio colleague (Age 26) | Triggers Agus's subtle jealousy in SC-16 |
| `prop_dog_rescue` | Animal / Prop | Scruffy rescued street puppy | Emotional anchor in SC-17 & Ending B/E |
| `char_raka` | Character | Nana's younger brother (Age 19) | Family dinner in SC-23 |
| `char_fikri` | Character | Agus's best friend (Age 24) | Agus's sounding board |
| `env_nana_house` | Environment | Warm family living room / dining table | Parental advice scene in SC-23 |

---

## 3. PRIORITY 3 — LATER (ACT 5 TRIP & ACT 6 CLIMAX / ENDINGS)

Assets only loaded during the travel arc and final narrative branch resolutions:

| Asset ID | Category | Description | Role / Significance |
| :--- | :--- | :--- | :--- |
| `env_station` | Environment | Intercity train platform at night / arrival morning | Departure & reunion in SC-27, 28, 29, 33, 34 |
| `env_mountain` | Environment | Mountain peak overlook with sea of clouds at sunrise | Climax decision scene in SC-32 |
| `env_beach` | Environment | Quiet coastal shore at twilight sunset | Emotional dialogue in SC-31 |
| `env_airport` | Environment | International terminal departure gate | Alternate career departure |
| `char_ibu_nana` | Character | Nana's mother (gentle, protective, Age 53) | SC-23 |
| `char_ayah_nana` | Character | Nana's father (reassuring, reflective, Age 56) | SC-23 |
| `cg_ending_a` | Action CG | Nana and Agus together in shared apartment | Ending A Climax |
| `cg_ending_e` | Action CG | Nana and Agus holding hands at sunset cafe with old polaroid | Secret Ending Climax |

---

## 4. IMMEDIATE NEXT ACTION RULE

**DO NOT** batch-generate Priority 2 or Priority 3 assets until the current baseline (`env_campus`, `env_office`) is wired into the scene router and tested with 60 FPS performance.

---
---

# BAGIAN 5: ASSET PERFORMANCE AUDIT REPORT
*(Sumber: `docs/ASSET_PERFORMANCE_AUDIT.md`)*

**Project:** 2 HOURS APART  
**Date:** 2026-10-02  
**Performance Budget Standard:**
- Mobile Initial Load: `< 1.8 MB` total assets
- Max Background Asset Size: `< 120 KB` (WebP / AVIF)
- Max Character Sprite Size: `< 90 KB` (WebP / alpha PNG)
- Target Frame Rate: Sustained 60 FPS on mid-tier mobile

---

## 1. ASSET INVENTORY & AUDIT TABLE

| Asset | Current Size | Current Format | Usage | Problem | Recommended Format | Recommended Resolution | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `char_nana_master.jpg` | 796 KB | JPEG (Master) | Nana reference & sprite sheet | Raw uncompressed generation output; exceeds 90 KB sprite budget | WebP (Production) + Keep Master | 720 × 960 (Desktop) / 480 × 640 (Mobile) | **HIGH** |
| `char_agus_master.jpg` | 657 KB | JPEG (Master) | Agus reference & sprite sheet | Raw master output; exceeds 90 KB budget | WebP (Production) + Keep Master | 720 × 960 (Desktop) / 480 × 640 (Mobile) | **HIGH** |
| `env_nana_bedroom.jpg` | 869 KB | JPEG (Master) | Act 2 & Act 3 Primary Scene BG | 869 KB exceeds 120 KB background budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `env_agus_room.jpg` | 796 KB | JPEG (Master) | Act 2 & Act 4 Scene BG | 796 KB exceeds 120 KB budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `env_campus_cafe.jpg` | 929 KB | JPEG (Master) | Act 1 & Ending C/E Scene BG | 929 KB exceeds 120 KB budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `hero.png` | 13 KB | PNG | Landing splash icon | None (Within budget) | PNG / WebP | 512 × 512 | LOW |
| `icons.svg` | 5 KB | SVG Vector | UI icons | None (Extremely lightweight, scalable) | SVG | Vector | PASS |
| `favicon.svg` | 9.5 KB | SVG Vector | Browser tab favicon | None | SVG | Vector | PASS |

---

## 2. DERIVATIVE GENERATION STRATEGY (MASTER → PRODUCTION → MOBILE)

To adhere to the non-destructive Ponytail principle:
1. **Never delete master JPEGs:** Preserve all original generation files under `public/assets/stories/two-hours-apart/masters/` as uncompressed sources of truth.
2. **Production Pipeline WebP Derivatives:**
   - Backgrounds: WebP at 80% quality -> shrinks from ~850 KB to ~95 KB (an 89% reduction with imperceptible visual loss).
   - Sprites: Clean alpha channel cutout with WebP lossless/near-lossless -> target `< 85 KB`.
3. **Responsive Image Loading (`<picture>` / `srcset`):**
   ```html
   <picture>
     <source media="(max-width: 640px)" srcset="env_nana_bedroom_mobile.webp" type="image/webp" />
     <source media="(min-width: 641px)" srcset="env_nana_bedroom_desktop.webp" type="image/webp" />
     <img src="env_nana_bedroom.jpg" loading="lazy" decoding="async" alt="Nana's Bedroom" />
   </picture>
   ```

---

## 3. ASSET PIPELINE MEMORY & STREAMING RECOMMENDATIONS
1. **Sliding Window Preload:** `AssetManager.ts` already enforces an LRU cache with a 20-asset ceiling. Maintain this threshold to avoid GPU texture thrashing.
2. **Decode Asynchronously:** Always invoke `img.decoding = 'async'` on dynamic image loads to prevent main thread frame hitching during scene transitions.
3. **Zero Global Eager Loading:** Only `char_nana`, `char_agus`, and `env_campus_cafe` are preloaded on game boot. All other environments and props stream on-demand as scene transitions trigger.
