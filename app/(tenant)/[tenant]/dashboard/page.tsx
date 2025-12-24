/**
 * Tenant Dashboard
 * Role-based dashboard showing different content based on user role
 */

import { mockDataService } from '@/services/mock-data';
import { tenantService } from '@/services/tenant';
import { extractTenantContextFromHeaders } from '@/middleware/tenant-middleware';
import { headers } from 'next/headers';

// Role-specific dashboard components
import { AMPDashboard } from './dashboards/amp-dashboard';
import { HRDashboard } from './dashboards/hr-dashboard';
import { ManagerDashboard } from './dashboards/manager-dashboard';
import { EmployeeDashboard } from './dashboards/employee-dashboard';
import { TADashboard } from './dashboards/ta-dashboard';

interface DashboardPageProps {
  params: Promise<{
    tenant: string;
  }>;
}

/**
 * Dashboard Page
 * Renders appropriate dashboard based on user role
 */
export default async function DashboardPage({
  params
}: DashboardPageProps) {
  const { tenant: subdomain } = await params;

  // Get tenant info
  const tenant = await tenantService.getTenantBySubdomain(subdomain);
  if (!tenant) {
    return <div className="text-center py-12">Tenant not found</div>;
  }

  // Extract user context from headers
  const headersList = await headers();
  const userRole = headersList.get('x-user-role');

  // Get mock data for dashboard
  const employees = await mockDataService.getEmployees(tenant.id);
  const attendance = await mockDataService.getAttendance(tenant.id);
  const leaveRequests = await mockDataService.getLeaveRequests(tenant.id);
  const payroll = await mockDataService.getPayroll(tenant.id);

  // Render role-specific dashboard
  switch (userRole) {
    case 'AMP':
      return (
        <AMPDashboard
          tenant={tenant}
          employees={employees}
          attendance={attendance}
          leaveRequests={leaveRequests}
          payroll={payroll}
        />
      );

    case 'HR':
      return (
        <HRDashboard
          tenant={tenant}
          employees={employees}
          attendance={attendance}
          leaveRequests={leaveRequests}
          payroll={payroll}
        />
      );

    case 'Manager':
      return (
        <ManagerDashboard
          tenant={tenant}
          employees={employees}
          attendance={attendance}
          leaveRequests={leaveRequests}
        />
      );

    case 'Employee':
      return (
        <EmployeeDashboard
          tenant={tenant}
          attendance={attendance}
          leaveRequests={leaveRequests}
        />
      );

    case 'TA':
      return <TADashboard tenant={tenant} />;

    default:
      return <div className="text-center py-12">Unknown role</div>;
  }
}
