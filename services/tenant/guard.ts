/**
 * Tenant Guard
 * Utilities for validating tenant context and protecting routes
 */

import type { TenantContext } from '@/lib/types';
import { getTenantContext } from './context';

/**
 * Validate that tenant context exists
 * Throws if not available
 */
export function assertTenantContext(): TenantContext {
  const context = getTenantContext();
  if (!context) {
    throw new Error('Tenant context not found. Request is not within a tenant scope.');
  }
  return context;
}

/**
 * Guard factory for protecting server actions and API routes
 * Returns a wrapper that validates tenant context before executing
 */
export function createTenantGuard<T extends any[], R>(
  handler: (context: TenantContext, ...args: T) => R
) {
  return (...args: T) => {
    const context = assertTenantContext();
    return handler(context, ...args);
  };
}

/**
 * Async guard factory for async operations
 */
export function createTenantGuardAsync<T extends any[], R>(
  handler: (context: TenantContext, ...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const context = assertTenantContext();
    return handler(context, ...args);
  };
}

/**
 * Check if tenant context is available
 */
export function hasTenantContext(): boolean {
  return getTenantContext() !== null;
}

/**
 * Validate tenant matches expected value
 * Used to ensure request is for the correct tenant
 */
export function validateTenantMatch(expectedTenantId: string): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return context.tenant.id === expectedTenantId;
}

/**
 * Assert tenant matches expected value
 * Throws if validation fails
 */
export function assertTenantMatch(expectedTenantId: string): void {
  if (!validateTenantMatch(expectedTenantId)) {
    throw new Error(
      `Tenant mismatch. Expected ${expectedTenantId} but got different tenant.`
    );
  }
}

/**
 * Type guard for tenant context
 */
export function isTenantContext(value: unknown): value is TenantContext {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const obj = value as Record<string, unknown>;

  return (
    'tenant' in obj &&
    'userId' in obj &&
    'userRole' in obj &&
    'permissions' in obj &&
    typeof obj.tenant === 'object' &&
    obj.tenant !== null &&
    'id' in obj.tenant &&
    'subdomain' in obj.tenant
  );
}

/**
 * Validate tenant status
 * Ensures tenant is active and not suspended
 */
export function isTenantActive(): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return context.tenant.status === 'active';
}

/**
 * Assert tenant is active
 * Throws if tenant is suspended or deleted
 */
export function assertTenantActive(): void {
  const context = getTenantContext();
  if (!context) {
    throw new Error('Tenant context not found');
  }

  if (context.tenant.status !== 'active') {
    throw new Error(
      `Tenant is ${context.tenant.status}. Access denied.`
    );
  }
}

/**
 * Get tenant ID from context with fallback
 */
export function getTenantIdFromContext(fallback?: string): string | undefined {
  const context = getTenantContext();
  return context?.tenant.id || fallback;
}

/**
 * Get user ID from context with fallback
 */
export function getUserIdFromContext(fallback?: string): string | undefined {
  const context = getTenantContext();
  return context?.userId || fallback;
}
