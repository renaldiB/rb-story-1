# CANONICAL DATA RECONCILIATION REPORT

**Project:** 2 HOURS APART  
**Date:** 2026-10-03  
**Authority:** Master Story Bible & Visual Production Bible (`docs/03_ASSET_BIBLE.md`)  
**Status:** RECONCILED & LOCKED

---

## 1. EXECUTIVE SUMMARY
During the asset pipeline audit pass, several discrepancies were identified between early draft descriptions in `docs/ASSET_PIPELINE_AUDIT.md` and the authoritative narrative specification in `docs/03_ASSET_BIBLE.md`. This document resolves all contradictions, formalizes the single source of truth, and records all affected and preserved files across the codebase.

---

## 2. DETECTED CONTRADICTIONS & AUTHORITATIVE RESOLUTIONS

### 2.1 Raka (Age 19)
- **Contradiction:** Early audit note described Raka as *"Agus's tech coworker present in SC-21"*.
- **Authoritative Story Definition (`docs/03_ASSET_BIBLE.md` §2.3 line 51):** *"Raka (Younger Brother — Age 19). Tall, lanky, oversized graphic hoodie, messy hair, expressive chaotic grins. Comic relief, instinctive emotional observer."*
- **Resolution:** Raka is authoritatively confirmed as **Nana's Younger Brother (Age 19)** living in Jakarta with Nana's family. He does not work in WIT and has no role in Agus's remote tech firm.
- **Scene Impact:** Removed from `SC-21` (Agus works alone in `env_agus_room`). Confirmed in `SC-23` (Family dinner).

### 2.2 Fikri (Age 24)
- **Contradiction:** Early audit note described Fikri as *"Nana's boss / Creative Director in SC-20"*.
- **Authoritative Story Definition (`docs/03_ASSET_BIBLE.md` §2.3 line 63):** *"Fikri (Agus's Best Friend — Age 24). Broad shoulders, loud laughter, casual street polo, backwards cap. Agus's sounding board and grounding companion."*
- **Resolution:** Fikri is authoritatively confirmed as **Agus's Best Friend (Age 24)** in his city (UTC+9). He is not Nana's employer. Nana's creative director in `SC-20` is an off-screen/incidental agency role.

### 2.3 Kaka (Age 29)
- **Contradiction:** Early audit described Kaka as *"Nana's 24yo best friend"*.
- **Authoritative Story Definition (`docs/03_ASSET_BIBLE.md` §2.3 line 47):** *"Kaka (Sister — Age 29). Sharp, confident posture, chin-length bob, structured minimalist linen blazer or knit sweater. Pragmatic reality check, protective warmth."*
- **Resolution:** Kaka is authoritatively confirmed as **Nana's Older Sister (Kakak kandung, Age 29)**.

### 2.4 Bimo (Age 26)
- **Contradiction:** Early audit described Bimo as *"Nana's childhood friend"*.
- **Authoritative Story Definition (`docs/03_ASSET_BIBLE.md` §2.3 line 71):** *"Bimo (Nana's Colleague — Age 26). Friendly smile, rolled-up sleeve oxford shirt, messenger bag. Kind daily colleague; represents Nana's advancing career world."*
- **Resolution:** Bimo is authoritatively confirmed as **Nana's Graphic Design Colleague (Age 26)** at her studio in Jakarta.

### 2.5 Dita (Age 24)
- **Contradiction:** Conflated with agency coworkers.
- **Authoritative Story Definition (`docs/03_ASSET_BIBLE.md` §2.3 line 59):** *"Dita (Nana's University Friend — Age 24). Vibrant, bright pastel wardrobe, layered gold necklaces, animated expressions. Encourages Nana to protect her own independence."*
- **Resolution:** Dita is authoritatively confirmed as **Nana's University Friend (Age 24)**.

### 2.6 Maya (Age 25)
- **Status:** Unanimous across all documents as **Agus's Tech Coworker (Age 25)** in WIT.

### 2.7 Ibu & Ayah Nana (Ages 53 & 56)
- **Contradiction:** ID inconsistency (`char_ibu` vs `char_ibu_nana`, `char_ayah` vs `char_ayah_nana`).
- **Resolution:** IDs normalized authoritatively to **`char_ibu_nana`** and **`char_ayah_nana`**.

---

## 3. FINAL CANONICAL CHARACTER TABLE

| Canonical ID | Display Name | Age | Canon Role | Location / Timezone | Narrative Arc / Function | Asset Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `char_nana` | Nana | 24 | Protagonist / Graphic Designer | Jakarta (UTC+7 / WIB) | Player POV; balances distance, career, independence, emotional honesty | **LOCKED MASTER** (`char_nana_master.jpg`) |
| `char_agus` | Agus | 24 | Main Character / Remote Software Dev | WIT / UTC+9 | Long-distance partner; schedule misalignment, quiet devotion | **LOCKED MASTER** (`char_agus_master.jpg`) |
| `char_kaka` | Kaka | 29 | Nana's Older Sister | Jakarta (UTC+7 / WIB) | Pragmatic mentor, realistic sounding board in SC-11 | PENDING (Priority 2) |
| `char_raka` | Raka | 19 | Nana's Younger Brother | Jakarta (UTC+7 / WIB) | Comic relief, notices Nana's phone obsession in SC-23 | PENDING (Priority 2) |
| `char_dita` | Dita | 24 | Nana's University Friend | Jakarta (UTC+7 / WIB) | Champions independence & self-worth | PENDING (Priority 2) |
| `char_bimo` | Bimo | 26 | Nana's Design Studio Colleague | Jakarta (UTC+7 / WIB) | Career peer; triggers Agus's insecurity in SC-16 | PENDING (Priority 2) |
| `char_fikri` | Fikri | 24 | Agus's Best Friend | WIT (UTC+9) | Agus's local confidante and emotional anchor | PENDING (Priority 2) |
| `char_maya` | Maya | 25 | Agus's Tech Coworker | WIT (UTC+9) | Senior peer; triggers Nana's unspoken anxiety in SC-14 | PENDING (Priority 2) |
| `char_ibu_nana` | Ibu Nana | 53 | Nana's Mother | Jakarta (UTC+7 / WIB) | Traditional maternal warmth, questioning longevity in SC-23 | PENDING (Priority 3) |
| `char_ayah_nana` | Ayah Nana | 56 | Nana's Father | Jakarta (UTC+7 / WIB) | Stoic paternal wisdom in SC-23 | PENDING (Priority 3) |

---

## 4. FILES IMPACT AUDIT

### Files Changed:
1. `src/data/assets/assetManifest.ts`: Updated character descriptions to match canonical registry.
2. `docs/SCENE_ASSET_COVERAGE.md`: Re-aligned character appearances in SC-20, SC-21, SC-23.
3. `docs/CANONICAL_CHARACTER_REGISTRY.md`: Created detailed single source of truth.
4. `docs/ASSET_ID_NORMALIZATION.md`: Enforced canonical snake_case naming.
5. `docs/ASSET_RECONCILIATION_REPORT.md`: Comprehensive reconciliation log.

### Files Intentionally Preserved (Not Changed):
1. `public/assets/stories/two-hours-apart/characters/char_nana_master.jpg`: Canonical master locked.
2. `public/assets/stories/two-hours-apart/characters/char_agus_master.jpg`: Canonical master locked.
3. `src/core/stories/twoHoursApartEngine.ts`: Logic and state invariant rules are mathematically verified and untouched.
4. `src/core/performance/*`: All performance engines (`AssetManager`, `AnimationManager`, `QualityScaler`) remain intact.
