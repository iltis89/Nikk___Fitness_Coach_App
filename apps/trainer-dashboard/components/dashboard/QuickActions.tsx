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
    iconBg: 'bg-primary-50',
    iconColor: 'text-primary-600',
  },
  {
    name: 'Trainingsplan',
    description: 'Plan erstellen',
    icon: ClipboardDocumentListIcon,
    href: '/dashboard/training-plans/new',
    gradient: 'from-success-400 to-success-600',
    hoverGradient: 'hover:from-success-500 hover:to-success-700',
    iconBg: 'bg-success-50',
    iconColor: 'text-success-600',
  },
  {
    name: 'Messung',
    description: 'Werte erfassen',
    icon: ChartBarIcon,
    href: '/dashboard/measurements/new',
    gradient: 'from-info-400 to-info-600',
    hoverGradient: 'hover:from-info-500 hover:to-info-700',
    iconBg: 'bg-info-50',
    iconColor: 'text-info-600',
  },
  {
    name: 'Termin',
    description: 'Termin buchen',
    icon: CalendarIcon,
    href: '/dashboard/calendar/new',
    gradient: 'from-warning-400 to-warning-600',
    hoverGradient: 'hover:from-warning-500 hover:to-warning-700',
    iconBg: 'bg-warning-50',
    iconColor: 'text-warning-600',
  },
];

export default function QuickActions() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Schnellaktionen</h3>
        <SparklesIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        {actions.map((action, index) => (
          <a
            key={action.name}
            href={action.href}
            className="group relative flex flex-col items-center justify-center p-6 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
            tabIndex={0}
            role="link"
            aria-label={`${action.name} - ${action.description}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${action.gradient}`} />
            
            <div className={`relative p-4 rounded-2xl ${action.iconBg} group-hover:scale-110 transition-all duration-300 mb-3`}>
              <action.icon className={`h-8 w-8 ${action.iconColor}`} aria-hidden="true" />
            </div>
            
            <div className="text-center relative z-10">
              <span className="block text-sm font-bold text-gray-900 group-hover:text-gray-800 transition-colors">
                {action.name}
              </span>
              <span className="block text-xs text-gray-500 mt-1 group-hover:text-gray-600 transition-colors">
                {action.description}
              </span>
            </div>
            
            <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className={`w-2 h-2 rounded-full bg-gradient-to-br ${action.gradient} animate-pulse`} />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}