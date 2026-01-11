import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({} as any));
  const { role } = body;
  if (!role) return NextResponse.json({ success: false, error: 'missing role' }, { status: 400 });

  // Store only the role in the demo_session payload
  const payload = Buffer.from(JSON.stringify({ role })).toString('base64');
  const res = NextResponse.json({ success: true });
  // Set HttpOnly cookie so server-side reads always see the authoritative session value
  res.headers.set('Set-Cookie', `demo_session=${payload}; Path=/; HttpOnly; SameSite=Lax`);
  return res;
}
