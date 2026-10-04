# 03 — ASSET BIBLE
## 2 HOURS APART (Visual Narrative & 2.5D Layer Design System)

> **Notice:** This document is the visual production blueprint. It defines all characters, expressions, outfits, 2.5D environment planes, props, lighting models, and image rendering specifications **before** generation of master visual assets.

---

## 1. VISUAL DIRECTION & ART STYLE

* **Aesthetic:** Cinematic 2.5D Graphic Realism with soft natural lighting and warm atmospheric color grading.
* **Aspect Ratios:**
  * **Mobile Portrait (Primary):** `9:16` (Render target: `1080 × 1920`, viewport display: `360 × 640` to `430 × 932`).
  * **Desktop Responsive Frame:** Contained cinematic smartphone viewport centered on ambient blurred canvas.
* **Palette Language:**
  * *Nana's World (WIB/Early Hours):* Soft dawn gold, muted sage green, warm morning amber, denim blue.
  * *Agus's World (WIT/Late Hours):* Deep twilight navy, warm tungsten desk lamp glow, charcoal slate, rain reflections.
  * *Shared / Trip (Convergence):* Golden hour sunset, coastal turquoise, warm sand beige.

---

## 2. CHARACTERS SPECIFICATION

### 2.1 Nana (Protagonist — Age 24)
* **Visual Anchor:** Soft oval face, expressive warm hazel-brown eyes, shoulder-length wavy dark brown hair usually tied loosely or tucked behind one ear.
* **Vibe:** Natural, patient, independent, subtle quiet strength.
* **Outfits:**
  * `outfit_casual_home`: Oversized cream knit cardigan over soft cotton tee, comfortable joggers.
  * `outfit_campus_work`: Light blue denim jacket, neutral crewneck, olive cargo pants, low-top white sneakers.
  * `outfit_hiking`: Dark teal windbreaker, graphite trekking pants, sturdy trail boots, small green backpack.
  * `outfit_trip`: Sage linen shirt over white camisole, pleated culottes, woven tote bag.
* **Accessories:** Silver minimalist ring on right index finger, small leather-strap wristwatch, wired earphones.

### 2.2 Agus (Main Character — Age 24)
* **Visual Anchor:** Lean build, clean jawline, messy dark hair falling slightly over forehead, observant dark eyes with subtle tired shadows.
* **Vibe:** Introverted, thoughtful, quiet dry humor, dependable.
* **Outfits:**
  * `outfit_casual_room`: Faded charcoal hoodie, dark gray track pants, thick wool socks.
  * `outfit_daily_work`: Crisp minimalist oversized black or navy overshirt over white tee, tapered chinos.
  * `outfit_rain_campus`: Dark olive utility jacket with water-resistant collar, dark denim.
  * `outfit_trip`: Washed tan chore coat, heather gray tee, comfortable dark trousers.
* **Accessories:** Simple black digital watch showing dual timezone if inspected, silver-rimmed reading glasses (occasional).

---

### 2.3 Supporting Cast

#### Kaka (Sister — Age 29)
* **Appearance:** Sharp, confident posture, chin-length bob, structured minimalist linen blazer or knit sweater.
* **Role:** Pragmatic reality check, protective warmth.

#### Raka (Younger Brother — Age 19)
* **Appearance:** Tall, lanky, oversized graphic hoodie, messy hair, expressive chaotic grins.
* **Role:** Comic relief, instinctive emotional observer.

#### Ibu & Ayah Nana (Parents — Mid 50s)
* **Ibu:** Warm, batik apron or neat daster, caring eyes with maternal concern wrinkles.
* **Ayah:** Slender, quiet presence, reading glasses on cord, collared short-sleeve shirt.

#### Dita (Nana's University Friend — Age 24)
* **Appearance:** Vibrant, bright pastel wardrobe, layered gold necklaces, animated expressions.
* **Role:** Encourages Nana to protect her own independence.

#### Fikri (Agus's Best Friend — Age 24)
* **Appearance:** Broad shoulders, loud laughter, casual street polo, backwards cap.
* **Role:** Agus's sounding board and grounding companion.

#### Maya (Agus's Coworker — Age 25)
* **Appearance:** Polished business-casual blouse, sharp ponytail, lanyard with security badge.
* **Role:** Professional peer; represents Agus's daily work environment.

#### Bimo (Nana's Colleague — Age 26)
* **Appearance:** Friendly smile, rolled-up sleeve oxford shirt, messenger bag.
* **Role:** Kind daily colleague; represents Nana's advancing career world.

---

## 3. CHARACTER STATES, POSES & EXPRESSIONS

Each character sprite is authored on transparent alpha channels (`.webp` / `.png`):

```text
/assets/characters/[char_id]/[pose]_[expression].webp
```

### Standard Expression Set (for Nana & Agus)
1. `neutral`: Baseline resting expression, subtle gentle gaze.
2. `smiling_soft`: Warm, affectionate smile with slight eye crinkle.
3. `laughing`: Open joyful grin, slight tilt of head.
4. `thoughtful`: Looking slightly downward or aside, contemplative.
5. `embarrassed`: Slight blush on cheekbones, averted gaze, shy smile.
6. `concerned`: Knit eyebrows, softened lips, vulnerable gaze.
7. `tired_gentle`: Half-lidded eyes, soft smile during midnight calls.
8. `pout_annoyed`: Playful sulking or mild defensive stance.
9. `serious`: Direct eye contact, calm firm lips.
10. `emotional_tear`: Glistening eyes, trembling smile, emotional release.

