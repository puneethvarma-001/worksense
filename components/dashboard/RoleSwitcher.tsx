"use client";

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Role } from '@/rbac/roles';

const roles = [
  { value: Role.Employee, label: 'Employee' },
  { value: Role.Manager, label: 'Manager' },
  { value: Role.HR, label: 'HR' },
  { value: Role.TA, label: 'Talent Acquisition' },
  { value: Role.AMP, label: 'Admin/Manager Plus' },
];

interface RoleSwitcherProps {
  currentRole: string;
  subdomain: string;
}

export function RoleSwitcher({ currentRole, subdomain }: RoleSwitcherProps) {
  const router = useRouter();

  const handleRoleChange = (newRole: string) => {
    // Create a demo session cookie with the new role
    const demoData = { role: newRole };
    const encoded = typeof window !== 'undefined'
      ? btoa(JSON.stringify(demoData))
      : Buffer.from(JSON.stringify(demoData)).toString('base64');

    // Set cookie and refresh the page
    document.cookie = `demo_session=${encoded}; path=/; max-age=86400`;
    router.refresh();
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Role:</span>
      <Select value={currentRole} onValueChange={handleRoleChange}>
        <SelectTrigger className="w-40">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {roles.map((role) => (
            <SelectItem key={role.value} value={role.value}>
              {role.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}