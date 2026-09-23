import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glass' | 'electric' | 'danger';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5 font-medium',
    md: 'px-4 py-2 text-sm rounded-xl gap-2 font-medium',
    lg: 'px-5 py-2.5 text-base rounded-xl gap-2.5 font-semibold',
    xl: 'px-7 py-3.5 text-lg rounded-2xl gap-3 font-semibold shadow-lg'
  }[size];

  const variantClasses = {
    primary: 'bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-900/30 active:scale-[0.98]',
    secondary: 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700/60 active:scale-[0.98]',
    outline: 'bg-transparent hover:bg-slate-800/60 text-slate-200 border border-slate-700 hover:border-slate-500 active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-slate-800/50 text-slate-300 hover:text-white',
    glass: 'bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/20 shadow-lg hover:border-white/30 active:scale-[0.98]',
    electric: 'bg-gradient-to-r from-blue-600 via-cyan-500 to-sky-400 hover:from-blue-500 hover:to-cyan-400 text-white font-semibold shadow-lg shadow-cyan-500/25 active:scale-[0.98]',
    danger: 'bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-900/30'
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <svg className="animate-spin h-4 w-4 text-current" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          <span>{children}</span>
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
