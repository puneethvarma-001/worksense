import { PermissionGuard } from '@/lib/permissionGuard';
import { AIToolsTabs } from '@/components/dashboard/AIToolsTabs';

export default async function AIPage() {
  return (
    <PermissionGuard permission="ai.resume_analyze">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">AI Tools</h2>
          <p className="mt-1 text-sm text-gray-600">
            AI-powered tools for recruitment and payroll
          </p>
        </div>

        <AIToolsTabs />
      </div>
    </PermissionGuard>
  );
}