### Standard Body Poses
* `pose_standing_relaxed`: Natural frontal-three-quarter stance with hands at sides or in pockets.
* `pose_holding_phone`: One hand holding smartphone close to chest, screen glowing on face.
* `pose_sitting_desk`: Seated, leaning forward on elbows.
* `pose_walking`: Dynamic side-stride for street/campus navigation.
* `pose_reunion_hug`: Shared action CG silhouette.

---

## 4. ENVIRONMENT SPECIFICATIONS (2.5D PLANES)

Every scene composition consists of 4 distinct layered planes:
```text
┌──────────────────────────────────────────────┐
│ FOREGROUND: Weather FX, silhouetted foliage   │
├──────────────────────────────────────────────┤
│ CHARACTER LAYER: Sprites + phone light bloom │
├──────────────────────────────────────────────┤
│ MIDGROUND: Window frames, furniture, railings │
├──────────────────────────────────────────────┤
│ BACKGROUND: Distant skyline, sky gradient     │
└──────────────────────────────────────────────┘
```

| Environment ID | Setting Details | Time Variants | Atmospheric FX |
| :--- | :--- | :--- | :--- |
| `env_nana_bedroom` | Desk near window, fairy lights, dog photo, soft bed. | Morning (`06:40`), Night (`00:10`). | Window rain drops, morning sunlight motes. |
| `env_agus_room` | Minimalist desk, dual monitor, cat bed, dark blinds. | Afternoon (`16:00`), Midnight (`02:00`). | Screen glow, warm lamp circle. |
| `env_campus_cafe` | Wooden tables, large glass storefront, hanging lamps. | Afternoon (`16:20`), Dusk (`18:00`). | Amber sunlight wash, coffee steam. |
| `env_hiking_trail` | Lush tropical foliage, dirt ridge path, mountain peak. | Dawn (`05:30`), Morning (`10:30`). | Sunrise rim-light, floating mist motes. |
| `env_office_nana` | Modern open-plan corporate desks, glass partitions. | Midday, Late evening overtime. | Clean fluorescent daylight, city dusk glow. |
| `env_station_airport`| Transit concourse, departure boards, boarding gates. | Morning (`08:40`). | Sunlight rays through high glass roof. |
| `env_beach_viewpoint`| Coastal cliff bench, open horizon, quiet sand dunes. | Golden hour sunset (`17:45`). | Soft golden haze, distant ocean waves. |
| `env_shared_apartment`| Warm sunlit living room, two coffee mugs, moving boxes. | Twilight (`18:20` — End E). | Warm sunset interior glow, calm shadows. |

---

## 5. PROPS & DIEGETIC OBJECTS

Props serve as emotional milestones and interactable story elements:

1. **Smartphone (`prop_smartphone`):**
   - Displays WhatsApp/call mockups with time disparity: `Nana 00:10` vs `Agus 02:10`.
   - Incoming call vibrations and unread notification dots.
2. **The First Polaroid Photo (`prop_old_photo`):**
   - Nana and Agus laughing at campus during their first trip.
   - Re-inspectable in Act 5 (`SC-38`) to unlock Secret Route.
3. **The Stray Dog / Pup (`prop_dog_rescue`):**
   - Scruffy friendly street puppy rescued by Nana in Act 3.
   - Symbolizes Nana's instinct to care and protect.
4. **Agus's Cat (`prop_agus_cat`):**
   - Sleek tabby cat sleeping on Agus's desk during video calls.
   - Symbolizes quiet domestic companionability.
5. **Two Coffee Cups (`prop_dual_coffee`):**
   - Paper takeout cups with handwritten messages.
6. **Travel Backpack & Train Tickets (`prop_transit_ticket`):**
   - Marked with destination and departure timestamp `08:40`.

---

## 6. TECHNICAL IMAGE & PERFORMANCE SPECIFICATION

To strictly obey the **Performance & Optimization Master Guidelines**:

### 6.1 Format & Compression
* **Primary:** `WebP` (82% quality compression, lossless for transparent UI icons).
* **Next-Gen:** `AVIF` for high-resolution background hero artwork.
* **Fallback:** Optimized `PNG` strictly for character sprites requiring crisp 8-bit alpha transparency.

### 6.2 Resolution Budgets
| Asset Category | Source Dimensions | Rendered Max Display | Target File Size |
| :--- | :--- | :--- | :--- |
| Backgrounds (Full bleed) | `1080 × 1920 px` | `100vw × 100vh` | `< 120 KB` (WebP) |
| Character Sprites | `720 × 1280 px` | `380 × 680 px` | `< 90 KB` (WebP/PNG) |
| Props & Diegetic Popups | `512 × 512 px` | `240 × 240 px` | `< 40 KB` |
| Action CGs (Climax scenes) | `1080 × 1920 px` | `100vw × 100vh` | `< 160 KB` |

### 6.3 Asset Naming Conventions
```text
bg_[location]_[time]_[weather].webp
char_[id]_[pose]_[expression].webp
cg_[act]_[event_name].webp
prop_[item_name].webp
```
*Examples:*
- `bg_nana_bedroom_morning_clear.webp`
- `bg_nana_bedroom_midnight_rain.webp`
- `char_nana_phone_smiling_soft.webp`
- `char_agus_room_tired_gentle.webp`
- `prop_first_polaroid.webp`

### 6.4 Streaming & Lazy-Loading Tier
* **Tier P0 (Immediate):** `bg_nana_bedroom_morning`, `char_nana_casual_neutral`, critical UI fonts.
* **Tier P1 (Prefetched):** `char_agus_phone_neutral`, `bg_campus_cafe_afternoon`.
* **Tier P2 (Lazy on Demand):** Optional exploration backgrounds (`bg_hiking_trail`, `prop_dog_rescue`).
* **Tier P3 (Epilogue/Endings):** Ending CG illustrations (`cg_end_a_same_direction`, `cg_end_e_long_way_home`).
