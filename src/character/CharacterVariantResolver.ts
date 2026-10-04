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
      if (s === 'gentle_happy' || s === 'gentle happy') return ['gentle_happy', 'happy', 'soft_smile', 'neutral'];
      if (s === 'joy') return ['joy', 'happy', 'soft_smile'];
      if (s === 'vulnerable') return ['vulnerable', 'sad', 'crying', 'worried'];
      if (s === 'frustrated') return ['frustrated', 'angry', 'serious'];
      if (s === 'relieved') return ['relieved', 'gentle_happy', 'soft_smile', 'happy'];
      if (s === 'curious') return ['curious', 'surprised', 'neutral'];
      if (s === 'nervous') return ['nervous', 'worried', 'embarrassed', 'sad'];
      if (s === 'smiling' || s === 'smile') return ['gentle_happy', 'happy', 'soft_smile', 'neutral'];
      if (s === 'soft_smile') return ['soft_smile', 'gentle_happy', 'happy', 'neutral'];
      if (s === 'happy') return ['happy', 'gentle_happy', 'joy', 'soft_smile', 'neutral'];
      if (s === 'sad' || s === 'crying') return ['sad', 'vulnerable', 'pensive', 'worried', 'serious'];
      if (s === 'angry' || s === 'annoyed' || s === 'furious') return ['angry', 'frustrated', 'serious', 'neutral'];
      if (s === 'serious') return ['serious', 'neutral', 'angry', 'pensive'];
      if (s === 'pensive' || s === 'thoughtful') return ['pensive', 'sad', 'serious', 'worried'];
      if (s === 'romantic') return ['gentle_happy', 'happy', 'embarrassed', 'neutral'];
      if (s === 'worried' || s === 'anxious') return ['worried', 'nervous', 'sad', 'serious', 'pensive'];
      if (s === 'surprised' || s === 'shocked') return ['surprised', 'curious', 'happy', 'neutral'];
      if (s === 'embarrassed' || s === 'blush' || s === 'shy') return ['embarrassed', 'nervous', 'happy', 'neutral'];
      if (s === 'neutral' || s === 'calm' || s === 'default') return ['neutral', 'gentle_happy', 'soft_smile', 'serious'];
      return [s];
    };

    // Pose alias mapping
    const mapPoseState = (p: string | undefined): string[] => {
      if (!p) return [];
      const s = p.toLowerCase().trim();
      if (s === 'relaxed_standing' || s === 'relaxed standing' || s === 'default' || s === 'standing' || s === 'standing_neutral') {
        return ['relaxed_standing', 'standing_neutral', 'default'];
      }
      if (s === 'hands_in_pockets' || s === 'hands in pockets') {
        return ['hands_in_pockets', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'arms_folded' || s === 'arms folded') {
        return ['arms_folded', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'one_hand_near_chest' || s === 'one hand near chest') {
        return ['one_hand_near_chest', 'thinking', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'thinking' || s === 'thoughtful') {
        return ['thinking', 'one_hand_near_chest', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'looking_away' || s === 'looking away' || s === 'turn' || s === '3quarter') {
        return ['looking_away', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'looking_down' || s === 'looking down') {
        return ['looking_down', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'walking_forward' || s === 'walking forward' || s === 'walking') {
        return ['walking_forward', 'pausing_mid_walk', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'pausing_mid_walk' || s === 'pausing mid walk' || s === 'pause_walk') {
        return ['pausing_mid_walk', 'walking_forward', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'reaching_out' || s === 'reaching out') {
        return ['reaching_out', 'casual_interaction', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'casual_interaction' || s === 'conversational' || s === 'talking') {
        return ['casual_interaction', 'reaching_out', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'hand_on_object_surface' || s === 'hand on object / surface' || s === 'hand_on_surface') {
        return ['hand_on_object_surface', 'reaching_out', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'sitting' || s === 'seated') {
        return ['sitting', 'relaxed_standing', 'standing_neutral'];
      }
      if (s === 'supportive_leaning_in' || s === 'supportive / leaning-in posture' || s === 'leaning_in') {
        return ['supportive_leaning_in', 'relaxed_standing', 'standing_neutral'];
      }
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

    const isNonDefaultPose =
      targetPoses.length > 0 &&
      !['relaxed_standing', 'standing_neutral', 'default'].includes(targetPoses[0]);

    // Tier 2a: If explicit active pose was requested, prioritize matching pose variant
    if (isNonDefaultPose) {
      for (const tPose of targetPoses) {
        const match = passedVariants.find(
          (v) => v.category === 'pose' && v.state === tPose
        );
        if (match) {
          return this.buildResult(char.id, match, false);
        }
      }
    }

    // Tier 2b: Matching expression variant
    if (targetExpressions.length > 0) {
      for (const tExpr of targetExpressions) {
        const match = passedVariants.find(
          (v) => v.category === 'expression' && v.state === tExpr
        );
        if (match) {
          return this.buildResult(char.id, match, false);
        }
      }
    }

    // Tier 3: Matching default pose variant
    if (targetPoses.length > 0) {
      for (const tPose of targetPoses) {
        const match = passedVariants.find(
          (v) => v.category === 'pose' && v.state === tPose
        );
        if (match) {
          return this.buildResult(char.id, match, false);
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
