# SCENE VISUAL AUDIT

**Project:** 2 HOURS APART — Interactive Web Story Engine  
**Pipeline:** Scene Visual Audit + Environment Asset Manifest  
**Date:** 2026-10-03  
**Status:** **AUDIT COMPLETE** (100% Verified)  

---

```text
========================================
SCENE VISUAL AUDIT
========================================

STATUS:

Story: 2 Hours Apart
Story ID: two_hours_apart
Theme: romance_rain
Version: 1.0.0

Total Scenes Audited: 29
Total Locations Identified: 12
Total Environment Masters: 12
Total Environment Variants: 19
Total Independent Props: 9
Total Atmosphere Systems: 5
Total Action CGs: 4

Scene Audit: PASS
Environment Manifest: PASS
Layer Analysis: PASS
Parallax Analysis: PASS
Character Safe Zones: PASS
Dialogue Safe Zones: PASS
Visual Continuity: PASS
Asset Reuse: PASS
Responsive Analysis: PASS
Performance Analysis: PASS
Manifest Validation: PASS
Regression: PASS
Canonical Character Assets Modified: NO
```

---

## 1. EXECUTIVE SUMMARY & METRICS

This document performs an exhaustive visual analysis of all 29 runtime story scenes from `src/data/storyContent.ts`, cross-referenced with the 40-scene blueprint from `docs/03_ASSET_BIBLE.md` and `docs/SCENE_ASSET_COVERAGE.md`.

