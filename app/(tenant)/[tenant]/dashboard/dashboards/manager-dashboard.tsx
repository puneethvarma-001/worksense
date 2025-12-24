/**
 * Manager Dashboard
 * Team manager dashboard with team visibility and approval capabilities
 */

import type { Tenant, Employee, Attendance, LeaveRequest } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Users, CheckCircle, AlertCircle, Calendar } from 'lucide-react';

interface ManagerDashboardProps {
  tenant: Tenant;
  employees: Employee[];
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
}

export function ManagerDashboard({
  tenant,
  employees,
  attendance,
  leaveRequests
}: ManagerDashboardProps) {
  // Get team members (employees reporting to this manager)
  // For demo, assuming first manager has all employees
  const teamSize = employees.length;
  const teamMembers = employees;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayAttendance = attendance.filter((a) => {
    const date = new Date(a.date);
    date.setHours(0, 0, 0, 0);
    return date.getTime() === today.getTime();
  });

  const teamAttendanceToday = todayAttendance.filter((a) =>
    teamMembers.some((m) => m.id === a.employeeId)
  );

  const pendingRequests = leaveRequests.filter((r) => r.status === 'pending');
  const teamPendingRequests = pendingRequests.filter((r) =>
    teamMembers.some((m) => m.id === r.employeeId)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Manager Dashboard</h1>
        <p className="text-gray-600 mt-2">Team management and approvals</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Team Size */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Team Size</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{teamSize}</p>
              <p className="text-xs text-gray-600 mt-2">direct reports</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Present Today */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Present Today</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {teamAttendanceToday.filter((a) => a.status === 'present').length}
              </p>
              <p className="text-xs text-gray-600 mt-2">of {teamSize}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Pending Approvals */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Approvals</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{teamPendingRequests.length}</p>
              <p className="text-xs text-orange-600 mt-2">leave requests</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>

        {/* On Leave */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">On Leave</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {teamAttendanceToday.filter((a) => a.status === 'on_leave').length}
              </p>
              <p className="text-xs text-gray-600 mt-2">today</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <Calendar className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Pending Approvals */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Pending Leave Approvals</h2>
        {teamPendingRequests.length === 0 ? (
          <p className="text-gray-600 text-sm">No pending approvals</p>
        ) : (
          <div className="space-y-3">
            {teamPendingRequests.map((request) => {
              const employee = teamMembers.find((m) => m.id === request.employeeId);
              return (
                <div
                  key={request.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{employee?.firstName} {employee?.lastName}</p>
                    <p className="text-sm text-gray-600">
                      {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)} -{' '}
                      {new Date(request.startDate).toLocaleDateString()} to{' '}
                      {new Date(request.endDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{request.reason}</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 bg-green-100 text-green-700 rounded font-medium text-sm hover:bg-green-200">
                      Approve
                    </button>
                    <button className="px-4 py-2 bg-red-100 text-red-700 rounded font-medium text-sm hover:bg-red-200">
                      Reject
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Team Attendance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Team Attendance Today</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-3xl font-bold text-green-600">
              {teamAttendanceToday.filter((a) => a.status === 'present').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Present</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <p className="text-3xl font-bold text-red-600">
              {teamAttendanceToday.filter((a) => a.status === 'absent').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Absent</p>
          </div>
          <div className="text-center p-4 bg-amber-50 rounded-lg">
            <p className="text-3xl font-bold text-amber-600">
              {teamAttendanceToday.filter((a) => a.status === 'half_day').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">Half Day</p>
          </div>
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-3xl font-bold text-blue-600">
              {teamAttendanceToday.filter((a) => a.status === 'on_leave').length}
            </p>
            <p className="text-sm text-gray-600 mt-1">On Leave</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
