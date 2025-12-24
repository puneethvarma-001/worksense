/**
 * Org Structure Module Service
 * Manages organizational hierarchy and department structure
 */

import type { OrgNode, Employee, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class OrgStructureService {
  async getOrgStructure(tenantId: TenantId): Promise<OrgNode[]> {
    return mockDataService.getOrgStructure(tenantId);
  }

  async getDepartments(tenantId: TenantId): Promise<OrgNode[]> {
    const structure = await this.getOrgStructure(tenantId);
    return structure.filter((node) => node.type === 'department');
  }

  async getDepartmentEmployees(tenantId: TenantId, departmentId: string): Promise<Employee[]> {
    const structure = await this.getOrgStructure(tenantId);
    const dept = structure.find((n) => n.id === departmentId);

    if (!dept) return [];

    const employees = await mockDataService.getEmployees(tenantId);
    return employees.filter((e) => dept.employees.includes(e.id));
  }

  async getManagerTeam(tenantId: TenantId, managerId: string): Promise<Employee[]> {
    const employees = await mockDataService.getEmployees(tenantId);
    return employees.filter((e) => e.reportingManagerId === managerId);
  }

  async getOrgChart(tenantId: TenantId) {
    const structure = await this.getOrgStructure(tenantId);
    const employees = await mockDataService.getEmployees(tenantId);

    return {
      departments: structure.filter((n) => n.type === 'department'),
      teams: structure.filter((n) => n.type === 'team'),
      totalEmployees: employees.length,
      departments: structure
        .filter((n) => n.type === 'department')
        .map((dept) => ({
          ...dept,
          employeeCount: dept.employees.length
        }))
    };
  }
}

export const orgStructureService = new OrgStructureService();
