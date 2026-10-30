import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
<<<<<<< HEAD
import {
  Lock,
  Database,
  ArrowRight,
  ShieldCheck,
  Building2,
  FileText,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { HeroSection, ValueStrip, TrustBand } from '../../components/marketing/TopSections';
import { ModulesSection, ProcessSection, TestimonialsSection, UseCasesSection } from '../../components/marketing/MidSections';
import { InsightsSection, CtaBanner } from '../../components/marketing/BottomSections';
=======


>>>>>>> 107f6ad (final changes)

/* --------------------------------------------------- Architecture flow */

const flow = [
  { icon: UserCheck, title: '1. Identity', desc: 'Authenticated user email & token session', tone: 'bg-blue-50 text-blue-700 border-blue-100' },
  { icon: Lock, title: '2. RBAC Policy', desc: 'Role + Department + Individual Perms', tone: 'bg-slate-100 text-slate-700 border-slate-200' },
  { icon: ShieldCheck, title: '3. Pre-Filter', desc: 'Knowledge boundary applied prior to search', tone: 'bg-blue-600 text-white border-blue-600', highlight: true },
  { icon: Database, title: '4. RAG Retrieval', desc: 'Fetch chunks from authorized docs only', tone: 'bg-blue-100 text-blue-800 border-blue-200' },
  { icon: FileText, title: '5. Synthesis', desc: 'Answer generated with exact citations', tone: 'bg-[#f0e10d]/40 text-[#121212] border-[#f0e10d]' },
  { icon: Building2, title: '6. Audit Trail', desc: 'Every query and access logged', tone: 'bg-slate-100 text-slate-700 border-slate-200' },
];

const ArchitectureSection: React.FC = () => (
  <section className="border-b border-slate-200 bg-white px-5 py-16 md:px-10 lg:py-20">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-[11px] text-blue-700">System Architecture</p>
        <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-4xl">The knowledge boundary, end to end</h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600">
          Verified authorization at every pipeline step — the filter at position three is what makes the rest safe.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
        {flow.map(({ icon: Icon, title, desc, tone, highlight }) => (
          <div
            key={title}
            className={`card-lift rounded-2xl border p-5 text-center ${tone} ${
              highlight ? 'shadow-lg shadow-blue-700/20' : ''
            }`}
          >
            <div className={`mx-auto grid h-10 w-10 place-items-center rounded-xl ${highlight ? 'bg-white/20' : 'bg-white/70'}`}>
              <Icon className="h-5 w-5" />
            </div>
            <h3 className={`mt-3 text-sm font-bold ${highlight ? 'text-white' : 'text-[#121212]'}`}>{title}</h3>
            <p className={`mt-1 text-[11px] leading-relaxed ${highlight ? 'text-blue-100' : 'opacity-75'}`}>{desc}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ---------------------------------------------------------- Demo roles */

type DemoRole = {
  role: string;
  dept: string;
  deptTone: string;
  person: string;
  allowed: string[];
  blocked: string;
  email: string;
};

const demoRoles: DemoRole[] = [
  {
    role: 'Finance Employee',
    dept: 'Finance',
    deptTone: 'bg-blue-50 text-blue-700 border-blue-200',
    person: 'Rahul Sharma',
    allowed: ['View Finance docs', 'Ask Finance RAG'],
    blocked: 'Blocked from Manufacturing docs',
    email: 'finance.employee@demo-company.com',
  },
  {
    role: 'Mfg Employee',
    dept: 'Manufacturing',
    deptTone: 'bg-amber-50 text-amber-800 border-amber-200',
    person: 'Amit Verma',
    allowed: ['View Mfg reports & SOPs', 'Ask Production RAG'],
    blocked: 'Blocked from Finance docs',
    email: 'manufacturing.employee@demo-company.com',
  },
  {
    role: 'Finance Manager',
    dept: 'Manager',
    deptTone: 'bg-slate-100 text-slate-700 border-slate-200',
    person: 'Priya Patel',
    allowed: ['View department docs', 'Edit & upload docs', 'Department analytics'],
    blocked: 'Scoped to Finance department',
    email: 'finance.manager@demo-company.com',
  },
  {
    role: 'CEO / Executive',
    dept: 'Executive',
    deptTone: 'bg-teal-50 text-teal-700 border-teal-200',
    person: 'Vikram Malhotra',
    allowed: ['Company-wide view', 'Cross-department RAG', 'Executive dashboard'],
    blocked: 'All actions fully audited',
    email: 'ceo@demo-company.com',
  },
];

const DemoRolesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
<<<<<<< HEAD
    <section className="bg-white px-5 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-[11px] text-blue-700">Try it yourself</p>
          <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">Configured demonstration roles</h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            Sign in as different departmental employees and compare authorized results against pre-retrieval blocks.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {demoRoles.map((r) => (
            <div key={r.email} className="card-lift flex flex-col rounded-2xl border border-slate-200 bg-[#f8fafc] p-5">
              <div className="flex items-start justify-between gap-2">
                <span className="text-sm font-bold text-[#121212]">{r.role}</span>
                <span className={`shrink-0 rounded-md border px-1.5 py-0.5 text-[10px] font-bold ${r.deptTone}`}>{r.dept}</span>
              </div>
              <p className="mt-1 text-xs text-slate-500">{r.person}</p>

              <ul className="mt-3 flex-1 space-y-1.5 border-t border-slate-200 pt-3 text-xs text-slate-600">
                {r.allowed.map((a) => (
                  <li key={a} className="flex items-start gap-1.5">
                    <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                    {a}
                  </li>
                ))}
                <li className="flex items-start gap-1.5 text-red-600">
                  <span className="mt-0.5 text-[11px]">✕</span>
                  {r.blocked}
                </li>
              </ul>

              <button
                onClick={() => navigate('/login')}
                className="mt-4 inline-flex items-center justify-center gap-1.5 rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-bold text-[#121212] hover:border-blue-400 hover:text-blue-700 transition-colors"
              >
                Sign in as {r.person.split(' ')[0]} <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button
            variant="primary"
            size="lg"
            className="pill-btn rounded-full bg-blue-700 hover:bg-blue-800 border-0 px-8"
            rightIcon={<ArrowRight className="h-4 w-4" />}
=======
    <div className="flex-1 flex flex-col bg-[#fafafa]">
      {/* Hero Section */}
      <section className="py-10 px-5 max-w-4xl mx-auto w-full text-center space-y-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
          Secure RAG with Role-Based Access Control
        </h1>

        <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed">
          A college project demonstrating how pre-retrieval authorization filters enterprise documents before vector search, ensuring users only retrieve information cleared for their role.
        </p>

        <div className="pt-2 flex flex-row items-center justify-center gap-3">
          <Button
            variant="primary"
            size="md"
>>>>>>> 107f6ad (final changes)
            onClick={() => navigate('/login')}
          >
            Go to Demo
          </Button>
<<<<<<< HEAD
        </div>
      </div>
    </section>
=======
          <Button
            variant="secondary"
            size="md"
            onClick={() => navigate('/register')}
          >
            Register
          </Button>
        </div>

        {/* Security Rule Highlight */}
        <div className="mt-4 p-3.5 rounded-md bg-white border border-gray-200 text-left max-w-2xl mx-auto text-xs space-y-1">
          <strong className="font-semibold text-gray-900 block">
            Core Project Principle: Pre-Retrieval RBAC
          </strong>
          <p className="text-gray-600 leading-relaxed">
            Access control is verified <em>before</em> document similarity search. If a Finance employee queries Manufacturing data, the system stops the query before retrieval, preventing data exposure to the LLM.
          </p>
        </div>
      </section>
    </div>
>>>>>>> 107f6ad (final changes)
  );
};

/* ------------------------------------------------------------- Page */

export const LandingPage: React.FC = () => (
  <div className="flex-1 flex flex-col bg-paper">
    <HeroSection />
    <ValueStrip />
    <ArchitectureSection />
    <TrustBand />
    <ModulesSection />
    <DemoRolesSection />
    <ProcessSection />
    <TestimonialsSection />
    <UseCasesSection />
    <InsightsSection />
    <CtaBanner />
  </div>
);

export default LandingPage;
