# 2D ASSET PRODUCTION PLAN
## Interactive Web Story Engine v1
**Story:** Two Hours Apart (`two_hours_apart`)
**Theme:** Romance Rain (`romance_rain`)
**Engine Status:** FROZEN & PRODUCTION READY (Zero Engine Modifications)
**Architecture:** Modular 2.5D Mobile-First Reusable Asset Pipeline

---

## 1. PRODUCTION PLAN OVERVIEW

| Category | Asset Count | Dimensions | Format | Alpha | Parallax | Priority | Status |
|---|---|---|---|---|---|---|---|
| **Environment Tilesets** | 26 | 256x256 | PNG + WebP | RGBA | 0.20 - 0.50 | P0 / P1 | APPROVED |
| **Environment Sprite Sheets** | 2 | 1024x1024 | PNG + WebP | RGBA | 0.35 - 0.60 | P0 | APPROVED |
| **Character Sprite Sheets** | 25 | 1024x1536/frame | PNG + WebP | RGBA | 0.00 (Anchor Y=1460) | P0 | APPROVED |
| **Prop Sheets & Atlases** | 3 | 1024x1024 | PNG + WebP | RGBA | 0.00 (Anchored) | P0 | APPROVED |
| **Atmospheric FX Assets** | 6 | 1024x1024 & Standalone | PNG + WebP | RGBA | 0.10 - 0.70 | P0 | APPROVED |
| **UI & Diegetic Sheets** | 3 | 1024x1024 & 9-Slice | PNG + WebP | RGBA | Fixed Screen | P0 | APPROVED |
| **TOTAL MODULAR ASSETS** | **65** | Multi-res | Dual Export | RGBA | Multi-layer | Core | **APPROVED** |

---

## 2. MODULAR ASSET SPECIFICATION CATALOG

### A. ENVIRONMENT TILESETS (26 ASSETS)

