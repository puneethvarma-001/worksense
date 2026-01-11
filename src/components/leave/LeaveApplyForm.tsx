"use client"

import { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from '@/components/ui/calendar';
import { useDemoLang } from '@/lib/demo/i18n';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, Upload, Info, User, Phone, CheckCircle2, CalendarDays } from 'lucide-react';
import { addDays, eachDayOfInterval, format, isWeekend, parseISO } from 'date-fns';
import { cn } from '@/lib/utils';
import { getHolidays } from '@/lib/demo/policies';
import type { DateRange } from 'react-day-picker';

export function LeaveApplyForm() {
  const { lang } = useDemoLang();

  const [leaveType, setLeaveType] = useState<string>('');
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [firstHalf, setFirstHalf] = useState(false);
  const [secondHalf, setSecondHalf] = useState(false);
  const [notes, setNotes] = useState('');
  const [notifying, setNotifying] = useState<string>('manager-1');
  const [contact, setContact] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const holidays = useMemo(() => getHolidays(), []);

  const selectedFrom = dateRange?.from;
  const selectedTo = dateRange?.to;

  const stats = useMemo(() => {
    if (!selectedFrom || !selectedTo) return { total: 0, working: 0, weekend: 0, holiday: 0, holidayNames: [] as string[] };

    const days = eachDayOfInterval({ start: selectedFrom, end: selectedTo });

    const holidayByDate = new Map(
      holidays.map(h => [parseISO(h.date).toDateString(), h.name])
    );

    let weekend = 0;
    let holiday = 0;
    const holidayNames: string[] = [];

    for (const d of days) {
      if (isWeekend(d)) weekend++;
      const name = holidayByDate.get(d.toDateString());
      if (name) {
        holiday++;
        holidayNames.push(name);
      }
    }

    let working = Math.max(days.length - weekend - holiday, 0);

    // Adjust for half days if single-day selection
    if (days.length === 1 && (firstHalf || secondHalf)) {
      working = 0.5;
    }

    return { total: days.length, working, weekend, holiday, holidayNames };
  }, [selectedFrom, selectedTo, firstHalf, secondHalf, holidays]);

  const leaveBalances: Record<string, number> = {
    el: 12,
    cl: 8,
    sl: 10,
    co: 2,
    ml: 180,
    lop: 99,
  };

  const leaveTypes = [
    { value: 'el', en: 'Earned Leave', hi: 'Earned Leave', short: 'EL' },
    { value: 'cl', en: 'Casual Leave', hi: 'Casual Leave', short: 'CL' },
    { value: 'sl', en: 'Sick Leave', hi: 'Sick Leave', short: 'SL' },
    { value: 'co', en: 'Comp Off', hi: 'Comp Off', short: 'CO' },
    { value: 'ml', en: 'Maternity Leave', hi: 'Maternity Leave', short: 'ML' },
    { value: 'lop', en: 'Loss of Pay', hi: 'Loss of Pay', short: 'LOP' },
  ];

  const text = {
    title: lang === 'hi' ? 'छुट्टी आवेदन' : 'Apply Leave',
    subtitle: lang === 'hi' ? 'काम से अवकाश हेतु अनुरोध' : 'Request time off from work',
    notesLabel: lang === 'hi' ? 'नोट (वैकल्पिक)' : 'Notes (Optional)',
    applyButton: lang === 'hi' ? 'छुट्टी आवेदन करें' : 'Apply for Leave',
    dateLabel: lang === 'hi' ? 'तिथि सीमा' : 'Date Range',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      alert('Leave request submitted successfully!');
      // Reset form
      setLeaveType('');
      setDateRange(undefined);
      setFirstHalf(false);
      setSecondHalf(false);
      setNotes('');
      setContact('');
    }, 1500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <Card className="lg:col-span-2">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <CardTitle>{text.title}</CardTitle>
              <CardDescription>{text.subtitle}</CardDescription>
            </div>
            <div className="flex items-center gap-3 rounded-lg border bg-muted/30 px-3 py-2">
              <Avatar className="h-9 w-9 border">
                <AvatarFallback className="text-xs bg-primary/5 text-primary font-bold">SR</AvatarFallback>
              </Avatar>
              <div className="leading-tight">
                <div className="text-sm font-semibold">Sai Ram</div>
                <div className="text-[10px] text-muted-foreground uppercase tracking-wider">Employee</div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="leave-type">Leave Type</Label>
                <Select value={leaveType} onValueChange={setLeaveType}>
                  <SelectTrigger id="leave-type">
                    <SelectValue placeholder="Select leave type" />
                  </SelectTrigger>
                  <SelectContent>
                    {leaveTypes.map((t) => (
                      <SelectItem key={t.value} value={t.value}>
                        {(lang === 'hi' ? t.hi : t.en)} ({t.short} • {leaveBalances[t.value]} left)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notify">Notify To</Label>
                <Select value={notifying} onValueChange={setNotifying}>
                  <SelectTrigger id="notify">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <SelectValue placeholder="Select manager" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="manager-1">Aditya Reddy (Manager)</SelectItem>
                    <SelectItem value="manager-2">Sneha Kapoor (HR)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>{text.dateLabel}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal h-10',
                      !selectedFrom && 'text-muted-foreground'
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedFrom && selectedTo ? (
                      <span>
                        {format(selectedFrom, 'PPP')} – {format(selectedTo, 'PPP')}
                      </span>
                    ) : selectedFrom ? (
                      <span>{format(selectedFrom, 'PPP')} – Select end date</span>
                    ) : (
                      <span>Select start & end dates</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="range"
                    selected={dateRange}
                    onSelect={setDateRange}
                    numberOfMonths={2}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="font-normal">
                  Total: <span className="ml-1 font-semibold text-foreground tabular-nums">{stats.total}</span>
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Working: <span className="ml-1 font-semibold text-foreground tabular-nums">{stats.working}</span>
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Weekends: <span className="ml-1 font-semibold text-foreground tabular-nums">{stats.weekend}</span>
                </Badge>
                <Badge variant="secondary" className="font-normal">
                  Holidays: <span className="ml-1 font-semibold text-foreground tabular-nums">{stats.holiday}</span>
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-6 p-4 border rounded-md bg-muted/30">
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
              <div className="text-xs text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                Only applicable for single day leave
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notes">{text.notesLabel}</Label>
                <Textarea
                  id="notes"
                  placeholder={lang === 'hi' ? 'मैनेजर/HR के लिए नोट लिखें (वैकल्पिक)…' : 'Add a note for your manager/HR (optional)…'}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="min-h-[100px]"
                />
                {stats.holidayNames.length > 0 && (
                  <div className="rounded-md border bg-muted/30 p-3 text-xs">
                    <div className="flex items-center gap-2 font-medium">
                      <CalendarDays className="h-4 w-4 text-primary" />
                      Holidays in selected range
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {stats.holidayNames.slice(0, 6).map((name) => (
                        <Badge key={name} variant="outline" className="font-normal">
                          {name}
                        </Badge>
                      ))}
                      {stats.holidayNames.length > 6 && (
                        <Badge variant="secondary" className="font-normal">
                          +{stats.holidayNames.length - 6} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact">Contact during leave</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input 
                      id="contact" 
                      placeholder="+91 XXXXXXXXXX" 
                      className="pl-9"
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                    />
                  </div>
                </div>
                {leaveType === 'sick' && (
                  <div className="space-y-2">
                    <Label htmlFor="attachment">Medical Certificate (Optional)</Label>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" type="button" className="w-full justify-start text-muted-foreground" onClick={() => alert('File upload simulated')}>
                        <Upload className="mr-2 h-4 w-4" />
                        Choose file
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!leaveType || !selectedFrom || !selectedTo || isSubmitting}
            >
              {isSubmitting ? (lang === 'hi' ? 'जमा हो रहा है…' : 'Submitting...') : text.applyButton}
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Days:</span>
              <span className="font-bold">{stats.total || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Weekends:</span>
              <span className="font-medium text-amber-600">{stats.weekend || 0}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Holidays:</span>
              <span className="font-medium text-amber-600">{stats.holiday || 0}</span>
            </div>
            <div className="flex justify-between text-sm pt-2 border-t font-semibold">
              <span>Required Balance:</span>
              <span className="text-primary">{stats.working || 0} days</span>
            </div>
            {selectedTo && (
              <div className="mt-4 p-3 bg-white dark:bg-zinc-900 rounded-md border text-xs">
                <p className="font-medium text-muted-foreground">Work Resumes On:</p>
                <p className="text-sm font-bold mt-1">
                  {format(
                    addDays(
                      selectedTo,
                      isWeekend(addDays(selectedTo, 1))
                        ? (addDays(selectedTo, 1).getDay() === 0 ? 1 : 2)
                        : 1
                    ),
                    'EEEE, MMM do'
                  )}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave Balances</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span>Earned Leave (EL)</span>
              <span className="font-semibold tabular-nums">{leaveBalances.el}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Casual Leave (CL)</span>
              <span className="font-semibold tabular-nums">{leaveBalances.cl}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Sick Leave (SL)</span>
              <span className="font-semibold tabular-nums">{leaveBalances.sl}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Comp Off (CO)</span>
              <span className="font-semibold tabular-nums">{leaveBalances.co}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Maternity Leave (ML)</span>
              <span className="font-semibold tabular-nums">{leaveBalances.ml}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Company Holidays</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {holidays
              .filter(h => new Date(h.date) >= new Date())
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
              .slice(0, 6)
              .map((h) => (
                <div key={h.id} className="flex items-start justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <div className="font-medium truncate">{h.name}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {format(parseISO(h.date), 'EEE, MMM d')}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      'text-[10px] h-5 px-1.5 border-none',
                      h.type === 'national'
                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                        : h.type === 'regional'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    )}
                  >
                    {h.type}
                  </Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leave Policy Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-xs text-muted-foreground">
            <li className="flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
              Casual leaves should be applied at least 2 days in advance.
            </li>
            <li className="flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
              Sick leaves more than 2 days require a medical certificate.
            </li>
            <li className="flex gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-1 shrink-0" />
              Sandwich policy applies on weekends.
            </li>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

