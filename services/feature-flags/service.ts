/**
 * Feature Flags Service
 * Manages feature flags using environment variables with KV overrides
 * Flags can be enabled/disabled per tenant tier
 */

import { redis } from '@/lib/redis';
import type { FeatureFlag, TenantId } from '@/lib/types';
import { FEATURE_FLAGS, KV_KEYS, CACHE_DURATIONS } from '@/lib/constants';
import { env } from '@/lib/env';

/**
 * Feature Flags Service
 * Singleton pattern for consistent feature flag access
 */
export class FeatureFlagService {
  private static instance: FeatureFlagService;
  private cache: Map<string, boolean> = new Map();

  private constructor() {}

  static getInstance(): FeatureFlagService {
    if (!FeatureFlagService.instance) {
      FeatureFlagService.instance = new FeatureFlagService();
    }
    return FeatureFlagService.instance;
  }

  /**
   * Check if a feature flag is enabled for a tenant
   * Respects: environment variables > KV overrides > defaults
   * Also checks tenant tier availability
   */
  async isFeatureEnabled(
    flag: FeatureFlag,
    tenantId?: TenantId | string,
    tenantTier?: string
  ): Promise<boolean> {
    // Check cache first
    const cacheKey = tenantId ? `${flag}:${tenantId}` : flag;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey)!;
    }

    try {
      // Get feature config
      const featureConfig = FEATURE_FLAGS[flag];
      if (!featureConfig) {
        return false;
      }

      // Check tenant tier availability (if tier provided)
      if (tenantTier && !featureConfig.availableTiers.includes(tenantTier as any)) {
        this.cache.set(cacheKey, false);
        return false;
      }

      // Check environment variable override first
      const envVarName = flag;
      const envValue = env[envVarName as keyof typeof env];
      if (typeof envValue === 'boolean') {
        this.cache.set(cacheKey, envValue);
        return envValue;
      }

      // Check KV override if tenant ID provided
      if (tenantId) {
        const kvKey = `feature_flag:${tenantId}:${flag}`;
        try {
          const kvValue = await redis.get<boolean>(kvKey);
          if (kvValue !== null) {
            this.cache.set(cacheKey, kvValue);
            return kvValue;
          }
        } catch (error) {
          console.warn(`Failed to check KV for flag ${flag}`, error);
        }
      }

      // Use default configuration
      const enabled = featureConfig.enabled;
      this.cache.set(cacheKey, enabled);
      return enabled;
    } catch (error) {
      console.error(`Error checking feature flag: ${flag}`, error);
      // Default to false on error
      return false;
    }
  }

  /**
   * Get all feature flags status for a tenant
   */
  async getAllFeatureFlags(
    tenantId?: TenantId | string,
    tenantTier?: string
  ): Promise<Record<FeatureFlag, boolean>> {
    const flags = Object.keys(FEATURE_FLAGS) as FeatureFlag[];
    const result: Record<FeatureFlag, boolean> = {} as any;

    for (const flag of flags) {
      result[flag] = await this.isFeatureEnabled(flag, tenantId, tenantTier);
    }

    return result;
  }

  /**
   * Set feature flag for a tenant (KV override)
   */
  async setFeatureFlagOverride(
    flag: FeatureFlag,
    tenantId: TenantId | string,
    enabled: boolean
  ): Promise<void> {
    try {
      const kvKey = `feature_flag:${tenantId}:${flag}`;
      await redis.setex(
        kvKey,
        CACHE_DURATIONS.FEATURE_FLAGS,
        JSON.stringify(enabled)
      );

      // Clear cache
      const cacheKey = `${flag}:${tenantId}`;
      this.cache.delete(cacheKey);
    } catch (error) {
      console.error(`Failed to set feature flag override: ${flag}`, error);
      throw error;
    }
  }

  /**
   * Clear all feature flag cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Clear cache for specific flag
   */
  clearCacheForFlag(flag: FeatureFlag): void {
    // Clear all entries containing this flag
    for (const key of this.cache.keys()) {
      if (key.startsWith(flag)) {
        this.cache.delete(key);
      }
    }
  }

  /**
   * Get feature flag config
   */
  getFeatureFlagConfig(flag: FeatureFlag) {
    return FEATURE_FLAGS[flag] || null;
  }

  /**
   * Get all feature flag configs
   */
  getAllFeatureFlagConfigs() {
    return FEATURE_FLAGS;
  }

  /**
   * Check if flag is available for tier
   */
  isAvailableForTier(flag: FeatureFlag, tier: string): boolean {
    const config = this.getFeatureFlagConfig(flag);
    if (!config) return false;
    return config.availableTiers.includes(tier as any);
  }
}

// Export singleton instance
export const featureFlagService = FeatureFlagService.getInstance();
