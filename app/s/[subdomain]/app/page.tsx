import { headers, cookies } from 'next/headers';
import { parseFlags, parseDemoRole } from '@/lib/tenantContext';
import { getAccessibleModules } from '@/lib/dashboardModules';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { ModuleCard } from '@/components/dashboard/ModuleCard';
import { RoleSwitcher } from '@/components/dashboard/RoleSwitcher';
import { RecentActivity } from '@/components/dashboard/RecentActivity';

export default async function AppDashboardPage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const hdrs = await headers();
  const demo = (await cookies()).get('demo_session')?.value;
  const role = parseDemoRole(demo) || 'Employee';
  const tenantId = hdrs.get('x-tenant-id') || 'demo';

  const accessibleModules = getAccessibleModules(role);

  // Get stats from accessible modules
  const statsCards = accessibleModules
    .filter(module => module.stats)
    .map(module => (
      <StatsCard
        key={module.key}
        title={module.stats!.label}
        value={module.stats!.value}
        change={module.stats!.change}
        icon={module.stats!.icon}
      />
    ));

  // Sample recent activities
  const recentActivities = [
    {
      type: 'info' as const,
      title: 'New leave request',
      description: 'Alice Johnson requested 3 days off',
      time: '2 hours ago'
    },
    {
      type: 'success' as const,
      title: 'Payroll verified',
      description: 'December payroll has been verified',
      time: '5 hours ago'
    },
    {
      type: 'warning' as const,
      title: 'New employee onboarded',
      description: 'Emma Davis started onboarding process',
      time: '1 day ago'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Welcome back!</h2>
          <p className="mt-1 text-sm text-gray-600">
            Here's what's happening in your organization today.
          </p>
        </div>
        <RoleSwitcher currentRole={role} subdomain={subdomain} />
      </div>

      {/* Stats Grid */}
      {statsCards.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards}
        </div>
      )}

      {/* Modules Grid */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Modules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {accessibleModules.map((module) => (
            <ModuleCard
              key={module.key}
              module={module}
              subdomain={subdomain}
            />
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={recentActivities} />

        {/* Quick Actions could be added here if needed */}
        <div className="hidden lg:block">
          {/* Placeholder for future quick actions */}
        </div>
      </div>
    </div>
  );
}
