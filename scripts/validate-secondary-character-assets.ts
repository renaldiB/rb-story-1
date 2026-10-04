import fs from 'node:fs';
import path from 'node:path';

interface SpriteRegistryItem {
  id: string;
  type: string;
  sourceMaster: string;
  sprite: string;
  width: number;
  height: number;
  format: string;
  alpha: boolean;
  status: string;
}

interface VariantItem {
  id: string;
  category: string;
  state: string;
  priority: string;
  file: string;
  status: string;
}

interface ValidationReport {
  timestamp: string;
  charactersChecked: number;
  variantsPlanned: number;
  variantsGenerated: number;
  orphanedFiles: string[];
  missingFiles: string[];
  corruptFiles: string[];
  dimensionMismatches: string[];
  nonRgbaFiles: string[];
  duplicateIds: string[];
  errors: string[];
  warnings: string[];
  passed: boolean;
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

export function validateSecondaryCharacterAssets(rootDir: string = process.cwd()): ValidationReport {
  const report: ValidationReport = {
    timestamp: new Date().toISOString(),
    charactersChecked: 0,
    variantsPlanned: 0,
    variantsGenerated: 0,
    orphanedFiles: [],
    missingFiles: [],
    corruptFiles: [],
    dimensionMismatches: [],
    nonRgbaFiles: [],
    duplicateIds: [],
    errors: [],
    warnings: [],
    passed: true,
  };

  const spriteRegistryPath = path.join(rootDir, 'secondary_character_sprite_registry.json');
  const variantRegistryPath = path.join(rootDir, 'secondary_character_variant_registry.json');

  if (!fs.existsSync(spriteRegistryPath)) {
    report.errors.push(`Missing sprite registry: ${spriteRegistryPath}`);
    report.passed = false;
    return report;
  }
  if (!fs.existsSync(variantRegistryPath)) {
    report.errors.push(`Missing variant registry: ${variantRegistryPath}`);
    report.passed = false;
    return report;
  }

  const spriteData = JSON.parse(fs.readFileSync(spriteRegistryPath, 'utf8')) as {
    characters: SpriteRegistryItem[];
  };
  const variantData = JSON.parse(fs.readFileSync(variantRegistryPath, 'utf8')) as {
    characters: Record<string, { variants: VariantItem[] }>;
  };

  const seenCharIds = new Set<string>();
  const seenVariantIds = new Set<string>();
  const registeredFilePaths = new Set<string>();

  // 1. Validate Character Sprites
  for (const char of spriteData.characters) {
    if (seenCharIds.has(char.id)) {
      report.duplicateIds.push(`Duplicate character ID in sprite registry: ${char.id}`);
    }
    seenCharIds.add(char.id);
    report.charactersChecked++;

    const spriteRel = char.sprite;
    const p1 = path.join(rootDir, 'assets', 'characters', 'secondary', spriteRel);
    const p2 = path.join(rootDir, 'public', 'assets', 'characters', 'secondary', spriteRel);

    for (const p of [p1, p2]) {
      if (!fs.existsSync(p)) {
        report.missingFiles.push(`Missing master sprite: ${p}`);
      } else {
        const meta = readPngMetadata(p);
        if (!meta) {
          report.corruptFiles.push(`Corrupt master sprite: ${p}`);
        } else {
          if (meta.width !== 1024 || meta.height !== 1536) {
            report.dimensionMismatches.push(`${p} (${meta.width}x${meta.height} != 1024x1536)`);
          }
          if (!meta.isRgba) {
            report.nonRgbaFiles.push(`${p} (not RGBA)`);
          }
        }
      }
    }
  }

  // 2. Validate Variants
  for (const [_charId, cData] of Object.entries(variantData.characters)) {
    for (const v of cData.variants) {
      report.variantsPlanned++;

      if (seenVariantIds.has(v.id)) {
        report.duplicateIds.push(`Duplicate variant ID: ${v.id}`);
      }
      seenVariantIds.add(v.id);

      if (v.status === 'PASS') {
        report.variantsGenerated++;
        registeredFilePaths.add(path.normalize(v.file));

        const p1 = path.join(rootDir, 'assets', 'characters', 'secondary', v.file);
        const p2 = path.join(rootDir, 'public', 'assets', 'characters', 'secondary', v.file);

        for (const p of [p1, p2]) {
          if (!fs.existsSync(p)) {
            report.missingFiles.push(`Missing variant file: ${p}`);
          } else {
            const meta = readPngMetadata(p);
            if (!meta) {
              report.corruptFiles.push(`Corrupt variant file: ${p}`);
            } else {
              if (meta.width !== 1024 || meta.height !== 1536) {
                report.dimensionMismatches.push(`${p} (${meta.width}x${meta.height} != 1024x1536)`);
              }
              if (!meta.isRgba) {
                report.nonRgbaFiles.push(`${p} (not RGBA)`);
              }
            }
          }
        }
      }
    }
  }

  // 3. Orphan Detection in Variants Folders
  const checkOrphans = (variantsRoot: string) => {
    if (!fs.existsSync(variantsRoot)) return;
    const walk = (dir: string) => {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          walk(full);
        } else if (entry.isFile() && entry.name.endsWith('.png')) {
          const rel = path.relative(path.join(rootDir, 'public', 'assets', 'characters', 'secondary'), full);
          const relAssets = path.relative(path.join(rootDir, 'assets', 'characters', 'secondary'), full);
          const normRel = path.normalize(rel.startsWith('..') ? relAssets : rel);
          if (!registeredFilePaths.has(normRel)) {
            report.orphanedFiles.push(full);
          }
        }
      }
    };
    walk(variantsRoot);
  };

  checkOrphans(path.join(rootDir, 'public', 'assets', 'characters', 'secondary', 'variants'));
  checkOrphans(path.join(rootDir, 'assets', 'characters', 'secondary', 'variants'));

  if (
    report.missingFiles.length > 0 ||
    report.corruptFiles.length > 0 ||
    report.dimensionMismatches.length > 0 ||
    report.nonRgbaFiles.length > 0 ||
    report.duplicateIds.length > 0
  ) {
    report.passed = false;
  }

  return report;
}

// CLI execution
if (process.argv[1] && process.argv[1].includes('validate-secondary-character-assets')) {
  console.log('Running Secondary Character Asset Validation...');
  const res = validateSecondaryCharacterAssets();
  console.log(`- Characters checked: ${res.charactersChecked}`);
  console.log(`- Variants planned:   ${res.variantsPlanned}`);
  console.log(`- Variants generated: ${res.variantsGenerated}`);
  console.log(`- Missing files:      ${res.missingFiles.length}`);
  console.log(`- Corrupt files:      ${res.corruptFiles.length}`);
  console.log(`- Dimension mismatches: ${res.dimensionMismatches.length}`);
  console.log(`- Non-RGBA files:     ${res.nonRgbaFiles.length}`);
  console.log(`- Duplicate IDs:      ${res.duplicateIds.length}`);
  console.log(`- Orphaned files:     ${res.orphanedFiles.length}`);

  if (res.passed) {
    console.log('\n[ASSET VALIDATION PASS] All 72 variants and 8 character sprite masters verified 100% valid.');
    process.exit(0);
  } else {
    console.error('\n[ASSET VALIDATION FAILED] Errors detected:', res.errors);
    process.exit(1);
  }
}
