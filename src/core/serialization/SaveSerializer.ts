import type { NarrativeRuntimeSnapshot } from '../engine/NarrativeEngine.ts';

export interface SerializedSaveV1 {
  version?: 1;
  timestamp: number;
  storyId: string;
  sceneId: string;
  variables: Record<string, number>;
  flags: Record<string, boolean>;
  history?: Array<{ sceneId: string; speaker: string | null; text: string; timestamp: number }>;
}

export interface SerializedSaveV2 {
  formatVersion: 2;
  id: string;
  createdAt: number;
  storyId: string;
  storyTitle?: string;
  chapterTitle?: string;
  snapshot: NarrativeRuntimeSnapshot;
  checksum: string;
}

export type AnySerializedSave = SerializedSaveV1 | SerializedSaveV2;

export class SaveSerializer {
  public static readonly CURRENT_VERSION = 2;

  public static computeChecksum(payload: string): string {
    let hash = 0;
    for (let i = 0; i < payload.length; i++) {
      const char = payload.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0;
    }
    return Math.abs(hash).toString(16);
  }

  public static serialize(
    id: string,
    snapshot: NarrativeRuntimeSnapshot,
    meta?: { storyTitle?: string; chapterTitle?: string }
  ): string {
    const rawPayload = JSON.stringify(snapshot);
    const checksum = this.computeChecksum(rawPayload);

    const saveData: SerializedSaveV2 = {
      formatVersion: 2,
      id,
      createdAt: Date.now(),
      storyId: snapshot.storyId,
      storyTitle: meta?.storyTitle,
      chapterTitle: meta?.chapterTitle,
      snapshot,
      checksum,
    };

    return JSON.stringify(saveData);
  }

  public static deserialize(jsonString: string): SerializedSaveV2 {
    let parsed: any;
    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error('Save file contains invalid JSON syntax.');
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Save file data is malformed.');
    }

    if (parsed.formatVersion === 2) {
      const snapshotStr = JSON.stringify(parsed.snapshot);
      const expectedChecksum = this.computeChecksum(snapshotStr);

      if (parsed.checksum && parsed.checksum !== expectedChecksum) {
        throw new Error('Save file checksum mismatch: save data may be corrupted.');
      }

      return parsed as SerializedSaveV2;
    }

    if (!parsed.formatVersion || parsed.version === 1 || parsed.sceneId) {
      return this.migrateV1ToV2(parsed);
    }

    throw new Error(`Unsupported save format version: ${parsed.formatVersion}`);
  }

  /**
   * Migrates a legacy v1 save payload to the v2 standard schema.
   */
  public static migrateV1ToV2(legacy: any): SerializedSaveV2 {
    const snapshot: NarrativeRuntimeSnapshot = {
      storyId: legacy.storyId || 'unknown_story',
      currentSceneId: legacy.sceneId || legacy.currentSceneId || 'scene_start',
      currentDialogueIndex: legacy.currentDialogueIndex || 0,
      variables: legacy.variables || {},
      flags: legacy.flags || {},
      discoveredSecrets: legacy.discoveredSecrets || [],
      history: legacy.history || [],
      unlockedEndings: legacy.unlockedEndings || [],
    };

    const snapshotStr = JSON.stringify(snapshot);
    const checksum = this.computeChecksum(snapshotStr);

    return {
      formatVersion: 2,
      id: legacy.id || `migrated_${Date.now()}`,
      createdAt: legacy.timestamp || Date.now(),
      storyId: snapshot.storyId,
      storyTitle: legacy.storyTitle,
      chapterTitle: legacy.chapterTitle,
      snapshot,
      checksum,
    };
  }
}
