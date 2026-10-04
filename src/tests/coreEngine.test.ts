import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { StoryDocumentSchema } from '../core/schema/story.schema.ts';
import { ConditionEngine } from '../core/engine/ConditionEngine.ts';
import { VariableEngine } from '../core/engine/VariableEngine.ts';
import { ChoiceEngine } from '../core/engine/ChoiceEngine.ts';
import { StoryStateMachine } from '../core/state-machine/StoryStateMachine.ts';
import { StoryEngine } from '../core/engine/StoryEngine.ts';
import { SaveSerializer } from '../core/serialization/SaveSerializer.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function loadAcceptanceStory() {
  const fixturePath = resolve(__dirname, './fixtures/acceptance-story.json');
  const raw = readFileSync(fixturePath, 'utf-8');
  const json = JSON.parse(raw);
  const validated = StoryDocumentSchema.parse(json);
  return validated;
}

test('StoryDocumentSchema validates acceptance-story.json correctly', () => {
  const story = loadAcceptanceStory();
  assert.equal(story.id, 'acceptance_test_story');
  assert.equal(story.genre, 'mystery');
  assert.equal(story.firstSceneId, 'scene_1');
  assert.ok(story.scenes['scene_1']);
});

test('ConditionEngine evaluates simple, compound, and flag logic', () => {
  const vars = { trust: 2, courage: 1, suspicion: 0 };
  const flags = { has_key: true, escaped: false };

  assert.equal(ConditionEngine.evaluate({ variable: 'trust', operator: '>=', value: 2 }, vars, flags), true);
  assert.equal(ConditionEngine.evaluate({ variable: 'trust', operator: '<', value: 1 }, vars, flags), false);
  assert.equal(ConditionEngine.evaluate({ variable: 'suspicion', operator: '==', value: 0 }, vars, flags), true);

  assert.equal(ConditionEngine.evaluate({ flag: 'has_key', operator: 'flagSet' }, vars, flags), true);
  assert.equal(ConditionEngine.evaluate({ flag: 'escaped', operator: 'flagSet' }, vars, flags), false);
  assert.equal(ConditionEngine.evaluate({ flag: 'escaped', operator: 'flagUnset' }, vars, flags), true);

  assert.equal(
    ConditionEngine.evaluate(
      {
        and: [
          { variable: 'trust', operator: '>=', value: 1 },
          { flag: 'has_key', operator: 'flagSet' },
        ],
      },
      vars,
      flags
    ),
    true
  );

  assert.equal(
    ConditionEngine.evaluate(
      {
        or: [
          { variable: 'trust', operator: '>=', value: 10 },
          { flag: 'has_key', operator: 'flagSet' },
        ],
      },
      vars,
      flags
    ),
    true
  );

  assert.equal(
    ConditionEngine.evaluate(
      {
        not: { variable: 'trust', operator: '>=', value: 10 },
      },
      vars,
      flags
    ),
    true
  );
});

test('VariableEngine correctly applies deltas, flags, and actions', () => {
  const initialVars = { trust: 0, health: 100 };
  const initialFlags = { wounded: false };

  const afterDelta = VariableEngine.applyDelta(initialVars, { trust: 2, courage: 1 });
  assert.equal(afterDelta.trust, 2);
  assert.equal(afterDelta.courage, 1);
  assert.equal(afterDelta.health, 100);

  const afterFlags = VariableEngine.applyFlags(initialFlags, ['wounded', 'alert']);
  assert.equal(afterFlags.wounded, true);
  assert.equal(afterFlags.alert, true);

  const res = VariableEngine.applyActions(
    [
      { type: 'addVariable', target: 'trust', value: 3 },
      { type: 'setFlag', target: 'quest_complete', value: true },
      { type: 'playSound', target: 'fanfare' },
    ],
    initialVars,
    initialFlags
  );
  assert.equal(res.variables.trust, 3);
  assert.equal(res.flags.quest_complete, true);
  assert.deepEqual(res.soundsToPlay, ['fanfare']);
});

test('ChoiceEngine correctly filters and flags available and locked choices', () => {
  const choices = [
    { id: 'c1', text: 'Option A', nextSceneId: 's1' },
    {
      id: 'c2',
      text: 'Option B',
      nextSceneId: 's2',
      requiredCondition: { variable: 'courage', operator: '>=' as const, value: 5 },
    },
  ];

  const evaluated = ChoiceEngine.evaluateChoices(choices, { courage: 2 }, {});
  assert.equal(evaluated.length, 2);
  assert.equal(evaluated[0].isAvailable, true);
  assert.equal(evaluated[1].isAvailable, false);

  const availableOnly = ChoiceEngine.getAvailableChoices(choices, { courage: 2 }, {});
  assert.equal(availableOnly.length, 1);
  assert.equal(availableOnly[0].id, 'c1');
});

