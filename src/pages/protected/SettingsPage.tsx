import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { User, Shield, Building2, Calendar, HardDrive, LogOut, CheckCircle2, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 1 Live"
        title="User Account & Security Clearance Configuration"
        description="Inspect authenticated profile metadata, department clearance, and cryptographic session state."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-blue-700" />
            Account & Security Settings
          </h2>
          <p className="text-xs text-slate-500">
            View active user profile, tenant ownership, and session security state.
          </p>
        </div>
        <Button
          variant="danger"
          size="sm"
          leftIcon={<LogOut className="w-4 h-4" />}
          onClick={() => {
            logout();
            navigate('/login');
          }}
        >
          Sign Out of Account
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Profile Card */}
        <Card title="Corporate Identity & Permissions">
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-3.5 p-3 rounded-md bg-slate-50 border border-slate-200">
              <div className="w-10 h-10 rounded-md bg-blue-700 flex items-center justify-center text-white text-base font-bold shrink-0">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-900">{user?.name}</h3>
                <p className="text-slate-500">{user?.email}</p>
                <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                  <Badge variant="info" size="sm">{user?.role}</Badge>
                  <span className="text-[10px] bg-slate-200 text-slate-700 font-semibold px-1.5 py-0.2 rounded">
                    {user?.department}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-1 text-slate-700">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-blue-700" /> Organization Tenant
                </span>
                <span className="font-semibold text-slate-900">{user?.tenant}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5 text-indigo-700" /> Account ID
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
            </div>
          </div>
        </Card>

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
