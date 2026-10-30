import React from 'react';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'mock';
  size?: 'sm' | 'md';
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  children,
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'px-1.5 py-0.5 text-xs',
    md: 'px-2 py-0.5 text-xs',
  };

  const variantStyles = {
<<<<<<< HEAD
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-800 border border-amber-200',
    danger: 'bg-red-50 text-red-700 border border-red-200',
    info: 'bg-blue-50 text-blue-700 border border-blue-200',
    neutral: 'bg-slate-100 text-slate-700 border border-slate-200',
    mock: 'bg-slate-100 text-slate-600 border border-slate-300 font-mono text-[10px]',
=======
    success: 'bg-white text-emerald-700 border border-emerald-300',
    warning: 'bg-white text-amber-800 border border-amber-300',
    danger: 'bg-white text-red-700 border border-red-300',
    info: 'bg-white text-blue-700 border border-blue-300',
    neutral: 'bg-gray-50 text-gray-700 border border-gray-300',
    mock: 'bg-gray-100 text-gray-600 border border-gray-300 text-xs',
  };

  const getDotColor = () => {
    if (variant === 'success') return 'text-emerald-600';
    if (variant === 'danger') return 'text-red-600';
    if (variant === 'warning') return 'text-amber-600';
    if (variant === 'info') return 'text-blue-600';
    return 'text-gray-500';
>>>>>>> 107f6ad (final changes)
  };

  return (
    <span
<<<<<<< HEAD
      className={`inline-flex items-center gap-1 font-semibold tracking-tight rounded-full ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
=======
      className={`inline-flex items-center gap-1 font-normal rounded ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
>>>>>>> 107f6ad (final changes)
    >
      {icon ? icon : <span className={`text-[9px] leading-none ${getDotColor()}`}>●</span>}
      <span>{children}</span>
    </span>
  );
};
