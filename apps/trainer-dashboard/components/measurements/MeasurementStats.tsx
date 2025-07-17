'use client';

import React from 'react';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon, UsersIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';

interface MeasurementStatsProps {
  stats: {
    totalMeasurements: number;
    measurementsThisWeek: number;
    averageBodyFatChange: number;
    clientsImproving: number;
  };
}

export function MeasurementStats({ stats }: MeasurementStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Messungen Total</h3>
          <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
            <CalendarDaysIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.totalMeasurements}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Alle Zeiten</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Diese Woche</h3>
          <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
            <CalendarDaysIcon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.measurementsThisWeek}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Neue Messungen</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Ø Körperfett</h3>
          <div className={`p-2 rounded-lg ${stats.averageBodyFatChange < 0 ? 'bg-green-100 dark:bg-green-900/20' : 'bg-red-100 dark:bg-red-900/20'}`}>
            {stats.averageBodyFatChange < 0 ? (
              <ArrowTrendingDownIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <ArrowTrendingUpIcon className="h-5 w-5 text-red-600 dark:text-red-400" />
            )}
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {stats.averageBodyFatChange > 0 ? '+' : ''}{stats.averageBodyFatChange.toFixed(1)}%
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Letzte 30 Tage</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Fortschritte</h3>
          <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
            <UsersIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{stats.clientsImproving}</p>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Kunden verbessert</p>
      </div>
    </div>
  );
}