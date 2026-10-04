import type { DialogueNode, SceneDefinition } from '../schema/story.schema.ts';

export interface TimelineState {
  currentIndex: number;
  totalNodes: number;
  isComplete: boolean;
  currentNode: DialogueNode | null;
}

export class TimelineEngine {
  static getNodes(scene: SceneDefinition): DialogueNode[] {
    if (scene.timeline && scene.timeline.length > 0) {
      return scene.timeline;
    }
    return [
      {
        speaker: scene.speaker,
        text: scene.text,
        subText: scene.subText,
        cameraAction: scene.cameraAction,
        soundEffect: scene.soundEffect,
      },
    ];
  }

  static getState(scene: SceneDefinition, index: number): TimelineState {
    const nodes = this.getNodes(scene);
    const clampedIndex = Math.max(0, Math.min(index, nodes.length - 1));
    const isComplete = index >= nodes.length - 1;

    return {
      currentIndex: clampedIndex,
      totalNodes: nodes.length,
      isComplete,
      currentNode: nodes[clampedIndex] ?? null,
    };
  }
}
