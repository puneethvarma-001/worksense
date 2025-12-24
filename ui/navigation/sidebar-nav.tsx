/**
 * Sidebar Navigation
 * Role-based sidebar navigation menu
 * Shows different menu items based on user permissions
 */

'use client';

import Link from 'next/link';
import { useHasPermission } from '@/rbac/permissions';
import { useUserRole } from '@/services/tenant/context';
import { LayoutDashboard, Users, CreditCard, Calendar, Clock, Briefcase, Book, FileText, Sparkles, Settings } from 'lucide-react';

interface SidebarNavigationProps {
  tenant: string;
}

interface NavItem {
  icon: React.ReactNode;
  label: string;
  href: string;
  permission?: string;
}

/**
 * Sidebar Navigation Component
 * Displays role-aware menu items
 */
export function SidebarNavigation({ tenant }: SidebarNavigationProps) {
  const userRole = useUserRole();

  // Navigation items with permission requirements
  const menuItems: NavItem[] = [
    {
      icon: <LayoutDashboard className="w-5 h-5" />,
      label: 'Dashboard',
      href: `/s/${tenant}/dashboard`,
      permission: 'view:dashboard'
    },
    {
      icon: <Users className="w-5 h-5" />,
      label: 'Employees',
      href: `/s/${tenant}/modules/employees`,
      permission: 'manage:employees'
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      label: 'Payroll',
      href: `/s/${tenant}/modules/payroll`,
      permission: 'manage:payroll'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Leave',
      href: `/s/${tenant}/modules/leave`,
      permission: 'manage:leave'
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: 'Attendance',
      href: `/s/${tenant}/modules/attendance`,
      permission: 'manage:attendance'
    },
    {
      icon: <Briefcase className="w-5 h-5" />,
      label: 'Onboarding',
      href: `/s/${tenant}/modules/onboarding`,
      permission: 'manage:onboarding'
    },
    {
      icon: <Book className="w-5 h-5" />,
      label: 'Org Structure',
      href: `/s/${tenant}/modules/org-structure`,
      permission: 'manage:org_structure'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      label: 'Policies',
      href: `/s/${tenant}/modules/policies`,
      permission: 'manage:policies'
    },
    {
      icon: <Sparkles className="w-5 h-5" />,
      label: 'AI Tools',
      href: `/s/${tenant}/modules/ai`,
      permission: 'use:ai_features'
    },
    {
      icon: <Settings className="w-5 h-5" />,
      label: 'Settings',
      href: `/s/${tenant}/settings`,
      permission: 'manage:settings'
    }
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Logo Area */}
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-sm font-semibold text-gray-900">Menu</h2>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 overflow-auto px-3 py-4 space-y-1">
        {menuItems.map((item) => (
          <SidebarNavItem
            key={item.href}
            item={item}
            tenant={tenant}
          />
        ))}
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-gray-200 text-xs text-gray-500">
        <p>Logged in as <span className="font-medium text-gray-700">{userRole}</span></p>
      </div>
    </div>
  );
}

interface SidebarNavItemProps {
  item: NavItem;
  tenant: string;
}

/**
 * Individual Sidebar Navigation Item
 * Only renders if user has required permission
 */
function SidebarNavItem({ item, tenant }: SidebarNavItemProps) {
  const hasPermission = useHasPermission(item.permission as any);

  // Don't render if user doesn't have permission
  if (item.permission && !hasPermission) {
    return null;
  }

  return (
    <Link
      href={item.href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors text-sm font-medium"
    >
      <span className="text-gray-500">{item.icon}</span>
      <span>{item.label}</span>
    </Link>
  );
}
