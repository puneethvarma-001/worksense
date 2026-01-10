"use client"

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export function LeaveApplyForm() {
  const [leaveType, setLeaveType] = useState<string>('');
  const [fromDate, setFromDate] = useState<Date>();
  const [toDate, setToDate] = useState<Date>();
  const [firstHalf, setFirstHalf] = useState(false);
  const [secondHalf, setSecondHalf] = useState(false);
  const [reason, setReason] = useState('');

  const calculateDays = () => {
    if (!fromDate || !toDate) return 0;
    const diffTime = Math.abs(toDate.getTime() - fromDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    
    // Adjust for half days
    if (fromDate.getTime() === toDate.getTime() && (firstHalf || secondHalf)) {
      return 0.5;
    }
    
    return diffDays;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert('Leave request submitted successfully!');
    // Reset form
    setLeaveType('');
    setFromDate(undefined);
    setToDate(undefined);
    setFirstHalf(false);
    setSecondHalf(false);
    setReason('');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Apply for Leave</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="leave-type">Leave Type</Label>
            <Select value={leaveType} onValueChange={setLeaveType}>
              <SelectTrigger id="leave-type">
                <SelectValue placeholder="Select leave type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="casual">Casual Leave</SelectItem>
                <SelectItem value="sick">Sick Leave</SelectItem>
                <SelectItem value="earned">Earned Leave</SelectItem>
                <SelectItem value="comp-off">Compensatory Off</SelectItem>
                <SelectItem value="lop">Loss of Pay</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !fromDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal',
                      !toDate && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="first-half" 
                checked={firstHalf}
                onCheckedChange={(checked) => {
                  setFirstHalf(checked as boolean);
                  if (checked) setSecondHalf(false);
                }}
              />
              <Label htmlFor="first-half" className="text-sm font-normal cursor-pointer">
                First Half
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="second-half" 
                checked={secondHalf}
                onCheckedChange={(checked) => {
                  setSecondHalf(checked as boolean);
                  if (checked) setFirstHalf(false);
                }}
              />
              <Label htmlFor="second-half" className="text-sm font-normal cursor-pointer">
                Second Half
              </Label>
            </div>
          </div>

          {fromDate && toDate && (
            <div className="p-3 bg-muted rounded-lg">
              <p className="text-sm font-medium">
                Total Days: <span className="text-primary">{calculateDays()}</span>
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Enter reason for leave..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!leaveType || !fromDate || !toDate || !reason}>
            Submit Leave Request
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
