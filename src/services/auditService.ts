import type { AuditLogEntry } from '../types/audit';

const AUDIT_STORAGE_KEY = 'rag_rbac_audit_logs';

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-101',
    timestamp: '2026-09-18 10:14:02',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'VIEW',
    resource: 'Q4 Financial Report 2026.pdf',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Department clearance verified (Finance)',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-102',
    timestamp: '2026-09-18 10:22:15',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'RAG_QUERY',
    resource: 'Finance Knowledge Base',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Query: Q4 Revenue analysis - Authorized retrieval',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-103',
    timestamp: '2026-09-18 10:45:30',
    userEmail: 'finance.employee@demo-company.com',
    userName: 'Rahul Sharma',
    userRole: 'Employee',
    department: 'Finance',
    action: 'RAG_QUERY',
    resource: 'Manufacturing Production SOP',
    targetDepartment: 'Manufacturing',
    status: 'Denied',
    reason: 'Pre-Retrieval RBAC Violation: Employee not cleared for Manufacturing documents',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-104',
    timestamp: '2026-09-18 11:05:18',
    userEmail: 'finance.manager@demo-company.com',
    userName: 'Priya Patel',
    userRole: 'Manager',
    department: 'Finance',
    action: 'EDIT',
    resource: 'Annual Budget 2026.pdf',
    targetDepartment: 'Finance',
    status: 'Allowed',
    reason: 'Department Manager granted EDIT authorization',
    ipAddress: '192.168.1.88'
  },
  {
    id: 'log-105',
    timestamp: '2026-09-18 11:30:44',
    userEmail: 'manufacturing.employee@demo-company.com',
    userName: 'Amit Verma',
    userRole: 'Employee',
    department: 'Manufacturing',
    action: 'VIEW',
    resource: 'Production Report Q4.pdf',
    targetDepartment: 'Manufacturing',
    status: 'Allowed',
    reason: 'Department clearance verified (Manufacturing)',
    ipAddress: '192.168.2.45'
  },
  {
    id: 'log-106',
    timestamp: '2026-09-18 12:10:09',
    userEmail: 'manufacturing.employee@demo-company.com',
    userName: 'Amit Verma',
    userRole: 'Employee',
    department: 'Manufacturing',
    action: 'VIEW',
    resource: 'Q4 Financial Report 2026.pdf',
    targetDepartment: 'Finance',
    status: 'Denied',
    reason: 'Cross-department access denied: User lacks Finance clearance',
    ipAddress: '192.168.2.45'
  },
  {
    id: 'log-107',
    timestamp: '2026-09-18 13:02:55',
    userEmail: 'ceo@demo-company.com',
    userName: 'Vikram Malhotra',
    userRole: 'CEO',
    department: 'Executive',
    action: 'RAG_QUERY',
    resource: 'Company-wide Knowledge Index',
    targetDepartment: 'Executive',
    status: 'Allowed',
    reason: 'Executive clearance active across all departments',
    ipAddress: '192.168.1.2'
  }
];

class AuditService {
  constructor() {
    this.init();
  }

  private init() {
    const existing = localStorage.getItem(AUDIT_STORAGE_KEY);
    if (!existing) {
      localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
    }
  }

  public getLogs(): AuditLogEntry[] {
    try {
      const raw = localStorage.getItem(AUDIT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : INITIAL_AUDIT_LOGS;
    } catch {
      return INITIAL_AUDIT_LOGS;
    }
  }

  public logEvent(entry: Omit<AuditLogEntry, 'id' | 'timestamp'>): AuditLogEntry {
    const now = new Date();
    const formattedTime = now.toISOString().replace('T', ' ').substring(0, 19);

    const newLog: AuditLogEntry = {
      ...entry,
      id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      timestamp: formattedTime,
      ipAddress: entry.ipAddress || '192.168.1.104'
    };

    const logs = this.getLogs();
    logs.unshift(newLog);
    // Keep max 150 records in storage
    if (logs.length > 150) logs.pop();

    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(logs));
    return newLog;
  }

  public clearLogs(): void {
    localStorage.setItem(AUDIT_STORAGE_KEY, JSON.stringify(INITIAL_AUDIT_LOGS));
  }
}

export const auditService = new AuditService();
