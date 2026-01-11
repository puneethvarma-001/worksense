"use client"

import { useState } from 'react';
import { getHolidays } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { CalendarDays, Globe, Star, Calendar as CalendarIcon, List, CalendarCheck, Flag, Sparkles, BadgeCheck, Download } from 'lucide-react';
import { HolidayCalendar } from '@/components/holidays/HolidayCalendar';

export default function HolidaysPage() {
  const holidays = getHolidays();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [selectedYear, setSelectedYear] = useState('2026');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedOptional, setSelectedOptional] = useState<Record<string, boolean>>({});

  const year = parseInt(selectedYear);
  const filteredHolidays = holidays
    .filter(h => new Date(h.date).getFullYear() === year)
    .filter(h => {
      if (selectedState === 'All') return true;
      if (h.type === 'national') return true;
      if (!h.states || h.states.includes('All')) return true;
      return h.states.includes(selectedState);
    });

  const nationalHolidays = filteredHolidays.filter(h => h.type === 'national').length;
  const regionalHolidays = filteredHolidays.filter(h => h.type === 'regional').length;
  const optionalHolidays = filteredHolidays.filter(h => h.type === 'optional').length;

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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'national':
        return <Flag className="h-4 w-4 text-green-600" />;
      case 'regional':
        return <Sparkles className="h-4 w-4 text-amber-600" />;
      case 'optional':
        return <BadgeCheck className="h-4 w-4 text-blue-600" />;
      default:
        return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const handleExportPdf = () => {
    // Demo approach: use browser print dialog; users can “Save as PDF”.
    window.print();
  };

  const optionalList = filteredHolidays.filter(h => h.type === 'optional');
  const selectedOptionalCount = Object.values(selectedOptional).filter(Boolean).length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Holidays</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Company holiday calendar for {selectedYear}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleExportPdf} className="hidden sm:inline-flex">
            <Download className="h-4 w-4 mr-2" /> Export PDF
          </Button>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger className="w-[220px] hidden md:flex">
              <SelectValue placeholder="Choose State Holiday Calendar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All India</SelectItem>
              <SelectItem value="Karnataka">Karnataka</SelectItem>
              <SelectItem value="Telangana">Telangana</SelectItem>
              <SelectItem value="Andhra Pradesh">Andhra Pradesh</SelectItem>
              <SelectItem value="Maharashtra">Maharashtra</SelectItem>
              <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
              <SelectItem value="Kerala">Kerala</SelectItem>
              <SelectItem value="Delhi">Delhi</SelectItem>
            </SelectContent>
          </Select>
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
        <HolidayCalendar holidays={filteredHolidays} year={parseInt(selectedYear)} />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredHolidays.map((holiday) => (
            <Card key={holiday.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-base">{holiday.name}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">{holiday.description}</p>
                  </div>
                  {getTypeIcon(holiday.type)}
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
                    {holiday.type === 'regional' && selectedState !== 'All' && (
                      <Badge variant="outline" className="ml-2">
                        {selectedState}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Optional holidays selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Optional Holidays</span>
            <Badge variant="secondary" className="font-normal text-xs">
              Selected: {selectedOptionalCount}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Choose optional holidays as per your preference and team coordination.
          </p>
          {optionalList.length === 0 ? (
            <div className="text-sm text-muted-foreground">No optional holidays in this filter.</div>
          ) : (
            <div className="space-y-2">
              {optionalList.map(h => (
                <label key={h.id} className="flex items-start gap-3 rounded-md border p-3 hover:bg-muted/30 cursor-pointer">
                  <Checkbox
                    checked={!!selectedOptional[h.id]}
                    onCheckedChange={(v) => setSelectedOptional(prev => ({ ...prev, [h.id]: Boolean(v) }))}
                    className="mt-1"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{h.name}</span>
                      <Badge className={getBadgeColor(h.type)} variant="default">optional</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {new Date(h.date).toLocaleDateString('en-IN', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

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
              <strong className="text-amber-600">Festival / State Holidays:</strong> Festivals specific to regions/states. Employees can avail based on their location.
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
