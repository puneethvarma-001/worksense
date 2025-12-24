# Enterprise HR SaaS Platform - Architecture Documentation

## Overview

This is a **production-ready, multi-tenant SaaS HR platform** built with **Next.js 15 (App Router)**, **TypeScript**, and **Upstash Redis (KV)** for a distributed, scalable foundation. The architecture follows enterprise patterns for:

- **Multi-tenancy** with subdomain-based tenant resolution
- **RBAC (Role-Based Access Control)** with fine-grained permissions
- **Feature Flags** for progressive feature rollout
- **Service-oriented** architecture with clear data access patterns
- **Mocked AI workflows** that are production-ready for replacement

---

## Core Tech Stack

- **Frontend/Framework**: Next.js 15 (App Router), React 19, TypeScript (strict)
- **Styling**: Tailwind CSS 4, Shadcn UI components
- **Data Layer**: Upstash Redis (KV), Mock data generators
- **Authentication**: Middleware-based tenant + user context
- **Monitoring**: Vercel Analytics, Speed Insights

---

## Directory Structure (Non-Negotiable)

```
project-root/
├── app/
│   ├── (auth)/                          # Auth routes (future)
│   ├── (marketing)/                     # Marketing site (future)
│   ├── (tenant)/
│   │   └── [tenant]/
│   │       ├── layout.tsx               # Tenant layout
│   │       ├── dashboard/
│   │       │   ├── page.tsx             # Dashboard router
│   │       │   └── dashboards/
│   │       │       ├── amp-dashboard.tsx
│   │       │       ├── hr-dashboard.tsx
│   │       │       ├── manager-dashboard.tsx
│   │       │       ├── employee-dashboard.tsx
│   │       │       └── ta-dashboard.tsx
│   │       └── settings/                # Tenant settings
│   ├── api/
│   │   └── ai/                          # AI feature endpoints
│   │       ├── analyze-resume/route.ts
│   │       ├── auto-screen/route.ts
│   │       ├── verify-payroll/route.ts
│   │       └── features/route.ts
│   ├── layout.tsx                       # Root layout
│   ├── page.tsx                         # Landing page
│   └── globals.css
│
├── modules/                             # Feature modules (DB-ready)
│   ├── leave/
│   │   └── service.ts
│   ├── attendance/
│   │   └── service.ts
│   ├── payroll/
│   │   └── service.ts
│   ├── onboarding/
│   │   └── service.ts
│   ├── org-structure/
│   │   └── service.ts
│   ├── policies/
│   │   └── service.ts
│   ├── holidays/
│   │   └── service.ts
│   └── ai/
│       ├── service.ts                  # Mocked AI workflows
│       ├── types.ts
│       └── README.md
│
├── services/                            # Core business logic
│   ├── tenant/
│   │   ├── service.ts                  # Tenant resolution + CRUD
│   │   ├── resolver.ts                 # Subdomain extraction
│   │   ├── context.ts                  # AsyncLocalStorage context
│   │   ├── guard.ts                    # Tenant validation utilities
│   │   └── index.ts                    # Barrel export
│   ├── feature-flags/
│   │   ├── service.ts                  # Feature flag resolution
│   │   ├── hooks.ts                    # React hooks
│   │   ├── guard.tsx                   # Guard components
│   │   └── index.ts
│   └── mock-data/
│       ├── generators.ts               # Data generation
│       ├── service.ts                  # Mock data caching
│       └── index.ts
│
├── rbac/                                # Role-based access control
│   ├── roles.ts                         # Role definitions + hierarchy
│   ├── permissions.ts                  # Permission validation
│   ├── guards.ts                        # RBAC guard factories
│   └── index.ts
│
├── middleware/
│   ├── tenant-middleware.ts             # Tenant resolution middleware
│   ├── rbac-middleware.ts               # RBAC enforcement
│   └── index.ts
│
├── ui/
│   ├── layouts/
│   │   └── tenant-layout.tsx            # Tenant UI shell
│   └── navigation/
│       ├── tenant-nav.tsx               # Top navigation
│       └── sidebar-nav.tsx              # Permission-aware sidebar
│
├── components/
│   ├── ui/                              # Shadcn UI components
│   └── shared/
│       ├── guards/
│       │   ├── permission-guard.tsx
│       │   ├── role-guard.tsx
│       │   └── index.ts
│       └── providers/
│           └── tenant-provider.tsx
│
├── lib/
│   ├── types.ts                         # Core domain types
│   ├── constants.ts                     # RBAC + feature flags config
│   ├── env.ts                           # Environment variables
│   ├── redis.ts                         # Redis client (Upstash)
│   └── utils.ts                         # Utilities
│
├── middleware.ts                        # Root middleware (tenant + RBAC)
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── package.json
└── pnpm-lock.yaml
```

