/**
 * AI Features Status Endpoint
 * Returns available AI features and their status
 */

import { NextResponse } from 'next/server';
import { aiService } from '@/modules/ai/service';

export async function GET() {
  try {
    const features = aiService.getAvailableFeatures();

    return NextResponse.json({
      success: true,
      data: features
    });
  } catch (error) {
    console.error('Failed to get AI features:', error);
    return NextResponse.json(
      { error: 'Failed to get AI features' },
      { status: 500 }
    );
  }
}
