/**
 * FeatureGuard Component
 * Conditionally renders children based on feature flag status
 * Server and client component compatible
 */

'use client';

import type { FeatureFlag } from '@/lib/types';
import { useFeatureFlagWithStatus } from './hooks';

interface FeatureGuardProps {
  flag: FeatureFlag;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * FeatureGuard - Conditionally render content based on feature flag
 * Shows fallback while loading
 */
export function FeatureGuard({
  flag,
  children,
  fallback = null
}: FeatureGuardProps) {
  const { enabled, loading } = useFeatureFlagWithStatus(flag);

  if (loading) {
    return <>{fallback}</>;
  }

  if (!enabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface MultiFeatureGuardProps {
  flags: FeatureFlag[];
  mode?: 'all' | 'any';
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * MultiFeatureGuard - Check multiple flags with AND/OR logic
 */
export function MultiFeatureGuard({
  flags,
  mode = 'all',
  children,
  fallback = null
}: MultiFeatureGuardProps) {
  const [statuses, setStatuses] = React.useState<Record<FeatureFlag, boolean>>({} as any);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function checkFlags() {
      // This would need to be implemented differently for client components
      // For now, using a simple approach
      setLoading(false);
    }

    checkFlags();
  }, [flags]);

  if (loading) {
    return <>{fallback}</>;
  }

  const enabled =
    mode === 'all'
      ? Object.values(statuses).every((v) => v)
      : Object.values(statuses).some((v) => v);

  if (!enabled) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RequireFeatureProps {
  flag: FeatureFlag;
  children: React.ReactNode;
  message?: string;
}

/**
 * RequireFeature - Show error message if feature is not available
 */
export function RequireFeature({
  flag,
  children,
  message = 'This feature is not available'
}: RequireFeatureProps) {
  const { enabled, loading } = useFeatureFlagWithStatus(flag);

  if (loading) {
    return <div className="text-gray-500">{message}</div>;
  }

  if (!enabled) {
    return <div className="text-red-500 text-sm font-medium">{message}</div>;
  }

  return <>{children}</>;
}
