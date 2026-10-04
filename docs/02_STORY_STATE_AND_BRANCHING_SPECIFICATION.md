# 02 — STORY STATE & BRANCHING SPECIFICATION

## PROJECT
**Title:** 2 HOURS APART  
**Genre:** Romance / Slice of Life  
**Format:** Interactive Web Story  
**Engine:** TypeScript-based interactive story engine  
**Rendering:** 2.5D layered scene system  
**Endings:** 5  
**Secret Route:** 1  

---

# 1. PURPOSE
Dokumen ini mendefinisikan seluruh:
* story state
* relationship state
* hidden state
* flags
* counters
* choice mutation
* branch condition
* chapter unlock
* secret route
* ending evaluation
* save/load state

Semua logic harus **data-driven**. Jangan hard-code cerita ke UI component.

---

# 2. CORE PRINCIPLE
```text
STORY DATA -> STATE -> RULE EVALUATION -> SCENE -> CHOICE -> STATE MUTATION -> NEXT SCENE
```
Renderer hanya bertugas menampilkan hasil. Renderer TIDAK menentukan apakah sebuah pilihan benar/salah atau ending apa yang didapat.

---

# 3. STORY STATE

## 3.1 Primary State (Range 0–100)
```json
{
  "trustAgus": 50,
  "affectionAgus": 50,
  "communication": 50,
  "independence": 50,
  "sacrifice": 50,
  "conflict": 0
}
```

## 3.2 Secondary Relationships (Range 0–100)
```json
{
  "trustKaka": 50,
  "trustDita": 50,
  "trustFikri": 50,
  "familySupport": 50
}
```

## 3.3 Hidden Emotional State (Range 0–100)
```json
{
  "emotionalDistance": 0,
  "unspokenProblems": 0,
  "relationshipFatigue": 0,
  "futureCompatibility": 50,
  "jealousy": 0
}
```

## 3.4 Story Counters
```json
{
  "honestChoices": 0,
  "avoidanceChoices": 0,
  "sacrificeChoices": 0,
  "independenceChoices": 0,
  "relationshipChoices": 0,
  "careerChoices": 0
}
```

## 3.5 Story Flags (All default: false)
```typescript
interface StoryFlags {
  metAgusFirstTime: boolean;
  confessedFeelings: boolean;
  relationshipStarted: boolean;
  missedImportantCall: boolean;
  talkedAboutFeelings: boolean;
  trustedAgus: boolean;
  suspectedMaya: boolean;
  agusJealousOfBimo: boolean;
  nanaReassuredAgus: boolean;
  careerConflict: boolean;
  choseRelationship: boolean;
  choseCareer: boolean;
  choseCompromise: boolean;
  tripUnlocked: boolean;
  secretConversationUnlocked: boolean;
  secretMemoryUnlocked: boolean;
  secretRouteUnlocked: boolean;
}
```

---

# 4. STATE MUTATION & CLAMPING

Semua stat 0–100 harus selalu di-clamp:
```ts
export function modifyStat(current: number, delta: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, current + delta));
}
```

Tag to counter automated rules:
* `honest` -> `honestChoices +1`
* `avoidant` -> `avoidanceChoices +1`
* `sacrifice` -> `sacrificeChoices +1`
* `independent` -> `independenceChoices +1`
* `career` -> `careerChoices +1`
* `relationship` -> `relationshipChoices +1`

---

# 5. CHOICE MUTATION MAP (ACT 1 TO ACT 5)

* **SCENE 01:**
  - A: `affectionAgus +2`
  - B: `trustAgus +2`
  - C: `independence +1`, `emotionalDistance +1`
* **SCENE 02:**
  - A: `trustKaka +2`
  - B: `unspokenProblems +1`
  - C: `trustKaka +3`, `affectionAgus +1`
* **CHOICE 01 (SCENE 03):**
  - A (Tease): `affectionAgus +4`, `relationshipChoices +1`
  - B (Ask Future): `trustAgus +4`, `honestChoices +1`
  - C (Keep Distance): `independence +2`, `emotionalDistance +1`
* **RAIN SCENE (SCENE 04):**
  - A: `affectionAgus +3`
  - B: `trustAgus +2`, `communication +1`
  - C: `emotionalDistance +1`
* **MOUNTAIN SCENE (SCENE 05):**
  - A: `affectionAgus +4`
  - B: `trustAgus +3`
  - C: `avoidanceChoices +1`, `unspokenProblems +2`
* **CHOICE 02 CONFESSION (SCENE 06):**
  - A (Yes): `confessedFeelings = true`, `relationshipStarted = true`, `affectionAgus +8`, `trustAgus +5`
  - B (Time): `trustAgus +2`, `futureCompatibility +2` -> Scene 07
  - C (Friends): `independence +2`, `emotionalDistance +2` -> Scene 07
* **CHOICE 03 TWO-HOUR ROUTINE (SCENE 11):**
  - A (Nana Adjusts): `communication +3`, `sacrifice +4`, `relationshipFatigue +2`, `sacrificeChoices +1`
  - B (Agus Adjusts): `communication +3`, `sacrifice +3`, `relationshipFatigue +1`
  - C (Meet Halfway): `communication +5`, `independence +3`, `futureCompatibility +2`, `independenceChoices +1`
  - D (Wing It): `emotionalDistance +2`, `unspokenProblems +2`, `avoidanceChoices +1`
* **CHOICE 04 MISSED CALL (SCENE 13):**
  - A (Honest): `communication +5`, `trustAgus +3`, `conflict +2`, `honestChoices +1`
  - B ("It's okay"): `conflict -2`, `unspokenProblems +5`, `relationshipFatigue +2`, `avoidanceChoices +1`
  - C (Ignore): `emotionalDistance +4`, `conflict +2`, `avoidanceChoices +1`
