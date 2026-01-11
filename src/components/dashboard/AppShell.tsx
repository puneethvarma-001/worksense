"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { RoleSwitcher } from './RoleSwitcher';
import { AppSidebar } from './app-sidebar';
import { SidebarProvider, SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { NotificationsBell } from './NotificationsBell';
import { LanguageToggle } from './LanguageToggle';

export function AppShell({
  tenant,
  subdomain,
  role,
  flags,
  defaultOpen,
  children
}: {
  tenant: string;
  subdomain: string;
  role: string;
  flags?: Record<string, boolean>;
  defaultOpen?: boolean;
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
    <SidebarProvider defaultOpen={defaultOpen} className="h-svh overflow-hidden">
      <AppSidebar tenant={tenant} subdomain={subdomain} role={role} />
      <SidebarInset className="h-svh overflow-hidden">
        {/* Top bar */}
        <header className="sticky top-0 z-10 flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
          <SidebarTrigger className="-ml-1" />
          <div className="flex flex-1 items-center justify-between">
            <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
            <div className="flex items-center gap-4">
              <div className="hidden sm:block text-sm text-muted-foreground">
                {tenant}
              </div>
              <div className="flex items-center gap-2">
                <NotificationsBell role={role} />
                <LanguageToggle />
              </div>
              <div className="hidden md:block">
                <RoleSwitcher currentRole={role} subdomain={subdomain} />
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
