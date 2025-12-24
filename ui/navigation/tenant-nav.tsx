/**
 * Tenant Navigation
 * Top navigation bar for tenant application
 * Displays tenant info, user info, and quick actions
 */

'use client';

import Link from 'next/link';
import { useTenant, useUserRole } from '@/services/tenant/context';
import { getRoleLabel } from '@/rbac/roles';

interface TenantNavigationProps {
  tenant: string;
}

/**
 * Tenant Navigation Component
 * Provides top-level navigation and user context
 */
export function TenantNavigation({ tenant }: TenantNavigationProps) {
  const tenantInfo = useTenant();
  const userRole = useUserRole();
  const roleLabel = userRole ? getRoleLabel(userRole) : 'User';

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-6 py-3 flex items-center justify-between">
        {/* Logo and Tenant Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
            {tenantInfo?.emoji || '🏢'}
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              {tenantInfo?.name || tenant}
            </h1>
            <p className="text-xs text-gray-500">{roleLabel}</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          {/* Profile Link */}
          <Link
            href={`/s/${tenant}/profile`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Profile
          </Link>

          {/* Settings Link */}
          <Link
            href={`/s/${tenant}/settings`}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            Settings
          </Link>

          {/* User Icon */}
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-medium text-sm">
            U
          </div>
        </div>
      </div>
    </nav>
  );
}
