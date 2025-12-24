/**
 * Core Types for Enterprise HR SaaS Platform
 * Defines all fundamental types for tenant, RBAC, features, and domain models
 */

// ────────────────────────────────────────
// TENANT & ORGANIZATION TYPES
// ────────────────────────────────────────

export type TenantId = string & { readonly __brand: 'TenantId' };
export type UserId = string & { readonly __brand: 'UserId' };
export type EmployeeId = string & { readonly __brand: 'EmployeeId' };

export function makeTenantId(id: string): TenantId {
  return id as TenantId;
}

export function makeUserId(id: string): UserId {
  return id as UserId;
}

export function makeEmployeeId(id: string): EmployeeId {
  return id as EmployeeId;
}

/**
 * Tenant represents an Organization in the SaaS
 * Each tenant is isolated with data segregation at service layer
 */
export interface Tenant {
  id: TenantId;
  name: string;
  subdomain: string;
  emoji?: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'active' | 'suspended' | 'deleted';
  tier: 'starter' | 'professional' | 'enterprise';
}

/**
 * TenantContext is passed through requests
 * Available in middleware, server components, server actions
 */
export interface TenantContext {
  tenant: Tenant;
  userId: UserId;
  userRole: Role;
  permissions: Permission[];
}

// ────────────────────────────────────────
// RBAC TYPES
// ────────────────────────────────────────

export type Role = 'AMP' | 'HR' | 'Manager' | 'Employee' | 'TA';

/**
 * Granular permissions matrix
 * Organized by resource and action
 */
export type Permission =
  | 'view:dashboard'
  | 'manage:employees'
  | 'manage:payroll'
  | 'manage:leave'
  | 'manage:attendance'
  | 'manage:onboarding'
  | 'manage:org_structure'
  | 'manage:policies'
  | 'manage:holidays'
  | 'view:payslips'
  | 'request:leave'
  | 'approve:leave'
  | 'use:ai_features'
  | 'manage:candidates'
  | 'manage:settings'
  | 'manage:feature_flags'
  | 'view:team_metrics'
  | 'manage:team_members'
  | 'view:profile'
  | 'edit:profile';

export interface RolePermissionMap {
  [key in Role]: Permission[];
}

export interface User {
  id: UserId;
  tenantId: TenantId;
  email: string;
  name: string;
  role: Role;
  employeeId?: EmployeeId;
  status: 'active' | 'inactive' | 'invited';
  createdAt: Date;
  updatedAt: Date;
}

// ────────────────────────────────────────
// FEATURE FLAG TYPES
// ────────────────────────────────────────

export type FeatureFlag =
  | 'FEATURE_LEAVE'
  | 'FEATURE_ATTENDANCE'
  | 'FEATURE_ONBOARDING'
  | 'FEATURE_PAYROLL'
  | 'FEATURE_ORG_STRUCTURE'
  | 'FEATURE_POLICIES'
  | 'FEATURE_HOLIDAYS'
  | 'FEATURE_AI_RESUME'
  | 'FEATURE_AI_AUTOSCREEN'
  | 'FEATURE_AI_PAYROLL_VERIFY';

export interface FeatureFlagConfig {
  [key in FeatureFlag]: {
    enabled: boolean;
    description: string;
    availableTiers: ('starter' | 'professional' | 'enterprise')[];
  };
}

// ────────────────────────────────────────
// DOMAIN MODELS
// ────────────────────────────────────────

export interface Employee {
  id: EmployeeId;
  tenantId: TenantId;
  userId?: UserId;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  designation: string;
  department: string;
  reportingManagerId?: EmployeeId;
  joinDate: Date;
  status: 'active' | 'on_leave' | 'inactive';
  salary?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type LeaveType = 'sick' | 'casual' | 'personal' | 'maternity' | 'paternity' | 'unpaid';

export interface LeaveRequest {
  id: string;
  tenantId: TenantId;
  employeeId: EmployeeId;
  leaveType: LeaveType;
  startDate: Date;
  endDate: Date;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  approverId?: EmployeeId;
  createdAt: Date;
  updatedAt: Date;
}

export interface Attendance {
  id: string;
  tenantId: TenantId;
  employeeId: EmployeeId;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  status: 'present' | 'absent' | 'half_day' | 'on_leave';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Payroll {
  id: string;
  tenantId: TenantId;
  employeeId: EmployeeId;
  period: string; // YYYY-MM format
  baseSalary: number;
  allowances: number;
  deductions: number;
  netSalary: number;
  status: 'draft' | 'processed' | 'paid';
  paidDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Candidate {
  id: string;
  tenantId: TenantId;
  name: string;
  email: string;
  phone: string;
  position: string;
  status: 'screening' | 'interviewed' | 'selected' | 'rejected' | 'onboarded';
  resumeUrl?: string;
  resumeAnalysis?: {
    score: number;
    summary: string;
    skills: string[];
  };
  screeningStatus?: {
    completed: boolean;
    score?: number;
    recommendation?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Holiday {
  id: string;
  tenantId: TenantId;
  name: string;
  date: Date;
  type: 'national' | 'regional' | 'company';
  createdAt: Date;
}

export interface LeavePolicy {
  id: string;
  tenantId: TenantId;
  leaveType: LeaveType;
  allowedDays: number;
  carryForwardDays: number;
  requiresApproval: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrgNode {
  id: string;
  tenantId: TenantId;
  name: string;
  type: 'department' | 'team' | 'division';
  parentId?: string;
  description?: string;
  managerId?: EmployeeId;
  employees: EmployeeId[];
  createdAt: Date;
  updatedAt: Date;
}

// ────────────────────────────────────────
// DASHBOARD TYPES
// ────────────────────────────────────────

export interface DashboardMetrics {
  totalEmployees: number;
  activeToday: number;
  onLeave: number;
  pendingApprovals: number;
  leaveBalance?: Record<string, number>;
  upcomingHolidays?: Holiday[];
}

export interface ManagerDashboardData {
  teamSize: number;
  presentToday: number;
  onLeaveToday: number;
  pendingApprovals: number;
  teamAttendance: Array<{
    employeeId: EmployeeId;
    name: string;
    status: 'present' | 'absent' | 'on_leave';
  }>;
}

// ────────────────────────────────────────
// API RESPONSE TYPES
// ────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  status: number;
}

// ────────────────────────────────────────
// REQUEST CONTEXT TYPES
// ────────────────────────────────────────

export interface RequestWithTenant {
  tenant: Tenant;
  userId: UserId;
  userRole: Role;
  permissions: Permission[];
}
