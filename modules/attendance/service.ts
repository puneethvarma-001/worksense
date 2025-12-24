/**
 * Attendance Module Service
 * Manages attendance tracking and analytics
 */

import type { Attendance, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class AttendanceService {
  async getAttendance(tenantId: TenantId): Promise<Attendance[]> {
    return mockDataService.getAttendance(tenantId);
  }

  async getTodayAttendance(tenantId: TenantId): Promise<Attendance[]> {
    const attendance = await this.getAttendance(tenantId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return attendance.filter((a) => {
      const recordDate = new Date(a.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });
  }

  async getEmployeeAttendance(tenantId: TenantId, employeeId: string): Promise<Attendance[]> {
    return mockDataService.getEmployeeAttendance(tenantId, employeeId);
  }

  async getAttendanceSummary(tenantId: TenantId) {
    const attendance = await this.getAttendance(tenantId);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todayRecords = attendance.filter((a) => {
      const recordDate = new Date(a.date);
      recordDate.setHours(0, 0, 0, 0);
      return recordDate.getTime() === today.getTime();
    });

    return {
      present: todayRecords.filter((a) => a.status === 'present').length,
      absent: todayRecords.filter((a) => a.status === 'absent').length,
      halfDay: todayRecords.filter((a) => a.status === 'half_day').length,
      onLeave: todayRecords.filter((a) => a.status === 'on_leave').length
    };
  }
}

export const attendanceService = new AttendanceService();
