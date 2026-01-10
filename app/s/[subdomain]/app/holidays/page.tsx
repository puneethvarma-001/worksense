"use client"

import { useState } from 'react';
import { getHolidays } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Globe, Star, Calendar as CalendarIcon, List, CalendarCheck } from 'lucide-react';
import { HolidayCalendar } from '@/components/holidays/HolidayCalendar';

export default function HolidaysPage() {
  const holidays = getHolidays();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedYear, setSelectedYear] = useState('2026');

  const nationalHolidays = holidays.filter(h => h.type === 'national').length;
  const regionalHolidays = holidays.filter(h => h.type === 'regional').length;
  const optionalHolidays = holidays.filter(h => h.type === 'optional').length;

  // Get upcoming holidays (next 3)
  const today = new Date();
  const upcomingHolidays = holidays
    .filter(h => new Date(h.date) >= today)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 3);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'national':
        return 'bg-green-500 hover:bg-green-600';
      case 'regional':
        return 'bg-amber-500 hover:bg-amber-600';
      case 'optional':
        return 'bg-blue-500 hover:bg-blue-600';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Holidays</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Company holiday calendar for 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedYear} onValueChange={setSelectedYear}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
              <SelectItem value="2027">2027</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1 border rounded-md p-1">
            <Button
              variant={view === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('list')}
            >
              <List className="h-4 w-4 mr-1" />
              List
            </Button>
            <Button
              variant={view === 'calendar' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setView('calendar')}
            >
              <CalendarIcon className="h-4 w-4 mr-1" />
              Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Upcoming Holidays Highlight */}
      {upcomingHolidays.length > 0 && (
        <Card className="bg-gradient-to-r from-primary/10 to-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Upcoming Holidays
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {upcomingHolidays.map((holiday) => (
                <div key={holiday.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex flex-col items-center justify-center">
                      <span className="text-xs font-medium text-primary">
                        {new Date(holiday.date).toLocaleDateString('en-US', { month: 'short' })}
                      </span>
                      <span className="text-lg font-bold text-primary">
                        {new Date(holiday.date).getDate()}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{holiday.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{holiday.description}</p>
                    <Badge className={`mt-1 ${getBadgeColor(holiday.type)}`} variant="default">
                      {holiday.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">National Holidays</CardTitle>
            <Globe className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nationalHolidays}</div>
            <p className="text-xs text-muted-foreground mt-1">Mandatory days off</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Regional Holidays</CardTitle>
            <CalendarDays className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{regionalHolidays}</div>
            <p className="text-xs text-muted-foreground mt-1">Festival celebrations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Optional Holidays</CardTitle>
            <Star className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{optionalHolidays}</div>
            <p className="text-xs text-muted-foreground mt-1">Available to choose</p>
          </CardContent>
        </Card>
      </div>

      {/* View Toggle Content */}
      {view === 'calendar' ? (
        <HolidayCalendar holidays={holidays} year={parseInt(selectedYear)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {holidays.map((holiday) => (
            <Card key={holiday.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{holiday.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{holiday.description}</p>
                  </div>
                  <CalendarIcon className={`h-5 w-5 ${
                    holiday.type === 'national' ? 'text-green-500' :
                    holiday.type === 'regional' ? 'text-amber-500' :
                    'text-blue-500'
                  }`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {new Date(holiday.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                  <div>
                    <Badge className={getBadgeColor(holiday.type)} variant="default">
                      {holiday.type}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Additional Info */}
      <Card>
        <CardHeader>
          <CardTitle>Holiday Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <p>
              <strong className="text-green-600">National Holidays:</strong> All employees get these days off with full pay. Office is closed.
            </p>
            <p>
              <strong className="text-amber-600">Regional Holidays:</strong> Festivals specific to regions/states. Employees can avail based on their location.
            </p>
            <p>
              <strong className="text-blue-600">Optional Holidays:</strong> Employees can choose to observe these holidays based on personal preference. Must be coordinated with team.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
