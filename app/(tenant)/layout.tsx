import React from 'react';
import { headers } from 'next/headers';
import { FeatureFlagBadge } from '@/components/shared/FeatureFlagBadge';
import { parseFlags } from '@/lib/tenantContext';

export default async function TenantLayout({ children }: { children: React.ReactNode }) {
  const hdrs = await headers();
  const tenantId = hdrs.get('x-tenant-id') || '';
  const flagsHeader = hdrs.get('x-tenant-flags');
  const flags = parseFlags(flagsHeader);


  return (
    <div className="min-h-screen bg-white text-slate-900">
      <header className="border-b py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="font-medium">Tenant: <span className="font-semibold">{tenantId || 'none'}</span></div>
          <div>
            <FeatureFlagBadge flags={flags} />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">{children}</main>
    </div>
  );
}
