export interface RelationshipState {
  trustAgus: number;
  affectionAgus: number;
  communication: number;
  independence: number;
  sacrifice: number;
  conflict: number;
}

export interface SocialState {
  trustKaka: number;
  trustDita: number;
  trustFikri: number;
  familySupport: number;
}

export interface HiddenState {
  emotionalDistance: number;
  unspokenProblems: number;
  relationshipFatigue: number;
  futureCompatibility: number;
  jealousy: number;
}

export interface StoryCounters {
  honestChoices: number;
  avoidanceChoices: number;
  sacrificeChoices: number;
  independenceChoices: number;
  relationshipChoices: number;
  careerChoices: number;
}

export interface StoryFlags {
  metAgusFirstTime: boolean;
  confessedFeelings: boolean;
  relationshipStarted: boolean;
  missedImportantCall: boolean;
  talkedAboutFeelings: boolean;
  trustedAgus: boolean;
  suspectedMaya: boolean;
  agusJealousOfBimo: boolean;
  nanaReassuredAgus: boolean;
  careerConflict: boolean;
  choseRelationship: boolean;
  choseCareer: boolean;
  choseCompromise: boolean;
  tripUnlocked: boolean;
  secretConversationUnlocked: boolean;
  secretMemoryUnlocked: boolean;
  secretRouteUnlocked: boolean;
}

export interface StoryPosition {
  actId: string;
  chapterId: string;
  sceneId: string;
}

export interface TwoHoursApartState {
  version: number;
  relationship: RelationshipState;
  social: SocialState;
  hidden: HiddenState;
  counters: StoryCounters;
  flags: StoryFlags;
  position: StoryPosition;
  completedScenes: string[];
  visitedChoices: string[];
  unlockedEndings: string[];
  currentEnding?: string;
  timestamp: number;
}

export type ChoiceTag =
  | 'honest'
  | 'avoidant'
  | 'romantic'
  | 'independent'
  | 'sacrifice'
  | 'career'
  | 'relationship'
  | 'trust'
  | 'jealous'
  | 'family';

export type EndingId = 'END_A' | 'END_B' | 'END_C' | 'END_D' | 'END_E';

export function modifyStat(current: number, delta: number, min = 0, max = 100): number {
  return Math.min(max, Math.max(min, current + delta));
}

export function createInitialTwoHoursApartState(): TwoHoursApartState {
  return {
    version: 1,
    relationship: {
      trustAgus: 50,
      affectionAgus: 50,
      communication: 50,
      independence: 50,
      sacrifice: 50,
      conflict: 0,
    },
    social: {
      trustKaka: 50,
      trustDita: 50,
      trustFikri: 50,
      familySupport: 50,
    },
    hidden: {
      emotionalDistance: 0,
      unspokenProblems: 0,
      relationshipFatigue: 0,
      futureCompatibility: 50,
      jealousy: 0,
    },
    counters: {
      honestChoices: 0,
      avoidanceChoices: 0,
      sacrificeChoices: 0,
      independenceChoices: 0,
      relationshipChoices: 0,
      careerChoices: 0,
    },
    flags: {
      metAgusFirstTime: false,
      confessedFeelings: false,
      relationshipStarted: false,
      missedImportantCall: false,
      talkedAboutFeelings: false,
      trustedAgus: false,
      suspectedMaya: false,
      agusJealousOfBimo: false,
      nanaReassuredAgus: false,
      careerConflict: false,
      choseRelationship: false,
      choseCareer: false,
      choseCompromise: false,
      tripUnlocked: false,
      secretConversationUnlocked: false,
      secretMemoryUnlocked: false,
      secretRouteUnlocked: false,
    },
    position: {
      actId: 'act_01',
      chapterId: 'ch_01',
      sceneId: 'sc_01',
    },
    completedScenes: [],
    visitedChoices: [],
    unlockedEndings: [],
    timestamp: Date.now(),
  };
}

export function processChoiceTags(state: TwoHoursApartState, tags: ChoiceTag[] = []): void {
  for (const tag of tags) {
    switch (tag) {
      case 'honest':
        state.counters.honestChoices += 1;
        break;
      case 'avoidant':
        state.counters.avoidanceChoices += 1;
        break;
      case 'sacrifice':
        state.counters.sacrificeChoices += 1;
        break;
      case 'independent':
        state.counters.independenceChoices += 1;
        break;
      case 'career':
        state.counters.careerChoices += 1;
        break;
      case 'relationship':
        state.counters.relationshipChoices += 1;
        break;
    }
  }
}

export function qualifiesForSecretEnding(state: TwoHoursApartState): boolean {
  const isEligible =
    Boolean(state.flags.secretRouteUnlocked) &&
    state.relationship.trustAgus >= 70 &&
    state.relationship.communication >= 70 &&
    state.relationship.independence >= 60 &&
    state.hidden.futureCompatibility >= 65 &&
    state.hidden.unspokenProblems <= 30 &&
    state.hidden.emotionalDistance <= 30 &&
    state.counters.honestChoices >= 4 &&
    state.counters.avoidanceChoices <= 2 &&
    Boolean(state.flags.secretMemoryUnlocked);

  return isEligible;
}

export function qualifiesForTooLate(state: TwoHoursApartState): boolean {
  return (
    state.hidden.emotionalDistance >= 65 ||
    state.hidden.unspokenProblems >= 65 ||
    state.relationship.communication <= 35
  );
}

export function qualifiesForSameDirection(state: TwoHoursApartState): boolean {
  return (
    state.relationship.trustAgus >= 65 &&
    state.relationship.communication >= 65 &&
    state.relationship.independence >= 50 &&
    state.hidden.futureCompatibility >= 55 &&
    state.hidden.unspokenProblems <= 40 &&
    state.hidden.emotionalDistance <= 40
  );
}

export function qualifiesForTwoPaths(state: TwoHoursApartState): boolean {
  return (
    state.relationship.independence >= 70 &&
    state.hidden.futureCompatibility < 55 &&
    state.relationship.communication >= 55 &&
    state.counters.careerChoices >= state.counters.relationshipChoices
  );
}

export function qualifiesForStillUs(state: TwoHoursApartState): boolean {
  return (
    state.relationship.affectionAgus >= 70 &&
    state.relationship.sacrifice >= 65 &&
    state.relationship.communication >= 45 &&
    state.hidden.relationshipFatigue >= 40
  );
}

export function evaluateEnding(state: TwoHoursApartState): EndingId {
  if (qualifiesForSecretEnding(state)) {
    return 'END_E';
  }

  if (qualifiesForTooLate(state)) {
    return 'END_D';
  }

  if (qualifiesForSameDirection(state)) {
    return 'END_A';
  }

  if (qualifiesForTwoPaths(state)) {
    return 'END_B';
  }

  if (qualifiesForStillUs(state)) {
    return 'END_C';
  }

  return state.relationship.affectionAgus >= 55 ? 'END_C' : 'END_D';
}
