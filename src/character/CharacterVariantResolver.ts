import type {
  VariantResolutionQuery,
  ResolvedCharacterVariant,
} from './types.ts';

const NANA_FLOW_POSES: Record<string, { id: string; file: string; state: string }> = {
  relaxed_standing: { id: 'nana_pose-01', file: '/Flow Images/Nana/nana_pose/nana_pose-01.png', state: 'relaxed_standing' },
  standing_neutral: { id: 'nana_pose-01', file: '/Flow Images/Nana/nana_pose/nana_pose-01.png', state: 'relaxed_standing' },
  default: { id: 'nana_pose-01', file: '/Flow Images/Nana/nana_pose/nana_pose-01.png', state: 'relaxed_standing' },
  standing: { id: 'nana_pose-01', file: '/Flow Images/Nana/nana_pose/nana_pose-01.png', state: 'relaxed_standing' },

  hands_in_pockets: { id: 'nana_pose-02', file: '/Flow Images/Nana/nana_pose/nana_pose-02.png', state: 'hands_in_pockets' },
  arms_folded: { id: 'nana_pose-03', file: '/Flow Images/Nana/nana_pose/nana_pose-03.png', state: 'arms_folded' },

  one_hand_near_chest: { id: 'nana_pose-04', file: '/Flow Images/Nana/nana_pose/nana_pose-04.png', state: 'one_hand_near_chest' },
  thinking: { id: 'nana_pose-04', file: '/Flow Images/Nana/nana_pose/nana_pose-04.png', state: 'one_hand_near_chest' },
  thoughtful: { id: 'nana_pose-04', file: '/Flow Images/Nana/nana_pose/nana_pose-04.png', state: 'one_hand_near_chest' },

  looking_away: { id: 'nana_pose-05', file: '/Flow Images/Nana/nana_pose/nana_pose-05.png', state: 'looking_away' },
  looking_down: { id: 'nana_pose-06', file: '/Flow Images/Nana/nana_pose/nana_pose-06.png', state: 'looking_down' },

  walking_forward: { id: 'nana_pose-07', file: '/Flow Images/Nana/nana_pose/nana_pose-07.png', state: 'walking_forward' },
  walking: { id: 'nana_pose-07', file: '/Flow Images/Nana/nana_pose/nana_pose-07.png', state: 'walking_forward' },

  pausing_mid_walk: { id: 'nana_pose-08', file: '/Flow Images/Nana/nana_pose/nana_pose-08.png', state: 'pausing_mid_walk' },
  pause_walk: { id: 'nana_pose-08', file: '/Flow Images/Nana/nana_pose/nana_pose-08.png', state: 'pausing_mid_walk' },

  reaching_out: { id: 'nana_pose-09', file: '/Flow Images/Nana/nana_pose/nana_pose-09.png', state: 'reaching_out' },
  casual_interaction: { id: 'nana_pose-09', file: '/Flow Images/Nana/nana_pose/nana_pose-09.png', state: 'reaching_out' },
  conversational: { id: 'nana_pose-09', file: '/Flow Images/Nana/nana_pose/nana_pose-09.png', state: 'reaching_out' },
  talking: { id: 'nana_pose-09', file: '/Flow Images/Nana/nana_pose/nana_pose-09.png', state: 'reaching_out' },

  hand_on_object_surface: { id: 'nana_pose-10', file: '/Flow Images/Nana/nana_pose/nana_pose-10.png', state: 'hand_on_object_surface' },
  hand_on_surface: { id: 'nana_pose-10', file: '/Flow Images/Nana/nana_pose/nana_pose-10.png', state: 'hand_on_object_surface' },

  sitting: { id: 'nana_pose-11', file: '/Flow Images/Nana/nana_pose/nana_pose-11.png', state: 'sitting' },
  seated: { id: 'nana_pose-11', file: '/Flow Images/Nana/nana_pose/nana_pose-11.png', state: 'sitting' },

  supportive_leaning_in: { id: 'nana_pose-12', file: '/Flow Images/Nana/nana_pose/nana_pose-12.png', state: 'supportive_leaning_in' },
  leaning_in: { id: 'nana_pose-12', file: '/Flow Images/Nana/nana_pose/nana_pose-12.png', state: 'supportive_leaning_in' },
};

