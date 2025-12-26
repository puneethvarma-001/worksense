// Demo data for Attendance module

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  employeeName: string;
  date: string;
  checkIn: string;
  checkOut: string;
  hoursWorked: number;
  status: 'present' | 'absent' | 'half-day' | 'wfh';
};

export const demoAttendanceRecords: AttendanceRecord[] = [
  {
    id: 'ATT-001',
    employeeId: 'EMP-001',
    employeeName: 'Alice Johnson',
    date: '2025-12-26',
    checkIn: '09:00',
    checkOut: '18:00',
    hoursWorked: 9,
    status: 'present'
  },
  {
    id: 'ATT-002',
    employeeId: 'EMP-002',
    employeeName: 'Bob Smith',
    date: '2025-12-26',
    checkIn: '09:30',
    checkOut: '17:30',
    hoursWorked: 8,
    status: 'present'
  },
  {
    id: 'ATT-003',
    employeeId: 'EMP-003',
    employeeName: 'Carol Williams',
    date: '2025-12-26',
    checkIn: '08:00',
    checkOut: '17:00',
    hoursWorked: 9,
    status: 'wfh'
  },
  {
    id: 'ATT-004',
    employeeId: 'EMP-004',
    employeeName: 'David Brown',
    date: '2025-12-26',
    checkIn: '10:00',
    checkOut: '14:00',
    hoursWorked: 4,
    status: 'half-day'
  },
  {
    id: 'ATT-005',
    employeeId: 'EMP-001',
    employeeName: 'Alice Johnson',
    date: '2025-12-25',
    checkIn: '09:15',
    checkOut: '18:15',
    hoursWorked: 9,
    status: 'present'
  }
];

export function getAttendanceRecords(): AttendanceRecord[] {
  return demoAttendanceRecords;
}

export function getAttendanceByEmployee(employeeId: string): AttendanceRecord[] {
  return demoAttendanceRecords.filter(a => a.employeeId === employeeId);
}
