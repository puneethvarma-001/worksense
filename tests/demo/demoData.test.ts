import assert from 'assert';
import { getPayrollRecords } from '../../lib/demo/payroll';
import { getLeaveRequests } from '../../lib/demo/leave';
import { getAttendanceRecords } from '../../lib/demo/attendance';
import { getOnboardingRecords, getExitRecords } from '../../lib/demo/onboarding';
import { getDepartments, getEmployees } from '../../lib/demo/org';
import { getPolicies, getHolidays } from '../../lib/demo/policies';

(async () => {
  // Test payroll data
  const payroll = getPayrollRecords();
  assert.ok(Array.isArray(payroll), 'Payroll records should be an array');
  assert.ok(payroll.length > 0, 'Should have payroll records');
  payroll.forEach(record => {
    assert.ok(record.id, 'Payroll record should have id');
    assert.ok(record.employeeName, 'Payroll record should have employeeName');
    assert.ok(typeof record.netPay === 'number', 'Net pay should be a number');
    assert.ok(['pending', 'verified', 'paid'].includes(record.status), 'Status should be valid');
  });

  // Test leave data
  const leaves = getLeaveRequests();
  assert.ok(Array.isArray(leaves), 'Leave requests should be an array');
  assert.ok(leaves.length > 0, 'Should have leave requests');
  leaves.forEach(leave => {
    assert.ok(leave.id, 'Leave request should have id');
    assert.ok(leave.employeeName, 'Leave request should have employeeName');
    assert.ok(typeof leave.days === 'number', 'Days should be a number');
    assert.ok(['pending', 'approved', 'rejected'].includes(leave.status), 'Status should be valid');
  });

  // Test attendance data
  const attendance = getAttendanceRecords();
  assert.ok(Array.isArray(attendance), 'Attendance records should be an array');
  assert.ok(attendance.length > 0, 'Should have attendance records');
  attendance.forEach(record => {
    assert.ok(record.id, 'Attendance record should have id');
    assert.ok(record.employeeName, 'Attendance record should have employeeName');
    assert.ok(typeof record.hoursWorked === 'number', 'Hours worked should be a number');
  });

  // Test onboarding data
  const onboarding = getOnboardingRecords();
  assert.ok(Array.isArray(onboarding), 'Onboarding records should be an array');
  assert.ok(onboarding.length > 0, 'Should have onboarding records');
  onboarding.forEach(record => {
    assert.ok(record.id, 'Onboarding record should have id');
    assert.ok(record.employeeName, 'Onboarding record should have employeeName');
    assert.ok(record.tasksCompleted <= record.totalTasks, 'Tasks completed should not exceed total');
  });

  // Test exit data
  const exits = getExitRecords();
  assert.ok(Array.isArray(exits), 'Exit records should be an array');
  assert.ok(exits.length > 0, 'Should have exit records');
  exits.forEach(record => {
    assert.ok(record.id, 'Exit record should have id');
    assert.ok(record.employeeName, 'Exit record should have employeeName');
    assert.ok(Array.isArray(record.clearanceSteps), 'Clearance steps should be an array');
  });

  // Test org data
  const departments = getDepartments();
  assert.ok(Array.isArray(departments), 'Departments should be an array');
  assert.ok(departments.length > 0, 'Should have departments');
  
  const employees = getEmployees();
  assert.ok(Array.isArray(employees), 'Employees should be an array');
  assert.ok(employees.length > 0, 'Should have employees');

  // Test policies data
  const policies = getPolicies();
  assert.ok(Array.isArray(policies), 'Policies should be an array');
  assert.ok(policies.length > 0, 'Should have policies');
  policies.forEach(policy => {
    assert.ok(policy.id, 'Policy should have id');
    assert.ok(policy.title, 'Policy should have title');
    assert.ok(policy.category, 'Policy should have category');
  });

  // Test holidays data
  const holidays = getHolidays();
  assert.ok(Array.isArray(holidays), 'Holidays should be an array');
  assert.ok(holidays.length > 0, 'Should have holidays');
  holidays.forEach(holiday => {
    assert.ok(holiday.id, 'Holiday should have id');
    assert.ok(holiday.name, 'Holiday should have name');
    assert.ok(['public', 'optional', 'floating'].includes(holiday.type), 'Holiday type should be valid');
  });

  console.log('✓ Demo data validation tests passed');
})();
