# SECONDARY CHARACTER MASTER GENERATION & CONSISTENCY PIPELINE

**Project:** 2 HOURS APART — Interactive Web Story Engine  
**Date:** 2026-10-03  
**Phase:** Secondary Character Master Asset Generation & Visual Consistency Audit  
**Status:** COMPLETED & APPROVED  

---

## 1. Executive Summary

All 8 secondary character master sheets have been generated, visually inspected, audited against the 11-criteria canonical consistency gate, and approved. Each master follows the canonical 4-portrait character sheet format established by the locked anchors (`char_nana_master.jpg` and `char_agus_master.jpg`) against solid neutral backdrops, ready for future sprite segmentation.

---

## 2. Character Registry & Master Inventory

| Character ID | Character Name | Role / Relation | Age | Palette / Wardrobe Anchor | Status | Master Filename | Master Resolution |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `char_kaka` | Kaka | Nana's older sister | 29 | Beige linen blazer, dark top, silver studs | **PASS / APPROVED** | `char_kaka_master.jpg` | 1024×1024 |
| `char_raka` | Raka | Nana's younger brother | 19 | Olive & mustard hoodie, graphic tee | **PASS / APPROVED** | `char_raka_master.jpg` | 1024×1024 |
| `char_dita` | Dita | Nana's college best friend | 24 | Lavender knit top, layered gold necklace | **PASS / APPROVED** | `char_dita_master.jpg` | 1024×1024 |
| `char_fikri` | Fikri | Agus's best friend | 24 | Burgundy & navy athletic polo | **PASS / APPROVED** | `char_fikri_master.jpg` | 1024×1024 |
| `char_maya` | Maya | Agus's tech coworker | 25 | Light blue collared blouse, tech lanyard | **PASS / APPROVED** | `char_maya_master.jpg` | 1024×1024 |
| `char_bimo` | Bimo | Nana's design colleague | 26 | Terracotta & beige oxford, messenger strap | **PASS / APPROVED** | `char_bimo_master.jpg` | 1024×1024 |
| `char_ibu` | Ibu Nana | Nana's mother | 53 | Sage-green floral batik blouse, cream collar | **PASS / APPROVED** | `char_ibu_master.jpg` | 1024×1024 |
| `char_ayah` | Ayah Nana | Nana's father | 56 | Brown geometric batik shirt, reading glasses | **PASS / APPROVED** | `char_ayah_master.jpg` | 1024×1024 |

---

## 3. Canonical Sources & Visual Anchors

- **Canonical Specifications:**
  - `docs/CANONICAL_CHARACTER_REGISTRY.md` (Ages, relationships, wardrobe, palette guidelines)
  - `docs/04_VISUAL_STYLE_AND_IMAGE_GENERATION_BIBLE.md` (Makoto Shinkai / KyoAni aesthetic, lighting, linework, expression sheets)
  - `docs/CANONICAL_DATA_RECONCILIATION.md` (Normalized asset IDs and baseline rules)
- **Immutable Visual Anchors (Preserved Untouched):**
  - Nana Anchor: `public/assets/stories/two-hours-apart/masters/characters/char_nana_master.jpg`
  - Agus Anchor: `public/assets/stories/two-hours-apart/masters/characters/char_agus_master.jpg`

---

## 4. Visual Consistency Audit Matrix (11 Criteria)

Each character was evaluated against the Section 16 consistency gate:
- **A. Identity:** Matches canonical character persona.
- **B. Age:** Reads distinctly at specified age.
- **C. Face:** Canonical features, clear eye/mouth structures across 4 expressions.
- **D. Hair:** Accurate color, length, texture, and styling.
- **E. Clothing:** Specific canonical outfit without unwanted artifacts.
- **F. Proportion:** Head-to-torso proportions uniform with Nana and Agus.
- **G. Rendering Style:** Makoto Shinkai soft painterly anime aesthetic, delicate lineart.
- **H. Lighting:** Diffuse soft studio key light with rim accent, no heavy cinematic shadows.
- **I. Color Language:** Harmonized palette adhering to character sub-world.
- **J. Nana / Agus Compatibility:** Cohesive visual universe; zero jarring style clash.
- **K. Extraction Readiness:** High-contrast neutral background, clean boundary silhouette.

| Character | A | B | C | D | E | F | G | H | I | J | K | Result |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **Kaka** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Raka** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Dita** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Fikri** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Maya** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Bimo** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Ibu** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |
| **Ayah** | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | PASS | **APPROVED** |

---

## 5. Cross-Character Differentiation & Universe Cohesion

To prevent AI-face homogenization or asset drift, characters were validated comparatively:
1. **Nana Family Hierarchy:**
   - **Ayah (56) & Ibu (53):** Mature facial bone structures, gentle laugh lines, dignified Indonesian formal/casual batik attire.
   - **Kaka (29):** Mature, composed older sister in professional beige linen blazer and structured bob haircut.
   - **Nana (21, Anchor):** Youthful, expressive university architecture student.
   - **Raka (19):** Energetic, messy hair, casual boyish hoodie.
2. **Jakarta Social Circle vs. Bandung Tech Circle:**
   - **Dita (24, Jakarta):** Chic half-up wavy caramel hair, warm feminine lavender knit.
   - **Bimo (26, Jakarta):** Creative design colleague, side-parted hairstyle, terracotta oxford, leather strap.
   - **Fikri (24, Bandung):** Athletic build, sporty textured crop, polo shirt, grounded warm-gray tone.
   - **Maya (25, Bandung):** Tech coworker, high ponytail, crisp light blue office blouse with corporate lanyard.
3. **Distinct Silhouettes & Backdrops:**
   - Nana World & Family: Solid soft off-white background (`RGB ~ 248, 249, 243`).
   - Agus World & Bandung Peers: Neutral studio warm-gray background (`RGB ~ 189, 181, 170`).

---

## 6. Regeneration & Artifact Remediation Log

- **Regenerations Required:** 0
- **Artifact Remediation:**
  - `char_kaka_master.jpg`: Background text label artifact ("Kaka") detected in center background. Cleanly painted over using exact native background color (`BGR [243, 249, 248]`). Zero character silhouette touched; passes 100% extraction readiness.
- **Canonical Data Gaps:** None. All 8 characters matched existing canonical registry descriptions.

---

## 7. Master Storage Paths

All approved master files are securely placed in both canonical master storage and runtime character directories:

1. `public/assets/stories/two-hours-apart/masters/characters/`
   - `char_kaka_master.jpg`
   - `char_raka_master.jpg`
   - `char_dita_master.jpg`
   - `char_fikri_master.jpg`
   - `char_maya_master.jpg`
   - `char_bimo_master.jpg`
   - `char_ibu_master.jpg`
   - `char_ayah_master.jpg`

2. `public/assets/stories/two-hours-apart/characters/`
   - Identical copies mirrored for pipeline staging and reference.

---

## 8. Safety & Integrity Confirmation

- `char_nana_master.jpg`: Untouched (10/2/2026).
- `char_agus_master.jpg`: Untouched (10/2/2026).
- Runtime Code (`StoryStage.tsx`, `visualService.tsx`, `assetManifest.ts`, `story.ts`): Untouched.
- Sprite Extraction / WebP Derivatives: NOT STARTED (Reserved for subsequent pipeline phase).
- Environments / Props / CG / Audio: NOT STARTED.