---

## Architecture Layers

### 1. **Middleware Layer** (`middleware.ts`)

**Purpose**: Tenant resolution and RBAC enforcement at request boundary

```
Request → Subdomain Extraction → Tenant Resolution → RBAC Checks → Handler
```

**Key Components**:
- `tenantMiddleware.ts`: Extracts subdomain, resolves tenant, creates context
- `rbacMiddleware.ts`: Validates permissions for protected routes
- Context attached to request headers for downstream use

**Example Flow**:
```
acme.localhost:3000/dashboard
  → Extract: "acme"
  → Resolve: Tenant { id: "acme", name: "ACME Corp", tier: "enterprise" }
  → Get User: { id: "user-1", role: "HR", permissions: [...] }
  → Create Context & attach to headers
  → Route handler receives context
```

### 2. **Tenant Service** (`services/tenant/`)

**Purpose**: Tenant resolution, context management, data isolation

**Components**:
- `service.ts`: `TenantService` singleton for tenant CRUD + caching
- `resolver.ts`: Extract subdomain from requests (localhost, production, Vercel preview)
- `context.ts`: AsyncLocalStorage for request-scoped context (server components)
- `guard.ts`: Validation utilities (tenant active, ID matching, etc.)

**Usage in Server Components**:
```typescript
import { getTenantContext } from '@/services/tenant';

// In a server component
const context = getTenantContext();
const { tenant, userId, userRole, permissions } = context;
```

### 3. **RBAC System** (`rbac/`)

**Purpose**: Centralized role and permission management

**Components**:
- `roles.ts`: Role definitions, hierarchy, permission mapping
- `permissions.ts`: Permission validation, context-based checks
- `guards.ts`: Guard factories for protecting server actions and API routes

**5 Roles with Hierarchy**:
```
AMP (100)        → Admin/Platform Owner
  ├── HR (80)    → Human Resources
  ├── TA (60)    → Talent Acquisition
  ├── Manager (40) → Team Manager
  └── Employee (20) → Individual Contributor
```

**Example Permission Check**:
```typescript
import { hasPermission } from '@/rbac/permissions';

// In server action or component
if (!hasPermission('manage:payroll')) {
  throw new Error('Permission denied');
}
```

**Guard Factory Pattern**:
```typescript
import { createRBACGuardAsync } from '@/rbac/guards';

const processPayroll = createRBACGuardAsync(
  { permissions: ['manage:payroll'] },
  async (context, payrollData) => {
    // Only HR can reach here
    return await payrollService.process(payrollData);
  }
);
```

### 4. **Feature Flags System** (`services/feature-flags/`)

**Purpose**: Progressive feature rollout, tenant tier gating

**Components**:
- `service.ts`: Feature flag resolution (ENV + KV override)
- `hooks.ts`: React hooks for components
- `guard.tsx`: `<FeatureGuard>` component wrapper

**Resolution Priority**:
1. Environment variable (e.g., `FEATURE_PAYROLL=true`)
2. KV override (per-tenant)
3. Tier availability (only Enterprise gets AI features)
4. Default configuration

**Usage**:
```typescript
import { useFeatureFlag } from '@/services/feature-flags';
import { FeatureGuard } from '@/services/feature-flags';

// In a client component
function PayrollModule() {
  const enabled = useFeatureFlag('FEATURE_PAYROLL');

  return (
    <FeatureGuard flag="FEATURE_PAYROLL" fallback={<div>Not available</div>}>
      <Payroll />
    </FeatureGuard>
  );
}
```

### 5. **Mock Data Layer** (`services/mock-data/`)

**Purpose**: Deterministic, realistic data for development; DB-ready

