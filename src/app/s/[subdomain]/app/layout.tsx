import { headers, cookies } from 'next/headers';
import { parseFlags, parseDemoRole } from '@/lib/tenantContext';
import { AppShell } from '@/components/dashboard/AppShell';
import { Metadata } from 'next';

export default async function AppLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const hdrs = await headers();
  const tenantId = hdrs.get('x-tenant-id') || subdomain;
  const flags = parseFlags(hdrs.get('x-tenant-flags'));
  const cookieStore = await cookies();
  const demo = cookieStore.get('demo_session')?.value;
  const role = parseDemoRole(demo) || 'Employee';
  const defaultOpen = cookieStore.get('sidebar_state')?.value === 'true';

  return (
    <AppShell 
      tenant={tenantId} 
      subdomain={subdomain}
      role={role}
      flags={flags}
      defaultOpen={defaultOpen}
    >
      {children}
    </AppShell>
  );
}
