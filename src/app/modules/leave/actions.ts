import { enforcePermission } from '@/lib/rbac/checkPermission';

/**
 * Sample server action for applying for leave.
 * In a real app, this would be invoked from a form and would persist to DB/Redis.
 */
export async function applyLeaveAction({ userRoles, payload }: { userRoles: string[] | undefined; payload: any }) {
  // Ensure caller has the permission to apply for leave
  enforcePermission(userRoles, 'leave.apply');

  // Simulate persistence (would normally write to Redis or DB)
  const id = `leave_${Date.now()}`;

  return { success: true, id, payload };
}
