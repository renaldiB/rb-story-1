# CANONICAL CHARACTER REGISTRY

**Project:** 2 HOURS APART  
**Authoritative Sources:** `docs/03_ASSET_BIBLE.md`, `docs/02_STORY_STATE_AND_BRANCHING_SPECIFICATION.md`, `docs/04_VISUAL_STYLE_AND_IMAGE_GENERATION_BIBLE.md`  
**Date:** 2026-10-03  
**Status:** CANONICAL LOCK

---

## 1. PROTAGONISTS (LOCKED CANONICAL MASTERS)

### 1. `char_nana`
- **Canonical ID:** `char_nana`
- **Name:** Nana
- **Age:** 24
- **Role:** Protagonist, POV Character, Graphic Designer / Creative Professional (UTC+7 / WIB)
- **Relationship:** In a 2-hour long-distance relationship with Agus
- **Story Function:** Player shapes her response to distance, career opportunities, emotional honesty, and sacrifice.
- **Visual Identity:** 24yo Southeast Asian woman, soft oval face, expressive warm hazel-brown almond eyes, shoulder-length layered wavy dark chestnut hair with soft curtain bangs, warm peach skin. Wears oversized cream ribbed knit sweater (`outfit_casual_home`), sage linen button-up (`outfit_trip`), and casual work attire.
- **Current Asset Status:** **LOCKED MASTER**
- **Reference Asset:** `public/assets/stories/two-hours-apart/characters/char_nana_master.jpg`
- **Scenes Used:** SC-01 through SC-40 (All Acts & All Endings)
- **Generation Status:** COMPLETE (Master Sheet locked with 4 expressions: Smile, Pensive, Emotional, Sleepy)
- **Contradictions Found:** None.
- **Resolution:** Retain existing file as canonical single source of truth.

---

### 2. `char_agus`
- **Canonical ID:** `char_agus`
- **Name:** Agus
- **Age:** 24
- **Role:** Main Character / Love Interest, Junior Software Engineer / Remote Tech Worker (UTC+9 / WIT)
- **Relationship:** In a 2-hour long-distance relationship with Nana
- **Story Function:** Partner living 2 hours ahead; represents the emotional tension of opposing schedules, late-night exhaustion, and shared longing.
- **Visual Identity:** 24yo Asian young man, lean build, clean jawline, round thin dark wireframe glasses, textured messy black hair parted casually, observant warm dark eyes. Wears charcoal zip hoodie over white crewneck tee with studio headphones (`outfit_casual_room`), chore coat (`outfit_trip`).
- **Current Asset Status:** **LOCKED MASTER**
- **Reference Asset:** `public/assets/stories/two-hours-apart/characters/char_agus_master.jpg`
- **Scenes Used:** SC-01 through SC-10, SC-14, SC-18, SC-21, SC-24, SC-25, SC-28 through SC-35, SC-39, SC-40
- **Generation Status:** COMPLETE (Master Sheet locked with 4 expressions: Smile, Exhausted/Tired, Laughing Phone, Deep Gaze)
- **Contradictions Found:** None.
- **Resolution:** Retain existing file as canonical single source of truth.

---

## 2. SUPPORTING CAST RECONCILIATION

### 3. `char_kaka`
- **Canonical ID:** `char_kaka`
- **Name:** Kaka
- **Age:** 29
- **Role:** Nana's Older Sister
- **Relationship to Protagonists:** Nana's trusted sibling and pragmatic mentor
- **Story Function:** Serves as a reality check in Act 2 (`SC-11`). Gives warm, unsentimental advice about career balance and the true emotional costs of long-distance relationships.
- **Visual Identity Requirements:** Sharp confident posture, chin-length dark bob, structured minimalist linen blazer or fine knit sweater, observant warm eyes with mature poise.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** SC-11 (Act 2)
- **Generation Status:** Priority 2 (Batch generation when developing Act 2)
- **Contradictions Found:** `docs/ASSET_PIPELINE_AUDIT.md` incorrectly listed Kaka as "Nana's 24yo best friend".
- **Authoritative Source:** `docs/03_ASSET_BIBLE.md` line 47: "Kaka (Sister — Age 29)".
- **Resolution:** Normalized to **Nana's Older Sister (Age 29)**.

---

### 4. `char_raka`
- **Canonical ID:** `char_raka`
- **Name:** Raka
- **Age:** 19
- **Role:** Nana's Younger Brother
- **Relationship to Protagonists:** Nana's younger sibling (lives in Nana's family home in Jakarta)
- **Story Function:** Comic relief and instinctive emotional observer at the dinner table; notices when Nana is glued to her phone during meals.
- **Visual Identity Requirements:** Tall, lanky, oversized graphic street hoodie, messy hair, expressive chaotic grins, youthful teenage energy.
- **Current Asset Status:** MISSING (Previous procedural SVG was a generic placeholder)
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** SC-23 (Act 4 family home scene)
- **Generation Status:** Priority 2
- **Contradictions Found:** `docs/ASSET_PIPELINE_AUDIT.md` incorrectly identified Raka as "Agus's tech coworker" in `SC-21`.
- **Authoritative Source:** `docs/03_ASSET_BIBLE.md` line 51: "Raka (Younger Brother — Age 19)".
- **Resolution:** Normalized to **Nana's Younger Brother (Age 19)**. Removed from Agus's room scene `SC-21` (Agus works alone or with Maya in WIT).

---

