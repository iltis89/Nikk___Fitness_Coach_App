import React from 'react';
import { 
  UsersIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
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
];

export default function StatsGrid() {
  return (
    <div className="flex flex-col gap-3 p-4 h-full">
      {stats.map((stat, index) => (
        <div 
          key={stat.name} 
          className="group relative bg-white rounded-lg border border-gray-100 p-3 hover:border-primary-200 hover:shadow-sm transition-all duration-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-gray-50 p-2 group-hover:bg-primary-50 transition-colors duration-200">
                <stat.icon className="h-4 w-4 text-gray-600 group-hover:text-primary-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-500">{stat.name}</p>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <p className="text-xl font-bold text-gray-900 tabular-nums">{stat.value}</p>
                  <div className={`flex items-center gap-0.5 text-xs font-medium ${
                    stat.changeType === 'increase' 
                      ? 'text-success-600' 
                      : 'text-error-600'
                  }`}>
                    {stat.changeType === 'increase' ? (
                      <ArrowUpIcon className="h-3 w-3" />
                    ) : (
                      <ArrowDownIcon className="h-3 w-3" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}