"use client"

import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import type { Holiday } from '@/lib/demo/policies';
import { Badge } from '@/components/ui/badge';

interface HolidayCalendarProps {
  holidays: Holiday[];
  year: number;
}

export function HolidayCalendar({ holidays, year }: HolidayCalendarProps) {
  // Convert holidays to dates
  const holidayDates = holidays.map(h => new Date(h.date));
  
  // Create a map of dates to holidays for quick lookup
  const holidayMap = new Map(
    holidays.map(h => [new Date(h.date).toDateString(), h])
  );

  const modifiers = {
    holiday: holidayDates,
  };

  const modifiersStyles = {
    holiday: {
      fontWeight: 'bold',
      backgroundColor: 'hsl(var(--primary))',
      color: 'hsl(var(--primary-foreground))',
    },
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-center">
            <Calendar
              mode="single"
              modifiers={modifiers}
              modifiersStyles={modifiersStyles}
              className="rounded-md border"
            />
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-4">Holiday Legend</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-500">National</Badge>
              <span className="text-sm text-muted-foreground">Mandatory public holidays</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-amber-500">Regional</Badge>
              <span className="text-sm text-muted-foreground">Regional festivals</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-500">Optional</Badge>
              <span className="text-sm text-muted-foreground">Optional holidays</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
