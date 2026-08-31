import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Database,
  MessageSquare,
  ShieldAlert,
  Sliders,
  Activity,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  CheckCircle2
} from 'lucide-react';

export const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      status: 'LIVE',
      phase: 'Phase 1',
    },
    {
      name: 'Knowledge Base',
      path: '/knowledge-base',
      icon: <Database className="w-4 h-4" />,
      status: 'MOCK',
      phase: 'Phase 2',
    },
    {
      name: 'RAG / AI Chat',
      path: '/chat',
      icon: <MessageSquare className="w-4 h-4" />,
      status: 'MOCK',
      phase: 'Phase 2',
    },
    {
      name: 'Access Control',
      path: '/access-control',
      icon: <ShieldAlert className="w-4 h-4" />,
      status: 'MOCK',
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
      icon: <FileText className="w-4 h-4" />,
      status: 'MOCK',
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
        collapsed ? 'w-20' : 'w-64'
      } bg-[#090D16] border-r border-[#1F293D] min-h-screen transition-all duration-300 flex flex-col justify-between relative z-20 shrink-0 select-none`}
    >
      <div>
        <div className="h-16 px-5 border-b border-[#1F293D] flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40">
                <Shield className="w-4 h-4 text-cyan-300" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-100 tracking-tight flex items-center gap-1.5">
                  Aegis RAG
                  <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-1.5 py-0.5 rounded font-mono font-normal">
                    v1.0
                  </span>
                </h1>
                <p className="text-[10px] text-slate-400 font-mono">RBAC & Guardrails</p>
              </div>
            </div>
          )}

          {collapsed && (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 border border-indigo-400/40">
                <Shield className="w-4 h-4 text-cyan-300" />
              </div>
            </div>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#111726] transition-colors border border-transparent hover:border-[#1F293D]"
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-400 border border-blue-500/30 shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-[#111726]'
                }`
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span className="truncate">{item.name}</span>}
              </div>

              {!collapsed && (
                <div className="flex items-center gap-1.5 shrink-0">
                  {item.status === 'LIVE' ? (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                      LIVE
                    </span>
                  ) : (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/15 text-purple-300 font-mono border border-purple-500/30">
                      MOCK
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {!collapsed && (
        <div className="p-4 m-3 rounded-xl bg-[#111726] border border-[#1F293D]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Current Status</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <p className="text-xs font-semibold text-slate-200">Phase 1 Complete</p>
          <p className="text-[11px] text-slate-400 mt-1 leading-tight">
            Auth & App Shell active. RAG & Guardrail engines pending Phase 2+.
          </p>
        </div>
      )}
    </aside>
  );
};
