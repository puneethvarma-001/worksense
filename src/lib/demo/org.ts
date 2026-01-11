// Demo data for Organization structure

export type Department = {
  id: string;
  name: string;
  headId: string;
  headName: string;
  employeeCount: number;
};

export type Employee = {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  managerId?: string;
  joinDate: string;
  status: 'active' | 'on-leave' | 'inactive';
};

export const demoDepartments: Department[] = [
  {
    id: 'DEPT-001',
    name: 'Engineering',
    headId: 'EMP-001',
    headName: 'Alice Johnson',
    employeeCount: 25
  },
  {
    id: 'DEPT-002',
    name: 'Marketing',
    headId: 'EMP-002',
    headName: 'Bob Smith',
    employeeCount: 12
  },
  {
    id: 'DEPT-003',
    name: 'Sales',
    headId: 'EMP-003',
    headName: 'Carol Williams',
    employeeCount: 18
  },
  {
    id: 'DEPT-004',
    name: 'HR',
    headId: 'EMP-004',
    headName: 'David Brown',
    employeeCount: 8
  }
];

export const demoEmployees: Employee[] = [
  {
    id: 'EMP-001',
    name: 'Alice Johnson',
    email: 'alice@company.com',
    department: 'Engineering',
    position: 'VP Engineering',
    joinDate: '2020-01-15',
    status: 'active'
  },
  {
    id: 'EMP-002',
    name: 'Bob Smith',
    email: 'bob@company.com',
    department: 'Marketing',
    position: 'Marketing Director',
    joinDate: '2019-06-20',
    status: 'active'
  },
  {
    id: 'EMP-003',
    name: 'Carol Williams',
    email: 'carol@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    joinDate: '2021-03-10',
    status: 'active'
  },
  {
    id: 'EMP-004',
    name: 'David Brown',
    email: 'david@company.com',
    department: 'HR',
    position: 'HR Manager',
    joinDate: '2018-11-05',
    status: 'active'
  },
  {
    id: 'EMP-005',
    name: 'Emma Davis',
    email: 'emma@company.com',
    department: 'Engineering',
    position: 'Software Engineer',
    managerId: 'EMP-001',
    joinDate: '2026-01-06',
    status: 'active'
  }
];

export function getDepartments(): Department[] {
  return demoDepartments;
}

export function getEmployees(): Employee[] {
  return demoEmployees;
}

export function getEmployeeById(id: string): Employee | undefined {
  return demoEmployees.find(e => e.id === id);
}
