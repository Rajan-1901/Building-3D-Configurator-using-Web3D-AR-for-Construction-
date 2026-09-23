import React from 'react';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'rectangular' | 'circular' | 'text';
  width?: string | number;
  height?: string | number;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'rectangular',
  width,
  height,
  className = '',
  style,
  ...props
}) => {
  const variantClass = {
    rectangular: 'rounded-xl',
    circular: 'rounded-full',
    text: 'rounded-md h-4'
  }[variant];

  return (
    <div
      className={`animate-pulse bg-slate-800/80 ${variantClass} ${className}`}
      style={{ width, height, ...style }}
      {...props}
    />
  );
};
