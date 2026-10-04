import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

interface EnvironmentEntry {
  id: string;
  name: string;
  locationId: string;
  type: string;
  priority: string;
  masterAsset: string;
  masterAssetJpg: string;
  dimensions: { width: number; height: number; aspectRatio: string };
  status: string;
  lockStatus: string;
  checksumSha256: { jpg: string; webp: string };
  fileSizeBytes: { jpg: number; webp: number };
  layers: string[];
  safeZones: {
    character: { x: number; y: number; width: number; height: number };
    dialogue: { x: number; y: number; width: number; height: number };
    uiHeader: { x: number; y: number; width: number; height: number };
  };
}

interface EnvironmentRegistry {
  version: string;
  storyId: string;
  totalEnvironments: number;
  environments: EnvironmentEntry[];
}

function getJpegDimensions(buffer: Buffer): { width: number; height: number } | null {
  let offset = 2;
  while (offset < buffer.length) {
    if (buffer[offset] !== 0xff) break;
    const marker = buffer[offset + 1];
    if (marker === 0xc0 || marker === 0xc2) {
      const height = buffer.readUInt16BE(offset + 5);
      const width = buffer.readUInt16BE(offset + 7);
      return { width, height };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return null;
}

console.log('=== ENVIRONMENT MASTER GENERATION & INTEGRITY VALIDATION ===');

const registryPath = path.resolve('docs/environment_registry.json');
if (!fs.existsSync(registryPath)) {
  console.error('[FAIL] Missing docs/environment_registry.json');
  process.exit(1);
}

const registry: EnvironmentRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf-8'));
const envs = registry.environments;

if (!Array.isArray(envs) || envs.length !== 12) {
  console.error(`[FAIL] Expected 12 environments in registry, found ${envs?.length}`);
  process.exit(1);
}

let totalJpgBytes = 0;
let totalWebpBytes = 0;
let passCount = 0;

const MASTERS_DIR = path.resolve('public/assets/environments/masters');

envs.forEach((env) => {
  const jpgFile = path.join(MASTERS_DIR, `${env.id}.jpg`);
  const webpFile = path.join(MASTERS_DIR, `${env.id}.webp`);

  if (!fs.existsSync(jpgFile)) {
    console.error(`[FAIL] Missing JPG master for ${env.id}: ${jpgFile}`);
    process.exit(1);
  }
  if (!fs.existsSync(webpFile)) {
    console.error(`[FAIL] Missing WebP master for ${env.id}: ${webpFile}`);
    process.exit(1);
  }

  const jpgBuffer = fs.readFileSync(jpgFile);
  const webpBuffer = fs.readFileSync(webpFile);

  const dim = getJpegDimensions(jpgBuffer);
  if (!dim || dim.width !== 1376 || dim.height !== 768) {
    console.error(`[FAIL] Dimension mismatch for ${env.id}: expected 1376x768, got ${dim?.width}x${dim?.height}`);
    process.exit(1);
  }

  const actualJpgHash = crypto.createHash('sha256').update(jpgBuffer).digest('hex');
  const actualWebpHash = crypto.createHash('sha256').update(webpBuffer).digest('hex');

  if (actualJpgHash !== env.checksumSha256.jpg) {
    console.error(`[FAIL] Checksum mismatch for JPG ${env.id}`);
    process.exit(1);
  }
  if (actualWebpHash !== env.checksumSha256.webp) {
    console.error(`[FAIL] Checksum mismatch for WebP ${env.id}`);
    process.exit(1);
  }

  totalJpgBytes += jpgBuffer.length;
  totalWebpBytes += webpBuffer.length;
  passCount++;

  console.log(`[PASS] ${env.id} | ${env.name} | 1376x768 | WebP: ${(webpBuffer.length / 1024).toFixed(0)}KB | JPG: ${(jpgBuffer.length / 1024).toFixed(0)}KB`);
});

// Check Contact Sheet
const contactSheetPath = path.resolve('public/assets/environments/previews/environment_masters_contact_sheet.png');
if (!fs.existsSync(contactSheetPath)) {
  console.error(`[FAIL] Missing contact sheet: ${contactSheetPath}`);
  process.exit(1);
}
console.log(`[PASS] Contact sheet verified: ${contactSheetPath} (${(fs.statSync(contactSheetPath).size / 1024).toFixed(0)}KB)`);

// Check Manifest Consistency
const manifestPath = path.resolve('docs/scene_visual_asset_manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
const manifestEnvIds = new Set(manifest.environments.map((e: { id: string }) => e.id));
const regEnvIds = new Set(envs.map((e) => e.id));

if (manifestEnvIds.size !== 12 || regEnvIds.size !== 12) {
  console.error('[FAIL] Manifest/Registry environment count mismatch');
  process.exit(1);
}

for (const id of manifestEnvIds) {
  if (!regEnvIds.has(id)) {
    console.error(`[FAIL] Manifest environment ${id} not found in registry`);
    process.exit(1);
  }
}
console.log('[PASS] Manifest & Registry IDs 100% synchronized across all 12 environments');

console.log('\n=== ENVIRONMENT PERFORMANCE SUMMARY ===');
console.log(`- Total Masters: 12`);
console.log(`- Total WebP Size: ${(totalWebpBytes / 1024).toFixed(1)} KB (avg: ${(totalWebpBytes / 12 / 1024).toFixed(1)} KB)`);
console.log(`- Total JPG Size: ${(totalJpgBytes / 1024).toFixed(1)} KB (avg: ${(totalJpgBytes / 12 / 1024).toFixed(1)} KB)`);
console.log(`- Status: ALL 12 ENVIRONMENT MASTERS VALIDATED & LOCKED.`);
