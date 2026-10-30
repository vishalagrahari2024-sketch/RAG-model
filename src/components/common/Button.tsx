import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  children,
  className = '',
  disabled,
  ...props
}) => {
<<<<<<< HEAD
  const baseStyles =
    'inline-flex items-center justify-center font-semibold tracking-tight rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer';

  const sizeStyles = {
    sm: 'px-4 py-1.5 text-xs gap-1.5',
    md: 'px-5 py-2.5 text-sm gap-2',
    lg: 'px-7 py-3 text-sm gap-2.5',
  };

  const variantStyles = {
    // Electric-blue pill — the Nomad primary CTA
    primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-none',
    secondary: 'bg-slate-900 hover:bg-slate-800 text-white shadow-none',
    outline: 'bg-transparent hover:bg-slate-100 text-slate-900 border border-slate-300 hover:border-slate-900',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-none',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-600 hover:text-slate-900',
=======
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-blue-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-sm';

  const sizeStyles = {
    sm: 'px-2.5 py-1 text-xs gap-1.5',
    md: 'px-3.5 py-1.5 text-sm gap-2',
    lg: 'px-4 py-2 text-base gap-2',
  };

  const variantStyles = {
    primary: 'bg-blue-600 hover:bg-blue-700 text-white border border-blue-600',
    secondary: 'bg-white hover:bg-gray-50 text-gray-800 border border-gray-300',
    outline: 'bg-transparent hover:bg-gray-50 text-gray-700 border border-gray-300',
    danger: 'bg-red-600 hover:bg-red-700 text-white border border-red-600',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
>>>>>>> 107f6ad (final changes)
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin text-current" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
