/**
 * HR Dashboard
 * Human Resources team dashboard with employee and payroll management
 */

import type { Tenant, Employee, Attendance, LeaveRequest, Payroll } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Users, Calendar, DollarSign, FileText } from 'lucide-react';

interface HRDashboardProps {
  tenant: Tenant;
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
  payroll: Payroll[];
}

export function HRDashboard({
  tenant,
  employees,
  attendance,
  leaveRequests,
  payroll
}: HRDashboardProps) {
  // Calculate metrics
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter((e) => e.status === 'active').length;
  const pendingLeaveRequests = leaveRequests.filter((r) => r.status === 'pending').length;
  const onLeaveToday = leaveRequests.filter(
    (r) =>
      r.status === 'approved' &&
      r.startDate <= new Date() &&
      r.endDate >= new Date()
  ).length;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAttendance = attendance.filter((a) => {
    const date = new Date(a.date);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  });

  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  const currentPayroll = payroll.filter((p) => p.period === currentMonth);
  const totalPayroll = currentPayroll.reduce((sum, p) => sum + p.netSalary, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">HR Dashboard</h1>
        <p className="text-gray-600 mt-2">Employee management and payroll overview</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Employees */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Employees</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{activeEmployees}</p>
              <p className="text-xs text-gray-600 mt-2">of {totalEmployees} total</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Pending Leave Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{pendingLeaveRequests}</p>
              <p className="text-xs text-amber-600 mt-2">awaiting approval</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>

        {/* Today's Attendance */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Attendance</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{todayAttendance.length}</p>
              <p className="text-xs text-gray-600 mt-2">{onLeaveToday} on leave</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Payroll Summary */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Monthly Payroll</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${(totalPayroll / 1000).toFixed(1)}K
              </p>
              <p className="text-xs text-gray-600 mt-2">{currentPayroll.length} records</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Leave Requests */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Requests</h2>
        {leaveRequests.filter((r) => r.status === 'pending').length === 0 ? (
          <p className="text-gray-600 text-sm">No pending requests</p>
        ) : (
          <div className="space-y-2">
            {leaveRequests
              .filter((r) => r.status === 'pending')
              .slice(0, 5)
              .map((request) => (
                <div key={request.id} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium text-gray-900">
                      {request.leaveType.toUpperCase()}
                    </p>
                    <p className="text-xs text-gray-600">
                      {new Date(request.startDate).toLocaleDateString()} to{' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-xs font-medium hover:bg-green-200">
                      Approve
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-xs font-medium hover:bg-red-200">
                      Reject
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </Card>

      {/* Department Summary */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Department Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Array.from(
            new Set(employees.map((e) => e.department))
          ).map((dept) => (
            <div key={dept} className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm font-medium text-gray-900">{dept}</p>
              <p className="text-2xl font-bold text-blue-600">
                {employees.filter((e) => e.department === dept).length}
              </p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
