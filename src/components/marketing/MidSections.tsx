import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  MessageSquareText,
  FolderLock,
  ShieldAlert,
  KeyRound,
  ScrollText,
  Activity,
  Quote,
} from 'lucide-react';
import { ArtTile, BrowserMock, StarCluster } from './Graphics';

/* ------------------------------------------------------- Platform modules */

const modules = [
  {
    icon: MessageSquareText,
    title: 'RAG\nAssistant',
    text: 'Ask questions in plain language and get grounded answers with document, section and snippet citations.',
    to: '/chat',
  },
  {
    icon: FolderLock,
    title: 'Document\nVault',
    text: 'A permission-aware archive with view, edit and delete controls wired directly to organizational roles.',
    to: '/documents',
  },
  {
    icon: ShieldAlert,
    title: 'AI\nGuardrails',
    text: 'Prompt-injection defense, PII masking and output validation controls for every model interaction.',
    to: '/guardrails',
  },
  {
    icon: KeyRound,
    title: 'Access\nControl',
    text: 'Roles, home departments and fine-grained VIEW / UPLOAD / EDIT / DELETE / RAG permissions in one matrix.',
    to: '/access-control',
  },
  {
    icon: ScrollText,
    title: 'Audit\nLedger',
    text: 'A live, filterable trail of every authentication event, document action and query — allowed or denied.',
    to: '/audit-logs',
  },
  {
    icon: Activity,
    title: 'Monitoring\n& Telemetry',
    text: 'Query volume, latency, retrieved documents and access violations visualized for administrators.',
    to: '/monitoring',
  },
];