#### ASSET: `env_cafe_floor_center`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** Yes (0px Boundary Delta Verified)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_edge_top`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_edge_bottom`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_edge_left`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_edge_right`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_corner_tl`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_corner_tr`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_corner_bl`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_floor_corner_br`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_wall_center`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** Yes (0px Boundary Delta Verified)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_wall_top`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_wall_bottom`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_window_piece`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_cafe_door_frame`
- **Category:** interior_wood_cafe
- **Description:** Modular 256x256 tile component for interior wood cafe. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch1_intro_1, ch1_nadia_enters, ch1_dialogue_1, ch1_sit_down, ch3_ticket_revelation
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all interior_wood_cafe chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_pavement_center`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** Yes (0px Boundary Delta Verified)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_curb_top`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_curb_bottom`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_curb_left`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_curb_right`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_corner_tl`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_corner_tr`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_corner_bl`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_corner_br`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_asphalt_road`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Midground / Ground Floor (Z: 10-25)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.40 (Midground Ground Plane)
- **Seamless Repetition:** Yes (0px Boundary Delta Verified)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_tactile_paving`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

#### ASSET: `env_sidewalk_storm_drain`
- **Category:** exterior_urban_sidewalk
- **Description:** Modular 256x256 tile component for exterior urban sidewalk. Seamless border continuity and anti-aliased edge masking.
- **Scene Usage:** ch2_street_dialogue, ch2_lean_closer, ch2_bus_stop, ch4_station_climax, ending_true_scene
- **Layer:** Environment Background / Wall (Z: 5-15)
- **Dimensions:** 256x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (RGBA)
- **Animation:** Static Modular Tile
- **Frame Count:** 1
- **Anchor:** Top-Left (0.0, 0.0)
- **Parallax:** 0.20 (Background Surface)
- **Seamless Repetition:** No (Edge / Corner Transition)
- **Reuse Potential:** Extreme (Reusable across all exterior_urban_sidewalk chapters & future stories)
- **Priority:** P0 (Core Visual Foundation)
- **Generation Status:** GENERATED
- **QA Status:** PASS (0px Boundary Seam Delta, Clean Alpha, Lossless Compression)

### B. ENVIRONMENT SPRITE SHEETS (2 ASSETS)

#### ASSET: `env_street_fixtures_sheet`
- **Category:** ENVIRONMENT_SPRITE_SHEET
- **Description:** Env Street Fixtures Sheet. Packed modular fixtures for dynamic scene dressing.
- **Scene Usage:** ch2_street_dialogue through ch2_bus_stop, ch4_station_climax
- **Layer:** Environment Midground & Foreground Props (Z: 30-50)
- **Dimensions:** 1024x1024 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Anti-aliased silhouette)
- **Animation:** Modular Fixture Atlas (4 sub-props)
- **Frame Count:** 4
- **Anchor:** Bottom-Center (0.50, 0.95)
- **Parallax:** 0.35 - 0.50
- **Reuse Potential:** High (Universal architectural fixtures)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Zero Boundary Bleed, Dialogue Safe Zone Compliant)

#### ASSET: `env_cafe_furniture_sheet`
- **Category:** ENVIRONMENT_SPRITE_SHEET
- **Description:** Env Cafe Furniture Sheet. Packed modular fixtures for dynamic scene dressing.
- **Scene Usage:** ch1_intro_1 through ch1_closing, ch3_polaroid_dialogue
- **Layer:** Environment Midground & Foreground Props (Z: 30-50)
- **Dimensions:** 1024x1024 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Anti-aliased silhouette)
- **Animation:** Modular Fixture Atlas (4 sub-props)
- **Frame Count:** 4
- **Anchor:** Bottom-Center (0.50, 0.95)
- **Parallax:** 0.35 - 0.50
- **Reuse Potential:** High (Universal architectural fixtures)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Zero Boundary Bleed, Dialogue Safe Zone Compliant)

### C. CHARACTER SPRITE SHEETS (25 ASSETS)

#### ASSET: `char_nana_idle_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SPRITE_SHEET)
- **Description:** char_nana_idle_sheet for NANA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All 23 Nadia/Nana active romance scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x1536 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (4 frames)
- **Frame Count:** 4
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_nana_emotion_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SPRITE_SHEET)
- **Description:** char_nana_emotion_sheet for NANA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All 23 Nadia/Nana active romance scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x1536 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (4 frames)
- **Frame Count:** 4
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_agus_idle_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SPRITE_SHEET)
- **Description:** char_agus_idle_sheet for AGUS. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All Agus active perspective scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x1536 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (4 frames)
- **Frame Count:** 4
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_agus_emotion_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SPRITE_SHEET)
- **Description:** char_agus_emotion_sheet for AGUS. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All Agus active perspective scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x1536 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (4 frames)
- **Frame Count:** 4
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_kaka_reaction_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SPRITE_SHEET)
- **Description:** char_kaka_reaction_sheet for KAKA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (KAKA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x1536 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (4 frames)
- **Frame Count:** 4
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_nana_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Nana Moods Sheet for NANA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All 23 Nadia/Nana active romance scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_nana_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Nana Situations Sheet for NANA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All 23 Nadia/Nana active romance scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_agus_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Agus Moods Sheet for AGUS. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All Agus active perspective scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_agus_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Agus Situations Sheet for AGUS. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** All Agus active perspective scenes
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_kaka_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Kaka Moods Sheet for KAKA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (KAKA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_kaka_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Kaka Situations Sheet for KAKA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (KAKA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_raka_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Raka Moods Sheet for RAKA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (RAKA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_raka_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Raka Situations Sheet for RAKA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (RAKA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_dita_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Dita Moods Sheet for DITA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (DITA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_dita_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Dita Situations Sheet for DITA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (DITA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_fikri_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Fikri Moods Sheet for FIKRI. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (FIKRI)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_fikri_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Fikri Situations Sheet for FIKRI. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (FIKRI)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_maya_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Maya Moods Sheet for MAYA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (MAYA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_maya_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Maya Situations Sheet for MAYA. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (MAYA)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_bimo_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Bimo Moods Sheet for BIMO. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (BIMO)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_bimo_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Bimo Situations Sheet for BIMO. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (BIMO)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_ibu_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Ibu Moods Sheet for IBU. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (IBU)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_ibu_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Ibu Situations Sheet for IBU. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (IBU)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_ayah_moods_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (MOODS)
- **Description:** Ayah Moods Sheet for AYAH. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (AYAH)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 4096x4608 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (12 frames)
- **Frame Count:** 12
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

#### ASSET: `char_ayah_situations_sheet`
- **Category:** CHARACTER_SPRITE_SHEET (SITUATIONS)
- **Description:** Ayah Situations Sheet for AYAH. Uniform 1024x1536 resolution with invariant baseline.
- **Scene Usage:** Secondary Character Ensemble & Branching Scenes (AYAH)
- **Layer:** Character Plane (Z: 40-60)
- **Dimensions:** 1024x1536 per frame (Total Sheet: 3072x3072 px)
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Precise contour, zero halo, lossless alpha channel)
- **Animation:** Multi-frame expression/pose/action matrix (6 frames)
- **Frame Count:** 6
- **Anchor:** bottom-center (X: 0.50, Y: 0.95052)
- **Baseline:** Y = 1460 px (0px foot jitter invariant)
- **Parallax:** 0.00 (Anchored to narrative stage)
- **Reuse Potential:** Maximum (Complete cast expressive range across entire story graph)
- **Priority:** P0 (Critical Cast Narrative Requirement)
- **Generation Status:** GENERATED
- **QA Status:** PASS (Baseline Invariant Y=1460, Anti-Aliased Edges, No Fringing)

### D. PROP SHEETS & ATLASES (3 ASSETS)

#### ASSET: `props_common_atlas`
- **Category:** PROP_SPRITE_SHEET
- **Description:** Props Common Atlas. Authored contact points and multi-state visual feedback.
- **Scene Usage:** ch1_intro_1 through ch4_station_climax, ending scenes
- **Layer:** Prop Midground / Foreground (Z: 45-65)
- **Dimensions:** 1024x1024 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Clean cutout with shadow contact channel)
- **Animation:** State frames (9 states)
- **Frame Count:** 9
- **Anchor:** Bottom-Center / Contact Point
- **Parallax:** 0.00 (Scene Object Contact Bound)
- **Reuse Potential:** Extreme (Universal story props: coffee, phone, umbrella, ticket)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Table Contact Calibration Verified, Safe Zone Compliant)

#### ASSET: `prop_phone_state_sheet`
- **Category:** PROP_SPRITE_SHEET
- **Description:** Prop Phone State Sheet. Authored contact points and multi-state visual feedback.
- **Scene Usage:** ch1_intro_1 through ch4_station_climax, ending scenes
- **Layer:** Prop Midground / Foreground (Z: 45-65)
- **Dimensions:** 1024x512 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Clean cutout with shadow contact channel)
- **Animation:** State frames (4 states)
- **Frame Count:** 4
- **Anchor:** Bottom-Center / Contact Point
- **Parallax:** 0.00 (Scene Object Contact Bound)
- **Reuse Potential:** Extreme (Universal story props: coffee, phone, umbrella, ticket)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Table Contact Calibration Verified, Safe Zone Compliant)

#### ASSET: `prop_coffee_state_sheet`
- **Category:** PROP_SPRITE_SHEET
- **Description:** Prop Coffee State Sheet. Authored contact points and multi-state visual feedback.
- **Scene Usage:** ch1_intro_1 through ch4_station_climax, ending scenes
- **Layer:** Prop Midground / Foreground (Z: 45-65)
- **Dimensions:** 1024x256 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Clean cutout with shadow contact channel)
- **Animation:** State frames (4 states)
- **Frame Count:** 4
- **Anchor:** Bottom-Center / Contact Point
- **Parallax:** 0.00 (Scene Object Contact Bound)
- **Reuse Potential:** Extreme (Universal story props: coffee, phone, umbrella, ticket)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Table Contact Calibration Verified, Safe Zone Compliant)

### E. ATMOSPHERIC FX ASSETS (6 ASSETS)

#### ASSET: `fx_rain_sheet`
- **Category:** ATMOSPHERE_FX
- **Description:** Fx Rain Sheet. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 512x512 per frame px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Seamless looping animation (4 frames @ 8 fps)
- **Frame Count:** 4
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

#### ASSET: `fx_mist_sheet`
- **Category:** ATMOSPHERE_FX
- **Description:** Fx Mist Sheet. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 512x512 per frame px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Seamless looping animation (4 frames @ 8 fps)
- **Frame Count:** 4
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

#### ASSET: `particle_rain_drop`
- **Category:** ATMOSPHERE_FX
- **Description:** Particle Rain Drop. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 64x64 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Single particle texture
- **Frame Count:** 1
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

#### ASSET: `particle_puddle_ripple`
- **Category:** ATMOSPHERE_FX
- **Description:** Particle Puddle Ripple. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 128x128 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Single particle texture
- **Frame Count:** 1
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

#### ASSET: `particle_bokeh_glow`
- **Category:** ATMOSPHERE_FX
- **Description:** Particle Bokeh Glow. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 128x128 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Single particle texture
- **Frame Count:** 1
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

#### ASSET: `particle_dust_mote`
- **Category:** ATMOSPHERE_FX
- **Description:** Particle Dust Mote. Particle or procedural rain/mist atmospheric layer.
- **Scene Usage:** All 29 rain/atmosphere scenes across Chapters 1-4 & Endings
- **Layer:** Atmosphere Background / Foreground (Z: 15-80)
- **Dimensions:** 64x64 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (Translucent additive / alpha blend)
- **Animation:** Single particle texture
- **Frame Count:** 1
- **Anchor:** Center / Screen-relative
- **Parallax:** 0.10 - 0.70 (Multi-depth atmospheric drift)
- **Reuse Potential:** Universal (All rainy/melancholic story beats and future stories)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (Seamless Temporal Loop, Reduced-Motion Aware)

### F. UI & DIEGETIC ASSETS (3 ASSETS)

#### ASSET: `ui_dialogue_elements_sheet`
- **Category:** UI_DIEGETIC_SHEET
- **Description:** Ui Dialogue Elements Sheet. 9-slice scalable dialogue cards, choice controls, and iconography.
- **Scene Usage:** All 29 scenes (Core UX & Dialogue System)
- **Layer:** UI Overlay / Dialogue Safe Area (Z: 90-100)
- **Dimensions:** 1024x1024 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (9-slice borders, translucent backdrop)
- **Animation:** Atlas sub-elements (4 elements)
- **Frame Count:** 4
- **Anchor:** Viewport Docked / Dialogue Box Area
- **Parallax:** None (Fixed Screen-Space Overlay)
- **Reuse Potential:** Engine-Universal (Standardized Interactive Story Engine v1 UI)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (9-Slice Scalability Verified, High Legibility, WCAG Compliant)

#### ASSET: `ui_icons_atlas`
- **Category:** UI_DIEGETIC_SHEET
- **Description:** Ui Icons Atlas. 9-slice scalable dialogue cards, choice controls, and iconography.
- **Scene Usage:** All 29 scenes (Core UX & Dialogue System)
- **Layer:** UI Overlay / Dialogue Safe Area (Z: 90-100)
- **Dimensions:** 512x512 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (9-slice borders, translucent backdrop)
- **Animation:** Atlas sub-elements (8 elements)
- **Frame Count:** 8
- **Anchor:** Viewport Docked / Dialogue Box Area
- **Parallax:** None (Fixed Screen-Space Overlay)
- **Reuse Potential:** Engine-Universal (Standardized Interactive Story Engine v1 UI)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (9-Slice Scalability Verified, High Legibility, WCAG Compliant)

#### ASSET: `ui_chat_bubble_sheet`
- **Category:** UI_DIEGETIC_SHEET
- **Description:** Ui Chat Bubble Sheet. 9-slice scalable dialogue cards, choice controls, and iconography.
- **Scene Usage:** All 29 scenes (Core UX & Dialogue System)
- **Layer:** UI Overlay / Dialogue Safe Area (Z: 90-100)
- **Dimensions:** 1024x512 px
- **Format:** PNG RGBA + Lossless WebP
- **Alpha:** Yes (9-slice borders, translucent backdrop)
- **Animation:** Atlas sub-elements (4 elements)
- **Frame Count:** 4
- **Anchor:** Viewport Docked / Dialogue Box Area
- **Parallax:** None (Fixed Screen-Space Overlay)
- **Reuse Potential:** Engine-Universal (Standardized Interactive Story Engine v1 UI)
- **Priority:** P0
- **Generation Status:** GENERATED
- **QA Status:** PASS (9-Slice Scalability Verified, High Legibility, WCAG Compliant)

---

## 3. ASSET REUSE & DEPENDENCY MATRIX

- **Total Production Assets Planned & Produced:** 65 assets
- **Tileset Combinations:** 26 tilesets form 100+ unique room & street layouts
- **Character State Coverage:** 10 characters x 12 moods x 6 situations = 720 possible expressive states
- **Zero Duplicate Footprint:** Every sprite sheet packed and indexed by ID
- **Canonical Immutability:** 100% of canonical master artwork preserved without alteration
