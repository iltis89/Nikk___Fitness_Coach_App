'use client';

import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';
import { PencilIcon, XMarkIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import DashboardWidget from './DashboardWidget';
import StatsGrid from './StatsGrid';
import AppointmentsList from './AppointmentsList';
import RecentActivities from './RecentActivities';
import ProgressChart from './ProgressChart';
import QuickActions from './QuickActions';
import ClientsList from './ClientsList';
import AiInsights from './AiInsights';
import CustomerStats from './CustomerStats';
import PerformanceComparison from './PerformanceComparison';
import PackageWidget from './PackageWidget';
import { RevenueWidget } from './RevenueWidget';
import WidgetSelector from './WidgetSelector';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

const componentMap: Record<string, React.ComponentType<any>> = {
  StatsGrid,
  AppointmentsList,
  RecentActivities,
  ProgressChart,
  QuickActions,
  ClientsList,
  AiInsights,
  CustomerStats,
  PerformanceComparison,
  PackageWidget,
  RevenueWidget,
};

export default function DashboardGrid() {
  const {
    widgets,
    isEditMode,
    gridCols,
    rowHeight,
    setWidgets,
    toggleEditMode,
    removeWidget,
    resetLayout,
  } = useDashboardLayout();
  
  const [showWidgetSelector, setShowWidgetSelector] = useState(false);
  const [widgetToRemove, setWidgetToRemove] = useState<string | null>(null);

  const handleLayoutChange = (layout: any[]) => {
    if (!isEditMode) return;
    
    const updatedWidgets = widgets.map((widget) => {
      const layoutItem = layout.find((l) => l.i === widget.id);
      if (layoutItem) {
        return {
          ...widget,
          x: layoutItem.x,
          y: layoutItem.y,
          w: layoutItem.w,
          h: layoutItem.h,
        };
      }
      return widget;
    });
    
    setWidgets(updatedWidgets);
  };

  const layouts = {
    lg: widgets.map((w) => ({
      i: w.id,
      x: w.x,
      y: w.y,
      w: w.w,
      h: w.h,
      minW: w.minW,
      minH: w.minH,
      maxW: w.maxW,
      maxH: w.maxH,
      static: !isEditMode,
    })),
  };

  return (
    <div className="relative">
      {/* Control Bar */}
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">Dashboard</h1>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          {isEditMode && (
            <>
              <Button
                onClick={() => setShowWidgetSelector(true)}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <PlusIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Widget hinzufügen</span>
                <span className="sm:hidden">+</span>
              </Button>
              <Button
                onClick={resetLayout}
                variant="secondary"
                size="sm"
                className="flex items-center gap-1"
              >
                <ArrowPathIcon className="h-4 w-4" />
                <span className="hidden sm:inline">Zurücksetzen</span>
              </Button>
            </>
          )}
          <Button
            onClick={toggleEditMode}
            variant={isEditMode ? 'primary' : 'secondary'}
            size="sm"
            className="flex items-center gap-1"
          >
            <PencilIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{isEditMode ? 'Fertig' : 'Bearbeiten'}</span>
          </Button>
        </div>
      </div>

      {/* Grid Layout */}
      <ResponsiveGridLayout
        className="layout dashboard-grid"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
        rowHeight={rowHeight}
        onLayoutChange={handleLayoutChange}
        isDraggable={isEditMode}
        isResizable={isEditMode}
        draggableHandle=".widget-handle"
      >
        {widgets.map((widget) => {
          const Component = componentMap[widget.component];
          if (!Component) return null;

          return (
            <div key={widget.id} className="relative h-full">
              <DashboardWidget
                id={widget.id}
                title={widget.title}
                isEditMode={isEditMode}
                onRemove={() => setWidgetToRemove(widget.id)}
              >
                <Component config={widget.config} />
              </DashboardWidget>
            </div>
          );
        })}
      </ResponsiveGridLayout>

      {/* Widget Selector Modal */}
      {showWidgetSelector && (
        <WidgetSelector onClose={() => setShowWidgetSelector(false)} />
      )}
      
      {/* Confirm Dialog */}
      <ConfirmDialog
        isOpen={widgetToRemove !== null}
        title="Widget entfernen"
        message="Möchten Sie dieses Widget wirklich entfernen? Diese Aktion kann nicht rückgängig gemacht werden."
        confirmText="Entfernen"
        cancelText="Abbrechen"
        onConfirm={() => {
          if (widgetToRemove) {
            console.log('Confirming removal of widget:', widgetToRemove);
            removeWidget(widgetToRemove);
            setWidgetToRemove(null);
          }
        }}
        onCancel={() => setWidgetToRemove(null)}
        variant="danger"
      />

      <style jsx>{`
        :global(.react-grid-item.react-grid-placeholder) {
          background: rgb(14 165 233);
          opacity: 0.2;
          transition-duration: 100ms;
          z-index: 2;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          -o-user-select: none;
          user-select: none;
        }
        
        :global(.react-grid-item > .react-resizable-handle) {
          position: absolute;
          width: 20px;
          height: 20px;
          bottom: 0;
          right: 0;
          cursor: se-resize;
        }
        
        :global(.react-grid-item > .react-resizable-handle::after) {
          content: "";
          position: absolute;
          right: 3px;
          bottom: 3px;
          width: 5px;
          height: 5px;
          border-right: 2px solid rgba(0, 0, 0, 0.4);
          border-bottom: 2px solid rgba(0, 0, 0, 0.4);
        }
        
        :global(.dark .react-grid-item > .react-resizable-handle::after) {
          border-right-color: rgba(255, 255, 255, 0.4);
          border-bottom-color: rgba(255, 255, 255, 0.4);
        }
        
        :global(.widget-handle) {
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
      `}</style>
    </div>
  );
}