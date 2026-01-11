import { type NextRequest, NextResponse } from 'next/server';
import { rootDomain } from '@/lib/utils';
import { getTenantBySubdomain } from '@/lib/tenant';

export function extractSubdomain(request: NextRequest): string | null {
  const url = request.url;
  const host = request.headers.get('host') || '';
  const hostname = host.split(':')[0];

  // Local development environment
  if (url.includes('localhost') || url.includes('127.0.0.1')) {
    // Try to extract subdomain from the full URL
    const fullUrlMatch = url.match(/http:\/\/([^.]+)\.localhost/);
    if (fullUrlMatch && fullUrlMatch[1]) {
      return fullUrlMatch[1];
    }

    // Fallback to host header approach
    if (hostname.includes('.localhost')) {
      return hostname.split('.')[0];
    }

    return null;
  }

  // Production environment
  const rootDomainFormatted = rootDomain.split(':')[0];

  // Handle preview deployment URLs (tenant---branch-name.vercel.app)
  if (hostname.includes('---') && hostname.endsWith('.vercel.app')) {
    const parts = hostname.split('---');
    return parts.length > 0 ? parts[0] : null;
  }

  // Regular subdomain detection
  const isSubdomain =
    hostname !== rootDomainFormatted &&
    hostname !== `www.${rootDomainFormatted}` &&
    hostname.endsWith(`.${rootDomainFormatted}`);

  return isSubdomain ? hostname.replace(`.${rootDomainFormatted}`, '') : null;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const subdomain = extractSubdomain(request);

  if (subdomain) {
    // Block access to admin page from subdomains
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Define module paths that should be rewritten
    const modulePaths = ['app', 'payroll', 'leave', 'attendance', 'onboarding-exits', 'org', 'policies', 'holidays', 'ai'];

    // Check if pathname is a module path
    const isModulePath = modulePaths.some(module => pathname === `/${module}`);

    // Try to resolve tenant metadata and attach headers for downstream server components
    try {
      const tenant = await getTenantBySubdomain(subdomain);
      // If tenant metadata is found, attach compact headers and either rewrite or continue
      if (tenant) {
        let res: NextResponse;
        if (pathname === '/') {
          res = NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
        } else if (pathname === '/app') {
          res = NextResponse.rewrite(new URL(`/s/${subdomain}/app`, request.url));
        } else if (isModulePath) {
          res = NextResponse.rewrite(new URL(`/s/${subdomain}/app${pathname}`, request.url));
        } else {
          res = NextResponse.next();
        }
        res.headers.set('x-tenant-id', tenant.id);
        res.headers.set('x-tenant-subdomain', tenant.subdomain);
        if (tenant.flags) {
          // compact representation for middleware header
          res.headers.set('x-tenant-flags', JSON.stringify(tenant.flags));
        }
        return res;
      }
    } catch (err) {
      // Ignore tenant lookup errors and fall back to existing behavior
      console.warn('tenant lookup failed', err);
    }

    // For the root path on a subdomain, rewrite to the subdomain page
    if (pathname === '/') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}`, request.url));
    }

    // For /app, rewrite to app
    if (pathname === '/app') {
      return NextResponse.rewrite(new URL(`/s/${subdomain}/app`, request.url));
    }

    // For module paths, rewrite to app
    if (isModulePath) {
      return NextResponse.rewrite(new URL(`/s/${subdomain}/app${pathname}`, request.url));
    }
  }

  // On the root domain, allow normal access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all paths except for:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|[\\w-]+\\.\\w+).*)'
  ]
};
