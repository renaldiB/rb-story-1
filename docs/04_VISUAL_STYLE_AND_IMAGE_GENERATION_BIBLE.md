# 04 — VISUAL STYLE & IMAGE GENERATION BIBLE

## 2 HOURS APART

**Project:** Interactive Web Story (2 Hours Apart)  
**Genre:** Romance / Slice of Life  
**Visual Identity:** Modern Cinematic 2.5D Anime / Contemporary Indie Graphic Novel  
**Reference Palette & Tone:** Makoto Shinkai (lighting/sky gradients), Kyoto Animation (expressive subtle acting/eyes), Wong Kar-wai (color temperature contrast for emotional distance)

---

## 1. ART DIRECTION & VISUAL LANGUAGE

### 1.1 Aesthetic Pillars
1. **Intimacy Through Light:** Warm tungsten indoor light (warm 2700K) vs cold outdoor city night (cool 6500K) to emphasize physical separation and emotional closeness.
2. **Painterly Soft Realism:** Clean line art with soft painterly shading, gentle gradients, subtle texture, no harsh cell-shading lines, rich ambient occlusion.
3. **Cinematic Depth (2.5D Ready):** Strong plane separation. Distinct foreground elements (blurry phone screen, curtains, coffee rim), crisp midground characters, atmospheric depth-of-field backgrounds with bokeh.
4. **Time & Mood Color Harmony:**
   - **Morning (07:00 / 09:00):** Soft golden dawn, diffused sunbeams, pastel blues and peach highlights.
   - **Afternoon (14:00 / 16:00):** Natural daylight, warm wood tones, clean vibrant greens.
   - **Golden Hour / Twilight (17:30 / 19:30):** Deep amber, coral, violet horizon, long dramatic shadows.
   - **Late Night (00:00 / 02:00):** Midnight indigo, smartphone screen glow casting cool light on warm skin, gentle screen reflections.

---

## 2. CHARACTER MASTER DESCRIPTIONS

### 2.1 Nana (Protagonist, Age 24)
- **Identity:** Graphic designer / creative worker living in Western time zone (UTC+7).
- **Physical Characteristics:**
  - **Height:** 162 cm, slender athletic build.
  - **Face:** Soft oval face, expressive warm almond-shaped dark brown eyes, natural lashes, gentle arched brows.
  - **Hair:** Shoulder-length, soft layered waves, dark chestnut brown with subtle warm highlights, parted slightly off-center with curtain bangs framing face.
  - **Complexion:** Warm light-tan / fair Southeast Asian skin with soft peach undertones.
  - **Signature Features:** Small silver stud earrings, expressive subtle micro-expressions (gentle pursed lips when thinking, bright warm crinkling smile when happy).
- **Wardrobe Profiles:**
  - *Casual Home (P01-A):* Cozy oversized cream/oatmeal ribbed knit sweater, comfortable linen shorts/trousers, messy half-bun.
  - *Outdoors/Café (P01-B):* Dusty sage green oversized linen button-up over white camisole, high-waisted neutral slacks, canvas tote bag.
  - *Transit/Travel (P01-C):* Structured beige trench coat or denim jacket, olive crossbody bag, warm wool scarf.

### 2.2 Agus (Main Character, Age 24)
- **Identity:** Junior software engineer / tech remote worker living 2 hours ahead (UTC+9).
- **Physical Characteristics:**
  - **Height:** 176 cm, lean build.
  - **Face:** Defined jawline with soft contours, observant and warm dark eyes, slight laugh lines around corners.
  - **Glasses:** Round slim dark-wireframe glasses with anti-glare reflection.
  - **Hair:** Short-to-medium black hair, textured and slightly parted, casual natural look, occasional bedhead when late night.
  - **Complexion:** Fair Asian skin with neutral undertones.
  - **Signature Features:** Relaxed posture, thoughtful listener gaze, habit of adjusting glasses with index finger.
- **Wardrobe Profiles:**
  - *Home/Desk (P02-A):* Charcoal gray or navy zip hoodie over white crewneck tee, comfortable lounge pants, over-ear studio headphones resting around neck.
  - *Casual Outdoor (P02-B):* Olive green chore jacket over heather gray tee, dark denim pants.
  - *Reunion (P02-C):* Clean navy knit sweater over white collared shirt, minimal black backpack.

---

## 3. MASTER PROMPT ARCHITECTURE

All image generations strictly follow this 7-component modular structure:

```text
[GLOBAL ART STYLE] + [CHARACTER IDENTITY & POSE] + [OUTFIT & DETAILS] + [ENVIRONMENT & 2.5D DEPTH] + [LIGHTING & PALETTE] + [CAMERA & RENDER SPEC] + [NEGATIVE CONSTRAINTS]
```

### 3.1 Global Art Style Prefix (Standard Engine Token)
```text
masterpiece, high quality 2.5D visual novel style, contemporary cinematic romance anime illustration, soft painterly digital art, Makoto Shinkai inspired lighting, fine clean lineart, delicate skin rendering, rich atmospheric ambient lighting, 8k resolution
```

