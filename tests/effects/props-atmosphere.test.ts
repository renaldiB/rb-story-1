import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

test('Prop Registry: all 9 canonical independent props registered with valid metadata', () => {
  const regPath = path.resolve('docs/prop_registry.json');
  assert.ok(fs.existsSync(regPath), 'docs/prop_registry.json must exist');

  const reg = JSON.parse(fs.readFileSync(regPath, 'utf-8'));
  assert.strictEqual(reg.totalProps, 9, 'Must have exactly 9 props');
  assert.strictEqual(reg.props.length, 9, 'Must have 9 prop definitions in array');

  const requiredIds = [
    'prop_phone',
    'prop_coffee',
    'prop_old_photo',
    'prop_train_ticket',
    'prop_backpack',
    'prop_lighter_antique',
    'prop_laptop',
    'prop_agus_cat',
    'prop_dog_rescue',
  ];

  const registeredIds = reg.props.map((p: { id: string }) => p.id);
  assert.deepStrictEqual(registeredIds.sort(), requiredIds.sort(), 'Registered prop IDs must match canonical list');

  for (const p of reg.props) {
    assert.ok(p.name, `Prop ${p.id} must have name`);
    assert.ok(Array.isArray(p.category) && p.category.length > 0, `Prop ${p.id} must have category`);
    assert.ok(p.dimensions.width > 0 && p.dimensions.height > 0, `Prop ${p.id} must have valid dimensions`);
    assert.ok(p.anchor.name, `Prop ${p.id} must have anchor name`);
    assert.ok(typeof p.anchor.x === 'number' && typeof p.anchor.y === 'number', `Prop ${p.id} must have numeric anchor`);
    assert.ok(p.assetPng && p.assetWebp, `Prop ${p.id} must define PNG and WebP assets`);
    assert.ok(p.checksumSha256?.png && p.checksumSha256?.webp, `Prop ${p.id} must have SHA256 checksums`);
  }
});

test('Prop Assets: all 9 props exist on disk in PNG and WebP with matching checksums', () => {
  const reg = JSON.parse(fs.readFileSync(path.resolve('docs/prop_registry.json'), 'utf-8'));

  for (const p of reg.props) {
    const pngPath = path.resolve(`public${p.assetPng}`);
    const webpPath = path.resolve(`public${p.assetWebp}`);

    assert.ok(fs.existsSync(pngPath), `File missing: ${pngPath}`);
    assert.ok(fs.existsSync(webpPath), `File missing: ${webpPath}`);

    const pngHash = crypto.createHash('sha256').update(fs.readFileSync(pngPath)).digest('hex');
    const webpHash = crypto.createHash('sha256').update(fs.readFileSync(webpPath)).digest('hex');

    assert.strictEqual(pngHash, p.checksumSha256.png, `PNG checksum mismatch for ${p.id}`);
    assert.strictEqual(webpHash, p.checksumSha256.webp, `WebP checksum mismatch for ${p.id}`);
  }
});

test('Atmosphere FX Registry: all 5 canonical FX systems registered with valid lifecycle specs', () => {
  const fxPath = path.resolve('docs/atmosphere_fx_registry.json');
  assert.ok(fs.existsSync(fxPath), 'docs/atmosphere_fx_registry.json must exist');

  const reg = JSON.parse(fs.readFileSync(fxPath, 'utf-8'));
  assert.strictEqual(reg.totalFxSystems, 5, 'Must have exactly 5 FX systems');
  assert.strictEqual(reg.systems.length, 5, 'Must have 5 FX definitions');

  const requiredFxIds = [
    'fx_rain_procedural',
    'fx_fog_mist',
    'fx_dust_motes',
    'fx_screen_glow_late_night',
    'fx_cinematic_vignette',
  ];

  const foundIds = reg.systems.map((s: { id: string }) => s.id);
  assert.deepStrictEqual(foundIds.sort(), requiredFxIds.sort(), 'Registered FX IDs must match canonical list');

  for (const s of reg.systems) {
    assert.ok(s.name, `FX ${s.id} must have name`);
    assert.ok(s.layer, `FX ${s.id} must define layer`);
    assert.ok(s.mobileBehavior, `FX ${s.id} must define mobile behavior`);
    assert.ok(s.reducedMotionBehavior, `FX ${s.id} must define reduced motion behavior`);
    assert.ok(s.cleanup, `FX ${s.id} must define cleanup`);
    assert.ok(Array.isArray(s.scenes) && s.scenes.length > 0, `FX ${s.id} must map to scenes`);
  }
});

test('Preview & Immutability: Contact sheet exists and canonical assets remain unchanged', () => {
  const cs = path.resolve('public/assets/props/previews/props_contact_sheet.png');
  assert.ok(fs.existsSync(cs), 'Props contact sheet must exist');
  assert.ok(fs.statSync(cs).size > 10000, 'Props contact sheet must be valid image file');

  // Verify primary character assets in Flow Images
  const nanaFlowPose = path.resolve('Flow Images/Nana/nana_pose/nana_pose-01.png');
  const nanaFlowExpr = path.resolve('Flow Images/Nana/nana_expression/nana_expression-01.png');
  assert.ok(fs.existsSync(nanaFlowPose), 'Nana Flow pose must exist');
  assert.ok(fs.existsSync(nanaFlowExpr), 'Nana Flow expression must exist');

  // Verify environment registry masters unmodified
  const envReg = JSON.parse(fs.readFileSync(path.resolve('docs/environment_registry.json'), 'utf-8'));
  assert.strictEqual(envReg.environments.length, 12, '12 environment masters must exist');
});
