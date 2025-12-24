/**
 * Enterprise Constants
 * Centralized configuration for RBAC, feature flags, and business rules
 */

import type { RolePermissionMap, Role, FeatureFlagConfig } from './types';

// ────────────────────────────────────────
// ROLE DEFINITIONS
// ────────────────────────────────────────

export const ROLES = {
  AMP: 'AMP' as const, // Admin / Platform Owner
  HR: 'HR' as const, // Human Resources
  MANAGER: 'Manager' as const, // Team Manager
  EMPLOYEE: 'Employee' as const, // Individual Contributor
  TA: 'TA' as const // Talent Acquisition
} as const;

export const ROLE_LABELS: Record<Role, string> = {
  AMP: 'Admin',
  HR: 'Human Resources',
  Manager: 'Manager',
  Employee: 'Employee',
  TA: 'Talent Acquisition'
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  AMP: 'Platform administrator with full system access',
  HR: 'Human resources team member with employee management access',
  Manager: 'Team manager with limited team visibility and approval rights',
  Employee: 'Individual contributor with personal record access',
  TA: 'Talent acquisition specialist with candidate management access'
};

// ────────────────────────────────────────
// PERMISSION MATRIX (RBAC)
// ────────────────────────────────────────

export const ROLE_PERMISSIONS: RolePermissionMap = {
  AMP: [
    // All permissions - Platform Admin
    'view:dashboard',
    'manage:employees',
    'manage:payroll',
    'manage:leave',
    'manage:attendance',
    'manage:onboarding',
    'manage:org_structure',
    'manage:policies',
    'manage:holidays',
    'view:payslips',
    'request:leave',
    'approve:leave',
    'use:ai_features',
    'manage:candidates',
    'manage:settings',
    'manage:feature_flags',
    'view:team_metrics',
    'manage:team_members',
    'view:profile',
    'edit:profile'
  ],

  HR: [
    // HR Team
    'view:dashboard',
    'manage:employees',
    'manage:payroll',
    'manage:leave',
    'manage:attendance',
    'manage:onboarding',
    'manage:org_structure',
    'manage:policies',
    'manage:holidays',
    'view:payslips',
    'approve:leave',
    'use:ai_features',
    'manage:candidates',
    'view:team_metrics',
    'view:profile'
  ],

  Manager: [
    // Team Manager
    'view:dashboard',
    'manage:leave',
    'view:payslips',
    'approve:leave',
    'view:team_metrics',
    'manage:team_members',
    'view:profile',
    'edit:profile'
  ],

  Employee: [
    // Individual Contributor
    'view:dashboard',
    'view:payslips',
    'request:leave',
    'view:profile',
    'edit:profile'
  ],

  TA: [
    // Talent Acquisition
    'view:dashboard',
    'use:ai_features',
    'manage:candidates',
    'view:profile'
  ]
};

// ────────────────────────────────────────
// FEATURE FLAGS CONFIGURATION
// ────────────────────────────────────────

export const FEATURE_FLAGS: FeatureFlagConfig = {
  FEATURE_LEAVE: {
    enabled: true,
    description: 'Leave management system',
    availableTiers: ['starter', 'professional', 'enterprise']
  },

  FEATURE_ATTENDANCE: {
    enabled: true,
    description: 'Attendance tracking',
    availableTiers: ['starter', 'professional', 'enterprise']
  },

  FEATURE_ONBOARDING: {
    enabled: true,
    description: 'Employee onboarding workflows',
    availableTiers: ['professional', 'enterprise']
  },

  FEATURE_PAYROLL: {
    enabled: true,
    description: 'Payroll processing and management',
    availableTiers: ['professional', 'enterprise']
  },

  FEATURE_ORG_STRUCTURE: {
    enabled: true,
    description: 'Organizational structure management',
    availableTiers: ['professional', 'enterprise']
  },

  FEATURE_POLICIES: {
    enabled: true,
    description: 'Company policies management',
    availableTiers: ['professional', 'enterprise']
  },

  FEATURE_HOLIDAYS: {
    enabled: true,
    description: 'Holiday calendar management',
    availableTiers: ['starter', 'professional', 'enterprise']
  },

  FEATURE_AI_RESUME: {
    enabled: true,
    description: 'AI-powered resume analysis',
    availableTiers: ['professional', 'enterprise']
  },

  FEATURE_AI_AUTOSCREEN: {
    enabled: true,
    description: 'AI-powered candidate auto-screening',
    availableTiers: ['enterprise']
  },

  FEATURE_AI_PAYROLL_VERIFY: {
    enabled: true,
    description: 'AI-powered payroll verification engine',
    availableTiers: ['enterprise']
  }
};

