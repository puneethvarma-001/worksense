import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string;
  change?: string;
  icon: string; // lucide icon name
}

export function StatsCard({ title, value, change, icon }: StatsCardProps) {
  const IconComponent = Icons[icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className="h-4 w-4 text-gray-500" />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && <p className="text-xs text-gray-500 mt-1">{change}</p>}
      </CardContent>
    </Card>
  );
}