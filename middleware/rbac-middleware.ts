/**
 * RBAC Middleware
 * Enforces role-based and permission-based access control
 * Works in conjunction with tenant middleware
 */

import type { NextRequest, NextResponse } from 'next/server';
import { NextResponse as NextResponseClass } from 'next/server';
import type { Permission, Role } from '@/lib/types';
import { extractTenantContextFromHeaders } from './tenant-middleware';

/**
 * Route access control configuration
 * Maps routes to required roles/permissions
 */
interface RouteAccessControl {
  path: string | RegExp;
  roles?: Role[];
  permissions?: Permission[];
  requireAll?: boolean; // true for AND, false for OR
}

const PROTECTED_ROUTES: RouteAccessControl[] = [
  // Admin routes - only AMP role
  { path: /^\/admin/, roles: ['AMP'] },

  // Payroll routes - HR, Manager, or specific permission
  { path: /^\/modules\/payroll/, permissions: ['manage:payroll'] },

  // Leave management
  { path: /^\/modules\/leave/, permissions: ['manage:leave', 'request:leave'] },

  // Attendance
  { path: /^\/modules\/attendance/, permissions: ['manage:attendance'] },

  // Onboarding
  { path: /^\/modules\/onboarding/, permissions: ['manage:onboarding'] },

  // Org structure
  { path: /^\/modules\/org-structure/, permissions: ['manage:org_structure'] },

  // Policies
  { path: /^\/modules\/policies/, permissions: ['manage:policies'] },

  // Holidays
  { path: /^\/modules\/holidays/, permissions: ['manage:holidays'] },

  // AI features
  { path: /^\/modules\/ai/, permissions: ['use:ai_features'] },

  // Tenant settings
  { path: /^\/settings/, permissions: ['manage:settings'] },

  // Dashboard
  { path: /^\/dashboard/, permissions: ['view:dashboard'] }
];

/**
 * Check if request path matches a protected route
 */
function getProtectedRoute(pathname: string): RouteAccessControl | null {
  for (const route of PROTECTED_ROUTES) {
    if (typeof route.path === 'string') {
      if (pathname === route.path) return route;
    } else {
      if (route.path.test(pathname)) return route;
    }
  }
  return null;
}

/**
 * Check if user has required roles
 */
function hasRequiredRole(userRole: Role, requiredRoles: Role[]): boolean {
  return requiredRoles.includes(userRole);
}

/**
 * Check if user has required permissions
 */
function hasRequiredPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[],
  requireAll: boolean = false
): boolean {
  if (requireAll) {
    // User must have ALL required permissions
    return requiredPermissions.every((p) => userPermissions.includes(p));
  } else {
    // User must have AT LEAST ONE required permission
    return requiredPermissions.some((p) => userPermissions.includes(p));
  }
}

/**
 * RBAC middleware handler
 */
export async function rbacMiddleware(
  request: NextRequest
): Promise<{ allowed: boolean; response?: NextResponse }> {
  try {
    const { pathname } = request.nextUrl;

    // Check if route is protected
    const protectedRoute = getProtectedRoute(pathname);
    if (!protectedRoute) {
      // Unprotected route
      return { allowed: true };
    }

    // Extract tenant context from headers (set by tenant middleware)
    const context = extractTenantContextFromHeaders(request.headers);
    if (!context) {
      return {
        allowed: false,
        response: NextResponseClass.json(
          { error: 'Authentication required' },
          { status: 401 }
        )
      };
    }

    // Check role requirements
    if (protectedRoute.roles) {
      if (!hasRequiredRole(context.userRole, protectedRoute.roles)) {
        return {
          allowed: false,
          response: NextResponseClass.json(
            { error: 'Insufficient privileges' },
            { status: 403 }
          )
        };
      }
    }

    // Check permission requirements
    if (protectedRoute.permissions) {
      const requireAll = protectedRoute.requireAll ?? false;
      if (
        !hasRequiredPermission(
          context.permissions,
          protectedRoute.permissions,
          requireAll
        )
      ) {
        return {
          allowed: false,
          response: NextResponseClass.json(
            { error: 'Permission denied' },
            { status: 403 }
          )
        };
      }
    }

    // All checks passed
    return { allowed: true };
  } catch (error) {
    console.error('RBAC middleware error', error);
    return {
      allowed: false,
      response: NextResponseClass.json(
        { error: 'Internal server error' },
        { status: 500 }
      )
    };
  }
}

/**
 * Create a route access control configuration
 */
export function createRouteACL(
  path: string | RegExp,
  options: { roles?: Role[]; permissions?: Permission[]; requireAll?: boolean }
): RouteAccessControl {
  return {
    path,
    roles: options.roles,
    permissions: options.permissions,
    requireAll: options.requireAll
  };
}

/**
 * Add a protected route
 */
export function addProtectedRoute(config: RouteAccessControl): void {
  PROTECTED_ROUTES.push(config);
}

/**
 * Remove a protected route by path
 */
export function removeProtectedRoute(path: string | RegExp): void {
  const index = PROTECTED_ROUTES.findIndex((r) => r.path === path);
  if (index !== -1) {
    PROTECTED_ROUTES.splice(index, 1);
  }
}
