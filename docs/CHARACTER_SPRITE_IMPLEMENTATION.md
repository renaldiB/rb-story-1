# 2.5D CHARACTER SPRITE EXTRACTION & RUNTIME LAYER IMPLEMENTATION

**Project:** 2 HOURS APART  
**Status:** Canonical Character Sprites Implemented & Verified  
**Engine:** TypeScript / React 19 Interactive Story Engine  
**Date:** 2026-10-03  

---

## 1. Executive Summary

This document specifies the extraction, processing, manifest registration, and 2.5D runtime integration of transparent character sprites for the canonical characters **Nana** and **Agus** in *2 HOURS APART*. 

All character sprites were directly extracted and processed from the locked canonical master files:
- `public/assets/stories/two-hours-apart/characters/char_nana_master.jpg` (1200 × 896, 796 KB)
- `public/assets/stories/two-hours-apart/characters/char_agus_master.jpg` (1200 × 896, 657 KB)

Zero AI image generation was executed during this phase. Master identity, face proportions, hair styling, accessories, and clothing lines were 100% preserved.

---

## 2. Source Master Inspection & Extraction Inventory

### 2.1 Nana Master Analysis
The source sheet contains 4 distinct bust portraits against an off-white background (`RGB: 250, 250, 245`):
1. **Top-Left (Bust Front):** Warm smiling expression (`smile_warm`).
2. **Top-Right (Bust 3/4):** Pensive, melancholic looking-down expression (`pensive_thoughtful`).
3. **Bottom-Left (Bust Front):** Emotional expression with visible tears and blush (`emotional_blush`).
4. **Bottom-Right (Bust Phone/3/4):** Sleepy yawn holding a smartphone (`sleepy_yawn`).

### 2.2 Agus Master Analysis
The source sheet contains 4 portraits against a neutral warm gray background (`RGB: 189, 181, 170`):
1. **Left (Half-body):** Confident reassuring smile, hand adjusting glasses, headphones around neck, dark hoodie (`smile_reassuring`).
2. **Bottom-Right (Bust Front):** Calm, deep forward gaze, headphones around neck (`deep_gaze`).
3. **Top-Right (Bust Phone):** Laughing happily while on a smartphone call, headphones around neck (`laughing_phone`).
4. **Top-Middle (Bust Desk):** Exhausted/tired night at computer desk with monitor glow (`tired_night`).

---

## 3. Extracted Sprites Table

| Character | Sprite Identifier | Expression | Pose | Production WebP (Desktop) | Mobile WebP (Mobile) | Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Nana** | `char_nana_bust_smile_01` | `smile_warm` | `bust_front` | 343 × 491 (52.0 KB) | 240 × 343 (21.7 KB) | **EXTRACTED** |
| **Nana** | `char_nana_bust_pensive_01` | `pensive_thoughtful` | `bust_3quarter` | 226 × 481 (34.2 KB) | 158 × 336 (15.4 KB) | **EXTRACTED** |
| **Nana** | `char_nana_bust_emotional_01` | `emotional_blush` | `bust_front` | 429 × 456 (58.1 KB) | 300 × 319 (22.8 KB) | **EXTRACTED** |
| **Nana** | `char_nana_bust_sleepy_phone_01` | `sleepy_yawn` | `bust_phone` | 415 × 451 (58.1 KB) | 290 × 315 (24.6 KB) | **EXTRACTED** |
| **Agus** | `char_agus_halfbody_reassuring_01` | `smile_reassuring` | `halfbody_glasses` | 442 × 874 (83.9 KB) | 309 × 611 (37.1 KB) | **EXTRACTED** |
| **Agus** | `char_agus_bust_neutral_01` | `deep_gaze` | `bust_front` | 459 × 424 (47.5 KB) | 321 × 296 (21.5 KB) | **EXTRACTED** |
| **Agus** | `char_agus_bust_talking_phone_01` | `laughing_phone` | `bust_phone` | 276 × 406 (38.8 KB) | 193 × 284 (18.1 KB) | **EXTRACTED** |
| **Agus** | `char_agus_bust_tired_01` | `tired_night` | `bust_desk` | 310 × 491 (42.0 KB) | 217 × 343 (18.5 KB) | **EXTRACTED** |

---

## 4. Transparency Processing & Image Quality

To comply with the strict visual QA requirements:
1. **Edge-Aware Antialiased Alpha:** External background pixels were segmented via flood-fill boundary segmentation, connected-component filtering, and morphologic dilation/erosion to produce smooth subpixel edge feathering without binary stair-stepping.
2. **Color Decontamination (Defringing):** Edge pixels with intermediate alpha values were un-premultiplied and defringed against the source background color, ensuring zero white halo around Nana's hair and zero gray matte border around Agus's hoodie.
3. **Internal Detail Preservation:** Internal bright regions (e.g. white t-shirts, sweater fabric, eye reflections, tears) were protected through external-only flood filling.
4. **Deterministic Storage:** Stored under:
   - `public/assets/stories/two-hours-apart/characters/sprites/nana/`
   - `public/assets/stories/two-hours-apart/characters/sprites/nana/mobile/`
   - `public/assets/stories/two-hours-apart/characters/sprites/agus/`
   - `public/assets/stories/two-hours-apart/characters/sprites/agus/mobile/`

