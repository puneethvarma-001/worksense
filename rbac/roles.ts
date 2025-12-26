export enum Role {
  AMP = 'AMP',
  Manager = 'Manager',
  Employee = 'Employee',
  HR = 'HR',
  TA = 'TA'
}

export type Permission =
  | 'leave.apply'
  | 'leave.approve'
  | 'payroll.view'
  | 'payroll.verify'
  | 'employee.manage'
  | 'ai.resume_analyze'
  | 'ai.call_screening'
  | 'attendance.view'
  | 'attendance.manage'
  | 'onboarding.view'
  | 'onboarding.manage'
  | 'org.view'
  | 'org.manage'
  | 'policies.view'
  | 'policies.manage'
  | 'holidays.view'
  | 'holidays.manage';

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.AMP]: [
    'employee.manage',
    'payroll.view',
    'payroll.verify',
    'ai.resume_analyze',
    'ai.call_screening',
    'leave.approve',
    'leave.apply',
    'attendance.view',
    'attendance.manage',
    'onboarding.view',
    'onboarding.manage',
    'org.view',
    'org.manage',
    'policies.view',
    'policies.manage',
    'holidays.view',
    'holidays.manage'
  ],
  [Role.Manager]: [
    'leave.approve',
    'leave.apply',
    'employee.manage',
    'payroll.view',
    'attendance.view',
    'attendance.manage',
    'org.view',
    'policies.view',
    'holidays.view'
  ],
  [Role.Employee]: [
    'leave.apply',
    'attendance.view',
    'payroll.view',
    'org.view',
    'policies.view',
    'holidays.view'
  ],
  [Role.HR]: [
    'ai.resume_analyze',
    'ai.call_screening',
    'employee.manage',
    'payroll.view',
    'payroll.verify',
    'leave.approve',
    'leave.apply',
    'attendance.view',
    'attendance.manage',
    'onboarding.view',
    'onboarding.manage',
    'org.view',
    'org.manage',
    'policies.view',
    'policies.manage',
    'holidays.view',
    'holidays.manage'
  ],
  [Role.TA]: [
    'ai.resume_analyze',
    'ai.call_screening',
    'employee.manage',
    'onboarding.view',
    'onboarding.manage',
    'org.view',
    'policies.view',
    'holidays.view'
  ]
};
