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
    <div className="h-full bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {isEditMode && (
        <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 px-4 py-3 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="widget-handle cursor-move flex-1 select-none">
              <span className="text-sm font-semibold text-gray-700">
                {title}
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                console.log(`Remove button clicked for widget ${id}`);
                onRemove();
              }}
              onMouseDown={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 rounded-md text-gray-400 hover:text-red-600 hover:bg-red-50 transition-all duration-200 z-50"
              aria-label={`${title} entfernen`}
            >
              <XMarkIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
      <div className={`h-full overflow-auto ${isEditMode ? 'pt-12' : ''}`}>
        {children}
      </div>
    </div>
  );
}