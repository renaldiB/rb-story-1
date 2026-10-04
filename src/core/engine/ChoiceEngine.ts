import type { ChoiceDefinition } from '../schema/story.schema.ts';
import { ConditionEngine } from './ConditionEngine.ts';

export interface EvaluatedChoice extends ChoiceDefinition {
  isAvailable: boolean;
  lockReason?: string;
}

export class ChoiceEngine {
  static evaluateChoices(
    choices: ChoiceDefinition[] | undefined | null,
    variables: Record<string, number>,
    flags: Record<string, boolean>
  ): EvaluatedChoice[] {
    if (!choices || choices.length === 0) return [];

    return choices.map((choice) => {
      const isAvailable = ConditionEngine.evaluate(choice.requiredCondition, variables, flags);
      return {
        ...choice,
        isAvailable,
      };
    });
  }

  static getAvailableChoices(
    choices: ChoiceDefinition[] | undefined | null,
    variables: Record<string, number>,
    flags: Record<string, boolean>
  ): ChoiceDefinition[] {
    const evaluated = this.evaluateChoices(choices, variables, flags);
    return evaluated.filter((c) => c.isAvailable);
  }
}
