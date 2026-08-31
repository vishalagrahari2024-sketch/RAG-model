import React from 'react';

interface CardProps {
  title?: React.ReactNode;
  subtitle?: string;
  action?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  action,
  children,
  footer,
  className = '',
  headerClassName = '',
  bodyClassName = '',
}) => {
  return (
    <div className={`bg-[#111726] border border-[#1F293D] rounded-xl shadow-xl overflow-hidden transition-all hover:border-slate-700/60 ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-6 py-4 border-b border-[#1F293D] flex items-center justify-between gap-4 ${headerClassName}`}>
          <div>
            {title && (typeof title === 'string' ? <h3 className="text-base font-semibold text-slate-100">{title}</h3> : title)}
            {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && <div className="px-6 py-3 bg-[#0D1322] border-t border-[#1F293D] text-xs text-slate-400">{footer}</div>}
    </div>
  );
};
