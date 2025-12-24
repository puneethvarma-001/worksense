/**
 * Tenant Layout
 * Main layout for tenant application with navigation and theme support
 * Server component with client components for interactive elements
 */

import React from 'react';
import { TenantNavigation } from '@/ui/navigation/tenant-nav';

interface TenantLayoutProps {
  children: React.ReactNode;
  params: {
    tenant: string;
  };
}

/**
 * Tenant Layout Component
 * Provides overall structure for tenant pages
 */
export function TenantLayout({ children, params }: TenantLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <TenantNavigation tenant={params.tenant} />

      {/* Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="hidden md:flex w-64 flex-col bg-white border-r border-gray-200">
          {/* Sidebar content will be added here */}
          <div className="flex-1 overflow-auto px-4 py-6">
            {/* Navigation items */}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="px-6 py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default TenantLayout;
