import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  Lock,
  Activity,
  Database,
  Sliders,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  FileCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col bg-[#090D16] overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111726] border border-blue-500/30 text-xs text-blue-400 font-medium shadow-lg shadow-blue-500/10">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span>Next-Generation Enterprise RAG Governance</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300 font-mono">Phase 1 Live</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Secure RAG Pipelines with <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent">Zero Compromise</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-400 leading-relaxed font-normal">
            Unify Retrieval-Augmented Generation, Fine-Grained Role-Based Access Control, Real-Time AI Safety Guardrails, and Observability in one secure enterprise SaaS shell.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight className="w-5 h-5" />}
              onClick={() => navigate('/register')}
              className="w-full sm:w-auto"
            >
              Start Free Demo Session
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/login')}
              className="w-full sm:w-auto"
            >
              Sign In to Platform
            </Button>
          </div>

          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 text-left border-t border-[#1F293D]/80 mt-12">
            <div className="p-4 rounded-xl bg-[#111726]/60 border border-[#1F293D]">
              <div className="text-2xl font-bold text-white font-mono">100%</div>
              <div className="text-xs text-slate-400 mt-0.5">Isolated Multi-Tenant Security</div>
            </div>
            <div className="p-4 rounded-xl bg-[#111726]/60 border border-[#1F293D]">
              <div className="text-2xl font-bold text-cyan-400 font-mono">&lt; 15ms</div>
              <div className="text-xs text-slate-400 mt-0.5">Guardrail Overhead</div>
            </div>
            <div className="p-4 rounded-xl bg-[#111726]/60 border border-[#1F293D]">
              <div className="text-2xl font-bold text-indigo-400 font-mono">SOC 2</div>
              <div className="text-xs text-slate-400 mt-0.5">Compliance Ready Standard</div>
            </div>
            <div className="p-4 rounded-xl bg-[#111726]/60 border border-[#1F293D]">
              <div className="text-2xl font-bold text-emerald-400 font-mono">6-Phase</div>
              <div className="text-xs text-slate-400 mt-0.5">Incremental Roadmap</div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Pillars */}
      <section className="py-16 bg-[#060911] border-y border-[#1F293D] px-6 md:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white">Enterprise AI Security Modules</h2>
            <p className="text-sm text-slate-400 mt-2">
              Architected for high-compliance healthcare, finance, and enterprise environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1F293D] hover:border-blue-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Contextual RAG Engine</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Hybrid dense & sparse vector retrieval with strict document provenance tracking and citation validation.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Badge variant="mock" size="sm">Phase 2 Target</Badge>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1F293D] hover:border-indigo-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">RBAC Authorization</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Document-level and vector chunk-level access control enforced dynamically at retrieval time.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Badge variant="mock" size="sm">Phase 3 Target</Badge>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1F293D] hover:border-cyan-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-4">
                  <Sliders className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">AI Guardrails & PII</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Real-time prompt injection detection, PII redaction, and toxicity filtering before LLM generation.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Badge variant="mock" size="sm">Phase 4 Target</Badge>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-[#111726] border border-[#1F293D] hover:border-emerald-500/50 transition-all flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4">
                  <Activity className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white">Observability & Costs</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  End-to-end trace logging, token expenditure tracking, latency breakdown, and security audit logs.
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <Badge variant="mock" size="sm">Phase 5 Target</Badge>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 px-6 md:px-12 max-w-7xl mx-auto w-full text-center">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">
          Architected Against Global Enterprise Security Standards
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-12 opacity-80">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111726] border border-[#1F293D] text-xs text-slate-300">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="font-semibold">SOC 2 Type II</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111726] border border-[#1F293D] text-xs text-slate-300">
            <FileCheck className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold">ISO / IEC 27001</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111726] border border-[#1F293D] text-xs text-slate-300">
            <Lock className="w-4 h-4 text-cyan-400" />
            <span className="font-semibold">HIPAA Compliant Vault</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#111726] border border-[#1F293D] text-xs text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold">GDPR Data Sovereignty</span>
          </div>
        </div>
      </section>
    </div>
  );
};
