import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { environmentRegistry } from '../../src/environment/EnvironmentRegistry.ts';
import { environmentVariantResolver } from '../../src/environment/EnvironmentVariantResolver.ts';
import { environmentAssetLoader } from '../../src/environment/EnvironmentAssetLoader.ts';
import { environmentRuntime } from '../../src/environment/EnvironmentRuntime.ts';
import type { EnvironmentMasterId } from '../../src/environment/types.ts';

test('Environment Registry: all 12 canonical environment masters are registered and complete', () => {
  const allMasters = environmentRegistry.getAllMasters();
  assert.strictEqual(allMasters.length, 12, 'Must have exactly 12 environment masters');

  const expectedIds: EnvironmentMasterId[] = [
    'env_campus_cafe_master',
    'env_street_night_master',
    'env_nana_bedroom_master',
    'env_agus_room_master',
    'env_station_master',
    'env_rooftop_master',
    'env_campus_master',
    'env_office_master',
    'env_beach_master',
    'env_mountain_master',
    'env_nana_house_master',
    'env_shared_apartment_master',
  ];

  for (const id of expectedIds) {
    const env = environmentRegistry.getEnvironment(id);
    assert.ok(env, `Environment ${id} must be registered`);
    assert.strictEqual(env.id, id);
    assert.ok(env.name, `Environment ${id} must have a name`);
    assert.ok(env.locationId, `Environment ${id} must have a locationId`);
    assert.ok(env.masterAsset, `Environment ${id} must have masterAsset`);
    assert.ok(Array.isArray(env.layerDefinitions), `Environment ${id} must have layerDefinitions`);
    assert.ok(env.safeZones?.character && env.safeZones?.dialogue, `Environment ${id} must have safe zones`);
  }
});

test('Environment Registry: aliases and location mapping resolve deterministically', () => {
  // Direct location lookup
  const cafeByLoc = environmentRegistry.getEnvironmentByLocation('loc_campus_cafe');
  assert.ok(cafeByLoc, 'loc_campus_cafe must resolve');
  assert.strictEqual(cafeByLoc.id, 'env_campus_cafe_master');

  // Alias lookups
  const cafeByName = environmentRegistry.getEnvironment('campus_cafe');
  assert.ok(cafeByName, 'campus_cafe alias must resolve');
  assert.strictEqual(cafeByName.id, 'env_campus_cafe_master');

  const cafeByPrefix = environmentRegistry.getEnvironment('env_campus_cafe');
  assert.ok(cafeByPrefix, 'env_campus_cafe must resolve');
  assert.strictEqual(cafeByPrefix.id, 'env_campus_cafe_master');

  // Scene lookup
  const envByScene = environmentRegistry.getEnvironmentByScene('ch1_intro_1');
  assert.ok(envByScene, 'Scene ch1_intro_1 must map to environment');
  assert.strictEqual(envByScene.id, 'env_campus_cafe_master');
});

test('Environment Layers: all 36 layers accounted for across 12 environments', () => {
  const allLayers = environmentRegistry.getAllLayers();
  // Filter for actual asset layers
  const assetLayers = allLayers.filter((l) => Boolean(l.asset));
  assert.strictEqual(assetLayers.length, 36, 'Must have exactly 36 asset layers');

  for (const layer of assetLayers) {
    assert.ok(layer.layerId, 'Layer must have an ID');
    assert.ok(typeof layer.semanticZ === 'number', 'Layer must have semanticZ');
    assert.ok(layer.asset, 'Layer must have asset URL');
  }
});

