# Story Authoring Guide

## 1. File Structure
Every story is a JSON or TypeScript object complying with the `StoryDocumentSchema` (defined in `docs/story.schema.json` and `src/core/schema/story.schema.ts`).

```json
{
  "schemaVersion": "2.0.0",
  "id": "my_new_story",
  "title": "Story Title",
  "subtitle": "A compelling tagline",
  "genre": "romance",
  "synopsis": "A brief overview of the plot and themes.",
  "firstSceneId": "scene_intro",
  "initialVariables": {
    "trust": 0,
    "affection": 0
  },
  "initialFlags": {
    "knows_secret": false
  },
  "visualBible": {
    "artStyle": "cinematic_watercolor",
    "renderStyle": "clean_vector",
    "colorLanguage": "warm_sepia",
    "lightingLanguage": "golden_hour",
    "cameraLanguage": "slow_push",
    "particleLanguage": "rain",
    "uiLanguage": "minimal_warm",
    "soundLanguage": "intimate_lofi"
  },
  "scenes": { ... },
  "endings": { ... }
}
```

## 2. Defining Scenes
Each scene defines:
* `id`: Unique string identifier.
* `chapterId` & `chapterTitle`: Grouping header.
* `progressPercent`: 0–100 number for progress bar.
* `location`: Location ID, time (`morning`, `sunset`, `night`, etc.), weather (`clear`, `rain`, `fog`, etc.), and mood.
* `characters`: Array of characters present, position (`left`, `center`, `right`, `foreground`, `background`), and expression.
* `speaker`: Character name or `null` for narrator.
* `text`: Main dialogue / narration body.
* `timeline`: (Optional) Array of successive dialogue beats within this scene.
* `choices`: (Optional) Player choices.
* `nextSceneId`: (Optional) Automatic target scene if no choices exist.
* `diegeticItem`: (Optional) Interactive phone, tape recorder, terminal, or grimoire.
* `foreshadowItem`: (Optional) Hidden inspectable object in the scene.
* `endingId`: (Optional) Concludes story with specified ending.

## 3. Writing Choices & Conditions
Choices can modify variables and set flags:
```json
{
  "id": "choice_confess",
  "text": "Tell her how you really feel",
  "subtext": "Increases affection and vulnerability",
  "nextSceneId": "scene_confession_reaction",
  "effects": {
    "affection": 2,
    "trust": 1
  },
  "setFlags": ["confessed_feelings"],
  "requiredCondition": {
    "variable": "trust",
    "operator": ">=",
    "value": 3
  }
}
```

### Compound Conditions
You can nest `and`, `or`, and `not`:
```json
"requiredCondition": {
  "or": [
    { "variable": "trust", "operator": ">=", "value": 5 },
    { "flag": "found_diary", "operator": "flagSet" }
  ]
}
```

## 4. Validating Your Story
Run the CLI validator to verify any story against schema rules before deploying:
```bash
npm run validate:story -- path/to/your-story.json
```
