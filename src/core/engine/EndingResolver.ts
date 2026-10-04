import type { EndingDefinition } from '../schema/story.schema.ts';
import { ConditionEngine } from './ConditionEngine.ts';

export class EndingResolver {
  static resolveEnding(
    endingId: string | undefined | null,
    endings: Record<string, EndingDefinition>,
    variables: Record<string, number>,
    flags: Record<string, boolean>
  ): EndingDefinition | null {
    if (endingId && endings[endingId]) {
      return endings[endingId];
    }

    for (const ending of Object.values(endings)) {
      if (ending.requiredCondition) {
        if (ConditionEngine.evaluate(ending.requiredCondition, variables, flags)) {
          return ending;
        }
      } else if (ending.unlockedCondition) {
        if (ConditionEngine.evaluateString(ending.unlockedCondition, variables, flags)) {
          return ending;
        }
      }
    }

    const allEndings = Object.values(endings);
    return allEndings.length > 0 ? allEndings[0] : null;
  }
}
