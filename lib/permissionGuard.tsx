import { cookies, headers } from 'next/headers';
import { parseDemoRole } from './tenantContext';
import { checkPermission, PermissionError } from '@/lib/rbac/checkPermission';
import type { Permission } from '@/lib/rbac/roles';

/**
 * Server-side helper to get the current demo role from cookies
 */
export async function getCurrentRole(): Promise<string> {
  const demo = (await cookies()).get('demo_session')?.value;
  return parseDemoRole(demo) || 'Employee';
}

/**
 * Server-side helper to check if the current user has a permission
 */
export async function hasPermission(permission: Permission): Promise<boolean> {
  const role = await getCurrentRole();
  return checkPermission([role], permission);
}

/**
 * Server-side guard component that renders children only if permission is granted
 * Shows a friendly forbidden UI if permission is denied
 */
export async function PermissionGuard({
  permission,
  children,
  fallback
}: {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  const allowed = await hasPermission(permission);
  
  if (!allowed) {
    return (
      fallback || (
        <div className="p-6 max-w-2xl mx-auto">
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
            <h2 className="text-xl font-semibold text-amber-900">Access Restricted</h2>
            <p className="mt-2 text-sm text-amber-800">
              You don't have permission to access this page. Required permission: <code className="px-1 py-0.5 bg-amber-100 rounded">{permission}</code>
            </p>
            <p className="mt-3 text-sm text-amber-700">
              Contact your administrator to request access.
            </p>
          </div>
        </div>
      )
    );
  }
  
  return <>{children}</>;
}
