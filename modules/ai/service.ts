/**
 * AI Module Service
 * Provides mocked AI-powered features that can be easily replaced with real APIs
 * Includes Resume Analysis, Auto-Screening, and Payroll Verification
 */

import type { TenantId } from '@/lib/types';

// ────────────────────────────────────────
// RESUME ANALYSIS
// ────────────────────────────────────────

export interface ResumeAnalysisRequest {
  resumeText: string;
  position?: string;
}

export interface ResumeAnalysisResult {
  score: number; // 0-100
  summary: string;
  skills: string[];
  experience: string;
  education: string;
  strengths: string[];
  gaps: string[];
}

// ────────────────────────────────────────
// AUTO-SCREENING
// ────────────────────────────────────────

export interface AutoScreeningRequest {
  candidateName: string;
  candidateEmail: string;
  callTranscript: string;
}

export interface AutoScreeningResult {
  score: number; // 0-100
  recommendation: 'strong_yes' | 'yes' | 'maybe' | 'no' | 'strong_no';
  analysis: string;
  keywords: string[];
}

// ────────────────────────────────────────
// PAYROLL VERIFICATION
// ────────────────────────────────────────

export interface PayrollVerificationRequest {
  employeeId: string;
  period: string;
  baseSalary: number;
  allowances: number;
  deductions: number;
}

export interface PayrollVerificationResult {
  verified: boolean;
  anomalies: string[];
  riskLevel: 'low' | 'medium' | 'high';
  suggestions: string[];
}

/**
 * AI Service - Mocked implementations
 * All methods return deterministic mock data that can be replaced with real APIs
 */
export class AIService {
  /**
   * Analyze resume and extract information
   * MOCKED: Returns deterministic results based on input
   * TODO: Replace with real AI/ML API call
   */
  async analyzeResume(request: ResumeAnalysisRequest): Promise<ResumeAnalysisResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Mock implementation based on input
    const skillKeywords = ['javascript', 'python', 'react', 'nodejs', 'sql', 'docker', 'aws'];
    const foundSkills = skillKeywords.filter((skill) =>
      request.resumeText.toLowerCase().includes(skill)
    );

    const score = Math.min(100, 50 + foundSkills.length * 8 + Math.random() * 20);

    return {
      score: Math.round(score),
      summary: `${foundSkills.length} relevant skills found. Experience level appears to be ${
        request.resumeText.length > 500 ? 'senior' : 'intermediate'
      }.`,
      skills: foundSkills.length > 0 ? foundSkills : ['communication', 'problem-solving'],
      experience: request.resumeText.toLowerCase().includes('year') ? '3+ years' : '1-2 years',
      education:
        request.resumeText.toLowerCase().includes('bachelor') ||
        request.resumeText.toLowerCase().includes('degree')
          ? 'Bachelor\'s degree'
          : 'Not mentioned',
      strengths: [
        foundSkills.length > 0 ? 'Strong technical foundation' : 'Good communication skills',
        'Relevant project experience'
      ],
      gaps:
        foundSkills.length < 3
          ? ['Limited technical depth', 'Few certifications']
          : ['Leadership experience', 'Industry certifications']
    };
  }

  /**
   * Perform AI-powered auto-screening of candidates
   * MOCKED: Returns deterministic results based on input
   * TODO: Replace with real voice AI/NLP API
   */
  async autoScreenCandidate(request: AutoScreeningRequest): Promise<AutoScreeningResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const positiveKeywords = ['excellent', 'experienced', 'skilled', 'passionate', 'leader', 'innovative'];
    const negativeKeywords = ['struggle', 'weak', 'limited', 'unclear', 'uncertain'];

    const positiveMatches = positiveKeywords.filter((kw) =>
      request.callTranscript.toLowerCase().includes(kw)
    ).length;
    const negativeMatches = negativeKeywords.filter((kw) =>
      request.callTranscript.toLowerCase().includes(kw)
    ).length;

    const baseScore = 60 + positiveMatches * 10 - negativeMatches * 15;
    const score = Math.max(0, Math.min(100, baseScore + (Math.random() - 0.5) * 10));

    let recommendation: AutoScreeningResult['recommendation'] = 'maybe';
    if (score >= 85) recommendation = 'strong_yes';
    else if (score >= 70) recommendation = 'yes';
    else if (score >= 40) recommendation = 'maybe';
    else if (score >= 25) recommendation = 'no';
    else recommendation = 'strong_no';

    return {
      score: Math.round(score),
      recommendation,
      analysis: `Candidate ${request.candidateName} showed ${
        recommendation.includes('yes') ? 'promising' : 'mixed'
      } performance during screening. Communication was ${
        positiveMatches > 0 ? 'clear' : 'unclear'
      }, and technical understanding appears ${positiveMatches > 1 ? 'solid' : 'basic'}.`,
      keywords: positiveMatches > 0 ? positiveKeywords.slice(0, 3) : negativeKeywords.slice(0, 2)
    };
  }

  /**
   * Verify payroll for anomalies and risks
   * MOCKED: Rule-based anomaly detection
   * TODO: Replace with real ML-based verification API
   */
  async verifyPayroll(
    tenantId: TenantId,
    request: PayrollVerificationRequest
  ): Promise<PayrollVerificationResult> {
    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 300));

    const anomalies: string[] = [];
    let riskLevel: PayrollVerificationResult['riskLevel'] = 'low';

    // Check deductions are within range (10-25% of salary)
    const deductionPercentage = (request.deductions / request.baseSalary) * 100;
    if (deductionPercentage > 30) {
      anomalies.push('Deductions exceed recommended 30% threshold');
      riskLevel = 'high';
    } else if (deductionPercentage > 25) {
      anomalies.push('Deductions are slightly high');
      riskLevel = 'medium';
    }

    // Check allowances are within range (15-35% of salary)
    const allowancePercentage = (request.allowances / request.baseSalary) * 100;
    if (allowancePercentage > 40) {
      anomalies.push('Allowances exceed typical range');
      riskLevel = 'high';
    }

    // Check net salary is reasonable
    const netSalary = request.baseSalary + request.allowances - request.deductions;
    if (netSalary < request.baseSalary * 0.6) {
      anomalies.push('Net salary is unusually low');
      riskLevel = 'high';
    }

    // Check for round numbers (potential errors)
    if (request.baseSalary % 10000 === 0) {
      anomalies.push('Base salary is a round number (may need verification)');
      if (riskLevel === 'low') riskLevel = 'medium';
    }

    const suggestions: string[] = [];
    if (deductionPercentage > 25) {
      suggestions.push('Review deductions with HR team');
    }
    if (allowancePercentage > 35) {
      suggestions.push('Verify allowance allocations');
    }
    if (anomalies.length === 0) {
      suggestions.push('Payroll data appears normal and verified');
    }

    return {
      verified: anomalies.length === 0,
      anomalies,
      riskLevel,
      suggestions
    };
  }

  /**
   * Get all available AI features status
   */
  getAvailableFeatures() {
    return {
      resumeAnalysis: {
        name: 'Resume Analysis',
        description: 'AI-powered resume parsing and analysis',
        status: 'available'
      },
      autoScreening: {
        name: 'Auto-Screening',
        description: 'AI voice and transcript-based candidate screening',
        status: 'available'
      },
      payrollVerification: {
        name: 'Payroll Verification',
        description: 'ML-based payroll anomaly detection',
        status: 'available'
      }
    };
  }
}

export const aiService = new AIService();
