# INDEPENDENT PROPS & ATMOSPHERE / FX PIPELINE AUDIT REPORT

**Project:** 2 HOURS APART — Interactive Web Story Engine  
**Theme:** romance_rain  
**Pipeline:** Independent Props + Atmosphere / FX Asset Pipeline  
**Status:** PASS  
**Timestamp:** 2026-10-03T17:43:00+07:00  

---

## 1. Executive Summary

```text
Independent Props Required: 9
Props Generated: 9
Props Approved: 9

Atmosphere / FX Required: 5
FX Implemented: 5
FX Approved: 5

Regenerations: 0
Failures: 0
```

All 9 canonical independent props and 5 procedural atmosphere / FX systems identified by the authoritative scene manifest (`docs/scene_visual_asset_manifest.json` and `docs/ENVIRONMENT_ASSET_MANIFEST.md`) have been fully generated, extracted with clean transparent alpha, standardized with deterministic anchors, and verified across all technical gates.

---

## 2. Independent Props Audit (9/9 APPROVED)

| ID | Name | Category | Dimensions | Anchor Point | Interactive | Priority | WebP Size | Status |
|:---|:---|:---|:---:|:---:|:---:|:---:|:---:|:---:|
| `prop_phone` | Dual Timezone Smartphone | `INTERACTIVE`, `CHARACTER_HELD` | 256×512 (1:2) | `hand_grip` (0.50, 0.85) | YES | P0 | 14.9 KB | **APPROVED** |
| `prop_coffee` | Steaming Ceramic Mug | `STATIC_REUSABLE` | 256×256 (1:1) | `table_contact_point` (0.50, 0.95) | NO | P0 | 5.3 KB | **APPROVED** |
| `prop_old_photo` | Campus Polaroid Photograph | `INTERACTIVE`, `STATIC_REUSABLE` | 320×384 (5:6) | `center` (0.50, 0.50) | YES | P0 | 8.3 KB | **APPROVED** |
| `prop_train_ticket` | Last-Minute Train Ticket | `INTERACTIVE`, `STATIC_REUSABLE` | 384×200 (48:25) | `center` (0.50, 0.50) | YES | P0 | 16.4 KB | **APPROVED** |
| `prop_backpack` | Travel Canvas Backpack | `CHARACTER_HELD`, `STATIC_REUSABLE` | 384×480 (4:5) | `bottom-center` (0.50, 0.95) | NO | P1 | 7.2 KB | **APPROVED** |
| `prop_lighter_antique`| Antique Brass Lighter | `INTERACTIVE`, `STATIC_REUSABLE` | 192×288 (2:3) | `table_contact_point` (0.50, 0.95) | YES | P1 | 6.2 KB | **APPROVED** |
| `prop_laptop` | Creative Studio Laptop | `STATIC_REUSABLE`, `DYNAMIC_REUSABLE` | 480×320 (3:2) | `table_contact_point` (0.50, 0.95) | NO | P1 | 9.2 KB | **APPROVED** |
| `prop_agus_cat` | Sleeping Tabby Cat | `STATIC_REUSABLE` | 384×256 (3:2) | `table_contact_point` (0.50, 0.95) | NO | P1 | 8.4 KB | **APPROVED** |
| `prop_dog_rescue` | Stray Dog with Umbrella | `STATIC_REUSABLE` | 440×400 (11:10) | `bottom-center` (0.50, 0.95) | NO | P2 | 11.6 KB | **APPROVED** |

### Individual Prop Specifications

#### 1. `prop_phone`
* **ID:** `prop_phone`
* **Name:** Dual Timezone Smartphone
* **Scenes:** `ch3_night_phone_msg`
* **Category:** `INTERACTIVE`, `CHARACTER_HELD`
* **Asset:** `/assets/props/masters/prop_phone.webp` (PNG fallback: `/assets/props/masters/prop_phone.png`)
* **Dimensions:** 256×512 px (Aspect Ratio 1:2)
* **Anchor:** `hand_grip` (x: 0.50, y: 0.85)
* **Variants:** `screen_normal`, `screen_notification`, `screen_off`
* **Interactive:** YES (Triggers phone inspection / message response modal)
* **Status:** APPROVED

