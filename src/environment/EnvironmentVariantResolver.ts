import { environmentRegistry } from './EnvironmentRegistry.ts';
import type {
  EnvironmentDefinition,
  EnvironmentVariantDefinition,
  ResolvedEnvironment,
  EnvironmentRuntimeOptions,
} from './types.ts';

export class EnvironmentVariantResolver {
  private static instance: EnvironmentVariantResolver | null = null;
  private readonly DEFAULT_ENVIRONMENT_ID = 'env_campus_cafe_master';

  private constructor() {}

  public static getInstance(): EnvironmentVariantResolver {
    if (!EnvironmentVariantResolver.instance) {
      EnvironmentVariantResolver.instance = new EnvironmentVariantResolver();
    }
    return EnvironmentVariantResolver.instance;
  }

  public resolve(
    environmentOrLocationId: string,
    options: EnvironmentRuntimeOptions = {}
  ): ResolvedEnvironment {
    let env: EnvironmentDefinition | undefined =
      environmentRegistry.getEnvironment(environmentOrLocationId) ||
      environmentRegistry.getEnvironmentByLocation(environmentOrLocationId);

    let isFallback = false;
    let fallbackReason: string | undefined;

    if (!env) {
      console.warn(
        `[EnvironmentVariantResolver] Unknown environment "${environmentOrLocationId}", falling back to ${this.DEFAULT_ENVIRONMENT_ID}`
      );
      env = environmentRegistry.getEnvironment(this.DEFAULT_ENVIRONMENT_ID)!;
      isFallback = true;
      fallbackReason = `environment_not_found: ${environmentOrLocationId}`;
    }

    // 2. Resolve Variant
    let matchedVariant: EnvironmentVariantDefinition | undefined;

    if (options.variantId) {
      // Find variant by explicit ID
      matchedVariant = env.variants?.find((v) => v.variantId === options.variantId);

      // If not in this environment, check if variant belongs to another
      if (!matchedVariant) {
        const found = environmentRegistry.getVariant(options.variantId);
        if (found && found.envId === env.id) {
          matchedVariant = found.variant;
        } else {
          isFallback = true;
          fallbackReason = `variant_not_found_on_env: ${options.variantId}`;
        }
      }
    } else if (options.time || options.weather) {
      // Find by lighting / weather tags
      matchedVariant = env.variants?.find((v) => {
        const timeMatch = !options.time || v.time === options.time;
        const weatherMatch = !options.weather || v.weather === options.weather;
        return timeMatch && weatherMatch;
      });
    }

    // 3. Resolve background asset and cssFilter
    let backgroundUrl = env.masterAsset;
    let cssFilter: string | undefined;

    if (matchedVariant) {
      if (matchedVariant.mode === 'raster' && matchedVariant.asset) {
        backgroundUrl = matchedVariant.asset;
      } else if (matchedVariant.mode === 'runtime') {
        // Runtime variant uses master backdrop + CSS filter
        backgroundUrl = env.masterAsset;
        cssFilter = matchedVariant.cssFilter;
      }
    }

    return {
      environment: env,
      activeVariant: matchedVariant,
      isFallback,
      fallbackReason,
      backgroundUrl,
      cssFilter,
      layers: env.layerDefinitions || [],
      safeZones: env.safeZones,
      camera: env.camera,
    };
  }

  /** Resolve the canonical environment and its approved scene-specific variant. */
  public resolveForScene(
    sceneId: string,
    options: EnvironmentRuntimeOptions = {}
  ): ResolvedEnvironment | null {
    const environment = environmentRegistry.getEnvironmentByScene(sceneId);
    if (!environment) return null;

    const mappedVariant = environment.variants?.find((variant) =>
      variant.scenes?.includes(sceneId)
    );

    return this.resolve(environment.id, {
      ...options,
      variantId: options.variantId || mappedVariant?.variantId,
    });
  }
}

export const environmentVariantResolver = EnvironmentVariantResolver.getInstance();
