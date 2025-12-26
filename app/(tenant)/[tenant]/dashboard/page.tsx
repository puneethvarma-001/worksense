import React from 'react';
import { headers, cookies } from 'next/headers';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { FeatureFlagBadge } from '@/components/shared/FeatureFlagBadge';
import { checkPermission } from '@/rbac/checkPermission';
import { parseFlags, parseDemoRole } from '@/lib/tenantContext';
import { Button } from '@/components/ui/button';

export default async function TenantDashboardPage({ params }: { params: Promise<{ tenant: string }> }) {
  const { tenant } = await params;
  const hdrs = await headers();
  const tenantId = hdrs.get('x-tenant-id') || tenant;

  // Centralized parsing for flags and demo role
  const flags = parseFlags(hdrs.get('x-tenant-flags'));
  const demo = (await cookies()).get('demo_session')?.value;
  const role = parseDemoRole(demo) || 'Employee';

  // Determine accessible modules
  const canUseLeave = Boolean(flags?.FEATURE_LEAVE && (checkPermission([role], 'leave.apply') || checkPermission([role], 'leave.approve')));
  const canUseAI = Boolean(flags?.FEATURE_AI_RESUME && checkPermission([role], 'ai.resume_analyze'));

  const modules: { key: string; title: string; description: string; action: { href: string; label: string } }[] = [];
  if (canUseLeave) modules.push({ key: 'leave', title: 'Leave Management', description: 'Apply or approve leaves within your organization', action: { href: '/modules/leave', label: 'Open Leave' } });
  if (canUseAI) modules.push({ key: 'ai', title: 'AI Resume Analyzer', description: 'Analyze candidate resumes with mocked AI', action: { href: '/api/ai/analyze-resume', label: 'Try AI' } });
  // Users is always available (mock)
  modules.push({ key: 'users', title: 'Organization Users', description: 'View users in this organization (mock)', action: { href: '#', label: 'Manage users' } });

  return (
    <div className="p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Tenant Dashboard — {tenantId}</h1>
          <p className="mt-1 text-sm text-muted-foreground">Role: <strong>{role}</strong></p>
        </div>

        <div className="flex items-center gap-4">
          <FeatureFlagBadge flags={flags} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {modules.length === 0 ? (
          <div className="col-span-full p-6 rounded-md border bg-yellow-50">No modules are enabled for your role and tenant. Contact an administrator to enable features.</div>
        ) : (
          modules.map((m) => (
            <Card key={m.key}>
              <CardHeader>
                <CardTitle>{m.title}</CardTitle>
                <CardDescription>{m.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between gap-4">
                <div className="text-sm text-muted-foreground">&nbsp;</div>
                <Button asChild variant="link" size="sm">
                  <a href={m.action.href} aria-label={`${m.action.label} - ${m.title}`}>{m.action.label}</a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
