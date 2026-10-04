# Interactive Story Flow Master Blueprint

> **Notice:** This document is purely architectural planning. It contains **zero** prose, final dialogue, or narration. All content is structured as placeholder logic, state models, and branching schemas.

---

## # 1. STORY PARAMETERS

* **Story ID:** `blueprint_narrative_master`
* **Genre Architecture:** Theme-Agnostic (Configurable for Mystery / Psychological / Romance / Sci-Fi)
* **Tone:** Tense, deliberate, emotionally layered
* **Setting:** Isolated urban / institutional threshold `[PARAM_LOCATION_SETTING]`
* **Protagonist Role:** Observer / Investigator confronting an ambiguous truth
* **Target Scope:** Medium
  * Acts: 5 (Act 0 to Act 4)
  * Chapters: 8
  * Total Scenes: 22 (18 Main, 3 Optional, 1 Secret)
  * Major Interactive Choice Points: 8
  * Endings: 5 (4 Primary Routes + 1 Secret Route)
* **Branching Complexity Budget:** Low-to-Medium (Strict Branch → Consequence → Convergence model)

---

## # 2. NARRATIVE PILLARS

1. **Pillar 1 — Trust vs. Self-Preservation:** Every critical decision balances personal safety against emotional or strategic vulnerability with others.
2. **Pillar 2 — Delayed Consequence:** Choices deposit hidden narrative flags and latent relationship states that surface 1–2 Acts later rather than immediately resolving.
3. **Pillar 3 — Controlled Convergence:** Branches diverge to provide distinct scene content and state modifications, then converge to maintain manageable development scope without losing state memory.

---

## # 3. MAIN CAST FRAMEWORK

### Character: Protagonist (`CHAR_PROTAGONIST`)
* **Role:** Player surrogate / Primary decision maker.
* **Goal:** Uncover the truth behind the central incident while surviving the fallout.
* **Conflict:** Competing loyalties between self-preservation and protecting companions.
* **Arc:** Uncertainty → Hesitant alignment → Decisive confrontation → Consequential resolution.

### Character: Primary Companion (`CHAR_COMPANION_A`)
* **Role:** Confidant / Ambiguous partner.
* **Goal:** Protect a concealed past while securing the protagonist's cooperation.
* **Conflict:** Wants to trust the protagonist but fears exposure.
* **Initial State:** `trust: 20`, `suspicion: 10`, `loyalty: false`.
* **Potential Arc:** Guarded ally → Vulnerable partner OR alienated antagonist depending on player choices.

### Character: Rival / Skeptic (`CHAR_RIVAL_B`)
* **Role:** Antagonist / Faction representative.
* **Goal:** Enforce institutional control and prevent unauthorized discoveries.
* **Conflict:** Views protagonist as an unpredictable liability.
* **Initial State:** `suspicion: 50`, `respect: 10`.
* **Potential Arc:** Relentless pursuer → Reluctant ally IF respected OR total adversary IF deceived.

### Character: Informant (`CHAR_INFORMANT_C`)
* **Role:** Neutral broker / Lore source.
* **Goal:** Trade restricted knowledge for personal security or resources.
* **Initial State:** `neutral: true`, `knowsSecret: true`.

---

## # 4. STORY STATE MODEL

```text
StoryState
├── protagonist
│   ├── courage: number (0–100, default: 20)
│   ├── stress: number (0–100, default: 10)
│   └── knowledge: number (0–100, default: 0)
├── relationships
│   ├── trustA: number (0–100, default: 20)
│   ├── affectionA: number (0–100, default: 10)
│   └── respectB: number (0–100, default: 10)
├── resources
│   └── timeTokens: number (0–5, default: 3)
└── progress
    ├── act: number (0–4)
    ├── chapterId: string
    └── sceneId: string
```

---

## # 5. STORY FLAGS

| Flag ID | Type | Purpose | Initial |
| :--- | :--- | :--- | :--- |
| `flag_searched_archive` | Boolean | Did player investigate restricted records in Act 1? | `false` |
| `flag_concealed_truth_from_A` | Boolean | Did player lie to Companion A about the discovery? | `false` |
| `flag_warned_rival_B` | Boolean | Did player provide early tip to Rival B? | `false` |
| `flag_unlocked_hidden_vault` | Boolean | Was secret keycard / cipher discovered? | `false` |
| `flag_sacrificed_resource` | Boolean | Did player expend emergency battery / token to save ally? | `false` |
| `flag_confessed_feelings` | Boolean | Emotional vulnerability milestone unlocked. | `false` |
| `flag_secret_route_eligible` | Boolean | All pre-conditions for Secret Ending met. | `false` |

---

## # 6. RELATIONSHIP MODEL

