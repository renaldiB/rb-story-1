# BASELINE ASSET IMPLEMENTATION & RUNTIME INTEGRATION

**Project:** 2 HOURS APART  
**Status:** Canonical Baseline Active  
**Engine:** TypeScript / React 19 Interactive Engine  
**Date:** 2026-10-03  

---

## 1. Executive Summary

This document specifies the canonical implementation connecting baseline WebP visual assets to the runtime story engine. In adherence with the Asset Bible and Performance Budget rules, the engine utilizes a dual-tier responsive asset strategy (`production/` for desktop and `mobile/` for mobile viewports), backed by procedural SVG fallback and master JPEG archives.

Zero new raster images were generated for this baseline; all runtime scenes leverage audited, verified visual assets existing on disk.

---

## 2. Directory Architecture & Single Source of Truth

Visual assets are organized into canonical storage tiers under `public/assets/stories/two-hours-apart/`:

```
public/assets/stories/two-hours-apart/
├── characters/                       # Active character masters (char_nana_master.jpg, char_agus_master.jpg)
├── environments/                     # Active environment masters (.jpg, .webp)
├── masters/                          # Immutable uncompressed master archives (100% locked)
│   ├── characters/
│   └── environments/
├── production/                       # High-fidelity WebP for Desktop (1080p+, q=80)
│   ├── characters/
│   └── environments/
└── mobile/                           # Compressed WebP for Mobile Viewports (720p/portrait, q=72)
    ├── characters/
    └── environments/
```

### Locked Master Assets
- `char_nana_master.jpg` (796 KB): Canonical locked reference for Nana (Age 24).
- `char_agus_master.jpg` (657 KB): Canonical locked reference for Agus (Age 24).

---

## 3. Runtime Manifest & Resolution

The manifest and runtime resolver are defined in [`src/data/assets/assetManifest.ts`](./src/data/assets/assetManifest.ts).

### 3.1 Asset Definition Schema
```typescript
export interface AssetDefinition {
  id: string;
  type: AssetType;
  path?: string;
  production?: string;
  mobile?: string;
  variants?: string[];
  priority: AssetPriority;
  preload?: boolean;
  lazy?: boolean;
  reusable?: boolean;
  scenes?: string[];
  metadata?: {
    characterId?: string;
    environmentId?: string;
    timeOfDay?: string;
    weather?: string;
    aspectRatio?: string;
    description?: string;
  };
}
```

### 3.2 Dynamic Environment Resolver (`resolveEnvironmentAsset`)
Maps story scene location strings and time-of-day tokens to concrete responsive WebP paths:
- **Campus (Midday/Afternoon):** `production/environments/env_campus_midday.webp` / `mobile/environments/env_campus_midday.webp`
- **Campus (Dusk/Sunset/Night):** `production/environments/env_campus_dusk.webp` / `mobile/environments/env_campus_dusk.webp`
- **Campus Cafe:** `production/environments/env_campus_cafe.webp` / `mobile/environments/env_campus_cafe.webp`
- **Nana's Bedroom:** `production/environments/env_nana_bedroom.webp` / `mobile/environments/env_nana_bedroom.webp`
- **Agus's Room:** `production/environments/env_agus_room.webp` / `mobile/environments/env_agus_room.webp`
- **Office / Studio:** `production/environments/env_office_afternoon.webp` / `mobile/environments/env_office_afternoon.webp`

---

## 4. Responsive Rendering Pipeline

Runtime rendering is executed in [`src/services/visualService.tsx`](./src/services/visualService.tsx) via the `BackgroundArt` component.

### 4.1 Native HTML `<picture>` Strategy
To eliminate redundant downloads and minimize mobile data usage:
```tsx
<picture className="w-full h-full">
  <source
    media="(max-width: 640px)"
    srcSet={assetPaths.mobile}
    type="image/webp"
  />
  <source
    media="(min-width: 641px)"
    srcSet={assetPaths.production}
    type="image/webp"
  />
  <img
    src={assetPaths.production || assetPaths.fallback}
    alt={label}
    className="w-full h-full object-cover"
    loading="lazy"
    decoding="async"
    onError={handleImageError}
  />
</picture>
```

### 4.2 Graceful Fallback
If an asset is missing or fails network transfer:
1. `onError` intercepts the error and flags `imageError = true`.
2. Emits `console.warn('[visualService] Falling back to procedural background for: ...')`.
3. Seamlessly renders procedural CSS/SVG background corresponding to the time of day and setting.

---

## 5. Verified Baseline Scenes

The following 7 baseline scenes have been verified with complete end-to-end asset resolution:

| Scene ID | Scene Title / Setting | Resolved Production WebP | Resolved Mobile WebP | Character Sprites Active | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **SC-01** | Campus Courtyard (Midday) | `env_campus_midday.webp` (197.9 KB) | `env_campus_midday.webp` (92.5 KB) | Nana (`char_nana_master.webp`), Agus (`char_agus_master.webp`) | **VERIFIED** |
| **SC-03** | Campus Courtyard (Dusk) | `env_campus_dusk.webp` (167.5 KB) | `env_campus_dusk.webp` (75.9 KB) | Nana (`char_nana_master.webp`) | **VERIFIED** |
| **SC-06** | Campus Cafe | `env_campus_cafe.webp` (132.3 KB) | `env_campus_cafe.webp` (62.4 KB) | Nana (`char_nana_master.webp`), Agus (`char_agus_master.webp`) | **VERIFIED** |
| **SC-07** | Nana's Bedroom (Night) | `env_nana_bedroom.webp` (106.6 KB) | `env_nana_bedroom.webp` (49.6 KB) | Nana (`char_nana_master.webp`) | **VERIFIED** |
| **SC-08** | Agus's Room (Night) | `env_agus_room.webp` (89.6 KB) | `env_agus_room.webp` (42.7 KB) | Agus (`char_agus_master.webp`) | **VERIFIED** |
| **SC-20** | Design Office (Afternoon) | `env_office_afternoon.webp` (162.0 KB) | `env_office_afternoon.webp` (74.5 KB) | Nana (`char_nana_master.webp`) | **VERIFIED** |
| **SC-38** | Campus Reunion Courtyard | `env_campus_dusk.webp` (167.5 KB) | `env_campus_dusk.webp` (75.9 KB) | Nana (`char_nana_master.webp`) | **VERIFIED** |

---

## 6. Blocked / Pending Scenes

Scenes requiring assets not yet generated are deferred until explicit generation phase approval:
- **SC-02, SC-04, SC-05:** Station / train platform scenes (`env_station`, `prop_train_ticket`).
- **SC-12, SC-15:** Secondary character interactions (Kaka, Dita, Bimo, Fikri, Maya).
- **SC-28 to SC-35:** Specialized ending environments (Jakarta high-rise, mountain trip, coastal beach, airport arrival).
- **Ending CGs:** CG01 to CG05 (Full illustrations for Endings A, B, C, D, and Secret Route).

*Note: All blocked scenes fall back safely to procedural visual generators without throwing runtime exceptions or crashing the game.*

---

## 7. Current Limitations & Technical Roadmap

1. **Character Layers:** Currently characters reference the master visual sheet. Future phases will isolate transparent WebP cutouts per expression variant (`smile`, `pensive`, `phone_call`).
2. **Preload Strategy:** Core prologue assets (`char_nana`, `char_agus`, `env_campus_midday`) are preloaded on engine boot; chapter 2+ assets are lazily prefetched on choice selection.
