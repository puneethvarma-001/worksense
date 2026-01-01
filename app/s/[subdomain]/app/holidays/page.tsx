import { PermissionGuard } from '@/lib/permissionGuard';
import { getHolidays } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarDays, Globe, Star, Calendar } from 'lucide-react';

export default async function HolidaysPage() {
  const holidays = getHolidays();

  const publicHolidays = holidays.filter(h => h.type === 'public').length;
  const optionalHolidays = holidays.filter(h => h.type === 'optional').length;

  return (
    <PermissionGuard permission="holidays.view">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Holidays</h2>
          <p className="mt-1 text-sm text-gray-600">
            Company holiday calendar for 2026
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Holidays</CardTitle>
              <CalendarDays className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{holidays.length}</div>
              <p className="text-xs text-gray-500 mt-1">This year</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Public Holidays</CardTitle>
              <Globe className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{publicHolidays}</div>
              <p className="text-xs text-gray-500 mt-1">Mandatory days off</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Optional Holidays</CardTitle>
              <Star className="h-4 w-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{optionalHolidays}</div>
              <p className="text-xs text-gray-500 mt-1">Available to choose</p>
            </CardContent>
          </Card>
        </div>

        {/* Holidays List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {holidays.map((holiday) => (
            <Card key={holiday.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{holiday.name}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{holiday.description}</p>
                  </div>
                  <Calendar className={`h-5 w-5 ${
                    holiday.type === 'public' ? 'text-green-500' :
                    holiday.type === 'optional' ? 'text-amber-500' :
                    'text-blue-500'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">
                      {new Date(holiday.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      holiday.type === 'public' ? 'bg-green-100 text-green-800' :
                      holiday.type === 'optional' ? 'bg-amber-100 text-amber-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {holiday.type}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <Card>
          <CardHeader>
            <CardTitle>Holiday Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-700">
              <p>
                <strong>Public Holidays:</strong> All employees get these days off with full pay. Office is closed.
              </p>
              <p>
                <strong>Optional Holidays:</strong> Employees can choose to observe these holidays based on personal preference. Must be coordinated with team.
              </p>
              <p>
                <strong>Floating Holidays:</strong> Personal days that can be used at the employee's discretion with manager approval.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  );
}
