import { Logo } from './Logo';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

export function LoadingSpinner({ size = 'md', text = 'Lädt...' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className="relative">
        <Logo 
          size={size === 'sm' ? 'xs' : size} 
          variant="icon" 
          className="text-gray-300 dark:text-gray-600"
        />
        <div className={`absolute inset-0 ${sizeClasses[size]}`}>
          <div className="h-full w-full animate-spin rounded-full border-2 border-primary-500 border-t-transparent" />
        </div>
      </div>
      {text && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">{text}</p>
      )}
    </div>
  );
}