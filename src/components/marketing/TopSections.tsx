import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Lock, Database, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Button } from '../common/Button';
import { ArtTile, BrowserMock, StarCluster, StarRating } from './Graphics';

/* ---------------------------------------------------------------- Hero */

export const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-paper">
      {/* soft background furniture */}
      <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" aria-hidden="true" />
      <div className="absolute top-40 right-0 h-72 w-72 rounded-full bg-[#f0e10d]/25 blur-3xl" aria-hidden="true" />
      <StarCluster className="absolute right-6 top-8 hidden w-40 text-blue-200 lg:block" color="#c7d7fe" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-16 pt-12 md:px-10 lg:grid-cols-12 lg:pb-24 lg:pt-16">
        {/* Copy */}
        <div className="lg:col-span-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-3.5 py-1.5 text-[11px] font-semibold text-blue-800 shadow-xs">
            <ShieldCheck className="h-3.5 w-3.5 text-blue-700" />
            Academic Capstone &amp; Enterprise RAG Demonstration
          </div>

          <h1 className="display-heading mt-5 text-[2.6rem] leading-[1.02] text-[#121212] sm:text-6xl xl:text-[4.25rem]">
            Smart, Secure AI Answers That <span className="text-blue-700">Respect Every Permission</span>
          </h1>

          <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600 md:text-lg">
            A secure internal knowledge platform where departmental employees query AI without cross-department data
            leakage. Pre-retrieval RBAC enforces document boundaries <strong className="text-[#121212]">before</strong>{' '}
            vector retrieval — so the model never sees what you can't.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button
              variant="primary"
              size="lg"
              className="pill-btn rounded-full bg-blue-700 hover:bg-blue-800 border-0 px-7 shadow-lg shadow-blue-700/25"
              rightIcon={<ArrowRight className="h-4 w-4" />}
              onClick={() => navigate('/login')}
            >
              Launch Live Demo
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="pill-btn rounded-full border-slate-300 bg-white px-7 text-[#121212] hover:border-blue-400"
              onClick={() => navigate('/register')}
            >
              Register Custom Account
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <StarRating />
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              5 pre-seeded roles · 1-click switching
            </span>
          </div>

          {/* Core security principle callout */}
          <div className="mt-8 flex max-w-2xl items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
            <div className="text-xs leading-relaxed text-amber-900">
              <strong className="mb-0.5 block font-bold">Core Security Principle: Pre-Retrieval RBAC Enforcement</strong>
              Access control runs <em>before</em> retrieval. A Finance employee asking about Manufacturing reports is
              blocked at the boundary — unauthorized documents never reach the model.
            </div>
          </div>
        </div>

        {/* Visual */}
        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-xl">
            <div className="relative z-10 rounded-3xl border border-slate-200 bg-white p-4 shadow-2xl shadow-slate-900/10">
              <div className="flex items-center justify-between px-1 pb-3">
                <span className="eyebrow text-[10px] text-slate-400">RAG Assistant · Finance Clearance</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> RBAC Active
                </span>
              </div>

              <div className="space-y-3">
                <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-md bg-blue-700 px-4 py-2.5 text-xs text-white">
                  What were the Q3 operating margins for the Finance department?
                </div>
                <div className="max-w-[92%] rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3 text-xs text-slate-700">
                  <p className="mb-2 leading-relaxed">
                    Q3 operating margin finished at <strong>18.4%</strong>, up 2.1 pts QoQ, driven by lower freight
                    spend and improved collections.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      Finance_Q3_Report.pdf · §4.2
                    </span>
                    <span className="rounded-md border border-blue-200 bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                      Margin_Overview.docx · §1
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-[11px] text-red-700">
                  <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                  <span>
                    <strong>Pre-retrieval block:</strong> 14 Manufacturing chunks excluded before similarity search.
                  </span>
                </div>
              </div>
            </div>

            {/* floating stat chips */}
            <div className="animate-float-slow absolute -left-4 -bottom-6 z-20 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Avg. latency</p>
              <p className="display-heading text-2xl text-[#121212]">1.8s</p>
            </div>
            <div className="animate-float-slow absolute -right-3 top-16 z-20 hidden rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-xl sm:block" style={{ animationDelay: '1.5s' }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Access violations</p>
              <p className="display-heading text-2xl text-red-600">Blocked</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* -------------------------------------------------------- Value cards */

const valueCards = [
  {
    art: 'stars' as const,
    tile: 'bg-blue-600',
    title: 'Answers that click',
    text: 'Every response is grounded in real document chunks — with citations you can open and verify.',
    to: '/chat',
  },
  {
    art: 'shield' as const,
    tile: 'bg-[#121212]',
    title: 'Locked by role',
    text: 'Pre-retrieval filtering prunes the knowledge base before the search ever runs. No leakage, ever.',
    to: '/access-control',
  },
  {
    art: 'rings' as const,
    tile: 'bg-blue-400',
    title: 'Made to grow',
    text: 'Add departments, roles and clearance scopes without re-architecting your retrieval pipeline.',
    to: '/documents',
  },
  {
    art: 'grid' as const,
    tile: 'bg-[#f0e10d]',
    title: 'Docs that convert',
    text: 'Upload, chunk, tag and bind RBAC policies — knowledge ready for retrieval in seconds.',
    to: '/upload',
    tone: '#121212',
  },
];

export const ValueStrip: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-5 py-12 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:py-16">
        {valueCards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.to)}
            className="card-lift group rounded-2xl border border-slate-200 bg-white p-4 text-left"
          >
            <div className={`relative h-32 overflow-hidden rounded-xl ${card.tile}`}>
              <ArtTile variant={card.art} className="h-full w-full" tone={(card as { tone?: string }).tone ?? '#ffffff'} />
            </div>
            <h3 className="display-heading mt-4 text-lg text-[#121212]">{card.title}</h3>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{card.text}</p>
            <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
              Explore <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

