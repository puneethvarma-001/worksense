import assert from 'assert';
import { extractSubdomain } from '../../middleware';

function makeReq(url: string, hostHeader: string) {
  return {
    url,
    headers: {
      get: (key: string) => (key === 'host' ? hostHeader : undefined)
    }
  } as any;
}

// Localhost extraction
const req1 = makeReq('http://acme.localhost:3000/', 'acme.localhost:3000');
assert.strictEqual(extractSubdomain(req1), 'acme');

// No subdomain
const req2 = makeReq('http://localhost:3000/', 'localhost:3000');
assert.strictEqual(extractSubdomain(req2), null);

// vercel preview
const req3 = makeReq('https://acme---branch.vercel.app/', 'acme---branch.vercel.app');
assert.strictEqual(extractSubdomain(req3), 'acme');

console.log('middleware tenant tests passed');
