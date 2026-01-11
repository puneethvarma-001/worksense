import { PermissionGuard } from '@/lib/permissionGuard';
import { getOnboardingRecords, getExitRecords } from '@/lib/demo/onboarding';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserPlus, UserMinus, Clock, CheckCircle } from 'lucide-react';

export default async function OnboardingExitsPage() {
  const onboarding = getOnboardingRecords();
  const exits = getExitRecords();

  return (
    <PermissionGuard permission="onboarding.view">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Onboarding & Exits</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage employee onboarding and exit processes
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Onboarding</CardTitle>
              <UserPlus className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onboarding.filter(o => o.status !== 'completed').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">In progress</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {onboarding.filter(o => o.status === 'completed').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">This quarter</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Exits</CardTitle>
              <UserMinus className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {exits.filter(e => e.status !== 'completed').length}
              </div>
              <p className="text-xs text-gray-500 mt-1">In clearance</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Onboarding</CardTitle>
              <Clock className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">14</div>
              <p className="text-xs text-gray-500 mt-1">Days to complete</p>
            </CardContent>
          </Card>
        </div>

        {/* Onboarding Table */}
        <Card>
          <CardHeader>
            <CardTitle>Onboarding In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Start Date</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Progress</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Assigned To</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {onboarding.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.employeeName}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </td>
                      <td className="py-3 px-4">{record.department}</td>
                      <td className="py-3 px-4">{record.startDate}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${(record.tasksCompleted / record.totalTasks) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-600">
                            {record.tasksCompleted}/{record.totalTasks}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4">{record.assignedTo}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'completed' ? 'bg-green-100 text-green-800' :
                          record.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Exits Table */}
        <Card>
          <CardHeader>
            <CardTitle>Exit Clearances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Department</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Last Working Day</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Clearance Steps</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {exits.map((record) => {
                    const completed = record.clearanceSteps.filter(s => s.completed).length;
                    const total = record.clearanceSteps.length;
                    return (
                      <tr key={record.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{record.employeeName}</div>
                          <div className="text-xs text-gray-500">{record.employeeId}</div>
                        </td>
                        <td className="py-3 px-4">{record.department}</td>
                        <td className="py-3 px-4">{record.lastWorkingDay}</td>
                        <td className="py-3 px-4">{record.reason}</td>
                        <td className="py-3 px-4">
                          <span className="text-xs">{completed}/{total} completed</span>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                            record.status === 'completed' ? 'bg-green-100 text-green-800' :
                            record.status === 'clearance' ? 'bg-amber-100 text-amber-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
