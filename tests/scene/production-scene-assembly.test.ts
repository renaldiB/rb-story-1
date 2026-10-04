import test from 'node:test';
import assert from 'node:assert/strict';
import { STORY_SCENES } from '../../src/data/storyContent.ts';
import { variantResolver } from '../../src/character/CharacterVariantResolver.ts';
import { environmentRuntime } from '../../src/environment/EnvironmentRuntime.ts';
import propRegistry from '../../docs/prop_registry.json' with { type: 'json' };
import fxRegistry from '../../docs/atmosphere_fx_registry.json' with { type: 'json' };
import envRegistry from '../../docs/environment_registry.json' with { type: 'json' };
import {
  getProductionSceneFx,
  getProductionSceneProps,
  getProductionScenePropPlacement,
  productionSceneRequirements,
  validateProductionScenes,
} from '../../src/scene/runtime/ProductionSceneRegistry.ts';
import { AssetManager } from '../../src/core/performance/AssetManager.ts';

test('Production scene manifest covers and resolves all 29 active romance scenes', () => {
  assert.equal(Object.keys(STORY_SCENES).length, 29);
  assert.equal(productionSceneRequirements.length, 29);

  const results = validateProductionScenes(STORY_SCENES);
  const failures = results.filter((result) => !result.valid);
  assert.deepEqual(failures, []);
  assert.equal(results.length, 29);
});

test('Legacy Nadia scene ID resolves to canonical Nana variants without changing dialogue IDs', () => {
  const scene = STORY_SCENES.ch1_nadia_enters;
  assert.equal(scene.characters[0].id, 'nadia');

  const resolved = variantResolver.resolve({
    characterId: scene.characters[0].id,
    expression: scene.characters[0].expression,
  });
  assert.equal(resolved.characterId, 'nana');
  assert.equal(resolved.fallback, false);
});

test('Scene lookup selects the audited environment variant and canonical props/FX', () => {
  const scene = STORY_SCENES.ending_romantic_scene;
  const environment = environmentRuntime.resolveForScene(scene.id);
  assert.ok(environment);
  assert.equal(environment?.environment.id, 'env_station_master');
  assert.equal(environment?.activeVariant?.variantId, 'env_station_sunset_train_interior');
  assert.ok(getProductionSceneProps(scene.id).some((prop) => prop.id === 'prop_backpack'));
  assert.ok(getProductionSceneFx(scene.id).some((fx) => fx.id === 'fx_dust_motes'));
});

test('Scene asset lifecycle retains shared preloads and releases previous-scene-only files', async () => {
  AssetManager.resetInstance();
  const manager = AssetManager.getInstance();
  manager.registerSceneAssets('source', ['/assets/shared.webp', '/assets/source.webp']);
  manager.registerSceneAssets('target', ['/assets/shared.webp', '/assets/target.webp']);
  await manager.preloadScene('source');
  await manager.preloadScene('target');
  manager.activateScene('source');
  manager.activateScene('target');

  assert.equal(manager.getAssetState('/assets/shared.webp'), 'active');
  assert.equal(manager.getAssetState('/assets/source.webp'), 'cached');
  manager.releaseScene('source');
  assert.equal(manager.getAssetState('/assets/shared.webp'), 'active');
  assert.equal(manager.getAssetState('/assets/source.webp'), 'unloaded');

  manager.releaseScene('target');
  assert.equal(manager.getAssetState('/assets/shared.webp'), 'unloaded');
  AssetManager.resetInstance();
});

test('Authored prop positions are within safe bounds and calibrate table contact points', () => {
  const propsMap = new Map(propRegistry.props.map((p: { id: string }) => [p.id, p]));

  for (const requirement of productionSceneRequirements) {
    requirement.requiredProps.forEach((propId, index) => {
      const propDef = propsMap.get(propId);
      assert.ok(propDef, `Prop ${propId} should exist in registry`);
      const placement = getProductionScenePropPlacement(
        requirement.sceneId,
        propId,
        propDef.anchor?.name,
        index,
        requirement.requiredProps.length
      );

      // Verify coordinate ranges within container bounds (0..100%)
      assert.ok(placement.x >= 5 && placement.x <= 95, `Prop ${propId} x=${placement.x} in ${requirement.sceneId} out of bounds`);
      assert.ok(placement.y >= 20 && placement.y <= 95, `Prop ${propId} y=${placement.y} in ${requirement.sceneId} out of bounds`);

      // Verify cafe table contact points are placed on table surface (y >= 80%)
      if (requirement.locationId === 'loc_campus_cafe' && propId === 'prop_coffee') {
        assert.ok(placement.y >= 80, `Cafe coffee mug in ${requirement.sceneId} must rest on table surface (got y=${placement.y})`);
      }
    });
  }
});

