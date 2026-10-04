# NEXT ASSET PRODUCTION PRIORITY

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
| `char_kaka` | Character | Nana's best friend (bubbly, insightful, supportive) | Confidante in SC-11 |
| `char_maya` | Character | Agus's female tech teammate | Triggers Nana's unspoken anxiety in SC-14 |
| `char_bimo` | Character | Nana's childhood male friend | Triggers Agus's subtle jealousy in SC-16 |
| `prop_dog_rescue` | Animal / Prop | Scruffy rescued street puppy | Emotional anchor in SC-17 & Ending B/E |
| `char_fikri` | Character | Creative Director offering promotion | Career dilemma in SC-20 |
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
| `char_ibu_nana` | Character | Nana's mother (gentle, protective) | SC-23 |
| `char_ayah_nana` | Character | Nana's father (reassuring, reflective) | SC-23 |
| `cg_ending_a` | Action CG | Nana and Agus together in shared apartment | Ending A Climax |
| `cg_ending_e` | Action CG | Nana and Agus holding hands at sunset cafe with old polaroid | Secret Ending Climax |

---

## 4. IMMEDIATE NEXT ACTION RULE

**DO NOT** batch-generate Priority 2 or Priority 3 assets until the current baseline (`env_campus`, `env_office`) is wired into the scene router and tested with 60 FPS performance.