```text
[PROTAGONIST]
   │
   ├── (trustA, affectionA) ──────► [CHAR_COMPANION_A]
   │                                   │ (Threshold: trustA >= 60 -> Reveals motive)
   │                                   │ (Threshold: trustA < 30  -> Withholds aid)
   │
   ├── (respectB, suspicionB) ────► [CHAR_RIVAL_B]
   │                                   │ (Threshold: respectB >= 40 -> Grants passage)
   │                                   │ (Threshold: respectB < 20  -> Forces confrontation)
   │
   └── (tradedWithC) ─────────────► [CHAR_INFORMANT_C]
```

---

## # 7. ACT STRUCTURE

### Act 0 — The Threshold (Chapter 1)
* **Purpose:** Establish baseline normal, introduce Protagonist and Companion A, introduce immediate mystery.
* **Conflict:** Arrival at restricted zone; initial security check.
* **Major Choice:** `CHOICE-001` (Cooperative vs Self-Reliant approach).
* **Ending State:** Entry granted; baseline relationship values set.

### Act 1 — The Fractured Clue (Chapters 2–3)
* **Purpose:** Investigation and discovery of contradictory evidence.
* **Conflict:** Protocol vs curiosity; Companion A reveals signs of concealed knowledge.
* **Major Reveal:** The incident was not an accident.
* **Major Choices:** `CHOICE-002` (Investigation focus), `CHOICE-003` (Confront A vs Observe silently).
* **Ending State:** Core anomaly identified; trust or suspicion established with A.

### Act 2 — Convergence & Escalation (Chapters 4–5)
* **Purpose:** Rival B arrives to lock down perimeter; pressure mounts.
* **Conflict:** External scrutiny; limited time resources.
* **Major Reveal:** Rival B possesses documentation implicating Companion A.
* **Major Choices:** `CHOICE-004` (Protect A vs Negotiate with B), `CHOICE-005` (Resource allocation).
* **Ending State:** Inevitable convergence at central terminal; faction stances locked.

### Act 3 — Crisis of Truth (Chapters 6–7)
* **Purpose:** The point of no return; core mystery unveiled.
* **Conflict:** Companion A and Rival B clash directly; protagonist holds deciding factor.
* **Major Reveal:** The true nature of the vault and the cost of revelation.
* **Major Choices:** `CHOICE-006` (Deciding allegiance), `CHOICE-007` (Risking self vs sacrificing evidence).
* **Ending State:** Ending route locked.

### Act 4 — Resolution & Epilogue (Chapter 8)
* **Purpose:** Execute state-dependent climax and resolve character arcs.
* **Ending Evaluation:** Branch to 1 of 5 endings based on accumulated variables and flags.

---

## # 8. CHAPTER MAP

```text
ACT 0
└── CHAPTER 1: Arrival at Sector Zero
    Purpose: Establish situation and first alignment.
    Scenes: SC-001, SC-002, SC-003
    Choices: CHOICE-001
    Exit State: Entry confirmed; trustA calibrated.

ACT 1
├── CHAPTER 2: The Archive Infiltration
│   Purpose: Search for records under time pressure.
│   Scenes: SC-004, SC-005_OPT, SC-006
│   Choices: CHOICE-002
│   Exit State: evidenceCount += 1, flag_searched_archive updated.
└── CHAPTER 3: Interrogation in the Dark
    Purpose: Private encounter between Protagonist and Companion A.
    Scenes: SC-007, SC-008
    Choices: CHOICE-003
    Exit State: trustA or suspicionA permanently altered.

ACT 2
├── CHAPTER 4: The Perimeter Tightens
│   Purpose: Confrontation with Rival B's patrol.
│   Scenes: SC-009, SC-010A, SC-010B, SC-011 (Convergence)
│   Choices: CHOICE-004
│   Exit State: respectB and flag_warned_rival_B updated.
└── CHAPTER 5: The Silent Relay
    Purpose: Optional exploration and hidden device decryption.
    Scenes: SC-012_OPT, SC-013
    Choices: CHOICE-005
    Exit State: Secret flag unlocked or stress accumulated.

ACT 3
├── CHAPTER 6: Breach of the Inner Sanctum
│   Purpose: Penetrate the restricted core.
│   Scenes: SC-014, SC-015_SEC, SC-016
│   Choices: CHOICE-006
│   Exit State: Final ideological commitment.
└── CHAPTER 7: The Last Stand at the Terminal
    Purpose: Climax confrontation.
    Scenes: SC-017, SC-018
    Choices: CHOICE-007, CHOICE-008
    Exit State: Route evaluation triggered.

ACT 4
└── CHAPTER 8: Consequence & Aftermath
    Purpose: Final resolution.
    Scenes: SC-019 (END-A), SC-020 (END-B), SC-021 (END-C), SC-022 (END-D), SC-023 (END-SECRET)
```

