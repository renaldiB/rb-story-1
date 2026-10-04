import type {
  SecondaryCharacter,
  CharacterVariant,
  CharacterGenre,
} from './types.ts';

import secondarySpriteData from '../../secondary_character_sprite_registry.json' with { type: 'json' };
import secondaryVariantData from '../../secondary_character_variant_registry.json' with { type: 'json' };
import primarySpriteData from '../../primary_character_sprite_registry.json' with { type: 'json' };
import primaryVariantData from '../../primary_character_variant_registry.json' with { type: 'json' };

const CANONICAL_METADATA: Record<
  string,
  { name: string; canonicalScale: number; baseHeight: number }
> = {
  nana: { name: 'Nana', canonicalScale: 1.0, baseHeight: 162 },
  agus: { name: 'Agus', canonicalScale: 1.08, baseHeight: 176 },
  kaka: { name: 'Kaka', canonicalScale: 1.0, baseHeight: 170 },
  raka: { name: 'Raka', canonicalScale: 0.98, baseHeight: 175 },
  dita: { name: 'Dita', canonicalScale: 0.95, baseHeight: 160 },
  fikri: { name: 'Fikri', canonicalScale: 1.02, baseHeight: 177 },
  maya: { name: 'Maya', canonicalScale: 0.97, baseHeight: 165 },
  bimo: { name: 'Bimo', canonicalScale: 1.03, baseHeight: 178 },
  ibu: { name: 'Ibu', canonicalScale: 0.93, baseHeight: 158 },
  ayah: { name: 'Ayah', canonicalScale: 1.04, baseHeight: 180 },
};

export class CharacterAssetRegistry {
  private static instance: CharacterAssetRegistry | null = null;
  private characters: Map<string, SecondaryCharacter> = new Map();
  private aliasMap: Map<string, string> = new Map();

  private constructor() {
    this.initialize();
  }

  public static getInstance(): CharacterAssetRegistry {
    if (!CharacterAssetRegistry.instance) {
      CharacterAssetRegistry.instance = new CharacterAssetRegistry();
    }
    return CharacterAssetRegistry.instance;
  }

  private normalizeId(id: string): string {
    const raw = (id || '').toLowerCase().trim();
    if (this.aliasMap.has(raw)) {
      return this.aliasMap.get(raw)!;
    }
    const clean = raw.replace(/^char_/, '').replace(/_nana$/, '');
    if (this.aliasMap.has(clean)) {
      return this.aliasMap.get(clean)!;
    }
    return clean;
  }

