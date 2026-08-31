import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import { ShieldAlert, Key, Plus, Check, X } from 'lucide-react';

interface MockRole {
  id: string;
  name: string;
  usersCount: number;
  retrievalScope: string;
  guardrailBypass: boolean;
  status: 'Active';
}

export const AccessControlPage: React.FC = () => {
  const mockRoles: MockRole[] = [
    { id: 'role-1', name: 'Enterprise Admin', usersCount: 4, retrievalScope: 'All Vector Collections & Tenant Vaults', guardrailBypass: false, status: 'Active' },
    { id: 'role-2', name: 'Security Engineer', usersCount: 12, retrievalScope: 'Security, Infrastructure & IT Docs', guardrailBypass: false, status: 'Active' },
    { id: 'role-3', name: 'Data Compliance Officer', usersCount: 6, retrievalScope: 'Legal, HIPAA, Financial Audits', guardrailBypass: false, status: 'Active' },
    { id: 'role-4', name: 'Auditor (Read-Only)', usersCount: 18, retrievalScope: 'Public & General HR Collections', guardrailBypass: false, status: 'Active' },
  ];

  const columns: Column<MockRole>[] = [
    {
      key: 'name',
      header: 'Role Title',
      render: (row) => (
        <div className="font-semibold text-slate-200 flex items-center gap-2">
          <Key className="w-3.5 h-3.5 text-blue-400" />
          {row.name}
        </div>
      ),
    },
    {
      key: 'usersCount',
      header: 'Assigned Users',
      render: (row) => (
        <span className="font-mono text-xs text-slate-300">{row.usersCount} users</span>
      ),
    },
    {
      key: 'retrievalScope',
      header: 'RAG Retrieval Scope Filter',
      render: (row) => (
        <span className="text-xs text-slate-400 font-mono">{row.retrievalScope}</span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: () => <Badge variant="success" size="sm">Active Policy</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="MOCK"
        phase="Phase 3 Pending"
        title="Role-Based Access Control (RBAC) & Authorization Matrix"
        description="This page displays the proposed RBAC architecture layout. Authorization enforcement, secure vector metadata filtering, and user permission checks will be implemented in Phase 3."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-indigo-400" />
            Access Control & Policy Engine
          </h2>
          <p className="text-xs text-slate-400">
            Define tenant roles, document clearance levels, and secure vector filtering policies.
          </p>
        </div>
        <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} disabled title="Phase 3 Pending">
          Create Custom Role (Phase 3)
        </Button>
      </div>

      <Table
        columns={columns}
        data={mockRoles}
        keyExtractor={(row) => row.id}
      />

      <Card title="Permissions Scopes Matrix (UI Blueprint)">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-[#1F293D] text-slate-400 font-mono uppercase">
                <th className="py-3 px-4">Permission Scope</th>
                <th className="py-3 px-4 text-center">Enterprise Admin</th>
                <th className="py-3 px-4 text-center">Security Eng</th>
                <th className="py-3 px-4 text-center">Compliance Officer</th>
                <th className="py-3 px-4 text-center">Auditor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1F293D] text-slate-300">
              <tr>
                <td className="py-3 px-4 font-semibold">Document Ingestion & Chunking</td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Secured RAG Query Execution</td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">AI Guardrails Configuration</td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold">Audit Logs & Telemetry Export</td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-slate-600"><X className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
                <td className="py-3 px-4 text-center text-emerald-400"><Check className="w-4 h-4 mx-auto" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
