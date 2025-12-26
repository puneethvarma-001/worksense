import assert from 'assert';
import { parseDemoRole } from '../../lib/tenantContext';

(async () => {
  // Test valid role parsing
  const validPayload = Buffer.from(JSON.stringify({ email: 'test@test.com', subdomain: 'acme', role: 'HR' })).toString('base64');
  const parsedRole = parseDemoRole(validPayload);
  assert.strictEqual(parsedRole, 'HR', 'Should parse HR role correctly');

  // Test Employee role
  const empPayload = Buffer.from(JSON.stringify({ email: 'emp@test.com', subdomain: 'demo', role: 'Employee' })).toString('base64');
  assert.strictEqual(parseDemoRole(empPayload), 'Employee', 'Should parse Employee role');

  // Test AMP role
  const ampPayload = Buffer.from(JSON.stringify({ email: 'admin@test.com', subdomain: 'demo', role: 'AMP' })).toString('base64');
  assert.strictEqual(parseDemoRole(ampPayload), 'AMP', 'Should parse AMP role');

  // Test Manager role
  const mgrPayload = Buffer.from(JSON.stringify({ email: 'mgr@test.com', subdomain: 'demo', role: 'Manager' })).toString('base64');
  assert.strictEqual(parseDemoRole(mgrPayload), 'Manager', 'Should parse Manager role');

  // Test TA role
  const taPayload = Buffer.from(JSON.stringify({ email: 'ta@test.com', subdomain: 'demo', role: 'TA' })).toString('base64');
  assert.strictEqual(parseDemoRole(taPayload), 'TA', 'Should parse TA role');

  // Test invalid/missing role defaults to undefined
  const noRolePayload = Buffer.from(JSON.stringify({ email: 'test@test.com', subdomain: 'acme' })).toString('base64');
  assert.strictEqual(parseDemoRole(noRolePayload), undefined, 'Should return undefined for missing role');

  // Test null/undefined inputs
  assert.strictEqual(parseDemoRole(null), undefined, 'Should handle null input');
  assert.strictEqual(parseDemoRole(undefined), undefined, 'Should handle undefined input');
  assert.strictEqual(parseDemoRole(''), undefined, 'Should handle empty string');

  // Test malformed payload
  assert.strictEqual(parseDemoRole('invalid-base64-!@#$'), undefined, 'Should handle invalid base64');

  console.log('✓ Signin role selection tests passed');
})();
