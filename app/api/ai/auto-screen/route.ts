/**
 * Auto-Screening API Endpoint
 * Performs AI-powered candidate screening based on call transcript
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/modules/ai/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { candidateName, candidateEmail, callTranscript } = body;

    if (!candidateName || !candidateEmail || !callTranscript) {
      return NextResponse.json(
        { error: 'candidateName, candidateEmail, and callTranscript are required' },
        { status: 400 }
      );
    }

    // Call AI service to perform screening
    const result = await aiService.autoScreenCandidate({
      candidateName,
      candidateEmail,
      callTranscript
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Auto-screening error:', error);
    return NextResponse.json(
      { error: 'Failed to perform auto-screening' },
      { status: 500 }
    );
  }
}
