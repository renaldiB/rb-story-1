import type {
  VariantResolutionQuery,
  ResolvedCharacterVariant,
  CharacterVariant,
} from './types.ts';
import { characterRegistry } from './CharacterAssetRegistry.ts';

const isDev = (): boolean => {
  try {
    if (typeof import.meta !== 'undefined' && import.meta.env) {
      return Boolean(import.meta.env.DEV);
    }
  } catch {
  }
  const proc = (globalThis as unknown as { process?: { env?: Record<string, string> } }).process;
  return Boolean(proc?.env?.NODE_ENV !== 'production');
};

export class CharacterVariantResolver {
  private static instance: CharacterVariantResolver | null = null;

  public static getInstance(): CharacterVariantResolver {
    if (!CharacterVariantResolver.instance) {
      CharacterVariantResolver.instance = new CharacterVariantResolver();
    }
    return CharacterVariantResolver.instance;
  }

  private normalizeQuery(query: VariantResolutionQuery): {
    characterId: string;
    expression?: string;
    pose?: string;
    intensity?: 'low' | 'medium' | 'high';
  } {
    const rawId = (query.characterId || '').toLowerCase().trim();
    const cleanId = rawId.replace(/^char_/, '').replace(/_nana$/, '');
    const expr = query.expression ? query.expression.toLowerCase().trim() : undefined;
    const pose = query.pose ? query.pose.toLowerCase().trim() : undefined;
    return {
      characterId: cleanId,
      expression: expr,
      pose,
      intensity: query.intensity,
    };
  }

