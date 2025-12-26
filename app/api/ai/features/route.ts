import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ features: ['resume-analyze', 'auto-screen', 'verify-payroll'] });
}
