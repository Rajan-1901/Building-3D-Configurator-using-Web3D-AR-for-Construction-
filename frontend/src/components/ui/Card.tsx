import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glass?: boolean;
  hoverGlow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  glass = true,
  hoverGlow = true,
  className = '',
  ...props
}) => {
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 transition-all duration-300 ${
        glass ? 'glass-card' : 'bg-slate-900/80 border border-slate-800'
      } ${hoverGlow ? 'glass-card-hover' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
