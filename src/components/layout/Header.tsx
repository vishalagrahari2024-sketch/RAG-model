import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Header: React.FC = () => {
  const { user, logout, login } = useAuth();
  const navigate = useNavigate();

  const handleRoleSwitch = async (email: string, pass: string) => {
    try {
      await login({ email, password: pass, rememberMe: true });
    } catch (e) {
      console.error(e);
    }
  };

  return (
<<<<<<< HEAD
    <header className="h-16 border-b border-slate-200 bg-white/95 backdrop-blur sticky top-0 z-30 px-6 flex items-center justify-between">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:flex items-center">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search authorized knowledge, documents, audit logs..."
            className="w-80 bg-slate-50 border border-slate-300 rounded-none pl-9 pr-3 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/25 focus:border-blue-600 transition-colors"
          />
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-xs text-blue-700">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
          <span className="font-semibold text-[11px]">RBAC Active</span>
        </div>
=======
    <header className="h-14 border-b border-gray-200 bg-white sticky top-0 z-30 px-5 flex items-center justify-between">
      {/* Left: Project Title */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-bold text-gray-900 tracking-tight">
          Secure RAG with RBAC
        </h1>
        <span className="text-xs text-gray-400">|</span>
        <span className="text-xs text-gray-600 hidden sm:inline">
          College Project
        </span>
>>>>>>> 107f6ad (final changes)
      </div>

      {/* Right: User Information & Role Switcher */}
      <div className="flex items-center gap-3">
<<<<<<< HEAD
        {/* Tenant & Clearance Info */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs">
          <Building2 className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold text-slate-800 tracking-tight">{user?.tenant || 'Apex Global Industries'}</span>
          <span className="text-slate-300">|</span>
          <span className="text-slate-600">{user?.department}</span>
          <Badge variant="info" size="sm">{user?.role}</Badge>
=======
        {/* Quick Role Switcher for Evaluation */}
        <div className="flex items-center gap-1.5 text-xs text-gray-600">
          <span className="hidden md:inline text-gray-500">Switch Role:</span>
          <select
            value={user?.email || ''}
            onChange={(e) => {
              if (e.target.value === 'finance.employee@demo-company.com') {
                handleRoleSwitch('finance.employee@demo-company.com', 'Finance123!');
              } else if (e.target.value === 'manufacturing.employee@demo-company.com') {
                handleRoleSwitch('manufacturing.employee@demo-company.com', 'Mfg123!');
              } else if (e.target.value === 'finance.manager@demo-company.com') {
                handleRoleSwitch('finance.manager@demo-company.com', 'Manager123!');
              } else if (e.target.value === 'ceo@demo-company.com') {
                handleRoleSwitch('ceo@demo-company.com', 'Ceo123!');
              }
            }}
            className="bg-white border border-gray-300 rounded px-2 py-1 text-xs text-gray-800 focus:outline-none focus:border-blue-600 cursor-pointer"
            title="Quick Role Switcher for Project Evaluation"
          >
            <option value="finance.employee@demo-company.com">Rahul (Finance Employee)</option>
            <option value="manufacturing.employee@demo-company.com">Amit (Mfg Employee)</option>
            <option value="finance.manager@demo-company.com">Priya (Finance Manager)</option>
            <option value="ceo@demo-company.com">Vikram (CEO - All Access)</option>
          </select>
>>>>>>> 107f6ad (final changes)
        </div>

        {/* User Profile Info */}
        <div className="flex items-center gap-2 pl-2 border-l border-gray-200 text-xs">
          <div className="hidden sm:block text-right">
            <span className="font-semibold text-gray-900 block">{user?.name}</span>
            <span className="text-gray-500 text-[11px] block">{user?.role} ({user?.department})</span>
          </div>

          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
<<<<<<< HEAD
            className="relative p-2 rounded-full text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            title="Notifications"
=======
            className="px-2.5 py-1 text-xs border border-gray-300 rounded hover:bg-gray-50 text-gray-700 cursor-pointer transition-colors"
>>>>>>> 107f6ad (final changes)
          >
            Logout
          </button>
<<<<<<< HEAD

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-slate-200 flex items-center justify-between bg-cream">
                <h4 className="text-[11px] font-semibold text-slate-800 uppercase tracking-[0.12em]">System Notifications</h4>
                <Badge variant="neutral" size="sm">Audit Feed</Badge>
              </div>
              <div className="divide-y divide-slate-100 max-h-64 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-2">
                      <h5 className="text-xs font-semibold tracking-tight text-slate-900">{n.title}</h5>
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
            className="flex items-center gap-2 p-1.5 pr-2.5 rounded-full hover:bg-slate-100 transition-colors border border-slate-200"
          >
            <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="text-left hidden lg:block">
              <div className="text-xs font-semibold tracking-tight text-slate-900 leading-tight">{user?.name}</div>
              <div className="text-[10px] text-slate-500 leading-tight">{user?.role} • {user?.department}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-xl shadow-2xl overflow-hidden z-50">
              <div className="p-3 border-b border-slate-200 bg-cream">
                <p className="text-xs font-semibold tracking-tight text-slate-900">{user?.name}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email}</p>
                <div className="mt-1.5 flex items-center gap-1">
                  <ShieldCheck className="w-3.3 h-3.3 text-emerald-600" />
                  <span className="text-[10px] font-medium text-emerald-700">Clearance: {user?.accessibleDepartments.join(', ')}</span>
                </div>
              </div>
              <div className="p-1">
                <button
                  onClick={() => {
                    setShowUserMenu(false);
                    navigate('/settings');
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
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
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
=======
>>>>>>> 107f6ad (final changes)
        </div>
      </div>
    </header>
  );
};
