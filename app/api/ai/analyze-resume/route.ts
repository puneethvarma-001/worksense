import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  // Return a mocked analyze resume response
  return NextResponse.json({ score: 85, summary: 'Mocked resume analysis', input: body });
}
