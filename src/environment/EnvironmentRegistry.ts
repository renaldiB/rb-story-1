import type {
  EnvironmentDefinition,
  EnvironmentMasterId,
  EnvironmentLayerDefinition,
  EnvironmentVariantDefinition,
} from './types.ts';

import envData from '../../docs/environment_registry.json' with { type: 'json' };

export class EnvironmentRegistry {
  private static instance: EnvironmentRegistry | null = null;
  private environments: Map<string, EnvironmentDefinition> = new Map();
  private locationMap: Map<string, string> = new Map();
  private variantMap: Map<string, { envId: string; variant: EnvironmentVariantDefinition }> = new Map();
  private sceneMap: Map<string, string> = new Map();
  private aliasMap: Map<string, string> = new Map();

  private constructor() {
    this.initialize();
  }

  public static getInstance(): EnvironmentRegistry {
    if (!EnvironmentRegistry.instance) {
      EnvironmentRegistry.instance = new EnvironmentRegistry();
    }
    return EnvironmentRegistry.instance;
  }

  private normalizeId(id: string): string {
    const raw = (id || '').trim();
    if (this.aliasMap.has(raw)) {
      return this.aliasMap.get(raw)!;
    }
    const lower = raw.toLowerCase();
    if (this.aliasMap.has(lower)) {
      return this.aliasMap.get(lower)!;
    }
    return raw;
  }

  private initialize(): void {
    const envList = (envData.environments || []) as unknown as EnvironmentDefinition[];

    for (const env of envList) {
      this.environments.set(env.id, env);

      const baseName = env.id.replace(/^env_/, '').replace(/_master$/, '');
      this.aliasMap.set(env.id, env.id);
      this.aliasMap.set(`env_${baseName}`, env.id);
      this.aliasMap.set(baseName, env.id);

      // Location mapping
      if (env.locationId) {
        this.locationMap.set(env.locationId, env.id);
        this.aliasMap.set(env.locationId, env.id);
      }

      // Scene mapping
      for (const sceneId of env.scenes || []) {
        this.sceneMap.set(sceneId, env.id);
      }

      // Variant mapping
      for (const variant of env.variants || []) {
        this.variantMap.set(variant.variantId, {
          envId: env.id,
          variant,
        });
        this.aliasMap.set(variant.variantId, env.id);
      }
    }
  }

  public getEnvironment(id: string): EnvironmentDefinition | undefined {
    if (!id) return undefined;
    const normalized = this.normalizeId(id);
    return this.environments.get(normalized);
  }

  public getEnvironmentByLocation(locationId: string): EnvironmentDefinition | undefined {
    if (!locationId) return undefined;
    const envId = this.locationMap.get(locationId) || this.aliasMap.get(locationId);
    return envId ? this.environments.get(envId) : undefined;
  }

  public getEnvironmentByScene(sceneId: string): EnvironmentDefinition | undefined {
    if (!sceneId) return undefined;
    const envId = this.sceneMap.get(sceneId);
    return envId ? this.environments.get(envId) : undefined;
  }

  public getVariant(variantId: string): { envId: string; variant: EnvironmentVariantDefinition } | undefined {
    if (!variantId) return undefined;
    return this.variantMap.get(variantId);
  }

  public getAllEnvironments(): EnvironmentDefinition[] {
    return Array.from(this.environments.values());
  }

  public getAllMasters(): EnvironmentMasterId[] {
    return Array.from(this.environments.keys()) as EnvironmentMasterId[];
  }

  public getAllLayers(): EnvironmentLayerDefinition[] {
    const layers: EnvironmentLayerDefinition[] = [];
    for (const env of this.environments.values()) {
      layers.push(...(env.layerDefinitions || []));
    }
    return layers;
  }

  public getAllVariants(): EnvironmentVariantDefinition[] {
    const variants: EnvironmentVariantDefinition[] = [];
    for (const env of this.environments.values()) {
      variants.push(...(env.variants || []));
    }
    return variants;
  }

  public hasEnvironment(id: string): boolean {
    return this.environments.has(this.normalizeId(id));
  }
}

export const environmentRegistry = EnvironmentRegistry.getInstance();
