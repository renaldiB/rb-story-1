import json
import hashlib
import os

MASTERS_DIR = r"public\assets\props\masters"

props_data = [
    {
        "id": "prop_phone",
        "name": "Dual Timezone Smartphone",
        "category": ["INTERACTIVE", "CHARACTER_HELD"],
        "description": "Modern smartphone displaying dual time zones (WIB 00:10 Jakarta vs WIT 02:10 Jayapura) and unread text message notification from Agus.",
        "scenes": ["ch3_night_phone_msg"],
        "dimensions": {"width": 256, "height": 512, "aspectRatio": "1:2"},
        "anchor": {"name": "hand_grip", "x": 0.5, "y": 0.85},
        "scale": 1.0,
        "states": ["screen_normal", "screen_notification", "screen_off"],
        "interactive": True,
        "priority": "P0"
    },
    {
        "id": "prop_coffee",
        "name": "Steaming Ceramic Mug",
        "category": ["STATIC_REUSABLE"],
        "description": "Warm handmade ceramic coffee mug with rich espresso, golden crema swirl, and delicate rising translucent steam.",
        "scenes": ["ch1_intro_1", "ch1_intro_2", "ch1_nadia_enters", "ch1_dialogue_1", "ch1_closing"],
        "dimensions": {"width": 256, "height": 256, "aspectRatio": "1:1"},
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scale": 0.8,
        "states": ["steaming", "still"],
        "interactive": False,
        "priority": "P0"
    },
    {
        "id": "prop_old_photo",
        "name": "Campus Polaroid Photograph",
        "category": ["INTERACTIVE", "STATIC_REUSABLE"],
        "description": "Nostalgic white-bordered polaroid photo tucked in novel page 42, showing two silhouettes on campus stairs under golden dusk.",
        "scenes": ["ch3_book_discovery", "ending_secret_scene"],
        "dimensions": {"width": 320, "height": 384, "aspectRatio": "5:6"},
        "anchor": {"name": "center", "x": 0.5, "y": 0.5},
        "scale": 1.0,
        "states": ["normal", "inspected"],
        "interactive": True,
        "priority": "P0"
    },
    {
        "id": "prop_train_ticket",
        "name": "Last-Minute Train Ticket",
        "category": ["INTERACTIVE", "STATIC_REUSABLE"],
        "description": "Intercity boarding pass from Bandung to Yogyakarta dated 24 Oct 23:45 WIB (Argo Wilis) with barcode and red validation stamp.",
        "scenes": ["ch2_bus_stop", "ch3_ticket_revelation", "ch4_station_climax"],
        "dimensions": {"width": 384, "height": 200, "aspectRatio": "48:25"},
        "anchor": {"name": "center", "x": 0.5, "y": 0.5},
        "scale": 1.0,
        "states": ["folded", "unfolded", "validated"],
        "interactive": True,
        "priority": "P0"
    },
    {
        "id": "prop_backpack",
        "name": "Travel Canvas Backpack",
        "category": ["CHARACTER_HELD", "STATIC_REUSABLE"],
        "description": "Dark teal rugged commuter canvas travel backpack with leather flap straps, brass buckles, and side water flask.",
        "scenes": ["ch4_station_climax", "ending_true_scene", "ending_romantic_scene", "ending_bittersweet_scene"],
        "dimensions": {"width": 384, "height": 480, "aspectRatio": "4:5"},
        "anchor": {"name": "bottom-center", "x": 0.5, "y": 0.95},
        "scale": 1.0,
        "states": ["worn", "grounded"],
        "interactive": False,
        "priority": "P1"
    },
    {
        "id": "prop_lighter_antique",
        "name": "Antique Brass Lighter",
        "category": ["INTERACTIVE", "STATIC_REUSABLE"],
        "description": "Vintage engraved brass flip lighter with floral filigree pattern and silver windguard chimney.",
        "scenes": ["ch1_intro_2"],
        "dimensions": {"width": 192, "height": 288, "aspectRatio": "2:3"},
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scale": 0.7,
        "states": ["closed", "open_flame"],
        "interactive": True,
        "priority": "P1"
    },
    {
        "id": "prop_laptop",
        "name": "Creative Studio Laptop",
        "category": ["STATIC_REUSABLE", "DYNAMIC_REUSABLE"],
        "description": "Slim space grey aluminum workstation laptop open at 3/4 angle, displaying code and design canvas with cyan glow.",
        "scenes": ["SC-20", "SC-38", "SC-08", "SC-30"],
        "dimensions": {"width": 480, "height": 320, "aspectRatio": "3:2"},
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scale": 1.0,
        "states": ["active_coding", "screen_dimmed"],
        "interactive": False,
        "priority": "P1"
    },
    {
        "id": "prop_agus_cat",
        "name": "Sleeping Tabby Cat",
        "category": ["STATIC_REUSABLE"],
        "description": "Curled sleeping orange tabby cat on a round woven linen cushion, tail wrapped peacefully.",
        "scenes": ["SC-08", "SC-30"],
        "dimensions": {"width": 384, "height": 256, "aspectRatio": "3:2"},
        "anchor": {"name": "table_contact_point", "x": 0.5, "y": 0.95},
        "scale": 0.9,
        "states": ["sleeping", "ear_twitch"],
        "interactive": False,
        "priority": "P1"
    },
    {
        "id": "prop_dog_rescue",
        "name": "Stray Dog with Umbrella",
        "category": ["STATIC_REUSABLE"],
        "description": "Small honey-colored stray puppy resting safely under a tilted sunny yellow dome umbrella on rain-soaked pavement.",
        "scenes": ["ch2_street_1", "ch2_slow_walk"],
        "dimensions": {"width": 440, "height": 400, "aspectRatio": "11:10"},
        "anchor": {"name": "bottom-center", "x": 0.5, "y": 0.95},
        "scale": 1.0,
        "states": ["huddled", "looking_up"],
        "interactive": False,
        "priority": "P2"
    }
]

