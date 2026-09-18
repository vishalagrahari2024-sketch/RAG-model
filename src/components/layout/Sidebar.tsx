import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  FileText,
  MessageSquare,
  UploadCloud,
  ShieldCheck,
  Sliders,
  Activity,
  FileSpreadsheet,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Building
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const canUpload = user?.permissions.includes('UPLOAD');

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 1',
    },
    {
      name: 'RAG / Chat',
      path: '/chat',
      icon: <MessageSquare className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 2',
    },
    {
      name: 'Documents',
      path: '/documents',
      icon: <FileText className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 2',
    },
    ...(canUpload
      ? [
          {
            name: 'Upload Document',
            path: '/upload',
            icon: <UploadCloud className="w-4 h-4" />,
            status: 'LIVE',
            phase: 'Phase 2',
          },
        ]
      : []),
    {
      name: 'Access Control',
      path: '/access-control',
      icon: <ShieldCheck className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 3',
    },
    {
      name: 'AI Guardrails',
      path: '/guardrails',
      icon: <Sliders className="w-4 h-4" />,
      status: 'MOCK',
      phase: 'Phase 4',
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <Activity className="w-4 h-4" />,
      status: 'MOCK',
      phase: 'Phase 5',
    },
    {
      name: 'Audit Logs',
      path: '/audit-logs',
      icon: <FileSpreadsheet className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 6',
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 1',
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-white border-r border-slate-200 min-h-screen transition-all duration-200 flex flex-col justify-between relative z-20 shrink-0 select-none`}
    >
      <div>
        {/* Logo / Header */}
        <div className="h-16 px-4 border-b border-slate-200 flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white shrink-0 font-bold text-sm shadow-xs">
                <Building className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h1 className="text-xs font-bold text-slate-900 tracking-tight truncate flex items-center gap-1">
                  Apex RAG-RBAC
                </h1>
                <p className="text-[10px] text-slate-500 truncate font-mono">Enterprise Governance</p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Building className="w-4 h-4" />
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors border border-transparent"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-3 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-3 border-blue-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`
              }
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!collapsed && (
                <div className="flex items-center shrink-0">
                  {item.status === 'LIVE' ? (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-mono border border-slate-200">
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-50 text-purple-700 font-mono border border-purple-200">
                      MOCK
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Context & Logout */}
      {!collapsed ? (
        <div className="p-3 m-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Active Identity</span>
            <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
              Active
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Authorized User'}</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-[10px] bg-blue-100 text-blue-800 font-semibold px-1.5 py-0.2 rounded">
                {user?.role}
              </span>
              <span className="text-[10px] text-slate-600 font-medium">
                {user?.department}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-1">{user?.email}</p>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-1.5 pt-2 mt-2 border-t border-slate-200 text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="p-2 flex justify-center border-t border-slate-200">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-2 rounded-md text-red-600 hover:bg-red-50 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
};
