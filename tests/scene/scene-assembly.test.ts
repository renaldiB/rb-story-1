import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { validateStoryDocument } from '../../src/core/schema/story.schema.ts';
import { SceneRuntime } from '../../src/scene/runtime/SceneRuntime.ts';
import { storyThemeRegistry } from '../../src/scene/runtime/StoryThemeRegistry.ts';
import { TransitionManager } from '../../src/scene/transitions/TransitionManager.ts';
import { variantResolver } from '../../src/character/CharacterVariantResolver.ts';
import { SEMANTIC_Z_INDEX } from '../../src/scene/types.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadTestStory() {
  const filePath = resolve(__dirname, '../../src/tests/fixtures/scene-assembly-test-story.json');
  const raw = readFileSync(filePath, 'utf-8');
  return JSON.parse(raw);
}

test('Story Parser: validates complete scene assembly test story', () => {
  const json = loadTestStory();
  const res = validateStoryDocument(json);
  assert.equal(res.success, true, 'Schema validation must succeed');
  assert.ok(res.data);
  assert.equal(res.data?.id, 'scene_assembly_test_story');
  assert.equal(Object.keys(res.data?.scenes || {}).length, 6);
});

test('Story Parser: detects invalid story missing required firstSceneId', () => {
  const invalid = { schemaVersion: '2.0.0', id: 'broken_story', scenes: {} };
  const res = validateStoryDocument(invalid);
  assert.equal(res.success, false);
  assert.ok(res.errors && res.errors.length > 0);
});

test('Story Parser: detects invalid schema with malformed character position', () => {
  const json = loadTestStory();
  const mutated = JSON.parse(JSON.stringify(json));
  mutated.scenes.scene_1.characters[0].position = 'floating_in_space';
  const res = validateStoryDocument(mutated);
  assert.equal(res.success, false);
});

test('Scene Runtime: enforces deterministic lifecycle sequence', () => {
  const story = loadTestStory();
  const scene1 = story.scenes.scene_1;
  const runtime = new SceneRuntime(scene1, story.initialVariables, story.initialFlags);

  assert.equal(runtime.getLifecycle(), 'SCENE_ENTER');

  assert.equal(runtime.transitionLifecycle('SCENE_LOAD'), true);
  assert.equal(runtime.getLifecycle(), 'SCENE_LOAD');

  assert.equal(runtime.transitionLifecycle('ASSET_READY'), true);
  assert.equal(runtime.getLifecycle(), 'ASSET_READY');

  assert.equal(runtime.transitionLifecycle('SCENE_ACTIVE'), true);
  assert.equal(runtime.getLifecycle(), 'SCENE_ACTIVE');

  assert.equal(runtime.transitionLifecycle('USER_INTERACTION'), true);
  assert.equal(runtime.getLifecycle(), 'USER_INTERACTION');

  assert.equal(runtime.transitionLifecycle('SCENE_COMPLETE'), true);
  assert.equal(runtime.getLifecycle(), 'SCENE_COMPLETE');

  assert.equal(runtime.transitionLifecycle('SCENE_EXIT'), true);
  assert.equal(runtime.getLifecycle(), 'SCENE_EXIT');

  assert.equal(runtime.transitionLifecycle('NEXT_SCENE'), true);
  assert.equal(runtime.getLifecycle(), 'NEXT_SCENE');
});

test('Scene Runtime: rejects illegal lifecycle transitions', () => {
  const story = loadTestStory();
  const scene1 = story.scenes.scene_1;
  const runtime = new SceneRuntime(scene1);

  assert.equal(runtime.getLifecycle(), 'SCENE_ENTER');
  assert.equal(runtime.transitionLifecycle('SCENE_COMPLETE'), false);
  assert.equal(runtime.getLifecycle(), 'SCENE_ENTER');
});

test('Dialogue Orchestration: tracks beats and speaker sequence accurately', async () => {
  const story = loadTestStory();
  const scene1 = story.scenes.scene_1;
  const runtime = new SceneRuntime(scene1);
  await runtime.loadSceneAssets();

  const s0 = runtime.getState();
  assert.equal(s0.activeDialogueIndex, 0);
  assert.equal(s0.currentDialogue?.speaker, 'Nana');
  assert.equal(s0.isComplete, false);

  const hasMore1 = runtime.stepDialogue();
  assert.equal(hasMore1, true);
  const s1 = runtime.getState();
  assert.equal(s1.activeDialogueIndex, 1);
  assert.equal(s1.currentDialogue?.speaker, 'Agus');
  assert.equal(s1.isComplete, true);

  const hasMore2 = runtime.stepDialogue();
  assert.equal(hasMore2, false);
  assert.equal(runtime.getLifecycle(), 'SCENE_COMPLETE');
});

