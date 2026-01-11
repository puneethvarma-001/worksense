"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Calendar, User, FileText, Check, X, Search, GitPullRequest, MessageSquareMore } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { LeaveRequest } from '@/lib/demo/leave';
import { cn } from '@/lib/utils';

interface LeaveApprovalTableProps {
  requests: LeaveRequest[];
}

export function LeaveApprovalTable({ requests }: LeaveApprovalTableProps) {
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [items, setItems] = useState<LeaveRequest[]>(requests);
  const [dialog, setDialog] = useState<{
    open: boolean;
    action: 'approve' | 'reject' | 'change' | null;
    request: LeaveRequest | null;
  }>({ open: false, action: null, request: null });
  const [comment, setComment] = useState('');
  const [changeRequestedIds, setChangeRequestedIds] = useState<Set<string>>(new Set());

  const filtered = items.filter(r => {
    const matchesFilter = filterType === 'all' || r.leaveType.toLowerCase().includes(filterType.toLowerCase());
    const matchesSearch = r.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const grouped = {
    pending: filtered.filter(r => r.status === 'pending'),
    approved: filtered.filter(r => r.status === 'approved'),
    rejected: filtered.filter(r => r.status === 'rejected'),
  };

  const leaveBalances: Record<string, number> = {
    cl: 8,
    sl: 10,
    el: 12,
    co: 2,
    ml: 180,
  };

  const getBalanceKey = (leaveType: string) => {
    const lt = leaveType.toLowerCase();
    if (lt.includes('casual')) return 'cl';
    if (lt.includes('sick')) return 'sl';
    if (lt.includes('earned')) return 'el';
    if (lt.includes('comp')) return 'co';
    if (lt.includes('maternity')) return 'ml';
    return null;
  };

  const openAction = (action: 'approve' | 'reject' | 'change', request: LeaveRequest) => {
    setDialog({ open: true, action, request });
    setComment('');
  };

  const confirmAction = () => {
    if (!dialog.request || !dialog.action) return;

    if ((dialog.action === 'reject' || dialog.action === 'change') && comment.trim().length < 4) {
      return;
    }

    const id = dialog.request.id;
    setItems(prev => prev.map(r => {
      if (r.id !== id) return r;
      if (dialog.action === 'approve') return { ...r, status: 'approved' };
      if (dialog.action === 'reject') return { ...r, status: 'rejected' };
      return r; // change request keeps it pending
    }));

    if (dialog.action === 'change') {
      setChangeRequestedIds(prev => new Set(prev).add(id));
    } else {
      setChangeRequestedIds(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }

    alert(
      dialog.action === 'approve'
        ? `Approved ${id}${comment ? `\nComment: ${comment}` : ''}`
        : dialog.action === 'reject'
          ? `Rejected ${id}\nReason: ${comment}`
          : `Requested change for ${id}\nComment: ${comment}`
    );

    setDialog({ open: false, action: null, request: null });
    setComment('');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const Workflow = ({ status }: { status: LeaveRequest['status'] }) => {
    const l1 = status === 'approved' ? 'done' : status === 'rejected' ? 'fail' : 'pending';
    const l2 = status === 'approved' ? 'done' : status === 'rejected' ? 'wait' : 'wait';

    const pill = (label: string, state: 'done' | 'pending' | 'wait' | 'fail') => (
      <Badge
        variant="outline"
        className={cn(
          'text-[10px] h-5 px-1.5 border-none',
          state === 'done' && 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400',
          state === 'pending' && 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
          state === 'wait' && 'bg-muted text-muted-foreground',
          state === 'fail' && 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
        )}
      >
        {label}
      </Badge>
    );

    return (
      <div className="flex items-center gap-2">
        {pill('L1', l1)}
        <span className="text-muted-foreground text-[10px]">→</span>
        {pill('L2', l2)}
      </div>
    );
  };

  const RequestCard = ({ request }: { request: LeaveRequest }) => {
    const balanceKey = getBalanceKey(request.leaveType);
    const before = balanceKey ? leaveBalances[balanceKey] : null;
    const after =
      balanceKey && request.status === 'approved'
        ? Math.max(leaveBalances[balanceKey] - request.days, 0)
        : before;
    const changeRequested = changeRequestedIds.has(request.id) && request.status === 'pending';

    return (
      <Card className="hover:shadow-sm transition-shadow">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <Avatar className="h-10 w-10 border">
                <AvatarFallback className="text-xs bg-primary/5 text-primary font-bold">
                  {getInitials(request.employeeName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="font-semibold truncate">{request.employeeName}</div>
                  <Badge variant="outline" className="font-normal capitalize">
                    {request.leaveType}
                  </Badge>
                  {request.status === 'pending' && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        'border-none',
                        changeRequested
                          ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      )}
                    >
                      {changeRequested ? 'Change Requested' : 'Pending'}
                    </Badge>
                  )}
                  {request.status === 'approved' && (
                    <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-none">
                      Approved
                    </Badge>
                  )}
                  {request.status === 'rejected' && (
                    <Badge className="bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-none">
                      Rejected
                    </Badge>
                  )}
                </div>
                <div className="mt-1 text-xs text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="uppercase tracking-wider">{request.employeeId}</span>
                  <span className="inline-flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {request.startDate} → {request.endDate}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <User className="h-3.5 w-3.5" />
                    Applied {request.appliedOn}
                  </span>
                </div>
                <div className="mt-3 text-sm text-muted-foreground italic line-clamp-2">
                  “{request.reason}”
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3">
              <div className="text-right">
                <div className="text-xs text-muted-foreground">Total Days</div>
                <div className="text-xl font-extrabold text-primary tabular-nums">{request.days}</div>
              </div>

              <Workflow status={request.status} />

              <div className="text-xs text-muted-foreground">
                Balance snapshot:{' '}
                {before == null ? (
                  <span className="font-medium">N/A</span>
                ) : (
                  <span className="font-semibold tabular-nums">
                    {before} → {after}
                  </span>
                )}
              </div>

              {request.status === 'pending' && (
                <div className="flex flex-wrap items-center justify-end gap-2">
                  <Button
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => openAction('approve', request)}
                  >
                    <Check className="h-4 w-4 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => openAction('reject', request)}
                  >
                    <X className="h-4 w-4 mr-1" /> Reject
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openAction('change', request)}
                  >
                    <GitPullRequest className="h-4 w-4 mr-1" /> Request Change
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search employee or ID..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="casual">Casual</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
              <SelectItem value="earned">Earned</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <div className="border-b">
          <TabsList className="bg-transparent h-auto p-0 gap-8">
            <TabsTrigger
              value="pending"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
            >
              Pending
              <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary/10 text-primary border-primary/20">
                {grouped.pending.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="approved"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
            >
              Approved
              <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary/10 text-primary border-primary/20">
                {grouped.approved.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none px-1 pb-4"
            >
              Rejected
              <Badge className="ml-2 h-5 min-w-5 flex items-center justify-center p-0 text-[10px] bg-primary/10 text-primary border-primary/20">
                {grouped.rejected.length}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="pending" className="space-y-3">
          {grouped.pending.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">No pending requests</CardTitle>
                <CardDescription>Everything is up to date for the selected filters.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            grouped.pending.map(r => <RequestCard key={r.id} request={r} />)
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-3">
          {grouped.approved.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">No approved requests</CardTitle>
                <CardDescription>Try adjusting the filters.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            grouped.approved.map(r => <RequestCard key={r.id} request={r} />)
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-3">
          {grouped.rejected.length === 0 ? (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">No rejected requests</CardTitle>
                <CardDescription>Try adjusting the filters.</CardDescription>
              </CardHeader>
            </Card>
          ) : (
            grouped.rejected.map(r => <RequestCard key={r.id} request={r} />)
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={dialog.open} onOpenChange={(open) => setDialog(prev => ({ ...prev, open }))}>
        <DialogContent className="sm:max-w-[560px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {dialog.action === 'approve'
                ? 'Approve Leave Request'
                : dialog.action === 'reject'
                  ? 'Reject Leave Request'
                  : 'Request Change'}
            </DialogTitle>
            <DialogDescription>
              Request ID: {dialog.request?.id}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="rounded-lg border bg-muted/30 p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10 border">
                    <AvatarFallback className="text-xs font-bold">
                      {dialog.request ? getInitials(dialog.request.employeeName) : '??'}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold">{dialog.request?.employeeName}</div>
                    <div className="text-xs text-muted-foreground">{dialog.request?.employeeId}</div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {dialog.request?.startDate} → {dialog.request?.endDate} •{' '}
                      <span className="font-semibold text-foreground">{dialog.request?.days} days</span>
                    </div>
                  </div>
                </div>
                <Badge variant="outline" className="capitalize">
                  {dialog.request?.leaveType}
                </Badge>
              </div>
            </div>

            <div className="space-y-2">
              <LabelledComment
                action={dialog.action}
                comment={comment}
                setComment={setComment}
              />
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => setDialog({ open: false, action: null, request: null })}>
              Cancel
            </Button>
            <Button
              className={cn(
                dialog.action === 'approve' && 'bg-green-600 hover:bg-green-700',
                dialog.action === 'change' && 'border-primary/30'
              )}
              variant={dialog.action === 'reject' ? 'destructive' : dialog.action === 'change' ? 'outline' : 'default'}
              disabled={(dialog.action === 'reject' || dialog.action === 'change') && comment.trim().length < 4}
              onClick={confirmAction}
            >
              {dialog.action === 'approve' && (<><CheckCircle className="h-4 w-4 mr-2" /> Approve</>)}
              {dialog.action === 'reject' && (<><XCircle className="h-4 w-4 mr-2" /> Reject</>)}
              {dialog.action === 'change' && (<><MessageSquareMore className="h-4 w-4 mr-2" /> Send Request</>)}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function LabelledComment({
  action,
  comment,
  setComment,
}: {
  action: 'approve' | 'reject' | 'change' | null;
  comment: string;
  setComment: (v: string) => void;
}) {
  const required = action === 'reject' || action === 'change';
  const label =
    action === 'approve'
      ? 'Comment (Optional)'
      : action === 'reject'
        ? 'Rejection Reason (Required)'
        : 'Change Request Note (Required)';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium">{label}</span>
        {required && <Badge variant="secondary" className="text-[10px] font-normal">Required</Badge>}
      </div>
      <Textarea
        placeholder={
          action === 'approve'
            ? 'Add context for the employee (optional)…'
            : action === 'reject'
              ? 'E.g., High workload during these dates, please re-apply for next week.'
              : 'E.g., Please update dates / attach documents / coordinate with team.'
        }
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      {required && comment.trim().length > 0 && comment.trim().length < 4 && (
        <div className="text-xs text-muted-foreground">Please enter at least 4 characters.</div>
      )}
    </div>
  );
}