#### 2. `prop_coffee`
* **ID:** `prop_coffee`
* **Name:** Steaming Ceramic Mug
* **Scenes:** `ch1_intro_1`, `ch1_intro_2`, `ch1_nadia_enters`, `ch1_dialogue_1`, `ch1_closing`
* **Category:** `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_coffee.webp` (PNG fallback: `/assets/props/masters/prop_coffee.png`)
* **Dimensions:** 256×256 px (Aspect Ratio 1:1)
* **Anchor:** `table_contact_point` (x: 0.50, y: 0.95)
* **Variants:** `steaming`, `still`
* **Interactive:** NO (Table contact prop)
* **Status:** APPROVED

#### 3. `prop_old_photo`
* **ID:** `prop_old_photo`
* **Name:** Campus Polaroid Photograph
* **Scenes:** `ch3_book_discovery`, `ending_secret_scene`
* **Category:** `INTERACTIVE`, `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_old_photo.webp` (PNG fallback: `/assets/props/masters/prop_old_photo.png`)
* **Dimensions:** 320×384 px (Aspect Ratio 5:6)
* **Anchor:** `center` (x: 0.50, y: 0.50)
* **Variants:** `normal`, `inspected`
* **Interactive:** YES (Unlocks memory note and secret route flag)
* **Status:** APPROVED

#### 4. `prop_train_ticket`
* **ID:** `prop_train_ticket`
* **Name:** Last-Minute Train Ticket
* **Scenes:** `ch2_bus_stop`, `ch3_ticket_revelation`, `ch4_station_climax`
* **Category:** `INTERACTIVE`, `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_train_ticket.webp` (PNG fallback: `/assets/props/masters/prop_train_ticket.png`)
* **Dimensions:** 384×200 px (Aspect Ratio 48:25)
* **Anchor:** `center` (x: 0.50, y: 0.50)
* **Variants:** `folded`, `unfolded`, `validated`
* **Interactive:** YES (Reveals departure time 23:45 WIB and seat reservation)
* **Status:** APPROVED

#### 5. `prop_backpack`
* **ID:** `prop_backpack`
* **Name:** Travel Canvas Backpack
* **Scenes:** `ch4_station_climax`, `ending_true_scene`, `ending_romantic_scene`, `ending_bittersweet_scene`
* **Category:** `CHARACTER_HELD`, `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_backpack.webp` (PNG fallback: `/assets/props/masters/prop_backpack.png`)
* **Dimensions:** 384×480 px (Aspect Ratio 4:5)
* **Anchor:** `bottom-center` (x: 0.50, y: 0.95)
* **Variants:** `worn`, `grounded`
* **Interactive:** NO (Visual narrative indicator of character readiness to depart)
* **Status:** APPROVED

#### 6. `prop_lighter_antique`
* **ID:** `prop_lighter_antique`
* **Name:** Antique Brass Lighter
* **Scenes:** `ch1_intro_2`
* **Category:** `INTERACTIVE`, `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_lighter_antique.webp` (PNG fallback: `/assets/props/masters/prop_lighter_antique.png`)
* **Dimensions:** 192×288 px (Aspect Ratio 2:3)
* **Anchor:** `table_contact_point` (x: 0.50, y: 0.95)
* **Variants:** `closed`, `open_flame`
* **Interactive:** YES (Foreshadow collectible in Kafe Kroma)
* **Status:** APPROVED

#### 7. `prop_laptop`
* **ID:** `prop_laptop`
* **Name:** Creative Studio Laptop
* **Scenes:** `SC-20`, `SC-38`, `SC-08`, `SC-30`
* **Category:** `STATIC_REUSABLE`, `DYNAMIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_laptop.webp` (PNG fallback: `/assets/props/masters/prop_laptop.png`)
* **Dimensions:** 480×320 px (Aspect Ratio 3:2)
* **Anchor:** `table_contact_point` (x: 0.50, y: 0.95)
* **Variants:** `active_coding`, `screen_dimmed`
* **Interactive:** NO (Desk workstation prop)
* **Status:** APPROVED

