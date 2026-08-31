import React from 'react';
import { AlertTriangle, CheckCircle2, Info, XCircle, X } from 'lucide-react';

interface AlertProps {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  onClose,
  className = '',
}) => {
  const styles = {
    success: {
      bg: 'bg-emerald-950/40 border-emerald-500/30 text-emerald-200',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    },
    error: {
      bg: 'bg-red-950/40 border-red-500/30 text-red-200',
      icon: <XCircle className="w-5 h-5 text-red-400 shrink-0" />,
    },
    warning: {
      bg: 'bg-amber-950/40 border-amber-500/30 text-amber-200',
      icon: <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />,
    },
    info: {
      bg: 'bg-blue-950/40 border-blue-500/30 text-blue-200',
      icon: <Info className="w-5 h-5 text-blue-400 shrink-0" />,
    },
  };

  const current = styles[type];

  return (
    <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm shadow-md transition-all ${current.bg} ${className}`}>
      {current.icon}
      <div className="flex-1">
        {title && <h4 className="font-semibold mb-0.5 text-slate-100">{title}</h4>}
        <p className="leading-relaxed">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-200 p-0.5 rounded-md hover:bg-slate-800/50 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
