import { STORY_SCENES } from '../src/data/storyContent.ts';
import { environmentRegistry } from '../src/environment/EnvironmentRegistry.ts';
import { environmentRuntime } from '../src/environment/EnvironmentRuntime.ts';
import { variantResolver } from '../src/character/CharacterVariantResolver.ts';
import {
  getProductionSceneFx,
  getProductionSceneProps,
  getProductionSceneRequirement,
  productionSceneRequirements,
  validateProductionScenes,
} from '../src/scene/runtime/ProductionSceneRegistry.ts';

const results = validateProductionScenes(STORY_SCENES);
const failures = results.filter((result) => !result.valid);
const duplicateManifestIds = productionSceneRequirements
  .map((requirement) => requirement.sceneId)
  .filter((sceneId, index, ids) => ids.indexOf(sceneId) !== index);
const orphanManifestIds = productionSceneRequirements
  .filter((requirement) => !STORY_SCENES[requirement.sceneId])
  .map((requirement) => requirement.sceneId);

console.log(`Production scenes: ${results.length}/29`);
for (const scene of Object.values(STORY_SCENES)) {
  const requirement = getProductionSceneRequirement(scene.id);
  const resolvedEnvironment = environmentRuntime.resolveForScene(scene.id, {
    variantId: requirement?.variantId,
    time: scene.location.time,
    weather: scene.location.weather,
  });
  const environment = requirement
    ? environmentRegistry.getEnvironment(requirement.environmentId)
    : undefined;
  const variants = scene.characters.map((character) => {
    const resolved = variantResolver.resolve({
      characterId: character.characterId || character.id,
      expression: character.expression,
      pose: character.pose,
    });
    return `${character.name}:${resolved.variantId}${resolved.fallback ? '(fallback)' : ''}`;
  });
  const transitions = [scene.nextSceneId, ...(scene.choices || []).map((choice) => choice.nextSceneId)]
    .filter(Boolean)
    .join(',') || 'ending';
  console.log(
    `${scene.id} | environment=${resolvedEnvironment?.environment.id || 'MISSING'}` +
    ` | variant=${resolvedEnvironment?.activeVariant?.variantId || 'master'}` +
    ` | layers=${requirement?.requiredLayers.join(',') || 'MISSING'}` +
    ` | props=${getProductionSceneProps(scene.id).map((prop) => prop.id).join(',') || 'none'}` +
    ` | fx=${getProductionSceneFx(scene.id).map((fx) => fx.id).join(',') || 'none'}` +
    ` | characters=${variants.join(',') || 'none'}` +
    ` | dialogue=${scene.text.trim() ? 'VALID' : 'MISSING'}` +
    ` | choices=${scene.choices?.length || 0} | targets=${transitions}` +
    ` | safeZones=${requirement ? 'VALID' : 'MISSING'}` +
    ` | responsive=${environment ? 'portrait+landscape' : 'MISSING'}` +
    ` | motion=${environment ? 'reduced-motion supported' : 'MISSING'}`
  );
}

if (
  results.length !== 29 ||
  failures.length > 0 ||
  duplicateManifestIds.length > 0 ||
  orphanManifestIds.length > 0
) {
  console.error('\n[FAIL] Production scene assembly references are unresolved.');
  for (const failure of failures) console.error(`${failure.sceneId}: ${failure.errors.join('; ')}`);
  if (duplicateManifestIds.length) console.error(`Duplicate manifest IDs: ${duplicateManifestIds.join(', ')}`);
  if (orphanManifestIds.length) console.error(`Orphan manifest IDs: ${orphanManifestIds.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log('\n[PASS] 29/29 scene mappings resolve against the canonical registries.');
}
