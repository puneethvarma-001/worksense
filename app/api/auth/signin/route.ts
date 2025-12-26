import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { protocol, rootDomain } from '@/lib/utils';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { subdomain, email } = body;
  if (!subdomain || !email) return NextResponse.json({ success: false, error: 'missing' }, { status: 400 });

  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const tenant = await redis.get(`tenant:${sanitized}`);
  if (!tenant) return NextResponse.json({ success: false, error: 'tenant not found' }, { status: 404 });

  // For demo: set a simple session cookie with base64 JSON payload (not secure)
  const payload = Buffer.from(JSON.stringify({ email, subdomain: sanitized, role: 'Employee' })).toString('base64');
  // Return full subdomain URL so client navigates to the proper host (matches admin behavior)
  const dashboardUrl = `${protocol}://${sanitized}.${rootDomain}`;
  const res = NextResponse.json({ success: true, dashboardUrl });
  res.headers.set('Set-Cookie', `demo_session=${payload}; Path=/; HttpOnly; SameSite=Lax`);
  return res;
}
