# Asset Pipeline & Procedural Fallbacks

## 1. Asset Strategy
The engine utilizes a hybrid approach:
1. **Procedural Vector Shaders & Canvas FX**: Procedural fallback layers render weather, lighting, atmospheric backgrounds, and character silhouettes instantly with 0KB external network dependencies.
2. **External Image & Audio Assets**: High-resolution raster images, sprite sheets, or audio files can be linked directly via URLs or local public directories (`/assets/`).

## 2. Character & Background Assets
* **Backgrounds**: Can be static raster images (`.webp`, `.png`, `.jpg`), SVGs, or procedural canvases.
* **Characters**:
  - Transparent PNG/WebP sprites placed on 2.5D planes.
  - Sized for mobile portrait viewports (`360px` to `430px` width).
  - Positions: `left`, `center`, `right`, `foreground`, `background`.

## 3. Web Audio Synthesis Pipeline
Audio is managed by `audioService.ts`:
* Zero-bandwidth procedural synthesis via Web Audio API:
  - **Pink Noise Rain**: Filtered pink noise + stereo biquad filter.
  - **Lo-fi Electric Piano**: Sine/triangle FM synth chords.
  - **Dark Drone**: Dual detuned sawtooth waves with lowpass envelope.
  - **Cyber Synthwave**: Pulse wave bass with resonant filter.
  - **SFX**: Chimes, clicks, heartbeats, glitches synthesized on demand.
* External Audio Support: Can load `.mp3`, `.ogg`, or `.wav` streams when specified.