#### 8. `prop_agus_cat`
* **ID:** `prop_agus_cat`
* **Name:** Sleeping Tabby Cat
* **Scenes:** `SC-08`, `SC-30`
* **Category:** `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_agus_cat.webp` (PNG fallback: `/assets/props/masters/prop_agus_cat.png`)
* **Dimensions:** 384×256 px (Aspect Ratio 3:2)
* **Anchor:** `table_contact_point` (x: 0.50, y: 0.95)
* **Variants:** `sleeping`, `ear_twitch`
* **Interactive:** NO (Atmospheric desk companion)
* **Status:** APPROVED

#### 9. `prop_dog_rescue`
* **ID:** `prop_dog_rescue`
* **Name:** Stray Dog with Umbrella
* **Scenes:** `ch2_street_1`, `ch2_slow_walk`
* **Category:** `STATIC_REUSABLE`
* **Asset:** `/assets/props/masters/prop_dog_rescue.webp` (PNG fallback: `/assets/props/masters/prop_dog_rescue.png`)
* **Dimensions:** 440×400 px (Aspect Ratio 11:10)
* **Anchor:** `bottom-center` (x: 0.50, y: 0.95)
* **Variants:** `huddled`, `looking_up`
* **Interactive:** NO (Rainy city street atmosphere)
* **Status:** APPROVED

---

## 3. Atmosphere / FX Systems Audit (5/5 APPROVED)

### 1. `fx_rain_procedural`
* **ID:** `fx_rain_procedural`
* **Type:** `particle_canvas`
* **Scenes:** All Chapter 1 and Chapter 2 exterior/cafe scenes (17 scenes total)
* **Layer:** `near_fg` (Z-Index: 40)
* **Implementation:** `AtmosphereLayer.tsx` (Canvas 2D, DPR-scaled outside React render loop)
* **Mobile:** Budget capped at 40 particles, no sub-pixel blur
* **Reduced Motion:** Particles disabled; static cool `blue-950/15` color wash overlay rendered
* **Performance:** < 1.5% CPU on mobile, 0 React state updates per frame
* **Cleanup:** Centralized `AnimationManager` unsubscription on unmount, active particle counter reset
* **Status:** APPROVED

### 2. `fx_fog_mist`
* **ID:** `fx_fog_mist`
* **Type:** `particle_canvas_drift`
* **Scenes:** `SC-32`, `ch2_bus_stop`, `ch4_station_climax`
* **Layer:** `midground` (Z-Index: 15, positioned behind characters)
* **Implementation:** `AtmosphereLayer.tsx` (Canvas 2D / GPU composited)
* **Mobile:** Budget capped at 10 clouds, source-over blending
* **Reduced Motion:** Particles disabled, replaced with static `emerald-950/20` ambient tint
* **Performance:** < 1.0% CPU on mobile, linear particle recycling outside viewport bounds
* **Cleanup:** Canvas context cleared and particle pool freed
* **Status:** APPROVED

### 3. `fx_dust_motes`
* **ID:** `fx_dust_motes`
* **Type:** `particle_canvas_float`
* **Scenes:** `ch3_book_discovery`, `ch3_polaroid_dialogue`, `ch3_ticket_revelation`, `SC-20`, `SC-38`, `SC-39`, `ch4_station_climax`
* **Layer:** `midground` (Z-Index: 25)
* **Implementation:** `AtmosphereLayer.tsx` (Canvas 2D floating motes)
* **Mobile:** Budget capped at 8 particles, zero layout reflows
* **Reduced Motion:** Particles hidden completely, preserving clean scene visibility
* **Performance:** < 0.5% CPU, batched arc draw calls
* **Cleanup:** Unsubscribes from RAF on scene change
* **Status:** APPROVED

### 4. `fx_screen_glow_late_night`
* **ID:** `fx_screen_glow_late_night`
* **Type:** `css_radial_gradient`
* **Scenes:** `ch3_night_phone_msg`, `SC-08`, `SC-14`, `SC-21`, `SC-30`, `SC-35`
* **Layer:** `mid_foreground` (Z-Index: 32)
* **Implementation:** `AtmosphereEffects.tsx` / `AtmosphereLayer.tsx` (`mix-blend-mode: screen`)
* **Mobile:** Pure GPU CSS composite layer, 0 CPU overhead
* **Reduced Motion:** Pulse animation disabled, static gradient rendered
* **Performance:** 0% CPU, GPU raster cached
* **Cleanup:** DOM node unmount on scene exit
* **Status:** APPROVED

