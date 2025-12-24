/**
 * Middleware Exports
 * Central location for all middleware functions
 */

export {
  resolveTenantFromRequest,
  createTenantContext,
  attachTenantContextToRequest,
  extractTenantContextFromHeaders,
  tenantMiddleware
} from './tenant-middleware';

export {
  rbacMiddleware,
  createRouteACL,
  addProtectedRoute,
  removeProtectedRoute
} from './rbac-middleware';
