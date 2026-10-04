# ASSET PIPELINE AUDIT REPORT

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
