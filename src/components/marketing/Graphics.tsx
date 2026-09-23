import React from 'react';

/**
 * Decorative, dependency-free artwork used across the marketing pages.
 * All visuals are inline SVG/CSS so the site never relies on remote images.
 * Palette follows the Nomad-inspired system: electric blue, ink, highlight yellow.
 */

/** Rating row — highlight-yellow plate with ink stars (Nomad-style accent). */
export const StarRating: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`inline-flex items-center gap-1.5 rounded-full bg-[#f0e10d] border border-[#d9c900] px-3.5 py-1.5 ${className}`}>
    {[0, 1, 2, 3, 4].map((i) => (
      <svg key={i} viewBox="0 0 24 24" className={`w-4 h-4 ${i === 2 ? 'scale-110' : ''}`} fill="#121212">
        <path d="M12 2l2.9 6.3 6.9.9-5.1 4.7 1.4 6.8L12 17.3 5.9 20.7l1.4-6.8L2.2 9.2l6.9-.9z" />
      </svg>
    ))}
    <span className="ml-1 text-xs font-bold text-[#121212]">5.0 · Trusted by 5 demo roles</span>
  </div>
);

/** Horizontal subtle-cross band used on CTA / footer sections. */
export const StarField: React.FC<{ dark?: boolean; className?: string }> = ({ dark = false, className = '' }) => (
  <div
    aria-hidden="true"
    className={`pointer-events-none absolute inset-0 ${dark ? 'star-pattern-dark' : 'star-pattern-light'} ${className}`}
  />
);

/** Small accent cluster used as section furniture. */
export const StarCluster: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#ffffff',
}) => (
  <svg viewBox="0 0 170 170" className={className} aria-hidden="true" fill={color}>
    <path d="M30 20l6 13 14.2 1.9-10.5 9.7 2.8 14L30 50.7 17.5 58.6l2.8-14L9.8 34.9 24 33z" />
    <path d="M112 8l4.6 10 10.8 1.4-8 7.4 2.1 10.6-9.5-5.4-9.5 5.4 2.1-10.6-8-7.4 10.8-1.4z" />
    <path d="M74 84l8.4 18.2 20 2.7-14.7 13.6 3.9 19.7L74 127.3l-17.6 10.9 3.9-19.7-14.7-13.6 20-2.7z" />
    <path d="M140 106l5 10.9 12 1.6-8.8 8.1 2.3 11.9-10.5-5.9-10.5 5.9 2.3-11.9-8.8-8.1 12-1.6z" />
    <path d="M20 122l4 8.7 9.5 1.3-7 6.5 1.8 9.5-8.3-4.7-8.3 4.7 1.8-9.5-7-6.5 9.5-1.3z" />
  </svg>
);

/** Colored artwork tile for the highlight cards. `tone` recolors the strokes/fills. */
export const ArtTile: React.FC<{
  variant: 'stars' | 'grid' | 'rings' | 'shield';
  className?: string;
  tone?: string;
}> = ({ variant, className = '', tone = '#ffffff' }) => {
  const body = (() => {
    switch (variant) {
      case 'stars':
        return (
          <g fill={tone}>
            <path d="M60 26l7.5 16.3 17.8 2.4-13 12 3.4 17.6L60 66.7 44.3 76.3l3.4-17.6-13-12 17.8-2.4z" />
            <path d="M150 44l5 10.9 12 1.6-8.8 8.1 2.3 11.9-10.5-5.9-10.5 5.9 2.3-11.9-8.8-8.1 12-1.6z" opacity="0.85" />
            <path d="M224 30l4.4 9.6 10.6 1.4-7.7 7.1 2 10.5-9.3-5.2-9.3 5.2 2-10.5-7.7-7.1 10.6-1.4z" opacity="0.7" />
          </g>
        );
      case 'grid':
        return (
          <g fill="none" stroke={tone} strokeWidth="3" opacity="0.9">
            <rect x="42" y="30" width="60" height="44" rx="8" />
            <rect x="118" y="30" width="60" height="44" rx="8" />
            <rect x="194" y="30" width="60" height="44" rx="8" />
            <path d="M42 92h212" strokeDasharray="10 10" />
            <circle cx="72" cy="52" r="9" />
            <circle cx="148" cy="52" r="9" />
            <circle cx="224" cy="52" r="9" />
          </g>
        );
      case 'rings':
        return (
          <g fill="none" stroke={tone} strokeWidth="4">
            <circle cx="90" cy="62" r="34" opacity="0.95" />
            <circle cx="160" cy="62" r="34" opacity="0.75" />
            <circle cx="230" cy="62" r="34" opacity="0.55" />
            <path d="M30 62h20M276 62h20" strokeDasharray="8 8" />
          </g>
        );
      case 'shield':
      default:
        return (
          <g>
            <path d="M150 18l58 18v34c0 26-24 44-58 54-34-10-58-28-58-54V36z" fill="none" stroke={tone} strokeWidth="4" />
            <path d="M126 66l16 16 32-34" fill="none" stroke={tone} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="52" cy="40" r="7" fill={tone} opacity="0.8" />
            <circle cx="74" cy="94" r="5" fill={tone} opacity="0.6" />
          </g>
        );
    }
  })();

  return (
    <svg viewBox="0 0 300 130" className={className} aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {body}
    </svg>
  );
};

/** Mini browser-window mock used in the "in action" showcase cards. */
export const BrowserMock: React.FC<{
  className?: string;
  accent?: string;
  title?: string;
}> = ({ className = '', accent = '#3636ff', title = 'apex-enterprise.ai' }) => (
  <div className={`overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ${className}`}>
    <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
      <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
      <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
      <span className="ml-2 truncate rounded-none bg-white px-2 py-0.5 text-[10px] text-slate-500 border border-slate-200">{title}</span>
    </div>
    <div className="space-y-2 p-3" style={{ background: '#fafafa' }}>
      <div className="h-2.5 w-1/3" style={{ background: accent }} />
      <div className="h-2 w-2/3 bg-slate-200" />
      <div className="grid grid-cols-3 gap-2 pt-1">
        <div className="h-12 rounded-lg bg-white border border-slate-200" />
        <div className="h-12 rounded-lg bg-white border border-slate-200" />
        <div className="h-12 rounded-lg bg-white border border-slate-200" />
      </div>
      <div className="h-16 rounded-lg border border-dashed border-slate-300 bg-white" />
    </div>
  </div>
);