* **CHOICE 05 MAYA (SCENE 18):**
  - A (Trust): `trustAgus +5`, `jealousy -3`, `trustedAgus = true`
  - B (Ask Directly): `communication +5`, `jealousy +1`, `conflict +1`
  - C (Keep Inside): `jealousy +5`, `unspokenProblems +4`, `suspectedMaya = true`
* **CHOICE 06 BIMO MIRROR (SCENE 20):**
  - A (Reassure): `trustAgus +4`, `communication +3`, `jealousy -2`, `nanaReassuredAgus = true`
  - B (Defensive): `conflict +4`, `emotionalDistance +2`
  - C (Ask Why): `communication +5`, `trustAgus +2`, `honestChoices +1`
* **DOG CONFLICT (SCENE 22):**
  - A: `communication +5`, `trustAgus +4`, `unspokenProblems -4`, `honestChoices +1`
  - B: `conflict +5`, `emotionalDistance +3`
  - C: `independence +2`, `communication +1`
* **CHOICE 07 CAREER VS RELATIONSHIP (SCENE 27):**
  - A (Relationship): `choseRelationship = true`, `sacrifice +8`, `independence -3`, `futureCompatibility +1`, `relationshipChoices +1`, `sacrificeChoices +1`
  - B (Career): `choseCareer = true`, `independence +8`, `sacrifice -2`, `futureCompatibility +2`, `careerChoices +1`, `independenceChoices +1`
  - C (Compromise): `choseCompromise = true`, `communication +6`, `independence +4`, `futureCompatibility +6`, `honestChoices +1`
  - D (Delay): `relationshipFatigue +4`, `unspokenProblems +3`, `futureCompatibility -3`, `avoidanceChoices +1`
* **FINAL CALL (SCENE 30):**
  - A: `affectionAgus +5`, `relationshipChoices +1`
  - B: `independence +6`, `futureCompatibility +3`, `independenceChoices +1`
  - C: `honestChoices +3`, `futureCompatibility +1`
  - D: `emotionalDistance +6`, `unspokenProblems +6`, `avoidanceChoices +1`
* **TRIP PACKING (SCENE 31):**
  - A: `secretMemoryUnlocked = true`
  - B: `affectionAgus +2`
  - C: `independence +1`
* **CHOICE 08 THE REAL ANSWER (SCENE 37):**
  - A: `affectionAgus +4`, `relationshipChoices +2`
  - B: `independence +7`, `futureCompatibility +4`, `independenceChoices +1`
  - C: `honestChoices +4`, `futureCompatibility +2`
  - D: `emotionalDistance +5`, `unspokenProblems +5`, `avoidanceChoices +1`
* **MICRO CHOICES (SCENE 40):**
  - Micro 01: A (`independence +3, communication +3`) vs B (`sacrifice +4`)
  - Micro 02: A (`futureCompatibility +3`) vs B (`relationshipFatigue +2`)
  - Micro 03: A (`futureCompatibility +5, communication +3`) vs B (`sacrifice +4`) vs C (`independence +5`)

---

# 6. SECRET ROUTE CRITERIA (SCENE 38)
```text
secretMemoryUnlocked == true
AND trustAgus >= 70
AND communication >= 70
AND independence >= 60
AND futureCompatibility >= 65
AND unspokenProblems <= 30
AND emotionalDistance <= 30
AND honestChoices >= 4
AND avoidanceChoices <= 2
```
If satisfied:
```text
secretConversationUnlocked = true
secretRouteUnlocked = true
```

---

# 7. ENDING RESOLUTION HIERARCHY

Ending evaluation priority:
```text
1. ENDING E (Secret: The Long Way Home)
2. ENDING D (Too Late)
3. ENDING A (Same Direction)
4. ENDING B (Two Paths)
5. ENDING C (Still Us)
Fallback: affectionAgus >= 55 ? END_C : END_D
```

### Precise Predicates:
* **END_E (The Long Way Home):**
  - `secretRouteUnlocked == true`
  - `trustAgus >= 70 && communication >= 70 && independence >= 60 && futureCompatibility >= 65`
  - `unspokenProblems <= 30 && emotionalDistance <= 30`
* **END_D (Too Late):**
  - `emotionalDistance >= 65 || unspokenProblems >= 65 || communication <= 35`
* **END_A (Same Direction):**
  - `trustAgus >= 65 && communication >= 65 && independence >= 50 && futureCompatibility >= 55`
  - `unspokenProblems <= 40 && emotionalDistance <= 40`
* **END_B (Two Paths):**
  - `independence >= 70 && futureCompatibility < 55 && communication >= 55`
  - `careerChoices >= relationshipChoices`
* **END_C (Still Us):**
  - `affectionAgus >= 70 && sacrifice >= 65 && communication >= 45 && relationshipFatigue >= 40`

---

# 8. INVARIANTS (NON-NEGOTIABLE RULES)
* **INV-01:** `relationshipStarted` must be `true` before Act 2 begins.
* **INV-02:** `tripUnlocked` must become `true` after Act 4.
* **INV-03:** An ending must always resolve.
* **INV-04:** Secret Ending cannot unlock without `secretRouteUnlocked`.
* **INV-05:** Secret Ending requires high connection AND high independence.
* **INV-06:** No ending is framed as objectively "wrong" or "game over".
* **INV-07:** Maya and Bimo are never automatically romantic rivals.
* **INV-08:** No character becomes evil solely for melodrama.
* **INV-09:** Conflict arises organically from real-world distance pressure.
* **INV-10:** The 2-hour timezone difference itself is never the sole villain.
