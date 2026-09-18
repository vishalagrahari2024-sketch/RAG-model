import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Building2, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Public Top Navbar */}
      <header className="h-16 border-b border-slate-200 bg-white sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md bg-blue-700 flex items-center justify-center text-white shadow-xs">
            <Building2 className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
              Apex Enterprise RAG & RBAC
              <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.2 rounded font-mono font-medium">
                Academic Demonstration
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-mono">Role-Based Access Control • Pre-Retrieval Filter</p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="primary"
              size="sm"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/dashboard')}
            >
              Open Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-xs font-semibold text-slate-700 hover:text-blue-700 px-2.5 py-1.5 transition-colors">
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 px-6 md:px-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            <span className="font-semibold text-slate-700">Secure Enterprise RAG Platform with RBAC</span>
          </div>
          <p>© 2026 Apex Global Industries • Designed for Enterprise Role-Based Knowledge Governance</p>
        </div>
      </footer>
    </div>
  );
};
