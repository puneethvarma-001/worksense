/**
 * RBAC Guards
 * Utilities for protecting server actions and API routes with RBAC
 */

import type { Permission, Role, TenantContext } from '@/lib/types';
import { getTenantContext } from '@/services/tenant/context';
import { roleHasPermission, roleHasAllPermissions, roleHasAnyPermission } from './roles';
import { hasPermission, hasAllPermissions, hasAnyPermission } from './permissions';

// ────────────────────────────────────────
// ROLE-BASED GUARDS
// ────────────────────────────────────────

/**
 * Check if user has a specific role
 */
export function userHasRole(role: Role): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return context.userRole === role;
}

/**
 * Check if user has one of multiple roles
 */
export function userHasAnyRole(roles: Role[]): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return roles.includes(context.userRole);
}

/**
 * Assert user has specific role
 */
export function assertRole(role: Role, message?: string): void {
  if (!userHasRole(role)) {
    throw new Error(
      message || `Role required: ${role}`
    );
  }
}

/**
 * Assert user has one of multiple roles
 */
export function assertAnyRole(roles: Role[], message?: string): void {
  if (!userHasAnyRole(roles)) {
    throw new Error(
      message || `One of these roles required: ${roles.join(', ')}`
    );
  }
}

// ────────────────────────────────────────
// PERMISSION-BASED GUARDS
// ────────────────────────────────────────

/**
 * Guard factory for permissions
 * Wraps a function with permission check
 */
export function createPermissionGuard<T extends any[], R>(
  permissions: Permission[],
  handler: (context: TenantContext, ...args: T) => R,
  checkMode: 'all' | 'any' = 'all'
) {
  return (...args: T) => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    const hasAccess =
      checkMode === 'all'
        ? permissions.every((p) => context.permissions.includes(p))
        : permissions.some((p) => context.permissions.includes(p));

    if (!hasAccess) {
      throw new Error(`Permission denied: ${permissions.join(', ')}`);
    }

    return handler(context, ...args);
  };
}

/**
 * Async permission guard factory
 */
export function createPermissionGuardAsync<T extends any[], R>(
  permissions: Permission[],
  handler: (context: TenantContext, ...args: T) => Promise<R>,
  checkMode: 'all' | 'any' = 'all'
) {
  return async (...args: T): Promise<R> => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    const hasAccess =
      checkMode === 'all'
        ? permissions.every((p) => context.permissions.includes(p))
        : permissions.some((p) => context.permissions.includes(p));

    if (!hasAccess) {
      throw new Error(`Permission denied: ${permissions.join(', ')}`);
    }

    return handler(context, ...args);
  };
}

// ────────────────────────────────────────
// ROLE-BASED GUARDS (FACTORY)
// ────────────────────────────────────────

/**
 * Guard factory for roles
 */
export function createRoleGuard<T extends any[], R>(
  roles: Role[],
  handler: (context: TenantContext, ...args: T) => R
) {
  return (...args: T) => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    if (!roles.includes(context.userRole)) {
      throw new Error(
        `Access denied: role must be one of ${roles.join(', ')}`
      );
    }

    return handler(context, ...args);
  };
}

/**
 * Async role guard factory
 */
export function createRoleGuardAsync<T extends any[], R>(
  roles: Role[],
  handler: (context: TenantContext, ...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    if (!roles.includes(context.userRole)) {
      throw new Error(
        `Access denied: role must be one of ${roles.join(', ')}`
      );
    }

    return handler(context, ...args);
  };
}

// ────────────────────────────────────────
// COMBINED GUARDS
// ────────────────────────────────────────

/**
 * Guard factory combining role and permission checks
 */
export function createRBACGuard<T extends any[], R>(
  options: {
    roles?: Role[];
    permissions?: Permission[];
    checkMode?: 'all' | 'any';
  },
  handler: (context: TenantContext, ...args: T) => R
) {
  return (...args: T) => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    // Check roles if specified
    if (options.roles && !options.roles.includes(context.userRole)) {
      throw new Error(
        `Access denied: role must be one of ${options.roles.join(', ')}`
      );
    }

    // Check permissions if specified
    if (options.permissions) {
      const hasAccess =
        options.checkMode === 'all'
          ? options.permissions.every((p) => context.permissions.includes(p))
          : options.permissions.some((p) => context.permissions.includes(p));

      if (!hasAccess) {
        throw new Error(`Permission denied: ${options.permissions.join(', ')}`);
      }
    }

    return handler(context, ...args);
  };
}

/**
 * Async combined RBAC guard
 */
export function createRBACGuardAsync<T extends any[], R>(
  options: {
    roles?: Role[];
    permissions?: Permission[];
    checkMode?: 'all' | 'any';
  },
  handler: (context: TenantContext, ...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const context = getTenantContext();
    if (!context) {
      throw new Error('Tenant context required');
    }

    // Check roles if specified
    if (options.roles && !options.roles.includes(context.userRole)) {
      throw new Error(
        `Access denied: role must be one of ${options.roles.join(', ')}`
      );
    }

    // Check permissions if specified
    if (options.permissions) {
      const hasAccess =
        options.checkMode === 'all'
          ? options.permissions.every((p) => context.permissions.includes(p))
          : options.permissions.some((p) => context.permissions.includes(p));

      if (!hasAccess) {
        throw new Error(`Permission denied: ${options.permissions.join(', ')}`);
      }
    }

    return handler(context, ...args);
  };
}

// ────────────────────────────────────────
// UTILITY CHECKS
// ────────────────────────────────────────

/**
 * Check if user can perform action on resource
 */
export function canPerformAction(
  action: Permission,
  userRole: Role
): boolean {
  return roleHasPermission(userRole, action);
}

/**
 * Check if user can view payslips (based on role or permissions)
 */
export function canViewPayslips(): boolean {
  return hasPermission('view:payslips');
}

/**
 * Check if user can request leave
 */
export function canRequestLeave(): boolean {
  return hasPermission('request:leave');
}

/**
 * Check if user can approve leave
 */
export function canApproveLeave(): boolean {
  return hasPermission('approve:leave');
}

/**
 * Check if user can manage employees
 */
export function canManageEmployees(): boolean {
  return hasPermission('manage:employees');
}

/**
 * Check if user can access admin features
 */
export function canAccessAdmin(): boolean {
  return hasAllPermissions(['manage:settings', 'manage:feature_flags']);
}

/**
 * Check if user can use AI features
 */
export function canUseAIFeatures(): boolean {
  return hasPermission('use:ai_features');
}
