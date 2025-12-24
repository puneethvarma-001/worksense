/**
 * Resume Analysis API Endpoint
 * Analyzes resume content and extracts structured information
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/modules/ai/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, position } = body;

    if (!resumeText || typeof resumeText !== 'string') {
      return NextResponse.json(
        { error: 'resumeText is required' },
        { status: 400 }
      );
    }

    // Call AI service to analyze resume
    const result = await aiService.analyzeResume({
      resumeText,
      position
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Resume analysis error:', error);
    return NextResponse.json(
      { error: 'Failed to analyze resume' },
      { status: 500 }
    );
  }
}
