import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createInitialTwoHoursApartState,
  modifyStat,
  processChoiceTags,
  qualifiesForSecretEnding,
  qualifiesForSameDirection,
  qualifiesForTwoPaths,
  qualifiesForStillUs,
  qualifiesForTooLate,
  evaluateEnding,
} from '../core/stories/twoHoursApartEngine.ts';

test('Initial state is correct', () => {
  const state = createInitialTwoHoursApartState();
  assert.equal(state.relationship.trustAgus, 50);
  assert.equal(state.relationship.affectionAgus, 50);
  assert.equal(state.relationship.communication, 50);
  assert.equal(state.relationship.independence, 50);
  assert.equal(state.relationship.sacrifice, 50);
  assert.equal(state.relationship.conflict, 0);

  assert.equal(state.hidden.emotionalDistance, 0);
  assert.equal(state.hidden.unspokenProblems, 0);
  assert.equal(state.hidden.futureCompatibility, 50);

  assert.equal(state.flags.relationshipStarted, false);
  assert.equal(state.flags.tripUnlocked, false);
  assert.equal(state.counters.honestChoices, 0);
});

test('Stats never exceed 100 or fall below 0 (clamping)', () => {
  assert.equal(modifyStat(95, 10), 100);
  assert.equal(modifyStat(100, 5), 100);
  assert.equal(modifyStat(5, -10), 0);
  assert.equal(modifyStat(0, -5), 0);
  assert.equal(modifyStat(50, 15), 65);
});

test('Choice tags update counters correctly', () => {
  const state = createInitialTwoHoursApartState();
  processChoiceTags(state, ['honest', 'relationship']);
  assert.equal(state.counters.honestChoices, 1);
  assert.equal(state.counters.relationshipChoices, 1);
  assert.equal(state.counters.avoidanceChoices, 0);

  processChoiceTags(state, ['avoidant', 'sacrifice']);
  assert.equal(state.counters.avoidanceChoices, 1);
  assert.equal(state.counters.sacrificeChoices, 1);
});

test('Flags toggle and mutate correctly', () => {
  const state = createInitialTwoHoursApartState();
  state.flags.confessedFeelings = true;
  state.flags.relationshipStarted = true;
  assert.equal(state.flags.confessedFeelings, true);
  assert.equal(state.flags.relationshipStarted, true);
});

test('Secret route requires all conditions', () => {
  const state = createInitialTwoHoursApartState();

  assert.equal(qualifiesForSecretEnding(state), false);

  state.flags.secretMemoryUnlocked = true;
  state.flags.secretRouteUnlocked = true;
  state.relationship.trustAgus = 75;
  state.relationship.communication = 75;
  state.relationship.independence = 65;
  state.hidden.futureCompatibility = 70;
  state.hidden.unspokenProblems = 20;
  state.hidden.emotionalDistance = 20;
  state.counters.honestChoices = 5;
  state.counters.avoidanceChoices = 1;

  assert.equal(qualifiesForSecretEnding(state), true);

  state.counters.avoidanceChoices = 3;
  assert.equal(qualifiesForSecretEnding(state), false);
});

test('Ending E evaluates with highest priority', () => {
  const state = createInitialTwoHoursApartState();
  state.flags.secretMemoryUnlocked = true;
  state.flags.secretRouteUnlocked = true;
  state.relationship.trustAgus = 80;
  state.relationship.communication = 80;
  state.relationship.independence = 65;
  state.hidden.futureCompatibility = 70;
  state.hidden.unspokenProblems = 10;
  state.hidden.emotionalDistance = 10;
  state.counters.honestChoices = 4;
  state.counters.avoidanceChoices = 0;

  assert.equal(evaluateEnding(state), 'END_E');
});

test('Ending D (Too Late) evaluates when emotional distance or unspoken problems are high', () => {
  const state = createInitialTwoHoursApartState();
  state.hidden.emotionalDistance = 70;
  state.hidden.unspokenProblems = 70;

  assert.equal(qualifiesForTooLate(state), true);
  assert.equal(evaluateEnding(state), 'END_D');
});

test('Ending A (Same Direction) evaluates correctly for healthy mutual trajectory', () => {
  const state = createInitialTwoHoursApartState();
  state.relationship.trustAgus = 70;
  state.relationship.communication = 70;
  state.relationship.independence = 55;
  state.hidden.futureCompatibility = 60;
  state.hidden.unspokenProblems = 25;
  state.hidden.emotionalDistance = 20;

  assert.equal(qualifiesForSameDirection(state), true);
  assert.equal(evaluateEnding(state), 'END_A');
});

