import { redis } from './redis';

export type TenantMetadata = {
  id: string;
  name: string;
  subdomain: string;
  flags?: Record<string, boolean>;
  createdAt?: number;
};

export async function getTenantBySubdomain(subdomain: string): Promise<TenantMetadata | null> {
  const key = `tenant:${subdomain}`;
  try {
    const data = await redis.get<TenantMetadata>(key);
    if (data) return data;

    // Fallback to existing subdomain data (used by current app)
    const subData = await redis.get<{ emoji?: string; createdAt?: number }>(`subdomain:${subdomain}`);
    if (subData) {
      return { id: subdomain, name: subdomain, subdomain, flags: undefined, createdAt: subData.createdAt };
    }
  } catch (err) {
    console.warn('getTenantBySubdomain error', err);
  }
  return null;
}

// Helper to produce a compact flags header string
export function compactFlagsString(flags: Record<string, boolean> | undefined) {
  if (!flags) return '';
  const parts = Object.entries(flags).filter(([, v]) => v).map(([k]) => k);
  return parts.join(',');
}
