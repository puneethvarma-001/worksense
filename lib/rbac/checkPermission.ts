import { Permission, rolePermissions } from './roles';

export class PermissionError extends Error {
  constructor(message = 'Forbidden') {
    super(message);
    this.name = 'PermissionError';
  }
}

export function checkPermission(
  userRoles: string[] | undefined | null,
  permission: Permission
) {
  if (!userRoles || !userRoles.length) return false;
  for (const role of userRoles) {
    const perms = rolePermissions[role as keyof typeof rolePermissions] || [];
    if ((perms as Permission[]).includes(permission)) return true;
  }
  return false;
}

export function enforcePermission(userRoles: string[] | undefined | null, permission: Permission) {
  if (!checkPermission(userRoles, permission)) {
    throw new PermissionError(`Missing permission ${permission}`);
  }
}
