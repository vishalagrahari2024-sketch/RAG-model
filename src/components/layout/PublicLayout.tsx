import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#090D16] text-slate-100 flex flex-col antialiased selection:bg-blue-500 selection:text-white">
      {/* Public Top Navbar */}
      <header className="h-20 border-b border-[#1F293D]/60 bg-[#090D16]/80 backdrop-blur-lg sticky top-0 z-50 px-6 md:px-12 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/40 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5 text-cyan-300" />
          </div>
          <div>
            <div className="font-bold text-base tracking-tight text-white flex items-center gap-2">
              Aegis Security
              <span className="text-[10px] bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded font-mono font-normal">
                Enterprise AI Governance
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono">RAG • RBAC • Guardrails • Observability</p>
          </div>
        </Link>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <Button
              variant="primary"
              size="md"
              rightIcon={<ArrowRight className="w-4 h-4" />}
              onClick={() => navigate('/dashboard')}
            >
              Go to Dashboard
            </Button>
          ) : (
            <>
              <Link to="/login" className="text-xs font-semibold text-slate-300 hover:text-white px-3 py-2 transition-colors">
                Sign In
              </Link>
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate('/register')}
              >
                Get Started
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
      <footer className="border-t border-[#1F293D] bg-[#060911] py-8 px-6 md:px-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-blue-500" />
            <span className="font-semibold text-slate-400">Aegis AI Security & RAG Governance Platform</span>
          </div>
          <p>© 2026 Enterprise AI Governance Inc. Phase 1 Architecture.</p>
        </div>
      </footer>
    </div>
  );
};