---

## # 9. SCENE MAP

| Scene ID | Act | Type | Location | Purpose & Narrative Function | Choices | Next Scenes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `SC-001` | 0 | MAIN | Perimeter Gate | `[ESTABLISH SETTING & PROTOCOL]` | None | `SC-002` |
| `SC-002` | 0 | MAIN | Checkpoint Chamber | `[FIRST INTERACTION WITH A]` | `CHOICE-001` | `SC-003` |
| `SC-003` | 0 | MAIN | Sector Concourse | `[CONVERGENCE & ORIENTATION]` | None | `SC-004` |
| `SC-004` | 1 | MAIN | Archive Corridor | `[INTRODUCE EVIDENCE SEARCH]` | `CHOICE-002` | `SC-005_OPT`, `SC-006` |
| `SC-005_OPT` | 1 | OPTIONAL | Terminal Alcove | `[OPTIONAL CLUE: OLD INCIDENT LOG]` | None | `SC-006` |
| `SC-006` | 1 | MAIN | Archive Storage | `[CRITICAL EVIDENCE DISCOVERY]` | None | `SC-007` |
| `SC-007` | 1 | MAIN | Power Grid Sub-level | `[PRIVATE CONFRONTATION WITH A]` | `CHOICE-003` | `SC-008` |
| `SC-008` | 1 | MAIN | Observation Overlook | `[CONSEQUENCE OF TRUST/LIE]` | None | `SC-009` |
| `SC-009` | 2 | MAIN | Transit Hub | `[ARRIVAL OF RIVAL B]` | `CHOICE-004` | `SC-010A`, `SC-010B` |
| `SC-010A` | 2 | MAIN | Shadow Corridor | `[DEFENSIVE BRANCH: COOPERATE WITH A]` | None | `SC-011` |
| `SC-010B` | 2 | MAIN | Direct Inspection | `[DIPLOMATIC BRANCH: TALK TO B]` | None | `SC-011` |
| `SC-011` | 2 | MAIN | Maintenance Junction | `[BRANCH CONVERGENCE: ALARM SOUNDS]` | None | `SC-012_OPT`, `SC-013` |
| `SC-012_OPT` | 2 | OPTIONAL | Server Core B | `[SECRET PRE-REQUISITE DECRYPTION]` | None | `SC-013` |
| `SC-013` | 2 | MAIN | Vault Threshold | `[RESOURCE SACRIFICE DILEMMA]` | `CHOICE-005` | `SC-014` |
| `SC-014` | 3 | MAIN | Vault Access Lift | `[PRE-CLIMAX TENSION & INTENT]` | None | `SC-015_SEC`, `SC-016` |
| `SC-015_SEC` | 3 | SECRET | The Cold Chamber | `[UNCOVER ARCHITECT'S CONFESSION]` | None | `SC-016` |
| `SC-016` | 3 | MAIN | Central Reactor Core | `[FACTION STANDOFF: A vs B]` | `CHOICE-006` | `SC-017` |
| `SC-017` | 3 | MAIN | Core Control Panel | `[FINAL ACTION UNDER COLLAPSE]` | `CHOICE-007` | `SC-018` |
| `SC-018` | 3 | MAIN | The Point of Departure | `[ENDING EVALUATION HUB]` | `CHOICE-008` | Endings |
| `SC-019` | 4 | ENDING | Dawn Horizon | `[RESOLVE END-A: UNITED REVELATION]` | None | Complete |
| `SC-020` | 4 | ENDING | Transit Outpost | `[RESOLVE END-B: BITTERSWEET DEPARTURE]`| None | Complete |
| `SC-021` | 4 | ENDING | Containment Cell | `[RESOLVE END-C: TRAGIC ISOLATION]` | None | Complete |
| `SC-022` | 4 | ENDING | Barren Perimeter | `[RESOLVE END-D: SOLITARY ESCAPE]` | None | Complete |
| `SC-023` | 4 | ENDING | Core Archives Unlocked | `[RESOLVE END-SECRET: TOTAL TRUTH]` | None | Complete |

---

## # 10. INTERACTIVE CHOICE MAP

### `CHOICE-001`
* **Scene:** `SC-002` | **Type:** Relationship / Dialogue | **Importance:** Medium
* **Situation:** `[COMPANION A PROPOSES AN UNREGISTERED ENTRY ROUTE]`
* **Option A:** `[ACCEPT A's PLAN & CONFIDE CONCERNS]`
  * *Immediate:* trustA +10, courage +5
  * *Hidden:* flag `cooperated_at_gate = true`
  * *Next:* `SC-003`
