import React from 'react';
import { CurrencyEuroIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';

interface RevenueData {
  current: number;
  previous: number;
  trend: number;
  monthlyTarget: number;
}

export function RevenueWidget() {
  // Mock data - replace with real data from API
  const revenueData: RevenueData = {
    current: 12450,
    previous: 11200,
    trend: 11.2,
    monthlyTarget: 15000,
  };

  const progressPercentage = (revenueData.current / revenueData.monthlyTarget) * 100;
  const isPositiveTrend = revenueData.trend > 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  return (
    <div className="h-full p-4">
      <div className="h-full flex items-center">
        <div className="w-full flex items-center justify-between gap-4">
          {/* Current Revenue */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="rounded-lg bg-primary-50 p-2.5">
              <CurrencyEuroIcon className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-gray-500 whitespace-nowrap">Aktueller Umsatz</p>
              <h3 className="text-xl font-bold text-gray-900 whitespace-nowrap">
                {formatCurrency(revenueData.current)}
              </h3>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex-1 max-w-md px-4">
            <div className="flex justify-between items-center mb-1.5">
              <span className="text-xs font-medium text-gray-600 whitespace-nowrap">
                Monatsziel: {formatCurrency(revenueData.monthlyTarget)}
              </span>
              <span className="text-xs font-bold text-gray-900 ml-2">
                {progressPercentage.toFixed(0)}%
              </span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 relative ${
                  progressPercentage >= 100 
                    ? 'bg-success-500' 
                    : progressPercentage >= 75 
                    ? 'bg-primary-500' 
                    : progressPercentage >= 50 
                    ? 'bg-warning-500' 
                    : 'bg-error-500'
                }`}
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              >
                {progressPercentage >= 75 && (
                  <div className="absolute inset-0 bg-white/20 animate-pulse" />
                )}
              </div>
            </div>
          </div>

          {/* Trend & Comparison */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 whitespace-nowrap">vs. letzter Monat</p>
              <div className={`inline-flex items-center gap-1 mt-0.5 ${
                isPositiveTrend ? 'text-success-600' : 'text-error-600'
              }`}>
                {isPositiveTrend ? (
                  <ArrowTrendingUpIcon className="h-4 w-4 flex-shrink-0" />
                ) : (
                  <ArrowTrendingDownIcon className="h-4 w-4 flex-shrink-0" />
                )}
                <span className="text-sm font-bold whitespace-nowrap">
                  {isPositiveTrend ? '+' : ''}{revenueData.trend}%
                </span>
              </div>
            </div>
            <div className="w-px h-10 bg-gray-200" />
            <div className="text-right">
              <p className="text-xs font-medium text-gray-500 whitespace-nowrap">Differenz</p>
              <p className={`text-sm font-bold whitespace-nowrap ${
                isPositiveTrend ? 'text-success-600' : 'text-error-600'
              }`}>
                {isPositiveTrend ? '+' : ''}{formatCurrency(revenueData.current - revenueData.previous)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}