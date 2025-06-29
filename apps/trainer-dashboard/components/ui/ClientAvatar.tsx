import React from 'react';
import { clsx } from 'clsx';
import { PackageType } from '@nv/shared/src/types/package';

interface ClientAvatarProps {
  name: string;
  packageType?: PackageType | null;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeClasses = {
  xs: 'h-8 w-8 text-sm',
  sm: 'h-10 w-10 text-sm',
  md: 'h-12 w-12 text-base',
  lg: 'h-16 w-16 text-lg',
  xl: 'h-32 w-32 text-3xl',
};

const packageColorClasses: Record<PackageType, string> = {
  personal_training: 'bg-gradient-to-br from-blue-400 to-blue-600',
  training_consultation: 'bg-gradient-to-br from-purple-400 to-purple-600',
  online_coaching: 'bg-gradient-to-br from-green-400 to-green-600',
};

export function ClientAvatar({ 
  name, 
  packageType, 
  size = 'md', 
  className = '' 
}: ClientAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  const colorClass = packageType && packageColorClasses[packageType]
    ? packageColorClasses[packageType]
    : 'bg-gradient-to-br from-gray-400 to-gray-600';

  return (
    <div
      className={clsx(
        'rounded-full flex items-center justify-center text-white font-bold',
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  );
}