* **Option B:** `[INSIST ON STANDARD PROTOCOL & QUESTION MOTIVE]`
  * *Immediate:* trustA -5, stress +5
  * *Hidden:* flag `questioned_A_early = true`
  * *Next:* `SC-003`

### `CHOICE-002`
* **Scene:** `SC-004` | **Type:** Investigation / Action | **Importance:** Medium
* **Situation:** `[SECURITY TERMINAL AND PRIVATE LOCKER BOTH DETECTED]`
* **Option A:** `[DOWNLOAD SYSTEM TELEMETRY FROM TERMINAL]`
  * *Immediate:* knowledge +15, timeTokens -1
  * *Unlocks:* `SC-005_OPT`
  * *Next:* `SC-005_OPT`
* **Option B:** `[PRY OPEN SECURED LOCKER]`
  * *Immediate:* courage +10, stress +10
  * *Hidden:* flag `found_encrypted_drive = true`
  * *Next:* `SC-006`

### `CHOICE-003`
* **Scene:** `SC-007` | **Type:** Moral / Dialogue | **Importance:** Major
* **Situation:** `[A ADMITS THEY WERE PRESENT ON THE NIGHT OF THE INCIDENT]`
* **Option A:** `[PROMISE PROTECTION REGARDLESS OF PAST ACTIONS]`
  * *Immediate:* trustA +20, affectionA +10
  * *Hidden:* flag `pledged_loyalty_to_A = true`
  * *Delayed:* Locks betrayal path in Act 3
  * *Next:* `SC-008`
* **Option B:** `[DEMAND OBJECTIVE ACCOUNT AND WITHHOLD COMMITMENT]`
  * *Immediate:* trustA -10, stress +10, knowledge +10
  * *Hidden:* flag `concealed_truth_from_A = true`
  * *Next:* `SC-008`

### `CHOICE-004`
* **Scene:** `SC-009` | **Type:** Action / Branch | **Importance:** Major
* **Situation:** `[RIVAL B'S PATROL APPROACHES INTERSECTION]`
* **Option A:** `[PULL A INTO SHADOW DUCT AND EVADE PATROL]`
  * *Immediate:* stress +15, trustA +10
  * *Branch:* Diverges to `SC-010A`
* **Option B:** `[STEP FORWARD TO PARLEY WITH RIVAL B DIRECTLY]`
  * *Immediate:* respectB +15, trustA -10
  * *Branch:* Diverges to `SC-010B`

### `CHOICE-005`
* **Scene:** `SC-013` | **Type:** Resource / Moral | **Importance:** Major
* **Situation:** `[FIREWALL COLLAPSE REQUIRES POWER EXPENDITURE]`
* **Option A:** `[BURN EMERGENCY BATTERY TO BYPASS CODE]`
  * *Immediate:* timeTokens -1, courage +10
  * *Hidden:* flag `flag_sacrificed_resource = true`
  * *Next:* `SC-014`
* **Option B:** `[FORCE MANUAL OVERRIDE AT RISK OF INJURY]`
  * *Immediate:* stress +25
  * *Hidden:* flag `injured_in_bypass = true`
  * *Next:* `SC-014`

### `CHOICE-006`
* **Scene:** `SC-016` | **Type:** Critical / Allegiance | **Importance:** Critical
* **Situation:** `[STANDOFF: B ORDERS A DETAINED; A PLEADS TO ACTIVATE PURGE]`
* **Option A:** `[SHIELD COMPANION A AND DEFY B]`
  * *Immediate:* trustA +30, respectB -30
  * *Requires:* `trustA >= 40`
  * *Routes to:* Ending A / Ending B pipeline
  * *Next:* `SC-017`
* **Option B:** `[SECURE TERMINAL AND DETAIN BOTH SIDES]`
  * *Immediate:* courage +20, stress +20
  * *Routes to:* Ending C / Ending D pipeline
  * *Next:* `SC-017`

### `CHOICE-007`
* **Scene:** `SC-017` | **Type:** Action / Crisis | **Importance:** Critical
* **Situation:** `[MELTDOWN INITIATED; DATA EXTRACTION OR EMERGENCY ESCAPE]`
* **Option A:** `[MAINTAIN UPLOAD UNTIL ENCRYPTION BREAKS]`
  * *Immediate:* knowledge +30, stress +30
  * *Hidden:* flag `full_data_extracted = true`
  * *Next:* `SC-018`
* **Option B:** `[SEVER CONNECTION AND TRIGGER EVACUATION HATCH]`
  * *Immediate:* courage -10, stress -20
  * *Hidden:* flag `evacuation_prioritized = true`
  * *Next:* `SC-018`

