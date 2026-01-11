import { Role, Permission, rolePermissions } from '@/lib/rbac/roles';

export interface DashboardModule {
  key: string;
  label: string;
  href: string;
  icon: string; // lucide icon name
  description: string;
  permissions: Permission[];
  stats?: {
    label: string;
    value: string;
    change?: string;
    icon: string;
  };
  quickActions?: string[];
}

export const dashboardModules: DashboardModule[] = [
  {
    key: 'leave',
    label: 'Leave Management',
    href: '/leave',
    icon: 'Calendar',
    description: 'Manage leave requests and approvals',
    permissions: ['leave.apply', 'leave.approve'],
    stats: {
      label: 'Pending Leaves',
      value: '8',
      change: 'Awaiting approval',
      icon: 'Calendar'
    },
    quickActions: ['Apply for leave', 'Approve requests']
  },
  {
    key: 'payroll',
    label: 'Payroll',
    href: '/payroll',
    icon: 'DollarSign',
    description: 'View and verify payroll information',
    permissions: ['payroll.view', 'payroll.verify'],
    stats: {
      label: 'Payroll Status',
      value: 'Ready',
      change: 'Dec 2025 processed',
      icon: 'TrendingUp'
    },
    quickActions: ['Check payroll', 'Verify payments']
  },
  {
    key: 'attendance',
    label: 'Attendance',
    href: '/attendance',
    icon: 'Clock',
    description: 'Track employee attendance',
    permissions: ['attendance.view', 'attendance.manage'],
    stats: {
      label: 'Present Today',
      value: '58',
      change: '92% attendance',
      icon: 'Clock'
    },
    quickActions: ['View attendance', 'Mark attendance']
  },
  {
    key: 'onboarding',
    label: 'Onboarding & Exits',
    href: '/onboarding-exits',
    icon: 'UserPlus',
    description: 'Manage employee onboarding and exits',
    permissions: ['onboarding.view', 'onboarding.manage'],
    stats: {
      label: 'New Hires',
      value: '3',
      change: 'This month',
      icon: 'UserPlus'
    },
    quickActions: ['Start onboarding', 'Process exits']
  },
  {
    key: 'org',
    label: 'Organization',
    href: '/org',
    icon: 'Building2',
    description: 'Manage organizational structure',
    permissions: ['org.view', 'org.manage'],
    stats: {
      label: 'Total Employees',
      value: '63',
      change: '+2 from last month',
      icon: 'Users'
    },
    quickActions: ['View org chart', 'Manage employees']
  },
  {
    key: 'policies',
    label: 'Policies',
    href: '/policies',
    icon: 'FileText',
    description: 'Access company policies and documents',
    permissions: ['policies.view', 'policies.manage'],
    quickActions: ['View policies', 'Update documents']
  },
  {
    key: 'holidays',
    label: 'Holidays',
    href: '/holidays',
    icon: 'CalendarDays',
    description: 'Manage holiday schedules',
    permissions: ['holidays.view', 'holidays.manage'],
    quickActions: ['View holidays', 'Add holidays']
  },
  {
    key: 'ai',
    label: 'AI Tools',
    href: '/ai',
    icon: 'Brain',
    description: 'AI-powered HR tools',
    permissions: ['ai.resume_analyze', 'ai.call_screening'],
    quickActions: ['Analyze resume', 'Screen candidates']
  }
];

export function getAccessibleModules(role: string): DashboardModule[] {
  const rolePerms = rolePermissions[role as Role] || [];
  return dashboardModules.filter(module =>
    module.permissions.some(perm => rolePerms.includes(perm))
  );
}