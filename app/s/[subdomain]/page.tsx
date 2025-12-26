import Link from 'next/link';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getSubdomainData } from '@/lib/subdomains';
import { getTenantBySubdomain } from '@/lib/tenant';
import { protocol, rootDomain } from '@/lib/utils';
import DashboardShell from '@/components/dashboard/DashboardShell';

export async function generateMetadata({
  params
}: {
  params: Promise<{ subdomain: string }>;
}): Promise<Metadata> {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `Subdomain page for ${subdomain}.${rootDomain}`
  };
}

export default async function SubdomainPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const subdomainData = await getSubdomainData(subdomain);

  if (!subdomainData) {
    notFound();
  }

  // Try to load richer tenant metadata (flags, name) and fall back to subdomain data
  const tenantMeta = await getTenantBySubdomain(subdomain).catch(() => null);

  const tenantName = tenantMeta?.name || subdomain;
  const tenantFlags = tenantMeta?.flags;
  const emoji = subdomainData?.emoji || '🏢';

  return (
    <div className="min-h-screen">
      <div className="absolute top-4 right-4">
        <Link
          href={`${protocol}://${rootDomain}`}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          {rootDomain}
        </Link>
      </div>

      {/* Dashboard shell is a client component that handles interactivity */}
      <DashboardShell tenant={tenantName} emoji={emoji} flags={tenantFlags} />
    </div>
  );
}
