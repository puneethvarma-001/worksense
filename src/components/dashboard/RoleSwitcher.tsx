"use client";

import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Role } from '@/lib/rbac/roles';

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

  const handleRoleChange = async (newRole: string) => {
    // Ask the server to update the demo_session cookie (HttpOnly), then refresh
    try {
      await fetch('/api/auth/demo-session', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });
    } catch (err) {
      // best-effort; ignore network errors
    } finally {
      router.refresh();
    }
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