### 5. `char_dita`
- **Canonical ID:** `char_dita`
- **Name:** Dita
- **Age:** 24
- **Role:** Nana's University Friend
- **Relationship to Protagonists:** Close peer and confidante from college
- **Story Function:** Voices the perspective of modern independent young women; advises Nana not to abandon her identity or compromise her career prematurely.
- **Visual Identity Requirements:** Vibrant pastel wardrobe, layered gold necklaces, expressive animated gestures, warm encouraging smile.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** SC-11 (alternate) / Act 3 support
- **Generation Status:** Priority 2
- **Contradictions Found:** Previous audit conflated Dita's role with agency office colleagues.
- **Authoritative Source:** `docs/03_ASSET_BIBLE.md` line 59: "Dita (Nana's University Friend — Age 24)".
- **Resolution:** Normalized to **Nana's University Friend (Age 24)**.

---

### 6. `char_fikri`
- **Canonical ID:** `char_fikri`
- **Name:** Fikri
- **Age:** 24
- **Role:** Agus's Best Friend
- **Relationship to Protagonists:** Agus's lifelong friend and confidant in his city
- **Story Function:** Grounding companion who listens to Agus's doubts about whether the distance is sustainable.
- **Visual Identity Requirements:** Broad athletic shoulders, loud open laughter, casual street polo, backwards cap, relaxed supportive demeanor.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** Act 2 / Act 4 Agus branch scenes
- **Generation Status:** Priority 2
- **Contradictions Found:** Previous audit described Fikri as "Nana's boss / Creative Director in SC-20".
- **Authoritative Source:** `docs/03_ASSET_BIBLE.md` line 63: "Fikri (Agus's Best Friend — Age 24)".
- **Resolution:** Normalized to **Agus's Best Friend (Age 24)**. Nana's creative director in SC-20 is an off-screen/incidental role, not Fikri.

---

### 7. `char_maya`
- **Canonical ID:** `char_maya`
- **Name:** Maya
- **Age:** 25
- **Role:** Agus's Tech Coworker
- **Relationship to Protagonists:** Senior developer / team member at Agus's remote tech firm
- **Story Function:** Represents Agus's professional world. When Nana overhears her in the background during late-night calls, it tests Nana's trust and triggers latent insecurity (`SC-14`).
- **Visual Identity Requirements:** Polished business-casual blouse, sharp ponytail, lanyard with security card, competent and friendly professional demeanor.
- **Current Asset Status:** MISSING (Previous procedural SVG was a generic placeholder)
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** SC-14 (Act 3)
- **Generation Status:** Priority 2
- **Contradictions Found:** None. Role is consistent across all documents.
- **Resolution:** Canonical role confirmed.

---

### 8. `char_bimo`
- **Canonical ID:** `char_bimo`
- **Name:** Bimo
- **Age:** 26
- **Role:** Nana's Colleague / Studio Coworker
- **Relationship to Protagonists:** Friendly peer at Nana's graphic design studio
- **Story Function:** Invites Nana to after-work dinner (`SC-16`), testing Agus's security and highlighting how Nana continues to build a vibrant life of her own.
- **Visual Identity Requirements:** Warm approachable smile, rolled-up sleeve oxford shirt, leather messenger bag, neat contemporary haircut.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None (Spec defined in `docs/03_ASSET_BIBLE.md` §2.3)
- **Scenes Used:** SC-16 (Act 3), SC-20 (Act 4)
- **Generation Status:** Priority 2
- **Contradictions Found:** Previous audit described Bimo as "Nana's childhood friend".
- **Authoritative Source:** `docs/03_ASSET_BIBLE.md` line 71: "Bimo (Nana's Colleague — Age 26)".
- **Resolution:** Normalized to **Nana's Design Studio Colleague (Age 26)**.

---

### 9. `char_ibu_nana`
- **Canonical ID:** `char_ibu_nana`
- **Name:** Ibu Nana
- **Age:** 53
- **Role:** Nana's Mother
- **Relationship to Protagonists:** Nana's mother
- **Story Function:** Provides gentle parental wisdom in `SC-23`; asks whether Nana is truly happy or just holding onto an ideal.
- **Visual Identity Requirements:** Warm maternal demeanor, neat batik daster or modest blouse, kind expressive eyes with fine laugh lines, hair tied back.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None
- **Scenes Used:** SC-23 (Act 4)
- **Generation Status:** Priority 3
- **Contradictions Found:** Inconsistent ID references (`char_ibu` vs `char_ibu_nana`).
- **Resolution:** Canonical ID permanently locked to `char_ibu_nana`.

---

### 10. `char_ayah_nana`
- **Canonical ID:** `char_ayah_nana`
- **Name:** Ayah Nana
- **Age:** 56
- **Role:** Nana's Father
- **Relationship to Protagonists:** Nana's father
- **Story Function:** Quiet supportive father in `SC-23`; listens quietly, offering stoic encouragement.
- **Visual Identity Requirements:** Slender, quiet presence, wire reading glasses on neck cord, short-sleeve collared batik or polo, salt-and-pepper hair.
- **Current Asset Status:** MISSING
- **Locked/Reference Asset:** None
- **Scenes Used:** SC-23 (Act 4)
- **Generation Status:** Priority 3
- **Contradictions Found:** Inconsistent ID references (`char_ayah` vs `char_ayah_nana`).
- **Resolution:** Canonical ID permanently locked to `char_ayah_nana`.
