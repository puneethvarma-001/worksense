/**
 * Feature Flags Hooks
 * React hooks for checking feature flags in components
 * Server component compatible (using getTenantContext)
 */

'use client';

import type { FeatureFlag } from '@/lib/types';
import { useTenant, useUserRole } from '@/services/tenant/context';
import { featureFlagService } from './service';
import { useState, useEffect } from 'react';

/**
 * Check if a feature is enabled
 * Returns boolean, can be used for conditional rendering
 */
export function useFeatureFlag(flag: FeatureFlag): boolean {
  const tenant = useTenant();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFlag() {
      if (!tenant) {
        setEnabled(false);
        setLoading(false);
        return;
      }

      try {
        const result = await featureFlagService.isFeatureEnabled(
          flag,
          tenant.id,
          tenant.tier
        );
        setEnabled(result);
      } catch (error) {
        console.error(`Failed to check feature flag: ${flag}`, error);
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    }

    checkFlag();
  }, [flag, tenant]);

  return enabled && !loading;
}

/**
 * Get multiple feature flags at once
 */
export function useFeatureFlags(flags: FeatureFlag[]): Record<FeatureFlag, boolean> {
  const tenant = useTenant();
  const [enabledFlags, setEnabledFlags] = useState<Record<FeatureFlag, boolean>>({} as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkFlags() {
      if (!tenant) {
        setEnabledFlags({} as any);
        setLoading(false);
        return;
      }

      try {
        const result: Record<FeatureFlag, boolean> = {} as any;
        for (const flag of flags) {
          result[flag] = await featureFlagService.isFeatureEnabled(
            flag,
            tenant.id,
            tenant.tier
          );
        }
        setEnabledFlags(result);
      } catch (error) {
        console.error('Failed to check feature flags', error);
        setEnabledFlags({} as any);
      } finally {
        setLoading(false);
      }
    }

    checkFlags();
  }, [flags, tenant]);

  return enabledFlags;
}

/**
 * Get all enabled features for current tenant
 */
export function useEnabledFeatures() {
  const tenant = useTenant();
  const [features, setFeatures] = useState<Record<FeatureFlag, boolean>>({} as any);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFeatures() {
      if (!tenant) {
        setFeatures({} as any);
        setLoading(false);
        return;
      }

      try {
        const result = await featureFlagService.getAllFeatureFlags(
          tenant.id,
          tenant.tier
        );
        setFeatures(result);
      } catch (error) {
        console.error('Failed to load feature flags', error);
        setFeatures({} as any);
      } finally {
        setLoading(false);
      }
    }

    loadFeatures();
  }, [tenant]);

  return { features, loading };
}

/**
 * Hook to get feature flag status with loading state
 */
export function useFeatureFlagWithStatus(flag: FeatureFlag) {
  const tenant = useTenant();
  const [enabled, setEnabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkFlag() {
      if (!tenant) {
        setEnabled(false);
        setLoading(false);
        return;
      }

      try {
        const result = await featureFlagService.isFeatureEnabled(
          flag,
          tenant.id,
          tenant.tier
        );
        setEnabled(result);
        setError(null);
      } catch (err) {
        console.error(`Failed to check feature flag: ${flag}`, err);
        setError(err instanceof Error ? err.message : 'Unknown error');
        setEnabled(false);
      } finally {
        setLoading(false);
      }
    }

    checkFlag();
  }, [flag, tenant]);

  return { enabled, loading, error };
}