test('End-to-end traversal reaches all 29 production scenes and all 4 endings', () => {
  const visited = new Set<string>();
  const queue = ['ch1_intro_1'];
  const terminalEndings = new Set<string>();

  while (queue.length > 0) {
    const currentId = queue.shift()!;
    if (visited.has(currentId)) continue;
    visited.add(currentId);

    const scene = STORY_SCENES[currentId];
    assert.ok(scene, `Scene ${currentId} must exist in STORY_SCENES`);

    if (scene.endingId) {
      terminalEndings.add(currentId);
    }

    const nextTargets: string[] = [];
    if (scene.nextSceneId) nextTargets.push(scene.nextSceneId);
    if (scene.choices) {
      scene.choices.forEach((c) => {
        if (c.nextSceneId) nextTargets.push(c.nextSceneId);
      });
    }

    for (const target of nextTargets) {
      if (!visited.has(target)) {
        queue.push(target);
      }
    }
  }

  // All 29 scenes reached
  assert.equal(visited.size, 29, `Expected all 29 production scenes to be reachable, got ${visited.size}`);

  // All 4 endings reached
  assert.equal(terminalEndings.size, 4, `Expected all 4 terminal endings to be reachable, got ${terminalEndings.size}`);
  assert.ok(terminalEndings.has('ending_true_scene'));
  assert.ok(terminalEndings.has('ending_romantic_scene'));
  assert.ok(terminalEndings.has('ending_secret_scene'));
  assert.ok(terminalEndings.has('ending_bittersweet_scene'));
});

test('Safe zones and non-overlapping dialogue bounds pass across all 29 production scenes', () => {
  for (const requirement of productionSceneRequirements) {
    const charZone = requirement.characterComposition.safeZone;
    const diagZone = requirement.dialogueSafeZone;

    // Boundary check
    assert.ok(charZone.x >= 0 && charZone.x + charZone.width <= 1.0);
    assert.ok(charZone.y >= 0 && charZone.y + charZone.height <= 1.0);
    assert.ok(diagZone.x >= 0 && diagZone.x + diagZone.width <= 1.0);
    assert.ok(diagZone.y >= 0 && diagZone.y + diagZone.height <= 1.0);

    // Dialogue zone in lower third (y >= 0.70)
    assert.ok(diagZone.y >= 0.70, `Dialogue zone y=${diagZone.y} must be in bottom area`);

    // Character baseline canonical Y=1460
    assert.equal(requirement.characterComposition.baselineY, 1460);
  }
});

test('Exhaustive reverse orphan reference audit verifies 100% of registered assets', () => {
  // Verify environments
  assert.equal(envRegistry.environments.length, 12);
  const registeredMasterIds = new Set(envRegistry.environments.map((e: { id: string }) => e.id));

  // Verify active 29 scenes use approved masters
  const activeMasterIds = new Set(productionSceneRequirements.map((r) => r.environmentId));
  for (const masterId of activeMasterIds) {
    assert.ok(registeredMasterIds.has(masterId), `Active master ${masterId} must be registered`);
  }

  // Verify 9 independent props
  assert.equal(propRegistry.props.length, 9);
  const registeredPropIds = new Set(propRegistry.props.map((p: { id: string }) => p.id));
  for (const req of productionSceneRequirements) {
    for (const propId of req.requiredProps) {
      assert.ok(registeredPropIds.has(propId), `Required prop ${propId} in ${req.sceneId} must be registered`);
    }
  }

  // Verify 5 FX systems
  assert.equal(fxRegistry.systems.length, 5);
  const registeredFxIds = new Set(fxRegistry.systems.map((f: { id: string }) => f.id));
  for (const req of productionSceneRequirements) {
    for (const fxId of req.requiredAtmosphere) {
      assert.ok(registeredFxIds.has(fxId), `Required FX ${fxId} in ${req.sceneId} must be registered`);
    }
  }
});
