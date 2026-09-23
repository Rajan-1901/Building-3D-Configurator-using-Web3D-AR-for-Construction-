import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'info' | 'danger' | 'electric' | 'purple' | 'neutral';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'info',
  size = 'md',
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-[11px] font-medium rounded-full',
    md: 'px-2.5 py-1 text-xs font-semibold rounded-full'
  }[size];

  const variantClasses = {
    success: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    info: 'bg-blue-500/15 text-blue-400 border border-blue-500/30',
    danger: 'bg-red-500/15 text-red-400 border border-red-500/30',
    electric: 'bg-cyan-500/20 text-cyan-300 border border-cyan-400/40 shadow-sm shadow-cyan-500/20',
    purple: 'bg-purple-500/15 text-purple-300 border border-purple-500/30',
    neutral: 'bg-slate-800 text-slate-300 border border-slate-700'
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 shrink-0 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};
