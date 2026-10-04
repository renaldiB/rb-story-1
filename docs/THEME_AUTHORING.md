# Theme & Visual Bible Authoring

## 1. Theme-Agnostic Philosophy
The engine renders all visuals dynamically through a **Visual Bible** and theme tokens. A theme modifies parameters, not code.

```typescript
export interface VisualBible {
  artStyle: string;
  renderStyle: string;
  colorLanguage: string;
  lightingLanguage: string;
  cameraLanguage: 'slow_push' | 'drift' | 'shake' | 'static' | 'dynamic';
  particleLanguage: 'rain' | 'motes' | 'fog' | 'glitch' | 'sparks' | 'none';
  uiLanguage: 'minimal_warm' | 'dark_grit' | 'neon_hud' | 'parchment';
  soundLanguage: 'intimate_lofi' | 'dark_drone' | 'synthwave' | 'celestial';
}
```

## 2. Dynamic Atmosphere Tokens
Theme tokens are computed dynamically via `computeThemeTokens(genre, mood, intensity, visualBible, cameraAction)`:
* **Background Gradient**: Blends sky, horizon, and floor lighting depending on time of day and mood.
* **Camera Transform**: Applies 2.5D depth movement:
  - `slow_push`: `scale(1.04) translateY(-1%)`
  - `drift`: `scale(1.02) translateX(1%)`
  - `shake`: `translate(-2px, 1px)`
* **Vignette & Lighting Overlay**: Radial gradient masks with intensity-based opacity.
* **UI Palette**:
  - `minimal_warm`: Rose/amber hues, soft rounded borders, translucent cards.
  - `dark_grit`: Grayscale/emerald tint, sharp borders, high-contrast text.
  - `neon_hud`: Cyan/fuchsia glow, tech borders, monospaced accents.
  - `parchment`: Gold/sepia borders, serif typography, warm shadows.

## 3. Adding a New Genre Theme
To add a new genre:
1. Define the genre key in `src/types/story.ts` and `src/core/schema/story.schema.ts`.
2. Configure genre defaults in `src/engine/themeEngine.ts`.
3. Set the `visualBible` in your story document.
4. The engine automatically adapts rendering, particles, audio presets, and typography.
