import React from 'react';
import {
  LightBulbIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  UserGroupIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

const insights = [
  {
    id: 1,
    type: 'positive',
    title: 'Trainingsfortschritt',
    message: '3 Kunden zeigen außergewöhnliche Fortschritte diese Woche',
    icon: ArrowTrendingUpIcon,
    color: 'text-success-600',
    bg: 'bg-success-50',
    borderColor: 'border-success-200',
  },
  {
    id: 2,
    type: 'warning',
    title: 'Aufmerksamkeit benötigt',
    message: '2 Kunden haben ihr Training länger als 1 Woche pausiert',
    icon: ArrowTrendingDownIcon,
    color: 'text-warning-600',
    bg: 'bg-warning-50',
    borderColor: 'border-warning-200',
  },
  {
    id: 3,
    type: 'tip',
    title: 'Optimierungsvorschlag',
    message: 'Gruppiere Anna und Max für gemeinsames HIIT-Training',
    icon: UserGroupIcon,
    color: 'text-info-600',
    bg: 'bg-info-50',
    borderColor: 'border-info-200',
  },
  {
    id: 4,
    type: 'energy',
    title: 'Beste Trainingszeit',
    message: 'Deine Kunden performen 23% besser am Vormittag',
    icon: BoltIcon,
    color: 'text-primary-600',
    bg: 'bg-primary-50',
    borderColor: 'border-primary-200',
  },
];

export default function AiInsights() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">KI-Einblicke</h3>
        <div className="flex items-center gap-2">
          <LightBulbIcon className="h-5 w-5 text-warning-500 animate-pulse" aria-hidden="true" />
          <span className="text-xs font-medium text-gray-500">Live</span>
        </div>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {insights.map((insight, index) => (
          <div
            key={insight.id}
            className={`group relative flex items-start gap-3 p-4 rounded-xl border ${insight.borderColor} ${insight.bg} hover:shadow-md transition-all duration-200 cursor-pointer`}
            tabIndex={0}
            role="article"
            aria-label={`${insight.title}: ${insight.message}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`p-2 rounded-lg bg-white shadow-sm group-hover:scale-110 transition-transform duration-200`}>
              <insight.icon className={`h-5 w-5 ${insight.color}`} aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-gray-900">
                {insight.title}
              </p>
              <p className="text-xs text-gray-700 mt-0.5">
                {insight.message}
              </p>
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-xs font-medium text-gray-600 hover:text-primary-600">
              Details →
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Vollständige Analyse anzeigen →
        </button>
      </div>
    </div>
  );
}