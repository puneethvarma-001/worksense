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
    employeeName: 'Puneeth Varma',
    leaveType: 'Casual Leave',
    startDate: '2026-01-15',
    endDate: '2026-01-17',
    days: 3,
    reason: 'Family function',
    status: 'pending',
    appliedOn: '2026-01-10'
  },
  {
    id: 'LV-002',
    employeeId: 'EMP-002',
    employeeName: 'Sai Kumar',
    leaveType: 'Sick Leave',
    startDate: '2026-01-20',
    endDate: '2026-01-21',
    days: 2,
    reason: 'Medical checkup',
    status: 'approved',
    appliedOn: '2026-01-18'
  },
  {
    id: 'LV-003',
    employeeId: 'EMP-003',
    employeeName: 'Priya Sharma',
    leaveType: 'Earned Leave',
    startDate: '2026-03-08',
    endDate: '2026-03-12',
    days: 5,
    reason: 'Vacation to Goa',
    status: 'approved',
    appliedOn: '2026-02-20'
  },
  {
    id: 'LV-004',
    employeeId: 'EMP-004',
    employeeName: 'Anjali Reddy',
    leaveType: 'Casual Leave',
    startDate: '2026-01-25',
    endDate: '2026-01-26',
    days: 2,
    reason: 'Personal work',
    status: 'pending',
    appliedOn: '2026-01-22'
  },
  {
    id: 'LV-005',
    employeeId: 'EMP-005',
    employeeName: 'Karthik Nair',
    leaveType: 'Compensatory Off',
    startDate: '2026-02-03',
    endDate: '2026-02-03',
    days: 1,
    reason: 'Comp off for weekend work',
    status: 'approved',
    appliedOn: '2026-02-01'
  },
  {
    id: 'LV-006',
    employeeId: 'EMP-006',
    employeeName: 'Deepika Iyer',
    leaveType: 'Sick Leave',
    startDate: '2026-01-28',
    endDate: '2026-01-30',
    days: 3,
    reason: 'Fever and cold',
    status: 'pending',
    appliedOn: '2026-01-27'
  },
  {
    id: 'LV-007',
    employeeId: 'EMP-007',
    employeeName: 'Rahul Patel',
    leaveType: 'Earned Leave',
    startDate: '2026-04-10',
    endDate: '2026-04-15',
    days: 6,
    reason: 'Family trip to Kerala',
    status: 'approved',
    appliedOn: '2026-03-25'
  }
];

export function getLeaveRequests(): LeaveRequest[] {
  return demoLeaveRequests;
}

export function getLeaveById(id: string): LeaveRequest | undefined {
  return demoLeaveRequests.find(l => l.id === id);
}
