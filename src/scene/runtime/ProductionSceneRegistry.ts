import sceneManifest from '../../../docs/scene_visual_asset_manifest.json' with { type: 'json' };
import propRegistry from '../../../docs/prop_registry.json' with { type: 'json' };
import fxRegistry from '../../../docs/atmosphere_fx_registry.json' with { type: 'json' };
import type { StoryScene } from '../../types/story.ts';
import { environmentRegistry } from '../../environment/EnvironmentRegistry.ts';
import { environmentVariantResolver } from '../../environment/EnvironmentVariantResolver.ts';
import { characterRegistry } from '../../character/CharacterAssetRegistry.ts';
import { variantResolver } from '../../character/CharacterVariantResolver.ts';

export interface ProductionSceneRequirement {
  sceneId: string;
  locationId: string;
  environmentId: string;
  variantId: string;
  requiredLayers: string[];
  requiredProps: string[];
  requiredAtmosphere: string[];
  actionCG: string | null;
  characterComposition: {
    characters: string[];
    baselineY: number;
    safeZone: { x: number; y: number; width: number; height: number };
  };
  dialogueSafeZone: { x: number; y: number; width: number; height: number };
}

const requirements = sceneManifest.sceneRequirements as ProductionSceneRequirement[];
const requirementById = new Map(requirements.map((requirement) => [requirement.sceneId, requirement]));
const propsById = new Map(propRegistry.props.map((prop) => [prop.id, prop]));
const fxById = new Map(fxRegistry.systems.map((system) => [system.id, system]));

export const productionSceneRequirements = requirements;

export function getProductionSceneRequirement(sceneId: string): ProductionSceneRequirement | undefined {
  return requirementById.get(sceneId);
}

export function getProductionSceneProps(sceneId: string) {
  const requirement = requirementById.get(sceneId);
  return (requirement?.requiredProps || [])
    .map((propId) => propsById.get(propId))
    .filter((prop): prop is (typeof propRegistry.props)[number] => Boolean(prop));
}

export function getProductionSceneFx(sceneId: string) {
  const requirement = requirementById.get(sceneId);
  return (requirement?.requiredAtmosphere || [])
    .map((fxId) => fxById.get(fxId))
    .filter((fx): fx is (typeof fxRegistry.systems)[number] => Boolean(fx));
}

export interface PropPlacementCoords {
  x: number;
  y: number;
  scale?: number;
}

export const AUTHORED_SCENE_PROP_POSITIONS: Record<string, Record<string, PropPlacementCoords>> = {
  ch1_intro_1: {
    prop_coffee: { x: 72, y: 84, scale: 0.8 },
  },
  ch1_intro_2: {
    prop_coffee: { x: 68, y: 84, scale: 0.8 },
    prop_lighter_antique: { x: 78, y: 85, scale: 0.7 },
  },
  ch1_nadia_enters: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_dialogue_1: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_react_warm: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_react_honest: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_react_care: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_sit_down: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_hands_cg_scene: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_confession_start: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch1_closing: {
    prop_coffee: { x: 74, y: 84, scale: 0.8 },
  },
  ch2_bus_stop: {
    prop_train_ticket: { x: 64, y: 68, scale: 0.9 },
  },
  ch3_book_discovery: {
    prop_old_photo: { x: 62, y: 74, scale: 1.0 },
  },
  ch3_polaroid_dialogue: {
    prop_old_photo: { x: 66, y: 74, scale: 1.0 },
  },
  ch3_ticket_revelation: {
    prop_train_ticket: { x: 64, y: 74, scale: 0.9 },
  },
  ch3_night_phone_msg: {
    prop_phone: { x: 56, y: 68, scale: 1.0 },
  },
  ch4_station_climax: {
    prop_backpack: { x: 78, y: 84, scale: 1.0 },
    prop_train_ticket: { x: 34, y: 66, scale: 0.9 },
  },
  ch4_final_choice: {
    prop_backpack: { x: 78, y: 84, scale: 1.0 },
  },
  ending_true_scene: {
    prop_backpack: { x: 78, y: 84, scale: 1.0 },
  },
  ending_romantic_scene: {
    prop_backpack: { x: 24, y: 82, scale: 1.0 },
  },
  ending_secret_scene: {
    prop_old_photo: { x: 66, y: 70, scale: 1.0 },
  },
  ending_bittersweet_scene: {
    prop_backpack: { x: 78, y: 84, scale: 1.0 },
  },
};

