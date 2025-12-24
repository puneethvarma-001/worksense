/**
 * Policies Module Service
 * Manages company policies and guidelines
 */

import type { LeavePolicy, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class PoliciesService {
  async getLeavePolicies(tenantId: TenantId): Promise<LeavePolicy[]> {
    return mockDataService.getLeavePolicies(tenantId);
  }

  async getPolicy(tenantId: TenantId, leaveType: string): Promise<LeavePolicy | null> {
    const policies = await this.getLeavePolicies(tenantId);
    return policies.find((p) => p.leaveType === leaveType) || null;
  }

  async validateLeaveRequest(
    tenantId: TenantId,
    leaveType: string,
    days: number
  ): Promise<{ valid: boolean; message: string }> {
    const policy = await this.getPolicy(tenantId, leaveType);

    if (!policy) {
      return { valid: false, message: `Leave type not found: ${leaveType}` };
    }

    if (days > policy.allowedDays) {
      return {
        valid: false,
        message: `Requested days exceed allowed limit of ${policy.allowedDays}`
      };
    }

    return { valid: true, message: 'Leave request is valid' };
  }

  async getPolicyMetrics(tenantId: TenantId) {
    const policies = await this.getLeavePolicies(tenantId);

    return {
      totalPolicies: policies.length,
      policies: policies.map((p) => ({
        type: p.leaveType,
        allowedDays: p.allowedDays,
        carryForward: p.carryForwardDays,
        requiresApproval: p.requiresApproval
      }))
    };
  }
}

export const policiesService = new PoliciesService();
