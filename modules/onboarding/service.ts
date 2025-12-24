/**
 * Onboarding Module Service
 * Manages employee onboarding and exit workflows
 */

import type { Employee, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class OnboardingService {
  async getOnboardingCandidates(tenantId: TenantId): Promise<Employee[]> {
    const employees = await mockDataService.getEmployees(tenantId);
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    return employees.filter((e) => e.joinDate >= thirtyDaysAgo);
  }

  async getNewHires(tenantId: TenantId, days: number = 7): Promise<Employee[]> {
    const employees = await mockDataService.getEmployees(tenantId);
    const threshold = new Date();
    threshold.setDate(threshold.getDate() - days);

    return employees.filter((e) => e.joinDate >= threshold);
  }

  async getOnboardingStatus(tenantId: TenantId) {
    const newHires = await this.getNewHires(tenantId);

    return {
      totalNewHires: newHires.length,
      completedOnboarding: Math.floor(newHires.length * 0.6),
      pendingTasks: Math.floor(newHires.length * 0.3),
      departmentWise: this.groupByDepartment(newHires)
    };
  }

  private groupByDepartment(employees: Employee[]) {
    const grouped: Record<string, number> = {};
    for (const emp of employees) {
      grouped[emp.department] = (grouped[emp.department] || 0) + 1;
    }
    return grouped;
  }
}

export const onboardingService = new OnboardingService();
