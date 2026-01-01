import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

interface ActivityItem {
  type: 'info' | 'success' | 'warning';
  title: string;
  description: string;
  time: string;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

export function RecentActivity({ activities }: RecentActivityProps) {
  const getDotColor = (type: string) => {
    switch (type) {
      case 'success': return 'bg-green-600';
      case 'warning': return 'bg-yellow-600';
      case 'info': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest updates across modules</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${getDotColor(activity.type)}`} />
              <div className="flex-1">
                <p className="text-sm font-medium">{activity.title}</p>
                <p className="text-xs text-gray-500">{activity.description}</p>
                <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}