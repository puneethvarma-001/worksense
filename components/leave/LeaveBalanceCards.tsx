import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Umbrella, Stethoscope } from 'lucide-react';

export function LeaveBalanceCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Casual Leave</CardTitle>
          <Umbrella className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground mt-1">out of 12 remaining</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Earned Leave</CardTitle>
          <Calendar className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground mt-1">out of 15 remaining</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Sick Leave</CardTitle>
          <Stethoscope className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">10</div>
          <p className="text-xs text-muted-foreground mt-1">out of 12 remaining</p>
        </CardContent>
      </Card>
    </div>
  );
}