/* ----------------------------------------------------------- Trust band */

const departments = [
  'Finance',
  'Manufacturing',
  'Human Resources',
  'Executive',
  'Information Technology',
  'Compliance',
  'Legal',
  'Operations',
];

const stats = [
  { value: '5', label: 'Pre-seeded demo roles' },
  { value: '6', label: 'Active departments' },
  { value: '4', label: 'Permission actions' },
  { value: '0', label: 'Cross-department leaks' },
];

export const TrustBand: React.FC = () => (
  <section className="relative overflow-hidden bg-[#121212] text-white">
    <div className="absolute inset-0 star-pattern-dark" aria-hidden="true" />
    <div className="relative mx-auto max-w-7xl px-5 md:px-10">
      <div className="mx-auto max-w-3xl py-14 text-center lg:py-20">
        <p className="eyebrow text-[11px] text-blue-300">Built for every department</p>
        <h2 className="display-heading mt-3 text-3xl md:text-5xl">
          Governed for Access, <span className="text-[#f0e10d]">Engineered for Trust</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-white/70 md:text-base">
          Your knowledge base should be more than searchable — it should be safe. Every department gets its own
          clearance boundary, enforced by the platform, not by policy documents.
        </p>
      </div>

      {/* department marquee */}
      <div className="relative overflow-hidden pb-12" role="presentation">
        <div className="flex w-max animate-marquee gap-4">
          {[...departments, ...departments].map((dept, i) => (
            <div
              key={`${dept}-${i}`}
              className="flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full border border-white/15 bg-white/5 text-center text-[10px] font-bold uppercase tracking-wide text-white/80 backdrop-blur"
            >
              <Database className="mb-1 h-4 w-4 text-blue-300" />
              <span className="px-2 leading-tight">{dept}</span>
            </div>
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#121212] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#121212] to-transparent" />
      </div>

      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-[#121212] px-6 py-8 text-center">
            <p className="display-heading text-4xl text-white md:text-5xl">{s.value}</p>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-white/55">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-6 py-14 lg:flex-row lg:justify-between">
        <div className="flex items-center gap-4">
          <FileText className="h-9 w-9 shrink-0 text-blue-400" />
          <p className="max-w-md text-sm text-white/70">
            From ingestion to citation, the full pipeline is logged into an immutable audit ledger.
          </p>
        </div>
        <BrowserMock className="w-full max-w-sm" accent="#3b82f6" title="apex-enterprise.ai/audit-logs" />
      </div>
    </div>
  </section>
);
