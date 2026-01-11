// Demo data for AI features

export type ResumeAnalysis = {
  candidateName: string;
  score: number;
  strengths: string[];
  gaps: string[];
  recommendation: 'strong-hire' | 'hire' | 'maybe' | 'pass';
  summary: string;
};

export type CallScreening = {
  candidateName: string;
  position: string;
  date: string;
  duration: number; // minutes
  transcript: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  keyPoints: string[];
  recommendation: string;
};

export type PayrollVerification = {
  recordId: string;
  employeeName: string;
  issues: { severity: 'error' | 'warning' | 'info'; message: string }[];
  status: 'verified' | 'needs-review' | 'error';
  confidence: number;
};

export function generateResumeAnalysis(fileName: string): ResumeAnalysis {
  const analyses: ResumeAnalysis[] = [
    {
      candidateName: 'Sarah Mitchell',
      score: 92,
      strengths: [
        'Strong technical background in React and TypeScript',
        '5+ years of frontend development experience',
        'Leadership experience managing small teams',
        'Contributed to open source projects'
      ],
      gaps: [
        'Limited backend experience',
        'No experience with cloud platforms'
      ],
      recommendation: 'strong-hire',
      summary: 'Excellent frontend candidate with strong technical skills and team leadership experience. Would be a great fit for senior frontend role.'
    },
    {
      candidateName: 'Michael Chen',
      score: 78,
      strengths: [
        'Full-stack development experience',
        'Experience with Node.js and Python',
        'Good problem-solving skills'
      ],
      gaps: [
        'Limited experience with modern frameworks',
        'No CI/CD experience mentioned',
        'Short tenure at previous companies'
      ],
      recommendation: 'maybe',
      summary: 'Solid technical foundation but may need mentoring on modern practices and frameworks. Consider for mid-level positions.'
    }
  ];
  
  return analyses[Math.floor(Math.random() * analyses.length)];
}

export function generateCallScreening(candidateName: string): CallScreening {
  return {
    candidateName,
    position: 'Software Engineer',
    date: new Date().toISOString().split('T')[0],
    duration: 25,
    transcript: `Interviewer: Can you tell me about your experience with React?\n${candidateName}: I have been working with React for the past 3 years. I've built several production applications and I'm comfortable with hooks, context, and state management.\n\nInterviewer: What's your experience with testing?\n${candidateName}: I write unit tests using Jest and React Testing Library. I believe in test-driven development for critical components.`,
    sentiment: 'positive',
    keyPoints: [
      'Strong React experience (3 years)',
      'Familiar with modern testing practices',
      'Good communication skills',
      'Interested in the role and company mission'
    ],
    recommendation: 'Proceed to technical round. Candidate shows strong fundamentals and communication.'
  };
}

export function generatePayrollVerification(recordId: string, employeeName: string): PayrollVerification {
  const scenarios: PayrollVerification[] = [
    {
      recordId,
      employeeName,
      issues: [],
      status: 'verified',
      confidence: 98
    },
    {
      recordId,
      employeeName,
      issues: [
        { severity: 'warning', message: 'Overtime hours exceed typical monthly average by 15%' },
        { severity: 'info', message: 'Bonus amount is higher than previous month' }
      ],
      status: 'needs-review',
      confidence: 85
    },
    {
      recordId,
      employeeName,
      issues: [
        { severity: 'error', message: 'Tax deduction calculation mismatch detected' },
        { severity: 'warning', message: 'Missing timesheet approval for 2 days' }
      ],
      status: 'error',
      confidence: 62
    }
  ];
  
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}
