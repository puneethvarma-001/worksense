/**
 * AMP Dashboard
 * Admin/Platform Owner dashboard showing system metrics and full control
 */

import type { Tenant, Employee, Attendance, LeaveRequest, Payroll } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Users, AlertCircle, TrendingUp, Settings } from 'lucide-react';

interface AMPDashboardProps {
  tenant: Tenant;
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  payroll: Payroll[];
}

export function AMPDashboard({
  tenant,
  employees,
  attendance,
  leaveRequests,
  payroll
}: AMPDashboardProps) {
  // Calculate metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingLeaveRequests = leaveRequests.filter((r) => r.status === 'pending').length;
  const payrollProcessed = payroll.filter((p) => p.status === 'processed').length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAttendance = attendance.filter((a) => {
    const date = new Date(a.date);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  });
  const presentToday = todayAttendance.filter((a) => a.status === 'present').length;
  const absentToday = todayAttendance.filter((a) => a.status === 'absent').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Full system overview and management</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Employees */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalEmployees}</p>
              <p className="text-xs text-green-600 mt-2">{activeEmployees} active</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Attendance */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Today's Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{presentToday}</p>
              <p className="text-xs text-red-600 mt-2">{absentToday} absent</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{pendingLeaveRequests}</p>
              <p className="text-xs text-orange-600 mt-2">leave requests</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        {/* Payroll Status */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Payroll Processed</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{payrollProcessed}</p>
              <p className="text-xs text-blue-600 mt-2">this month</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Settings className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tenant Info */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Tenant Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Organization Name</p>
            <p className="text-lg font-medium text-gray-900">{tenant.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Subdomain</p>
            <p className="text-lg font-medium text-gray-900">{tenant.subdomain}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tier</p>
            <p className="text-lg font-medium text-gray-900 capitalize">{tenant.tier}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Status</p>
            <p className="text-lg font-medium text-green-600 capitalize">{tenant.status}</p>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium text-sm transition-colors">
            Manage Users
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 font-medium text-sm transition-colors">
            Feature Flags
          </button>
          <button className="p-3 bg-orange-50 hover:bg-orange-100 rounded-lg text-orange-600 font-medium text-sm transition-colors">
            Audit Logs
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600 font-medium text-sm transition-colors">
            System Settings
          </button>
        </div>
      </Card>
    </div>
  );
}
