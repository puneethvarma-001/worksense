/**
 * Employee Dashboard
 * Individual employee dashboard with personal records and leave balance
 */

import type { Tenant, Attendance, LeaveRequest } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Calendar, FileText, Clock, TrendingUp } from 'lucide-react';

interface EmployeeDashboardProps {
  tenant: Tenant;
  attendance: Attendance[];
  leaveRequests: LeaveRequest[];
}

export function EmployeeDashboard({
  tenant,
  attendance,
  leaveRequests
}: EmployeeDashboardProps) {
  // Get last 30 days attendance
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentAttendance = attendance.filter((a) => new Date(a.date) >= thirtyDaysAgo);
  const presentDays = recentAttendance.filter((a) => a.status === 'present').length;
  const onLeaveDays = recentAttendance.filter((a) => a.status === 'on_leave').length;

  // Calculate leave balance
  const approvedLeaveRequests = leaveRequests.filter((r) => r.status === 'approved');
  const usedLeave = approvedLeaveRequests.reduce(
    (sum, r) =>
      sum + Math.ceil((r.endDate.getTime() - r.startDate.getTime()) / (24 * 60 * 60 * 1000)),
    0
  );

  const leaveByType: Record<string, number> = {};
  approvedLeaveRequests.forEach((r) => {
    leaveByType[r.leaveType] = (leaveByType[r.leaveType] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Dashboard</h1>
        <p className="text-gray-600 mt-2">Your attendance and leave information</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Present Days */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Present (30 days)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{presentDays}</p>
              <p className="text-xs text-gray-600 mt-2">days</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* On Leave */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">On Leave (30 days)</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{onLeaveDays}</p>
              <p className="text-xs text-gray-600 mt-2">days</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Calendar className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Total Leave Used */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Leave Used</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{usedLeave}</p>
              <p className="text-xs text-gray-600 mt-2">days</p>
            </div>
            <div className="p-3 bg-amber-100 rounded-lg">
              <FileText className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </Card>

        {/* Pending Requests */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Pending Requests</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {leaveRequests.filter((r) => r.status === 'pending').length}
              </p>
              <p className="text-xs text-orange-600 mt-2">awaiting approval</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Leave Balance */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Leave Balance</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium text-gray-900">Sick Leave</p>
              <p className="text-sm text-gray-600">Accumulated</p>
            </div>
            <p className="text-lg font-bold text-blue-600">10 days</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium text-gray-900">Casual Leave</p>
              <p className="text-sm text-gray-600">Accumulated</p>
            </div>
            <p className="text-lg font-bold text-blue-600">8 days</p>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <div>
              <p className="font-medium text-gray-900">Personal Leave</p>
              <p className="text-sm text-gray-600">Accumulated</p>
            </div>
            <p className="text-lg font-bold text-blue-600">5 days</p>
          </div>
        </div>
      </Card>

      {/* Recent Requests */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Leave Requests</h2>
        {leaveRequests.length === 0 ? (
          <p className="text-gray-600 text-sm">No leave requests yet</p>
        ) : (
          <div className="space-y-2">
            {leaveRequests.slice(0, 5).map((request) => (
              <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                <div>
                  <p className="font-medium text-gray-900">
                    {request.leaveType.charAt(0).toUpperCase() + request.leaveType.slice(1)}
                  </p>
                  <p className="text-xs text-gray-600">
                    {new Date(request.startDate).toLocaleDateString()} to{' '}
                    {new Date(request.endDate).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    request.status === 'approved'
                      ? 'bg-green-100 text-green-700'
                      : request.status === 'pending'
                        ? 'bg-orange-100 text-orange-700'
                        : 'bg-red-100 text-red-700'
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
