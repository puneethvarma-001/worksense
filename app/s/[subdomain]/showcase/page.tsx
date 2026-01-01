import { headers, cookies } from 'next/headers';
import { parseFlags, parseDemoRole } from '@/lib/tenantContext';
import { Sidebar } from '@/components/dashboard/Sidebar';
import {
  LayoutDashboard,
  DollarSign,
  Calendar,
  Clock,
  UserPlus,
  Building2,
  FileText,
  CalendarDays,
  Brain
} from 'lucide-react';

export default async function ShowcasePage({
  params
}: {
  params: Promise<{ subdomain: string }>;
}) {
  const { subdomain } = await params;
  const hdrs = await headers();
  const demo = (await cookies()).get('demo_session')?.value;
  const role = parseDemoRole(demo) || 'Employee';
  const tenant = hdrs.get('x-tenant-subdomain') || subdomain;
  const flags = parseFlags(hdrs.get('x-tenant-flags') || '');

  // Sample nav items for showcase
  const sampleNavItems = [
    {
      key: 'dashboard',
      label: 'Dashboard',
      href: '/app',
      icon: <LayoutDashboard className="h-5 w-5" />
    },
    {
      key: 'payroll',
      label: 'Payroll',
      href: '/payroll',
      icon: <DollarSign className="h-5 w-5" />
    },
    {
      key: 'leave',
      label: 'Leave',
      href: '/leave',
      icon: <Calendar className="h-5 w-5" />
    },
    {
      key: 'attendance',
      label: 'Attendance',
      href: '/attendance',
      icon: <Clock className="h-5 w-5" />
    },
    {
      key: 'onboarding',
      label: 'Onboarding & Exits',
      href: '/onboarding-exits',
      icon: <UserPlus className="h-5 w-5" />
    },
    {
      key: 'org',
      label: 'Organization',
      href: '/org',
      icon: <Building2 className="h-5 w-5" />
    },
    {
      key: 'policies',
      label: 'Policies',
      href: '/policies',
      icon: <FileText className="h-5 w-5" />
    },
    {
      key: 'holidays',
      label: 'Holidays',
      href: '/holidays',
      icon: <CalendarDays className="h-5 w-5" />
    },
    {
      key: 'ai',
      label: 'AI Tools',
      href: '/ai',
      icon: <Brain className="h-5 w-5" />
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Sidebar Component Showcase</h1>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">AppShell Sidebar Options</h2>
          <p className="text-gray-600 mb-4">
            This showcase demonstrates the Sidebar component used in the AppShell.
            It displays navigation items based on user role and feature flags.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Current Configuration</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li><strong>Tenant:</strong> {tenant}</li>
                <li><strong>Subdomain:</strong> {subdomain}</li>
                <li><strong>Role:</strong> {role}</li>
                <li><strong>Feature Flags:</strong> {Object.keys(flags || {}).join(', ') || 'None'}</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Navigation Items</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                {sampleNavItems.map(item => (
                  <li key={item.key} className="flex items-center gap-2">
                    {item.icon}
                    <span>{item.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Live Sidebar Preview</h2>
            <p className="text-gray-600 text-sm">This is how the sidebar appears in the application.</p>
          </div>

          <div className="flex">
            <div className="w-64 border-r border-gray-200">
              <Sidebar
                tenant={tenant}
                subdomain={subdomain}
                role={role}
                navItems={sampleNavItems}
                isOpen={true}
                onClose={() => {}}
                isMobile={false}
              />
            </div>

            <div className="flex-1 p-6">
              <h3 className="text-lg font-medium text-gray-700 mb-4">Main Content Area</h3>
              <p className="text-gray-600">
                This area represents the main content of the application.
                The sidebar on the left shows the navigation options available to the current user role.
              </p>
              <p className="text-gray-600 mt-4">
                Navigation links are properly configured with the middleware pathname rewrites,
                ensuring correct routing for subdomain-based tenants.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}