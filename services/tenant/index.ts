/**
 * Tenant Service Exports
 * Central location for all tenant-related utilities
 */

export { tenantService, TenantService } from './service';
export {
  extractSubdomainFromRequest,
  resolveTenantFromSubdomain,
  resolveTenantFromRequest,
  getSubdomainFromParams,
  isValidSubdomain,
  normalizeSubdomain
} from './resolver';
export {
  setTenantContext,
  getTenantContext,
  runWithTenantContext,
  runWithTenantContextAsync,
  useTenantContext,
  useTenantContextRequired,
  useTenant,
  useUserRole,
  usePermissions,
  useHasPermission,
  useHasAllPermissions,
  useHasAnyPermission,
  tenantContextStorage
} from './context';
export {
  assertTenantContext,
  createTenantGuard,
  createTenantGuardAsync,
  hasTenantContext,
  validateTenantMatch,
  assertTenantMatch,
  isTenantContext,
  isTenantActive,
  assertTenantActive,
  getTenantIdFromContext,
  getUserIdFromContext
} from './guard';