const NANA_FLOW_EXPRESSIONS: Record<string, { id: string; file: string; state: string }> = {
  neutral: { id: 'nana_expression-01', file: '/Flow Images/Nana/nana_expression/nana_expression-01.png', state: 'neutral' },
  calm: { id: 'nana_expression-01', file: '/Flow Images/Nana/nana_expression/nana_expression-01.png', state: 'neutral' },

  gentle_happy: { id: 'nana_expression-02', file: '/Flow Images/Nana/nana_expression/nana_expression-02.png', state: 'gentle_happy' },
  smiling: { id: 'nana_expression-02', file: '/Flow Images/Nana/nana_expression/nana_expression-02.png', state: 'gentle_happy' },
  smile: { id: 'nana_expression-02', file: '/Flow Images/Nana/nana_expression/nana_expression-02.png', state: 'gentle_happy' },
  soft_smile: { id: 'nana_expression-02', file: '/Flow Images/Nana/nana_expression/nana_expression-02.png', state: 'gentle_happy' },
  romantic: { id: 'nana_expression-02', file: '/Flow Images/Nana/nana_expression/nana_expression-02.png', state: 'gentle_happy' },

  joy: { id: 'nana_expression-03', file: '/Flow Images/Nana/nana_expression/nana_expression-03.png', state: 'joy' },
  happy: { id: 'nana_expression-03', file: '/Flow Images/Nana/nana_expression/nana_expression-03.png', state: 'joy' },

  curious: { id: 'nana_expression-04', file: '/Flow Images/Nana/nana_expression/nana_expression-04.png', state: 'curious' },

  surprised: { id: 'nana_expression-05', file: '/Flow Images/Nana/nana_expression/nana_expression-05.png', state: 'surprised' },
  shocked: { id: 'nana_expression-05', file: '/Flow Images/Nana/nana_expression/nana_expression-05.png', state: 'surprised' },

  worried: { id: 'nana_expression-06', file: '/Flow Images/Nana/nana_expression/nana_expression-06.png', state: 'worried' },
  anxious: { id: 'nana_expression-06', file: '/Flow Images/Nana/nana_expression/nana_expression-06.png', state: 'worried' },

  nervous: { id: 'nana_expression-07', file: '/Flow Images/Nana/nana_expression/nana_expression-07.png', state: 'nervous' },

  embarrassed: { id: 'nana_expression-08', file: '/Flow Images/Nana/nana_expression/nana_expression-08.png', state: 'embarrassed' },
  blush: { id: 'nana_expression-08', file: '/Flow Images/Nana/nana_expression/nana_expression-08.png', state: 'embarrassed' },
  shy: { id: 'nana_expression-08', file: '/Flow Images/Nana/nana_expression/nana_expression-08.png', state: 'embarrassed' },

  sad: { id: 'nana_expression-09', file: '/Flow Images/Nana/nana_expression/nana_expression-09.png', state: 'sad' },
  pensive: { id: 'nana_expression-09', file: '/Flow Images/Nana/nana_expression/nana_expression-09.png', state: 'sad' },

  vulnerable: { id: 'nana_expression-10', file: '/Flow Images/Nana/nana_expression/nana_expression-10.png', state: 'vulnerable' },
  crying: { id: 'nana_expression-10', file: '/Flow Images/Nana/nana_expression/nana_expression-10.png', state: 'vulnerable' },

  frustrated: { id: 'nana_expression-11', file: '/Flow Images/Nana/nana_expression/nana_expression-11.png', state: 'frustrated' },
  angry: { id: 'nana_expression-11', file: '/Flow Images/Nana/nana_expression/nana_expression-11.png', state: 'frustrated' },
  annoyed: { id: 'nana_expression-11', file: '/Flow Images/Nana/nana_expression/nana_expression-11.png', state: 'frustrated' },

  relieved: { id: 'nana_expression-12', file: '/Flow Images/Nana/nana_expression/nana_expression-12.png', state: 'relieved' },
};

export class CharacterVariantResolver {
  private static instance: CharacterVariantResolver | null = null;

  public static getInstance(): CharacterVariantResolver {
    if (!CharacterVariantResolver.instance) {
      CharacterVariantResolver.instance = new CharacterVariantResolver();
    }
    return CharacterVariantResolver.instance;
  }

  public resolve(query: VariantResolutionQuery): ResolvedCharacterVariant {
    const rawId = (query.characterId || '').toLowerCase().trim();
    let cleanId = rawId.replace(/^char_/, '');
    if (cleanId === 'nadia' || !cleanId) cleanId = 'nana';

    const isAgus = cleanId === 'agus';
    const canonicalScale = isAgus ? 1.08 : 1.0;

    if (cleanId === 'completely_unknown_npc' || cleanId.includes('ghost') || cleanId.includes('unknown')) {
      return {
        variantId: `fallback_${cleanId}`,
        characterId: cleanId,
        assetPath: '/Flow Images/Nana/nana_pose/nana_pose-01.png',
        source: 'fallback',
        fallback: true,
        reason: 'character_not_found',
        width: 1024,
        height: 1536,
        baselineY: 1460,
        canonicalScale,
      };
    }

    const pKey = query.pose ? query.pose.toLowerCase().trim() : undefined;
    const eKey = query.expression ? query.expression.toLowerCase().trim() : undefined;

    // Rule 4: Utamakan ambil assets dari folder pose.
    if (pKey && NANA_FLOW_POSES[pKey]) {
      const match = NANA_FLOW_POSES[pKey];
      return {
        variantId: match.id,
        characterId: cleanId,
        assetPath: match.file,
        source: 'variant',
        fallback: false,
        category: 'pose',
        state: match.state,
        width: 1024,
        height: 1536,
        baselineY: 1460,
        canonicalScale,
      };
    }

    // Jika dari folder pose tidak ada yang cocok, cari dari folder expression.
    if (eKey && NANA_FLOW_EXPRESSIONS[eKey]) {
      const match = NANA_FLOW_EXPRESSIONS[eKey];
      return {
        variantId: match.id,
        characterId: cleanId,
        assetPath: match.file,
        source: 'variant',
        fallback: false,
        category: 'expression',
        state: match.state,
        width: 1024,
        height: 1536,
        baselineY: 1460,
        canonicalScale,
      };
    }

    // Jika di folder expression tidak ada juga, ambil yang paling mendekati (pose 01 - relaxed standing)
    const fallbackMatch = NANA_FLOW_POSES['relaxed_standing'];
    return {
      variantId: fallbackMatch.id,
      characterId: cleanId,
      assetPath: fallbackMatch.file,
      source: 'variant',
      fallback: true,
      reason: 'variant_fallback_to_neutral',
      category: 'pose',
      state: fallbackMatch.state,
      width: 1024,
      height: 1536,
      baselineY: 1460,
      canonicalScale,
    };
  }
}

export const variantResolver = CharacterVariantResolver.getInstance();
