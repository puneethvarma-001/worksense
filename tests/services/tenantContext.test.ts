import assert from 'assert';
import { parseFlags, parseDemoRole } from '../../lib/tenantContext';

(async () => {
  // JSON flags
  const json = JSON.stringify({ FEATURE_A: true, FEATURE_B: false });
  const parsedJson = parseFlags(json);
  assert(parsedJson); 
  assert.strictEqual(parsedJson?.FEATURE_A, true);
  assert.strictEqual(parsedJson?.FEATURE_B, false);

  // CSV flags
  const csv = 'FEATURE_X,FEATURE_Y';
  const parsedCsv = parseFlags(csv);
  assert(parsedCsv);
  assert.strictEqual(parsedCsv?.FEATURE_X, true);
  assert.strictEqual(parsedCsv?.FEATURE_Y, true);

  // Invalid header
  const none = parseFlags(undefined);
  assert.strictEqual(none, undefined);

  // demo role decode
  const demo = Buffer.from(JSON.stringify({ role: 'Manager' })).toString('base64');
  const role = parseDemoRole(demo);
  assert.strictEqual(role, 'Manager');

  const bad = parseDemoRole('not-base64');
  assert.strictEqual(bad, undefined);

  console.log('tenantContext tests passed');
})();