### `CHOICE-008`
* **Scene:** `SC-018` | **Type:** Ending Arbiter | **Importance:** Critical
* **Situation:** `[FINAL DOOR OPENS: EXECUTE CHOSEN OUTCOME]`
* **Option A:** `[COMMIT TO BROADCASTING UNFILTERED TRUTH]`
  * *Requires:* `knowledge >= 40`
  * *Next:* Ending Evaluation Router
* **Option B:** `[SEAL ARCHIVE FOREVER TO PREVENT WAR]`
  * *Requires:* Unconditional
  * *Next:* Ending Evaluation Router

---

## # 11. CHOICE IMPACT MATRIX

| Choice ID | Type | Imp. | Immediate Effect | Hidden Effect | Relationship | Flags Set | Scene Effect | Ending Influence |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `CHOICE-001` | Rel | MED | trustA +10, courage +5 | `cooperated_gate` | trustA +10 | `cooperated_at_gate` | None (Flavor) | Unlocks END-A eligibility |
| `CHOICE-002` | Inv | MED | knowledge +15 | `clue_found` | None | `searched_archive` | Unlocks `SC-005_OPT` | Informs secret route |
| `CHOICE-003` | Mor | MAJ | trustA +20, affect +10 | `loyalty_pledge` | trustA +20 | `pledged_loyalty_A` | Changes Ch 4 tone | Required for END-A |
| `CHOICE-004` | Act | MAJ | respectB +15 vs trustA | Divergent path | Split | `warned_rival_B` | Splits to 10A / 10B | Affects B's posture in Ch 6 |
| `CHOICE-005` | Res | MAJ | time -1 vs stress +25 | Resource state | None | `sacrificed_resource` | Skips puzzle failure | Enables secret chamber |
| `CHOICE-006` | Cri | CRI | trustA +30 vs respectB | Allegiance lock | Polarizing | `defied_rival_B` | Locks Act 4 faction | Diverges END-A/B from C/D |
| `CHOICE-007` | Act | CRI | knowledge +30 vs escape | Data retention | None | `full_data_extracted`| Influences epilogue | Prerequisite for True/Secret |
| `CHOICE-008` | Mor | CRI | Final ideological lock | Climax commit | None | `truth_broadcasted` | Direct ending trigger | Selects final ending node |

---

## # 12. BRANCH MAP

```text
                  START
                    │
                    ▼
                  SC-001
                    │
                    ▼
                  SC-002
                    │
               CHOICE-001
               /         \
              /           \
         Option A      Option B
        (Trust +10)   (Suspicion +5)
              \           /
               \         /
                    ▼
                  SC-003 (Convergence)
                    │
                    ▼
                  SC-004
                    │
               CHOICE-002
               /         \
              /           \
          Option A     Option B
        (Download)      (Pry)
             │            │
             ▼            │
         SC-005_OPT       │
             │            │
             └─────┬──────┘
                   ▼
                 SC-006
                   │
                   ▼
                 SC-007
                   │
              CHOICE-003
              /          \
             /            \
         Option A       Option B
       (Pledge Ally)   (Distrust)
             \            /
              \          /
                   ▼
                 SC-008
                   │
                   ▼
                 SC-009
                   │
              CHOICE-004
              /          \
             /            \
         Option A       Option B
         (Shadows)      (Parley)
            │              │
            ▼              ▼
         SC-010A        SC-010B
            │              │
            └──────┬───────┘
                   ▼
                 SC-011 (Convergence)
                   │
              ┌────┴────────┐
              │             ▼
              │        SC-012_OPT (If Clue Found)
              │             │
              └────┬────────┘
                   ▼
                 SC-013
                   │
              CHOICE-005
              /          \
             /            \
         Option A       Option B
         (Battery)      (Manual)
             \            /
              \          /
                   ▼
                 SC-014
                   │
              ┌────┴────────┐
              │             ▼
              │        SC-015_SEC (Secret Pre-reqs Met)
              │             │
              └────┬────────┘
                   ▼
                 SC-016
                   │
              CHOICE-006
              /          \
             /            \
         Option A       Option B
        (Shield A)     (Detain Both)
             │              │
             ▼              ▼
         SC-017A        SC-017B
             │              │
        CHOICE-007     CHOICE-007
             │              │
             └──────┬───────┘
                    ▼
                  SC-018 (Ending Evaluation)
              /     |     |     \     \
             /      |     |      \     \
            ▼       ▼     ▼       ▼     ▼
          END-A   END-B END-C   END-D  END-SECRET
```

---

## # 13. CHARACTER ARC MAP

### Protagonist Arc
* **Initial State:** Reactive, uninformed, vulnerable.
* **Catalyst (Ch 1):** Forced into unauthorized partnership with Companion A.
* **Midpoint Pressure (Ch 4):** Confronted with Rival B’s contradictory evidence.
* **Climax Pivot (Ch 7):** Must choose between self-preservation, loyalty to A, or public revelation.
* **Resolution:** Transforms into either a dedicated truth-bearer, pragmatic survivor, or compromised protector.

