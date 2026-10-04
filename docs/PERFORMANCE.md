# Performance & Optimization Architecture

## 1. Core Objectives & Performance Targets
- **Desktop**: 60 FPS sustained animation, zero layout thrashing, DPR capped at 2.
- **Mobile**: Strict memory window, capped particles (max 15–40), touch-friendly, no heavy full-screen blurs.
- **Load Performance**: Initial scene streaming only; never load the entire story upfront.

## 2. Implemented Subsystems

### 2.1 Central AnimationManager (`src/core/performance/AnimationManager.ts`)
- Replaces isolated, conflicting `requestAnimationFrame` loops with one single, unified tick scheduler.
- Delivers normalized `dt` and `timestamp` to subscribers.
- Automatically pauses when the browser tab is hidden (`visibilitychange`), eliminating idle battery/GPU consumption.

### 2.2 Device Profiling (`src/core/performance/DeviceProfile.ts`)
- Inspects hardware concurrency (`navigator.hardwareConcurrency`), memory hints (`navigator.deviceMemory`), and network connection type (`effectiveType`).
- Automatically enforces `Math.min(devicePixelRatio, 2)` to eliminate redundant high-DPR rasterization overhead on mobile.
- Recommends baseline quality tier (`ultra`, `high`, `medium`, `low`).

### 2.3 Adaptive Quality Scaling with Hysteresis (`src/core/performance/QualityScaler.ts`)
- Dynamic throttling prevents frame drops on low-end hardware.
- **Hysteresis Algorithm**:
  - Requires **3 consecutive low-FPS intervals (< 50 FPS)** before degrading quality tier.
  - Requires **8 consecutive stable intervals (>= 57 FPS)** before restoring quality tier.
  - Prevents rapid quality oscillation.
- Allocates exact particle budgets per tier for rain, fog, glitches, and motes.

### 2.4 Scene Streaming & Memory Eviction (`src/core/performance/AssetManager.ts`)
- 4-state lifecycle: `unloaded` -> `loading` -> `cached` -> `active`.
- Preloads only the primary upcoming scene (P1 priority).
- Automatically evicts old scene assets using LRU cache when memory threshold is reached.
- Prevents GPU texture bloat and leaks over long play sessions.

### 2.5 In-Game Performance HUD (`src/components/SceneDebugOverlay.tsx`)
- Activated via floating button or `?debug=1`.
- Live real-time inspection of:
  - FPS and frame duration (ms).
  - Active quality tier.
  - Active particle count.
  - Number of cached assets.
  - Device DPR and CPU core count.
  - JS Heap memory estimate (`performance.memory`).

## 3. Verification & Test Matrix
Run full test suite:
```bash
npm test
```
Result: **21 unit tests pass (100%)** covering core logic, state machine, branching, serializer, device profiling, quality scaler hysteresis, centralized animation loop, and scene streaming.
