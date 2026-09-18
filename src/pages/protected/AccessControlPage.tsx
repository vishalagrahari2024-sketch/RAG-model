import React from 'react';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
import { ShieldCheck, Key } from 'lucide-react';
import { DEMO_USERS } from '../../services/authService';
import type { User } from '../../types/auth';

interface RolePermissionMatrixRow {
  role: string;
  department: string;
  view: boolean;
  upload: boolean;
  edit: 'Full' | 'Department' | 'None';
  delete: boolean;
  rag: boolean;
}

export const AccessControlPage: React.FC = () => {
  const usersList: User[] = DEMO_USERS.map(({ passwordHash: _, ...u }) => u);

  const permissionMatrix: RolePermissionMatrixRow[] = [
    {
      role: 'Finance Employee',
      department: 'Finance',
      view: true,
      upload: true,
      edit: 'None',
      delete: false,
      rag: true,
    },
    {
      role: 'Manufacturing Employee',
      department: 'Manufacturing',
      view: true,
      upload: true,
      edit: 'None',
      delete: false,
      rag: true,
    },
    {
      role: 'Department Manager',
      department: 'Finance / Mfg',
      view: true,
      upload: true,
      edit: 'Department',
      delete: false,
      rag: true,
    },
    {
      role: 'CEO / Executive',
      department: 'Executive (Company-wide)',
      view: true,
      upload: true,
      edit: 'Full',
      delete: true,
      rag: true,
    },
    {
      role: 'Enterprise Admin',
      department: 'IT / Security',
      view: true,
      upload: true,
      edit: 'Full',
      delete: true,
      rag: true,
    },
  ];

  const userColumns: Column<User>[] = [
    {
      key: 'name',
      header: 'Employee Name',
      render: (u) => (
        <div>
          <div className="font-semibold text-slate-900 text-xs">{u.name}</div>
          <div className="text-[10px] text-slate-500">{u.email}</div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (u) => <Badge variant="info" size="sm">{u.role}</Badge>,
    },
    {
      key: 'department',
      header: 'Department',
      render: (u) => (
        <span className="text-xs font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
          {u.department}
        </span>
      ),
    },
    {
      key: 'accessibleDepartments',
      header: 'Clearance Scope',
      render: (u) => (
        <span className="text-xs font-mono text-blue-700">
          {u.accessibleDepartments.join(', ')}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: () => <Badge variant="success" size="sm">Active</Badge>,
    },
  ];

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 1-3 Model"
        title="Role-Based Access Control (RBAC) & Authorization Architecture"
        description="Structured user identity and clearance model. Authorization controls which documents and departments can be accessed prior to retrieval."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-blue-700" />
            Access Control & Policy Matrix
          </h2>
          <p className="text-xs text-slate-500">
            Enforced policies governing document actions (VIEW, UPLOAD, EDIT, DELETE, RAG_ACCESS).
          </p>
        </div>
      </div>

      {/* Users Table */}
      <Card title="Corporate Identities & Role Assignments">
        <Table
          columns={userColumns}
          data={usersList}
          keyExtractor={(u) => u.id}
        />
      </Card>

      {/* Permissions Matrix */}
      <Card title="Role Permissions Matrix">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold uppercase">
                <th className="py-3 px-4">Role Title</th>
                <th className="py-3 px-4">Home Department</th>
                <th className="py-3 px-4 text-center">VIEW</th>
                <th className="py-3 px-4 text-center">UPLOAD</th>
                <th className="py-3 px-4 text-center">EDIT</th>
                <th className="py-3 px-4 text-center">DELETE</th>
                <th className="py-3 px-4 text-center">RAG_ACCESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              {permissionMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-semibold text-slate-900 flex items-center gap-1.5">
                    <Key className="w-3.5 h-3.5 text-blue-700" />
                    {row.role}
                  </td>
                  <td className="py-3 px-4 text-slate-600">{row.department}</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3 px-4 text-center">
                    {row.edit === 'Full' ? (
                      <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-semibold">
                        Full
                      </span>
                    ) : row.edit === 'Department' ? (
                      <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-semibold">
                        Dept Only
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {row.delete ? (
                      <span className="text-emerald-600 font-bold">✓</span>
                    ) : (
                      <span className="text-slate-400 font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
