import { PermissionGuard } from '@/lib/permissionGuard';
import { getPayrollRecords } from '@/lib/demo/payroll';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DollarSign, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react';

export default async function PayrollPage() {
  const records = getPayrollRecords();
  
  const totalPay = records.reduce((sum, r) => sum + r.netPay, 0);
  const pendingCount = records.filter(r => r.status === 'pending').length;

  return (
    <PermissionGuard permission="payroll.view">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Payroll</h2>
          <p className="mt-1 text-sm text-gray-600">
            Manage and process employee payroll
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Payroll</CardTitle>
              <DollarSign className="h-4 w-4 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalPay.toLocaleString()}</div>
              <p className="text-xs text-gray-500 mt-1">December 2025</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Verification</CardTitle>
              <AlertCircle className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingCount}</div>
              <p className="text-xs text-gray-500 mt-1">Records need review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Processed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{records.length - pendingCount}</div>
              <p className="text-xs text-gray-500 mt-1">Ready for payment</p>
            </CardContent>
          </Card>
        </div>

        {/* Payroll Table */}
        <Card>
          <CardHeader>
            <CardTitle>December 2025 Payroll</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Employee</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Base Salary</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Deductions</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Bonuses</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Net Pay</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((record) => (
                    <tr key={record.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <div className="font-medium">{record.employeeName}</div>
                        <div className="text-xs text-gray-500">{record.employeeId}</div>
                      </td>
                      <td className="py-3 px-4">${record.baseSalary.toLocaleString()}</td>
                      <td className="py-3 px-4 text-red-600">-${record.deductions.toLocaleString()}</td>
                      <td className="py-3 px-4 text-green-600">+${record.bonuses.toLocaleString()}</td>
                      <td className="py-3 px-4 font-semibold">${record.netPay.toLocaleString()}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          record.status === 'verified' ? 'bg-green-100 text-green-800' :
                          record.status === 'paid' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
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
      </div>
    </PermissionGuard>
  );
}
