/**
 * Tenant Resolver
 * Resolves tenant context from request headers, cookies, and URL
 * Used in middleware, server components, and server actions
 */

import type { NextRequest } from 'next/server';
import type { Tenant } from '@/lib/types';
import { tenantService } from './service';

/**
 * Extract subdomain from request
 * Supports:
 * - Localhost development (subdomain.localhost:3000)
 * - Production subdomains (subdomain.example.com)
 * - Vercel preview deployments (subdomain---branch.vercel.app)
 */
export function extractSubdomainFromRequest(request: NextRequest): string | null {
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];
  const url = request.url;

  // Development: localhost environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    const localMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (localMatch && localMatch[1]) {
      return localMatch[1];
    }

    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Vercel Preview: preview-deployments with "---"
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Production: standard subdomain detection
  // This is handled by the parent middleware configuration
  return null;
}

/**
 * Resolve tenant from subdomain
 * Used in middleware and server contexts
 */
export async function resolveTenantFromSubdomain(
  subdomain: string | null
): Promise<Tenant | null> {
  if (!subdomain) {
    return null;
  }

  return tenantService.getTenantBySubdomain(subdomain);
}

/**
 * Resolve tenant from request
 * Combines extraction and resolution
 */
export async function resolveTenantFromRequest(
  request: NextRequest
): Promise<Tenant | null> {
  const subdomain = extractSubdomainFromRequest(request);
  return resolveTenantFromSubdomain(subdomain);
}

/**
 * Get subdomain from URL path parameters
 * Used in route handlers and server components
 * Example: /s/[subdomain]/dashboard -> subdomain param
 */
export function getSubdomainFromParams(params: Record<string, string>): string | null {
  return params.subdomain || params.tenant || null;
}

/**
 * Validate subdomain format
 * Ensures subdomain follows security and naming conventions
 */
export function isValidSubdomain(subdomain: string): boolean {
  // Allow alphanumeric and hyphens, 3-63 characters
  const subddomainRegex = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/i;
  return subddomainRegex.test(subdomain);
}

/**
 * Normalize subdomain
 * Converts to lowercase and removes whitespace
 */
export function normalizeSubdomain(subdomain: string): string {
  return subdomain.toLowerCase().trim();
}
