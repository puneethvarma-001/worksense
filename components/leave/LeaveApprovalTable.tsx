"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';
import type { LeaveRequest } from '@/lib/demo/leave';

interface LeaveApprovalTableProps {
  requests: LeaveRequest[];
}

export function LeaveApprovalTable({ requests }: LeaveApprovalTableProps) {
  const [filterType, setFilterType] = useState<string>('all');

  const pendingRequests = requests.filter(r => r.status === 'pending');
  
  const filteredRequests = filterType === 'all' 
    ? pendingRequests 
    : pendingRequests.filter(r => r.leaveType.toLowerCase().includes(filterType));

  const handleApprove = (id: string) => {
    alert(`Approved leave request ${id}`);
  };

  const handleReject = (id: string) => {
    alert(`Rejected leave request ${id}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Pending Approvals</CardTitle>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="casual">Casual Leave</SelectItem>
              <SelectItem value="sick">Sick Leave</SelectItem>
              <SelectItem value="earned">Earned Leave</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        {filteredRequests.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pending leave requests
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Employee</th>
                  <th className="text-left py-3 px-4 font-medium">Leave Type</th>
                  <th className="text-left py-3 px-4 font-medium">Dates</th>
                  <th className="text-left py-3 px-4 font-medium">Days</th>
                  <th className="text-left py-3 px-4 font-medium">Reason</th>
                  <th className="text-left py-3 px-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {getInitials(request.employeeName)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{request.employeeName}</div>
                          <div className="text-xs text-muted-foreground">{request.employeeId}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline">{request.leaveType}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-xs">
                        {request.startDate} to {request.endDate}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="font-medium">{request.days}</span>
                    </td>
                    <td className="py-3 px-4 max-w-xs">
                      <span className="line-clamp-2">{request.reason}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleApprove(request.id)}
                          className="h-8"
                        >
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(request.id)}
                          className="h-8"
                        >
                          <XCircle className="h-3 w-3 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
