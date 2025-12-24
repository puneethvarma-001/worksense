/**
 * Role Guard Component
 * Renders children only if user has required role
 */

'use client';

import type { Role } from '@/lib/types';
import { useUserRole } from '@/services/tenant/context';
import { isRoleSuperiorOrEqual } from '@/rbac/roles';

interface RoleGuardProps {
  role: Role;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * RoleGuard - Single role check
 */
export function RoleGuard({
  role,
  children,
  fallback = null
}: RoleGuardProps) {
  const userRole = useUserRole();

  if (!userRole || userRole !== role) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface AnyRoleGuardProps {
  roles: Role[];
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AnyRoleGuard - Check if user has ANY of the roles
 */
export function AnyRoleGuard({
  roles,
  children,
  fallback = null
}: AnyRoleGuardProps) {
  const userRole = useUserRole();

  if (!userRole || !roles.includes(userRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface MinRoleGuardProps {
  minRole: Role;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * MinRoleGuard - Check if user has at least minimum role level
 * Uses role hierarchy
 */
export function MinRoleGuard({
  minRole,
  children,
  fallback = null
}: MinRoleGuardProps) {
  const userRole = useUserRole();

  if (!userRole || !isRoleSuperiorOrEqual(userRole, minRole)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * AdminOnly - Shortcut for AMP role check
 */
export function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const userRole = useUserRole();

  if (!userRole || userRole !== 'AMP') {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}

interface RequireRoleProps {
  role: Role;
  children: React.ReactNode;
  deniedMessage?: string;
}

/**
 * RequireRole - Show error if role denied
 */
export function RequireRole({
  role,
  children,
  deniedMessage = 'Insufficient privileges'
}: RequireRoleProps) {
  const userRole = useUserRole();

  if (!userRole || userRole !== role) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm text-red-700 font-medium">{deniedMessage}</p>
      </div>
    );
  }

  return <>{children}</>;
}