### Companion A Arc
* **Initial State:** Distant, defensive, guarding secrets.
* **Under Pressure:** Vulnerability surfaces when trapped in Sub-level (Ch 3).
* **High-Trust Outcome:** Confesses original mistake; sacrifices safety to aid Protagonist.
* **Low-Trust Outcome:** Retreats into deception; abandons Protagonist at climax to escape containment.

### Rival B Arc
* **Initial State:** Dogmatic enforcement officer.
* **Under Pressure:** Realizes the institution has been manipulating their orders.
* **High-Respect Outcome:** Provides covering fire during evacuation; permits escape.
* **Low-Respect Outcome:** Executes relentless lockdown; arrests survivors.

---

## # 14. INFORMATION / MYSTERY MAP

* **The Core Mystery:** What triggered the sector blackout and who authored the override code?
* **True State of Story World:** The sector was sabotaged by administration to bury experimental failure; Companion A was an unwitting courier, not the architect.
* **Known to Protagonist at Start:** Power failed; sector quarantined; A offered guidance.
* **Suspected Facts (Act 1):** Companion A is an infiltrator; Rival B is executing survivors.
* **False Beliefs:** Companion A designed the fatal override protocol.
* **Revealed Truth (Act 3):** Override was automated by central administration; A attempted to deactivate it.

---

## # 15. OPTIONAL CONTENT MAP

* **`SC-005_OPT` (Terminal Alcove):**
  * *Access Condition:* Choose Option A in `CHOICE-002`.
  * *Reward:* +15 Knowledge, unlocks additional dialogue branch with B in Ch 4.
* **`SC-012_OPT` (Server Core B):**
  * *Access Condition:* `knowledge >= 25` AND `timeTokens >= 1`.
  * *Reward:* Obtains cipher keycard required for Secret Chamber.

---

## # 16. SECRET ROUTES

* **Secret Scene: `SC-015_SEC` (The Cold Chamber)**
  * *Prerequisites:*
    1. `flag_searched_archive == true`
    2. Cipher keycard obtained in `SC-012_OPT`
    3. `trustA >= 50`
    4. `stress <= 40`
  * *Narrative Payoff:* Uncovers raw audio recording of the founding architect proving A's innocence and administration's guilt. Sets `flag_secret_route_eligible = true`.

---

## # 17. ENDING CONDITIONS

### `END-A` (The Shared Dawn)
* **Theme:** Mutual redemption & truth revealed.
* **Requirements:**
  * `trustA >= 60`
  * `flag_pledged_loyalty_to_A == true`
  * `flag_full_data_extracted == true`
* **Blocked By:** `flag_concealed_truth_from_A == true`

### `END-B` (The Bittersweet Departure)
* **Theme:** Survival achieved, but relationship broken.
* **Requirements:**
  * `trustA < 40`
  * `flag_full_data_extracted == true`
  * `flag_defied_rival_B == false`
* **Blocked By:** `pledged_loyalty_to_A == true`

### `END-C` (Institutional Containment)
* **Theme:** Safety prioritized over truth; system remains intact.
* **Requirements:**
  * `respectB >= 40`
  * `flag_full_data_extracted == false`
  * Choice Option B in `CHOICE-006`

### `END-D` (The Solitary Escape)
* **Theme:** Self-preservation above all; companions lost.
* **Requirements:**
  * `stress >= 60`
  * `flag_evacuation_prioritized == true`
  * `trustA < 30`

### `END-SECRET` (The Sovereign Truth)
* **Theme:** Total vindication and systemic overhaul.
* **Requirements:**
  * `flag_secret_route_eligible == true`
  * `trustA >= 70`
  * `respectB >= 30`
  * Option A in `CHOICE-008`

---

## # 18. ENDING DEPENDENCY MAP

| Ending ID | Critical Choices | Variable Thresholds | Mandatory Flags | Incompatible Flags |
| :--- | :--- | :--- | :--- | :--- |
| `END-A` | C-001A, C-003A, C-006A, C-007A | `trustA >= 60`, `courage >= 30` | `pledged_loyalty_A`, `full_data_extracted` | `concealed_truth_A` |
| `END-B` | C-001B, C-003B, C-006A, C-007A | `trustA < 40`, `knowledge >= 30`| `full_data_extracted` | `pledged_loyalty_A` |
| `END-C` | C-004B, C-006B, C-008B | `respectB >= 40` | `evacuation_prioritized` | `pledged_loyalty_A` |
| `END-D` | C-001B, C-005B, C-007B | `stress >= 50`, `trustA < 30` | None | `flag_secret_route_eligible` |
| `END-SECRET` | C-002A, C-003A, C-006A, C-007A | `trustA >= 70`, `knowledge >= 50`| `secret_route_eligible`, `full_data_extracted` | `injured_in_bypass` |