**Components**:
- `generators.ts`: Data generation functions for employees, attendance, payroll, etc.
- `service.ts`: `MockDataService` singleton with KV caching

**Transition to Database**:
1. Replace generators with database queries
2. Keep same service interface
3. Update KV caching to database caching
4. No changes to modules or components needed

**Example**:
```typescript
const { mockDataService } = require('@/services/mock-data');

// Current: Mock data cached in KV
const employees = await mockDataService.getEmployees(tenantId);

// Future: Replace with
// const employees = await db.employee.findMany({ where: { tenantId } });
```

### 6. **Module Layer** (`modules/`)

**Purpose**: Feature modules with domain-specific business logic

**Modules**:
- `leave/`: Leave request management, balance calculation
- `attendance/`: Attendance tracking, summary analytics
- `payroll/`: Salary processing, payroll reports
- `onboarding/`: New hire workflows, exit management
- `org-structure/`: Department hierarchy, reporting relationships
- `policies/`: Company policy management
- `holidays/`: Holiday calendar management
- `ai/`: Mocked AI workflows (resume analysis, auto-screening, payroll verification)

**DB-Ready Pattern**:
```typescript
export class LeaveService {
  async getLeaveRequests(tenantId: TenantId) {
    return mockDataService.getLeaveRequests(tenantId);
    // Future: return db.leaveRequest.findMany({ where: { tenantId } });
  }
}
```

### 7. **UI Layer** (`ui/` + `components/`)

**Purpose**: Role-aware UI components and layouts

**Components**:
- `TenantLayout`: Main layout with nav + sidebar
- `PermissionGuard` / `RoleGuard`: Conditional rendering based on RBAC
- `FeatureGuard`: Feature flag-based rendering

**Example**:
```typescript
<PermissionGuard permission="manage:payroll">
  <PayrollSection />
</PermissionGuard>

<RoleGuard role="AMP">
  <AdminPanel />
</RoleGuard>

<FeatureGuard flag="FEATURE_AI_RESUME">
  <ResumeAnalyzer />
</FeatureGuard>
```

---

## Key Design Patterns

### 1. **Multi-Tenancy via Subdomains**

```
acme.localhost:3000  → Tenant ID: "acme"
globex.localhost:3000 → Tenant ID: "globex"

Production:
acme.hr-platform.com  → Tenant ID: "acme"
```

**Isolation**: Tenant ID automatically filtered in all queries (enforced at service layer)

### 2. **Context-Driven RBAC**

```
Request Middleware
  ↓ (extracts subdomain + creates user context)
Handler (context available via getTenantContext())
  ↓
Service (enforces tenant isolation)
  ↓
Database (filter by tenantId)
```

### 3. **Server Components First**

- Dashboard: Server component (fetches data once)
- Navigation: Client component (interactive)
- Guards: Client components (dynamic permission checks)
- Layout: Server component (static structure)

### 4. **Service Pattern**

All data access through singleton services:
```
Component → Service → Mock Data / Database
```

Example:
```typescript
// leaveService.ts
async getPendingLeaveRequests(tenantId: TenantId) {
  return mockDataService.getLeaveRequests(tenantId)
    .filter(r => r.status === 'pending');
}
```

### 5. **Feature Flag Gating**

```
Environment → KV Override → Tenant Tier → Component Visibility
```

Example:
```
FEATURE_AI_RESUME=true  (ENV)
  ↓ (override per tenant via KV)
  ↓ (only Enterprise tier has access)
  ↓ (show/hide in UI)
```

---

## Role-Based Dashboards

### AMP (Admin)
- Full system overview
- Tenant management
- Feature flags
- User management
- Audit logs

### HR
- Employee management
- Payroll processing
- Leave approvals
- Attendance tracking
- Policies

### Manager
- Team visibility
- Leave approvals (team)
- Attendance (team)
- Reporting

### Employee
- Personal records
- Leave requests
- Payslips
- Attendance

### TA (Talent Acquisition)
- Candidate pipeline
- Resume analysis (AI)
- Auto-screening (AI)
- Hiring metrics

---

## AI Module (Mocked)

