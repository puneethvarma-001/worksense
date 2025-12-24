/**
 * Payroll Verification API Endpoint
 * Verifies payroll data for anomalies and risks
 */

import { NextRequest, NextResponse } from 'next/server';
import { aiService } from '@/modules/ai/service';
import { getTenantIdFromContext } from '@/services/tenant/guard';
import { extractTenantContextFromHeaders } from '@/middleware/tenant-middleware';

export async function POST(request: NextRequest) {
  try {
    const headers = request.headers;
    const context = extractTenantContextFromHeaders(headers);

    if (!context) {
      return NextResponse.json(
        { error: 'Tenant context required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { employeeId, period, baseSalary, allowances, deductions } = body;

    if (!employeeId || !period || !baseSalary || allowances === undefined || deductions === undefined) {
      return NextResponse.json(
        { error: 'employeeId, period, baseSalary, allowances, and deductions are required' },
        { status: 400 }
      );
    }

    // Call AI service to verify payroll
    const result = await aiService.verifyPayroll(context.tenant.id, {
      employeeId,
      period,
      baseSalary,
      allowances,
      deductions
    });

    return NextResponse.json({
      success: true,
      data: result
    });
  } catch (error) {
    console.error('Payroll verification error:', error);
    return NextResponse.json(
      { error: 'Failed to verify payroll' },
      { status: 500 }
    );
  }
}
