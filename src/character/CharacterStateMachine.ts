import type { CharacterLifecycleState } from './types.ts';

export type CharacterStateListener = (
  newState: CharacterLifecycleState,
  prevState: CharacterLifecycleState
) => void;

export class CharacterStateMachine {
  private currentState: CharacterLifecycleState = 'HIDDEN';
  private listeners: Set<CharacterStateListener> = new Set();

  constructor(initialState: CharacterLifecycleState = 'HIDDEN') {
    this.currentState = initialState;
  }

  public getState(): CharacterLifecycleState {
    return this.currentState;
  }

  public isVisible(): boolean {
    return this.currentState === 'VISIBLE' || this.currentState === 'TRANSITIONING';
  }

  public canTransitionTo(target: CharacterLifecycleState): boolean {
    switch (this.currentState) {
      case 'HIDDEN':
        return target === 'ENTERING' || target === 'VISIBLE';
      case 'ENTERING':
        return target === 'VISIBLE' || target === 'EXITING' || target === 'HIDDEN';
      case 'VISIBLE':
        return target === 'TRANSITIONING' || target === 'EXITING' || target === 'HIDDEN';
      case 'TRANSITIONING':
        return target === 'VISIBLE' || target === 'EXITING' || target === 'HIDDEN';
      case 'EXITING':
        return target === 'HIDDEN';
      default:
        return false;
    }
  }

  public transitionTo(target: CharacterLifecycleState): boolean {
    if (this.currentState === target) {
      return true;
    }

    if (!this.canTransitionTo(target)) {
      console.warn(
        `[CharacterStateMachine] Illegal transition rejected: ${this.currentState} -> ${target}`
      );
      return false;
    }

    const prev = this.currentState;
    this.currentState = target;
    this.notify(target, prev);
    return true;
  }

  public enter(): boolean {
    return this.transitionTo('ENTERING');
  }

  public setVisible(): boolean {
    return this.transitionTo('VISIBLE');
  }

  public startVariantTransition(): boolean {
    return this.transitionTo('TRANSITIONING');
  }

  public exit(): boolean {
    return this.transitionTo('EXITING');
  }

  public hide(): boolean {
    return this.transitionTo('HIDDEN');
  }

  public subscribe(listener: CharacterStateListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(newState: CharacterLifecycleState, prevState: CharacterLifecycleState): void {
    for (const listener of this.listeners) {
      try {
        listener(newState, prevState);
      } catch (err) {
        console.error('[CharacterStateMachine] Listener error:', err);
      }
    }
  }
}