export const ModulesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="platform" className="scroll-mt-24 bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 lg:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow text-[11px] text-blue-700">Our services</p>
          <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">
            Platform modules that work together
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
            We bring together identity, retrieval, and audit into a single stack — so security is part of the pipeline,
            not a layer on top of it.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {modules.map(({ icon: Icon, title, text, to }, idx) => (
            <button
              key={title}
              onClick={() => navigate(to)}
              className="card-lift group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 text-left"
            >
              <div className="flex items-start justify-between">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700 group-hover:bg-blue-700 group-hover:text-white transition-colors">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="eyebrow text-[10px] text-slate-300">0{idx + 1}</span>
              </div>
              <h3 className="display-heading mt-5 whitespace-pre-line text-xl text-[#121212]">{title}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-600">{text}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
                More
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ------------------------------------------------------------ Our process */

const steps = [
  {
    n: '01',
    title: 'Identity & Role Mapping',
    lead: 'We begin with who you are: email identity, organizational role, home department and clearance scope.',
    body: 'Through mapping questions — which teams own which knowledge, who may edit, who may only read — we build the permission graph that every later stage depends on.',
    art: 'shield' as const,
    tile: 'bg-blue-600',
  },
  {
    n: '02',
    title: 'Ingestion & Chunking',
    lead: 'Documents are parsed, split into factual chunks and bound to RBAC tags at upload time.',
    body: 'Each chunk inherits its department and access scope, so filtering later is a matter of set operations — not runtime guesswork.',
    art: 'grid' as const,
    tile: 'bg-[#121212]',
  },
  {
    n: '03',
    title: 'Pre-Retrieval Filter',
    lead: 'The knowledge base is pruned to the caller’s authorized departments before similarity search runs.',
    body: 'Unauthorized chunks are excluded at the boundary. The model is never queried with data the user cannot see — this is the core security guarantee.',
    art: 'rings' as const,
    tile: 'bg-blue-400',
  },
  {
    n: '04',
    title: 'Grounded Generation',
    lead: 'Answers are synthesized from retrieved chunks only, then validated and returned with exact citations.',
    body: 'Every claim maps back to a document name, section and snippet, so reviewers can verify the response instead of trusting it.',
    art: 'stars' as const,
    tile: 'bg-[#f0e10d]',
    tone: '#121212',
  },
  {
    n: '05',
    title: 'Audit & Continuous Support',
    lead: 'Allowed and denied events stream into an immutable ledger with CSV export for evaluators.',
    body: 'After launch, monitoring tracks latency, query volume and access violations — so the system keeps proving its behavior over time.',
    art: 'shield' as const,
    tile: 'bg-blue-700',
  },
];

export const ProcessSection: React.FC = () => (
  <section id="process" className="scroll-mt-24 relative overflow-hidden bg-white border-y border-slate-200">
    <StarCluster className="absolute left-8 top-10 hidden w-32 text-blue-100 lg:block" color="#dbe5ff" />

    <div className="relative mx-auto max-w-7xl px-5 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow text-[11px] text-blue-700">Our Process</p>
        <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">
          Clear steps, open communication, correct from the start
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
          It’s not magic, it’s proven method. Every deployment follows a tested path — from understanding your
          knowledge boundaries to running something that performs beautifully.
        </p>
      </div>

      <div className="mt-14 space-y-10">
        {steps.map((step, i) => (
          <div
            key={step.n}
            className={`grid items-center gap-8 rounded-3xl border border-slate-200 bg-[#f8fafc] p-6 md:p-8 lg:grid-cols-2 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <div>
              <div className="flex items-center gap-3">
                <span className="display-heading text-4xl text-blue-200">{step.n}</span>
                <span className="h-px flex-1 bg-slate-200" />
              </div>
              <h3 className="display-heading mt-4 text-2xl text-[#121212] md:text-3xl">{step.title}</h3>
              <p className="mt-3 text-sm font-semibold text-slate-700">{step.lead}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{step.body}</p>
            </div>

            <div className={`relative h-52 overflow-hidden rounded-2xl md:h-60 ${step.tile} dot-grid`}>
              <ArtTile
                variant={step.art}
                className="absolute inset-0 h-full w-full"
                tone={(step as { tone?: string }).tone ?? '#ffffff'}
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/15 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                Step {step.n}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

/* ----------------------------------------------------------- Testimonials */

const testimonials = [
  {
    quote:
      'I found the process very easy and the pipeline delivered exactly what it said. From building the knowledge base to maintaining it, this is how internal AI should behave.',
    name: 'Rahul Sharma',
    role: 'Finance Employee · Finance clearance',
  },
  {
    quote:
      'The pre-retrieval filter is the part that won me over. I asked a cross-department question on purpose and watched it get blocked before retrieval. That is a real guarantee.',
    name: 'Amit Verma',
    role: 'Manufacturing Employee · Mfg clearance',
  },
  {
    quote:
      'Editing department documents and seeing them instantly available to RAG — with the audit entry written automatically — makes governance feel effortless.',
    name: 'Priya Patel',
    role: 'Department Manager · Finance',
  },
  {
    quote:
      'We are particular about accuracy, but needed to prioritize access control. The platform delivered on both. We should have made this decision years ago.',
    name: 'Vikram Malhotra',
    role: 'CEO / Executive · Company-wide clearance',
  },
  {
    quote:
      'Helpful, thorough and caring every step of the way. Love the dashboards and can’t wait to keep growing the document archive with my team.',
    name: 'Sarah Connor',
    role: 'Enterprise Admin · IT',
  },
  {
    quote:
      'The audit ledger with CSV export turned our evaluation demo into evidence. Every allowed and denied query was right there, timestamped.',
    name: 'Maria Wegwitz',
    role: 'Capstone Evaluator',
  },
];

export const TestimonialsSection: React.FC = () => (
  <section className="bg-paper">
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 lg:py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="eyebrow text-[11px] text-blue-700">What our customers say</p>
        <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">Trusted by every role in the org</h2>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.name} className="card-lift flex flex-col rounded-2xl border border-slate-200 bg-white p-6">
            <Quote className="h-6 w-6 text-blue-200" />
            <blockquote className="mt-4 flex-1 text-[13px] leading-relaxed text-slate-700">“{t.quote}”</blockquote>
            <figcaption className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
              <span className="grid h-10 w-10 place-items-center rounded-full bg-[#121212] text-sm font-bold text-white">
                {t.name.charAt(0)}
              </span>
              <span>
                <span className="block text-sm font-bold text-[#121212]">{t.name}</span>
                <span className="block text-[11px] text-slate-500">{t.role}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

/* ------------------------------------------------- Use cases / portfolio */

const useCases = [
  {
    title: 'Finance Knowledge Assistant',
    tags: ['RAG Assistant', 'Department Clearance'],
    accent: '#3636ff',
    caption: 'Margin reports, budget drafts and vendor contracts — retrieved only for Finance identities.',
  },
  {
    title: 'Manufacturing SOP Search',
    tags: ['Document Vault', 'Pre-Retrieval Filter'],
    accent: '#121212',
    caption: 'Plant safety manuals and standard operating procedures, chunked and tagged at ingestion.',
  },
  {
    title: 'Executive Cross-Department View',
    tags: ['Role Dashboard', 'Company-wide'],
    accent: '#8080ff',
    caption: 'CEO clearance spans all departments with a single overview of volume, latency and violations.',
  },
  {
    title: 'Security Audit & Evidence',
    tags: ['Audit Ledger', 'CSV Export'],
    accent: '#f0e10d',
    caption: 'Every allowed and denied query timestamped — ready for evaluators and compliance reviews.',
  },
];

export const UseCasesSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section id="use-cases" className="scroll-mt-24 border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 lg:py-24">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow text-[11px] text-blue-700">Portfolio</p>
            <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">
              Explore the flows that define us
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">
              Clean design, strict boundaries, verifiable results — four scenarios you can replay in the live demo.
            </p>
          </div>
          <button
            onClick={() => navigate('/login')}
            className="pill-btn inline-flex items-center gap-2 self-start rounded-full bg-[#121212] px-6 py-3 text-sm text-white hover:bg-blue-700"
          >
            View Our Portfolio <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {useCases.map((c) => (
            <article key={c.title} className="card-lift overflow-hidden rounded-3xl border border-slate-200 bg-[#f8fafc]">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 p-6">
                <BrowserMock className="mx-auto max-w-md" accent={c.accent} title={`apex-enterprise.ai/${c.tags[0].toLowerCase().replace(/\s+/g, '-')}`} />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2">
                  {c.tags.map((tag) => (
                    <span key={tag} className="rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-700">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="display-heading mt-3 text-xl text-[#121212]">{c.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{c.caption}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
