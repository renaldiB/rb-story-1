import test from 'node:test';
import assert from 'node:assert/strict';

import { characterRegistry } from '../../src/character/CharacterAssetRegistry.ts';
import { variantResolver } from '../../src/character/CharacterVariantResolver.ts';
import { assetLoader } from '../../src/character/CharacterAssetLoader.ts';

test('Primary Registry: Nana and Agus exist with correct primary metadata', () => {
  const nana = characterRegistry.getCharacter('nana');
  assert.ok(nana, 'Nana must exist');
  assert.equal(nana.id, 'nana');
  assert.equal(nana.name, 'Nana');
  assert.equal(nana.type, 'primary');
  assert.equal(nana.width, 1024);
  assert.equal(nana.height, 1536);
  assert.equal(nana.baselineY, 1460);
  assert.equal(nana.canonicalScale, 1.0);
  assert.equal(nana.baseHeight, 162);
  assert.equal(nana.status, 'PASS');
  assert.equal(nana.variants.length, 33);

  const agus = characterRegistry.getCharacter('agus');
  assert.ok(agus, 'Agus must exist');
  assert.equal(agus.id, 'agus');
  assert.equal(agus.name, 'Agus');
  assert.equal(agus.type, 'primary');
  assert.equal(agus.width, 1024);
  assert.equal(agus.height, 1536);
  assert.equal(agus.baselineY, 1460);
  assert.equal(agus.canonicalScale, 1.08);
  assert.equal(agus.baseHeight, 176);
  assert.equal(agus.status, 'PASS');
  assert.equal(agus.variants.length, 9);
});

test('Primary Registry: total cast count is 10 (2 primary + 8 secondary)', () => {
  const allChars = characterRegistry.listCharacters();
  assert.equal(allChars.length, 10, 'Total cast must be 10');

  const primaryChars = characterRegistry.listCharacters('primary');
  assert.equal(primaryChars.length, 2, 'Primary characters count must be 2');

  const secondaryChars = characterRegistry.listCharacters('secondary');
  assert.equal(secondaryChars.length, 8, 'Secondary characters count must be 8');
});

test('Primary Registry: alias normalization works for char_nana and char_agus', () => {
  assert.ok(characterRegistry.hasCharacter('char_nana'));
  assert.ok(characterRegistry.hasCharacter('char_agus'));
  assert.ok(characterRegistry.hasCharacter('nana'));
  assert.ok(characterRegistry.hasCharacter('agus'));

  const n = characterRegistry.getCharacter('char_nana');
  assert.equal(n?.id, 'nana');
  const a = characterRegistry.getCharacter('char_agus');
  assert.equal(a?.id, 'agus');
});

test('Primary Variant: resolves all 7 canonical expressions without fallback', () => {
  const chars = ['nana', 'agus'];
  const expressions = ['neutral', 'happy', 'sad', 'angry', 'surprised', 'worried', 'embarrassed'];

  for (const charId of chars) {
    for (const expr of expressions) {
      const res = variantResolver.resolve({ characterId: charId, expression: expr });
      assert.equal(res.characterId, charId);
      assert.equal(res.fallback, false, `${charId} ${expr} should not trigger fallback`);
      assert.equal(res.source, 'variant');
      assert.equal(res.baselineY, 1460);
      assert.equal(
        res.assetPath,
        `/assets/characters/primary/variants/${charId}/${charId}_${expr}.png`
      );
    }
  }
});

test('Primary Variant: resolves all 2 canonical poses without fallback', () => {
  const chars = ['nana', 'agus'];
  const poses = ['thinking', 'casual_interaction'];

  for (const charId of chars) {
    for (const pose of poses) {
      const res = variantResolver.resolve({ characterId: charId, pose });
      assert.equal(res.characterId, charId);
      assert.equal(res.fallback, false, `${charId} ${pose} should not trigger fallback`);
      assert.equal(res.source, 'variant');
      assert.equal(res.baselineY, 1460);
      assert.equal(
        res.assetPath,
        `/assets/characters/primary/variants/${charId}/${charId}_${pose}.png`
      );
    }
  }
});