### 3.2 Master Negative Prompt (Negative Constraints)
```text
lowres, bad anatomy, bad hands, missing fingers, extra digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, heavy 3D CGI render, flat vector art, western cartoon, overexposed, deformed eyes, crossed eyes, distorted perspective, text, subtitle, logo
```

---

## 4. MASTER ASSET PROMPT TEMPLATES

### 4.1 Master Character Sheet: Nana (`char_nana_master`)
```text
masterpiece, 2.5D visual novel character sheet, multiple views and expressions of single female character, 24 years old Southeast Asian woman, named Nana, shoulder-length layered wavy dark chestnut hair with soft curtain bangs, warm brown almond eyes, soft friendly face, subtle peach makeup.
Upper body portraits with 4 distinct expressions:
1) Gentle warm smile looking at camera,
2) Pensive thoughtful expression looking down slightly,
3) Emotional teary-eyed touched expression with subtle blush,
4) Sleepy relaxed yawn holding smartphone.
Wearing oversized cream oatmeal knit sweater.
Clean neutral solid background, studio lighting, Makoto Shinkai soft painterly anime aesthetic, delicate fine lines, highly detailed, character concept art.
```

### 4.2 Master Character Sheet: Agus (`char_agus_master`)
```text
masterpiece, 2.5D visual novel character sheet, multiple views and expressions of single male character, 24 years old East/Southeast Asian man, named Agus, round thin wireframe glasses, textured messy black hair parted casually, intelligent warm dark eyes, lean build.
Upper body portraits with 4 distinct expressions:
1) Soft quiet reassuring smile adjusting glasses,
2) Exhausted tired late-night face illuminated by monitor glow,
3) Surprised genuine laughter holding phone to ear,
4) Deep affectionate gaze looking at camera.
Wearing charcoal gray zip hoodie over white crewneck tee, studio headphones around neck.
Clean neutral solid background, studio lighting, modern cinematic romance anime art, delicate fine lines, highly detailed, character concept art.
```

### 4.3 Environment 2.5D Layer Prompt: Nana's Bedroom (`env_nana_bedroom`)
```text
masterpiece, cinematic background illustration, cozy aesthetic young woman's bedroom at 00:10 midnight, interior view, wooden desk near window with scattered design notes, mug of warm tea, fairy lights softly glowing on wall, rain droplets gently sliding on window glass, dark city lights bokeh in background outside window, soft warm tungsten ambient lamp mixed with cool blue moonlight, tranquil intimate atmosphere, no people, painterly anime background art, 16:9 aspect ratio, high resolution.
```

### 4.4 Environment 2.5D Layer Prompt: Agus's Workspace (`env_agus_room`)
```text
masterpiece, cinematic background illustration, cozy modern tech workspace at 02:10 late night, dual computer monitors glowing with clean code editor, sleek mechanical keyboard, sleeping cat curled on corner of desk, mug of black coffee, blinds partially open showing dark skyline with faint city lights, cool screen glow contrasting with warm small desk lamp, quiet focused solitude, no people, painterly anime background art, 16:9 aspect ratio, high resolution.
```

---

## 5. 2.5D SCENE COMPOSITION & LAYER SEPARATION

For responsive parallax and cinematic depth in the story engine, scenes are composed of 4 discrete layers:

```text
[Layer 0: Background (BG)]
- Sky, horizon, distant cityscape, window exterior (blur 4px, parallax speed 0.2x)
- Static WebP, 1080x1920 or 1920x1080

[Layer 1: Midground (MG - Room / Architecture)]
- Walls, window frame, desk, bookshelf, ambient room lighting (parallax speed 0.5x)

[Layer 2: Character Sprites (CHR)]
- Nana / Agus transparent PNG / alpha WebP
- Dynamic breath/blink/talking animations applied via CSS/RAF (parallax speed 1.0x)

[Layer 3: Foreground & Props (FG)]
- Coffee cup on near table edge, smartphone in hand, curtains, blurred bokeh foreground (blur 8px, parallax speed 1.4x)
```

---

## 6. QUALITY ASSURANCE (QA) CHECKLIST

Before any generated asset is added to `public/assets/stories/two-hours-apart/`, it must pass:

- [ ] **Face & Hair Consistency:** Matches the facial proportions, eyes, and hair structure of the locked Master Character Sheet.
- [ ] **Anatomy Integrity:** Clean hands, correct fingers (5 per hand), natural shoulder slope, no AI artifact distortion.
- [ ] **Lighting Consistency:** Key light direction matches the scene environment (e.g. left window or center phone glow).
- [ ] **Clean Alpha Masking (for Sprites):** Transparent background with zero edge halos, no white fringing, clean anti-aliasing.
- [ ] **Performance Budget:** Under 120 KB for backgrounds (WebP), under 90 KB for character sprites.
