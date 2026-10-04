import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  createInitialState,
  evaluateCondition,
  applyEffects,
  advanceStory,
  discoverSecretItem
} from './storyEngine.ts';
import { computeThemeTokens } from './themeEngine.ts';
import type { StoryScene, VisualBible } from '../types/story.ts';

test('createInitialState creates clean state with multi-dimensional relationships', () => {
  const state = createInitialState('intro_scene', 'horror_ward');
  assert.equal(state.currentSceneId, 'intro_scene');
  assert.equal(state.currentStoryId, 'horror_ward');
  assert.equal(state.variables.trust, 0);
  assert.equal(state.variables.fear, 0);
  assert.equal(state.variables.suspicion, 0);
  assert.equal(state.variables.respect, 0);
  assert.deepEqual(state.flags, {});
});

test('evaluateCondition correctly checks variables and flags with multi-genre conditions', () => {
  const vars = { trust: 5, affection: 3, suspicion: 1, fear: 4, respect: 2, intimacy: 0 };
  const flags = { has_umbrella: true, listened_tape: true };

  assert.equal(
    evaluateCondition({ variable: 'trust', operator: '>=', value: 4 }, vars, flags),
    true
  );
  assert.equal(
    evaluateCondition({ variable: 'fear', operator: '<=', value: 3 }, vars, flags),
    false
  );
  assert.equal(
    evaluateCondition({ flag: 'listened_tape' }, vars, flags),
    true
  );
  assert.equal(
    evaluateCondition({ flag: 'read_terminal' }, vars, flags),
    false
  );
});

test('applyEffects mutates multi-dimensional variables and sets flags', () => {
  const vars = { trust: 2, affection: 1, suspicion: 0, fear: 1, respect: 0, intimacy: 0 };
  const flags = { read_note: true };

  const res = applyEffects(vars, flags, { trust: 2, fear: 3 }, ['escaped_ward']);
  assert.equal(res.variables.trust, 4);
  assert.equal(res.variables.fear, 4);
  assert.equal(res.flags.read_note, true);
  assert.equal(res.flags.escaped_ward, true);
});

test('advanceStory updates current scene and logs history', () => {
  const state = createInitialState('scene_1', 'romance_rain');
  const dummyScene: StoryScene = {
    id: 'scene_2',
    chapterId: 'ch1',
    chapterTitle: 'Chapter 1',
    progressPercent: 20,
    location: { id: 'cafe', name: 'Cafe', time: 'night', weather: 'rain', mood: 'romance' },
    characters: [],
    speaker: 'Nana',
    text: 'Kamu masih ingat tempat ini?'
  };

  const next = advanceStory(state, dummyScene);
  assert.equal(next.currentSceneId, 'scene_2');
  assert.equal(next.history.length, 1);
  assert.equal(next.history[0].speaker, 'Nana');
});

test('discoverSecretItem flags item correctly', () => {
  const state = createInitialState('scene_1', 'romance_rain');
  const updated = discoverSecretItem(state, 'old_ticket', 'found_ticket');
  assert.ok(updated.discoveredSecrets.includes('old_ticket'));
  assert.equal(updated.flags.found_ticket, true);
});

test('computeThemeTokens returns genre-adaptive styles and camera transforms', () => {
  const dummyBible: VisualBible = {
    artStyle: 'gritty',
    renderStyle: 'dark',
    colorLanguage: 'charcoal',
    lightingLanguage: 'dim',
    cameraLanguage: 'shake',
    particleLanguage: 'fog',
    uiLanguage: 'dark_grit',
    soundLanguage: 'dark_drone'
  };

  const horrorTokens = computeThemeTokens('horror', 'horror', 0.8, dummyBible, 'shake');
  assert.ok(horrorTokens.uiBorder.includes('emerald'));
  assert.ok(horrorTokens.cameraTransform.includes('translate'));

  const cyberTokens = computeThemeTokens('cyberpunk', 'cyber', 0.6, dummyBible, 'slow_push');
  assert.ok(cyberTokens.uiBorder.includes('cyan'));
  assert.ok(cyberTokens.cameraTransform.includes('scale'));
});