---

## # 19. REPLAY ROUTES

### Route 1 — "The Loyalist"
* Choices focused on defending Companion A at all costs (`CHOICE-001A`, `CHOICE-003A`, `CHOICE-006A`).
* *Experience:* High emotional intimacy, unlocks deep backstory of A, faces aggressive pursuit from B. Resolves to `END-A`.

### Route 2 — "The Pragmatic Investigator"
* Choices focused on protocol and institutional diplomacy (`CHOICE-001B`, `CHOICE-004B`, `CHOICE-006B`).
* *Experience:* Uncovers legal records, avoids physical damage, alienates A. Resolves to `END-C`.

### Route 3 — "The Solitary Sleuth"
* Focuses on self-preservation and data hoarding (`CHOICE-002B`, `CHOICE-003B`, `CHOICE-007B`).
* *Experience:* Maximum stress, minimum trust, escapes without resolving core conspiracy. Resolves to `END-D`.

### Route 4 — "The Master Completionist"
* Meticulously hunts optional clues (`SC-005_OPT`, `SC-012_OPT`) while balancing high trust with A and moderate respect with B. Resolves to `END-SECRET`.

---

## # 20. NARRATIVE STATE MACHINE

```text
[STATE_BOOT]
    │
    ▼ (Start Game)
[STATE_ACT_0_ARRIVAL]
    │
    ▼ (CHOICE-001: Resolve Stance)
[STATE_ACT_1_SEARCH]
    │
    ▼ (CHOICE-002: Evidence Focus)
[STATE_ACT_1_CONFRONTATION]
    │
    ▼ (CHOICE-003: Loyalty Pledge)
[STATE_ACT_2_PERIMETER]
    │
    ▼ (CHOICE-004: Evade vs Parley)
[STATE_ACT_2_JUNCTION]
    │
    ▼ (CHOICE-005: Power Dilemma)
[STATE_ACT_3_SANCTUM]
    │
    ▼ (CHOICE-006: Stand In Standoff)
[STATE_ACT_3_TERMINAL]
    │
    ▼ (CHOICE-007: Climax Action)
[STATE_ENDING_EVALUATION]
    ├──────────┬──────────┬──────────┬──────────┐
    ▼          ▼          ▼          ▼          ▼
[END_A]    [END_B]    [END_C]    [END_D]   [END_SECRET]
```

---

## # 21. STORY DEPENDENCY GRAPH

```text
SC-002 (Gate)
  └── [CHOICE-001A: trustA +10]
        └── SC-004 (Archive)
              └── [CHOICE-002A: knowledge +15]
                    └── SC-005_OPT (Alcove Clue)
                          └── SC-007 (Sub-level)
                                └── [CHOICE-003A: pledged_loyalty_A]
                                      └── SC-009 (Patrol)
                                            └── [CHOICE-004A: Shadow Route]
                                                  └── SC-012_OPT (Cipher Keycard)
                                                        └── SC-014 (Lift)
                                                              └── SC-015_SEC (Secret Sanctum)
                                                                    └── SC-018 (Climax)
                                                                          └── END-SECRET
```

---

## # 22. BRANCHING COMPLEXITY ANALYSIS

* **Total Acts:** 5
* **Total Chapters:** 8
* **Total Scenes:** 22
* **Interactive Choices:** 8 (All major/critical, zero filler questionnaires)
* **Maximum Branch Depth:** 2 (All major branches converge within 1–2 scenes)
* **Convergence Points:** 3 (`SC-003`, `SC-011`, `SC-018`)
* **Branching Risk Rating:** **LOW**. Impossible to trigger exponential state explosion.

---

## # 23. CONTINUITY CHECK

* [x] **Character Continuity:** Companion A cannot be present in `SC-010B` if `CHOICE-004B` is taken (they remain in shadows until convergence).
* [x] **Item Continuity:** Cipher keycard acquired in `SC-012_OPT` is strictly verified before `SC-015_SEC` can mount.
* [x] **Information Continuity:** Protagonist cannot accuse B in `SC-016` unless `knowledge >= 25` was gained from prior chapters.
* [x] **Time Continuity:** `timeTokens` decrement deterministically; expiration triggers blackout in Ch 5.
* [x] **Choice Continuity:** Locked options in `CHOICE-006` explicitly verify `trustA >= 40`.

---

## # 24. CHOICE QUALITY CHECK

