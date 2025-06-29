import React, { useState } from 'react';
import {
  UserGroupIcon,
  ChartBarIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';

interface ComparisonData {
  id: string;
  name: string;
  avatar?: string;
  metrics: {
    strength: number;
    endurance: number;
    flexibility: number;
    consistency: number;
    overall: number;
  };
  rank: number;
  change: 'up' | 'down' | 'stable';
}

const mockData: ComparisonData[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    metrics: {
      strength: 92,
      endurance: 78,
      flexibility: 65,
      consistency: 95,
      overall: 82.5,
    },
    rank: 1,
    change: 'up',
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    metrics: {
      strength: 68,
      endurance: 88,
      flexibility: 82,
      consistency: 90,
      overall: 82,
    },
    rank: 2,
    change: 'up',
  },
  {
    id: '3',
    name: 'Tom Weber',
    metrics: {
      strength: 85,
      endurance: 72,
      flexibility: 70,
      consistency: 75,
      overall: 75.5,
    },
    rank: 3,
    change: 'stable',
  },
  {
    id: '4',
    name: 'Lisa Müller',
    metrics: {
      strength: 72,
      endurance: 80,
      flexibility: 78,
      consistency: 65,
      overall: 73.75,
    },
    rank: 4,
    change: 'down',
  },
];

const metricLabels = {
  strength: 'Kraft',
  endurance: 'Ausdauer',
  flexibility: 'Flexibilität',
  consistency: 'Konstanz',
  overall: 'Gesamt',
};

export default function PerformanceComparison() {
  const [selectedMetric, setSelectedMetric] = useState<keyof typeof metricLabels>('overall');
  const [showDetails, setShowDetails] = useState(false);

  const sortedData = [...mockData].sort((a, b) => 
    b.metrics[selectedMetric] - a.metrics[selectedMetric]
  );

  const getChangeIcon = (change: 'up' | 'down' | 'stable') => {
    switch (change) {
      case 'up':
        return <ArrowUpIcon className="h-3 w-3 text-green-600" />;
      case 'down':
        return <ArrowDownIcon className="h-3 w-3 text-red-600" />;
      default:
        return <div className="h-3 w-3" />;
    }
  };

  const getBarColor = (value: number) => {
    if (value >= 85) return 'from-green-400 to-green-600';
    if (value >= 70) return 'from-blue-400 to-blue-600';
    if (value >= 50) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold text-gray-900">Leistungsvergleich</h3>
          <UserGroupIcon className="h-5 w-5 text-gray-400" />
        </div>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs font-medium text-primary-600 hover:text-primary-700"
        >
          {showDetails ? 'Weniger' : 'Details'} →
        </button>
      </div>

      {/* Metric Selector */}
      <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
        {Object.entries(metricLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedMetric(key as keyof typeof metricLabels)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-all ${
              selectedMetric === key
                ? 'bg-primary-100 text-primary-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Comparison Chart */}
      <div className="flex-1 space-y-3 overflow-y-auto scrollbar-hide">
        {sortedData.map((person, index) => (
          <div
            key={person.id}
            className="group relative"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="flex items-center gap-3 mb-1">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative">
                  <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-xs font-bold text-white">
                    {person.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  {index === 0 && (
                    <div className="absolute -top-1 -right-1">
                      <SparklesIcon className="h-4 w-4 text-yellow-500" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {person.name}
                  </p>
                  {showDetails && (
                    <p className="text-xs text-gray-500">
                      Rang #{index + 1} • {person.metrics[selectedMetric]}%
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getChangeIcon(person.change)}
                <span className="text-sm font-bold text-gray-900 tabular-nums w-12 text-right">
                  {person.metrics[selectedMetric]}%
                </span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="relative h-6 bg-gray-100 rounded-lg overflow-hidden">
              <div
                className={`absolute inset-y-0 left-0 bg-gradient-to-r ${getBarColor(person.metrics[selectedMetric])} rounded-lg transition-all duration-700 ease-out group-hover:shadow-md`}
                style={{ width: `${person.metrics[selectedMetric]}%` }}
              >
                <div className="h-full flex items-center justify-end pr-2">
                  <span className="text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    {person.metrics[selectedMetric]}%
                  </span>
                </div>
              </div>
            </div>

            {/* Detailed Metrics */}
            {showDetails && (
              <div className="mt-2 grid grid-cols-4 gap-2 p-2 bg-gray-50 rounded-lg">
                {Object.entries(metricLabels).filter(([key]) => key !== 'overall').map(([key, label]) => (
                  <div key={key} className="text-center">
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-xs font-bold text-gray-900">
                      {person.metrics[key as keyof typeof metricLabels]}%
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Insights */}
      <div className="mt-4 p-3 bg-gradient-to-r from-primary-50 to-primary-100 rounded-lg">
        <p className="text-xs text-primary-700">
          <span className="font-bold">Tipp:</span> {sortedData[0].name} zeigt die beste {metricLabels[selectedMetric]}-Leistung. 
          {selectedMetric === 'consistency' && ' Regelmäßigkeit ist der Schlüssel zum Erfolg!'}
          {selectedMetric === 'strength' && ' Krafttraining zahlt sich aus!'}
          {selectedMetric === 'endurance' && ' Ausdauer ist die Basis für alle anderen Bereiche.'}
        </p>
      </div>
    </div>
  );
}