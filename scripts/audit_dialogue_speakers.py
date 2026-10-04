"""
scripts/audit_dialogue_speakers.py
Audits all scenes in storyContent.ts to check if speaker is assigned to narration text.
"""

import re

def audit_speakers():
    with open("src/data/storyContent.ts", "r", encoding="utf-8") as f:
        content = f.read()

    # Split by scene definitions
    # Regex matching scene blocks
    scene_blocks = re.findall(r"(\w+):\s*\{\s*id:\s*['\"](\w+)['\"](.*?)\n  \},?", content, re.DOTALL)
    print(f"Total scene blocks found: {len(scene_blocks)}")

    for sid_key, sid, body in scene_blocks:
        speaker_match = re.search(r"speaker:\s*([^\n,]+)", body)
        text_match = re.search(r"text:\s*['\"](.*?)['\"],?\n", body)
        
        speaker = speaker_match.group(1).strip() if speaker_match else None
        text = text_match.group(1).strip() if text_match else ""

        # Let's inspect
        if speaker and speaker != "null":
            # Check if text contains quotes or is narration
            # Dialogue usually has quotes or is a direct quote
            has_dialogue_quotes = ('"' in text or "“" in text or "”" in text or "「" in text)
            print(f"Scene: {sid} | Speaker: {speaker}")
            print(f"  Text: {text}")
            print(f"  Has quotes: {has_dialogue_quotes}")
            print("-" * 50)

if __name__ == "__main__":
    audit_speakers()
