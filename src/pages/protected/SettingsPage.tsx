import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { StatusBanner } from '../../components/common/StatusBanner';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { User, Shield, Key, Building2, Calendar, HardDrive, LogOut, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SettingsPage: React.FC = () => {
  const { user, session, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <StatusBanner
        status="IMPLEMENTED"
        phase="Phase 1 Foundation"
        title="User Account & Session Management Settings"
        description="Inspect active session credentials, tenant metadata, and authenticated profile configuration."
      />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-blue-400" />
            Account & System Configuration
          </h2>
          <p className="text-xs text-slate-400">
            View active user profile, tenant ownership, and session state.
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
        <Card title="Authenticated User Profile">
          <div className="space-y-4 text-xs">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-[#0D1322] border border-[#1F293D]">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div>
                <h3 className="font-bold text-sm text-slate-100">{user?.name}</h3>
                <p className="text-slate-400">{user?.email}</p>
                <div className="mt-1 flex items-center gap-2">
                  <Badge variant="info" size="sm">{user?.role}</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5"><Building2 className="w-3.5 h-3.5 text-blue-400" /> Enterprise Tenant</span>
                <span className="font-semibold text-slate-200">{user?.tenant}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-indigo-400" /> Account Identifier</span>
                <span className="font-mono text-slate-300 text-[11px]">{user?.id}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-emerald-400" /> Registered Date</span>
                <span className="font-mono text-slate-300 text-[11px]">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Session Metadata Card */}
        <Card title="Active Auth Session Inspector">
          <div className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#0D1322] border border-[#1F293D] space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-cyan-400" /> Session Token
                </span>
                <Badge variant="success" size="sm">VALID</Badge>
              </div>
              <p className="font-mono text-[10px] text-slate-400 break-all bg-slate-900 p-2 rounded border border-slate-800">
                {session?.token || 'No active token'}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800">
                <span className="text-slate-400 flex items-center gap-1.5"><HardDrive className="w-3.5 h-3.5 text-purple-400" /> Session Persistence</span>
                <span className="font-mono text-slate-200">{session?.rememberMe ? 'localStorage (Remember Me Active)' : 'sessionStorage'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400 flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Auth Service State</span>
                <span className="font-semibold text-emerald-400">Authenticated & Guarded</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
