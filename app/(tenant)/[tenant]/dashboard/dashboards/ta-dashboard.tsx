/**
 * TA Dashboard
 * Talent Acquisition dashboard for recruitment and candidate management
 */

import type { Tenant } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { Users, Target, CheckCircle, AlertCircle } from 'lucide-react';
import { mockDataService } from '@/services/mock-data';

interface TADashboardProps {
  tenant: Tenant;
}

export async function TADashboard({ tenant }: TADashboardProps) {
  // Get mock candidates
  const candidates = await mockDataService.getCandidates(tenant.id);

  const totalCandidates = candidates.length;
  const screening = candidates.filter((c) => c.status === 'screening').length;
  const interviewed = candidates.filter((c) => c.status === 'interviewed').length;
  const selected = candidates.filter((c) => c.status === 'selected').length;
  const rejected = candidates.filter((c) => c.status === 'rejected').length;

  // Group by position
  const byPosition: Record<string, number> = {};
  candidates.forEach((c) => {
    byPosition[c.position] = (byPosition[c.position] || 0) + 1;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Recruitment Dashboard</h1>
        <p className="text-gray-600 mt-2">Candidate management and hiring pipeline</p>
      </div>

      {/* Pipeline Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Candidates */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{totalCandidates}</p>
              <p className="text-xs text-gray-600 mt-2">candidates</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Screening */}
        <Card className="p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Screening</p>
            <p className="text-3xl font-bold text-amber-600 mt-1">{screening}</p>
            <p className="text-xs text-gray-600 mt-2">in progress</p>
          </div>
        </Card>

        {/* Interviewed */}
        <Card className="p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Interviewed</p>
            <p className="text-3xl font-bold text-blue-600 mt-1">{interviewed}</p>
            <p className="text-xs text-gray-600 mt-2">candidates</p>
          </div>
        </Card>

        {/* Selected */}
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Selected</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{selected}</p>
              <p className="text-xs text-gray-600 mt-2">ready to hire</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Rejected */}
        <Card className="p-6">
          <div>
            <p className="text-gray-600 text-sm font-medium">Rejected</p>
            <p className="text-3xl font-bold text-red-600 mt-1">{rejected}</p>
            <p className="text-xs text-gray-600 mt-2">candidates</p>
          </div>
        </Card>
      </div>

      {/* Open Positions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Open Positions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(byPosition).map(([position, count]) => (
            <div key={position} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="font-medium text-gray-900">{position}</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{count}</p>
              <p className="text-xs text-gray-600 mt-1">candidates</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recent Candidates */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Candidates</h2>
        <div className="space-y-3">
          {candidates.slice(0, 5).map((candidate) => (
            <div
              key={candidate.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200"
            >
              <div className="flex-1">
                <p className="font-medium text-gray-900">{candidate.name}</p>
                <p className="text-sm text-gray-600">{candidate.position}</p>
                {candidate.resumeAnalysis && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${candidate.resumeAnalysis.score}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {candidate.resumeAnalysis.score}%
                    </span>
                  </div>
                )}
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    candidate.status === 'selected'
                      ? 'bg-green-100 text-green-700'
                      : candidate.status === 'rejected'
                        ? 'bg-red-100 text-red-700'
                        : candidate.status === 'interviewed'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {candidate.status.charAt(0).toUpperCase() + candidate.status.slice(1)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Quick Actions */}
      <Card className="p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <button className="p-3 bg-blue-50 hover:bg-blue-100 rounded-lg text-blue-600 font-medium text-sm transition-colors">
            Add Candidate
          </button>
          <button className="p-3 bg-green-50 hover:bg-green-100 rounded-lg text-green-600 font-medium text-sm transition-colors">
            Schedule Interview
          </button>
          <button className="p-3 bg-purple-50 hover:bg-purple-100 rounded-lg text-purple-600 font-medium text-sm transition-colors">
            View Analytics
          </button>
        </div>
      </Card>
    </div>
  );
}