for p in props_data:
    png_file = os.path.join(MASTERS_DIR, f"{p['id']}.png")
    webp_file = os.path.join(MASTERS_DIR, f"{p['id']}.webp")
    
    with open(png_file, 'rb') as f:
        png_hash = hashlib.sha256(f.read()).hexdigest()
    with open(webp_file, 'rb') as f:
        webp_hash = hashlib.sha256(f.read()).hexdigest()
        
    p['assetPng'] = f"/assets/props/masters/{p['id']}.png"
    p['assetWebp'] = f"/assets/props/masters/{p['id']}.webp"
    p['fileSizeBytes'] = {
        'png': os.path.getsize(png_file),
        'webp': os.path.getsize(webp_file)
    }
    p['checksumSha256'] = {'png': png_hash, 'webp': webp_hash}

registry = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "version": "1.0.0",
    "storyId": "two_hours_apart",
    "theme": "romance_rain",
    "totalProps": len(props_data),
    "contactSheet": "/assets/props/previews/props_contact_sheet.png",
    "props": props_data
}

with open("docs/prop_registry.json", "w", encoding="utf-8") as f:
    json.dump(registry, f, indent=2)

print("Generated docs/prop_registry.json with checksums!")

# Now Atmosphere FX Registry
fx_data = [
    {
        "id": "fx_rain_procedural",
        "name": "Procedural Directional Rain System",
        "type": "particle_canvas",
        "layer": "near_fg",
        "zIndex": 40,
        "implementation": "AtmosphereLayer (Canvas 2D / DPR-scaled)",
        "scenes": [
            "ch1_intro_1", "ch1_intro_2", "ch1_nadia_enters", "ch1_dialogue_1",
            "ch1_react_warm", "ch1_react_honest", "ch1_react_care", "ch1_sit_down",
            "ch1_hands_cg_scene", "ch1_confession_start", "ch1_closing",
            "ch2_street_1", "ch2_street_dialogue", "ch2_lean_closer",
            "ch2_hold_shoulder", "ch2_slow_walk", "ch2_bus_stop"
        ],
        "parameters": {
            "angleDeg": 35,
            "dropSpeed": "14-22 px/frame",
            "dropLength": "16-26 px",
            "opacity": "0.15-0.40",
            "strokeWidth": 1.2,
            "particleBudget": {
                "high": 120,
                "medium": 80,
                "low": 40,
                "mobile": 40
            }
        },
        "mobileBehavior": "Particle count capped at 40, no sub-pixel blur, hardware accelerated transform",
        "reducedMotionBehavior": "Particles disabled; static cool blue-950/15 wash overlay rendered",
        "performance": "< 1.5% CPU on mobile, 0 React re-renders during active animation loop",
        "cleanup": "Unsubscribes from AnimationManager on unmount, clears canvas context and particle array"
    },
    {
        "id": "fx_fog_mist",
        "name": "Multi-Layer Drifting Mist System",
        "type": "particle_canvas_drift",
        "layer": "midground",
        "zIndex": 15,
        "implementation": "AtmosphereLayer (Canvas 2D / GPU composited)",
        "scenes": [
            "SC-32", "ch2_bus_stop", "ch4_station_climax"
        ],
        "parameters": {
            "driftVx": "0.2-0.6 px/frame",
            "cloudRadius": "35-90 px",
            "alpha": "0.04-0.08",
            "color": "#10201d",
            "particleBudget": {
                "high": 30,
                "medium": 20,
                "low": 10,
                "mobile": 10
            }
        },
        "mobileBehavior": "Particle count capped at 10, composite-mode source-over",
        "reducedMotionBehavior": "Particles frozen or replaced with static emerald-950/20 ambient wash",
        "performance": "< 1.0% CPU on mobile, linear particle recycling outside viewport",
        "cleanup": "Canvas instance cleared, active count zeroed in PerformanceManager"
    },
    {
        "id": "fx_dust_motes",
        "name": "Sunbeam Floating Motes System",
        "type": "particle_canvas_float",
        "layer": "midground",
        "zIndex": 25,
        "implementation": "AtmosphereLayer (Canvas 2D / Transform-only)",
        "scenes": [
            "ch3_book_discovery", "ch3_polaroid_dialogue", "ch3_ticket_revelation",
            "ch3_deep_confession", "ch3_silent_comfort", "SC-20", "SC-38", "SC-39",
            "ch4_station_climax", "ending_true_scene", "ending_romantic_scene"
        ],
        "parameters": {
            "moteCount": 12,
            "radius": "1.5-4.5 px",
            "driftVx": "-0.15 to +0.15 px/frame",
            "driftVy": "-0.2 to -0.6 px/frame",
            "alpha": "0.10-0.45",
            "colors": {
                "sunset": "#f39c12",
                "afternoon": "#ffeaa7",
                "night": "#cce5ff"
            },
            "particleBudget": {
                "high": 25,
                "medium": 16,
                "low": 8,
                "mobile": 8
            }
        },
        "mobileBehavior": "Particle count capped at 8, zero layout reflows",
        "reducedMotionBehavior": "Particles hidden completely, preserving clean scene visibility",
        "performance": "< 0.5% CPU, batched arc draw calls",
        "cleanup": "Unsubscribes on scene leave, array released to garbage collector"
    },
    {
        "id": "fx_screen_glow_late_night",
        "name": "Late Night Screen Ambient Glow Overlay",
        "type": "css_radial_gradient",
        "layer": "mid_foreground",
        "zIndex": 32,
        "implementation": "AtmosphereEffects (CSS Mix-Blend Screen)",
        "scenes": [
            "ch3_night_phone_msg", "SC-08", "SC-14", "SC-21", "SC-30", "SC-35"
        ],
        "parameters": {
            "gradient": "radial-gradient(circle at 50% 65%, rgba(56, 189, 248, 0.18) 0%, rgba(30, 58, 138, 0.08) 50%, transparent 75%)",
            "mixBlendMode": "screen",
            "flicker": "subtle pulse <= 0.5Hz",
            "opacity": 0.85
        },
        "mobileBehavior": "Pure GPU CSS composite layer, 0 CPU overhead",
        "reducedMotionBehavior": "Pulse animation disabled, static gradient rendered",
        "performance": "0% CPU overhead, GPU raster cached",
        "cleanup": "CSS class unmount removes DOM node instantly"
    },
    {
        "id": "fx_cinematic_vignette",
        "name": "Cinematic Responsive Perimeter Vignette",
        "type": "css_radial_vignette",
        "layer": "foreground_frame",
        "zIndex": 48,
        "implementation": "AtmosphereEffects (CSS Radial Gradient Frame)",
        "scenes": [
            "ch1_intro_1", "ch1_hands_cg_scene", "ch2_street_1", "ch3_book_discovery",
            "ch3_night_phone_msg", "ch4_station_climax", "ending_true_scene",
            "ending_romantic_scene", "ending_bittersweet_scene", "ending_secret_scene"
        ],
        "parameters": {
            "gradient": "radial-gradient(ellipse at center, transparent 55%, rgba(10, 14, 22, 0.45) 85%, rgba(6, 9, 15, 0.80) 100%)",
            "pointerEvents": "none",
            "safeZoneProtection": "Center 60% ellipse 100% transparent to preserve character face and dialogue clarity"
        },
        "mobileBehavior": "Full viewport coverage with responsive aspect scaling",
        "reducedMotionBehavior": "Fully static by default (no motion)",
        "performance": "0% CPU overhead, GPU composite layer",
        "cleanup": "CSS unmount"
    }
]

fx_registry = {
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "version": "1.0.0",
    "storyId": "two_hours_apart",
    "theme": "romance_rain",
    "totalFxSystems": len(fx_data),
    "systems": fx_data
}

with open("docs/atmosphere_fx_registry.json", "w", encoding="utf-8") as f:
    json.dump(fx_registry, f, indent=2)

print("Generated docs/atmosphere_fx_registry.json!")