1. **Informed Dilemmas:** Every choice scenario establishes clear immediate stakes before player inputs.
2. **Distinct Intentions:** Options clearly demarcate emotional intimacy, analytical detachment, or self-preservation.
3. **No Obvious "Correct" Answer:** Loyalty to A increases danger from B; cooperating with B protects physical safety but forfeits truth.
4. **Persistent Impact:** Choices made in Act 1 (`CHOICE-001`, `CHOICE-003`) remain active in the ending evaluation matrix in Act 4.

---

## # 25. NARRATIVE QA CHECKLIST

* [x] Every major choice has at least one permanent state or flag modification.
* [x] No branch creates an unrecoverable dead-end.
* [x] All 5 endings have reachable mathematical pathways.
* [x] Secret route requirements are discoverable via optional content exploration.
* [x] Branches converge where appropriate to prevent scope explosion.
* [x] Zero descriptive prose or final dialogue written (Phase is 100% architectural).

---

## # 26. IMPLEMENTATION-READY STORY BLUEPRINT (JSON SCHEMA MODEL)

```json
{
  "$schema": "./story.schema.json",
  "storyId": "blueprint_narrative_master",
  "title": "[PLACEHOLDER_TITLE: THE ZERO SECTOR]",
  "genre": "mystery",
  "parameters": {
    "scope": "medium",
    "totalActs": 5,
    "totalChapters": 8,
    "totalScenes": 22,
    "totalEndings": 5
  },
  "initialState": {
    "variables": {
      "courage": 20,
      "stress": 10,
      "knowledge": 0,
      "trustA": 20,
      "affectionA": 10,
      "respectB": 10,
      "timeTokens": 3
    },
    "flags": {
      "flag_searched_archive": false,
      "flag_concealed_truth_from_A": false,
      "flag_warned_rival_B": false,
      "flag_unlocked_hidden_vault": false,
      "flag_sacrificed_resource": false,
      "flag_confessed_feelings": false,
      "flag_secret_route_eligible": false
    }
  },
  "chapters": [
    { "id": "CH-01", "act": 0, "scenes": ["SC-001", "SC-002", "SC-003"] },
    { "id": "CH-02", "act": 1, "scenes": ["SC-004", "SC-005_OPT", "SC-006"] },
    { "id": "CH-03", "act": 1, "scenes": ["SC-007", "SC-008"] },
    { "id": "CH-04", "act": 2, "scenes": ["SC-009", "SC-010A", "SC-010B", "SC-011"] },
    { "id": "CH-05", "act": 2, "scenes": ["SC-012_OPT", "SC-013"] },
    { "id": "CH-06", "act": 3, "scenes": ["SC-014", "SC-015_SEC", "SC-016"] },
    { "id": "CH-07", "act": 3, "scenes": ["SC-017", "SC-018"] },
    { "id": "CH-08", "act": 4, "scenes": ["SC-019", "SC-020", "SC-021", "SC-022", "SC-023"] }
  ],
  "endings": [
    {
      "id": "END-A",
      "type": "true",
      "title": "[THE SHARED DAWN]",
      "requirements": {
        "and": [
          { "variable": "trustA", "operator": ">=", "value": 60 },
          { "flag": "flag_pledged_loyalty_to_A", "operator": "flagSet" },
          { "flag": "flag_full_data_extracted", "operator": "flagSet" }
        ],
        "not": { "flag": "flag_concealed_truth_from_A", "operator": "flagSet" }
      }
    },
    {
      "id": "END-B",
      "type": "bittersweet",
      "title": "[THE BITTERSWEET DEPARTURE]",
      "requirements": {
        "and": [
          { "variable": "trustA", "operator": "<", "value": 40 },
          { "flag": "flag_full_data_extracted", "operator": "flagSet" }
        ]
      }
    },
    {
      "id": "END-C",
      "type": "tragic",
      "title": "[INSTITUTIONAL CONTAINMENT]",
      "requirements": {
        "and": [
          { "variable": "respectB", "operator": ">=", "value": 40 },
          { "flag": "flag_full_data_extracted", "operator": "flagUnset" }
        ]
      }
    },
    {
      "id": "END-D",
      "type": "escape",
      "title": "[THE SOLITARY ESCAPE]",
      "requirements": {
        "and": [
          { "variable": "stress", "operator": ">=", "value": 60 },
          { "variable": "trustA", "operator": "<", "value": 30 }
        ]
      }
    },
    {
      "id": "END-SECRET",
      "type": "secret",
      "title": "[THE SOVEREIGN TRUTH]",
      "requirements": {
        "and": [
          { "flag": "flag_secret_route_eligible", "operator": "flagSet" },
          { "variable": "trustA", "operator": ">=", "value": 70 },
          { "variable": "knowledge", "operator": ">=", "value": 50 }
        ]
      }
    }
  ]
}
```
