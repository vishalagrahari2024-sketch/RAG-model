import React, { useState } from 'react';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
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
    <div className="space-y-4">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Audit Logs</h1>
          <p className="text-xs text-gray-500">
            Log of user actions, authorization checks, and access attempts
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={refreshLogs}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={exportCSV}
          >
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="p-3 bg-white border border-gray-200 rounded-md flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="w-full sm:w-72">
          <input
            type="text"
            placeholder="Search by user, action, or resource..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:border-blue-600"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs text-gray-500">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-blue-600 cursor-pointer"
          >
            <option value="ALL">All Outcomes</option>
            <option value="Allowed">Allowed Only</option>
            <option value="Denied">Denied (Blocked) Only</option>
          </select>
          <span className="text-xs text-gray-500">
            ({filteredLogs.length} events)
          </span>
        </div>
      </div>

      <Table
        columns={columns}
        data={filteredLogs}
        keyExtractor={(row) => row.id}
      />
    </div>
  );
};
