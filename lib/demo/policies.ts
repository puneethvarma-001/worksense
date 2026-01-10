// Demo data for Policies & Holidays

export type Policy = {
  id: string;
  title: string;
  category: string;
  description: string;
  effectiveDate: string;
  lastUpdated: string;
  content: string;
};

export type Holiday = {
  id: string;
  name: string;
  date: string;
  type: 'national' | 'regional' | 'optional';
  description: string;
};

export const demoPolicies: Policy[] = [
  {
    id: 'POL-001',
    title: 'Leave & Attendance Policy',
    category: 'Time Off',
    description: 'Leave entitlements and attendance guidelines as per Indian labour laws',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    content: 'Employees are entitled to Casual Leave (CL), Earned Leave (EL), Sick Leave (SL), and Compensatory Off (Comp Off) as per company policy. Casual Leave: 12 days per year. Earned Leave: 15 days per year (encashable). Sick Leave: 12 days per year. Loss of Pay (LOP) applies when leave balance is exhausted. All leave requests must be submitted through the HRMS portal with manager approval.'
  },
  {
    id: 'POL-002',
    title: 'Work From Home Policy',
    category: 'Work Arrangements',
    description: 'Guidelines for remote work and hybrid arrangements',
    effectiveDate: '2025-06-01',
    lastUpdated: '2026-01-01',
    content: 'Employees may work from home up to 2 days per week with manager approval. Full remote work requires VP approval. Employees must be available during core hours (10 AM - 4 PM IST) and maintain productivity standards. Regular team meetings must be attended. VPN and security protocols must be followed at all times.'
  },
  {
    id: 'POL-003',
    title: 'Code of Conduct',
    category: 'Ethics',
    description: 'Expected behavior, professional standards, and workplace ethics',
    effectiveDate: '2024-01-01',
    lastUpdated: '2025-06-10',
    content: 'All employees must maintain professional conduct, respect diversity and inclusion, avoid conflicts of interest, and uphold company values. Harassment of any kind is strictly prohibited. Employees must protect confidential information and comply with all applicable laws and regulations. Violations may result in disciplinary action including termination.'
  },
  {
    id: 'POL-004',
    title: 'IT & Security Policy',
    category: 'Security',
    description: 'Information security, data protection, and IT asset usage guidelines',
    effectiveDate: '2025-03-01',
    lastUpdated: '2025-11-01',
    content: 'All company data must be protected according to information security standards. Employees must use strong passwords, enable MFA, and report security incidents immediately. Company devices and software licenses must not be shared. Personal use of company IT resources should be minimal. Data breaches must be reported within 24 hours. Regular security training is mandatory.'
  },
  {
    id: 'POL-005',
    title: 'Anti-Harassment Policy',
    category: 'Workplace Safety',
    description: 'Prevention of Sexual Harassment (POSH) and workplace harassment guidelines',
    effectiveDate: '2024-01-01',
    lastUpdated: '2025-08-15',
    content: 'The company is committed to providing a harassment-free workplace. An Internal Complaints Committee (ICC) is constituted as per POSH Act. Any incidents of sexual harassment, bullying, or discrimination should be reported to the ICC or HR. All complaints will be handled confidentially and fairly. Retaliation against complainants is strictly prohibited.'
  }
];

export const demoHolidays: Holiday[] = [
  {
    id: 'HOL-001',
    name: 'Republic Day',
    date: '2026-01-26',
    type: 'national',
    description: 'Celebrates the adoption of the Constitution of India'
  },
  {
    id: 'HOL-002',
    name: 'Holi',
    date: '2026-03-10',
    type: 'regional',
    description: 'Festival of Colors'
  },
  {
    id: 'HOL-003',
    name: 'Ugadi',
    date: '2026-03-29',
    type: 'regional',
    description: 'Telugu and Kannada New Year'
  },
  {
    id: 'HOL-004',
    name: 'Good Friday',
    date: '2026-04-03',
    type: 'optional',
    description: 'Christian observance'
  },
  {
    id: 'HOL-005',
    name: 'Independence Day',
    date: '2026-08-15',
    type: 'national',
    description: 'Celebrates Indian independence from British rule'
  },
  {
    id: 'HOL-006',
    name: 'Ganesh Chaturthi',
    date: '2026-09-07',
    type: 'regional',
    description: 'Festival celebrating Lord Ganesha'
  },
  {
    id: 'HOL-007',
    name: 'Gandhi Jayanti',
    date: '2026-10-02',
    type: 'national',
    description: 'Birthday of Mahatma Gandhi'
  },
  {
    id: 'HOL-008',
    name: 'Dussehra',
    date: '2026-10-12',
    type: 'regional',
    description: 'Victory of good over evil'
  },
  {
    id: 'HOL-009',
    name: 'Diwali',
    date: '2026-10-31',
    type: 'regional',
    description: 'Festival of Lights'
  },
  {
    id: 'HOL-010',
    name: 'Christmas',
    date: '2026-12-25',
    type: 'optional',
    description: 'Christian celebration of birth of Jesus Christ'
  }
];

export function getPolicies(): Policy[] {
  return demoPolicies;
}

export function getHolidays(): Holiday[] {
  return demoHolidays;
}

export function getPolicyById(id: string): Policy | undefined {
  return demoPolicies.find(p => p.id === id);
}
