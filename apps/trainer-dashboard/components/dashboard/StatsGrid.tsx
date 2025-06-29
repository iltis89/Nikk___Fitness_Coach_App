import React from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
  CurrencyEuroIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Aktive Kunden',
    value: '24',
    change: '+2',
    changeType: 'increase',
    icon: UsersIcon,
  },
  {
    name: 'Termine diese Woche',
    value: '18',
    change: '-3',
    changeType: 'decrease',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Messungen heute',
    value: '4',
    change: '+1',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Umsatz diesen Monat',
    value: '€4,320',
    change: '+12%',
    changeType: 'increase',
    icon: CurrencyEuroIcon,
  },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6">
      {stats.map((stat) => (
        <div key={stat.name} className="group relative bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.name}</p>
              <p className="mt-2 text-3xl font-bold text-gray-900 tabular-nums">{stat.value}</p>
            </div>
            <div className="rounded-xl bg-gradient-to-br from-primary-100 to-primary-200 p-3 group-hover:scale-110 transition-transform duration-200">
              <stat.icon className="h-5 w-5 text-primary-700" aria-hidden="true" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className={`flex items-center gap-1 px-2 py-1 rounded-md ${
              stat.changeType === 'increase' 
                ? 'bg-success-50 text-success-700' 
                : 'bg-error-50 text-error-700'
            }`}>
              {stat.changeType === 'increase' ? (
                <ArrowUpIcon className="h-3 w-3" aria-label="Gestiegen" />
              ) : (
                <ArrowDownIcon className="h-3 w-3" aria-label="Gefallen" />
              )}
              <span className="font-semibold">{stat.change}</span>
            </div>
            <span className="text-xs text-gray-500">vs. letzten Monat</span>
          </div>
        </div>
      ))}
    </div>
  );
}