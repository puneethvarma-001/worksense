/**
 * Tenant Service
 * Manages tenant resolution, creation, and context management
 * Uses Upstash Redis (KV) for storage and caching
 */

import { redis } from '@/lib/redis';
import type { Tenant, TenantId } from '@/lib/types';
import { KV_KEYS, CACHE_DURATIONS } from '@/lib/constants';
import { makeTenantId } from '@/lib/types';

/**
 * TenantService handles all tenant-related operations
 * Singleton pattern for consistent KV access across the application
 */
export class TenantService {
  private static instance: TenantService;

  private constructor() {}

  static getInstance(): TenantService {
    if (!TenantService.instance) {
      TenantService.instance = new TenantService();
    }
    return TenantService.instance;
  }

  /**
   * Resolve tenant by subdomain
   * Checks KV cache first, then falls back to mock data
   */
  async getTenantBySubdomain(subdomain: string): Promise<Tenant | null> {
    if (!subdomain) {
      return null;
    }

    try {
      // Try to get from KV cache
      const cacheKey = KV_KEYS.TENANT(subdomain);
      const cached = await redis.get<Tenant>(cacheKey);

      if (cached) {
        return cached;
      }

      // If not in cache, resolve from mock data
      const tenant = this.getMockTenant(subdomain);

      if (tenant) {
        // Cache for future requests
        await redis.setex(
          cacheKey,
          CACHE_DURATIONS.TENANT,
          JSON.stringify(tenant)
        );
        return tenant;
      }

      return null;
    } catch (error) {
      console.error(`Failed to resolve tenant for subdomain: ${subdomain}`, error);
      // Fallback to mock data on KV error
      return this.getMockTenant(subdomain);
    }
  }

  /**
   * Create a new tenant
   * Stores in KV and returns the created tenant
   */
  async createTenant(
    subdomain: string,
    name: string,
    emoji?: string
  ): Promise<Tenant> {
    const tenant: Tenant = {
      id: makeTenantId(subdomain),
      subdomain,
      name,
      emoji,
      status: 'active',
      tier: 'starter',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const cacheKey = KV_KEYS.TENANT(subdomain);
      await redis.setex(
        cacheKey,
        CACHE_DURATIONS.TENANT,
        JSON.stringify(tenant)
      );
    } catch (error) {
      console.error(`Failed to create tenant: ${subdomain}`, error);
      // Continue anyway - we can still use the tenant object
    }

    return tenant;
  }

  /**
   * Get tenant by ID
   */
  async getTenantById(tenantId: TenantId): Promise<Tenant | null> {
    try {
      // For now, we use subdomain as ID (tenantId = subdomain)
      const cacheKey = KV_KEYS.TENANT(tenantId);
      const cached = await redis.get<Tenant>(cacheKey);

      if (cached) {
        return cached;
      }

      return this.getMockTenant(tenantId);
    } catch (error) {
      console.error(`Failed to get tenant by ID: ${tenantId}`, error);
      return this.getMockTenant(tenantId);
    }
  }

  /**
   * Update tenant
   */
  async updateTenant(tenantId: TenantId, updates: Partial<Tenant>): Promise<Tenant | null> {
    try {
      const current = await this.getTenantById(tenantId);
      if (!current) {
        return null;
      }

      const updated: Tenant = {
        ...current,
        ...updates,
        id: current.id, // Preserve ID
        subdomain: current.subdomain, // Preserve subdomain
        createdAt: current.createdAt, // Preserve creation time
        updatedAt: new Date()
      };

      const cacheKey = KV_KEYS.TENANT(tenantId);
      await redis.setex(
        cacheKey,
        CACHE_DURATIONS.TENANT,
        JSON.stringify(updated)
      );

      return updated;
    } catch (error) {
      console.error(`Failed to update tenant: ${tenantId}`, error);
      return null;
    }
  }

  /**
   * Mock data for development
   * In production, this would be replaced with database queries
   */
  private getMockTenant(subdomain: string): Tenant | null {
    // Known mock tenants for development
    const mockTenants: Record<string, Tenant> = {
      acme: {
        id: makeTenantId('acme'),
        subdomain: 'acme',
        name: 'ACME Corporation',
        emoji: '🏢',
        status: 'active',
        tier: 'enterprise',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      globex: {
        id: makeTenantId('globex'),
        subdomain: 'globex',
        name: 'Globex Corporation',
        emoji: '🌍',
        status: 'active',
        tier: 'professional',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      initech: {
        id: makeTenantId('initech'),
        subdomain: 'initech',
        name: 'Initech',
        emoji: '💼',
        status: 'active',
        tier: 'starter',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    };

    return mockTenants[subdomain] || null;
  }

  /**
   * Get all mock tenants for admin purposes
   */
  getMockTenants(): Tenant[] {
    const tenants: Tenant[] = [
      {
        id: makeTenantId('acme'),
        subdomain: 'acme',
        name: 'ACME Corporation',
        emoji: '🏢',
        status: 'active',
        tier: 'enterprise',
        createdAt: new Date('2024-01-01'),
        updatedAt: new Date('2024-01-01')
      },
      {
        id: makeTenantId('globex'),
        subdomain: 'globex',
        name: 'Globex Corporation',
        emoji: '🌍',
        status: 'active',
        tier: 'professional',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-15')
      },
      {
        id: makeTenantId('initech'),
        subdomain: 'initech',
        name: 'Initech',
        emoji: '💼',
        status: 'active',
        tier: 'starter',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01')
      }
    ];

    return tenants;
  }
}

// Export singleton instance
export const tenantService = TenantService.getInstance();
