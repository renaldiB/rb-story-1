# ASSET PERFORMANCE AUDIT REPORT

**Project:** 2 HOURS APART  
**Date:** 2026-10-02  
**Performance Budget Standard:**
- Mobile Initial Load: `< 1.8 MB` total assets
- Max Background Asset Size: `< 120 KB` (WebP / AVIF)
- Max Character Sprite Size: `< 90 KB` (WebP / alpha PNG)
- Target Frame Rate: Sustained 60 FPS on mid-tier mobile

---

## 1. ASSET INVENTORY & AUDIT TABLE

| Asset | Current Size | Current Format | Usage | Problem | Recommended Format | Recommended Resolution | Priority |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `char_nana_master.jpg` | 796 KB | JPEG (Master) | Nana reference & sprite sheet | Raw uncompressed generation output; exceeds 90 KB sprite budget | WebP (Production) + Keep Master | 720 × 960 (Desktop) / 480 × 640 (Mobile) | **HIGH** |
| `char_agus_master.jpg` | 657 KB | JPEG (Master) | Agus reference & sprite sheet | Raw master output; exceeds 90 KB budget | WebP (Production) + Keep Master | 720 × 960 (Desktop) / 480 × 640 (Mobile) | **HIGH** |
| `env_nana_bedroom.jpg` | 869 KB | JPEG (Master) | Act 2 & Act 3 Primary Scene BG | 869 KB exceeds 120 KB background budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `env_agus_room.jpg` | 796 KB | JPEG (Master) | Act 2 & Act 4 Scene BG | 796 KB exceeds 120 KB budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `env_campus_cafe.jpg` | 929 KB | JPEG (Master) | Act 1 & Ending C/E Scene BG | 929 KB exceeds 120 KB budget | WebP (82% quality) | 1920 × 1080 (Desktop) / 1080 × 720 (Mobile) | **HIGH** |
| `hero.png` | 13 KB | PNG | Landing splash icon | None (Within budget) | PNG / WebP | 512 × 512 | LOW |
| `icons.svg` | 5 KB | SVG Vector | UI icons | None (Extremely lightweight, scalable) | SVG | Vector | PASS |
| `favicon.svg` | 9.5 KB | SVG Vector | Browser tab favicon | None | SVG | Vector | PASS |

---

## 2. DERIVATIVE GENERATION STRATEGY (MASTER → PRODUCTION → MOBILE)

To adhere to the non-destructive Ponytail principle:
1. **Never delete master JPEGs:** Preserve all original generation files under `public/assets/stories/two-hours-apart/masters/` as uncompressed sources of truth.
2. **Production Pipeline WebP Derivatives:**
   - Backgrounds: WebP at 80% quality -> shrinks from ~850 KB to ~95 KB (an 89% reduction with imperceptible visual loss).
   - Sprites: Clean alpha channel cutout with WebP lossless/near-lossless -> target `< 85 KB`.
3. **Responsive Image Loading (`<picture>` / `srcset`):**
   ```html
   <picture>
     <source media="(max-width: 640px)" srcset="env_nana_bedroom_mobile.webp" type="image/webp" />
     <source media="(min-width: 641px)" srcset="env_nana_bedroom_desktop.webp" type="image/webp" />
     <img src="env_nana_bedroom.jpg" loading="lazy" decoding="async" alt="Nana's Bedroom" />
   </picture>
   ```

---

## 3. ASSET PIPELINE MEMORY & STREAMING RECOMMENDATIONS
1. **Sliding Window Preload:** `AssetManager.ts` already enforces an LRU cache with a 20-asset ceiling. Maintain this threshold to avoid GPU texture thrashing.
2. **Decode Asynchronously:** Always invoke `img.decoding = 'async'` on dynamic image loads to prevent main thread frame hitching during scene transitions.
3. **Zero Global Eager Loading:** Only `char_nana`, `char_agus`, and `env_campus_cafe` are preloaded on game boot. All other environments and props stream on-demand as scene transitions trigger.
