/**
 * Holidays Module Service
 * Manages company holidays and non-working days
 */

import type { Holiday, TenantId } from '@/lib/types';
import { mockDataService } from '@/services/mock-data';

export class HolidaysService {
  async getHolidays(tenantId: TenantId): Promise<Holiday[]> {
    return mockDataService.getHolidays(tenantId);
  }

  async getUpcomingHolidays(tenantId: TenantId, days: number = 90): Promise<Holiday[]> {
    const holidays = await this.getHolidays(tenantId);
    const today = new Date();
    const threshold = new Date();
    threshold.setDate(threshold.getDate() + days);

    return holidays.filter((h) => h.date >= today && h.date <= threshold);
  }

  async isHoliday(tenantId: TenantId, date: Date): Promise<boolean> {
    const holidays = await this.getHolidays(tenantId);
    return holidays.some((h) => {
      const hDate = new Date(h.date);
      hDate.setHours(0, 0, 0, 0);
      const checkDate = new Date(date);
      checkDate.setHours(0, 0, 0, 0);
      return hDate.getTime() === checkDate.getTime();
    });
  }

  async getHolidaysByType(tenantId: TenantId, type: 'national' | 'regional' | 'company'): Promise<Holiday[]> {
    const holidays = await this.getHolidays(tenantId);
    return holidays.filter((h) => h.type === type);
  }

  async getHolidayCalendar(tenantId: TenantId, year: number) {
    const holidays = await this.getHolidays(tenantId);

    const calendar: Record<number, Holiday[]> = {};
    for (let month = 0; month < 12; month++) {
      calendar[month] = holidays.filter((h) => {
        const hDate = new Date(h.date);
        return hDate.getFullYear() === year && hDate.getMonth() === month;
      });
    }

    return calendar;
  }
}

export const holidaysService = new HolidaysService();
