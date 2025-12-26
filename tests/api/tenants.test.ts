import assert from 'assert';
import { redis } from '../../lib/redis';

// Note: These tests are lightweight and expect a local Redis (Upstash) credentials to be set in env during CI.
async function run() {
  const sub = `testorg${Date.now() % 10000}`;
  const res = await fetch('http://localhost:3000/api/tenants/create', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ subdomain: sub, name: 'Test Org', emoji: '🏢' })
  });
  const json = await res.json();
  assert.strictEqual(json.success, true);

  // Verify in Redis
  const data = await redis.get(`tenant:${sub}`);
  assert.ok(data);

  console.log('tenants API test passed');
}

run().catch((err) => {
  console.error('tenants test failed', err);
  process.exit(1);
});