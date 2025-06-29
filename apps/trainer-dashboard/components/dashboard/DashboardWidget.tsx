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
    <div className={`h-full bg-white rounded-lg border shadow-sm overflow-hidden transition-all duration-200 ${
      isEditMode 
        ? 'border-primary-300 shadow-primary-100' 
        : 'border-gray-100 hover:shadow-md hover:border-gray-200'
    }`}>
      {isEditMode && (
        <div className="absolute inset-x-0 top-0 bg-primary-600 px-3 py-1.5 z-10">
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