import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CalendarIcon, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export function HolidayList() {
  const holidays = [
    { name: 'Republic Day', date: 'Jan 26, 2026', day: 'Monday', type: 'Fixed' },
    { name: 'Holi', date: 'Mar 14, 2026', day: 'Saturday', type: 'Regional' },
    { name: 'Ugadi', date: 'Mar 29, 2026', day: 'Sunday', type: 'Regional' },
    { name: 'Good Friday', date: 'Apr 03, 2026', day: 'Friday', type: 'Fixed' },
    { name: 'Labor Day', date: 'May 01, 2026', day: 'Friday', type: 'Fixed' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center justify-between">
          <span>Upcoming Holidays</span>
          <Badge variant="secondary" className="font-normal text-[10px]">2026</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y">
          {holidays.map((holiday) => (
            <div key={holiday.name} className="flex items-center justify-between p-3 px-4 hover:bg-muted/50 transition-colors group cursor-default">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-primary/5 flex items-center justify-center border group-hover:bg-primary/10 transition-colors">
                  <CalendarIcon className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{holiday.name}</p>
                  <p className="text-[10px] text-muted-foreground">{holiday.date} • {holiday.day}</p>
                </div>
              </div>
              <Badge variant="outline" className={cn(
                "text-[10px] px-1.5 h-5",
                holiday.type === 'Fixed' ? "bg-blue-50 text-blue-600 border-blue-200" : "bg-zinc-50 text-zinc-600 border-zinc-200"
              )}>
                {holiday.type}
              </Badge>
            </div>
          ))}
        </div>
        <div className="p-3 border-t text-center">
          <Button variant="ghost" size="sm" className="text-xs text-primary hover:text-primary hover:bg-primary/5 w-full">
            View Holiday Calendar <ChevronRight className="ml-1 h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
