// Demo data for Leave module

export type LeaveRequest = {
  id: string;
  employeeId: string;
  employeeName: string;
  leaveType: string;
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedOn: string;
};

export const demoLeaveRequests: LeaveRequest[] = [
  {
    id: 'LV-001',
    employeeId: 'EMP-001',
    employeeName: 'Alice Johnson',
    leaveType: 'Annual Leave',
    startDate: '2025-12-20',
    endDate: '2025-12-24',
    days: 5,
    reason: 'Holiday vacation',
    status: 'approved',
    appliedOn: '2025-12-01'
  },
  {
    id: 'LV-002',
    employeeId: 'EMP-002',
    employeeName: 'Bob Smith',
    leaveType: 'Sick Leave',
    startDate: '2025-11-15',
    endDate: '2025-11-17',
    days: 3,
    reason: 'Medical appointment',
    status: 'pending',
    appliedOn: '2025-11-14'
  },
  {
    id: 'LV-003',
    employeeId: 'EMP-003',
    employeeName: 'Carol Williams',
    leaveType: 'Personal Leave',
    startDate: '2025-12-28',
    endDate: '2025-12-30',
    days: 3,
    reason: 'Family event',
    status: 'approved',
    appliedOn: '2025-12-10'
  },
  {
    id: 'LV-004',
    employeeId: 'EMP-004',
    employeeName: 'David Brown',
    leaveType: 'Annual Leave',
    startDate: '2026-01-05',
    endDate: '2026-01-12',
    days: 8,
    reason: 'New year break',
    status: 'pending',
    appliedOn: '2025-12-15'
  }
];

export function getLeaveRequests(): LeaveRequest[] {
  return demoLeaveRequests;
}

export function getLeaveById(id: string): LeaveRequest | undefined {
  return demoLeaveRequests.find(l => l.id === id);
}