test('Character Composition: Nana and Agus resolve correctly in Scene 1', () => {
  const story = loadTestStory();
  const scene1 = story.scenes.scene_1;
  assert.equal(scene1.characters.length, 2);

  const nanaChar = scene1.characters[0];
  const agusChar = scene1.characters[1];

  const nanaResolved = variantResolver.resolve({
    characterId: nanaChar.characterId,
    expression: nanaChar.expression,
    pose: nanaChar.pose,
  });
  assert.equal(nanaResolved.characterId, 'nana');
  assert.equal(nanaResolved.fallback, false);
  assert.equal(nanaResolved.baselineY, 1460);
  assert.equal(nanaResolved.canonicalScale, 1.0);

  const agusResolved = variantResolver.resolve({
    characterId: agusChar.characterId,
    expression: agusChar.expression,
    pose: agusChar.pose,
  });
  assert.equal(agusResolved.characterId, 'agus');
  assert.equal(agusResolved.fallback, false);
  assert.equal(agusResolved.baselineY, 1460);
  assert.equal(agusResolved.canonicalScale, 1.08);
});

test('Character Composition: Scene 3 supports secondary character (Kaka) joining the scene', () => {
  const story = loadTestStory();
  const scene3 = story.scenes.scene_3;
  assert.equal(scene3.characters.length, 3, 'Scene 3 must have 3 characters (Nana, Agus, Kaka)');

  const kakaChar = scene3.characters.find((c: any) => c.characterId === 'kaka');
  assert.ok(kakaChar, 'Kaka must exist in Scene 3');

  const kakaResolved = variantResolver.resolve({
    characterId: kakaChar.characterId,
    expression: kakaChar.expression,
    pose: kakaChar.pose,
  });
  assert.equal(kakaResolved.characterId, 'kaka');
  assert.equal(kakaResolved.fallback, false);
  assert.equal(kakaResolved.baselineY, 1460);
  assert.ok(kakaResolved.assetPath.includes('nana_'));
});

test('Choices & Branching: choice selection applies deltas and sets flags correctly', async () => {
  const story = loadTestStory();
  const scene4 = story.scenes.scene_4;
  const runtime = new SceneRuntime(scene4, { trust: 1, courage: 0 }, { umbrella_shared: false });
  await runtime.loadSceneAssets();

  const choices = runtime.getAvailableChoices();
  assert.equal(choices.length, 2);
  assert.equal(choices[0].id, 'choice_branch_a');

  const selected = runtime.selectChoice('choice_branch_a');
  assert.ok(selected);
  assert.equal(selected?.nextSceneId, 'scene_5a');

  const vars = runtime.getVariables();
  const flags = runtime.getFlags();
  assert.equal(vars.trust, 2, 'Trust should increment by 1');
  assert.equal(flags.umbrella_shared, true, 'umbrella_shared flag should be set to true');
  assert.equal(runtime.getLifecycle(), 'SCENE_COMPLETE');
});

test('Asset Preloading: loadSceneAssets preloads environment and character assets', async () => {
  const story = loadTestStory();
  const scene1 = story.scenes.scene_1;
  const runtime = new SceneRuntime(scene1);

  const report = await runtime.loadSceneAssets();
  assert.ok(report);
  assert.equal(report.status, 'SUCCESS');
  assert.ok(report.totalAssets >= 3, 'Should preload background + 2 character variants');
  assert.equal(report.failedAssets.length, 0);
  assert.equal(runtime.getLifecycle(), 'SCENE_ACTIVE');
});

test('Theme Registry: provides themes for romance, horror, mystery, cyberpunk, fantasy, school', () => {
  const genres = ['romance', 'horror', 'mystery', 'cyberpunk', 'fantasy', 'school'];
  for (const g of genres) {
    const theme = storyThemeRegistry.getTheme(g);
    assert.equal(theme.genre, g);
    assert.ok(theme.colors.background);
    assert.ok(theme.dialogue.bgClass);
  }

  const unknown = storyThemeRegistry.getTheme('steampunk_apocalypse');
  assert.equal(unknown.id, 'default');
});

test('Transition Manager: respects reduced motion and produces instant styles', () => {
  const sceneStyleReduced = TransitionManager.getSceneStyle('entering', {
    type: 'zoom',
    duration: 300,
    reducedMotion: true,
  });
  assert.equal(sceneStyleReduced.transition, 'none');

  const sceneStyleNormal = TransitionManager.getSceneStyle('entering', {
    type: 'zoom',
    duration: 300,
    reducedMotion: false,
  });
  assert.notEqual(sceneStyleNormal.transition, 'none');

  const charStyleReduced = TransitionManager.getCharacterTransitionStyle('slide', 'entering', true);
  assert.equal(charStyleReduced.transition, 'none');
});

test('Layer Depth: semantic z-index ordering preserves depth hierarchy', () => {
  assert.ok(SEMANTIC_Z_INDEX.background < SEMANTIC_Z_INDEX.environment_far);
  assert.ok(SEMANTIC_Z_INDEX.environment_far < SEMANTIC_Z_INDEX.environment_mid);
  assert.ok(SEMANTIC_Z_INDEX.environment_mid < SEMANTIC_Z_INDEX.character);
  assert.ok(SEMANTIC_Z_INDEX.character < SEMANTIC_Z_INDEX.environment_near);
  assert.ok(SEMANTIC_Z_INDEX.environment_near < SEMANTIC_Z_INDEX.foreground);
  assert.ok(SEMANTIC_Z_INDEX.foreground < SEMANTIC_Z_INDEX.ui);
});