### Resume Analysis
```typescript
POST /api/ai/analyze-resume
Request: { resumeText: string, position?: string }
Response: {
  score: 0-100,
  summary: string,
  skills: string[],
  experience: string,
  strengths: string[],
  gaps: string[]
}
```

### Auto-Screening
```typescript
POST /api/ai/auto-screen
Request: { candidateName, candidateEmail, callTranscript }
Response: {
  score: 0-100,
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no' | 'strong_no',
  analysis: string,
  keywords: string[]
}
```

### Payroll Verification
```typescript
POST /api/ai/verify-payroll
Request: { employeeId, period, baseSalary, allowances, deductions }
Response: {
  verified: boolean,
  anomalies: string[],
  riskLevel: 'low' | 'medium' | 'high',
  suggestions: string[]
}
```

**All AI endpoints are fully deterministic mocks** that can be easily replaced with real API calls to OpenAI, Claude, or custom ML models.

---

## Environment Variables

```env
# Required
KV_REST_API_URL=https://...
KV_REST_API_TOKEN=...
NEXT_PUBLIC_ROOT_DOMAIN=hr-platform.com

# Feature Flags (optional, default to true)
FEATURE_LEAVE=true
FEATURE_ATTENDANCE=true
FEATURE_PAYROLL=true
FEATURE_ONBOARDING=true
FEATURE_ORG_STRUCTURE=true
FEATURE_POLICIES=true
FEATURE_HOLIDAYS=true
FEATURE_AI_RESUME=true
FEATURE_AI_AUTOSCREEN=true
FEATURE_AI_PAYROLL_VERIFY=true

# Future Auth
NEXTAUTH_SECRET=...
NEXTAUTH_URL=...
```

---

## Deployment Readiness

### ✅ Production-Ready
- Subdomain routing supports Vercel preview deployments
- Type-safe throughout (TypeScript strict)
- No magic strings or hardcoded values
- Service-oriented architecture
- Mock data easily replaceable with database

### 🚀 Next Steps for Production

1. **Database**: Replace `mockDataService` with Prisma + PostgreSQL (same interface)
2. **Authentication**: Integrate NextAuth.js or Auth0
3. **Real AI**: Replace mocked AI service endpoints with OpenAI API calls
4. **Monitoring**: Connect Sentry for error tracking
5. **CDN**: Serve static assets from CDN
6. **Analytics**: Enhance Vercel Analytics

---

## Testing Strategy

### Unit Tests
- RBAC role checks
- Permission validation
- Feature flag resolution

### Integration Tests
- Tenant context injection
- Service layer data isolation
- Middleware behavior

### E2E Tests
- Multi-tenant scenarios
- RBAC enforcement
- Feature flag gating

---

## Performance Considerations

1. **Caching**:
   - Tenant data: 1 hour (Redis)
   - Feature flags: 5 minutes (KV)
   - Permissions: 30 minutes (KV)

2. **Server Components**:
   - Fetch data server-side
   - Minimize client JavaScript

3. **Middleware**:
   - Lightweight tenant extraction
   - Cached context lookups

---

## Security Considerations

1. **Tenant Isolation**:
   - All queries filtered by tenantId
   - Context validation at request boundary

2. **RBAC Enforcement**:
   - Checked in middleware
   - Checked in server actions
   - Guards on API routes

3. **Feature Flags**:
   - Server-side enforcement (not client-side only)

4. **Secrets**:
   - KV credentials via environment variables
   - Never logged or exposed in client code

---

## Contributing Guidelines

- Follow folder structure strictly
- Always include tenant context in services
- Use guards for server actions + API routes
- Keep components small and focused
- Document business logic with comments

---

## Future Enhancements

- [ ] Real database (Prisma + PostgreSQL)
- [ ] JWT + OAuth2 authentication
- [ ] Audit logging
- [ ] Activity feeds
- [ ] Advanced analytics
- [ ] Custom workflows
- [ ] Mobile app
- [ ] Real-time notifications
- [ ] Document management
- [ ] Performance optimization

---

## References

- [Next.js 15 App Router](https://nextjs.org/docs/app)
- [Vercel Platforms Starter Kit](https://github.com/vercel/platforms)
- [Shadcn UI](https://ui.shadcn.com/)
- [Upstash Redis](https://upstash.com/)
- [TypeScript](https://www.typescriptlang.org/)
