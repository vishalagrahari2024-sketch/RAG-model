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
  LogOut
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
    },
    {
      name: 'Chat',
      path: '/chat',
      icon: <MessageSquare className="w-4 h-4" />,
    },
    {
      name: 'Documents',
      path: '/documents',
      icon: <FileText className="w-4 h-4" />,
    },
    ...(canUpload
      ? [
          {
            name: 'Upload Document',
            path: '/upload',
            icon: <UploadCloud className="w-4 h-4" />,
          },
        ]
      : []),
    {
      name: 'Access Control',
      path: '/access-control',
      icon: <ShieldCheck className="w-4 h-4" />,
    },
    {
      name: 'AI Guardrails',
      path: '/guardrails',
      icon: <Sliders className="w-4 h-4" />,
      comingSoon: true,
    },
    {
      name: 'Monitoring',
      path: '/monitoring',
      icon: <Activity className="w-4 h-4" />,
      comingSoon: true,
    },
    {
      name: 'Audit Logs',
      path: '/audit-logs',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  return (
    <aside
      className={`${
        collapsed ? 'w-16' : 'w-56'
      } bg-white border-r border-gray-200 min-h-screen transition-all duration-150 flex flex-col justify-between relative z-20 shrink-0 select-none`}
    >
      <div>
        {/* Sidebar Header */}
        <div className="h-14 px-3.5 border-b border-gray-200 flex items-center justify-between">
          {!collapsed && (
<<<<<<< HEAD
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="min-w-0">
                <h1 className="text-[13px] font-semibold text-slate-900 tracking-tight truncate leading-tight">
                  APEX <span className="text-blue-600">RAG</span>
                </h1>
                <p className="text-[10px] text-slate-500 truncate tracking-[0.08em] uppercase">Enterprise Governance</p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-full flex justify-center">
              <span className="text-sm font-semibold text-slate-900 tracking-tight">
                A<span className="text-blue-600">R</span>
=======
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wide">
                Menu
>>>>>>> 107f6ad (final changes)
              </span>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 rounded text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
            title={collapsed ? 'Expand menu' : 'Collapse menu'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-0.5">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
<<<<<<< HEAD
                `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-[3px] border-blue-600'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
=======
                `flex items-center justify-between px-2.5 py-1.5 rounded-md text-xs transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
>>>>>>> 107f6ad (final changes)
                }`
              }
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>

<<<<<<< HEAD
              {!collapsed && (
                <div className="flex items-center shrink-0">
                  {item.status === 'LIVE' ? (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold tracking-wider border border-slate-200">
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[9px] px-2 py-0.5 rounded-full bg-[#f0e10d]/40 text-[#121212] font-semibold tracking-wider border border-[#f0e10d]">
                      MOCK
                    </span>
                  )}
                </div>
=======
              {!collapsed && item.comingSoon && (
                <span className="text-[10px] text-gray-500 italic">
                  (soon)
                </span>
>>>>>>> 107f6ad (final changes)
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* User Context & Simple Logout */}
      {!collapsed ? (
<<<<<<< HEAD
        <div className="p-3 m-3 rounded-xl bg-cream border border-slate-200 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-[0.12em]">Active Identity</span>
            <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Active
            </span>
          </div>

          <div>
            <p className="text-xs font-bold text-slate-900 truncate">{user?.name || 'Authorized User'}</p>
            <div className="flex items-center gap-1.5 mt-0.5 flex-wrap">
              <span className="text-[10px] bg-blue-600 text-white font-semibold px-2 py-0.5 rounded-full">
                {user?.role}
              </span>
              <span className="text-[10px] text-slate-600 font-medium">
                {user?.department}
              </span>
            </div>
            <p className="text-[10px] text-slate-500 truncate mt-1">{user?.email}</p>
          </div>

=======
        <div className="p-3 m-2 rounded-md bg-gray-50 border border-gray-200 space-y-1 text-xs">
          <p className="font-semibold text-gray-900 truncate">{user?.name || 'User'}</p>
          <p className="text-[11px] text-gray-600 truncate">{user?.role} - {user?.department}</p>
>>>>>>> 107f6ad (final changes)
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="w-full flex items-center justify-center gap-1.5 pt-1.5 mt-1 border-t border-gray-200 text-xs text-red-600 hover:text-red-700 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      ) : (
        <div className="p-2 flex justify-center border-t border-gray-200">
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="p-1.5 rounded text-red-600 hover:bg-red-50 cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  );
};
