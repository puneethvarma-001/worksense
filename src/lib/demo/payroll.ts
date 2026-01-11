// Demo data for Payroll module

export type PayrollRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  month: string;
  baseSalary: number;
  deductions: number;
  bonuses: number;
  netPay: number;
  status: 'pending' | 'verified' | 'paid';
};

export const demoPayrollRecords: PayrollRecord[] = [
  {
    id: 'PAY-001',
    employeeId: 'EMP-001',
    employeeName: 'Alice Johnson',
    month: '2025-12',
    baseSalary: 75000,
    deductions: 5000,
    bonuses: 3000,
    netPay: 73000,
    status: 'verified'
  },
  {
    id: 'PAY-002',
    employeeId: 'EMP-002',
    employeeName: 'Bob Smith',
    month: '2025-12',
    baseSalary: 65000,
    deductions: 4500,
    bonuses: 2000,
    netPay: 62500,
    status: 'verified'
  },
  {
    id: 'PAY-003',
    employeeId: 'EMP-003',
    employeeName: 'Carol Williams',
    month: '2025-12',
    baseSalary: 80000,
    deductions: 6000,
    bonuses: 5000,
    netPay: 79000,
    status: 'pending'
  },
  {
    id: 'PAY-004',
    employeeId: 'EMP-004',
    employeeName: 'David Brown',
    month: '2025-12',
    baseSalary: 70000,
    deductions: 5500,
    bonuses: 1500,
    netPay: 66000,
    status: 'paid'
  }
];

export function getPayrollRecords(): PayrollRecord[] {
  return demoPayrollRecords;
}

export function getPayrollById(id: string): PayrollRecord | undefined {
  return demoPayrollRecords.find(p => p.id === id);
}
