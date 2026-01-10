import { getLeaveRequests } from '@/lib/demo/leave';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LeaveBalanceCards } from '@/components/leave/LeaveBalanceCards';
import { LeaveApplyForm } from '@/components/leave/LeaveApplyForm';
import { LeaveApprovalTable } from '@/components/leave/LeaveApprovalTable';

export default async function LeavePage() {
  const requests = getLeaveRequests();
  
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Leave Management</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          View and manage leave requests
        </p>
      </div>

      {/* Leave Balance Cards */}
      <LeaveBalanceCards />

      {/* Tabbed Interface */}
      <Tabs defaultValue="my-requests" className="space-y-4">
        <TabsList>
          <TabsTrigger value="my-requests">My Requests</TabsTrigger>
          <TabsTrigger value="apply-leave">Apply Leave</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
        </TabsList>

        <TabsContent value="my-requests" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>My Leave Requests</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium">Type</th>
                      <th className="text-left py-3 px-4 font-medium">Period</th>
                      <th className="text-left py-3 px-4 font-medium">Days</th>
                      <th className="text-left py-3 px-4 font-medium">Reason</th>
                      <th className="text-left py-3 px-4 font-medium">Status</th>
                      <th className="text-left py-3 px-4 font-medium">Applied On</th>
                    </tr>
                  </thead>
                  <tbody>
                    {requests.map((request) => (
                      <tr key={request.id} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">
                          <Badge variant="outline">{request.leaveType}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-xs">
                            {request.startDate} to {request.endDate}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-medium">{request.days}</td>
                        <td className="py-3 px-4 max-w-xs truncate">{request.reason}</td>
                        <td className="py-3 px-4">
                          <Badge
                            variant={
                              request.status === 'approved' ? 'default' :
                              request.status === 'rejected' ? 'destructive' :
                              'secondary'
                            }
                          >
                            {request.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-xs text-muted-foreground">
                          {request.appliedOn}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apply-leave">
          <LeaveApplyForm />
        </TabsContent>

        <TabsContent value="approvals">
          <LeaveApprovalTable requests={requests} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
