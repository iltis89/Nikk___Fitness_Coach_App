import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface DashboardWidgetProps {
  id: string;
  title: string;
  isEditMode: boolean;
  onRemove: () => void;
  children: React.ReactNode;
}

export default function DashboardWidget({
  id,
  title,
  isEditMode,
  onRemove,
  children,
}: DashboardWidgetProps) {
  return (
    <div className={`h-full bg-white dark:bg-[rgb(20,25,45)] rounded-lg border shadow-sm overflow-hidden transition-all duration-200 ${
      isEditMode 
        ? 'border-primary-300 dark:border-primary-600 shadow-primary-100 dark:shadow-primary-900/20' 
        : 'border-gray-100 dark:border-gray-700 hover:shadow-md dark:hover:shadow-gray-900/30 hover:border-gray-200 dark:hover:border-gray-600'
    }`}>
      {isEditMode && (
        <div className="absolute inset-x-0 top-0 bg-primary-600 dark:bg-primary-700 px-3 py-1.5 z-10">
          <div className="flex items-center justify-between">
            <div className="widget-handle cursor-move flex-1 select-none">
              <span className="text-xs font-medium text-white flex items-center gap-1.5">
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                </svg>
                {title}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                onRemove();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="p-1 rounded text-white/80 hover:text-white hover:bg-white/20 transition-all duration-200"
              aria-label={`${title} entfernen`}
            >
              <XMarkIcon className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
      <div className={`h-full overflow-hidden ${isEditMode ? 'mt-7' : ''}`}>
        {children}
      </div>
    </div>
  );
}