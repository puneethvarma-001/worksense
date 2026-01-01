import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import * as Icons from 'lucide-react';

interface ModuleCardProps {
  module: {
    key: string;
    label: string;
    href: string;
    icon: string;
    description: string;
    quickActions?: string[];
  };
  subdomain: string;
}

export function ModuleCard({ module, subdomain }: ModuleCardProps) {
  const IconComponent = Icons[module.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-3">
          {IconComponent && <IconComponent className="h-6 w-6 text-blue-600" />}
          <div>
            <CardTitle className="text-lg">{module.label}</CardTitle>
            <CardDescription>{module.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {module.quickActions && module.quickActions.length > 0 && (
            <div className="space-y-2">
              {module.quickActions.slice(0, 2).map((action, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href={`/s/${subdomain}/app${module.href}`}>
                    {action}
                  </Link>
                </Button>
              ))}
            </div>
          )}
          <Button asChild className="w-full">
            <Link href={`/s/${subdomain}/app${module.href}`}>
              Go to {module.label}
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}