import React from 'react';

interface StatusBannerProps {
  status: 'IMPLEMENTED' | 'MOCK' | 'FUTURE';
  phase: string;
  title: string;
  description: string;
}

export const StatusBanner: React.FC<StatusBannerProps> = ({
  status,
  title,
  description,
}) => {
<<<<<<< HEAD
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
      border: 'border-blue-200 bg-blue-50/70',
      badgeVariant: 'mock' as const,
      badgeText: 'SIMULATED / UI DEMO',
      icon: <Layers className="w-4 h-4 text-blue-700" />,
      titleColor: 'text-blue-950',
      descColor: 'text-blue-800',
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

=======
>>>>>>> 107f6ad (final changes)
  return (
    <div className="p-3.5 rounded-md border border-gray-200 bg-white flex items-start gap-3 text-sm mb-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
          {status !== 'IMPLEMENTED' && (
            <span className="text-xs text-gray-500 italic">(coming soon)</span>
          )}
        </div>
        <p className="text-xs mt-1 text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
};
