# Universal Interactive Storybook Web
### Theme-Agnostic Interactive Narrative Design System

A dynamic interactive visual storybook and cinematic narrative engine that supports **ANY genre, setting, mood, age group, art direction, and visual style** while maintaining a unified, mobile-first architecture.

---

## 🌟 Core System Pillars

1. **Universal Depth & 2.5D Layering System**:
   - Layer 0: Background
   - Layer 1: Distant Environment
   - Layer 2: Midground
   - Layer 3: Characters (active speaker contrast emphasis, multi-expression state machine)
   - Layer 4: Interactive & Foreshadowed Objects
   - Layer 5: Foreground
   - Layer 6: Atmospheric Effects (procedural canvas rain, eerie fog, cyber glitch particles, celestial motes)
   - Layer 7: Virtual Camera & Lighting (slow push, drift, shock shake, dynamic vignette)
   - Layer 8: Story UI (minimalist, theme-adaptive)

2. **Persistent Visual Bible**:
   - Defines `artStyle`, `renderStyle`, `colorLanguage`, `lightingLanguage`, `cameraLanguage`, `particleLanguage`, `shadowLanguage`, `uiLanguage`, and `soundLanguage`.
   - Never randomly changes identity between scenes; scene-level variations respect the established story bible.

3. **Dynamic Theme Engine (`themeEngine.ts`)**:
   - Computes real-time CSS variables, lighting contrast, vignette opacity, camera transforms, and UI tokens from `genre`, `mood`, and `emotionalIntensity` (0.0 to 1.0).

4. **Multi-Genre Showcase Catalog (`multiStoryCatalog.ts`)**:
   - **Romance / Slice of Life**: *Until the Rain Clears* (warm amber lighting, soft rain/bokeh, intimate slow-push camera, lo-fi chords, smartphone diegetic UI).
   - **Horror / Supernatural**: *The Whispering Ward* (abandoned psychiatric asylum, cold green-charcoal palette, emergency red lamp flicker, camera shake/twitch, ominous sub-drone, cassette recorder diegetic UI).
   - **Cyberpunk / Sci-Fi**: *Neon Protocol: Sector 9* (rain-slicked neon skyscrapers, cyan/magenta glitch particles, synthetic bass arpeggios, encrypted datapad terminal diegetic UI).
   - **Fantasy / Fairy Tale**: *The Starlight Archive* (zero-gravity celestial library, glowing astrolabe, celestial chimes, ancient grimoire diegetic UI).

5. **Diegetic In-World UI (`DiegeticInterface.tsx`)**:
   - Supports in-world narrative objects:
     - Smartphone chat/call log (Romance)
     - Medical cassette recorder transcript (Horror)
     - Neural datapad terminal (Cyberpunk)
     - Astral illuminated grimoire (Fantasy)

6. **Multi-Dimensional Relationship & State Engine**:
   - Multi-dimensional metrics: `trust`, `affection`, `suspicion`, `fear`, `respect`, `intimacy`.
   - World state, knowledge state, and converging branching architecture.

7. **Procedural Web Audio Synthesizer**:
   - 100% offline procedural Web Audio API synth generating rain ambience, sub-bass horror drones, cyber synthwave arpeggios, celestial chimes, heartbeat pulses, and silence mode without external MP3 dependencies.

---

## 🚀 Commands

```bash
# Start development server
npm run dev

# Run unit tests (Node.js native test runner)
npm test

# Run linter (oxlint)
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```
