import test from 'node:test';
import assert from 'node:assert/strict';

import { DeviceProfile } from '../core/performance/DeviceProfile.ts';
import { QualityScaler } from '../core/performance/QualityScaler.ts';
import { AnimationManager } from '../core/performance/AnimationManager.ts';
import { AssetManager } from '../core/performance/AssetManager.ts';
import { PerformanceManager } from '../core/performance/PerformanceManager.ts';

test('DeviceProfile correctly detects environment and bounds DPR to max 2', () => {
  DeviceProfile.reset();
  const profile = DeviceProfile.get();

  assert.ok(profile.dpr >= 1 && profile.dpr <= 2, `DPR must be capped at 2, got ${profile.dpr}`);
  assert.ok(profile.hardwareConcurrency >= 1);
  assert.ok(['ultra', 'high', 'medium', 'low'].includes(profile.recommendedQuality));
});

test('QualityScaler budgets particles and enforces hysteresis for FPS degradation and recovery', () => {
  const scaler = new QualityScaler('high', false);
  assert.equal(scaler.quality, 'high');

  const highBudget = scaler.getParticleBudget();
  assert.equal(highBudget.rain, 50);

  // 1-2 frames of drop should not degrade yet (hysteresis prevention)
  scaler.reportFPS(42);
  scaler.reportFPS(45);
  assert.equal(scaler.quality, 'high');

  // 3rd consecutive low frame triggers degradation to medium
  scaler.reportFPS(40);
  assert.equal(scaler.quality, 'medium');

  const medBudget = scaler.getParticleBudget();
  assert.equal(medBudget.rain, 30);

  // 1 to 7 frames of recovery should not recover immediately
  for (let i = 0; i < 7; i++) {
    scaler.reportFPS(59);
    assert.equal(scaler.quality, 'medium');
  }

  // 8th consecutive stable frame recovers back to high
  scaler.reportFPS(60);
  assert.equal(scaler.quality, 'high');
});

test('QualityScaler correctly provides reduced particle budgets on mobile viewports', () => {
  const desktopScaler = new QualityScaler('high', false);
  const mobileScaler = new QualityScaler('high', true);

  const desktopBudget = desktopScaler.getParticleBudget();
  const mobileBudget = mobileScaler.getParticleBudget();

  assert.ok(
    mobileBudget.rain < desktopBudget.rain,
    `Mobile rain (${mobileBudget.rain}) must be smaller than desktop (${desktopBudget.rain})`
  );
  assert.ok(
    mobileBudget.fog < desktopBudget.fog,
    `Mobile fog (${mobileBudget.fog}) must be smaller than desktop (${desktopBudget.fog})`
  );
});

test('AnimationManager dispatches manual ticks and handles subscriptions', () => {
  AnimationManager.resetInstance();
  const anim = AnimationManager.getInstance();

  let tickCount = 0;
  let receivedDt = 0;

  const unsubscribe = anim.subscribe((dt) => {
    tickCount++;
    receivedDt = dt;
  });

  assert.equal(anim.getSubscriberCount(), 1);

  anim.manualTick(0.016, 1000);
  assert.equal(tickCount, 1);
  assert.equal(receivedDt, 0.016);

  unsubscribe();
  assert.equal(anim.getSubscriberCount(), 0);

  anim.manualTick(0.016, 1016);
  assert.equal(tickCount, 1); // No further calls after unsubscribe
});

test('AssetManager tracks asset states, preloads, activates, and releases scenes', async () => {
  AssetManager.resetInstance();
  const assetMgr = AssetManager.getInstance();

  const sceneId = 'scene_test_01';
  const dummyAsset = 'mock-asset-bg.webp';

  assetMgr.registerSceneAssets(sceneId, [dummyAsset]);
  assert.equal(assetMgr.getAssetState(dummyAsset), 'unloaded');

  await assetMgr.preloadScene(sceneId);
  assert.equal(assetMgr.getAssetState(dummyAsset), 'cached');

  assetMgr.activateScene(sceneId);
  assert.equal(assetMgr.getAssetState(dummyAsset), 'active');

  assetMgr.releaseScene(sceneId);
  assert.equal(assetMgr.getAssetState(dummyAsset), 'unloaded');
});

test('PerformanceManager coordinates metrics and reports complete HUD data', () => {
  PerformanceManager.resetInstance();
  const perf = PerformanceManager.getInstance();

  perf.setActiveParticles(42);
  const metrics = perf.getMetrics();

  assert.ok(metrics.fps >= 0);
  assert.ok(metrics.frameTimeMs >= 0);
  assert.equal(metrics.activeParticles, 42);
  assert.ok(['ultra', 'high', 'medium', 'low'].includes(metrics.quality));
  assert.ok(metrics.device.dpr <= 2);
  assert.ok(metrics.particleBudget.rain > 0);

  perf.dispose();
});
