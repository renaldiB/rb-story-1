import type { ConditionDefinition } from '../schema/story.schema';

export class ConditionEngine {
  static evaluate(
    condition?: ConditionDefinition | null,
    variables: Record<string, number> = {},
    flags: Record<string, boolean> = {}
  ): boolean {
    if (!condition) return true;

    if (condition.not) {
      return !this.evaluate(condition.not, variables, flags);
    }

    if (condition.and && condition.and.length > 0) {
      return condition.and.every((c) => this.evaluate(c, variables, flags));
    }

    if (condition.or && condition.or.length > 0) {
      return condition.or.some((c) => this.evaluate(c, variables, flags));
    }

    if (condition.operator === 'flagSet') {
      const targetFlag = condition.flag || condition.variable;
      return targetFlag ? Boolean(flags[targetFlag]) : true;
    }

    if (condition.operator === 'flagUnset') {
      const targetFlag = condition.flag || condition.variable;
      return targetFlag ? !flags[targetFlag] : true;
    }

    if (condition.flag && !condition.variable && !condition.operator) {
      return Boolean(flags[condition.flag]);
    }

    if (condition.variable && condition.operator && condition.value !== undefined) {
      const actualVal = variables[condition.variable] ?? 0;
      const targetVal = Number(condition.value);

      switch (condition.operator) {
        case '==':
          return actualVal === targetVal;
        case '!=':
          return actualVal !== targetVal;
        case '>':
          return actualVal > targetVal;
        case '<':
          return actualVal < targetVal;
        case '>=':
          return actualVal >= targetVal;
        case '<=':
          return actualVal <= targetVal;
        default:
          return true;
      }
    }

    if (condition.variable && !condition.operator) {
      return (variables[condition.variable] ?? 0) > 0;
    }

    return true;
  }

  static evaluateString(
    expression: string,
    variables: Record<string, number> = {},
    flags: Record<string, boolean> = {}
  ): boolean {
    if (!expression || expression.trim() === '') return true;

    const trimmed = expression.trim();

    if (flags[trimmed] !== undefined) {
      return Boolean(flags[trimmed]);
    }

    const match = trimmed.match(/^([a-zA-Z0-9_]+)\s*(>=|<=|==|!=|>|<)\s*(-?\d+(?:\.\d+)?)$/);
    if (match) {
      const [, varName, op, valStr] = match;
      return this.evaluate(
        {
          variable: varName,
          operator: op as ConditionDefinition['operator'],
          value: parseFloat(valStr),
        },
        variables,
        flags
      );
    }

    return true;
  }
}