export function getProductionScenePropPlacement(
  sceneId: string,
  propId: string,
  anchorName?: string,
  index = 0,
  total = 1
): PropPlacementCoords {
  const sceneProps = AUTHORED_SCENE_PROP_POSITIONS[sceneId];
  if (sceneProps && sceneProps[propId]) {
    return sceneProps[propId];
  }
  const spread = total > 1 ? index * 12 : 0;
  if (anchorName === 'hand_grip') return { x: 68 + spread, y: 66 };
  if (anchorName === 'bottom-center') return { x: 78 - spread, y: 84 };
  if (anchorName === 'table_contact_point') return { x: 74 - spread, y: 82 };
  return { x: 68 - spread, y: 74 };
}

export function getProductionSceneAssetUrls(scene: StoryScene): string[] {
  const urls = new Set<string>();
  for (const prop of getProductionSceneProps(scene.id)) urls.add(prop.assetWebp);
  for (const character of scene.characters) {
    const resolved = variantResolver.resolve({
      characterId: character.characterId || character.id,
      expression: character.expression,
      pose: character.pose,
    });
    if (resolved.assetPath) urls.add(resolved.assetPath);
  }
  return Array.from(urls);
}

export interface ProductionSceneValidation {
  sceneId: string;
  valid: boolean;
  errors: string[];
}

export function validateProductionScenes(scenes: Record<string, StoryScene>): ProductionSceneValidation[] {
  return Object.values(scenes).map((scene) => {
    const errors: string[] = [];
    const requirement = requirementById.get(scene.id);

    if (!requirement) {
      errors.push('missing scene requirement mapping');
    } else {
      const expectedCharacters = requirement.characterComposition.characters;
      const sceneCharacters = scene.characters.map((character) => character.name);
      const isMatch = (expected: string, actual: string) =>
        expected === actual || (expected === 'Nadia' && actual === 'Nana') || (expected === 'Nana' && actual === 'Nadia');
      if (
        expectedCharacters.length !== sceneCharacters.length ||
        expectedCharacters.some((name, index) => !isMatch(name, sceneCharacters[index]))
      ) errors.push('character composition differs from production manifest');
      if ((requirement.actionCG || undefined) !== (scene.actionCG || undefined)) {
        errors.push('action CG reference differs from production manifest');
      }
      const environment = environmentRegistry.getEnvironment(requirement.environmentId);
      if (!environment) {
        errors.push(`unknown environment ${requirement.environmentId}`);
      } else {
        const resolved = environmentVariantResolver.resolveForScene(scene.id, {
          variantId: requirement.variantId,
          time: scene.location.time,
          weather: scene.location.weather,
        });
        if (!resolved || resolved.isFallback) errors.push(`environment did not resolve: ${scene.id}`);
        if (!environment.variants.some((variant) => variant.variantId === requirement.variantId)) {
          errors.push(`unknown variant ${requirement.variantId}`);
        }
        const layerIds = new Set(environment.layerDefinitions.map((layer) => layer.layerId));
        for (const layerId of requirement.requiredLayers) {
          if (!layerIds.has(layerId)) errors.push(`unknown layer ${layerId}`);
        }
        if (requirement.characterComposition.baselineY !== 1460) {
          errors.push(`noncanonical character baseline ${requirement.characterComposition.baselineY}`);
        }
        const characterSafeZone = requirement.characterComposition.safeZone;
        const dialogueSafeZone = requirement.dialogueSafeZone;
        for (const [label, zone] of [['character', characterSafeZone], ['dialogue', dialogueSafeZone]] as const) {
          if (
            zone.x < 0 || zone.y < 0 || zone.width <= 0 || zone.height <= 0 ||
            zone.x + zone.width > 1 || zone.y + zone.height > 1
          ) errors.push(`invalid ${label} safe zone`);
        }
      }

      for (const propId of requirement.requiredProps) {
        if (!propsById.has(propId)) errors.push(`unknown prop ${propId}`);
      }
      for (const fxId of requirement.requiredAtmosphere) {
        if (!fxById.has(fxId)) errors.push(`unknown FX ${fxId}`);
      }
    }

    for (const character of scene.characters) {
      const id = character.characterId || character.id;
      if (!characterRegistry.hasCharacter(id)) {
        errors.push(`unknown character ${id}`);
        continue;
      }
      const resolved = variantResolver.resolve({
        characterId: id,
        expression: character.expression,
        pose: character.pose,
      });
      if (resolved.fallback) errors.push(`character variant fallback for ${id}/${character.expression}`);
    }

    const targets = [scene.nextSceneId, ...(scene.choices || []).map((choice) => choice.nextSceneId)]
      .filter((target): target is string => Boolean(target));
    for (const target of targets) {
      if (!scenes[target]) errors.push(`unknown transition target ${target}`);
    }

    if (!scene.text.trim()) errors.push('missing dialogue text');
    return { sceneId: scene.id, valid: errors.length === 0, errors };
  });
}
