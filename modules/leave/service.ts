/**
 * Leave Management Service
 * Handles leave request operations and leave management
 */

import type { LeaveRequest, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class LeaveService {
  async getLeaveRequests(tenantId: TenantId): Promise<LeaveRequest[]> {
    return mockDataService.getLeaveRequests(tenantId);
  }

  async getPendingLeaveRequests(tenantId: TenantId): Promise<LeaveRequest[]> {
    const requests = await this.getLeaveRequests(tenantId);
    return requests.filter((r) => r.status === 'pending');
  }

  async getLeaveBalance(tenantId: TenantId, employeeId: string) {
    const policies = await mockDataService.getLeavePolicies(tenantId);
    const requests = await this.getLeaveRequests(tenantId);

    const employeeRequests = requests.filter(
      (r) => r.employeeId === employeeId && r.status === 'approved'
    );

    const balance: Record<string, number> = {};
    for (const policy of policies) {
      const used = employeeRequests
        .filter((r) => r.leaveType === policy.leaveType)
        .reduce(
          (sum, r) =>
            sum + Math.ceil((r.endDate.getTime() - r.startDate.getTime()) / (24 * 60 * 60 * 1000)),
          0
        );
      balance[policy.leaveType] = Math.max(0, policy.allowedDays - used);
    }

    return balance;
  }
}

export const leaveService = new LeaveService();
