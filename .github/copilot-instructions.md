# Copilot / AI Agent Instructions for this repo 🤖

This file is a short, practical guide to help AI coding agents be effective quickly in this codebase. Keep answers concise, make small, testable changes, and prefer clear PRs with focused commits.

---

## Quick architecture snapshot 🔎
- Next.js 15 App Router multi-tenant example. Tenants are resolved by subdomain (e.g., `acme.localhost:3000`). See `middleware.ts` for the extraction and rewrite logic (rewrites `/` on a subdomain to `/s/:subdomain`).
- Tenant metadata lives in Upstash Redis via `lib/redis.ts` and `lib/tenant.ts` (key patterns used:
  - `tenant:{subdomain}` for full metadata
  - fallback `subdomain:{subdomain}` for legacy data)
- Middleware attaches tenant headers for downstream server components: `x-tenant-id`, `x-tenant-subdomain`, and `x-tenant-flags` (compact JSON or CSV).
- RBAC is centralized in `rbac/roles.ts` and `rbac/checkPermission.ts` — use `enforcePermission` for server-side guards.
- Feature flags are tenant-scoped in `services/featureFlags.ts`. Defaults come from env vars like `FEATURE_LEAVE`.
- AI endpoints in `app/api/ai/*` are mocked/simulated (see `services/mockAi.ts` and `app/api/ai/*/route.ts`).
- UI modules often live under `app/modules/*`, and server actions are used (example: `app/modules/leave/actions.ts`).

---

## Coding & change guidance ✅
- Small, focused PRs are preferred (one feature/bug per PR) with a short description and tests where applicable.
- Prefer modifying or extending existing helpers instead of duplicating logic (e.g., extend `getTenantBySubdomain` or `parseFlags` in `lib/tenantContext.ts`).
- For server-side checks, use `enforcePermission` rather than inlining role lookups.
- Keep middleware behavior stable: changes to `middleware.ts` affect routing and header attachment — add tests when changing tenant resolution.

---

## Tests & running them 🧪
- There is no test runner configured by default. Tests are small TypeScript scripts under `tests/*.test.ts` that use `assert`.
- Recommended quick run: `pnpm dlx ts-node tests/services/featureFlags.test.ts`.
- To run all tests (bash): `for f in tests/**/*.test.ts; do pnpm dlx ts-node "$f"; done` (PowerShell variant is documented in `.github/github-instructions.md`).
- CI: use `pnpm dlx ts-node` in CI or add a `test` script that runs the suite.

---

## Environment & setup 🧰
- Required env vars (used by `lib/redis.ts`):
  - `KV_REST_API_URL` — Upstash REST URL
  - `KV_REST_API_TOKEN` — Upstash REST token
- Local dev: `pnpm install && pnpm dev` (defaults to http://localhost:3000). Subdomains on `.localhost` work out-of-the-box.

---

## Integration & external systems 🔗
- Redis/Upstash is the primary external dependency; avoid hard-coding URIs or tokens in code.
- Admin tenant creation endpoint: `app/api/tenants/create/route.ts` — check tests in `tests/api/tenants.test.ts` for expected behavior.
- AI routes are mocks — flag any work that would replace mocks with real providers so reviewers can scope credentials/security changes.

---

## Patterns & conventions to follow ✍️
- Use compact headers for tenant metadata; parsing helpers live in `lib/tenantContext.ts` (`parseFlags`, `parseDemoRole`).
- Feature flags are booleans keyed by environment names (e.g., `FEATURE_AI_RESUME`). Use `services/featureFlags.ts` helpers to read flags.
- Keep server logic in server components or API routes; client components should call server actions or API endpoints.
- When adding APIs, follow the route layout under `app/api/*` and mirror existing patterns (request parsing, JSON responses, and minimal side effects).

---

## What to avoid (agent-specific guidance) ⚠️
- Don't assume production credentials — use env vars or stubs/mocks in tests.
- Avoid broad refactors of middleware or tenant resolution without adding coverage (these are high-impact changes).
- Avoid adding third-party services without a clear migration plan and tests (especially around auth or data storage).

---

## Good PR checklist for agents ✅
- Compile and type-check (`pnpm build` or `pnpm exec tsc --noEmit`).
- Run relevant tests with `pnpm dlx ts-node <test-file>` and add new tests for behavioral changes.
- Add/modify README or `.github/*` docs if the change affects setup or developer workflows (e.g., new env vars).
- Keep commits small and focused, with explanatory messages.

---

If anything above looks incomplete or you want more specific examples (e.g., a new API skeleton or test template), say which area to expand and I will update this guidance. 🎯
