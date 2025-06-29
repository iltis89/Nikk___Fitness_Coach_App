import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  animation?: 'pulse' | 'wave' | 'none';
}

export function Skeleton({
  className,
  variant = 'rectangular',
  width,
  height,
  animation = 'pulse',
  ...props
}: SkeletonProps) {
  const variants = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-md',
  };

  const animations = {
    pulse: 'animate-pulse',
    wave: 'animate-shimmer',
    none: '',
  };

  return (
    <div
      className={cn(
        'bg-gray-200',
        variants[variant],
        animations[animation],
        className
      )}
      style={{
        width: width || '100%',
        height: height || '1rem',
      }}
      {...props}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <Skeleton variant="text" height="1.5rem" width="60%" className="mb-4" />
      <div className="space-y-3">
        <Skeleton variant="text" height="1rem" />
        <Skeleton variant="text" height="1rem" width="80%" />
        <Skeleton variant="text" height="1rem" width="90%" />
      </div>
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Skeleton variant="text" height="0.875rem" width="120px" className="mb-2" />
          <Skeleton variant="text" height="2rem" width="80px" />
        </div>
        <Skeleton variant="circular" width="48px" height="48px" />
      </div>
      <div className="mt-4 flex items-center gap-2">
        <Skeleton variant="rectangular" width="16px" height="16px" />
        <Skeleton variant="text" height="0.875rem" width="60px" />
      </div>
    </div>
  );
}