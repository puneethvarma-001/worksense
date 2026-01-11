// Demo data for Policies & Holidays

export type Policy = {
  id: string;
  title: string;
  category: string;
  description: string;
  version: string;
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
  states?: string[];
};

export const demoPolicies: Policy[] = [
  {
    id: 'POL-001',
    title: 'Leave Policy',
    category: 'Leave Policy',
    description: 'Leave entitlements and approval workflow (India)',
    version: 'v2026.1',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    content: [
      '## Leave Types',
      '- Earned Leave (EL)',
      '- Casual Leave (CL)',
      '- Sick Leave (SL)',
      '- Comp Off (CO)',
      '- Maternity Leave (ML)',
      '',
      '## Applying Leave',
      '1) Submit request with dates and notes.',
      '2) Manager (L1) reviews and approves/rejects/requests change.',
      '3) HR (L2) final approval for policy-sensitive cases.',
      '',
      '## Attendance & Sandwich',
      'Weekends/holidays may be counted based on business policy and absence adjacency (sandwich rule).',
    ].join('\n')
  },
  {
    id: 'POL-002',
    title: 'Work Policy',
    category: 'Work Policy',
    description: 'Core hours, WFH/hybrid guidelines, and conduct expectations',
    version: 'v2026.1',
    effectiveDate: '2025-06-01',
    lastUpdated: '2026-01-01',
    content: [
      '## Core Hours',
      'Employees should be available during core hours: 10:00–16:00 IST.',
      '',
      '## Work From Home / Hybrid',
      '- Up to 2 WFH days/week with manager approval.',
      '- Full remote requires leadership approval.',
      '- Follow security guidelines (MFA, VPN, device compliance).',
    ].join('\n')
  },
  {
    id: 'POL-003',
    title: 'Sick Leave Rules',
    category: 'Sick Leave Rules',
    description: 'SL eligibility, medical certificate guidance, and escalation',
    version: 'v2026.1',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    content: [
      '## Sick Leave (SL)',
      '- SL can be applied for illness/injury and medical appointments.',
      '- SL beyond 2 consecutive days may require a medical certificate.',
      '',
      '## Manager Guidance',
      'If pattern misuse is suspected, managers may request supporting information and involve HR (L2).',
    ].join('\n')
  },
  {
    id: 'POL-004',
    title: 'Leave Encashment',
    category: 'Encashment',
    description: 'EL encashment rules and payroll cutoff windows',
    version: 'v2026.1',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    content: [
      '## Encashment (EL)',
      '- Earned Leave may be encashed as per payroll policy and statutory limits.',
      '- Encashment requests must be submitted before the monthly payroll cutoff.',
      '',
      '## Approval',
      'Encashment requires L1 + HR confirmation (L2) for compliance checks.',
    ].join('\n')
  },
  {
    id: 'POL-005',
    title: 'Carry-forward Policy',
    category: 'Carry-forward',
    description: 'Carry-forward caps, lapses, and year-end processing',
    version: 'v2026.1',
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-01-01',
    content: [
      '## Carry-forward',
      '- Earned Leave may be carried forward up to the configured cap.',
      '- Casual Leave typically does not carry forward and may lapse year-end.',
      '',
      '## Year-end Processing',
      'HR runs the carry-forward process after payroll close for March/April depending on FY calendar.',
    ].join('\n')
  }
];

export const demoHolidays: Holiday[] = [
  {
    id: 'HOL-001',
    name: 'Republic Day',
    date: '2026-01-26',
    type: 'national',
    description: 'Celebrates the adoption of the Constitution of India',
    states: ['All']
  },
  {
    id: 'HOL-002',
    name: 'Holi',
    date: '2026-03-10',
    type: 'regional',
    description: 'Festival of Colors',
    states: ['All']
  },
  {
    id: 'HOL-003',
    name: 'Ugadi',
    date: '2026-03-29',
    type: 'regional',
    description: 'Telugu and Kannada New Year',
    states: ['Karnataka', 'Telangana', 'Andhra Pradesh']
  },
  {
    id: 'HOL-004',
    name: 'Good Friday',
    date: '2026-04-03',
    type: 'optional',
    description: 'Christian observance',
    states: ['All']
  },
  {
    id: 'HOL-004B',
    name: 'Eid al-Fitr',
    date: '2026-03-20',
    type: 'optional',
    description: 'Festival marking the end of Ramadan',
    states: ['All']
  },
  {
    id: 'HOL-005',
    name: 'Independence Day',
    date: '2026-08-15',
    type: 'national',
    description: 'Celebrates Indian independence from British rule',
    states: ['All']
  },
  {
    id: 'HOL-006',
    name: 'Ganesh Chaturthi',
    date: '2026-09-07',
    type: 'regional',
    description: 'Festival celebrating Lord Ganesha',
    states: ['Karnataka', 'Maharashtra', 'Telangana', 'Andhra Pradesh', 'Goa', 'Tamil Nadu']
  },
  {
    id: 'HOL-007',
    name: 'Gandhi Jayanti',
    date: '2026-10-02',
    type: 'national',
    description: 'Birthday of Mahatma Gandhi',
    states: ['All']
  },
  {
    id: 'HOL-008',
    name: 'Dussehra',
    date: '2026-10-12',
    type: 'regional',
    description: 'Victory of good over evil',
    states: ['All']
  },
  {
    id: 'HOL-009',
    name: 'Diwali',
    date: '2026-10-31',
    type: 'regional',
    description: 'Festival of Lights',
    states: ['All']
  },
  {
    id: 'HOL-010',
    name: 'Christmas',
    date: '2026-12-25',
    type: 'optional',
    description: 'Christian celebration of birth of Jesus Christ',
    states: ['All']
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