test('Ending B (Two Paths) evaluates correctly for independent divergent career paths', () => {
  const state = createInitialTwoHoursApartState();
  state.relationship.independence = 75;
  state.relationship.communication = 60;
  state.hidden.futureCompatibility = 45;
  state.counters.careerChoices = 2;
  state.counters.relationshipChoices = 1;

  assert.equal(qualifiesForTwoPaths(state), true);
  assert.equal(evaluateEnding(state), 'END_B');
});

test('Ending C (Still Us) evaluates for affectionate but high sacrifice relationship', () => {
  const state = createInitialTwoHoursApartState();
  state.relationship.affectionAgus = 75;
  state.relationship.sacrifice = 70;
  state.relationship.communication = 50;
  state.hidden.relationshipFatigue = 45;

  assert.equal(qualifiesForStillUs(state), true);
  assert.equal(evaluateEnding(state), 'END_C');
});

test('Every possible arbitrary state reaches a valid ending (no unhandled states)', () => {
  const arbitraryStates = [
    createInitialTwoHoursApartState(),
    { ...createInitialTwoHoursApartState(), relationship: { ...createInitialTwoHoursApartState().relationship, affectionAgus: 60 } },
    { ...createInitialTwoHoursApartState(), relationship: { ...createInitialTwoHoursApartState().relationship, affectionAgus: 30 } },
    { ...createInitialTwoHoursApartState(), hidden: { ...createInitialTwoHoursApartState().hidden, emotionalDistance: 90 } },
  ];

  for (const s of arbitraryStates) {
    const ending = evaluateEnding(s);
    assert.ok(['END_A', 'END_B', 'END_C', 'END_D', 'END_E'].includes(ending));
  }
});

test('Character sprite resolution correctly maps Nana and Agus canonical expressions', async () => {
  const { resolveCharacterSprite } = await import('../data/assets/assetManifest.ts');
  const fs = await import('node:fs');
  const path = await import('node:path');

  const nanaSmile = resolveCharacterSprite('Nana', 'smiling');
  assert.ok(nanaSmile);
  assert.equal(nanaSmile.id, 'char_nana_bust_smile_01');
  assert.equal(nanaSmile.character, 'nana');
  assert.equal(nanaSmile.transparent, true);

  const nanaPensive = resolveCharacterSprite('Nana', 'pensive');
  assert.ok(nanaPensive);
  assert.equal(nanaPensive.id, 'char_nana_bust_pensive_01');

  const nanaEmo = resolveCharacterSprite('Nana', 'emotional');
  assert.ok(nanaEmo);
  assert.equal(nanaEmo.id, 'char_nana_bust_emotional_01');

  const agusSmile = resolveCharacterSprite('Agus', 'smiling');
  assert.ok(agusSmile);
  assert.equal(agusSmile.id, 'char_agus_halfbody_reassuring_01');
  assert.equal(agusSmile.character, 'agus');

  const agusNeutral = resolveCharacterSprite('Agus', 'neutral');
  assert.ok(agusNeutral);
  assert.equal(agusNeutral.id, 'char_agus_bust_neutral_01');

  const agusTired = resolveCharacterSprite('Agus', 'tired');
  assert.ok(agusTired);
  assert.equal(agusTired.id, 'char_agus_bust_tired_01');

  const agusPhone = resolveCharacterSprite('Agus', 'laughing');
  assert.ok(agusPhone);
  assert.equal(agusPhone.id, 'char_agus_bust_talking_phone_01');

  const missing = resolveCharacterSprite('unknown_character', 'happy');
  assert.equal(missing, null);

  const sprites = [nanaSmile, nanaPensive, nanaEmo, agusSmile, agusNeutral, agusTired, agusPhone];
  for (const sp of sprites) {
    const prodPath = path.join(process.cwd(), 'public', sp.production.replace(/^[/\\]/, ''));
    const mobPath = path.join(process.cwd(), 'public', sp.mobile.replace(/^[/\\]/, ''));
    assert.ok(fs.existsSync(prodPath), `Production sprite missing on disk: ${prodPath}`);
    assert.ok(fs.existsSync(mobPath), `Mobile sprite missing on disk: ${mobPath}`);
  }
});
