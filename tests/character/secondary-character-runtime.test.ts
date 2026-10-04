import test from 'node:test';
import assert from 'node:assert/strict';

import { characterRegistry } from '../../src/character/CharacterAssetRegistry.ts';
import { variantResolver } from '../../src/character/CharacterVariantResolver.ts';
import { assetLoader } from '../../src/character/CharacterAssetLoader.ts';
import { CharacterStateMachine } from '../../src/character/CharacterStateMachine.ts';

test('Registry: getCharacter returns valid character and metadata', () => {
  const kaka = characterRegistry.getCharacter('kaka');
  assert.ok(kaka, 'Kaka must exist in registry');
  assert.equal(kaka.id, 'kaka');
  assert.equal(kaka.name, 'Kaka');
  assert.equal(kaka.type, 'secondary');
  assert.equal(kaka.width, 1024);
  assert.equal(kaka.height, 1536);
  assert.equal(kaka.baselineY, 1460);
  assert.equal(kaka.canonicalScale, 1.0);
  assert.equal(kaka.variants.length, 18);
});

test('Registry: all 8 canonical secondary characters are registered', () => {
  const chars = characterRegistry.listCharacters('secondary');
  assert.equal(chars.length, 8, 'Must have exactly 8 secondary characters');

  const expectedIds = ['kaka', 'raka', 'dita', 'fikri', 'maya', 'bimo', 'ibu', 'ayah'];
  for (const id of expectedIds) {
    assert.ok(characterRegistry.hasCharacter(id), `Missing character: ${id}`);
    const c = characterRegistry.getCharacter(id);
    assert.equal(c?.status, 'PASS');
    assert.equal(c?.baselineY, 1460);
  }
});

test('Registry: handles prefix and canonical alias normalization', () => {
  assert.ok(characterRegistry.hasCharacter('char_kaka'));
  assert.ok(characterRegistry.hasCharacter('char_ibu_nana'));
  assert.ok(characterRegistry.hasCharacter('ibu nana'));
  assert.ok(characterRegistry.hasCharacter('char_ayah_nana'));

  const ibu = characterRegistry.getCharacter('char_ibu_nana');
  assert.equal(ibu?.id, 'ibu');
  assert.equal(ibu?.name, 'Ibu');
});

// 2. VARIANT RESOLVER TESTS
test('Variant: resolve expression and pose returns valid production path', () => {
  const resWorried = variantResolver.resolve({
    characterId: 'kaka',
    expression: 'worried',
  });

  assert.equal(resWorried.characterId, 'kaka');
  assert.equal(resWorried.fallback, false);
  assert.equal(
    resWorried.assetPath,
    '/assets/characters/secondary/variants/kaka/expression/secondary_kaka_expression_worried.png'
  );
  assert.equal(resWorried.baselineY, 1460);
  assert.equal(resWorried.canonicalScale, 1.0);

  const resPose = variantResolver.resolve({
    characterId: 'raka',
    pose: 'looking_away',
  });
  assert.equal(resPose.characterId, 'raka');
  assert.equal(resPose.fallback, false);
  assert.equal(
    resPose.assetPath,
    '/assets/characters/secondary/variants/raka/pose/secondary_raka_pose_looking_away.png'
  );
});

test('Variant: all 8 characters resolve core P0 expressions without fallback', () => {
  const chars = ['kaka', 'raka', 'dita', 'fikri', 'maya', 'bimo', 'ibu', 'ayah'];
  const coreExprs = ['soft_smile', 'neutral', 'happy', 'serious', 'worried'];

  for (const charId of chars) {
    for (const expr of coreExprs) {
      const res = variantResolver.resolve({ characterId: charId, expression: expr });
      assert.equal(res.characterId, charId);
      assert.equal(res.source, 'variant');
      assert.ok(res.assetPath.endsWith('.png'));
      assert.equal(res.baselineY, 1460);
    }
  }
});

// 3. FALLBACK HIERARCHY TESTS
test('Fallback: ungenerated variant falls back gracefully to sprite master or matching variant', () => {
  // 'arms_crossed' is a P3 planned variant not yet generated
  const res = variantResolver.resolve({
    characterId: 'kaka',
    pose: 'arms_crossed',
  });

  assert.ok(res);
  assert.ok(res.fallback, 'Should mark as fallback');
  assert.ok(res.assetPath.includes('secondary_kaka'), 'Should resolve to Kaka sprite');
});

test('Fallback: completely nonexistent character returns safe fallback without crash', () => {
  const res = variantResolver.resolve({
    characterId: 'completely_unknown_npc',
    expression: 'smiling',
  });

  assert.ok(res);
  assert.equal(res.fallback, true);
  assert.equal(res.source, 'fallback');
  assert.equal(res.reason, 'character_not_found');
  assert.ok(res.assetPath.length > 0);
});

// 4. ASSET LOADER & DEDUPLICATION TESTS
test('Loader: duplicate load requests return the exact same loading promise', async () => {
  const url = '/assets/characters/secondary/variants/kaka/expression/secondary_kaka_expression_happy.png';
  const p1 = assetLoader.loadAsset(url);
  const p2 = assetLoader.loadAsset(url);

  assert.strictEqual(p1, p2, 'Concurrent requests for the same asset must share the same promise');

  const img1 = await p1;
  const img2 = await p2;
  assert.ok(img1);
  assert.ok(img2);
  assert.equal(assetLoader.isCached(url), true);
});

// 5. CHARACTER STATE MACHINE TESTS
test('StateMachine: enforces legal transition sequence HIDDEN -> ENTERING -> VISIBLE -> EXITING -> HIDDEN', () => {
  const sm = new CharacterStateMachine('HIDDEN');
  assert.equal(sm.getState(), 'HIDDEN');

  // Legal transitions
  assert.ok(sm.enter());
  assert.equal(sm.getState(), 'ENTERING');

  assert.ok(sm.setVisible());
  assert.equal(sm.getState(), 'VISIBLE');

  assert.ok(sm.startVariantTransition());
  assert.equal(sm.getState(), 'TRANSITIONING');

  assert.ok(sm.setVisible());
  assert.equal(sm.getState(), 'VISIBLE');

  assert.ok(sm.exit());
  assert.equal(sm.getState(), 'EXITING');

  assert.ok(sm.hide());
  assert.equal(sm.getState(), 'HIDDEN');
});

test('StateMachine: rejects illegal transitions', () => {
  const sm = new CharacterStateMachine('HIDDEN');
  // Cannot jump directly from HIDDEN to TRANSITIONING
  assert.equal(sm.canTransitionTo('TRANSITIONING'), false);
  assert.equal(sm.transitionTo('TRANSITIONING'), false);
  assert.equal(sm.getState(), 'HIDDEN');
});

// 6. RESPONSIVE SCALE & PROPORTIONS TESTS
test('Proportions: relative canonical scale preserves vertical hierarchy', () => {
  const ayah = characterRegistry.getCharacter('ayah')!;
  const kaka = characterRegistry.getCharacter('kaka')!;
  const dita = characterRegistry.getCharacter('dita')!;
  const ibu = characterRegistry.getCharacter('ibu')!;

  assert.ok(ayah.canonicalScale > kaka.canonicalScale, 'Ayah must be taller than Kaka');
  assert.ok(kaka.canonicalScale > dita.canonicalScale, 'Kaka must be taller than Dita');
  assert.ok(dita.canonicalScale >= ibu.canonicalScale, 'Dita must be taller than/equal to Ibu');
});
