import { NextResponse } from 'next/server';
import { generateMockResumeAnalysis } from '@/services/mockAi';

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({} as any));
  const text = body.text || '';
  const result = generateMockResumeAnalysis(text);
  return NextResponse.json(result);
}
