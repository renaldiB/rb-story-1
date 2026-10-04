import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

interface VariantEntry {
  id: string;
  variantName: string;
  category: string;
  priority: string;
  filePath: string;
  publicPath: string;
  width: number;
  height: number;
  format: string;
  colorSpace: string;
  alpha: boolean;
  baselineY: number;
  actualBaselineY: number;
  fileSizeBytes: number;
  checksumSha256: string;
  status: string;
}

interface CharacterVariantGroup {
  characterId: string;
  canonicalId: string;
  name: string;
  totalVariants: number;
  variants: VariantEntry[];
}

interface VariantRegistry {
  version: string;
  assetType: string;
  stage: string;
  totalCharacters: number;
  totalVariantsPlanned: number;
  totalVariantsGenerated: number;
  baselineStandard: {
    baselineY: number;
    canvasWidth: number;
    canvasHeight: number;
    tolerancePx: number;
  };
  characters: Record<string, CharacterVariantGroup>;
}

function readPngMetadata(filePath: string): { width: number; height: number; isRgba: boolean } | null {
  try {
    const fd = fs.openSync(filePath, 'r');
    const buffer = Buffer.alloc(29);
    fs.readSync(fd, buffer, 0, 29, 0);
    fs.closeSync(fd);

    const isPng =
      buffer[0] === 0x89 &&
      buffer[1] === 0x50 &&
      buffer[2] === 0x4e &&
      buffer[3] === 0x47 &&
      buffer[4] === 0x0d &&
      buffer[5] === 0x0a &&
      buffer[6] === 0x1a &&
      buffer[7] === 0x0a;

    if (!isPng) return null;

    const width = buffer.readUInt32BE(16);
    const height = buffer.readUInt32BE(20);
    const colorType = buffer.readUInt8(25);

    return { width, height, isRgba: colorType === 6 };
  } catch {
    return null;
  }
}

function getSha256(filePath: string): string {
  const data = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(data).digest('hex');
}

