// Demo data for Onboarding & Exits module

export type OnboardingRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  startDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  tasksCompleted: number;
  totalTasks: number;
  assignedTo: string;
};

export type ExitRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  department: string;
  lastWorkingDay: string;
  reason: string;
  status: 'initiated' | 'clearance' | 'completed';
  clearanceSteps: { step: string; completed: boolean }[];
};

export const demoOnboardingRecords: OnboardingRecord[] = [
  {
    id: 'ONB-001',
    employeeId: 'EMP-005',
    employeeName: 'Emma Davis',
    department: 'Engineering',
    startDate: '2026-01-06',
    status: 'in-progress',
    tasksCompleted: 5,
    totalTasks: 10,
    assignedTo: 'Alice Johnson'
  },
  {
    id: 'ONB-002',
    employeeId: 'EMP-006',
    employeeName: 'Frank Miller',
    department: 'Marketing',
    startDate: '2026-01-13',
    status: 'pending',
    tasksCompleted: 0,
    totalTasks: 8,
    assignedTo: 'Bob Smith'
  },
  {
    id: 'ONB-003',
    employeeId: 'EMP-007',
    employeeName: 'Grace Lee',
    department: 'Sales',
    startDate: '2025-12-15',
    status: 'completed',
    tasksCompleted: 12,
    totalTasks: 12,
    assignedTo: 'Carol Williams'
  }
];

export const demoExitRecords: ExitRecord[] = [
  {
    id: 'EXIT-001',
    employeeId: 'EMP-008',
    employeeName: 'Henry Wilson',
    department: 'Engineering',
    lastWorkingDay: '2026-01-31',
    reason: 'Career change',
    status: 'clearance',
    clearanceSteps: [
      { step: 'Asset return', completed: true },
      { step: 'Exit interview', completed: true },
      { step: 'Final payroll', completed: false },
      { step: 'Access revocation', completed: false }
    ]
  },
  {
    id: 'EXIT-002',
    employeeId: 'EMP-009',
    employeeName: 'Iris Taylor',
    department: 'HR',
    lastWorkingDay: '2025-12-31',
    reason: 'Relocation',
    status: 'completed',
    clearanceSteps: [
      { step: 'Asset return', completed: true },
      { step: 'Exit interview', completed: true },
      { step: 'Final payroll', completed: true },
      { step: 'Access revocation', completed: true }
    ]
  }
];

export function getOnboardingRecords(): OnboardingRecord[] {
  return demoOnboardingRecords;
}

export function getExitRecords(): ExitRecord[] {
  return demoExitRecords;
}