// 3. FALLBACK HIERARCHY TESTS
test('Primary Fallback: ungenerated expression falls back to neutral variant', () => {
  const res = variantResolver.resolve({
    characterId: 'nana',
    expression: 'unimplemented_expression_xyz',
  });

  assert.ok(res);
  assert.equal(res.fallback, true);
  assert.equal(res.reason, 'variant_fallback_to_neutral');
  assert.equal(
    res.assetPath,
    '/assets/characters/primary/variants/nana/nana_neutral.png'
  );
});

test('Primary Fallback: non-existent character returns safe fallback without crash', () => {
  const res = variantResolver.resolve({
    characterId: 'char_ghost_npc',
    expression: 'neutral',
  });

  assert.ok(res);
  assert.equal(res.fallback, true);
  assert.equal(res.source, 'fallback');
  assert.equal(res.reason, 'character_not_found');
  assert.ok(res.assetPath.length > 0);
});

// 4. ASSET LOADER TESTS
test('Primary Loader: deduplicates concurrent requests for primary variant', async () => {
  const url = '/assets/characters/primary/variants/nana/nana_happy.png';
  const p1 = assetLoader.loadAsset(url);
  const p2 = assetLoader.loadAsset(url);

  assert.strictEqual(p1, p2, 'Concurrent requests for same asset URL must share promise');

  const img1 = await p1;
  const img2 = await p2;
  assert.ok(img1);
  assert.ok(img2);
  assert.equal(assetLoader.isCached(url), true);
});

// 5. SCALE HIERARCHY TESTS
test('Primary Scale: Agus and Nana scale aligns with canonical height hierarchy', () => {
  const agus = characterRegistry.getCharacter('agus')!;
  const ayah = characterRegistry.getCharacter('ayah')!;
  const kaka = characterRegistry.getCharacter('kaka')!;
  const nana = characterRegistry.getCharacter('nana')!;
  const ibu = characterRegistry.getCharacter('ibu')!;

  assert.ok(agus.canonicalScale > ayah.canonicalScale, 'Agus (1.08) > Ayah (1.04)');
  assert.ok(nana.canonicalScale > ibu.canonicalScale, 'Nana (1.00) > Ibu (0.93)');
});

// 6. NANA FLOW ASSET INTEGRATION TESTS
test('Nana Flow: resolves all 12 canonical poses', () => {
  const poses = [
    'relaxed_standing',
    'hands_in_pockets',
    'arms_folded',
    'one_hand_near_chest',
    'looking_away',
    'looking_down',
    'walking_forward',
    'pausing_mid_walk',
    'reaching_out',
    'hand_on_object_surface',
    'sitting',
    'supportive_leaning_in'
  ];

  for (const pose of poses) {
    const res = variantResolver.resolve({ characterId: 'nana', pose });
    assert.equal(res.characterId, 'nana');
    assert.equal(res.fallback, false, `nana pose ${pose} should not trigger fallback`);
    assert.equal(res.assetPath, `/assets/characters/primary/variants/nana/nana_pose_${pose}.png`);
  }
});

test('Nana Flow: resolves all 12 canonical expressions', () => {
  const expressions = [
    'neutral',
    'gentle_happy',
    'joy',
    'curious',
    'surprised',
    'worried',
    'nervous',
    'embarrassed',
    'sad',
    'vulnerable',
    'frustrated',
    'relieved'
  ];

  for (const expr of expressions) {
    const res = variantResolver.resolve({ characterId: 'nana', expression: expr });
    assert.equal(res.characterId, 'nana');
    assert.equal(res.fallback, false, `nana expression ${expr} should not trigger fallback`);
    assert.ok(res.assetPath.includes('nana_'), `nana expression ${expr} resolved ${res.assetPath}`);
  }
});