// ────────────────────────────────────────
// MODULE PATHS
// ────────────────────────────────────────

export const MODULES = {
  PAYROLL: 'payroll',
  LEAVE: 'leave',
  ATTENDANCE: 'attendance',
  ONBOARDING: 'onboarding',
  ORG_STRUCTURE: 'org-structure',
  POLICIES: 'policies',
  HOLIDAYS: 'holidays',
  AI: 'ai'
} as const;

// ────────────────────────────────────────
// ROUTE CONFIGURATIONS
// ────────────────────────────────────────

export const ADMIN_ROUTES = ['/admin', '/admin/dashboard'];

export const PROTECTED_ROUTES = [
  '/dashboard',
  '/modules',
  '/settings',
  '/profile'
];

export const TENANT_ROUTES = [
  '/s/:subdomain/dashboard',
  '/s/:subdomain/modules',
  '/s/:subdomain/settings'
];

// ────────────────────────────────────────
// BUSINESS RULES & DEFAULTS
// ────────────────────────────────────────

export const LEAVE_DEFAULTS = {
  SICK_DAYS: 10,
  CASUAL_DAYS: 8,
  PERSONAL_DAYS: 5,
  CARRY_FORWARD_LIMIT: 5
};

export const ATTENDANCE_DEFAULTS = {
  WORK_HOURS: 8,
  WORK_DAYS: 5,
  GRACE_PERIOD_MINUTES: 15
};

export const PAYROLL_DEFAULTS = {
  SALARY_PRECISION: 2,
  MONTH_FORMAT: 'YYYY-MM',
  MIN_SALARY_THRESHOLD: 1000
};

// ────────────────────────────────────────
// PAGINATION DEFAULTS
// ────────────────────────────────────────

export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// ────────────────────────────────────────
// CACHE DURATIONS (seconds)
// ────────────────────────────────────────

export const CACHE_DURATIONS = {
  TENANT: 3600, // 1 hour
  USER: 1800, // 30 minutes
  FEATURE_FLAGS: 300, // 5 minutes
  PERMISSIONS: 1800, // 30 minutes
  MOCK_DATA: 60 // 1 minute (short for development)
};

// ────────────────────────────────────────
// KV STORAGE KEYS
// ────────────────────────────────────────

export const KV_KEYS = {
  TENANT: (subdomain: string) => `tenant:${subdomain}`,
  USER: (userId: string) => `user:${userId}`,
  PERMISSIONS: (userId: string) => `permissions:${userId}`,
  FEATURE_FLAGS: (tenantId: string) => `feature_flags:${tenantId}`,
  EMPLOYEES: (tenantId: string) => `employees:${tenantId}`,
  LEAVE_REQUESTS: (tenantId: string) => `leave_requests:${tenantId}`,
  ATTENDANCE: (tenantId: string) => `attendance:${tenantId}`,
  PAYROLL: (tenantId: string) => `payroll:${tenantId}`,
  CANDIDATES: (tenantId: string) => `candidates:${tenantId}`,
  ORG_STRUCTURE: (tenantId: string) => `org_structure:${tenantId}`,
  POLICIES: (tenantId: string) => `policies:${tenantId}`,
  HOLIDAYS: (tenantId: string) => `holidays:${tenantId}`
};

// ────────────────────────────────────────
// ENVIRONMENT VALIDATION
// ────────────────────────────────────────

export const REQUIRED_ENV_VARS = [
  'KV_REST_API_URL',
  'KV_REST_API_TOKEN',
  'NEXT_PUBLIC_ROOT_DOMAIN'
];

export const OPTIONAL_ENV_VARS = [
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  'NODE_ENV'
];
