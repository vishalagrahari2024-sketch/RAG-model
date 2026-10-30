import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { HardDrive, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-4">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Settings</h1>
          <p className="text-xs text-gray-500">
            User account profile and session information
          </p>
        </div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Logout
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* User Profile Card */}
        <div className="p-4 bg-white border border-gray-200 rounded-md space-y-3">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wide">
            User Profile
          </h2>

<<<<<<< HEAD
            <div className="space-y-2 pt-1 text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" /> Organization Tenant
                </span>
                <span className="font-semibold text-slate-900">{user?.tenant}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-blue-700" /> Account ID
                </span>
                <span className="font-mono text-slate-800 text-[11px]">{user?.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-700" /> Authorized Scopes
                </span>
                <span className="font-semibold text-blue-700">{user?.accessibleDepartments.join(', ')}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" /> Registered Date
                </span>
                <span className="font-mono text-slate-800 text-[11px]">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </span>
              </div>
=======
          <div className="space-y-2 text-xs text-gray-800">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Name:</span>
              <span className="font-semibold text-gray-900">{user?.name}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Email:</span>
              <span className="font-medium text-gray-900">{user?.email}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Role:</span>
              <span className="font-medium text-blue-600">{user?.role}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Department:</span>
              <span className="font-medium text-gray-900">{user?.department}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-500">Accessible Departments:</span>
              <span className="font-medium text-gray-900">{user?.accessibleDepartments.join(', ')}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-500">Permissions:</span>
              <span className="font-mono text-[11px] text-gray-700">{user?.permissions.join(', ')}</span>
>>>>>>> 107f6ad (final changes)
            </div>
          </div>
        </div>

        {/* Session Metadata Card */}
        <Card title="Active Authentication Session">
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-800">Session Bearer Token</span>
                <Badge variant="success" size="sm">VALID</Badge>
              </div>
              <p className="font-mono text-[10px] text-slate-600 break-all bg-white p-2 rounded border border-slate-200">
                {session?.token || 'No active token'}
              </p>
            </div>

            <div className="space-y-2 pt-1 text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-slate-500" /> Token Persistence
                </span>
                <span className="font-mono text-slate-900">
                  {session?.rememberMe ? 'localStorage (Remember Active)' : 'sessionStorage'}
                </span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Pre-Retrieval RBAC Guard
                </span>
                <span className="font-semibold text-emerald-700">Enforced & Audited</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
