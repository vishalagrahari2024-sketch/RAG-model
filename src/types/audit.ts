import type { Department, PermissionAction, UserRole } from './auth';

export type AuditAction = PermissionAction | 'LOGIN' | 'LOGOUT' | 'GUARDRAIL_FLAG' | 'RAG_QUERY';

export const AuditStatus = {
  Allowed: 'Allowed',
  Denied: 'Denied',
  Flagged: 'Flagged',
} as const;
export type AuditStatus = 'Allowed' | 'Denied' | 'Flagged';

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userEmail: string;
  userName: string;
  userRole: UserRole;
  department: Department;
  action: AuditAction;
  resource: string;
  targetDepartment?: Department;
  status: AuditStatus;
  reason?: string;
  ipAddress?: string;
}
