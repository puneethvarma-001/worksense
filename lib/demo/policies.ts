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
  type: 'public' | 'optional' | 'floating';
  description: string;
};

export const demoPolicies: Policy[] = [
  {
    id: 'POL-001',
    title: 'Remote Work Policy',
    category: 'Work Arrangements',
    description: 'Guidelines for remote work and hybrid arrangements',
    effectiveDate: '2025-01-01',
    lastUpdated: '2025-10-15',
    content: 'Employees may work remotely up to 3 days per week with manager approval...'
  },
  {
    id: 'POL-002',
    title: 'Leave Policy',
    category: 'Time Off',
    description: 'Annual leave, sick leave, and special leave entitlements',
    effectiveDate: '2025-01-01',
    lastUpdated: '2025-08-20',
    content: 'Full-time employees receive 20 days of annual leave per year...'
  },
  {
    id: 'POL-003',
    title: 'Code of Conduct',
    category: 'Ethics',
    description: 'Expected behavior and ethical standards',
    effectiveDate: '2024-01-01',
    lastUpdated: '2025-06-10',
    content: 'All employees must maintain professional conduct and respect diversity...'
  },
  {
    id: 'POL-004',
    title: 'Data Security Policy',
    category: 'Security',
    description: 'Guidelines for handling company and customer data',
    effectiveDate: '2025-03-01',
    lastUpdated: '2025-11-01',
    content: 'All sensitive data must be encrypted and access must follow least privilege...'
  }
];

export const demoHolidays: Holiday[] = [
  {
    id: 'HOL-001',
    name: 'New Year\'s Day',
    date: '2026-01-01',
    type: 'public',
    description: 'Public holiday for New Year'
  },
  {
    id: 'HOL-002',
    name: 'Independence Day',
    date: '2026-07-04',
    type: 'public',
    description: 'National Independence Day'
  },
  {
    id: 'HOL-003',
    name: 'Christmas Day',
    date: '2026-12-25',
    type: 'public',
    description: 'Christmas celebration'
  },
  {
    id: 'HOL-004',
    name: 'Founder\'s Day',
    date: '2026-03-15',
    type: 'optional',
    description: 'Company foundation anniversary'
  },
  {
    id: 'HOL-005',
    name: 'Floating Holiday 1',
    date: '2026-06-15',
    type: 'floating',
    description: 'Personal floating holiday'
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
