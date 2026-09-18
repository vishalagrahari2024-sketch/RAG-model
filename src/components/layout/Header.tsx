import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';
import {
  Bell,
  Search,
  User as UserIcon,
  LogOut,
  ChevronDown,
  Building2,
  ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: 'RBAC Enforcement', desc: `Clearance restricted to ${user?.accessibleDepartments.join(', ')} documents`, time: '10m ago' },
    { id: 2, title: 'Security Audit Active', desc: 'Pre-retrieval verification active for all RAG sessions', time: '1h ago' },
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search authorized knowledge, documents, audit logs..."
            className="w-80 bg-slate-50 border border-slate-300 rounded-md pl-9 pr-3 py-1.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/30 focus:border-blue-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs text-slate-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="font-medium text-[11px]">RBAC Active</span>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3">
        {/* Tenant & Clearance Info */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-50 border border-slate-200 text-xs">
          <Building2 className="w-3.5 h-3.5 text-blue-700" />
          <span className="font-semibold text-slate-800">{user?.tenant || 'Apex Global Industries'}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">{user?.department}</span>
          <Badge variant="info" size="sm">{user?.role}</Badge>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            className="relative p-2 rounded-md text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <h4 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">System Notifications</h4>
                <Badge variant="neutral" size="sm">Audit Feed</Badge>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-medium text-slate-900">{n.title}</h5>
                      <span className="text-[10px] text-slate-400">{n.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1.5 rounded-md hover:bg-slate-100 transition-colors border border-transparent"
          >
            <div className="w-7 h-7 rounded-md bg-blue-700 flex items-center justify-center text-white text-xs font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold text-slate-900 leading-tight">{user?.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{user?.role} • {user?.department}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-lg shadow-lg overflow-hidden z-50">
              <div className="p-3 border-b border-slate-200 bg-slate-50">
                <p className="text-xs font-semibold text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] font-medium text-emerald-700">Clearance: {user?.accessibleDepartments.join(', ')}</span>
                </div>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                >
                  <UserIcon className="w-3.5 h-3.5 text-slate-500" />
                  <span>Account & Profile</span>
                </button>
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    logout();
                    navigate('/login');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-600 hover:bg-red-50 rounded-md transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
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
