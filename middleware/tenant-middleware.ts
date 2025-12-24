/**
 * Tenant Middleware
 * Resolves tenant from request and manages tenant context
 * Applied to all requests within tenant scope
 */

import type { NextRequest, NextResponse } from 'next/server';
import { NextResponse as NextResponseClass } from 'next/server';
import type { Tenant, TenantContext, User } from '@/lib/types';
import {
  extractSubdomainFromRequest,
  resolveTenantFromSubdomain,
  getSubdomainFromParams
} from '@/services/tenant/resolver';
import { tenantService } from '@/services/tenant/service';
import { ROLE_PERMISSIONS } from '@/lib/constants';

/**
 * Resolve tenant from request
 * Tries multiple resolution strategies:
 * 1. Subdomain from host header
 * 2. Path parameters (for API routes)
 */
export async function resolveTenantFromRequest(
  request: NextRequest,
  params?: Record<string, string>
): Promise<{ tenant: Tenant; subdomain: string } | null> {
  // Try subdomain extraction first
  let subdomain = extractSubdomainFromRequest(request);

  // Try path parameters if subdomain not found
  if (!subdomain && params) {
    subdomain = getSubdomainFromParams(params);
  }

  if (!subdomain) {
    return null;
  }

  const tenant = await resolveTenantFromSubdomain(subdomain);
  if (!tenant) {
    return null;
  }

  return { tenant, subdomain };
}

/**
 * Mock user resolution for demo purposes
 * In production, this would validate JWT/session tokens
 */
function getMockUser(
  tenantId: string,
  subdomain: string
): User | null {
  // Demo: Create mock users based on subdomain
  const mockUsers: Record<string, User> = {
    acme: {
      id: 'user-1' as any,
      tenantId: tenantId as any,
      email: 'admin@acme.com',
      name: 'Alice Admin',
      role: 'AMP',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    globex: {
      id: 'user-2' as any,
      tenantId: tenantId as any,
      email: 'hr@globex.com',
      name: 'Bob HR',
      role: 'HR',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    initech: {
      id: 'user-3' as any,
      tenantId: tenantId as any,
      email: 'employee@initech.com',
      name: 'Charlie Employee',
      role: 'Employee',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  };

  return mockUsers[subdomain] || null;
}

/**
 * Create tenant context from tenant and user
 */
function createTenantContext(tenant: Tenant, user: User): TenantContext {
  const permissions = ROLE_PERMISSIONS[user.role] || [];

  return {
    tenant,
    userId: user.id,
    userRole: user.role,
    permissions
  };
}

/**
 * Attach tenant context to request
 * Makes it available to handlers via request headers
 */
export function attachTenantContextToRequest(
  request: NextRequest,
  context: TenantContext
): NextRequest {
  // Create a new request with added headers
  const headers = new Headers(request.headers);
  headers.set('x-tenant-id', context.tenant.id);
  headers.set('x-tenant-subdomain', context.tenant.subdomain);
  headers.set('x-user-id', context.userId);
  headers.set('x-user-role', context.userRole);
  headers.set('x-permissions', JSON.stringify(context.permissions));

  // Return new request with added headers
  return new NextRequest(request, { headers });
}

/**
 * Extract tenant context from request headers
 * Used in route handlers to get context
 */
export function extractTenantContextFromHeaders(headers: Headers): TenantContext | null {
  const tenantId = headers.get('x-tenant-id');
  const subdomain = headers.get('x-tenant-subdomain');
  const userId = headers.get('x-user-id');
  const userRole = headers.get('x-user-role');
  const permissionsStr = headers.get('x-permissions');

  if (!tenantId || !subdomain || !userId || !userRole) {
    return null;
  }

  try {
    return {
      tenant: {
        id: tenantId as any,
        subdomain,
        name: subdomain,
        status: 'active',
        tier: 'professional',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      userId: userId as any,
      userRole: userRole as any,
      permissions: permissionsStr ? JSON.parse(permissionsStr) : []
    };
  } catch (error) {
    console.error('Failed to extract tenant context from headers', error);
    return null;
  }
}

/**
 * Main tenant middleware handler
 * Should be called in the request pipeline
 */
export async function tenantMiddleware(
  request: NextRequest,
  params?: Record<string, string>
): Promise<{
  context: TenantContext | null;
  response?: NextResponse;
}> {
  try {
    // Resolve tenant
    const resolved = await resolveTenantFromRequest(request, params);

    if (!resolved) {
      // No tenant found - could be root domain or invalid request
      return { context: null };
    }

    const { tenant } = resolved;

    // Validate tenant is active
    if (tenant.status !== 'active') {
      return {
        context: null,
        response: NextResponseClass.json(
          { error: 'Tenant is not active' },
          { status: 403 }
        )
      };
    }

    // Get mock user (in production, validate auth token)
    const user = getMockUser(tenant.id, tenant.subdomain);
    if (!user) {
      // No user found
      return { context: null };
    }

    // Create tenant context
    const context = createTenantContext(tenant, user);

    // Attach to request headers for downstream use
    const requestWithContext = attachTenantContextToRequest(request, context);

    return {
      context,
      // Return modified request so it continues through middleware chain
      response: NextResponseClass.next({
        request: requestWithContext
      })
    };
  } catch (error) {
    console.error('Tenant middleware error', error);
    return {
      context: null,
      response: NextResponseClass.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    };
  }
}