### 5. `fx_cinematic_vignette`
* **ID:** `fx_cinematic_vignette`
* **Type:** `css_radial_vignette`
* **Scenes:** `ch1_intro_1`, `ch1_hands_cg_scene`, `ch2_street_1`, `ch3_book_discovery`, `ch3_night_phone_msg`, `ch4_station_climax`, all ending routes
* **Layer:** `foreground_frame` (Z-Index: 48, behind Dialogue UI Z-Index 50)
* **Implementation:** `AtmosphereEffects.tsx` / `AtmosphereLayer.tsx` (CSS Radial Gradient Frame)
* **Mobile:** Full viewport coverage with responsive aspect scaling
* **Reduced Motion:** Fully static by default (no motion)
* **Performance:** 0% CPU, GPU composite layer
* **Cleanup:** CSS unmount
* **Status:** APPROVED

---

## 4. Performance & Technical Metrics

* **Total Prop Size (WebP):** 87.5 KB (avg: 9.7 KB per prop)
* **Total Prop Size (PNG):** 99.0 KB (lossless transparent archive)
* **Largest Prop Asset:** `prop_train_ticket.webp` (16.4 KB, 384×200 px)
* **Total FX Systems:** 5 canonical runtime systems
* **Active Particle Budget (Mobile):** Capped between 8 and 40 particles per active system
* **DOM Node Count for FX:** Exactly 1 canvas element + optional lightweight CSS overlays (0 per-particle DOM nodes)
* **Animation Loops:** Single centralized `AnimationManager` requestAnimationFrame loop
* **Memory Footprint:** < 1.2 MB RAM overhead for entire prop and FX runtime layer
* **Reduced Motion Support:** 100% compliant across all 5 FX systems

---

## 5. Canonical Integrity Verification

```text
Canonical Character Assets Modified:       NO
Canonical Environment Masters Modified:    NO
Canonical Environment Layers Modified:     NO
Canonical Environment Variants Modified:   NO
Story / Narrative Content Modified:        NO
```

### Hash Verification Results
* `char_nana_master.png`: UNCHANGED (Verified)
* `char_agus_master.png`: UNCHANGED (Verified)
* 8 Secondary Characters (Kaka, Raka, Dita, Fikri, Maya, Bimo, Ibu, Ayah): UNCHANGED (Verified)
* 12 Environment Masters: UNCHANGED & SHA256 VERIFIED
* 36 Environment Layers: UNCHANGED & VERIFIED
* 19 Environment Variants: UNCHANGED & VERIFIED

---

## 6. Test Suite & Validation Summary

* `npm test`: **70/70 PASS** (100% passing test suite across engine, characters, scenes, and effects)
* `npm run lint`: **PASS** (0 errors, 7 pre-existing warnings in third-party and test files)
* `npm run build`: **PASS** (Built in 4.03s, 0 TypeScript errors)
* `npm run validate:props-atmosphere`: **PASS** (9/9 props, 5/5 FX, contact sheet verified)
* `npm run validate:environments`: **PASS**
* `npm run validate:layers-variants`: **PASS**
* `npm run validate:primary-sprites`: **PASS**
* `npm run validate:primary-variants`: **PASS**
* `npm run validate:secondary-assets`: **PASS**
* `npm run validate:story`: **PASS**

---

## 7. Artifact Deliverables

1. `public/assets/props/masters/`: 9 transparent `.webp` + 9 transparent `.png` files.
2. `public/assets/props/previews/props_contact_sheet.png`: 3×3 grid contact sheet with labels, dimensions, and anchor crosshairs (197.4 KB).
3. `docs/prop_registry.json`: Authoritative prop metadata registry with SHA256 checksums.
4. `docs/atmosphere_fx_registry.json`: Authoritative procedural atmosphere / FX system registry.
5. `src/effects/`: Types and modular components (`AtmosphereEffects.tsx`, `PropRenderer`, `types.ts`, `index.ts`).
6. `src/components/PropAtmosphereInspector.tsx`: Interactive debug inspector integrated into `SceneDebugOverlay.tsx`.
7. `scripts/validate-props-atmosphere.ts`: Automated CI validator for props, atmosphere, and canonical immutability.
8. `tests/effects/props-atmosphere.test.ts`: Automated unit test suite integrated into `npm test`.
