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
  const demo = (await cookies()).get('demo_session')?.value;
  const role = parseDemoRole(demo) || 'Employee';

  return (
    <AppShell 
      tenant={tenantId} 
      subdomain={subdomain}
      role={role}
      flags={flags}
    >
      {children}
    </AppShell>
  );
}
