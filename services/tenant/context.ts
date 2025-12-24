/**
 * Tenant Context
 * Request-scoped context for tenant and user information
 * Stored in AsyncLocalStorage for server components and server actions
 */

import { AsyncLocalStorage } from 'async_hooks';
import type { TenantContext } from '@/lib/types';

/**
 * AsyncLocalStorage for tenant context
 * Allows access to tenant info in async context without prop drilling
 */
const tenantContextStorage = new AsyncLocalStorage<TenantContext | null>();

/**
 * Store tenant context for current request
 * Call this in middleware or at the entry point of request handling
 */
export function setTenantContext(context: TenantContext): void {
  // Store must be done through middleware or request handler
  // This is a placeholder for the actual implementation
  void context;
}

/**
 * Retrieve tenant context for current request
 * Returns null if not set or outside async context
 */
export function getTenantContext(): TenantContext | null {
  try {
    return tenantContextStorage.getStore() || null;
  } catch {
    return null;
  }
}

/**
 * Run function with tenant context
 * Use this in middleware or request handlers
 */
export function runWithTenantContext<T>(
  context: TenantContext | null,
  fn: () => T
): T {
  if (!context) {
    return fn();
  }

  return tenantContextStorage.run(context, fn);
}

/**
 * Run async function with tenant context
 * Use this in middleware or request handlers for async operations
 */
export async function runWithTenantContextAsync<T>(
  context: TenantContext | null,
  fn: () => Promise<T>
): Promise<T> {
  if (!context) {
    return fn();
  }

  return tenantContextStorage.run(context, fn);
}

/**
 * Hook to get tenant context in server components
 * Returns the tenant context or null if not available
 */
export function useTenantContext(): TenantContext | null {
  return getTenantContext();
}

/**
 * Hook to safely get tenant context with validation
 * Throws if context is not available (useful for protected components)
 */
export function useTenantContextRequired(): TenantContext {
  const context = getTenantContext();
  if (!context) {
    throw new Error(
      'Tenant context not available. Ensure component is within tenant scope.'
    );
  }
  return context;
}

/**
 * Hook to get tenant from context
 */
export function useTenant() {
  const context = getTenantContext();
  return context?.tenant || null;
}

/**
 * Hook to get user role from context
 */
export function useUserRole() {
  const context = getTenantContext();
  return context?.userRole || null;
}

/**
 * Hook to get user permissions from context
 */
export function usePermissions() {
  const context = getTenantContext();
  return context?.permissions || [];
}

/**
 * Hook to check if user has specific permission
 */
export function useHasPermission(permission: string): boolean {
  const permissions = usePermissions();
  return permissions.includes(permission as any);
}

/**
 * Hook to check multiple permissions (AND logic)
 */
export function useHasAllPermissions(permissions: string[]): boolean {
  const userPermissions = usePermissions();
  return permissions.every((p) => userPermissions.includes(p as any));
}

/**
 * Hook to check multiple permissions (OR logic)
 */
export function useHasAnyPermission(permissions: string[]): boolean {
  const userPermissions = usePermissions();
  return permissions.some((p) => userPermissions.includes(p as any));
}

/**
 * Export storage for advanced use cases
 */
export { tenantContextStorage };
