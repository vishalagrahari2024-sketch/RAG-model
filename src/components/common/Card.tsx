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
<<<<<<< HEAD
    <div className={`bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden ${className}`}>
=======
    <div className={`bg-white border border-gray-200 rounded-md overflow-hidden ${className}`}>
>>>>>>> 107f6ad (final changes)
      {(title || subtitle || action) && (
        <div className={`px-4 py-3 border-b border-gray-200 flex items-center justify-between gap-4 bg-white ${headerClassName}`}>
          <div>
<<<<<<< HEAD
            {title && (typeof title === 'string' ? <h3 className="text-sm font-semibold tracking-tight text-slate-900">{title}</h3> : title)}
            {subtitle && <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>}
=======
            {title && (typeof title === 'string' ? <h3 className="text-sm font-semibold text-gray-900">{title}</h3> : title)}
            {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
>>>>>>> 107f6ad (final changes)
          </div>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
      {footer && <div className="px-4 py-2.5 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">{footer}</div>}
    </div>
  );
};
