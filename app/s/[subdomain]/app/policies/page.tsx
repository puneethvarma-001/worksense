import { PermissionGuard } from '@/lib/permissionGuard';
import { getPolicies } from '@/lib/demo/policies';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Calendar, Tag } from 'lucide-react';

export default async function PoliciesPage() {
  const policies = getPolicies();

  return (
    <PermissionGuard permission="policies.view">
      <div className="p-6 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Policies</h2>
          <p className="mt-1 text-sm text-gray-600">
            Company policies and guidelines
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Policies</CardTitle>
              <FileText className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{policies.length}</div>
              <p className="text-xs text-gray-500 mt-1">Active policies</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Categories</CardTitle>
              <Tag className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {new Set(policies.map(p => p.category)).size}
              </div>
              <p className="text-xs text-gray-500 mt-1">Policy categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recently Updated</CardTitle>
              <Calendar className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {policies.filter(p => {
                  const date = new Date(p.lastUpdated);
                  const now = new Date();
                  const diffMonths = (now.getFullYear() - date.getFullYear()) * 12 + (now.getMonth() - date.getMonth());
                  return diffMonths <= 3;
                }).length}
              </div>
              <p className="text-xs text-gray-500 mt-1">Last 3 months</p>
            </CardContent>
          </Card>
        </div>

        {/* Policies List */}
        <div className="grid grid-cols-1 gap-4">
          {policies.map((policy) => (
            <Card key={policy.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <CardTitle className="text-lg">{policy.title}</CardTitle>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {policy.category}
                      </span>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{policy.description}</p>
                  </div>
                  <FileText className="h-6 w-6 text-gray-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-700">{policy.content}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t">
                    <span>Effective: {policy.effectiveDate}</span>
                    <span>•</span>
                    <span>Last updated: {policy.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PermissionGuard>
  );
}
