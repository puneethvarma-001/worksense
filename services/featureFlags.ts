import { redis } from '@/lib/redis';

export type FeatureFlags = Record<string, boolean>;

export async function getFlagsForTenant(tenantId: string): Promise<FeatureFlags> {
  const key = `tenant:${tenantId}:flags`;
  try {
    const data = await redis.get<FeatureFlags>(key);
    return data || defaultFlags();
  } catch (err) {
    // On error, fallback to defaults
    console.warn('featureFlags:getFlagsForTenant error', err);
    return defaultFlags();
  }
}

function defaultFlags(): FeatureFlags {
  return {
    FEATURE_LEAVE: process.env.FEATURE_LEAVE === 'true',
    FEATURE_ATTENDANCE: process.env.FEATURE_ATTENDANCE === 'true',
    FEATURE_ONBOARDING: process.env.FEATURE_ONBOARDING === 'true',
    FEATURE_PAYROLL: process.env.FEATURE_PAYROLL === 'true',
    FEATURE_AI_RESUME: process.env.FEATURE_AI_RESUME === 'true',
    FEATURE_AI_AUTOSCREEN: process.env.FEATURE_AI_AUTOSCREEN === 'true'
  };
}

export async function isFeatureEnabled(tenantId: string, flag: string) {
  const flags = await getFlagsForTenant(tenantId);
  return !!flags[flag];
}
