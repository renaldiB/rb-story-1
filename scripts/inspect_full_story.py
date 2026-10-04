"""
scripts/inspect_full_story.py
Parses storyContent.ts and ProductionSceneRegistry.ts to extract:
- scenes, chapters, dialogue, characters, expressions, locations, items, fx, props.
"""

import re
import json

def parse_story():
    with open("src/data/storyContent.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Find scenes
    pattern = r"(\w+):\s*\{\s*id:\s*['\"](\w+)['\"].*?nextSceneId:\s*['\"]?(\w+)?['\"]?"
    
    # Let's inspect ProductionSceneRegistry.ts which already has structured metadata!
    with open("src/scene/runtime/ProductionSceneRegistry.ts", "r", encoding="utf-8") as f:
        psr = f.read()

    print("ProductionSceneRegistry length:", len(psr))
    
    # Let's see scene IDs in psr
    scenes = re.findall(r"sceneId:\s*['\"]([^'\"]+)['\"]", psr)
    print("Found", len(scenes), "scene requirements in ProductionSceneRegistry:")
    for s in scenes:
        print(" -", s)

if __name__ == "__main__":
    parse_story()
