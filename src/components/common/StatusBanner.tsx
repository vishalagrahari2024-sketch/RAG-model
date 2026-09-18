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
      border: 'border-emerald-200 bg-emerald-50/70',
      badgeVariant: 'success' as const,
      badgeText: 'WORKING FOUNDATION',
      icon: <ShieldCheck className="w-4 h-4 text-emerald-700" />,
      titleColor: 'text-emerald-950',
      descColor: 'text-emerald-800',
    },
    MOCK: {
      border: 'border-purple-200 bg-purple-50/70',
      badgeVariant: 'mock' as const,
      badgeText: 'SIMULATED / UI DEMO',
      icon: <Layers className="w-4 h-4 text-purple-700" />,
      titleColor: 'text-purple-950',
      descColor: 'text-purple-800',
    },
    FUTURE: {
      border: 'border-amber-200 bg-amber-50/70',
      badgeVariant: 'warning' as const,
      badgeText: 'ROADMAP TARGET',
      icon: <Sparkles className="w-4 h-4 text-amber-700" />,
      titleColor: 'text-amber-950',
      descColor: 'text-amber-800',
    },
  };

  const config = configs[status];

  return (
    <div className={`p-4 rounded-lg border ${config.border} flex flex-col md:flex-row md:items-center justify-between gap-3 text-sm shadow-xs mb-6`}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 p-1.5 rounded-md bg-white border border-slate-200 shrink-0">
          {config.icon}
        </div>
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className={`text-sm font-semibold ${config.titleColor}`}>{title}</h4>
            <Badge variant={config.badgeVariant}>{config.badgeText}</Badge>
            <span className="text-xs px-2 py-0.5 rounded bg-white text-slate-600 font-mono border border-slate-200">
              {phase}
            </span>
          </div>
          <p className={`text-xs mt-1 leading-relaxed ${config.descColor}`}>{description}</p>
        </div>
      </div>
    </div>
  );
};
