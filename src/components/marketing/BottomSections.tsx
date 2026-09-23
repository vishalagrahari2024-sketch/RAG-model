import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { Button } from '../common/Button';
import { StarCluster, StarField } from './Graphics';

const posts = [
  {
    gradient: 'from-blue-600 to-blue-900',
    kicker: 'Security',
    title: 'Pre-Retrieval RBAC: Why Filtering Must Happen Before Search',
    excerpt:
      'Post-retrieval filtering still lets forbidden documents reach the model. Here is why boundary filtering is the only defensible design…',
    read: '6 min read',
    date: 'Sep 2026',
  },
  {
    gradient: 'from-slate-700 to-slate-900',
    kicker: 'Engineering',
    title: 'Chunking Strategies That Keep Citations Honest',
    excerpt:
      'Overlapping chunks improve recall but blur provenance. A practical look at sizing, metadata tagging and section anchoring…',
    read: '8 min read',
    date: 'Aug 2026',
  },
  {
    gradient: 'from-blue-400 to-blue-600',
    kicker: 'Compliance',
    title: 'Building an Audit Ledger Evaluators Actually Trust',
    excerpt:
      'Allowed vs denied, timestamped, exportable. What we learned turning a debug log into an evidence-grade audit trail…',
    read: '5 min read',
    date: 'Jul 2026',
  },
];

export const InsightsSection: React.FC = () => (
  <section id="insights" className="scroll-mt-24 bg-paper">
    <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 lg:py-24">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="eyebrow text-[11px] text-blue-700">Blog</p>
          <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl">Insights from the build</h2>
        </div>
        <button className="pill-btn inline-flex items-center gap-2 self-start rounded-full border border-slate-300 bg-white px-6 py-3 text-sm text-[#121212] hover:border-blue-400">
          Go to Our Blog Page <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {posts.map((p) => (
          <article key={p.title} className="card-lift group overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <div className={`relative h-40 bg-gradient-to-br ${p.gradient} dot-grid`}>
              <StarCluster className="absolute -right-4 -top-4 w-32 text-white/30" color="#ffffff" />
              <span className="absolute bottom-3 left-4 rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur">
                {p.kicker}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-4 text-[11px] font-medium text-slate-400">
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {p.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {p.read}
                </span>
              </div>
              <h3 className="display-heading mt-2.5 text-lg leading-snug text-[#121212]">{p.title}</h3>
              <p className="mt-2 text-[13px] leading-relaxed text-slate-600">{p.excerpt}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-blue-700">
                Read more <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export const CtaBanner: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden border-y border-slate-200 bg-cream">
      <StarField className="opacity-90" />
      <StarCluster className="absolute left-6 bottom-6 w-36" color="#c7c7ff" />
      <StarCluster className="absolute right-8 top-8 w-28" color="#c7c7ff" />

      <div className="relative mx-auto max-w-4xl px-5 py-16 text-center md:px-10 lg:py-24">
        <p className="eyebrow text-[11px] text-blue-700">Ready when you are</p>
        <h2 className="display-heading mt-3 text-3xl text-[#121212] md:text-5xl lg:text-6xl">
          Ready to see your knowledge, <span className="text-blue-700">locked down?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
          Pick a demo role, ask an authorized question, then ask a forbidden one. Watch RBAC stop it before retrieval.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button
            variant="primary"
            size="lg"
            className="pill-btn rounded-full bg-blue-600 hover:bg-blue-700 border-0 px-8 shadow-lg shadow-blue-600/25"
            rightIcon={<ArrowRight className="h-4 h-4" />}
            onClick={() => navigate('/login')}
          >
            Get a Free Demo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="pill-btn rounded-full border-slate-300 bg-white px-8 text-[#121212] hover:border-blue-400"
            onClick={() => navigate('/register')}
          >
            Register Account
          </Button>
        </div>

        <p className="mt-8 text-xs text-slate-500">
          100 Cambridge Street, 14th Floor · Boston, Massachusetts, 02114 · United States of America
        </p>
      </div>
    </section>
  );
};
