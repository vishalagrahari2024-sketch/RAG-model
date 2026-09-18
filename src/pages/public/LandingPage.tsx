import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import {
  Lock,
  Database,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  UserCheck,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="py-14 lg:py-18 px-6 md:px-12 max-w-5xl mx-auto w-full text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-50 border border-blue-200 text-xs text-blue-800 font-medium">
          <ShieldCheck className="w-4 h-4 text-blue-700" />
          <span>Academic Capstone & Enterprise RAG Demonstration</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Secure Enterprise RAG Platform with Role-Based Access Control (RBAC)
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          A secure internal enterprise knowledge management system where different departmental employees query AI without cross-department data leakage. Pre-retrieval RBAC strictly enforces document boundaries before vector retrieval.
        </p>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
            rightIcon={<ArrowRight className="w-4 h-4" />}
            onClick={() => navigate('/login')}
          >
            Launch Live Demo (Choose Role)
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigate('/register')}
          >
            Register Custom Account
          </Button>
        </div>

        {/* Security Rule Highlight */}
        <div className="mt-8 p-4 rounded-lg bg-amber-50/80 border border-amber-200 text-left max-w-3xl mx-auto flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-900 leading-relaxed">
            <strong className="font-semibold block mb-0.5">Core Security Principle: Pre-Retrieval RBAC Enforcement</strong>
            Access control is enforced <em>BEFORE</em> RAG retrieval. If a Finance employee asks about Manufacturing reports, unauthorized documents are filtered out at the boundary so the model never retrieves or exposes protected data.
          </div>
        </div>
      </section>

      {/* Architecture Flow Diagram */}
      <section className="py-10 bg-white border-y border-slate-200 px-6 md:px-12">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <h2 className="text-lg font-bold text-slate-900">System Architecture & Knowledge Boundary</h2>
            <p className="text-xs text-slate-500 mt-1">
              End-to-end data flow demonstrating verified authorization at each pipeline step.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-blue-100 text-blue-700 flex items-center justify-center mx-auto">
                <UserCheck className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900">1. Identity</h3>
              <p className="text-[11px] text-slate-500">Authenticated user email & token session</p>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto">
                <Lock className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900">2. RBAC Policy</h3>
              <p className="text-[11px] text-slate-500">Role + Department + Individual Perms</p>
            </div>

            <div className="p-3.5 rounded-lg border border-blue-200 bg-blue-50/50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-blue-700 text-white flex items-center justify-center mx-auto">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-blue-900">3. Pre-Filter</h3>
              <p className="text-[11px] text-blue-800">Knowledge boundary applied prior to search</p>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900">4. RAG Retrieval</h3>
              <p className="text-[11px] text-slate-500">Fetch chunks from authorized docs only</p>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-purple-100 text-purple-700 flex items-center justify-center mx-auto">
                <FileText className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900">5. Synthesis</h3>
              <p className="text-[11px] text-slate-500">Answer generated with exact citations</p>
            </div>

            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-center space-y-1.5">
              <div className="w-7 h-7 rounded-md bg-slate-200 text-slate-700 flex items-center justify-center mx-auto">
                <Building2 className="w-4 h-4" />
              </div>
              <h3 className="font-semibold text-slate-900">6. Audit Trail</h3>
              <p className="text-[11px] text-slate-500">Every query and access logged</p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Roles Grid */}
      <section className="py-12 px-6 md:px-12 max-w-5xl mx-auto w-full space-y-6">
        <div className="text-center max-w-xl mx-auto">
          <h2 className="text-lg font-bold text-slate-900">Configured Demonstration Roles</h2>
          <p className="text-xs text-slate-500 mt-1">
            Test the system by signing in as different departmental employees.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Finance Employee</span>
              <span className="px-1.5 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px]">Finance</span>
            </div>
            <p className="text-slate-500 text-[11px]">Rahul Sharma</p>
            <ul className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> View Finance docs</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ask Finance RAG</li>
              <li className="flex items-center gap-1 text-red-600">✕ Blocked from Mfg docs</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Mfg Employee</span>
              <span className="px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 font-mono text-[10px]">Manufacturing</span>
            </div>
            <p className="text-slate-500 text-[11px]">Amit Verma</p>
            <ul className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> View Mfg reports & SOPs</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Ask Production RAG</li>
              <li className="flex items-center gap-1 text-red-600">✕ Blocked from Finance docs</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Finance Manager</span>
              <span className="px-1.5 py-0.5 rounded bg-purple-50 text-purple-700 font-mono text-[10px]">Manager</span>
            </div>
            <p className="text-slate-500 text-[11px]">Priya Patel</p>
            <ul className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> View department docs</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Edit & upload docs</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Department-level analytics</li>
            </ul>
          </div>

          <div className="p-4 rounded-lg bg-white border border-slate-200 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">CEO / Executive</span>
              <span className="px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 font-mono text-[10px]">Executive</span>
            </div>
            <p className="text-slate-500 text-[11px]">Vikram Malhotra</p>
            <ul className="space-y-1 text-[11px] text-slate-600 pt-1 border-t border-slate-100">
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Company-wide view</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Cross-department RAG</li>
              <li className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Executive overview dashboard</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};
