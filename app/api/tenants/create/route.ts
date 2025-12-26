import { NextResponse } from 'next/server';
import { redis } from '@/lib/redis';
import { protocol, rootDomain } from '@/lib/utils';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { subdomain, name, emoji } = body;

  if (!subdomain || typeof subdomain !== 'string') {
    return NextResponse.json({ success: false, error: 'subdomain required' }, { status: 400 });
  }

  const sanitized = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, '');
  const tenantKey = `tenant:${sanitized}`;
  const subKey = `subdomain:${sanitized}`;

  // Create minimal tenant metadata and flags
  const metadata = { id: sanitized, name: name || sanitized, subdomain: sanitized, flags: { FEATURE_LEAVE: true }, createdAt: Date.now() };

  try {
    await redis.set(tenantKey, metadata);
    await redis.set(subKey, { emoji: emoji || '🏢', createdAt: Date.now() });

    // For demo: set a basic demo session cookie for the creator (AMP role)
    const sessionPayload = Buffer.from(
      JSON.stringify({ email: `owner@${sanitized}`, subdomain: sanitized, role: 'AMP' })
    ).toString('base64');

    // Return full host URL so client navigates to the subdomain root (consistent with admin redirect)
    const dashboardUrl = `${protocol}://${sanitized}.${rootDomain}`;
    const res = NextResponse.json({ success: true, tenant: metadata, dashboardUrl });
    res.headers.set('Set-Cookie', `demo_session=${sessionPayload}; Path=/; HttpOnly; SameSite=Lax`);
    return res;
  } catch (err) {
    console.warn('tenant create error', err);
    return NextResponse.json({ success: false, error: 'redis error' }, { status: 500 });
  }
}