* **Story Scope:** 4 Chapters (`ch1`, `ch2`, `ch3`, `ch4`) + 4 Divergent Endings (`ending_true`, `ending_romantic`, `ending_secret`, `ending_bittersweet`).
* **Canonical Characters:** Primary (`Nana`, `Agus` [18 variants]), Secondary (`Kaka`, `Raka`, `Dita`, `Fikri`, `Maya`, `Bimo`, `Ibu`, `Ayah` [72 variants]).
* **Total Image Generation Executed:** **0** (Strict compliance with Hard Rule #1).
* **Canonical Character Assets Touched:** **0** (All SHA256 hashes verified locked).

---

## 2. SCENE-BY-SCENE ANALYSIS (ALL 29 RUNTIME SCENES)

### Scene 01: `ch1_intro_1`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Sadness / Melancholic
- **Characters:** None (Environmental opening)
- **Environment:** `env_campus_cafe_master` (Variant: `env_campus_cafe_night_rain`)
- **Layers:** `layer_bg_cafe_glass` (Z:0), `layer_mid_cafe_interior` (Z:20), `layer_char_cafe_space` (Z:30, empty), `layer_fg_cafe_raindrops` (Z:50)
- **Props:** `prop_coffee` (Steaming mug on wooden table)
- **Atmosphere:** `fx_rain_procedural`, `fx_cinematic_vignette`
- **Camera:** Medium shot, center focus on window rain streaks
- **Character Safe Zone:** `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Rain streaking down cafe glass window, street lights bokeh outside
- **Reuse:** High (11 scenes in Kafe Kroma)
- **Dependencies:** `env_campus_cafe_master`, `fx_rain_procedural`
- **Risks:** Exterior blur level must not interfere with subtitle readability

### Scene 02: `ch1_intro_2`
- **Location:** `cafe_night` (`loc_campus_cafe` - Meja Sudut)
- **Time:** Night
- **Mood:** Romance / Anticipation
- **Characters:** None
- **Environment:** `env_campus_cafe_master` (`env_campus_cafe_night_rain`)
- **Layers:** `layer_bg_cafe_glass` (Z:0), `layer_mid_cafe_interior` (Z:20), `layer_fg_cafe_raindrops` (Z:50)
- **Props:** `prop_coffee`, `prop_lighter_antique`
- **Atmosphere:** `fx_rain_procedural`, warm amber tungsten glow
- **Camera:** Medium-close on corner booth table
- **Character Safe Zone:** `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Corner wooden table with steaming cup, awaiting guest
- **Reuse:** High
- **Dependencies:** `env_campus_cafe_master`
- **Risks:** Low

### Scene 03: `ch1_nadia_enters`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Discovery
- **Characters:** Nadia (`Nana`, entering with wet umbrella, neutral/soft smile)
- **Environment:** `env_campus_cafe_master` (`env_campus_cafe_night_rain`)
- **Layers:** `layer_bg_cafe_glass` (Z:0), `layer_mid_cafe_interior` (Z:20), `layer_char_cafe_space` (Z:30, Nana center), `layer_fg_cafe_raindrops` (Z:50)
- **Props:** `prop_coffee`, wet umbrella
- **Atmosphere:** `fx_rain_procedural`
- **Camera:** Medium character entrance framing
- **Character Safe Zone:** Nana baseline `Y = 1460`, centered `X: 0.50`
- **Dialogue Safe Zone:** Lower 25% screen
- **Visual Focal Point:** Nana's wet hair silhouette and dripping raincoat at cafe doorway
- **Reuse:** High
- **Dependencies:** `char_nana_sprite_master`, `env_campus_cafe_master`
- **Risks:** Droplet overlay must not mask facial expressions

### Scene 04: `ch1_dialogue_1`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Intimate
- **Characters:** Nadia (`Nana`, seated across table, `soft_smile`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard 4-layer cafe stack
- **Props:** `prop_coffee` (2 cups)
- **Atmosphere:** Warm tungsten lighting
- **Camera:** Medium conversation framing
- **Character Safe Zone:** Nana seated center-left
- **Dialogue Safe Zone:** Standard dialogue box
- **Visual Focal Point:** Nana's gentle smile across the wooden table
- **Reuse:** High
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** None

### Scene 05: `ch1_react_warm`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Joy
- **Characters:** Nadia (`Nana`, `happy`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Warm amber lighting
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline `Y = 1460`
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana laughing softly, shoulders relaxed
- **Reuse:** High
- **Dependencies:** `char_nana_expression_happy`
- **Risks:** None

### Scene 06: `ch1_react_honest`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Tension / Serious
- **Characters:** Nadia (`Nana`, `serious`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Subtle cool color grade shift
- **Camera:** Slight push-in
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana's searching, intense eyes
- **Reuse:** High
- **Dependencies:** `char_nana_expression_serious`
- **Risks:** Color transition must be smooth (no abrupt flash)

### Scene 07: `ch1_react_care`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Peaceful / Comfort
- **Characters:** Nadia (`Nana`, `soft_smile`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Warm amber glow
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana cradling warm coffee cup with both hands
- **Reuse:** High
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** None

### Scene 08: `ch1_sit_down`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance
- **Characters:** Nadia (`Nana`, `neutral`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Rain sound and rain visuals outside
- **Camera:** Medium two-shot perspective
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana settled into booth
- **Reuse:** High
- **Dependencies:** `char_nana_expression_neutral`
- **Risks:** None

### Scene 09: `ch1_hands_cg_scene`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Intimacy Climax
- **Characters:** None (Action CG focus)
- **Environment:** Action CG Overlay (`cg_hands_coffee`)
- **Layers:** Full-frame 9:16 Action CG (Z:35)
- **Props:** `prop_coffee`
- **Atmosphere:** Warm golden rim light, steam rising
- **Camera:** Extreme close-up / Macro
- **Character Safe Zone:** N/A (Hand interaction)
- **Dialogue Safe Zone:** Lower 25% overlay
- **Visual Focal Point:** Touching fingertips over rustic ceramic coffee cup
- **Reuse:** Single scene high-impact CG
- **Dependencies:** `cg_hands_coffee`
- **Risks:** Needs smooth crossfade transition into dialogue

### Scene 10: `ch1_confession_start`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Vulnerable
- **Characters:** Nadia (`Nana`, `embarrassed`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Warm ambient glow
- **Camera:** Medium close-up
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana looking down, cheeks slightly flushed
- **Reuse:** High
- **Dependencies:** `char_nana_expression_embarrassed`
- **Risks:** Blushing tones must be clearly legible on mobile screens

### Scene 11: `ch1_closing`
- **Location:** `cafe_night` (`loc_campus_cafe`)
- **Time:** Night
- **Mood:** Romance / Transition
- **Characters:** Nadia (`Nana`, `soft_smile`)
- **Environment:** `env_campus_cafe_master`
- **Layers:** Standard cafe stack
- **Props:** `prop_coffee`
- **Atmosphere:** Slow dimming cafe lamps
- **Camera:** Slow pull back
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana preparing to leave the cafe table
- **Reuse:** High
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** None

### Scene 12: `ch2_street_1`
- **Location:** `street_night` (`loc_street_night`)
- **Time:** Night
- **Mood:** Romance / Atmosphere
- **Characters:** None (Opening exterior / CG `cg_umbrella_rain`)
- **Environment:** `env_street_night_master` (Variant: `env_street_rain_sidewalk`)
- **Layers:** `layer_bg_street_skyline` (Z:0), `layer_mid_street_sidewalk` (Z:20), `layer_fg_street_lamppost` (Z:50)
- **Props:** Shared umbrella
- **Atmosphere:** `fx_rain_procedural`, wet asphalt reflections, yellow sodium glare
- **Camera:** Medium-wide
- **Character Safe Zone:** `[X: 0.15, Y: 0.32, W: 0.70, H: 0.62]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Puddle reflections under warm sodium streetlamp
- **Reuse:** Street master reused 6 times
- **Dependencies:** `env_street_night_master`, `fx_rain_procedural`
- **Risks:** High contrast between deep black sidewalk and bright lamppost

### Scene 13: `ch2_street_dialogue`
- **Location:** `street_night` (`loc_street_night`)
- **Time:** Night
- **Mood:** Romance
- **Characters:** Nadia (`Nana`, `neutral`)
- **Environment:** `env_street_night_master`
- **Layers:** Standard street stack with Nana centered
- **Props:** Shared umbrella
- **Atmosphere:** Constant rain particles, street mist
- **Camera:** Medium walking two-shot perspective
- **Character Safe Zone:** Standard baseline `Y = 1460`
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana's face illuminated by streetlamp
- **Reuse:** High
- **Dependencies:** `char_nana_expression_neutral`
- **Risks:** Rain particle density must maintain 60 FPS on mobile

### Scene 14: `ch2_lean_closer`
- **Location:** `street_night` (`loc_street_night`)
- **Time:** Night
- **Mood:** Romance / Intimate
- **Characters:** Nadia (`Nana`, `embarrassed`)
- **Environment:** `env_street_night_master`
- **Layers:** Street stack, Nana offset slightly right
- **Props:** Shared umbrella
- **Atmosphere:** Rain, warm streetlight halo
- **Camera:** Medium close-up
- **Character Safe Zone:** Offset `X: 0.55`, baseline `Y = 1460`
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana stepping closer to avoid rain from umbrella edge
- **Reuse:** High
- **Dependencies:** `char_nana_expression_embarrassed`
- **Risks:** Sprite edge clipping with umbrella silhouette

### Scene 15: `ch2_hold_shoulder`
- **Location:** `street_night` (`loc_street_night`)
- **Time:** Night
- **Mood:** Romance / Heartbeat
- **Characters:** Nadia (`Nana`, `soft_smile`)
- **Environment:** `env_street_night_master`
- **Layers:** Street stack
- **Props:** Shared umbrella
- **Atmosphere:** Gentle rain, softened ambient
- **Camera:** Close-up intimacy framing
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Warm eye contact in cold city rain
- **Reuse:** High
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** None

### Scene 16: `ch2_slow_walk`
- **Location:** `street_night` (`loc_street_night`)
- **Time:** Night
- **Mood:** Romance / Peaceful
- **Characters:** Nadia (`Nana`, `happy`)
- **Environment:** `env_street_night_master`
- **Layers:** Street stack
- **Props:** Shared umbrella
- **Atmosphere:** Steady gentle rainfall
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana smiling looking up at raindrops pattering on canopy
- **Reuse:** High
- **Dependencies:** `char_nana_expression_happy`
- **Risks:** None

### Scene 17: `ch2_bus_stop`
- **Location:** `street_night` (`loc_street_night` - Halte Bus)
- **Time:** Night
- **Mood:** Mystery / Hesitation
- **Characters:** Nadia (`Nana`, `serious`)
- **Environment:** `env_street_night_master` (Variant: `env_street_bus_stop`)
- **Layers:** Bus shelter glass, timetable board, bench
- **Props:** `prop_train_ticket` (peeked in bag)
- **Atmosphere:** Flickering overhead fluorescent tube, dark rain exterior
- **Camera:** Medium shot under shelter canopy
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana clutching her bag with a conflicted expression
- **Reuse:** Medium
- **Dependencies:** `char_nana_expression_serious`, `prop_train_ticket`
- **Risks:** Fluorescent flicker must be disabled if `prefers-reduced-motion`

### Scene 18: `ch3_book_discovery`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night (Midnight 00:10 WIB)
- **Mood:** Mystery / Clue
- **Characters:** None (Action CG focus `cg_old_photograph`)
- **Environment:** `env_nana_bedroom_master` (Variant: `env_nana_bedroom_midnight_rain`)
- **Layers:** `layer_bg_nana_window` (Z:0), `layer_mid_nana_desk` (Z:20), `layer_fg_nana_curtain` (Z:50)
- **Props:** `prop_old_photo` (Polaroid tucked into novel page 42)
- **Atmosphere:** Desk lamp pool of warm light, dark bedroom ambient
- **Camera:** High-angle desk close-up
- **Character Safe Zone:** `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Polaroid edge showing two laughing students inside old novel
- **Reuse:** Bedroom master used 6 times
- **Dependencies:** `env_nana_bedroom_master`, `prop_old_photo`, `cg_old_photograph`
- **Risks:** Novel text must appear authentic without becoming a distraction

### Scene 19: `ch3_polaroid_dialogue`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night
- **Mood:** Romance / Nostalgia
- **Characters:** Nadia (`Nana`, `surprised`)
- **Environment:** `env_nana_bedroom_master`
- **Layers:** Standard bedroom stack
- **Props:** `prop_old_photo`
- **Atmosphere:** Warm desk lamp, fairy lights
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana holding the photograph defensively to her chest
- **Reuse:** High
- **Dependencies:** `char_nana_expression_surprised`
- **Risks:** None

### Scene 20: `ch3_ticket_revelation`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night
- **Mood:** Romance / Heartbreak
- **Characters:** Nadia (`Nana`, `sad`)
- **Environment:** `env_nana_bedroom_master`
- **Layers:** Standard bedroom stack
- **Props:** `prop_train_ticket`
- **Atmosphere:** Cool window moonlight mixing with warm desk lamp
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana looking down at the departure ticket on the desk
- **Reuse:** High
- **Dependencies:** `char_nana_expression_sad`, `prop_train_ticket`
- **Risks:** High emotional weight demands delicate lighting balance

### Scene 21: `ch3_deep_confession`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night
- **Mood:** Romance / Climax
- **Characters:** Nadia (`Nana`, `sad` / tearful)
- **Environment:** `env_nana_bedroom_master`
- **Layers:** Standard bedroom stack
- **Props:** Open novel, ticket
- **Atmosphere:** Intimate warm vignette, quiet rain outside
- **Camera:** Medium-close framing
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana's tearful confession gaze
- **Reuse:** High
- **Dependencies:** `char_nana_expression_sad`
- **Risks:** None

### Scene 22: `ch3_silent_comfort`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night
- **Mood:** Peaceful / Relief
- **Characters:** Nadia (`Nana`, `soft_smile`)
- **Environment:** `env_nana_bedroom_master`
- **Layers:** Standard bedroom stack
- **Props:** None
- **Atmosphere:** Rain quieting down, soft amber ambient
- **Camera:** Medium shot
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Peaceful expression of shared understanding
- **Reuse:** High
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** None

### Scene 23: `ch3_night_phone_msg`
- **Location:** `bedroom_night` (`loc_nana_bedroom`)
- **Time:** Night (02:14 AM)
- **Mood:** Mystery / Transition
- **Characters:** None (Action CG focus `cg_phone_message`)
- **Environment:** Action CG Overlay (`cg_phone_message`)
- **Layers:** Full-frame 9:16 Action CG (Z:35)
- **Props:** `prop_phone`
- **Atmosphere:** Midnight dark room, stark cyan-white lockscreen glow
- **Camera:** Close-up on bedsheets
- **Character Safe Zone:** N/A
- **Dialogue Safe Zone:** Lower 25% overlay
- **Visual Focal Point:** Incoming text message preview on glowing mobile screen
- **Reuse:** Climax transition
- **Dependencies:** `cg_phone_message`, `prop_phone`
- **Risks:** Lockscreen UI font legibility across varying device pixel densities

### Scene 24: `ch4_station_climax`
- **Location:** `station_sunset` (`loc_station`)
- **Time:** Sunset (Golden Hour)
- **Mood:** Tension / Climax
- **Characters:** Nadia (`Nana`, `serious`)
- **Environment:** `env_station_master` (Variant: `env_station_sunset_platform`)
- **Layers:** `layer_bg_station_sky` (Z:0), `layer_mid_station_tracks` (Z:20), `layer_char_station_space` (Z:30), `layer_fg_station_pillar` (Z:50)
- **Props:** `prop_backpack`, `prop_train_ticket`
- **Atmosphere:** Golden-amber sunset backlighting, glowing station departure board
- **Camera:** Wide to medium cinematic tracking shot
- **Character Safe Zone:** `[X: 0.12, Y: 0.32, W: 0.76, H: 0.62]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Nana standing near platform edge with backpack, train idling
- **Reuse:** Station master used 5 times
- **Dependencies:** `env_station_master`, `char_nana_expression_serious`
- **Risks:** Harsh sunset rim light must preserve sprite silhouette edge contrast

### Scene 25: `ch4_final_choice`
- **Location:** `station_sunset` (`loc_station`)
- **Time:** Sunset
- **Mood:** Romance / Critical Decision Point
- **Characters:** Nadia (`Nana`, `worried`)
- **Environment:** `env_station_master`
- **Layers:** Standard station stack
- **Props:** `prop_backpack`
- **Atmosphere:** Deep golden-orange sky, station chime sounding
- **Camera:** Medium two-shot perspective
- **Character Safe Zone:** Standard baseline `Y = 1460`
- **Dialogue Safe Zone:** Standard + 3 Choice Buttons
- **Visual Focal Point:** Nana turning back toward player with conflicted eyes
- **Reuse:** High
- **Dependencies:** `char_nana_expression_worried`
- **Risks:** Multiple choice buttons must never overlap Nana's face or upper body

### Scene 26: `ending_true_scene`
- **Location:** `station_sunset` (`loc_station`)
- **Time:** Sunset
- **Mood:** Romance / True Resolution
- **Characters:** Nadia (`Nana`, `happy`)
- **Environment:** `env_station_master`
- **Layers:** Station stack
- **Props:** `prop_backpack` placed on ground
- **Atmosphere:** Sunbeams breaking through platform rafters, golden dust motes
- **Camera:** Medium close-up triumphant framing
- **Character Safe Zone:** Standard baseline
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana smiling brightly, taking player's hand away from train
- **Reuse:** Climax ending
- **Dependencies:** `char_nana_expression_happy`
- **Risks:** None

### Scene 27: `ending_romantic_scene`
- **Location:** `station_sunset` (`loc_station` - Inside Carriage)
- **Time:** Sunset
- **Mood:** Romance / Journey Together
- **Characters:** Nadia (`Nana`, `soft_smile`)
- **Environment:** `env_station_master` (Variant: `env_station_sunset_train_interior`)
- **Layers:** Moving train window backdrop, passenger seats midground
- **Props:** `prop_backpack`, two train tickets
- **Atmosphere:** Golden hour sunbeams streaming across passenger seats
- **Camera:** Medium intimate booth framing
- **Character Safe Zone:** Nana seated opposite player
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana sitting together inside moving train carriage
- **Reuse:** Ending route
- **Dependencies:** `char_nana_expression_soft_smile`
- **Risks:** Window movement animation must not cause motion sickness

### Scene 28: `ending_secret_scene`
- **Location:** `rooftop_night` (`loc_rooftop`)
- **Time:** Night (Under Stars)
- **Mood:** Romance / Secret Revelation
- **Characters:** Nadia (`Nana`, `embarrassed`)
- **Environment:** `env_rooftop_master` (Variant: `env_rooftop_night_stars`)
- **Layers:** `layer_bg_rooftop_stars` (Z:0), `layer_mid_rooftop_terrace` (Z:20), `layer_char_rooftop_space` (Z:30), `layer_fg_rooftop_cables` (Z:50)
- **Props:** `prop_old_photo`
- **Atmosphere:** Cool deep indigo starfield, city bokeh below, gentle breeze
- **Camera:** Wide to medium cinematic
- **Character Safe Zone:** `[X: 0.10, Y: 0.35, W: 0.80, H: 0.60]`
- **Dialogue Safe Zone:** `[X: 0.05, Y: 0.72, W: 0.90, H: 0.25]`
- **Visual Focal Point:** Nana leaning on rooftop railing under starfield, smiling shyly
- **Reuse:** Special secret ending location (Single scene)
- **Dependencies:** `env_rooftop_master`, `char_nana_expression_embarrassed`
- **Risks:** Starfield contrast on low-contrast mobile LCDs

### Scene 29: `ending_bittersweet_scene`
- **Location:** `station_sunset` (`loc_station`)
- **Time:** Sunset / Dusk
- **Mood:** Sadness / Bittersweet Farewell
- **Characters:** Nadia (`Nana`, `sad` / bittersweet smile)
- **Environment:** `env_station_master` (Variant: `env_station_sunset_platform`)
- **Layers:** Station platform stack with departing train
- **Props:** `prop_backpack`
- **Atmosphere:** Twilight purple replacing sunset amber, fading light
- **Camera:** Wide pull-back farewell framing
- **Character Safe Zone:** Nana inside departing carriage window
- **Dialogue Safe Zone:** Standard
- **Visual Focal Point:** Nana's final gentle wave through carriage window as train leaves
- **Reuse:** Ending route
- **Dependencies:** `char_nana_expression_sad`
- **Risks:** Silhouette clarity as ambient light fades to twilight

---

## 3. LOCATION REUSE & DEDUPLICATION ANALYSIS

| Location ID | Canonical Name | Environment Master | Runtime Scenes | Blueprint Scenes | Total Reuse Count | Priority |
|:---|:---|:---|:---:|:---:|:---:|:---:|
| `loc_campus_cafe` | Kafe Kroma | `env_campus_cafe_master` | 11 | 6 | 17 | P0 |
| `loc_street_night` | Jalanan Kota & Halte | `env_street_night_master` | 6 | 0 | 6 | P0 |
| `loc_nana_bedroom` | Kamar Nana | `env_nana_bedroom_master` | 6 | 2 | 8 | P0 |
| `loc_station` | Peron Stasiun Kereta | `env_station_master` | 5 | 2 | 7 | P0 |
| `loc_agus_room` | Kamar Agus (Zona WIT) | `env_agus_room_master` | 0 | 5 | 5 | P0 |
| `loc_rooftop` | Rooftop Gedung Kota | `env_rooftop_master` | 1 | 0 | 1 | P1 |
| `loc_campus` | Pelataran & Tangga Kampus | `env_campus_master` | 0 | 2 | 2 | P1 |
| `loc_office` | Studio Desain Nana | `env_office_master` | 0 | 2 | 2 | P1 |
| `loc_beach` | Tebing Pantai Senja | `env_beach_master` | 0 | 1 | 1 | P2 |
| `loc_mountain` | Puncak Bukit & Jalur Kabut | `env_mountain_master` | 0 | 1 | 1 | P2 |
| `loc_nana_house` | Rumah Keluarga Nana | `env_nana_house_master` | 0 | 1 | 1 | P2 |
| `loc_shared_apartment` | Apartemen Bersama | `env_shared_apartment_master` | 0 | 1 | 1 | P2 |

**Key Finding:** 5 Core P0 Environments cover **96.5%** of all runtime scenes (28 out of 29 scenes). Prioritizing P0 environment master creation maximizes immediate production value.

---

## 4. VISUAL CONTINUITY & CAMERA FRAMING AUDIT

1. **Aspect Ratio Standard:** Mobile-first vertical 9:16 (`1080x1920`), responsive desktop letterbox / 16:9 landscape backdrop (`1920x1080`).
2. **Character Baseline Anchor:** Immutable standard at `Y = 1460` (canvas height 1536). Characters scale responsively without vertical jumping during expression/pose transitions.
3. **Lighting Continuity across Chapters:**
   - **Act 1 (Kafe Kroma):** Warm tungsten amber interior vs cool rain-soaked street exterior visible through glass.
   - **Act 2 (Rain Street):** Yellow sodium streetlights with deep asphalt puddle reflections.
   - **Act 3 (Nana's Bedroom):** Midnight blue room with focused warm desk lamp puddle (00:10 WIB).
   - **Act 4 (Station Climax):** Intense golden hour amber-orange sunset backlighting.
   - **Epilogue Divergence:** Starry cool indigo (Secret), radiant dawn gold (True), warm carriage sunset (Romantic), dusk violet (Bittersweet).

---

## 5. RESPONSIVE & MOBILE SAFE ZONE AUDIT

```text
+------------------------------------------+ 0.00
| Header UI Safe Zone (Timezone, Title)    |
| [X: 0.05, Y: 0.02, W: 0.90, H: 0.10]    |
+------------------------------------------+ 0.12
|                                          |
| Character Visual Space                   |
| [X: 0.10, Y: 0.32, W: 0.80, H: 0.62]    |
| (Nana, Agus, Secondary NPCs)             |
| Baseline: Y = 1460                       |
|                                          |
+------------------------------------------+ 0.72
| Dialogue Box & Choices Safe Zone         |
| [X: 0.05, Y: 0.72, W: 0.90, H: 0.25]    |
+------------------------------------------+ 0.97
| System Navigation / Home Bar             |
+------------------------------------------+ 1.00
```

* **Dialogue Clearance:** 25% height allocation at bottom prevents overlap with character facial expressions.
* **Header Clearance:** 10% height allocation at top reserves space for dual-timezone indicators (`00:10 WIB` vs `02:10 WIT`).
* **Side Padding:** 5% horizontal margin protects UI from curved mobile screen edges and notches.

---

## 6. PERFORMANCE & RESOURCE ESTIMATION

* **Environment Asset Footprint (ESTIMATE):**
  - 12 Masters × ~250KB WebP = ~3.0 MB
  - Layer Cutouts (Midground + Foreground): 12 × 2 × ~150KB WebP = ~3.6 MB
  - Total Environment Footprint: **~6.6 MB**
* **Props Footprint (ESTIMATE):**
  - 9 Props × ~80KB WebP = **~720 KB**
* **Action CG Footprint (ESTIMATE):**
  - 4 CGs × ~300KB WebP = **~1.2 MB**
* **Total Estimated Visual Package:** **~8.5 MB** (Well within standard mobile cellular 4G/5G budget < 15 MB).
* **Preload Strategy:** Preload next 2 scenes sequentially; unload distant acts on chapter transition.

---

## 7. DESIGN DECISIONS REQUIRED

1. **Carriage Window Motion in Ending Romantic:** Decide whether background through carriage window uses static motion-blur backdrop or lightweight CSS translation loop. (Recommendation: Static motion blur backdrop for zero battery drain).
2. **Action CG Full-Screen Presentation:** Decide whether Action CGs hide the dialogue box on initial display until tapped, or display standard bottom dialogue box immediately. (Recommendation: Initial 1.5s unobstructed view, then fade in dialogue box).
3. **Fluorescent Flicker Frequency in `ch2_bus_stop`:** Ensure flicker rate is locked at `<= 2Hz` or completely disabled when `prefers-reduced-motion: reduce` is active.

---

## 8. MISSING INFORMATION

* None identified within the 29 runtime scenes. All scene IDs, character associations, moods, and branching paths are 100% accounted for in `src/data/storyContent.ts`.
