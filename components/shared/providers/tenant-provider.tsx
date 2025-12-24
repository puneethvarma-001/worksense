/**
 * Tenant Provider
 * Provides tenant context to child components
 * Used at the top level of tenant scope
 */

'use client';

import React, { createContext, useContext } from 'react';
import type { TenantContext } from '@/lib/types';

/**
 * Create Tenant Context
 */
const TenantCtx = createContext<TenantContext | null>(null);

interface TenantProviderProps {
  context: TenantContext;
  children: React.ReactNode;
}

/**
 * TenantProvider Component
 * Wraps child components with tenant context
 */
export function TenantProvider({ context, children }: TenantProviderProps) {
  return (
    <TenantCtx.Provider value={context}>
      {children}
    </TenantCtx.Provider>
  );
}

/**
 * useTenant Hook
 * Get tenant from context
 */
export function useTenant() {
  const context = useContext(TenantCtx);
  return context?.tenant || null;
}

/**
 * useUser Hook
 * Get user ID from context
 */
export function useUser() {
  const context = useContext(TenantCtx);
  return context?.userId || null;
}

/**
 * useRole Hook
 * Get user role from context
 */
export function useRole() {
  const context = useContext(TenantCtx);
  return context?.userRole || null;
}

/**
 * usePermissions Hook
 * Get user permissions from context
 */
export function usePermissions() {
  const context = useContext(TenantCtx);
  return context?.permissions || [];
}

/**
 * useTenantContext Hook
 * Get full tenant context
 */
export function useTenantContext() {
  return useContext(TenantCtx);
}
