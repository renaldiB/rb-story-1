# Architecture Overview

## 1. Core Principle
> **"The engine should know how to render a story. It should not know what the story is about."**

The Interactive Story Engine is a theme-agnostic narrative runtime decoupled from specific genres, themes, or UI representations. Every scene, dialogue line, choice, character reaction, audio cue, and visual styling is driven purely by structured JSON or TypeScript data.

```
                    ┌────────────────────────┐
                    │     Story Document     │
                    │      (JSON / TS)       │
                    └───────────┬────────────┘
                                │ (Zod validation)
                                ▼
                    ┌────────────────────────┐
                    │      StoryEngine       │
                    │        (Facade)        │
                    └───────────┬────────────┘
       ┌──────────────┬─────────┴───────┬──────────────┐
       ▼              ▼                 ▼              ▼
┌──────────────┐┌──────────────┐┌──────────────┐┌──────────────┐
│Condition     ││Variable      ││Choice        ││Timeline      │
│Engine        ││Engine        ││Engine        ││Engine        │
└──────────────┘└──────────────┘└──────────────┘└──────────────┘
       ▲              ▲                 ▲              ▲
       └──────────────┴─────────┬───────┴──────────────┘
                                │
                    ┌───────────▼────────────┐
                    │   StoryStateMachine    │
                    │   (FSM: BOOT -> READY  │
                    │    -> PLAYING -> ...)  │
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │    Reactive Stores     │
                    │   (Zustand / Events)   │
                    └───────────┬────────────┘
                                │
                    ┌───────────▼────────────┐
                    │       UI / Stage       │
                    │   (Mobile 2.5D View)   │
                    └────────────────────────┘
```

## 2. Directory Structure

```
src/
├── core/
│   ├── engine/
│   │   ├── ConditionEngine.ts   # Compound & atomic condition evaluator
│   │   ├── VariableEngine.ts    # State mutation, deltas, and action runner
│   │   ├── ChoiceEngine.ts      # Conditional choice filter
│   │   ├── TimelineEngine.ts    # Scene sub-beat dialogue stepper
│   │   ├── EndingResolver.ts    # Ending resolution matching state
│   │   ├── NarrativeEngine.ts   # Core narrative state and flow
│   │   └── StoryEngine.ts       # Unified facade
│   ├── schema/
│   │   └── story.schema.ts      # Zod validation schemas
│   ├── serialization/
│   │   └── SaveSerializer.ts    # Versioned save serializer with checksum
│   ├── state-machine/
│   │   └── StoryStateMachine.ts # Explicit lifecycle FSM
│   └── state/
│       ├── storyStore.ts        # Zustand runtime game store
│       ├── uiStore.ts           # Modal & interface state
│       ├── audioStore.ts        # Procedural & sample audio state
│       └── settingsStore.ts     # Accessibility & playback options
├── components/                  # Layered presentation components
├── data/                        # Story catalog and authoring data
└── services/                    # Web Audio synth & procedural visual shaders
```

## 3. Finite State Machine (FSM)

The runtime lifecycle is enforced strictly by `StoryStateMachine`:
* `BOOT`: Engine initializing.
* `LOADING`: Assets, audio profiles, or documents loading.
* `READY`: Story validated and loaded into memory.
* `PLAYING`: Active scene presentation.
* `DIALOGUE`: Advancing through speech/narration beats.
* `CHOICE`: Waiting for player decision.
* `TRANSITIONING`: Camera and atmosphere crossfade.
* `PAUSED`: User opened settings or history.
* `ENDING`: Reached conclusive scene and ending resolution.
* `ERROR`: Schema or invariant violation.

Any illegal transition (e.g. `ENDING` to `PLAYING` without resetting) is rejected with an explicit error.

## 4. Deterministic State & Serialization

All story progression is a pure function of:
1. `StoryDocument` (immutable content graph)
2. `StoryState` (variables, flags, history, current scene)
3. Player choices / inputs

`SaveSerializer` produces format v2 JSON snapshots with integrity checksums and backward-compatible migration paths from v1 formats.