test('StoryStateMachine enforces legal transitions and rejects illegal ones', () => {
  const sm = new StoryStateMachine('BOOT');
  assert.equal(sm.status, 'BOOT');

  sm.transitionTo('LOADING');
  assert.equal(sm.status, 'LOADING');

  sm.transitionTo('READY');
  assert.equal(sm.status, 'READY');

  sm.transitionTo('PLAYING');
  assert.equal(sm.status, 'PLAYING');

  sm.transitionTo('CHOICE');
  assert.equal(sm.status, 'CHOICE');

  sm.transitionTo('TRANSITIONING');
  assert.equal(sm.status, 'TRANSITIONING');

  sm.transitionTo('ENDING');
  assert.equal(sm.status, 'ENDING');

  assert.throws(() => {
    sm.transitionTo('PLAYING');
  }, /Invalid state transition/);
});

test('Acceptance Path A: Talk -> Trust 1 -> Open Door -> True Ending', () => {
  const story = loadAcceptanceStory();
  const engine = new StoryEngine(story);
  engine.start();

  assert.equal(engine.currentSceneId, 'scene_1');
  assert.equal(engine.variables.trust, 0);

  assert.equal(engine.stepDialogue(), true);
  assert.equal(engine.getCurrentDialogue()?.speaker, 'Companion');

  const ok = engine.choose('choice_talk');
  assert.equal(ok, true);

  assert.equal(engine.currentSceneId, 'scene_2');
  assert.equal(engine.variables.trust, 1);
  assert.equal(engine.flags.secret_found, false);

  const choices = engine.getAvailableChoices();
  assert.equal(choices.length, 2);
  const openDoorChoice = choices.find((c) => c.id === 'choice_open_door');
  assert.ok(openDoorChoice, 'Door choice should be unlocked');

  engine.choose('choice_open_door');
  assert.equal(engine.currentSceneId, 'scene_ending_true');

  const ending = engine.resolveEnding('ending_true');
  assert.ok(ending);
  assert.equal(ending.id, 'ending_true');
  assert.equal(ending.type, 'true');
});

test('Acceptance Path B: Investigate -> Flag secret_found -> Open Door -> True Ending', () => {
  const story = loadAcceptanceStory();
  const engine = new StoryEngine(story);
  engine.start();

  const ok = engine.choose('choice_investigate');
  assert.equal(ok, true);

  assert.equal(engine.currentSceneId, 'scene_2');
  assert.equal(engine.variables.trust, 0);
  assert.equal(engine.flags.secret_found, true);

  const choices = engine.getAvailableChoices();
  const openDoorChoice = choices.find((c) => c.id === 'choice_open_door');
  assert.ok(openDoorChoice, 'Door choice should be unlocked via flag');

  engine.choose('choice_open_door');
  assert.equal(engine.currentSceneId, 'scene_ending_true');
});

test('Acceptance Path C: Wait -> Default Ending', () => {
  const story = loadAcceptanceStory();
  const engine = new StoryEngine(story);
  engine.start();

  engine.choose('choice_investigate');
  assert.equal(engine.currentSceneId, 'scene_2');

  engine.choose('choice_wait');
  assert.equal(engine.currentSceneId, 'scene_ending_default');

  const ending = engine.resolveEnding('ending_default');
  assert.ok(ending);
  assert.equal(ending.id, 'ending_default');
  assert.equal(ending.type, 'bittersweet');
});

test('SaveSerializer serializes, deserializes, migrates v1, and detects corruption', () => {
  const story = loadAcceptanceStory();
  const engine = new StoryEngine(story);
  engine.start();
  engine.choose('choice_talk');

  const snapshot = engine.getSnapshot();
  const serialized = SaveSerializer.serialize('slot_1', snapshot, {
    storyTitle: story.title,
    chapterTitle: 'The Sealed Door',
  });

  const restored = SaveSerializer.deserialize(serialized);
  assert.equal(restored.formatVersion, 2);
  assert.equal(restored.storyId, 'acceptance_test_story');
  assert.equal(restored.snapshot.currentSceneId, 'scene_2');
  assert.equal(restored.snapshot.variables.trust, 1);

  const tampered = serialized.replace('"trust":1', '"trust":999');
  assert.throws(() => {
    SaveSerializer.deserialize(tampered);
  }, /checksum mismatch/i);

  const legacyV1 = JSON.stringify({
    version: 1,
    storyId: 'acceptance_test_story',
    sceneId: 'scene_2',
    variables: { trust: 2 },
    flags: { secret_found: true },
    timestamp: 12345678,
  });

  const migrated = SaveSerializer.deserialize(legacyV1);
  assert.equal(migrated.formatVersion, 2);
  assert.equal(migrated.snapshot.variables.trust, 2);
  assert.equal(migrated.snapshot.flags.secret_found, true);
});