  private initialize(): void {
    this.aliasMap.set('char_nana', 'nana');
    this.aliasMap.set('nana', 'nana');
    this.aliasMap.set('nadia', 'nana');
    this.aliasMap.set('char_agus', 'agus');
    this.aliasMap.set('agus', 'agus');
    this.aliasMap.set('char_kaka', 'kaka');
    this.aliasMap.set('char_raka', 'raka');
    this.aliasMap.set('char_dita', 'dita');
    this.aliasMap.set('char_fikri', 'fikri');
    this.aliasMap.set('char_maya', 'maya');
    this.aliasMap.set('char_bimo', 'bimo');
    this.aliasMap.set('char_ibu', 'ibu');
    this.aliasMap.set('char_ibu_nana', 'ibu');
    this.aliasMap.set('ibu nana', 'ibu');
    this.aliasMap.set('char_ayah', 'ayah');
    this.aliasMap.set('char_ayah_nana', 'ayah');
    this.aliasMap.set('ayah nana', 'ayah');

    const rawSprites = (secondarySpriteData as { characters: Array<Record<string, unknown>> }).characters;
    const rawVariants = (secondaryVariantData as { characters: Record<string, { variants: Array<Record<string, unknown>> }> }).characters;

    for (const item of rawSprites) {
      const charId = String(item.id).toLowerCase();
      const meta = CANONICAL_METADATA[charId] || {
        name: charId.charAt(0).toUpperCase() + charId.slice(1),
        canonicalScale: 1.0,
        baseHeight: 170,
      };

      const variantsRaw = rawVariants[charId]?.variants || [];
      const variants: CharacterVariant[] = variantsRaw.map((v) => ({
        id: String(v.id),
        characterId: charId,
        category: (v.category as 'expression' | 'pose' | 'special') || 'expression',
        state: String(v.state),
        intensity: v.intensity as 'low' | 'medium' | 'high' | undefined,
        pose: v.pose ? String(v.pose) : undefined,
        file: String(v.file),
        priority: (v.priority as 'P0' | 'P1' | 'P2' | 'P3') || 'P0',
        status: (v.status as 'PASS' | 'FAILED' | 'PLANNED') || 'PASS',
      }));

      const character: SecondaryCharacter = {
        id: charId,
        name: meta.name,
        type: 'secondary',
        sourceMaster: String(item.sourceMaster),
        spriteMaster: String(item.sprite),
        width: Number(item.width) || 1024,
        height: Number(item.height) || 1536,
        format: String(item.format) || 'png',
        alpha: Boolean(item.alpha),
        status: (item.status as 'PASS' | 'FAILED') || 'PASS',
        canonicalScale: meta.canonicalScale,
        baseHeight: meta.baseHeight,
        baselineY: 1460,
        variants,
      };

      this.characters.set(charId, character);
    }

    const rawPrimarySprites = (primarySpriteData as {
      characters: Record<string, {
        characterId: string;
        canonicalId: string;
        name: string;
        master: string;
        sprite: string;
        canvas: { width: number; height: number };
        status: string;
        relativeScale: number;
        heightCm: number;
      }>
    }).characters;
    const rawPrimaryVariants = (primaryVariantData as {
      characters: Record<string, {
        variants: Array<{
          id: string;
          variantName: string;
          category: string;
          priority: string;
          filePath: string;
          status: string;
        }>
      }>
    }).characters;

    for (const [charId, pItem] of Object.entries(rawPrimarySprites)) {
      const meta = CANONICAL_METADATA[charId] || {
        name: pItem.name,
        canonicalScale: pItem.relativeScale || 1.0,
        baseHeight: pItem.heightCm || 162,
      };

      const pVariantsRaw = rawPrimaryVariants[charId]?.variants || [];
      const variants: CharacterVariant[] = pVariantsRaw.map((v) => ({
        id: String(v.id),
        characterId: charId,
        category: (v.category as 'expression' | 'pose' | 'special') || 'expression',
        state: String(v.variantName),
        file: `variants/${charId}/${v.id}.png`,
        priority: (v.priority as 'P0' | 'P1' | 'P2' | 'P3') || 'P0',
        status: (v.status as 'PASS' | 'FAILED' | 'PLANNED') || 'PASS',
      }));

      const character: SecondaryCharacter = {
        id: charId,
        name: meta.name,
        type: 'primary',
        sourceMaster: pItem.master,
        spriteMaster: `sprites/char_${charId}_base.png`,
        width: pItem.canvas?.width || 1024,
        height: pItem.canvas?.height || 1536,
        format: 'png',
        alpha: true,
        status: (pItem.status as 'PASS' | 'FAILED') || 'PASS',
        canonicalScale: meta.canonicalScale,
        baseHeight: meta.baseHeight,
        baselineY: 1460,
        variants,
      };

      this.characters.set(charId, character);
    }
  }

  public getCharacter(id: string): SecondaryCharacter | undefined {
    return this.characters.get(this.normalizeId(id));
  }

  public getMaster(id: string): string | undefined {
    const char = this.getCharacter(id);
    if (!char) return undefined;
    return `/assets/characters/${char.type}/${char.spriteMaster}`;
  }

  public getVariants(id: string): CharacterVariant[] {
    const char = this.getCharacter(id);
    return char ? [...char.variants] : [];
  }

  public getVariant(id: string, variantId: string): CharacterVariant | undefined {
    const variants = this.getVariants(id);
    return variants.find((v) => v.id === variantId);
  }

  public hasCharacter(id: string): boolean {
    return this.characters.has(this.normalizeId(id));
  }

  public hasVariant(id: string, variantId: string): boolean {
    return Boolean(this.getVariant(id, variantId));
  }

  public listCharacters(type?: CharacterGenre): SecondaryCharacter[] {
    const all = Array.from(this.characters.values());
    if (type) {
      return all.filter((c) => c.type === type);
    }
    return all;
  }

  public listVariants(id: string): CharacterVariant[] {
    return this.getVariants(id);
  }

  public static resetInstance(): void {
    CharacterAssetRegistry.instance = null;
  }
}

export const characterRegistry = CharacterAssetRegistry.getInstance();
