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
  | 'employee.manage'
  | 'ai.resume_analyze';

export const rolePermissions: Record<Role, Permission[]> = {
  [Role.AMP]: [
    'employee.manage',
    'payroll.view',
    'ai.resume_analyze',
    'leave.approve'
  ],
  [Role.Manager]: ['leave.approve', 'employee.manage', 'payroll.view'],
  [Role.Employee]: ['leave.apply'],
  [Role.HR]: [
    'ai.resume_analyze',
    'employee.manage',
    'payroll.view',
    'leave.approve'
  ],
  [Role.TA]: ['ai.resume_analyze', 'employee.manage']
};
