import React from 'react';
import { Badge } from './Badge';
import { Layers, ShieldCheck, Sparkles } from 'lucide-react';

interface StatusBannerProps {
  status: 'IMPLEMENTED' | 'MOCK' | 'FUTURE';
  phase: string;
  title: string;
  description: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  phase,
  title,
  description,
}) => {
  const configs = {
    IMPLEMENTED: {
      border: 'border-emerald-500/30 bg-emerald-950/20',
      badgeVariant: 'success' as const,
      badgeText: 'FULLY IMPLEMENTED',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-400" />,
    },
    MOCK: {
      border: 'border-purple-500/30 bg-purple-950/20',
      badgeVariant: 'mock' as const,
      badgeText: 'MOCK / UI ONLY',
      icon: <Layers className="w-4 h-4 text-purple-400" />,
    },
    FUTURE: {
      border: 'border-amber-500/30 bg-amber-950/20',
      badgeVariant: 'warning' as const,
      badgeText: 'FUTURE PHASE PENDING',
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
    },
  };

  const config = configs[status];

  return (
    <div className={`p-4 rounded-xl border ${config.border} flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm shadow-lg mb-6 backdrop-blur-md`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-2 rounded-lg bg-slate-900/60 border border-slate-800">
          {config.icon}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-slate-100">{title}</h4>
            <Badge variant={config.badgeVariant}>{config.badgeText}</Badge>
            <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
              {phase}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  );
};
