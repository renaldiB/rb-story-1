# ASSET ID NORMALIZATION TABLE

**Project:** 2 HOURS APART  
**Date:** 2026-10-03  
**Standard:** Lowercase snake_case with canonical category prefixes (`char_`, `env_`, `prop_`, `fx_`, `ui_`, `cg_`).

---

## 1. CHARACTER ID NORMALIZATION

| Legacy / Ambiguous ID | Canonical Normalized ID | Category | Status | Rationale | Impacted Code / Docs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `P01 Nana` / `char_nana_master` | `char_nana` | Character | **CANONICAL LOCK** | Standardized prefix and ID. Master file retained at `.../char_nana_master.jpg`. | `assetManifest.ts`, `visualService.tsx`, all scenes |
| `P02 Agus` / `char_agus_master` | `char_agus` | Character | **CANONICAL LOCK** | Standardized prefix and ID. Master file retained at `.../char_agus_master.jpg`. | `assetManifest.ts`, `visualService.tsx`, all scenes |
| `P03 Kaka` | `char_kaka` | Character | NORMALIZED | Consistent prefixing across all code. | `CANONICAL_CHARACTER_REGISTRY.md`, `assetManifest.ts` |
| `P04 Raka` | `char_raka` | Character | NORMALIZED | Sibling identity locked; removed from office/work scenes. | `CANONICAL_CHARACTER_REGISTRY.md`, `assetManifest.ts` |
| `P05 Ibu Nana` / `char_ibu` | `char_ibu_nana` | Character | NORMALIZED | Resolves ambiguity between `char_ibu` and `char_ibu_nana`. | `assetManifest.ts`, `SCENE_ASSET_COVERAGE.md` |
| `P06 Ayah Nana` / `char_ayah` | `char_ayah_nana` | Character | NORMALIZED | Resolves ambiguity between `char_ayah` and `char_ayah_nana`. | `assetManifest.ts`, `SCENE_ASSET_COVERAGE.md` |
| `P07 Dita` | `char_dita` | Character | NORMALIZED | Nana's university friend. | `assetManifest.ts` |
| `P08 Fikri` | `char_fikri` | Character | NORMALIZED | Agus's best friend. | `assetManifest.ts` |
| `P09 Maya` | `char_maya` | Character | NORMALIZED | Agus's coworker. | `assetManifest.ts` |
| `P10 Bimo` | `char_bimo` | Character | NORMALIZED | Nana's design studio colleague. | `assetManifest.ts` |

---

## 2. ENVIRONMENT ID NORMALIZATION

| Legacy / Ambiguous ID | Canonical Normalized ID | Category | Status | Rationale | Impacted Code / Docs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `ENV01 Nana Bedroom` | `env_nana_bedroom` | Environment | **CANONICAL LOCK** | Master file locked at `.../env_nana_bedroom.jpg`. | `assetManifest.ts`, `StoryStage.tsx`, scenes |
| `ENV05 Agus Room` | `env_agus_room` | Environment | **CANONICAL LOCK** | Master file locked at `.../env_agus_room.jpg`. | `assetManifest.ts`, `StoryStage.tsx`, scenes |
| `ENV04 Café` / `cafe_night` | `env_campus_cafe` | Environment | **CANONICAL LOCK** | Master file locked at `.../env_campus_cafe.jpg`. Replaces legacy prototype `cafe_night`. | `assetManifest.ts`, `StoryStage.tsx`, scenes |
| `ENV03 Campus` / `campus_day` | `env_campus` | Environment | NORMALIZED | Courtyard & steps. Procedural SVG placeholder until Priority 1 raster generated. | `assetManifest.ts`, `SCENE_ASSET_COVERAGE.md` |
| `ENV06 Office` | `env_office` | Environment | NORMALIZED | Nana's creative design studio. Priority 1 raster target. | `assetManifest.ts`, `SCENE_ASSET_COVERAGE.md` |
| `ENV02 Nana House` | `env_nana_house` | Environment | NORMALIZED | Living & dining room in Jakarta. | `assetManifest.ts`, `SCENE_ASSET_COVERAGE.md` |
| `ENV07 Mountain` | `env_mountain` | Environment | NORMALIZED | Sunrise sea of clouds overlook (Act 5). | `assetManifest.ts` |
| `ENV08 Beach` | `env_beach` | Environment | NORMALIZED | Coastal twilight beach walk (Act 5). | `assetManifest.ts` |
| `ENV09 Airport / Station` | `env_station` & `env_airport` | Environment | NORMALIZED | Split into distinct transit destinations: `env_station` (rail) and `env_airport` (flight). | `assetManifest.ts` |

---

## 3. PROP & ANIMAL ID NORMALIZATION

| Legacy / Ambiguous ID | Canonical Normalized ID | Category | Status | Rationale | Impacted Code / Docs |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `PROP01 Smartphone` | `prop_phone` | Prop / UI | **CANONICAL LOCK** | Unified with in-engine interactive phone modal (`DiegeticInterface.tsx`). | `assetManifest.ts`, `DiegeticInterface.tsx` |
| `PROP02 Old Photo` / `prop_polaroid` | `prop_old_photo` | Prop | NORMALIZED | Polaroid item linking Act 1 to Act 5 Secret Route. | `assetManifest.ts`, `twoHoursApartEngine.ts` |
| `PROP03 Coffee` / `prop_tea` | `prop_coffee` | Prop | NORMALIZED | Reusable beverage prop. Variants: `steaming_mug`, `takeout_cup`, `tea_glass`. | `assetManifest.ts` |
| `PROP05 Laptop` | `prop_laptop` | Prop | NORMALIZED | Integrated in `env_campus_cafe` and `env_agus_room`. | `assetManifest.ts` |
| `PROP04 Backpack` / `prop_luggage`| `prop_backpack` | Prop | NORMALIZED | Travel gear for Act 5 transit arc. | `assetManifest.ts` |
| `PROP06 Dog` / `animal_dog` | `prop_dog_rescue` | Animal / Prop | NORMALIZED | Scruffy rescued street puppy from Act 3. | `assetManifest.ts`, `twoHoursApartEngine.ts` |
| `PROP07 Cat` / `animal_cat` | `prop_agus_cat` | Animal / Prop | **CANONICAL LOCK** | Orange tabby cat permanently integrated in `env_agus_room.jpg`. | `assetManifest.ts` |
| `prop_transit_ticket` | `prop_train_ticket` | Prop / UI | NORMALIZED | Diegetic train ticket UI for Act 4/5. | `assetManifest.ts`, `DiegeticInterface.tsx` |

---

## 4. CODE & MANIFEST RECONCILIATION
All canonical IDs above are strictly mapped into:
- [`src/data/assets/assetManifest.ts`](./src/data/assets/assetManifest.ts)
- [`docs/CANONICAL_CHARACTER_REGISTRY.md`](./docs/CANONICAL_CHARACTER_REGISTRY.md)
- [`docs/SCENE_ASSET_COVERAGE.md`](./docs/SCENE_ASSET_COVERAGE.md)
