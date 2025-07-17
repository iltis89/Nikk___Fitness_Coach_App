'use client';

import React from 'react';
import { CheckCircleIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/solid';

interface SuccessIndicatorProps {
  value: number;
  label: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function SuccessIndicator({ value, label, trend = 'neutral', className = '' }: SuccessIndicatorProps) {
  return (
    <div className={`flex items-center gap-3 p-4 bg-success-50 dark:bg-success-400/10 rounded-lg border border-success-200 dark:border-success-400/20 ${className}`}>
      <div className="flex-shrink-0">
        <CheckCircleIcon className="h-8 w-8 text-success-400" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-600 dark:text-gray-200">{label}</p>
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-bold text-success-600 dark:text-success-400">{value}%</p>
          {trend === 'up' && (
            <span className="flex items-center text-xs text-success-600 dark:text-success-400">
              <ArrowTrendingUpIcon className="h-3 w-3 mr-0.5" />
              Fortschritt
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// Nikks Success Badge für messbare Erfolge
export function SuccessBadge({ children, size = 'md' }: { children: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-1.5'
  };

  return (
    <span className={`inline-flex items-center gap-1.5 ${sizeClasses[size]} bg-success-100 dark:bg-success-400/20 text-success-800 dark:text-success-400 rounded-full font-medium`}>
      <CheckCircleIcon className="h-3.5 w-3.5" />
      {children}
    </span>
  );
}

// Progress Card mit Nikks Grün für Erfolge
export function ProgressCard({ 
  title, 
  current, 
  target, 
  unit = '',
  className = '' 
}: { 
  title: string;
  current: number;
  target: number;
  unit?: string;
  className?: string;
}) {
  const percentage = Math.round((current / target) * 100);
  
  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-50">{title}</h3>
        <div className="mt-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {current}{unit}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              von {target}{unit}
            </span>
          </div>
          <div className="mt-2 relative">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-success-400 to-success-500 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
          <div className="mt-2 flex justify-between items-center">
            <span className="text-sm font-medium text-success-600 dark:text-success-400">
              {percentage}% erreicht
            </span>
            {percentage >= 100 && <SuccessBadge size="sm">Ziel erreicht!</SuccessBadge>}
          </div>
        </div>
      </div>
    </div>
  );
}