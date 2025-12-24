/**
 * Mock Data Service
 * Manages mock data storage and retrieval
 * Caches generated data in Upstash Redis (KV)
 */

import { redis } from '@/lib/redis';
import type {
  Employee,
  Attendance,
  LeaveRequest,
  Payroll,
  Candidate,
  Holiday,
  LeavePolicy,
  OrgNode,
  TenantId
} from '@/lib/types';
import { KV_KEYS, CACHE_DURATIONS } from '@/lib/constants';
import {
  generateMockEmployees,
  generateMockAttendance,
  generateMockLeaveRequests,
  generateMockPayroll,
  generateMockCandidates,
  generateMockHolidays,
  generateMockLeavePolicies,
  generateMockOrgStructure
} from './generators';

/**
 * Mock Data Service
 * Singleton for managing mock data across the application
 */
export class MockDataService {
  private static instance: MockDataService;
  private cache: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): MockDataService {
    if (!MockDataService.instance) {
      MockDataService.instance = new MockDataService();
    }
    return MockDataService.instance;
  }

  // ────────────────────────────────────────
  // EMPLOYEES
  // ────────────────────────────────────────

  async getEmployees(tenantId: TenantId): Promise<Employee[]> {
    const cacheKey = KV_KEYS.EMPLOYEES(tenantId);

    // Check local cache
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      // Check KV cache
      const cached = await redis.get<Employee[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      // Generate fresh data
      const employees = generateMockEmployees(tenantId, 15);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(employees));
      this.cache.set(cacheKey, employees);

      return employees;
    } catch (error) {
      console.error(`Failed to get employees for tenant ${tenantId}`, error);
      return generateMockEmployees(tenantId, 15);
    }
  }

  async getEmployee(tenantId: TenantId, employeeId: string): Promise<Employee | null> {
    const employees = await this.getEmployees(tenantId);
    return employees.find((e) => e.id === employeeId) || null;
  }

  // ────────────────────────────────────────
  // ATTENDANCE
  // ────────────────────────────────────────

  async getAttendance(tenantId: TenantId): Promise<Attendance[]> {
    const cacheKey = KV_KEYS.ATTENDANCE(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<Attendance[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const employees = await this.getEmployees(tenantId);
      const attendance = generateMockAttendance(tenantId, employees);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(attendance));
      this.cache.set(cacheKey, attendance);

      return attendance;
    } catch (error) {
      console.error(`Failed to get attendance for tenant ${tenantId}`, error);
      const employees = await this.getEmployees(tenantId);
      return generateMockAttendance(tenantId, employees);
    }
  }

  async getEmployeeAttendance(tenantId: TenantId, employeeId: string): Promise<Attendance[]> {
    const attendance = await this.getAttendance(tenantId);
    return attendance.filter((a) => a.employeeId === employeeId);
  }

  // ────────────────────────────────────────
  // LEAVE REQUESTS
  // ────────────────────────────────────────

  async getLeaveRequests(tenantId: TenantId): Promise<LeaveRequest[]> {
    const cacheKey = KV_KEYS.LEAVE_REQUESTS(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<LeaveRequest[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const employees = await this.getEmployees(tenantId);
      const requests = generateMockLeaveRequests(tenantId, employees, 10);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(requests));
      this.cache.set(cacheKey, requests);

      return requests;
    } catch (error) {
      console.error(`Failed to get leave requests for tenant ${tenantId}`, error);
      const employees = await this.getEmployees(tenantId);
      return generateMockLeaveRequests(tenantId, employees, 10);
    }
  }

  // ────────────────────────────────────────
  // PAYROLL
  // ────────────────────────────────────────

  async getPayroll(tenantId: TenantId): Promise<Payroll[]> {
    const cacheKey = KV_KEYS.PAYROLL(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<Payroll[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const employees = await this.getEmployees(tenantId);
      const payroll = generateMockPayroll(tenantId, employees);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(payroll));
      this.cache.set(cacheKey, payroll);

      return payroll;
    } catch (error) {
      console.error(`Failed to get payroll for tenant ${tenantId}`, error);
      const employees = await this.getEmployees(tenantId);
      return generateMockPayroll(tenantId, employees);
    }
  }

  // ────────────────────────────────────────
  // CANDIDATES
  // ────────────────────────────────────────

  async getCandidates(tenantId: TenantId): Promise<Candidate[]> {
    const cacheKey = KV_KEYS.CANDIDATES(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<Candidate[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const candidates = generateMockCandidates(tenantId);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(candidates));
      this.cache.set(cacheKey, candidates);

      return candidates;
    } catch (error) {
      console.error(`Failed to get candidates for tenant ${tenantId}`, error);
      return generateMockCandidates(tenantId);
    }
  }

  // ────────────────────────────────────────
  // HOLIDAYS
  // ────────────────────────────────────────

  async getHolidays(tenantId: TenantId): Promise<Holiday[]> {
    const cacheKey = KV_KEYS.HOLIDAYS(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<Holiday[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const holidays = generateMockHolidays(tenantId);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(holidays));
      this.cache.set(cacheKey, holidays);

      return holidays;
    } catch (error) {
      console.error(`Failed to get holidays for tenant ${tenantId}`, error);
      return generateMockHolidays(tenantId);
    }
  }

  // ────────────────────────────────────────
  // LEAVE POLICIES
  // ────────────────────────────────────────

  async getLeavePolicies(tenantId: TenantId): Promise<LeavePolicy[]> {
    return generateMockLeavePolicies(tenantId);
  }

  // ────────────────────────────────────────
  // ORG STRUCTURE
  // ────────────────────────────────────────

  async getOrgStructure(tenantId: TenantId): Promise<OrgNode[]> {
    const cacheKey = KV_KEYS.ORG_STRUCTURE(tenantId);

    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    try {
      const cached = await redis.get<OrgNode[]>(cacheKey);
      if (cached) {
        this.cache.set(cacheKey, cached);
        return cached;
      }

      const employees = await this.getEmployees(tenantId);
      const structure = generateMockOrgStructure(tenantId, employees);
      await redis.setex(cacheKey, CACHE_DURATIONS.MOCK_DATA, JSON.stringify(structure));
      this.cache.set(cacheKey, structure);

      return structure;
    } catch (error) {
      console.error(`Failed to get org structure for tenant ${tenantId}`, error);
      const employees = await this.getEmployees(tenantId);
      return generateMockOrgStructure(tenantId, employees);
    }
  }

  // ────────────────────────────────────────
  // CACHE MANAGEMENT
  // ────────────────────────────────────────

  clearCache(): void {
    this.cache.clear();
  }

  clearCacheForTenant(tenantId: TenantId): void {
    const keys = Array.from(this.cache.keys()).filter((key) => key.includes(tenantId));
    keys.forEach((key) => this.cache.delete(key));
  }
}

// Export singleton instance
export const mockDataService = MockDataService.getInstance();
