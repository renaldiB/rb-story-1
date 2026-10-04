import type { ActionDefinition } from '../schema/story.schema.ts';

export interface MutationResult {
  variables: Record<string, number>;
  flags: Record<string, boolean>;
  triggeredEvents?: string[];
  soundsToPlay?: string[];
}

export class VariableEngine {
  static applyDelta(
    currentVariables: Record<string, number>,
    delta?: Record<string, number | undefined> | null
  ): Record<string, number> {
    if (!delta) return { ...currentVariables };

    const nextVariables = { ...currentVariables };
    for (const [key, change] of Object.entries(delta)) {
      if (typeof change === 'number') {
        const current = nextVariables[key] ?? 0;
        nextVariables[key] = current + change;
      }
    }
    return nextVariables;
  }

  static applyFlags(
    currentFlags: Record<string, boolean>,
    flagsToSet?: string[] | null
  ): Record<string, boolean> {
    if (!flagsToSet || flagsToSet.length === 0) return { ...currentFlags };

    const nextFlags = { ...currentFlags };
    for (const flag of flagsToSet) {
      nextFlags[flag] = true;
    }
    return nextFlags;
  }

  static applyActions(
    actions: ActionDefinition[] | undefined | null,
    currentVariables: Record<string, number>,
    currentFlags: Record<string, boolean>
  ): MutationResult {
    const nextVariables = { ...currentVariables };
    const nextFlags = { ...currentFlags };
    const triggeredEvents: string[] = [];
    const soundsToPlay: string[] = [];

    if (!actions || actions.length === 0) {
      return { variables: nextVariables, flags: nextFlags, triggeredEvents, soundsToPlay };
    }

    for (const action of actions) {
      switch (action.type) {
        case 'setVariable':
          if (typeof action.value === 'number') {
            nextVariables[action.target] = action.value;
          }
          break;
        case 'addVariable':
          if (typeof action.value === 'number') {
            const cur = nextVariables[action.target] ?? 0;
            nextVariables[action.target] = cur + action.value;
          }
          break;
        case 'setFlag':
          nextFlags[action.target] = action.value !== false;
          break;
        case 'clearFlag':
          nextFlags[action.target] = false;
          break;
        case 'playSound':
          if (typeof action.value === 'string') {
            soundsToPlay.push(action.value);
          } else {
            soundsToPlay.push(action.target);
          }
          break;
        case 'triggerEvent':
          triggeredEvents.push(action.target);
          break;
      }
    }

    return {
      variables: nextVariables,
      flags: nextFlags,
      triggeredEvents,
      soundsToPlay,
    };
  }
}
