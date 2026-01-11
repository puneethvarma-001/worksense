import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar, Umbrella, Stethoscope, Clock, Zap } from 'lucide-react';

export function LeaveBalanceCards() {
  const balances = [
    {
      title: 'Casual Leave',
      value: 8,
      total: 12,
      icon: Umbrella,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      description: 'Used for personal work'
    },
    {
      title: 'Earned Leave',
      value: 12,
      total: 15,
      icon: Calendar,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      description: 'Vacation & planned leave'
    },
    {
      title: 'Sick Leave',
      value: 10,
      total: 12,
      icon: Stethoscope,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      description: 'Medical & emergency'
    },
    {
      title: 'Comp-Off',
      value: 2,
      total: 5,
      icon: zap,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
      description: 'Against extra work'
    }
  ];

  function zap(...args: any[]) { return <Zap {...args[0]} /> }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {balances.map((item) => (
        <Card key={item.title} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
            <div className={`p-2 rounded-lg ${item.bgColor}`}>
              <item.icon className={`h-4 w-4 ${item.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline space-x-1">
              <span className="text-3xl font-bold tracking-tight">{item.value}</span>
              <span className="text-sm text-muted-foreground font-medium">/ {item.total}</span>
            </div>
            <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full ${item.color.replace('text', 'bg')} transition-all duration-500`} 
                style={{ width: `${(item.value / item.total) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-3 uppercase tracking-wider font-semibold">
              {item.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
