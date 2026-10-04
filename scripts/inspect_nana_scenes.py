import re

with open('src/data/storyContent.ts', 'r', encoding='utf-8') as f:
    content = f.read()

# Match scenes
# We can find scenes by splitting on "ch" or ending scene ids
scene_pattern = re.compile(
    r"(ch[0-9a-zA-Z_]+|ending_[0-9a-zA-Z_]+):\s*\{\s*id:\s*'([^']+)'"
    r"([\s\S]*?)(?=(?:\n  (?:ch[0-9a-zA-Z_]+|ending_[0-9a-zA-Z_]+):\s*\{|\n\};\s*$))"
)

scenes = scene_pattern.findall(content)
print(f"Total scenes found: {len(scenes)}")

nana_scenes = []
for scene_key, scene_id, body in scenes:
    if "nadia" in body.lower() or "nana" in body.lower():
        # Check if in characters block
        char_match = re.search(r"characters:\s*\[([\s\S]*?)\]", body)
        if char_match and ("nadia" in char_match.group(1).lower() or "nana" in char_match.group(1).lower()):
            chars_str = char_match.group(1)
            expr_m = re.search(r"expression:\s*'([^']+)'", chars_str)
            pose_m = re.search(r"pose:\s*'([^']+)'", chars_str)
            spk_m = re.search(r"isSpeaking:\s*(true|false)", chars_str)
            txt_m = re.search(r"text:\s*'([^']+)'", body)
            speaker_m = re.search(r"speaker:\s*('([^']+)'|null)", body)
            
            expr = expr_m.group(1) if expr_m else "none"
            pose = pose_m.group(1) if pose_m else "none"
            spk = spk_m.group(1) if spk_m else "false"
            txt = txt_m.group(1) if txt_m else ""
            speaker = speaker_m.group(2) if speaker_m and speaker_m.group(2) else ("null" if speaker_m else "none")
            
            nana_scenes.append({
                "key": scene_key,
                "id": scene_id,
                "expr": expr,
                "pose": pose,
                "isSpeaking": spk,
                "speaker": speaker,
                "text": txt
            })

print(f"Nana active scenes: {len(nana_scenes)}")
for s in nana_scenes:
    print(f"[{s['id']}] expr={s['expr']} pose={s['pose']} speaker={s['speaker']}")
    print(f"   text: {s['text'][:80]}...\n")
