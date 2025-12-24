/**
 * Environment Variable Management
 * Centralized access to environment variables with validation and safe defaults
 */

import { REQUIRED_ENV_VARS } from './constants';

// ────────────────────────────────────────
// VALIDATION
// ────────────────────────────────────────

function validateEnv(): void {
  const missing: string[] = [];

  // Only validate in production or explicitly required environments
  if (process.env.NODE_ENV === 'production') {
    REQUIRED_ENV_VARS.forEach((key) => {
      if (!process.env[key]) {
        missing.push(key);
      }
    });

    if (missing.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missing.join(', ')}`
      );
    }
  }
}

// Validate on module load in production
if (process.env.NODE_ENV === 'production') {
  validateEnv();
}

// ────────────────────────────────────────
// ENVIRONMENT EXPORTS
// ────────────────────────────────────────

export const env = {
  // Upstash Redis (KV Store)
  KV_REST_API_URL: process.env.KV_REST_API_URL || 'http://localhost:6379',
  KV_REST_API_TOKEN: process.env.KV_REST_API_TOKEN || 'dev-token',

  // Domain Configuration
  NEXT_PUBLIC_ROOT_DOMAIN:
    process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000',

  // Authentication (optional, for future Auth integration)
  NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,

  // Node Environment
  NODE_ENV: (process.env.NODE_ENV || 'development') as
    | 'development'
    | 'production'
    | 'test',

  // Feature Flags (ENV overrides)
  FEATURE_LEAVE: process.env.FEATURE_LEAVE !== 'false',
  FEATURE_ATTENDANCE: process.env.FEATURE_ATTENDANCE !== 'false',
  FEATURE_ONBOARDING: process.env.FEATURE_ONBOARDING !== 'false',
  FEATURE_PAYROLL: process.env.FEATURE_PAYROLL !== 'false',
  FEATURE_ORG_STRUCTURE: process.env.FEATURE_ORG_STRUCTURE !== 'false',
  FEATURE_POLICIES: process.env.FEATURE_POLICIES !== 'false',
  FEATURE_HOLIDAYS: process.env.FEATURE_HOLIDAYS !== 'false',
  FEATURE_AI_RESUME: process.env.FEATURE_AI_RESUME !== 'false',
  FEATURE_AI_AUTOSCREEN: process.env.FEATURE_AI_AUTOSCREEN !== 'false',
  FEATURE_AI_PAYROLL_VERIFY: process.env.FEATURE_AI_PAYROLL_VERIFY !== 'false'
};

/**
 * Public environment variables safe to expose to client
 */
export const publicEnv = {
  NEXT_PUBLIC_ROOT_DOMAIN: env.NEXT_PUBLIC_ROOT_DOMAIN,
  NODE_ENV: env.NODE_ENV
};

export default env;
