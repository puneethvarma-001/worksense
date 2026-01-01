import assert from 'assert';
import { checkPermission } from '../../rbac/checkPermission';
import { Role } from '../../rbac/roles';

(async () => {
  // Test AMP role has all permissions
  assert.strictEqual(checkPermission([Role.AMP], 'employee.manage'), true, 'AMP should have employee.manage');
  assert.strictEqual(checkPermission([Role.AMP], 'payroll.view'), true, 'AMP should have payroll.view');
  assert.strictEqual(checkPermission([Role.AMP], 'payroll.verify'), true, 'AMP should have payroll.verify');
  assert.strictEqual(checkPermission([Role.AMP], 'ai.resume_analyze'), true, 'AMP should have ai.resume_analyze');
  assert.strictEqual(checkPermission([Role.AMP], 'ai.call_screening'), true, 'AMP should have ai.call_screening');
  assert.strictEqual(checkPermission([Role.AMP], 'attendance.manage'), true, 'AMP should have attendance.manage');
  assert.strictEqual(checkPermission([Role.AMP], 'onboarding.manage'), true, 'AMP should have onboarding.manage');
  assert.strictEqual(checkPermission([Role.AMP], 'org.manage'), true, 'AMP should have org.manage');
  assert.strictEqual(checkPermission([Role.AMP], 'policies.manage'), true, 'AMP should have policies.manage');
  assert.strictEqual(checkPermission([Role.AMP], 'holidays.manage'), true, 'AMP should have holidays.manage');

  // Test Employee role has limited permissions
  assert.strictEqual(checkPermission([Role.Employee], 'leave.apply'), true, 'Employee should have leave.apply');
  assert.strictEqual(checkPermission([Role.Employee], 'attendance.view'), true, 'Employee should have attendance.view');
  assert.strictEqual(checkPermission([Role.Employee], 'payroll.view'), true, 'Employee should have payroll.view');
  assert.strictEqual(checkPermission([Role.Employee], 'leave.approve'), false, 'Employee should NOT have leave.approve');
  assert.strictEqual(checkPermission([Role.Employee], 'employee.manage'), false, 'Employee should NOT have employee.manage');
  assert.strictEqual(checkPermission([Role.Employee], 'payroll.verify'), false, 'Employee should NOT have payroll.verify');

  // Test Manager role
  assert.strictEqual(checkPermission([Role.Manager], 'leave.approve'), true, 'Manager should have leave.approve');
  assert.strictEqual(checkPermission([Role.Manager], 'employee.manage'), true, 'Manager should have employee.manage');
  assert.strictEqual(checkPermission([Role.Manager], 'attendance.manage'), true, 'Manager should have attendance.manage');
  assert.strictEqual(checkPermission([Role.Manager], 'ai.resume_analyze'), false, 'Manager should NOT have ai.resume_analyze');

  // Test HR role
  assert.strictEqual(checkPermission([Role.HR], 'ai.resume_analyze'), true, 'HR should have ai.resume_analyze');
  assert.strictEqual(checkPermission([Role.HR], 'ai.call_screening'), true, 'HR should have ai.call_screening');
  assert.strictEqual(checkPermission([Role.HR], 'payroll.verify'), true, 'HR should have payroll.verify');
  assert.strictEqual(checkPermission([Role.HR], 'onboarding.manage'), true, 'HR should have onboarding.manage');

  // Test TA role
  assert.strictEqual(checkPermission([Role.TA], 'ai.resume_analyze'), true, 'TA should have ai.resume_analyze');
  assert.strictEqual(checkPermission([Role.TA], 'ai.call_screening'), true, 'TA should have ai.call_screening');
  assert.strictEqual(checkPermission([Role.TA], 'onboarding.manage'), true, 'TA should have onboarding.manage');
  assert.strictEqual(checkPermission([Role.TA], 'payroll.view'), false, 'TA should NOT have payroll.view');
  assert.strictEqual(checkPermission([Role.TA], 'leave.approve'), false, 'TA should NOT have leave.approve');

  // Test empty/null roles
  assert.strictEqual(checkPermission([], 'leave.apply'), false, 'Empty roles should have no permissions');
  assert.strictEqual(checkPermission(null, 'leave.apply'), false, 'Null roles should have no permissions');
  assert.strictEqual(checkPermission(undefined, 'leave.apply'), false, 'Undefined roles should have no permissions');

  console.log('✓ RBAC permissions tests passed');
})();
