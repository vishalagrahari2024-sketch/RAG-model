import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  MessageSquare,
  UploadCloud,
  ShieldCheck,
  AlertTriangle,
  Building2,
  Users,
  CheckCircle2,
  Lock,
  ArrowRight
} from 'lucide-react';
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

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 1 & 2 Live"
        title={`Authenticated Workspace — ${user?.role || 'Employee'} Dashboard`}
        description={`Active identity: ${user?.name} (${user?.email}). Role-Based Access Control filters documents, queries, and permissions according to your ${user?.department} department clearance.`}
      />

      {/* Header Context Card */}
      <div className="bg-white border border-slate-200 p-5 rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-lg font-bold text-slate-900">Welcome, {user?.name}</h1>
            <Badge variant="info" size="sm">{user?.role}</Badge>
            <span className="text-xs text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              Dept: {user?.department}
            </span>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Organization: <strong className="text-slate-800">{user?.tenant}</strong> • Authorized Knowledge Clearance: <strong className="text-blue-700">{user?.accessibleDepartments.join(', ')}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          {user?.permissions.includes('UPLOAD') && (
            <Button
              variant="outline"
              size="sm"
              leftIcon={<UploadCloud className="w-3.5 h-3.5" />}
              onClick={() => navigate('/upload')}
            >
              Upload Document
            </Button>
          )}
          <Button
            variant="primary"
            size="sm"
            leftIcon={<MessageSquare className="w-3.5 h-3.5" />}
            onClick={() => navigate('/chat')}
          >
            Ask RAG Assistant
          </Button>
        </div>
      </div>

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
              <MessageSquare className="w-4 h-4 text-indigo-600" />
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
        </div>
      )}

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
              <MessageSquare className="w-4 h-4 text-indigo-600" />
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
        </div>
      )}

      {/* Case 3: Department Manager */}
      {user?.role === 'Manager' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase">Dept Documents</span>
              <FileText className="w-4 h-4 text-purple-700" />
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
              <CheckCircle2 className="w-4 h-4 text-purple-700" />
            </div>
            <div className="text-2xl font-bold text-purple-800 font-mono mt-2">Active</div>
            <p className="text-[11px] text-slate-500 mt-1">Authorized to edit department docs</p>
          </Card>
        </div>
      )}

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
              <MessageSquare className="w-4 h-4 text-indigo-600" />
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
        </div>
      )}

      {/* Accessible Documents & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Authorized Documents for this role */}
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-700" />
              <h2 className="text-sm font-bold text-slate-900">
                Authorized Knowledge Base ({accessibleDocs.length} Documents)
              </h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
              onClick={() => navigate('/documents')}
            >
              Manage Documents
            </Button>
          </div>

          <Table
            columns={docColumns}
            data={accessibleDocs.slice(0, 5)}
            keyExtractor={(row) => row.id}
          />
        </div>

        {/* Right Col: Recent Activity & RBAC Notice */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <h2 className="text-sm font-bold text-slate-900">Recent Audit Events</h2>
            </div>
            <button
              onClick={() => navigate('/audit-logs')}
              className="text-xs text-blue-700 hover:underline"
            >
              View All
            </button>
          </div>

          <Table
            columns={auditColumns}
            data={userAuditLogs}
            keyExtractor={(row) => row.id}
          />

          {/* Role Boundary Summary Card */}
          <Card title="Current Access Clearance" className="text-xs space-y-2">
            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Role:</span>
                <span className="font-bold text-slate-900">{user?.role}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Home Department:</span>
                <span className="text-slate-900 font-medium">{user?.department}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-700">Retrieval Clearance:</span>
                <span className="text-blue-700 font-semibold">{user?.accessibleDepartments.join(', ')}</span>
              </div>
            </div>

            <div className="pt-2 text-[11px] text-slate-500 space-y-1">
              <p className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Pre-Retrieval filter active on all search queries</span>
              </p>
              <p className="flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-slate-400" />
                <span>Unauthorized cross-department attempts are logged</span>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
