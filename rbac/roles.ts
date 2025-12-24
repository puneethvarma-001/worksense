/**
 * RBAC Roles Module
 * Defines roles, role hierarchies, and role-related utilities
 * Centralized source of truth for role definitions
 */

import type { Role, Permission } from '@/lib/types';
import { ROLES, ROLE_LABELS, ROLE_DESCRIPTIONS, ROLE_PERMISSIONS } from '@/lib/constants';

// ────────────────────────────────────────
// ROLE CONSTANTS
// ────────────────────────────────────────

export const AllRoles: Role[] = ['AMP', 'HR', 'Manager', 'Employee', 'TA'];

/**
 * Role hierarchy for access control
 * Higher numeric value = higher privilege
 * Not a replacement for permissions, but useful for quick checks
 */
export const ROLE_HIERARCHY: Record<Role, number> = {
  AMP: 100, // Admin / Platform Owner
  HR: 80, // Human Resources
  TA: 60, // Talent Acquisition
  Manager: 40, // Manager
  Employee: 20 // Employee
};

/**
 * Check if a role is valid
 */
export function isValidRole(role: string): role is Role {
  return AllRoles.includes(role as Role);
}

/**
 * Get role label for UI display
 */
export function getRoleLabel(role: Role): string {
  return ROLE_LABELS[role] || role;
}

/**
 * Get role description
 */
export function getRoleDescription(role: Role): string {
  return ROLE_DESCRIPTIONS[role] || '';
}

/**
 * Get role permissions
 */
export function getRolePermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Check if a role has a specific permission
 */
export function roleHasPermission(role: Role, permission: Permission): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
}

/**
 * Check if a role has any of the specified permissions
 */
export function roleHasAnyPermission(role: Role, permissions: Permission[]): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.some((p) => rolePermissions.includes(p));
}

/**
 * Check if a role has all of the specified permissions
 */
export function roleHasAllPermissions(role: Role, permissions: Permission[]): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.every((p) => rolePermissions.includes(p));
}

/**
 * Compare roles by hierarchy
 * Returns: 1 if role1 > role2, -1 if role1 < role2, 0 if equal
 */
export function compareRoleHierarchy(role1: Role, role2: Role): number {
  const hierarchy1 = ROLE_HIERARCHY[role1];
  const hierarchy2 = ROLE_HIERARCHY[role2];

  if (hierarchy1 > hierarchy2) return 1;
  if (hierarchy1 < hierarchy2) return -1;
  return 0;
}

/**
 * Check if role1 is superior to role2
 */
export function isRoleSuperior(role1: Role, role2: Role): boolean {
  return compareRoleHierarchy(role1, role2) > 0;
}

/**
 * Check if role1 is equal or superior to role2
 */
export function isRoleSuperiorOrEqual(role1: Role, role2: Role): boolean {
  return compareRoleHierarchy(role1, role2) >= 0;
}

/**
 * Get roles that can manage a specific role
 * Role can manage roles with lower hierarchy
 */
export function getRolesThatCanManage(role: Role): Role[] {
  const hierarchy = ROLE_HIERARCHY[role];
  return AllRoles.filter((r) => ROLE_HIERARCHY[r] > hierarchy);
}

/**
 * Get roles that can be managed by a specific role
 */
export function getRolesManagedBy(role: Role): Role[] {
  const hierarchy = ROLE_HIERARCHY[role];
  return AllRoles.filter((r) => ROLE_HIERARCHY[r] < hierarchy);
}

/**
 * Get all roles sorted by hierarchy (descending)
 */
export function getAllRolesSorted(): Role[] {
  return [...AllRoles].sort((a, b) => compareRoleHierarchy(b, a));
}

/**
 * Get all roles for dropdown/select UI
 */
export function getRolesForSelect(): Array<{ value: Role; label: string; description: string }> {
  return AllRoles.map((role) => ({
    value: role,
    label: getRoleLabel(role),
    description: getRoleDescription(role)
  }));
}

/**
 * Validate role assignment
 * Checks if a user with sourceRole can assign targetRole
 */
export function canAssignRole(sourceRole: Role, targetRole: Role): boolean {
  // A user can only assign roles to users with lower or equal hierarchy
  return isRoleSuperior(sourceRole, targetRole);
}

/**
 * Get role metadata
 */
export function getRoleMetadata(role: Role) {
  return {
    role,
    label: getRoleLabel(role),
    description: getRoleDescription(role),
    permissions: getRolePermissions(role),
    hierarchy: ROLE_HIERARCHY[role],
    managedBy: getRolesThatCanManage(role),
    canManage: getRolesManagedBy(role)
  };
}
