'use client';

import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { 
  ChartBarIcon, 
  CalendarDaysIcon, 
  UsersIcon, 
  ClipboardDocumentListIcon,
  BoltIcon,
  ChartPieIcon,
  LightBulbIcon,
  UserIcon,
  UserGroupIcon,
  CubeIcon
} from '@heroicons/react/24/outline';
import { useDashboardLayout } from '@/hooks/useDashboardLayout';

interface WidgetOption {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  component: string;
  defaultSize: { w: number; h: number };
}

const widgetOptions: WidgetOption[] = [
  {
    id: 'stats',
    type: 'stats',
    title: 'Statistiken',
    description: 'Zeige wichtige Kennzahlen',
    icon: ChartPieIcon,
    component: 'StatsGrid',
    defaultSize: { w: 12, h: 2 },
  },
  {
    id: 'appointments',
    type: 'list',
    title: 'Termine',
    description: 'Heutige und kommende Termine',
    icon: CalendarDaysIcon,
    component: 'AppointmentsList',
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: 'clients',
    type: 'list',
    title: 'Kunden',
    description: 'Aktuelle Kundenübersicht',
    icon: UsersIcon,
    component: 'ClientsList',
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: 'activities',
    type: 'list',
    title: 'Aktivitäten',
    description: 'Letzte Aktivitäten und Updates',
    icon: ClipboardDocumentListIcon,
    component: 'RecentActivities',
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: 'quick-actions',
    type: 'quick-actions',
    title: 'Schnellaktionen',
    description: 'Häufig genutzte Aktionen',
    icon: BoltIcon,
    component: 'QuickActions',
    defaultSize: { w: 4, h: 4 },
  },
  {
    id: 'ai-insights',
    type: 'insights',
    title: 'KI-Einblicke',
    description: 'Intelligente Empfehlungen und Analysen',
    icon: LightBulbIcon,
    component: 'AiInsights',
    defaultSize: { w: 6, h: 4 },
  },
  {
    id: 'customer-stats',
    type: 'stats',
    title: 'Kunden-Statistiken',
    description: 'Individuelle Kundenmetriken und Fortschritte',
    icon: UserIcon,
    component: 'CustomerStats',
    defaultSize: { w: 6, h: 5 },
  },
  {
    id: 'performance-comparison',
    type: 'chart',
    title: 'Leistungsvergleich',
    description: 'Vergleiche Kundenleistungen',
    icon: UserGroupIcon,
    component: 'PerformanceComparison',
    defaultSize: { w: 6, h: 5 },
  },
  {
    id: 'package-widget',
    type: 'list',
    title: 'Paket-Übersicht',
    description: 'Ablaufende Pakete und Nutzungsstatistiken',
    icon: CubeIcon,
    component: 'PackageWidget',
    defaultSize: { w: 5, h: 5 },
  },
];

interface WidgetSelectorProps {
  onClose: () => void;
}

export default function WidgetSelector({ onClose }: WidgetSelectorProps) {
  const { addWidget, widgets } = useDashboardLayout();

  const handleAddWidget = (option: WidgetOption) => {
    const maxY = Math.max(...widgets.map(w => w.y + w.h), 0);
    
    const newWidget = {
      id: `${option.id}-${Date.now()}`,
      type: option.type as any,
      title: option.title,
      x: 0,
      y: maxY,
      w: option.defaultSize.w,
      h: option.defaultSize.h,
      component: option.component,
      minW: 3,
      minH: 2,
    };
    
    addWidget(newWidget);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg shadow-xl max-w-3xl w-full mx-4 max-h-[80vh] overflow-hidden">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <h2 className="text-xl font-semibold">Widget hinzufügen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {widgetOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleAddWidget(option)}
                  className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-all text-left group"
                >
                  <div className="flex items-start space-x-3">
                    <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-primary-100">
                      <Icon className="h-6 w-6 text-gray-600 group-hover:text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">
                        {option.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {option.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}