import React from 'react';
import { clsx } from 'clsx';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const baseClasses = 'inline-flex items-center rounded-full font-medium';
    
    const variants = {
      primary: 'bg-primary-100 text-primary-800 dark:bg-primary-900/20 dark:text-primary-300',
      success: 'bg-success-100 text-success-800 dark:bg-success-900/20 dark:text-success-300',
      warning: 'bg-warning-100 text-warning-800 dark:bg-warning-900/20 dark:text-warning-300',
      error: 'bg-error-100 text-error-800 dark:bg-error-900/20 dark:text-error-300',
      info: 'bg-info-100 text-info-800 dark:bg-info-900/20 dark:text-info-300',
    };

    const sizes = {
      sm: 'px-2 py-0.5 text-xs',
      md: 'px-2.5 py-0.5 text-xs',
    };

    return (
      <span
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };