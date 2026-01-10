"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { RoleSwitcher } from './RoleSwitcher';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger, useSidebar } from '@/components/ui/sidebar';

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
  const pathname = usePathname();

  // Get page title from pathname
  const getPageTitle = () => {
    if (pathname?.includes('/leave')) return 'Leave Management';
    if (pathname?.includes('/attendance')) return 'Attendance';
    if (pathname?.includes('/payroll')) return 'Payroll';
    if (pathname?.includes('/holidays')) return 'Holidays';
    if (pathname?.includes('/policies')) return 'Policies';
    if (pathname?.includes('/onboarding-exits')) return 'Onboarding & Exits';
    if (pathname?.includes('/org')) return 'Organization';
    if (pathname?.includes('/ai')) return 'AI Tools';
    return 'Dashboard';
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar tenant={tenant} subdomain={subdomain} role={role} />
      <SidebarInset>
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </SidebarTrigger>
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                {tenant}
              </div>
              <div className="hidden md:block">
                <RoleSwitcher currentRole={role} subdomain={subdomain} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