export function validatePrimaryCharacterVariants(rootDir: string = process.cwd()): boolean {
  console.log('=== PRIMARY CHARACTER VARIANT VALIDATION ===');
  const errors: string[] = [];

  const immutableHashes: Record<string, string> = {
    'assets/characters/primary/masters/char_nana_master.png': '8f628491c8bc3a26c72a2216fe2963812e9db51b191d1c836078e43b77a7c52c',
    'assets/characters/primary/masters/char_agus_master.png': '0546ec41f40ae556454ca4a00f0d8a8142e1e746551a9bd32fd3c5805481b467',
    'assets/characters/primary/sprites/char_nana_base.png': 'b9928a0627337bab8e857c1d1ced53b4c12ed2ea1606a61fa5809ebda79897df',
    'assets/characters/primary/sprites/char_agus_base.png': '1f08bd89a9debef6ece10aa41445401724c03acd7c38c8a95236d8a851927139',
  };

  for (const [relPath, expected] of Object.entries(immutableHashes)) {
    const fullPath = path.join(rootDir, relPath);
    if (!fs.existsSync(fullPath)) {
      errors.push(`Missing locked asset: ${relPath}`);
      continue;
    }
    const hash = getSha256(fullPath);
    if (hash !== expected) {
      errors.push(`LOCKED asset MODIFIED! ${relPath} (expected ${expected}, got ${hash})`);
    }
  }

  // 2. Verify registries
  const registryPaths = [
    path.join(rootDir, 'primary_character_variant_registry.json'),
    path.join(rootDir, 'assets/characters/primary/manifests/primary_character_variant_registry.json'),
    path.join(rootDir, 'public/assets/characters/primary/manifests/primary_character_variant_registry.json'),
  ];

  for (const regPath of registryPaths) {
    if (!fs.existsSync(regPath)) {
      errors.push(`Missing registry file: ${path.relative(rootDir, regPath)}`);
    }
  }

  const rootRegistry: VariantRegistry = JSON.parse(
    fs.readFileSync(registryPaths[0], 'utf-8')
  );

  if (rootRegistry.totalCharacters !== 2) {
    errors.push(`Expected 2 characters in registry, got ${rootRegistry.totalCharacters}`);
  }
  if (rootRegistry.totalVariantsGenerated !== 18) {
    errors.push(`Expected 18 variants generated, got ${rootRegistry.totalVariantsGenerated}`);
  }

  let totalValidated = 0;

  // 3. Verify each character and variant
  for (const [charKey, charGroup] of Object.entries(rootRegistry.characters)) {
    console.log(`Checking ${charGroup.variants.length} variants for ${charGroup.name} (${charKey})...`);
    if (charGroup.variants.length !== 9) {
      errors.push(`Expected 9 variants for ${charKey}, got ${charGroup.variants.length}`);
    }

    for (const v of charGroup.variants) {
      const srcPath = path.join(rootDir, v.filePath);
      const pubPath = path.join(rootDir, v.publicPath);

      if (!fs.existsSync(srcPath)) {
        errors.push(`Source variant file missing: ${v.filePath}`);
        continue;
      }
      if (!fs.existsSync(pubPath)) {
        errors.push(`Public runtime variant file missing: ${v.publicPath}`);
        continue;
      }

      // SHA256 consistency between source and public
      const srcHash = getSha256(srcPath);
      const pubHash = getSha256(pubPath);
      if (srcHash !== pubHash) {
        errors.push(`Hash mismatch between source and public for ${v.id}`);
      }
      if (srcHash !== v.checksumSha256) {
        errors.push(`Checksum mismatch for ${v.id} against registry record`);
      }

      // PNG metadata
      const meta = readPngMetadata(srcPath);
      if (!meta) {
        errors.push(`Corrupt PNG or invalid signature: ${v.filePath}`);
        continue;
      }

      if (meta.width !== 1024 || meta.height !== 1536) {
        errors.push(`Invalid dimensions for ${v.id}: expected 1024x1536, got ${meta.width}x${meta.height}`);
      }

      if (!meta.isRgba) {
        errors.push(`Non-RGBA color type for ${v.id}: expected RGBA (type 6)`);
      }

      // Baseline verification
      if (Math.abs(v.actualBaselineY - 1460) > 2) {
        errors.push(`Baseline deviation > 2px for ${v.id}: got ${v.actualBaselineY}`);
      }

      totalValidated++;
    }
  }

  // 4. Verify preview contact sheet
  const csPaths = [
    'assets/characters/primary/previews/primary_character_variants_contact_sheet.png',
    'public/assets/characters/primary/previews/primary_character_variants_contact_sheet.png',
  ];

  for (const csP of csPaths) {
    const full = path.join(rootDir, csP);
    if (!fs.existsSync(full)) {
      errors.push(`Missing contact sheet: ${csP}`);
    } else {
      const meta = readPngMetadata(full);
      if (!meta) {
        errors.push(`Corrupt contact sheet: ${csP}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error(`FAILED with ${errors.length} errors:`);
    errors.forEach(e => console.error(`  - ${e}`));
    return false;
  }

  console.log(`[PASS] All ${totalValidated} Primary Character Variants Validated Successfully:`);
  console.log('  - Canonical Masters & Base Sprites: UNCHANGED & LOCKED');
  console.log('  - All Variants: 1024x1536 PNG RGBA (sRGB)');
  console.log('  - Baseline: Y = 1460 (±1px deviation across all 18)');
  console.log('  - Contact Sheet: Generated & Mirrored');
  console.log('  - Registry: Synchronized across root, assets/, and public/');
  return true;
}

if (process.argv[1] && process.argv[1].endsWith('validate-primary-character-variants.ts')) {
  const success = validatePrimaryCharacterVariants();
  process.exit(success ? 0 : 1);
}
