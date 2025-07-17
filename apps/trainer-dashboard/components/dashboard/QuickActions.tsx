import React from 'react';
import {
  UserPlusIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

const actions = [
  {
    name: 'Neuer Kunde',
    description: 'Kunde anlegen',
    icon: UserPlusIcon,
    href: '/dashboard/clients/new',
    gradient: 'from-primary-400 to-primary-600',
    hoverGradient: 'hover:from-primary-500 hover:to-primary-700',
    iconBg: 'bg-primary-50 dark:bg-primary-900/20',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    name: 'Trainingsplan',
    description: 'Plan erstellen',
    icon: ClipboardDocumentListIcon,
    href: '/dashboard/training-plans/new',
    gradient: 'from-success-400 to-success-600',
    hoverGradient: 'hover:from-success-500 hover:to-success-700',
    iconBg: 'bg-success-50 dark:bg-success-900/20',
    iconColor: 'text-success-600 dark:text-success-400',
  },
  {
    name: 'Messung',
    description: 'Werte erfassen',
    icon: ChartBarIcon,
    href: '/dashboard/measurements/new',
    gradient: 'from-info-400 to-info-600',
    hoverGradient: 'hover:from-info-500 hover:to-info-700',
    iconBg: 'bg-info-50 dark:bg-info-900/20',
    iconColor: 'text-info-600 dark:text-info-400',
  },
  {
    name: 'Termin',
    description: 'Termin buchen',
    icon: CalendarIcon,
    href: '/dashboard/calendar/new',
    gradient: 'from-warning-400 to-warning-600',
    hoverGradient: 'hover:from-warning-500 hover:to-warning-700',
    iconBg: 'bg-warning-50 dark:bg-warning-900/20',
    iconColor: 'text-warning-600 dark:text-warning-400',
  },
];

export default function QuickActions() {
  return (
    <div className="p-4 h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-gray-900 dark:text-gray-50 uppercase tracking-wider">Schnellaktionen</h3>
      </div>
      <div className="grid grid-cols-2 gap-3 flex-1">
        {actions.map((action, index) => (
          <a
            key={action.name}
            href={action.href}
            className="group relative flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-primary-50/30 dark:hover:bg-primary-900/10 hover:shadow-sm dark:hover:shadow-gray-900/20 transition-all duration-200 cursor-pointer"
            tabIndex={0}
            role="link"
            aria-label={`${action.name} - ${action.description}`}
          >
            <div className={`p-2.5 rounded-lg ${action.iconBg} group-hover:scale-105 transition-transform duration-200`}>
              <action.icon className={`h-5 w-5 ${action.iconColor}`} aria-hidden="true" />
            </div>
            
            <div className="flex-1 min-w-0">
              <span className="block text-sm font-semibold text-gray-900 dark:text-gray-50 truncate">
                {action.name}
              </span>
              <span className="block text-xs text-gray-500 dark:text-gray-400 truncate">
                {action.description}
              </span>
            </div>
            
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg className="h-4 w-4 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}