import React, { useState } from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { FileSpreadsheet, Download, Filter, RefreshCw } from 'lucide-react';
import { auditService } from '../../services/auditService';
import type { AuditLogEntry } from '../../types/audit';

export const AuditLogsPage: React.FC = () => {
  const [logs, setLogs] = useState<AuditLogEntry[]>(auditService.getLogs());
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const refreshLogs = () => {
    setLogs(auditService.getLogs());
  };

  const filteredLogs = logs.filter((log) => {
    const matchesStatus = statusFilter === 'ALL' || log.status === statusFilter;
    const matchesSearch =
      log.userEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.resource.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.action.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const exportCSV = () => {
    const headers = ['Timestamp', 'User Email', 'User Name', 'Role', 'Department', 'Action', 'Resource', 'Status', 'Reason'];
    const rows = filteredLogs.map((l) => [
      l.timestamp,
      l.userEmail,
      l.userName,
      l.userRole,
      l.department,
      l.action,
      `"${l.resource.replace(/"/g, '""')}"`,
      l.status,
      `"${(l.reason || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `security_audit_logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: Column<AuditLogEntry>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (log) => <span className="font-mono text-xs text-slate-500">{log.timestamp}</span>,
    },
    {
      key: 'user',
      header: 'User Account',
      render: (log) => (
        <div>
          <div className="font-semibold text-xs text-slate-900">{log.userName}</div>
          <div className="text-[10px] text-slate-500">{log.userEmail}</div>
        </div>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (log) => (
        <span className="font-mono text-xs font-semibold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded border border-slate-200">
          {log.action}
        </span>
      ),
    },
    {
      key: 'resource',
      header: 'Resource',
      render: (log) => <span className="text-xs text-slate-700 max-w-xs truncate block">{log.resource}</span>,
    },
    {
      key: 'department',
      header: 'Dept',
      render: (log) => (
        <span className="text-xs text-slate-600 font-medium">
          {log.targetDepartment || log.department}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (log) => (
        <Badge variant={log.status === 'Allowed' ? 'success' : log.status === 'Denied' ? 'danger' : 'warning'} size="sm">
          {log.status}
        </Badge>
      ),
    },
    {
      key: 'reason',
      header: 'Security Verification Details',
      render: (log) => (
        <span className="text-[11px] text-slate-500 block max-w-sm truncate" title={log.reason}>
          {log.reason || 'Standard verification'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 1 & 2 Live"
        title="Security & Access Audit Trail"
        description="Immutable record of all authentication sessions, document views, edits, uploads, and RAG knowledge retrievals. Unauthorized attempts are flagged and recorded."
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-700" />
            Security Audit Trail Ledger
          </h2>
          <p className="text-xs text-slate-500">
            Real-time audit log tracking every user action against access control boundaries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={refreshLogs}
          >
            Refresh Logs
          </Button>
          <Button
            variant="primary"
            size="sm"
            leftIcon={<Download className="w-3.5 h-3.5" />}
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter Card */}
      <Card className="p-3.5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by user, action, or resource..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded-md px-3 py-1.5 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-md px-2.5 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-blue-600"
            >
              <option value="ALL">All Outcomes</option>
              <option value="Allowed">Allowed Only</option>
              <option value="Denied">Denied (RBAC Blocks) Only</option>
            </select>
            <Badge variant="neutral" size="sm">
              {filteredLogs.length} Records
            </Badge>
          </div>
        </div>
      </Card>

      <Table
        columns={columns}
        data={filteredLogs}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};
