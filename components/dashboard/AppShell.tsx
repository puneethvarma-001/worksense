"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { checkPermission } from '@/lib/rbac/checkPermission';
import type { Permission } from '@/lib/rbac/roles';
import { 
  LayoutDashboard, 
  DollarSign, 
  Calendar, 
  Clock, 
  UserPlus, 
  Building2, 
  FileText, 
  CalendarDays,
  Brain,
  Menu,
  X,
  LogOut
} from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { Sidebar } from './Sidebar';
import { clearDemoSessionCookie, protocol, rootDomain } from '@/lib/utils';

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
  // optional required permission or permissions (any one will grant access)
  permission?: Permission | Permission[];
  // optional feature flag required (e.g. FEATURE_AI_RESUME)
  feature?: string;
};

export function AppShell({
  tenant,
  subdomain,
  role,
  flags,
  children
}: {
  tenant: string;
  subdomain: string;
  role: string;
  flags?: Record<string, boolean>;
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) setSidebarOpen(false);
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const nav: NavItem[] = [
    { 
      key: 'dashboard', 
      label: 'Dashboard', 
      href: '/app', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      key: 'payroll', 
      label: 'Payroll', 
      href: '/payroll', 
      icon: <DollarSign className="h-5 w-5" /> ,
      permission: 'payroll.view'
    },
    { 
      key: 'leave', 
      label: 'Leave', 
      href: '/leave', 
      icon: <Calendar className="h-5 w-5" /> ,
      permission: ['leave.apply', 'leave.approve']
    },
    { 
      key: 'attendance', 
      label: 'Attendance', 
      href: '/attendance', 
      icon: <Clock className="h-5 w-5" /> ,
      permission: 'attendance.view'
    },
    { 
      key: 'onboarding', 
      label: 'Onboarding & Exits', 
      href: '/onboarding-exits', 
      icon: <UserPlus className="h-5 w-5" /> ,
      permission: ['onboarding.view', 'onboarding.manage']
    },
    { 
      key: 'org', 
      label: 'Organization', 
      href: '/org', 
      icon: <Building2 className="h-5 w-5" /> ,
      permission: 'org.view'
    },
    { 
      key: 'policies', 
      label: 'Policies', 
      href: '/policies', 
      icon: <FileText className="h-5 w-5" /> ,
      permission: 'policies.view'
    },
    { 
      key: 'holidays', 
      label: 'Holidays', 
      href: '/holidays', 
      icon: <CalendarDays className="h-5 w-5" /> ,
      permission: 'holidays.view'
    },
    { 
      key: 'ai', 
      label: 'AI Tools', 
      href: '/ai', 
      icon: <Brain className="h-5 w-5" /> ,
      permission: ['ai.resume_analyze', 'ai.call_screening'],
      feature: 'FEATURE_AI_RESUME'
    }
  ];

  const filteredNav = nav.filter((item) => {
    // feature flag check
    if (item.feature && !flags?.[item.feature]) return false;

    // permission check: if no permission defined, show by default
    if (!item.permission) return true;

    if (Array.isArray(item.permission)) {
      // allow if any of the permissions is present
      return item.permission.some((p) => checkPermission([role], p));
    }
    return checkPermission([role], item.permission as Permission);
  });

  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar
        tenant={tenant}
        subdomain={subdomain}
        role={role}
        navItems={filteredNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isMobile={isMobile}
      />

      {/* Mobile overlay */}
      {sidebarOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black/30 z-30 md:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
          <div className="flex items-center justify-between px-4 py-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5 text-gray-700" />
            </button>
            <div className="flex-1 md:flex-none">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {nav.find(n => n.href === pathname)?.label || 'Dashboard'}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-gray-600">
                {tenant}
              </div>

              {/* Role switcher */}
              <div className="hidden md:block">
                <RoleSwitcher currentRole={role} subdomain={subdomain} />
              </div>

              {/* Logout button */}
              <button
                onClick={() => {
                  clearDemoSessionCookie();
                  window.location.href = `${protocol}://${rootDomain}/signin`;
                }}
                className="p-2 rounded-md hover:bg-gray-100"
                title="Logout"
              >
                <LogOut className="h-5 w-5 text-gray-700" />
              </button>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
