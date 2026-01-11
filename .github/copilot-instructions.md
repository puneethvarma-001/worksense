# Copilot / AI Agent Instructions (worksense)

This repo is a Next.js 15 App Router multi-tenant HRMS demo scaffold. Keep changes small and targeted, prefer extending existing helpers, and validate with the lightweight TypeScript tests under `tests/**`.

## Repo map (high-signal)
- Routing + tenant resolution: `middleware.ts`
- Tenant data + headers parsing: `lib/tenant.ts`, `lib/tenantContext.ts`
- Upstash Redis client: `lib/redis.ts`
- Feature flags: `services/featureFlags.ts`
- RBAC: `lib/rbac/roles.ts`, `lib/rbac/checkPermission.ts`, `lib/permissionGuard.tsx`
- App Router pages: `app/*` (tenant pages under `app/s/[subdomain]/*`)
- Mock AI endpoints: `services/mockAi.ts`, `app/api/ai/*/route.ts`

## Multitenancy behavior (middleware)
- Subdomain detection supports:
  - Local: `acme.localhost:3000`
  - Vercel previews: `tenant---branch.vercel.app`
- Rewrites on a tenant subdomain:
  - `/` -> `/s/:subdomain`
  - `/app` -> `/s/:subdomain/app`
  - Module paths like `/leave`, `/payroll`, `/attendance`, `/ai`, etc. -> `/s/:subdomain/app/<module>`
- Access control: tenant subdomains are redirected away from `/admin`.
- Tenant metadata headers are attached when Redis lookup succeeds:
  - `x-tenant-id`, `x-tenant-subdomain`
  - `x-tenant-flags` as JSON (stringified object)

### Tenant metadata storage (Upstash)
- Canonical metadata key: `tenant:{subdomain}` (see `lib/tenant.ts`)
- Legacy fallback: `subdomain:{subdomain}` (minimal fields)
- Feature flags key: `tenant:{tenantId}:flags` (see `services/featureFlags.ts`)

## Tenant context parsing
- Use `parseFlags()` from `lib/tenantContext.ts` for `x-tenant-flags`.
  - Accepts JSON first, then CSV like `FEATURE_A,FEATURE_B`.
- Demo role cookie is base64 JSON; use `parseDemoRole()`.

## RBAC (server-side)
- Permissions are in `lib/rbac/roles.ts` and enforced with:
  - `checkPermission(userRoles, permission)`
  - `enforcePermission(userRoles, permission)` (throws `PermissionError`)
- Prefer using `PermissionGuard` (`lib/permissionGuard.tsx`) for server component gating.

## Feature flags
- Default flags come from env vars (string `'true'`): `FEATURE_LEAVE`, `FEATURE_AI_RESUME`, etc.
- Tenant overrides are fetched from Redis via `getFlagsForTenant(tenantId)`.
- When adding a new flag:
  1) Add to `.env.example`
  2) Add to `defaultFlags()` in `services/featureFlags.ts`
  3) Update any UI/route checks
  4) Add/adjust a small test in `tests/services/*`

## API route conventions
- Keep request parsing defensive (`await req.json().catch(() => ({}))`).
- Return `NextResponse.json({ success, ... }, { status })`.
- Avoid side effects outside Redis for this demo scaffold.

## Tests (no Jest)
Tests are plain TypeScript scripts using `assert` under `tests/**`.

- Run one test: `pnpm tsx tests/services/featureFlags.test.ts`
- Run all tests (bash): `for f in tests/**/*.test.ts; do pnpm tsx "$f"; done`
- Run all tests (PowerShell): `Get-ChildItem -Recurse tests -Filter *.test.ts | ForEach-Object { pnpm tsx $_.FullName }`

## Local setup
- Required server env vars for Upstash (do not expose to client):
  - `KV_REST_API_URL`
  - `KV_REST_API_TOKEN`
- Local dev: `pnpm install` then `pnpm dev`.

## Safety / hygiene (agent-specific)
- Never print or commit secrets (tokens/URLs from `.env.local`). Use `.env.example` for documented keys.
- Avoid broad refactors of `middleware.ts` without adding/updating the matching tests under `tests/middleware/*`.
- Don’t introduce new external services unless explicitly requested.

## PR checklist
- Typecheck/build: `pnpm build` (or `pnpm exec tsc --noEmit`)
- Run relevant tests via `pnpm tsx tests/...`
- Keep PRs focused: one behavior change + minimal surface area
