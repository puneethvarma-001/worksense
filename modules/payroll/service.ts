/**
 * Payroll Module Service
 * Manages payroll processing and salary management
 */

import type { Payroll, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class PayrollService {
  async getPayroll(tenantId: TenantId): Promise<Payroll[]> {
    return mockDataService.getPayroll(tenantId);
  }

  async getPayrollByPeriod(tenantId: TenantId, period: string): Promise<Payroll[]> {
    const payroll = await this.getPayroll(tenantId);
    return payroll.filter((p) => p.period === period);
  }

  async getEmployeePayroll(tenantId: TenantId, employeeId: string): Promise<Payroll[]> {
    const payroll = await this.getPayroll(tenantId);
    return payroll.filter((p) => p.employeeId === employeeId);
  }

  async getCurrentPayroll(tenantId: TenantId, employeeId: string): Promise<Payroll | null> {
    const now = new Date();
    const period = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const payroll = await this.getEmployeePayroll(tenantId, employeeId);
    return payroll.find((p) => p.period === period) || null;
  }

  async getPayrollSummary(tenantId: TenantId) {
    const payroll = await this.getPayroll(tenantId);
    const now = new Date();
    const currentPeriod = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    const currentMonthPayroll = payroll.filter((p) => p.period === currentPeriod);

    return {
      total: currentMonthPayroll.reduce((sum, p) => sum + p.netSalary, 0),
      count: currentMonthPayroll.length,
      processed: currentMonthPayroll.filter((p) => p.status === 'processed').length,
      draft: currentMonthPayroll.filter((p) => p.status === 'draft').length,
      paid: currentMonthPayroll.filter((p) => p.status === 'paid').length
    };
  }
}

export const payrollService = new PayrollService();
