import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import {
  Bell,
  Search,
  User as UserIcon,
  LogOut,
  ChevronDown,
  ShieldCheck,
  Building2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const mockNotifications = [
    { id: 1, title: 'Guardrail Warning', desc: 'Prompt injection attempt blocked on endpoint #4', time: '10m ago', unread: true },
    { id: 2, title: 'RBAC Policy Update', desc: 'Role "Auditor" granted read-only access to Finance KB', time: '1h ago', unread: true },
    { id: 3, title: 'System Security Check', desc: 'Phase 1 Security Audit completed successfully', time: '3h ago', unread: false },
  ];

  return (
    <header className="h-16 border-b border-[#1F293D] bg-[#090D16]/90 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search vectors, guardrails, security events..."
            className="w-72 bg-[#111726] border border-[#1F293D] rounded-lg pl-9 pr-4 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Phase 1 Sandbox Active</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#111726] border border-[#1F293D] text-xs text-slate-300">
          <Building2 className="w-3.5 h-3.5 text-blue-400" />
          <span className="font-semibold text-slate-200">{user?.tenant || 'Enterprise Tenant'}</span>
          <Badge variant="neutral" size="sm">{user?.role || 'Admin'}</Badge>
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#111726] transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#111726] border border-[#1F293D] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="px-4 py-3 border-b border-[#1F293D] flex items-center justify-between">
                <h4 className="text-xs font-semibold uppercase text-slate-300 tracking-wider">Security Notifications</h4>
                <Badge variant="mock" size="sm">MOCK DATA</Badge>
              </div>
              <div className="divide-y divide-[#1F293D] max-h-64 overflow-y-auto">
                {mockNotifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-[#161F33] transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-medium text-slate-200">{n.title}</h5>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{n.desc}</p>
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-[#0D1322] border-t border-[#1F293D] text-center">
                <span className="text-[11px] text-slate-400 font-mono">Phase 5 Telemetry Provider Pending</span>
              </div>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#111726] transition-colors border border-transparent hover:border-[#1F293D]"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white text-xs font-bold border border-indigo-400/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold text-slate-200 leading-tight">{user?.name || 'User'}</div>
              <div className="text-[10px] text-slate-400 leading-tight">{user?.email}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#111726] border border-[#1F293D] rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-100">
              <div className="p-3 border-b border-[#1F293D] bg-[#0D1322]">
                <p className="text-xs font-semibold text-slate-200">{user?.name}</p>
                <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[10px] font-medium text-emerald-400">Authenticated Session</span>
                </div>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors"
                >
                  <UserIcon className="w-4 h-4 text-slate-400" />
                  <span>Account & Session</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4 text-red-400" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