  public resolve(query: VariantResolutionQuery): ResolvedCharacterVariant {
    const { characterId, expression, pose } = this.normalizeQuery(query);
    const char = characterRegistry.getCharacter(characterId);

    if (!char) {
      const fallbackResult: ResolvedCharacterVariant = {
        variantId: `fallback_unknown_${characterId}`,
        characterId,
        assetPath: '/assets/characters/secondary/sprites/secondary_kaka_sprite_master.png',
        source: 'fallback',
        fallback: true,
        reason: 'character_not_found',
        width: 1024,
        height: 1536,
        baselineY: 1460,
        canonicalScale: 1.0,
      };

      if (isDev()) {
        console.warn(
          `[CharacterAsset] character=${characterId} requestedExpression=${expression || 'none'} requestedPose=${pose || 'none'} resolved=${fallbackResult.assetPath} fallback=true reason=character_not_found`
        );
      }
      return fallbackResult;
    }

    const passedVariants = char.variants.filter((v) => v.status === 'PASS');

    // Expression alias mapping
    const mapExpressionState = (state: string | undefined): string[] => {
      if (!state) return [];
      const s = state.toLowerCase().trim();
      if (s === 'smiling' || s === 'smile') return ['happy', 'soft_smile', 'neutral'];
      if (s === 'soft_smile') return ['soft_smile', 'happy', 'neutral'];
      if (s === 'happy') return ['happy', 'soft_smile', 'neutral'];
      if (s === 'sad' || s === 'crying') return ['sad', 'pensive', 'worried', 'serious'];
      if (s === 'angry' || s === 'annoyed' || s === 'furious') return ['angry', 'serious', 'neutral'];
      if (s === 'serious') return ['serious', 'neutral', 'angry', 'pensive'];
      if (s === 'pensive' || s === 'thoughtful') return ['pensive', 'sad', 'serious', 'worried'];
      if (s === 'romantic') return ['happy', 'embarrassed', 'neutral'];
      if (s === 'worried' || s === 'nervous' || s === 'anxious') return ['worried', 'sad', 'serious', 'pensive'];
      if (s === 'surprised' || s === 'shocked') return ['surprised', 'happy', 'neutral'];
      if (s === 'embarrassed' || s === 'blush' || s === 'shy') return ['embarrassed', 'happy', 'neutral'];
      if (s === 'neutral' || s === 'calm' || s === 'default') return ['neutral', 'soft_smile', 'serious'];
      return [s];
    };

    // Pose alias mapping
    const mapPoseState = (p: string | undefined): string[] => {
      if (!p) return [];
      const s = p.toLowerCase().trim();
      if (s === 'default' || s === 'standing' || s === 'standing_neutral') return ['standing_neutral', 'default'];
      if (s === 'thinking' || s === 'thoughtful') return ['thinking', 'standing_neutral'];
      if (s === 'casual_interaction' || s === 'conversational' || s === 'talking') return ['casual_interaction', 'standing_neutral'];
      if (s === 'looking_away' || s === 'turn' || s === '3quarter') return ['looking_away', 'standing_neutral'];
      return [s];
    };

    const targetExpressions = mapExpressionState(expression);
    const targetPoses = mapPoseState(pose);

    // Tier 1: Exact expression + pose match
    if (targetExpressions.length > 0 && targetPoses.length > 0) {
      for (const tExpr of targetExpressions) {
        for (const tPose of targetPoses) {
          const exact = passedVariants.find(
            (v) =>
              (v.state === tExpr && v.pose === tPose) ||
              v.id.includes(`${tExpr}_${tPose}`)
          );
          if (exact) {
            return this.buildResult(char.id, exact, false);
          }
        }
      }
    }

    // Tier 2: Matching expression variant
    if (targetExpressions.length > 0) {
      for (const tExpr of targetExpressions) {
        const match = passedVariants.find(
          (v) => v.category === 'expression' && v.state === tExpr
        );
        if (match) {
          const isExactReq = expression && targetExpressions[0] === match.state;
          const fallback = Boolean(pose && !isExactReq);
          return this.buildResult(
            char.id,
            match,
            fallback,
            fallback ? 'exact_pose_missing_using_expression' : undefined
          );
        }
      }
    }

    // Tier 3: Matching pose variant
    if (targetPoses.length > 0) {
      for (const tPose of targetPoses) {
        const match = passedVariants.find(
          (v) => v.category === 'pose' && v.state === tPose
        );
        if (match) {
          return this.buildResult(
            char.id,
            match,
            Boolean(expression),
            expression ? 'expression_missing_using_pose' : undefined
          );
        }
      }
    }

    // Tier 3b: Fallback to neutral expression variant if available
    const neutralVariant = passedVariants.find(
      (v) => (v.category === 'expression' && v.state === 'neutral') || v.id.endsWith('_neutral')
    );
    if (neutralVariant) {
      return this.buildResult(
        char.id,
        neutralVariant,
        true,
        'variant_fallback_to_neutral'
      );
    }

    // Tier 4: Character sprite master
    const masterPath = `/assets/characters/${char.type}/${char.spriteMaster}`;
    const masterResult: ResolvedCharacterVariant = {
      variantId: `master_${char.id}`,
      characterId: char.id,
      assetPath: masterPath,
      source: 'master',
      fallback: true,
      reason: 'variant_not_found',
      width: char.width,
      height: char.height,
      baselineY: char.baselineY,
      canonicalScale: char.canonicalScale,
    };

    if (isDev()) {
      console.warn(
        `[CharacterAsset] character=${char.id} requestedExpression=${expression || 'none'} requestedPose=${pose || 'none'} resolved=${char.spriteMaster} fallback=true reason=variant_not_found`
      );
    }

    return masterResult;
  }

  private buildResult(
    characterId: string,
    variant: CharacterVariant,
    fallback: boolean,
    reason?: string
  ): ResolvedCharacterVariant {
    const char = characterRegistry.getCharacter(characterId)!;
    const fullPath = `/assets/characters/${char.type}/${variant.file}`;

    if (isDev() && fallback) {
      console.warn(
        `[CharacterAsset] character=${characterId} state=${variant.state} resolved=${variant.file} fallback=true reason=${reason || 'partial_match'}`
      );
    } else if (isDev() && !fallback) {
      console.log(
        `[CharacterAsset] character=${characterId} state=${variant.state} resolved=${variant.file} fallback=false`
      );
    }

    return {
      variantId: variant.id,
      characterId,
      assetPath: fullPath,
      source: 'variant',
      fallback,
      reason,
      category: variant.category,
      state: variant.state,
      width: char.width,
      height: char.height,
      baselineY: char.baselineY,
      canonicalScale: char.canonicalScale,
    };
  }
}

export const variantResolver = CharacterVariantResolver.getInstance();
