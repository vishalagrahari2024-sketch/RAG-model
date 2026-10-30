import React from 'react';
import { Badge } from '../../components/common/Badge';
import { Table } from '../../components/common/Table';
import type { Column } from '../../components/common/Table';
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
    <div className="space-y-4">
      {/* Title */}
      <div className="pb-2 border-b border-gray-200">
        <h1 className="text-lg font-bold text-gray-900">Access Control</h1>
        <p className="text-xs text-gray-500">
          Role-based permissions and user clearance policies
        </p>
      </div>

      {/* Users Table */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
          User Accounts & Clearance
        </h2>
        <Table
          columns={userColumns}
          data={usersList}
          keyExtractor={(u) => u.id}
        />
      </div>

      {/* Permissions Matrix */}
      <div className="space-y-2">
        <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
          Role Permissions Matrix
        </h2>
        <div className="overflow-x-auto rounded-md border border-gray-200 bg-white">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-gray-700 font-semibold">
                <th className="py-2.5 px-3.5">Role</th>
                <th className="py-2.5 px-3.5">Department</th>
                <th className="py-2.5 px-3.5 text-center">VIEW</th>
                <th className="py-2.5 px-3.5 text-center">UPLOAD</th>
                <th className="py-2.5 px-3.5 text-center">EDIT</th>
                <th className="py-2.5 px-3.5 text-center">DELETE</th>
                <th className="py-2.5 px-3.5 text-center">RAG_ACCESS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-gray-800">
              {permissionMatrix.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="py-2.5 px-3.5 font-medium text-gray-900">
                    {row.role}
                  </td>
                  <td className="py-2.5 px-3.5 text-gray-600">{row.department}</td>
                  <td className="py-2.5 px-3.5 text-center text-emerald-700 font-bold">✓</td>
                  <td className="py-2.5 px-3.5 text-center text-emerald-700 font-bold">✓</td>
                  <td className="py-2.5 px-3.5 text-center">
                    {row.edit === 'Full' ? (
                      <span className="text-emerald-700 font-bold">✓ (All)</span>
                    ) : row.edit === 'Department' ? (
                      <span className="text-blue-700 font-medium">✓ (Dept)</span>
                    ) : (
                      <span className="text-gray-400 font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center">
                    {row.delete ? (
                      <span className="text-emerald-700 font-bold">✓</span>
                    ) : (
                      <span className="text-gray-400 font-bold">✕</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3.5 text-center text-emerald-700 font-bold">✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