---

## 5. 2.5D Layer Architecture & z-Index System

The runtime stage in [`src/components/StoryStage.tsx`](./src/components/StoryStage.tsx) adheres to the following deterministic z-index order:

```
z-index 0   Background Art (Responsive WebP with Procedural SVG fallback)
z-index 10  Environment FX (AtmosphereLayer: Rain, Motes, Fog)
z-index 20  Midground Layer (Scenery, Vignette)
z-index 30  Character Sprites (Layered transparent WebP with micro-animation)
z-index 40  Props Layer (ForeshadowItemView, Discoverable Items)
z-index 50  Foreground FX (Theme Vignette, Cinematic Bottom Dialogue Gradient)
z-index 100 Diegetic Item Button & Dialogue UI Layer
z-index 200 Global UI Modals / Settings
```

---

## 6. Responsive Positioning & Micro-Animation

### 6.1 Viewport Sizing & Positioning
- Coordinates are relative and responsive across Desktop (1440 × 900) and Mobile (390 × 844):
  - `left`: `left-[22%] sm:left-[25%] -translate-x-1/2`
  - `center`: `left-1/2 -translate-x-1/2`
  - `right`: `left-[78%] sm:left-[75%] -translate-x-1/2`
  - `foreground`: `left-1/2 -translate-x-1/2 scale-110`
  - `background`: `left-1/2 -translate-x-1/2 scale-90 opacity-80`
- Character scale is responsive:
  - Half-body sprites: `w-[320px] sm:w-[380px] md:w-[440px] max-w-[95%]`
  - Bust sprites: `w-[280px] sm:w-[330px] md:w-[380px] max-w-[90%]`

### 6.2 Micro-Animations
- Active Speaker: `translateY(-8px) scale(1.02)`, full brightness (`1.05`), soft drop shadow (`drop-shadow(0 12px 30px rgba(0,0,0,0.6))`).
- Inactive Character: `translateY(0)`, slight dimming (`brightness(0.72) contrast(0.92)`).
- GPU-Accelerated transitions: All animations use CSS `transform`, `opacity`, and `filter` with `transition-all duration-500 ease-out`.

---

## 7. Fallback Behavior

If a requested character sprite is not available (e.g. secondary characters like Kaka, Dita, Raka, or unextracted variations):
1. Emits console warning:
   ```
   [CharacterRenderer] Missing sprite: character=<name> pose=<pose> expression=<expression> asset=<id>
   ```
2. Falls back gracefully to the existing procedural anime-style SVG generator.
3. The engine never crashes or throws unhandled exceptions.

---

## 8. Test Scene Verification

| Scene ID | Scene Location | Characters & Sprites | Layering | Desktop (1440×900) | Mobile (390×844) | Verification Status |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-01** | Bookshelf Café | Nana (`bust_smile_01` @ left), Agus (`halfbody_reassuring_01` @ right) | z-30 over cafe WebP | Verified | Verified | **PASS** |
| **SC-03** | Campus Courtyard | Nana (`bust_smile_01` @ left), Agus (`halfbody_reassuring_01` @ right) | z-30 over campus WebP | Verified | Verified | **PASS** |
| **SC-06** | Campus Steps (Dusk) | Nana (`bust_pensive_01` @ left), Agus (`bust_neutral_01` @ right) | z-30 over dusk WebP | Verified | Verified | **PASS** |
| **SC-07** | Nana Bedroom (Night) | Nana (`bust_pensive_01` @ center) | z-30 over bedroom WebP | Verified | Verified | **PASS** |
| **SC-08** | Agus Room (Night) | Agus (`bust_tired_01` @ center) | z-30 over room WebP | Verified | Verified | **PASS** |
| **SC-20** | Design Studio | Nana (`bust_pensive_01` @ center) | z-30 over office WebP | Verified | Verified | **PASS** |
| **SC-38** | Epilogue Courtyard | Nana (`bust_smile_01` @ center) | z-30 over office WebP | Verified | Verified | **PASS** |

---

## 9. Blocked Sprites (Secondary Characters)
The following secondary characters currently do not have master sheets or extracted raster sprites and use procedural SVG fallback:
- `char_kaka` (Nana's sister)
- `char_raka` (Nana's brother)
- `char_dita` (Nana's friend)
- `char_fikri` (Agus's best friend)
- `char_maya` (Agus's coworker)
- `char_bimo` (Nana's design colleague)
