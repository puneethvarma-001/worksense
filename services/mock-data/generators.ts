/**
 * Mock Data Generators
 * Generates realistic mock data for all HR modules
 * Easy to replace with real database later
 */

import type {
  Employee,
  Attendance,
  LeaveRequest,
  Payroll,
  Candidate,
  Holiday,
  LeavePolicy,
  OrgNode,
  EmployeeId,
  TenantId
} from '@/lib/types';
import { makeEmployeeId } from '@/lib/types';

/**
 * Generate mock employees for a tenant
 */
export function generateMockEmployees(
  tenantId: TenantId,
  count: number = 10
): Employee[] {
  const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
  const designations = ['Manager', 'Senior Engineer', 'Engineer', 'Analyst', 'Coordinator', 'Lead'];
  const firstNames = ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank', 'Grace', 'Henry', 'Ivy', 'Jack'];
  const lastNames = ['Johnson', 'Smith', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];

  const employees: Employee[] = [];

  for (let i = 0; i < count; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    const department = departments[i % departments.length];

    employees.push({
      id: makeEmployeeId(`emp-${tenantId}-${i + 1}`),
      tenantId,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      phone: `+1-555-${String(i).padStart(4, '0')}`,
      designation: designations[i % designations.length],
      department,
      reportingManagerId: i > 0 ? makeEmployeeId(`emp-${tenantId}-1`) : undefined,
      joinDate: new Date(2022, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
      status: 'active',
      salary: 50000 + Math.random() * 80000,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return employees;
}

/**
 * Generate mock attendance records
 */
export function generateMockAttendance(
  tenantId: TenantId,
  employees: Employee[],
  days: number = 30
): Attendance[] {
  const records: Attendance[] = [];
  const today = new Date();

  for (const employee of employees) {
    for (let d = 0; d < days; d++) {
      const date = new Date(today);
      date.setDate(date.getDate() - d);

      // Skip weekends
      if (date.getDay() === 0 || date.getDay() === 6) continue;

      const random = Math.random();
      let status: Attendance['status'] = 'present';

      if (random > 0.9) {
        status = 'absent';
      } else if (random > 0.8) {
        status = 'half_day';
      } else if (random > 0.7) {
        status = 'on_leave';
      }

      const checkIn = new Date(date);
      checkIn.setHours(9, Math.floor(Math.random() * 30), 0);

      const checkOut = new Date(date);
      checkOut.setHours(17, Math.floor(Math.random() * 60), 0);

      records.push({
        id: `att-${employee.id}-${date.toISOString().split('T')[0]}`,
        tenantId,
        employeeId: employee.id,
        date,
        checkIn: status === 'present' || status === 'half_day' ? checkIn : undefined,
        checkOut: status === 'present' ? checkOut : undefined,
        status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  return records;
}

/**
 * Generate mock leave requests
 */
export function generateMockLeaveRequests(
  tenantId: TenantId,
  employees: Employee[],
  count: number = 5
): LeaveRequest[] {
  const types: LeaveRequest['leaveType'][] = ['sick', 'casual', 'personal', 'maternity'];
  const requests: LeaveRequest[] = [];

  for (let i = 0; i < Math.min(count, employees.length); i++) {
    const employee = employees[i];
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + Math.floor(Math.random() * 30));

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + Math.floor(Math.random() * 5) + 1);

    requests.push({
      id: `leave-${tenantId}-${i}`,
      tenantId,
      employeeId: employee.id,
      leaveType: types[i % types.length],
      startDate,
      endDate,
      reason: 'Taking time off',
      status: i % 3 === 0 ? 'approved' : i % 3 === 1 ? 'pending' : 'rejected',
      approverId: employees[0].id,
      createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }

  return requests;
}

/**
 * Generate mock payroll records
 */
export function generateMockPayroll(
  tenantId: TenantId,
  employees: Employee[],
  months: number = 6
): Payroll[] {
  const records: Payroll[] = [];
  const now = new Date();

  for (let m = 0; m < months; m++) {
    for (const employee of employees) {
      const year = now.getFullYear();
      const month = (now.getMonth() - m + 12) % 12;
      const period = `${year}-${String(month + 1).padStart(2, '0')}`;

      const baseSalary = employee.salary || 60000;
      const allowances = baseSalary * 0.2;
      const deductions = baseSalary * 0.15;

      records.push({
        id: `payroll-${employee.id}-${period}`,
        tenantId,
        employeeId: employee.id,
        period,
        baseSalary,
        allowances,
        deductions,
        netSalary: baseSalary + allowances - deductions,
        status: m === 0 ? 'draft' : 'paid',
        paidDate: m === 0 ? undefined : new Date(year, month + 1, 5),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  return records;
}

/**
 * Generate mock candidates
 */
export function generateMockCandidates(
  tenantId: TenantId,
  count: number = 5
): Candidate[] {
  const candidates: Candidate[] = [];
  const positions = ['Senior Engineer', 'Product Manager', 'Designer', 'Sales Executive', 'Data Analyst'];
  const statuses: Candidate['status'][] = ['screening', 'interviewed', 'selected', 'rejected'];

  for (let i = 0; i < count; i++) {
    candidates.push({
      id: `cand-${tenantId}-${i}`,
      tenantId,
      name: `Candidate ${i + 1}`,
      email: `candidate${i + 1}@email.com`,
      phone: `+1-555-${String(i).padStart(4, '0')}`,
      position: positions[i % positions.length],
      status: statuses[Math.floor(Math.random() * statuses.length)],
      resumeUrl: `https://example.com/resume-${i}.pdf`,
      resumeAnalysis: {
        score: Math.floor(Math.random() * 100),
        summary: 'Strong candidate with relevant experience',
        skills: ['JavaScript', 'Python', 'React', 'Node.js']
      },
      createdAt: new Date(Date.now() - Math.random() * 60 * 24 * 60 * 60 * 1000),
      updatedAt: new Date()
    });
  }

  return candidates;
}

/**
 * Generate mock holidays
 */
export function generateMockHolidays(tenantId: TenantId): Holiday[] {
  const holidays: Holiday[] = [
    { id: 'hol-1', tenantId, name: 'New Year', date: new Date(2024, 0, 1), type: 'national', createdAt: new Date() },
    { id: 'hol-2', tenantId, name: 'Independence Day', date: new Date(2024, 6, 4), type: 'national', createdAt: new Date() },
    { id: 'hol-3', tenantId, name: 'Thanksgiving', date: new Date(2024, 10, 28), type: 'national', createdAt: new Date() },
    { id: 'hol-4', tenantId, name: 'Christmas', date: new Date(2024, 11, 25), type: 'national', createdAt: new Date() },
    { id: 'hol-5', tenantId, name: 'Company Founding Day', date: new Date(2024, 5, 15), type: 'company', createdAt: new Date() }
  ];

  return holidays;
}

/**
 * Generate mock leave policies
 */
export function generateMockLeavePolicies(tenantId: TenantId) {
  const policies: LeavePolicy[] = [
    {
      id: 'policy-1',
      tenantId,
      leaveType: 'sick',
      allowedDays: 10,
      carryForwardDays: 5,
      requiresApproval: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'policy-2',
      tenantId,
      leaveType: 'casual',
      allowedDays: 8,
      carryForwardDays: 3,
      requiresApproval: true,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'policy-3',
      tenantId,
      leaveType: 'personal',
      allowedDays: 5,
      carryForwardDays: 0,
      requiresApproval: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  return policies;
}

/**
 * Generate mock org structure
 */
export function generateMockOrgStructure(
  tenantId: TenantId,
  employees: Employee[]
): OrgNode[] {
  const nodes: OrgNode[] = [];
  const departments = new Set(employees.map((e) => e.department));

  let nodeId = 1;
  for (const dept of departments) {
    const deptEmployees = employees.filter((e) => e.department === dept);
    const managerId = deptEmployees[0]?.id;

    nodes.push({
      id: `org-${nodeId++}`,
      tenantId,
      name: dept,
      type: 'department',
      managerId,
      employees: deptEmployees.map((e) => e.id),
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  return nodes;
}
