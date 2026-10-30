import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { FileText } from 'lucide-react';
import { documentService } from '../../services/documentService';
import { auditService } from '../../services/auditService';
import type { DocumentItem } from '../../types/document';
import type { AuditLogEntry } from '../../types/audit';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const accessibleDocs = user ? documentService.getAccessibleDocuments(user) : [];
  const allAuditLogs = auditService.getLogs();
  const userAuditLogs = user?.role === 'CEO' || user?.role === 'Enterprise Admin'
    ? allAuditLogs.slice(0, 5)
    : allAuditLogs.filter((l) => l.userEmail === user?.email || l.department === user?.department).slice(0, 5);

  const docColumns: Column<DocumentItem>[] = [
    {
      key: 'name',
      header: 'Document Name',
      render: (doc) => (
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200 shrink-0">
            <FileText className="w-3.5 h-3.5" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 text-xs">{doc.name}</div>
            <div className="text-[10px] text-slate-500">{doc.category} • {doc.size}</div>
          </div>
        </div>
      ),
    },
    {
      key: 'department',
      header: 'Department',
      render: (doc) => (
        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {doc.department}
        </span>
      ),
    },
    {
      key: 'visibility',
      header: 'Access Scope',
      render: (doc) => (
        <Badge variant={doc.visibility === 'Company-Wide' ? 'success' : doc.visibility === 'Executive Only' ? 'danger' : 'neutral'} size="sm">
          {doc.visibility}
        </Badge>
      ),
    },
    {
      key: 'uploadDate',
      header: 'Uploaded Date',
      render: (doc) => <span className="text-xs text-slate-500 font-mono">{doc.uploadDate}</span>,
    },
    {
      key: 'action',
      header: 'Action',
      render: () => (
        <button
          onClick={() => navigate('/documents')}
          className="text-xs text-blue-700 hover:text-blue-800 font-medium"
        >
          View Doc
        </button>
      ),
    },
  ];

  const auditColumns: Column<AuditLogEntry>[] = [
    {
      key: 'timestamp',
      header: 'Timestamp',
      render: (log) => <span className="text-xs font-mono text-slate-500">{log.timestamp.split(' ')[1] || log.timestamp}</span>,
    },
    {
      key: 'action',
      header: 'Action',
      render: (log) => (
        <span className="text-xs font-semibold text-slate-800 font-mono">
          {log.action}
        </span>
      ),
    },
    {
      key: 'resource',
      header: 'Target Resource',
      render: (log) => <span className="text-xs text-slate-700 truncate max-w-xs block">{log.resource}</span>,
    },
    {
      key: 'status',
      header: 'Result',
      render: (log) => (
        <Badge variant={log.status === 'Allowed' ? 'success' : log.status === 'Denied' ? 'danger' : 'warning'} size="sm">
          {log.status}
        </Badge>
      ),
    },
  ];

  const allowedCount = allAuditLogs.filter((l) => l.status === 'Allowed').length;
  const deniedCount = allAuditLogs.filter((l) => l.status === 'Denied').length;

  return (
    <div className="space-y-4">
      {/* Page Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
          <p className="text-xs text-gray-500">
            System overview and access summary
          </p>
        </div>

        <div className="flex items-center gap-2">
          {user?.permissions.includes('UPLOAD') && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/upload')}
            >
              Upload Document
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/chat')}
          >
            Chat with RAG
          </Button>
        </div>
      </div>

<<<<<<< HEAD
      {/* DYNAMIC ROLE-BASED METRICS */}

      {/* Case 1: Finance Employee */}
      {user?.role === 'Employee' && user?.department === 'Finance' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Finance Documents</span>
              <FileText className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">{accessibleDocs.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Available in Finance archive</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">My Uploads</span>
              <UploadCloud className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">7</div>
            <p className="text-[11px] text-slate-500 mt-1">Uploaded with Finance tags</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Queries This Month</span>
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">28</div>
            <p className="text-[11px] text-slate-500 mt-1">RAG questions asked</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Accessible Reports</span>
              <ShieldCheck className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">31</div>
            <p className="text-[11px] text-slate-500 mt-1">Finance + General HR docs</p>
          </Card>
=======
      {/* User Clearance / Profile Box */}
      <div className="p-3.5 bg-white border border-gray-200 rounded-md">
        <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
          Current User Clearance
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div>
            <span className="text-gray-500 block">Name:</span>
            <strong className="text-gray-900">{user?.name}</strong>
          </div>
          <div>
            <span className="text-gray-500 block">Role:</span>
            <strong className="text-blue-600">{user?.role}</strong>
          </div>
          <div>
            <span className="text-gray-500 block">Department:</span>
            <strong className="text-gray-900">{user?.department}</strong>
          </div>
          <div>
            <span className="text-gray-500 block">Accessible Scope:</span>
            <span className="text-gray-800">{user?.accessibleDepartments.join(', ')}</span>
          </div>
>>>>>>> 107f6ad (final changes)
        </div>

<<<<<<< HEAD
      {/* Case 2: Manufacturing Employee */}
      {user?.role === 'Employee' && user?.department === 'Manufacturing' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Mfg Documents</span>
              <FileText className="w-4 h-4 text-amber-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">{accessibleDocs.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Active SOPs & Plant reports</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">My Uploads</span>
              <UploadCloud className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">11</div>
            <p className="text-[11px] text-slate-500 mt-1">Assembly & inspection sheets</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Queries This Month</span>
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">34</div>
            <p className="text-[11px] text-slate-500 mt-1">Production RAG lookups</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Accessible Docs</span>
              <ShieldCheck className="w-4 h-4 text-amber-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">49</div>
            <p className="text-[11px] text-slate-500 mt-1">Manufacturing & Safety clearance</p>
          </Card>
=======
        <div className="mt-2.5 pt-2 border-t border-gray-100 flex items-center gap-4 text-xs flex-wrap">
          <span className="text-gray-500">Permissions:</span>
          <span className="font-mono">
            VIEW {user?.permissions.includes('VIEW') ? '✓' : '✕'}
          </span>
          <span className="font-mono">
            UPLOAD {user?.permissions.includes('UPLOAD') ? '✓' : '✕'}
          </span>
          <span className="font-mono">
            EDIT {user?.permissions.includes('EDIT') ? '✓' : '✕'}
          </span>
          <span className="font-mono">
            DELETE {user?.permissions.includes('DELETE') ? '✓' : '✕'}
          </span>
          <span className="font-mono">
            RAG_ACCESS {user?.permissions.includes('RAG_ACCESS') ? '✓' : '✕'}
          </span>
>>>>>>> 107f6ad (final changes)
        </div>
      </div>

<<<<<<< HEAD
      {/* Case 3: Department Manager */}
      {user?.role === 'Manager' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Dept Documents</span>
              <FileText className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">{accessibleDocs.length}</div>
            <p className="text-[11px] text-slate-500 mt-1">Under departmental management</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Team Members</span>
              <Users className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">18</div>
            <p className="text-[11px] text-slate-500 mt-1">{user.department} team size</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Queries This Month</span>
              <MessageSquare className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">96</div>
            <p className="text-[11px] text-slate-500 mt-1">Department retrieval volume</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Edit Permission</span>
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-blue-800 font-mono mt-2">Active</div>
            <p className="text-[11px] text-slate-500 mt-1">Authorized to edit department docs</p>
          </Card>
=======
      {/* Simple Stat Boxes as requested in the prompt */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-gray-200 rounded-md">
          <span className="text-xs text-gray-500 block">Accessible Documents</span>
          <span className="text-xl font-bold text-gray-900 font-mono block mt-1">
            {accessibleDocs.length}
          </span>
>>>>>>> 107f6ad (final changes)
        </div>

<<<<<<< HEAD
      {/* Case 4: CEO / Executive / Admin */}
      {(user?.role === 'CEO' || user?.role === 'Enterprise Admin') && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Total Org Documents</span>
              <FileText className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">286</div>
            <p className="text-[11px] text-slate-500 mt-1">Across all departments</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Departments</span>
              <Building2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">6</div>
            <p className="text-[11px] text-slate-500 mt-1">Finance, Mfg, HR, Exec, IT, Legal</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Queries This Month</span>
              <MessageSquare className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">1,248</div>
            <p className="text-[11px] text-slate-500 mt-1">Enterprise-wide RAG queries</p>
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Active Users</span>
              <Users className="w-4 h-4 text-blue-700" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono mt-2">74</div>
            <p className="text-[11px] text-slate-500 mt-1">Authenticated corporate users</p>
          </Card>
=======
        <div className="p-3.5 bg-white border border-gray-200 rounded-md">
          <span className="text-xs text-gray-500 block">Users</span>
          <span className="text-xl font-bold text-gray-900 font-mono block mt-1">
            5
          </span>
>>>>>>> 107f6ad (final changes)
        </div>

        <div className="p-3.5 bg-white border border-gray-200 rounded-md">
          <span className="text-xs text-gray-500 block">Allowed Queries</span>
          <span className="text-xl font-bold text-emerald-700 font-mono block mt-1">
            {allowedCount}
          </span>
        </div>

        <div className="p-3.5 bg-white border border-gray-200 rounded-md">
          <span className="text-xs text-gray-500 block">Denied Queries</span>
          <span className="text-xl font-bold text-red-600 font-mono block mt-1">
            {deniedCount}
          </span>
        </div>
      </div>

      {/* Accessible Documents Table & Recent Audit Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Accessible Documents Table */}
        <div className="lg:col-span-2 space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Accessible Documents ({accessibleDocs.length})
            </h2>
            <button
              onClick={() => navigate('/documents')}
              className="text-xs text-blue-600 hover:underline"
            >
              View All Documents →
            </button>
          </div>

          <Table
            columns={docColumns}
            data={accessibleDocs.slice(0, 5)}
            keyExtractor={(row) => row.id}
          />
        </div>

        {/* Recent Audit Events */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
              Recent Audit Logs
            </h2>
            <button
              onClick={() => navigate('/audit-logs')}
              className="text-xs text-blue-600 hover:underline"
            >
              View Ledger →
            </button>
          </div>

          <Table
            columns={auditColumns}
            data={userAuditLogs}
            keyExtractor={(row) => row.id}
          />
        </div>
      </div>
    </div>
  );
};
