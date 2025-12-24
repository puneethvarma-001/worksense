/**
 * Permission Guard Component
 * Renders children only if user has required permissions
 */

'use client';

import type { Permission } from '@/lib/types';
import { useHasPermission, useHasAnyPermission, useHasAllPermissions } from '@/rbac/permissions';

interface PermissionGuardProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * PermissionGuard - Single permission check
 */
export function PermissionGuard({
  permission,
  children,
  fallback = null
}: PermissionGuardProps) {
  const hasPermission = useHasPermission(permission);

  if (!hasPermission) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface AnyPermissionGuardProps {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AnyPermissionGuard - Check if user has ANY of the permissions
 */
export function AnyPermissionGuard({
  permissions,
  children,
  fallback = null
}: AnyPermissionGuardProps) {
  const hasAny = useHasAnyPermission(permissions);

  if (!hasAny) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface AllPermissionsGuardProps {
  permissions: Permission[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AllPermissionsGuard - Check if user has ALL of the permissions
 */
export function AllPermissionsGuard({
  permissions,
  children,
  fallback = null
}: AllPermissionsGuardProps) {
  const hasAll = useHasAllPermissions(permissions);

  if (!hasAll) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
  deniedMessage?: string;
}

/**
 * RequirePermission - Show error if permission denied
 */
export function RequirePermission({
  permission,
  children,
  deniedMessage = 'You do not have permission to access this'
}: RequirePermissionProps) {
  const hasPermission = useHasPermission(permission);

  if (!hasPermission) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-700 font-medium">{deniedMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
