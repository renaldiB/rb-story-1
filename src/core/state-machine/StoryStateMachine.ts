export type StoryStateStatus =
  | 'BOOT'
  | 'LOADING'
  | 'READY'
  | 'PLAYING'
  | 'DIALOGUE'
  | 'CHOICE'
  | 'TRANSITIONING'
  | 'PAUSED'
  | 'ENDING'
  | 'ERROR';

export type StateTransitionEvent =
  | 'INIT'
  | 'LOAD_START'
  | 'LOAD_SUCCESS'
  | 'LOAD_FAIL'
  | 'START_STORY'
  | 'SHOW_DIALOGUE'
  | 'PRESENT_CHOICES'
  | 'MAKE_CHOICE'
  | 'SCENE_TRANSITION'
  | 'TRANSITION_COMPLETE'
  | 'PAUSE'
  | 'RESUME'
  | 'TRIGGER_ENDING'
  | 'RESET';

const VALID_TRANSITIONS: Record<StoryStateStatus, StoryStateStatus[]> = {
  BOOT: ['LOADING', 'ERROR'],
  LOADING: ['READY', 'ERROR'],
  READY: ['PLAYING', 'LOADING', 'ERROR'],
  PLAYING: ['DIALOGUE', 'CHOICE', 'TRANSITIONING', 'PAUSED', 'ENDING', 'ERROR'],
  DIALOGUE: ['CHOICE', 'TRANSITIONING', 'PAUSED', 'ENDING', 'ERROR'],
  CHOICE: ['TRANSITIONING', 'ENDING', 'PAUSED', 'ERROR'],
  TRANSITIONING: ['PLAYING', 'DIALOGUE', 'CHOICE', 'ENDING', 'ERROR'],
  PAUSED: ['PLAYING', 'DIALOGUE', 'CHOICE', 'READY', 'ERROR'],
  ENDING: ['READY', 'LOADING', 'BOOT'],
  ERROR: ['BOOT', 'LOADING'],
};

export class StoryStateMachine {
  private _status: StoryStateStatus = 'BOOT';
  private _previousStatus: StoryStateStatus | null = null;
  private _listeners: Array<(status: StoryStateStatus, prev: StoryStateStatus | null) => void> = [];

  constructor(initialStatus: StoryStateStatus = 'BOOT') {
    this._status = initialStatus;
  }

  get status(): StoryStateStatus {
    return this._status;
  }

  get previousStatus(): StoryStateStatus | null {
    return this._previousStatus;
  }

  canTransitionTo(targetStatus: StoryStateStatus): boolean {
    const allowed = VALID_TRANSITIONS[this._status];
    return allowed ? allowed.includes(targetStatus) : false;
  }

  transitionTo(targetStatus: StoryStateStatus): void {
    if (this._status === targetStatus) return;

    if (!this.canTransitionTo(targetStatus)) {
      throw new Error(
        `Invalid state transition: Cannot transition from ${this._status} to ${targetStatus}`
      );
    }

    const prev = this._status;
    this._previousStatus = prev;
    this._status = targetStatus;

    this.notify(this._status, prev);
  }

  subscribe(listener: (status: StoryStateStatus, prev: StoryStateStatus | null) => void): () => void {
    this._listeners.push(listener);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== listener);
    };
  }

  private notify(status: StoryStateStatus, prev: StoryStateStatus | null): void {
    for (const listener of this._listeners) {
      try {
        listener(status, prev);
      } catch (err) {
        console.error('Error in state machine listener:', err);
      }
    }
  }
}
