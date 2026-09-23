import React, { useEffect, useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, ChevronDown, Menu, X, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

const platformLinks = [
  { to: '/dashboard', label: 'Role Dashboards', desc: 'Metrics scoped to your department' },
  { to: '/chat', label: 'RAG Assistant', desc: 'Grounded answers with citations' },
  { to: '/documents', label: 'Document Vault', desc: 'Permission-aware knowledge base' },
  { to: '/guardrails', label: 'AI Guardrails', desc: 'PII masking & injection defense' },
  { to: '/audit-logs', label: 'Audit Ledger', desc: 'Every query, allowed or denied' },
];

const navLinks = [
  { to: '/#platform', label: 'Platform' },
  { to: '/#process', label: 'Our Process' },
  { to: '/#use-cases', label: 'Use Cases' },
  { to: '/#insights', label: 'Insights' },
];

/* Brand glyphs are not bundled with lucide-react, so social icons are inline SVG. */
const socialIcons = [
  {
    label: 'Facebook',
    svg: '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H8v3h2.4V21z"/></svg>',
  },
  {
    label: 'X',
    svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M17.5 3h3.1l-6.8 7.8L21.8 21h-6.2l-4.9-6.4L5.1 21H2l7.3-8.3L2.4 3h6.4l4.4 5.8zm-1.1 16.1h1.7L7.7 4.8H5.9z"/></svg>',
  },
  {
    label: 'LinkedIn',
    svg: '<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true"><path d="M6.9 8.6H3.6V20h3.3zM5.2 3.5A1.9 1.9 0 1 0 5.2 7.3a1.9 1.9 0 0 0 0-3.8zM20.4 13.6c0-3.2-1.7-4.7-4-4.7-1.8 0-2.6 1-3.1 1.7V8.6H10V20h3.3v-6c0-1.6.9-2.4 2-2.4s1.9.8 1.9 2.4v6h3.2z"/></svg>',
  },
];

export const PublicLayout: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Menus are tagged with the route they were opened on, so navigation
  // closes them automatically without a state-syncing effect.
  const routeKey = location.pathname + location.search + location.hash;
  const [menus, setMenus] = useState<{ key: string; mobile: boolean; platform: boolean }>({
    key: routeKey,
    mobile: false,
    platform: false,
  });
  const sameRoute = menus.key === routeKey;
  const mobileOpen = sameRoute && menus.mobile;
  const platformOpen = sameRoute && menus.platform;
  const setMobileOpen = (open: boolean) => setMenus({ key: routeKey, mobile: open, platform: false });
  const setPlatformOpen = (open: boolean) =>
    setMenus((prev) => ({ key: routeKey, mobile: sameRoute ? prev.mobile : false, platform: open }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (target: string) => {
    setMobileOpen(false);
    const hashAt = target.indexOf('#');

    // Plain route (e.g. "/login")
    if (hashAt === -1) {
      navigate(target);
      return;
    }

    const path = target.slice(0, hashAt) || '/';
    const hash = target.slice(hashAt);

    if (location.pathname !== '/') {
      navigate(path + hash);
      // Smooth-scroll once the landing page has mounted.
      window.setTimeout(() => document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80);
    } else {
      document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-paper text-slate-900 flex flex-col antialiased selection:bg-blue-600 selection:text-white">
      {/* Top announcement strip */}
      <div className="bg-[#121212] text-white text-[11px] sm:text-xs star-pattern-dark">
        <div className="mx-auto max-w-7xl px-5 md:px-10 h-8 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-[#f0e10d]" />
            Pre-retrieval RBAC is enforced before every vector search
          </span>
          <span className="hidden sm:inline text-white/60">Academic Capstone Demonstration · 2026</span>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white/95 backdrop-blur border-b border-slate-200 shadow-[0_8px_30px_-24px_rgba(11,27,61,0.6)]' : 'bg-white border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-10 h-[68px] flex items-center justify-between gap-6">
          <Link to="/" className="flex items-baseline gap-2 group shrink-0">
            <div className="leading-tight">
              <div className="text-lg font-display font-medium tracking-[-0.04em] text-[#121212] uppercase">
                Apex <span className="text-blue-600">Rag</span>
              </div>
            </div>
            <span className="hidden sm:inline text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400 translate-y-[-1px]">
              Role-Based Access · Grounded Answers
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <div
              className="relative"
              onMouseEnter={() => setPlatformOpen(true)}
              onMouseLeave={() => setPlatformOpen(false)}
            >
              <button className="inline-flex items-center gap-1 px-3 py-2 text-[13px] font-semibold text-slate-700 hover:text-blue-700 transition-colors">
                Platform
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${platformOpen ? 'rotate-180' : ''}`} />
              </button>
              {platformOpen && (
                <div className="absolute left-0 top-full w-[340px] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
                  {platformLinks.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="flex items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-blue-50 transition-colors"
                    >
                      <span className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                      <span>
                        <span className="block text-[13px] font-bold text-[#121212]">{l.label}</span>
                        <span className="block text-[11px] text-slate-500">{l.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.map((l) => (
                <button
                  key={l.label}
                  onClick={() => go(l.to)}
                  className="px-3 py-2 text-[13px] font-semibold text-slate-700 hover:text-blue-700 transition-colors link-underline"
                >
                  {l.label}
                </button>
              ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2.5">
            {isAuthenticated ? (
              <Button
                variant="primary"
                size="sm"
                className="pill-btn hidden sm:inline-flex bg-blue-700 hover:bg-blue-800 border-0 rounded-full px-5"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/dashboard')}
              >
                Open Dashboard
              </Button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden sm:inline-flex px-3 py-2 text-[13px] font-semibold text-slate-700 hover:text-blue-700 transition-colors"
                >
                  Sign In
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  className="pill-btn bg-blue-700 hover:bg-blue-800 border-0 rounded-full px-5"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                  onClick={() => navigate('/login')}
                >
                  Launch Demo
                </Button>
              </>
            )}

            <button
              className="lg:hidden p-2 rounded-lg text-slate-700 hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-1">
            <p className="eyebrow text-[10px] text-slate-400 pt-1">Platform</p>
            {platformLinks.map((l) => (
              <Link key={l.to} to={l.to} className="block rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50">
                {l.label}
              </Link>
            ))}
            <p className="eyebrow text-[10px] text-slate-400 pt-3">Explore</p>
            {navLinks.slice(1).map((l) => (
              <button
                key={l.label}
                onClick={() => go(l.to)}
                className="block w-full text-left rounded-lg px-3 py-2 text-sm font-semibold text-slate-800 hover:bg-blue-50"
              >
                {l.label}
              </button>
            ))}
            <Link
              to="/login"
              className="block rounded-lg px-3 py-2 text-sm font-semibold text-blue-700 hover:bg-blue-50"
            >
              Sign In →
            </Link>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative bg-[#121212] text-white overflow-hidden">
        <div className="absolute inset-0 star-pattern-dark" aria-hidden="true" />
        <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-blue-600 via-white to-red-500 opacity-80" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-10 pt-16 pb-8">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <div className="flex items-baseline gap-3">
                <div className="text-xl font-display font-medium tracking-[-0.04em] uppercase text-white">
                  Apex <span className="text-blue-400">Rag</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-white/70 leading-relaxed max-w-sm">
                Your secure enterprise knowledge partner. Retrieval-augmented answers with role-based access enforced
                <em> before</em> the model ever sees a document.
              </p>
              <div className="mt-5 flex items-center gap-2">
                {socialIcons.map((social) => (
                  <a
                    key={social.label}
                    href="#"
                    aria-label={social.label}
                    className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 hover:bg-blue-600 hover:border-blue-600 hover:text-white transition-colors"
                    dangerouslySetInnerHTML={{ __html: social.svg }}
                  />
                ))}
              </div>
            </div>

            <div className="md:col-span-2">
              <h4 className="eyebrow text-[11px] text-white/50">Explore</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { to: '/', label: 'Home' },
                  { to: '/#platform', label: 'Platform' },
                  { to: '/#process', label: 'Our Process' },
                  { to: '/#use-cases', label: 'Use Cases' },
                ].map((l) => (
                  <li key={l.label}>
                    <button onClick={() => go(l.to)} className="text-white/70 hover:text-white transition-colors link-underline">
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="eyebrow text-[11px] text-white/50">Platform</h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {platformLinks.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className="text-white/70 hover:text-white transition-colors link-underline">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="eyebrow text-[11px] text-white/50">Get Started</h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/70">
                <li>100 Cambridge Street, 14th Floor</li>
                <li>Boston, Massachusetts, 02114</li>
                <li>United States of America</li>
              </ul>
              <Button
                variant="primary"
                size="md"
                className="pill-btn mt-5 bg-blue-600 hover:bg-blue-500 border-0 rounded-full px-6"
                rightIcon={<ArrowRight className="w-4 h-4" />}
                onClick={() => navigate('/login')}
              >
                Get a Free Demo
              </Button>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
            <p>Copyright 2026 © Apex Enterprise RAG · Academic Capstone Demonstration</p>
            <div className="flex items-center gap-5">
              <span>Privacy Policy</span>
              <span>Sitemap</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