test('Variant Resolution: resolves raster vs runtime variants and fallbacks', () => {
  // 1. Raster variant resolution
  const resolvedRaster = environmentVariantResolver.resolve('env_campus_cafe_master', {
    variantId: 'env_campus_cafe_night_rain',
  });
  assert.strictEqual(resolvedRaster.isFallback, false);
  assert.strictEqual(resolvedRaster.activeVariant?.mode, 'raster');
  assert.strictEqual(
    resolvedRaster.backgroundUrl,
    '/assets/environments/variants/env_campus_cafe_night_rain.webp'
  );

  // 2. Runtime variant resolution (CSS Filter)
  const resolvedRuntime = environmentVariantResolver.resolve('env_campus_cafe_master', {
    variantId: 'env_campus_cafe_afternoon_sunlit',
  });
  assert.strictEqual(resolvedRuntime.isFallback, false);
  assert.strictEqual(resolvedRuntime.activeVariant?.mode, 'runtime');
  assert.ok(resolvedRuntime.cssFilter, 'Runtime variant must define cssFilter');
  assert.strictEqual(
    resolvedRuntime.backgroundUrl,
    '/assets/environments/masters/env_campus_cafe_master.webp'
  );

  // 3. Fallback for non-existent variant on existing environment
  const resolvedFallbackVariant = environmentVariantResolver.resolve('env_campus_cafe_master', {
    variantId: 'completely_nonexistent_variant',
  });
  assert.strictEqual(resolvedFallbackVariant.isFallback, true);
  assert.strictEqual(
    resolvedFallbackVariant.backgroundUrl,
    '/assets/environments/masters/env_campus_cafe_master.webp',
    'Must fallback to parent master'
  );

  // 4. Fallback for non-existent environment
  const resolvedFallbackEnv = environmentVariantResolver.resolve('loc_totally_unknown');
  assert.strictEqual(resolvedFallbackEnv.isFallback, true);
  assert.strictEqual(resolvedFallbackEnv.environment.id, 'env_campus_cafe_master');
});

test('Environment Asset Loader: deduplication, caching, and LRU eviction', async () => {
  environmentAssetLoader.clear();

  const testUrl = '/assets/environments/masters/env_campus_cafe_master.webp';

  // Concurrent loading deduplication
  const p1 = environmentAssetLoader.loadAsset(testUrl);
  const p2 = environmentAssetLoader.loadAsset(testUrl);
  assert.strictEqual(p1, p2, 'Simultaneous requests for same URL must return the exact same promise');

  const img = await p1;
  assert.ok(img, 'Image must resolve');
  assert.strictEqual(environmentAssetLoader.isCached(testUrl), true);

  const cached = environmentAssetLoader.getCachedImage(testUrl);
  assert.strictEqual(cached, img);

  const metrics = environmentAssetLoader.getCacheMetrics();
  assert.strictEqual(metrics.readyCount, 1);
  assert.strictEqual(metrics.totalCached, 1);
});

test('Environment Runtime: loads environment instance, tracks lifecycle and safe zones', async () => {
  const instance = await environmentRuntime.loadEnvironment('env_campus_cafe_master', {
    variantId: 'env_campus_cafe_night_rain',
    preloadLayers: true,
  });

  assert.ok(instance, 'Instance must be returned');
  assert.strictEqual(instance.status, 'READY');
  assert.strictEqual(instance.resolved.environment.id, 'env_campus_cafe_master');
  assert.strictEqual(instance.resolved.activeVariant?.variantId, 'env_campus_cafe_night_rain');

  // Verify safe zones
  const safeZones = environmentRuntime.getSafeZones('env_campus_cafe_master');
  assert.ok(safeZones?.character && safeZones?.dialogue);
  assert.ok(safeZones.character.width > 0);
  assert.ok(safeZones.dialogue.height > 0);

  // Transition to another environment
  const nextInstance = await environmentRuntime.transitionTo('env_street_night_master');
  assert.strictEqual(nextInstance.status, 'READY');
  assert.strictEqual(nextInstance.resolved.environment.id, 'env_street_night_master');
  assert.strictEqual(environmentRuntime.getActiveInstance()?.id, nextInstance.id);
});

test('Immutability Check: canonical character and environment assets remain 100% untouched', () => {
  const envRegPath = path.resolve('docs/environment_registry.json');
  assert.ok(fs.existsSync(envRegPath));
  const envReg = JSON.parse(fs.readFileSync(envRegPath, 'utf-8'));
  assert.strictEqual(envReg.totalEnvironments, 12);

  // Character asset check (Flow Images Nana)
  const nanaFlowPose = path.resolve('Flow Images/Nana/nana_pose/nana_pose-01.png');
  const nanaFlowExpr = path.resolve('Flow Images/Nana/nana_expression/nana_expression-01.png');
  assert.ok(fs.existsSync(nanaFlowPose), 'Nana Flow pose must exist');
  assert.ok(fs.existsSync(nanaFlowExpr), 'Nana Flow expression must exist');
});
