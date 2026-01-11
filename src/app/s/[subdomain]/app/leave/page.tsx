import { getLeaveRequests } from '@/lib/demo/leave';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { LeaveBalanceCards } from '@/components/leave/LeaveBalanceCards';
import { LeaveApplyForm } from '@/components/leave/LeaveApplyForm';
import { LeaveApprovalTable } from '@/components/leave/LeaveApprovalTable';
import { HolidayList } from '@/components/holidays/HolidayList';
import { Search, Filter, History, HandHelping, Landmark, Calendar, Stethoscope, Briefcase, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default async function LeavePage() {
  const requests = getLeaveRequests();
  
  const iconMap = {
    Calendar,
    Stethoscope,
    Briefcase,
    Clock,
  };
  
  return (
    <div className="p-4 md:p-8 space-y-8 max-w-[1600px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Leave Management</h1>
          <p className="text-muted-foreground mt-1 text-sm md:text-base">
            Track your time off, view balances and manage approvals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="px-3 py-1 text-xs gap-1.5 font-medium border">
            <div className="h-2 w-2 rounded-full bg-green-500" />
            Policy: Enterprise 2026
          </Badge>
        </div>
      </div>

      {/* Leave Balance Cards */}
      <LeaveBalanceCards />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <Tabs defaultValue="my-requests" className="space-y-6">
            <div className="border-b">
              <TabsList className="bg-transparent h-auto p-0 gap-8">
                <TabsTrigger 
                  value="my-requests" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
                >
                  <History className="h-4 w-4 mr-2" /> My Requests
                </TabsTrigger>
                <TabsTrigger 
                  value="apply-leave" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
                >
                  <HandHelping className="h-4 w-4 mr-2" /> Apply Leave
                </TabsTrigger>
                <TabsTrigger 
                  value="approvals" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
                >
                  <Landmark className="h-4 w-4 mr-2" /> Approvals
                  <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary/10 text-primary border-primary/20">
                    {requests.filter(r => r.status === 'pending').length}
                  </Badge>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="my-requests">
              <Card className="border-none shadow-none">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/30">
                          <th className="text-left py-4 px-4 font-semibold">Leave Type</th>
                          <th className="text-left py-4 px-4 font-semibold">Period</th>
                          <th className="text-left py-4 px-4 font-semibold">Days</th>
                          <th className="text-left py-4 px-4 font-semibold">Reason</th>
                          <th className="text-left py-4 px-4 font-semibold">Status</th>
                          <th className="text-right py-4 px-4 font-semibold">Applied On</th>
                        </tr>
                      </thead>
                      <tbody>
                        {requests.map((request) => (
                          <tr key={request.id} className="border-b hover:bg-muted/50 transition-colors">
                            <td className="py-4 px-4">
                              <Badge variant="outline" className="font-medium bg-background shadow-xs">
                                {(() => {
                                  const Icon = iconMap[request.icon as keyof typeof iconMap];
                                  return Icon ? <Icon className="h-3 w-3 mr-1 inline" /> : null;
                                })()}
                                {request.leaveType}
                              </Badge>
                            </td>
                            <td className="py-4 px-4">
                              <div className="flex flex-col">
                                <span className="font-medium">{request.startDate} to {request.endDate}</span>
                              </div>
                            </td>
                            <td className="py-4 px-4">
                              <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                                {request.days}
                              </span>
                            </td>
                            <td className="py-4 px-4 max-w-xs truncate text-muted-foreground italic">"{request.reason}"</td>
                            <td className="py-4 px-4">
                              <Badge
                                className={cn(
                                  "capitalize border-none shadow-sm",
                                  request.status === 'approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                                  request.status === 'rejected' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                                  'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                                )}
                              >
                                {request.status}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-right tabular-nums text-muted-foreground">
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

            <TabsContent value="apply-leave" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <LeaveApplyForm />
            </TabsContent>

            <TabsContent value="approvals" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <LeaveApprovalTable requests={requests} />
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-8">
          <HolidayList />
          
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/10">
            <CardHeader>
              <CardTitle className="text-base">Leave Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Usage Rate</span>
                  <span className="font-bold">64%</span>
                </div>
                <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[64%]" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Approved
                  </span>
                  <span>14 Days</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    Pending
                  </span>
                  <span>3 Days</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
