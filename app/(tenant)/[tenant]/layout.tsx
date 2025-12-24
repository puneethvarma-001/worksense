/**
 * Tenant Layout
 * Main layout for all tenant pages
 * Provides context, navigation, and shared UI structure
 */

import { TenantLayout } from '@/ui/layouts/tenant-layout';

interface TenantLayoutProps {
  children: React.ReactNode;
  params: Promise<{
    tenant: string;
  }>;
}

/**
 * Tenant Root Layout
 * Wraps all tenant pages with navigation and context
 */
export default async function TenantRootLayout({
  children,
  params
}: TenantLayoutProps) {
  const { tenant } = await params;

  return (
    <TenantLayout params={{ tenant }}>
      {children}
    </TenantLayout>
  );
}
