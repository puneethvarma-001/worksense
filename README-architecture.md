# Architecture Overview — Multitenant HRMS (Demo)

This document summarizes the tenant/RBAC/feature-flag patterns implemented in this scaffold.

- Tenant resolution: middleware (`middleware.ts`) extracts subdomain and resolves tenant metadata from Upstash (`lib/tenant.ts`). Tenant metadata headers (`x-tenant-id`, `x-tenant-flags`) are attached to requests.
- RBAC: canonical `rbac/roles.ts` and `rbac/checkPermission.ts` provide centralized role-permission mappings and enforcement helpers.
- Feature flags: `services/featureFlags.ts` reads per-tenant flags from Upstash with sensible env-based defaults.
- Modules: Each module lives under `app/modules/*` (example: `modules/leave`) and uses server actions to perform state changes with RBAC enforcement.
- AI mocks: `app/api/ai/*` routes provide mocked AI endpoints used by UI flows.

Next steps:
- Add integration/e2e tests to simulate subdomain flows (hosts file or Playwright with custom host mapping).
- Add auth/session integration and user model.
- Replace mock storage with a real DB when needed.
