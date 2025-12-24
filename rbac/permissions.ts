/**
 * RBAC Permissions Module
 * Validates and checks permissions across the system
 */

import type { Permission, Role } from '@/lib/types';
import { ROLE_PERMISSIONS } from '@/lib/constants';
import { usePermissions as useContextPermissions, getTenantContext } from '@/services/tenant/context';

// ────────────────────────────────────────
// PERMISSION CONSTANTS
// ────────────────────────────────────────

export const PermissionCategories = {
  DASHBOARD: ['view:dashboard'],
  EMPLOYEES: ['manage:employees'],
  PAYROLL: ['manage:payroll'],
  LEAVE: ['manage:leave', 'request:leave', 'approve:leave'],
  ATTENDANCE: ['manage:attendance'],
  ONBOARDING: ['manage:onboarding'],
  ORG_STRUCTURE: ['manage:org_structure'],
  POLICIES: ['manage:policies'],
  HOLIDAYS: ['manage:holidays'],
  PAYSLIPS: ['view:payslips'],
  AI: ['use:ai_features'],
  CANDIDATES: ['manage:candidates'],
  ADMIN: ['manage:settings', 'manage:feature_flags'],
  PROFILE: ['view:profile', 'edit:profile'],
  TEAM: ['view:team_metrics', 'manage:team_members']
};

// ────────────────────────────────────────
// PERMISSION VALIDATORS
// ────────────────────────────────────────

/**
 * Check if a permission is valid
 */
export function isValidPermission(permission: string): permission is Permission {
  const allPermissions = Object.values(PermissionCategories).flat();
  return allPermissions.includes(permission as Permission);
}

/**
 * Get all permissions for a role
 */
export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if role has permission
 */
export function roleHasPermission(role: Role, permission: Permission): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
}

/**
 * Check if role has any of the permissions
 */
export function roleHasAnyPermission(role: Role, permissions: Permission[]): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.some((p) => rolePermissions.includes(p));
}

/**
 * Check if role has all of the permissions
 */
export function roleHasAllPermissions(role: Role, permissions: Permission[]): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.every((p) => rolePermissions.includes(p));
}

// ────────────────────────────────────────
// CONTEXT-BASED PERMISSION CHECKS
// ────────────────────────────────────────

/**
 * Check if current user has permission (in context)
 * Used in server components and server actions
 */
export function hasPermission(permission: Permission): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return context.permissions.includes(permission);
}

/**
 * Check if current user has any of the permissions
 */
export function hasAnyPermission(permissions: Permission[]): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return permissions.some((p) => context.permissions.includes(p));
}

/**
 * Check if current user has all of the permissions
 */
export function hasAllPermissions(permissions: Permission[]): boolean {
  const context = getTenantContext();
  if (!context) {
    return false;
  }
  return permissions.every((p) => context.permissions.includes(p));
}

/**
 * Assert permission - throw if user doesn't have it
 */
export function assertPermission(permission: Permission, message?: string): void {
  if (!hasPermission(permission)) {
    throw new Error(
      message || `Permission denied: ${permission}`
    );
  }
}

/**
 * Assert any of permissions
 */
export function assertAnyPermission(permissions: Permission[], message?: string): void {
  if (!hasAnyPermission(permissions)) {
    throw new Error(
      message || `Permission denied: requires one of ${permissions.join(', ')}`
    );
  }
}

/**
 * Assert all permissions
 */
export function assertAllPermissions(permissions: Permission[], message?: string): void {
  if (!hasAllPermissions(permissions)) {
    throw new Error(
      message || `Permission denied: requires all of ${permissions.join(', ')}`
    );
  }
}

// ────────────────────────────────────────
// PERMISSION HOOKS (for components)
// ────────────────────────────────────────

/**
 * Hook to check if user has permission
 */
export function useHasPermission(permission: Permission): boolean {
  const permissions = useContextPermissions();
  return permissions.includes(permission);
}

/**
 * Hook to check if user has any permission
 */
export function useHasAnyPermission(permissions: Permission[]): boolean {
  const userPermissions = useContextPermissions();
  return permissions.some((p) => userPermissions.includes(p));
}

/**
 * Hook to check if user has all permissions
 */
export function useHasAllPermissions(permissions: Permission[]): boolean {
  const userPermissions = useContextPermissions();
  return permissions.every((p) => userPermissions.includes(p));
}

/**
 * Hook to get all user permissions
 */
export function useUserPermissions(): Permission[] {
  return useContextPermissions();
}

// ────────────────────────────────────────
// PERMISSION GROUPING & CATEGORIZATION
// ────────────────────────────────────────

/**
 * Get permissions in a category
 */
export function getPermissionsInCategory(
  category: keyof typeof PermissionCategories
): Permission[] {
  return PermissionCategories[category];
}

/**
 * Get permission category for a permission
 */
export function getPermissionCategory(
  permission: Permission
): keyof typeof PermissionCategories | null {
  for (const [category, permissions] of Object.entries(PermissionCategories)) {
    if (permissions.includes(permission)) {
      return category as keyof typeof PermissionCategories;
    }
  }
  return null;
}

/**
 * Get all permissions in multiple categories
 */
export function getPermissionsInCategories(
  categories: (keyof typeof PermissionCategories)[]
): Permission[] {
  return categories.flatMap((cat) => PermissionCategories[cat]);
}

/**
 * Check if user has access to a module/category
 */
export function hasAccessToCategory(
  category: keyof typeof PermissionCategories
): boolean {
  const permissions = PermissionCategories[category];
  return hasAnyPermission(permissions);
}
