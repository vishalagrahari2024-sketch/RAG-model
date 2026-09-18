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
    <div className={`bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-5 py-4 border-b border-slate-200 flex items-center justify-between gap-4 bg-white ${headerClassName}`}>
          <div>
            {title && (typeof title === 'string' ? <h3 className="text-sm font-semibold text-slate-900">{title}</h3> : title)}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`p-5 ${bodyClassName}`}>{children}</div>
      {footer && <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-600">{footer}</div>}
    </div>
  );
};
