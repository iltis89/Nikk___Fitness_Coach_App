import React, { useState } from 'react';
import { 
  UserIcon,
  ChartBarIcon,
  FireIcon,
  TrophyIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  CalendarDaysIcon,
  ScaleIcon,
  HeartIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@nv/shared/src/types/package';

interface CustomerMetric {
  label: string;
  value: string | number;
  change?: number;
  unit?: string;
  icon: React.ComponentType<any>;
  color: string;
  trend?: 'up' | 'down' | 'stable';
}

interface Customer {
  id: string;
  name: string;
  avatar?: string;
  packageType?: PackageType | null;
  metrics: CustomerMetric[];
  goals: {
    title: string;
    progress: number;
    target: string;
  }[];
  streak: number;
  nextSession: string;
  lastActivity: string;
  tags: string[];
}

const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    packageType: 'personal_training' as PackageType,
    metrics: [
      { label: 'Körperfett', value: 18.5, change: -2.3, unit: '%', icon: ScaleIcon, color: 'text-green-600', trend: 'down' },
      { label: 'Muskelmasse', value: 42.3, change: 1.2, unit: 'kg', icon: ChartBarIcon, color: 'text-blue-600', trend: 'up' },
      { label: 'Ruhepuls', value: 62, change: -3, unit: 'bpm', icon: HeartIcon, color: 'text-red-600', trend: 'down' },
      { label: 'Kraft', value: 125, change: 15, unit: 'kg', icon: BoltIcon, color: 'text-purple-600', trend: 'up' },
    ],
    goals: [
      { title: 'Körperfett reduzieren', progress: 65, target: '15%' },
      { title: 'Bankdrücken 100kg', progress: 85, target: '100kg' },
    ],
    streak: 24,
    nextSession: 'Morgen, 09:00',
    lastActivity: 'vor 2 Stunden',
    tags: ['Muskelaufbau', 'Fortgeschritten'],
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    packageType: 'online_coaching' as PackageType,
    metrics: [
      { label: 'Körperfett', value: 24.8, change: -1.5, unit: '%', icon: ScaleIcon, color: 'text-green-600', trend: 'down' },
      { label: 'Gewicht', value: 65.2, change: -2.1, unit: 'kg', icon: ChartBarIcon, color: 'text-blue-600', trend: 'down' },
      { label: 'Ausdauer', value: 'Gut', icon: HeartIcon, color: 'text-red-600', trend: 'up' },
      { label: 'Flexibilität', value: 8.5, change: 0.5, unit: '/10', icon: BoltIcon, color: 'text-purple-600', trend: 'up' },
    ],
    goals: [
      { title: 'Abnehmen', progress: 45, target: '-5kg' },
      { title: '5km Laufen', progress: 72, target: '< 30min' },
    ],
    streak: 16,
    nextSession: 'Mi, 14:00',
    lastActivity: 'gestern',
    tags: ['Abnehmen', 'Ausdauer'],
  },
];

export default function CustomerStats() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>(mockCustomers[0]);
  const [view, setView] = useState<'metrics' | 'progress'>('metrics');

  const getTrendIcon = (trend?: 'up' | 'down' | 'stable') => {
    if (trend === 'up') return <ArrowUpIcon className="h-3 w-3" />;
    if (trend === 'down') return <ArrowDownIcon className="h-3 w-3" />;
    return null;
  };

  const getTrendColor = (trend?: 'up' | 'down' | 'stable', isPositive: boolean = true) => {
    if (!trend || trend === 'stable') return 'text-gray-500';
    if (trend === 'up') return isPositive ? 'text-green-600' : 'text-red-600';
    if (trend === 'down') return isPositive ? 'text-red-600' : 'text-green-600';
    return 'text-gray-500';
  };

  return (
    <div className="p-6 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <select
            value={selectedCustomer.id}
            onChange={(e) => {
              const customer = mockCustomers.find(c => c.id === e.target.value);
              if (customer) setSelectedCustomer(customer);
            }}
            className="text-lg font-bold text-gray-900 bg-transparent border-none focus:outline-none cursor-pointer hover:text-primary-700"
          >
            {mockCustomers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.name}
              </option>
            ))}
          </select>
          {selectedCustomer.streak > 20 && (
            <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded-full">
              <FireIcon className="h-4 w-4 text-orange-600" />
              <span className="text-xs font-bold text-orange-600">{selectedCustomer.streak} Tage</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('metrics')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              view === 'metrics' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Metriken
          </button>
          <button
            onClick={() => setView('progress')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
              view === 'progress' 
                ? 'bg-primary-100 text-primary-700' 
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            Fortschritt
          </button>
        </div>
      </div>

      {/* Customer Info */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <ClientAvatar 
            name={selectedCustomer.name} 
            packageType={selectedCustomer.packageType}
            size="md"
          />
          <div>
            <div className="flex items-center gap-2">
              {selectedCustomer.tags.map(tag => (
                <span key={tag} className="text-xs px-2 py-0.5 bg-white rounded-full text-gray-600">
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Letzte Aktivität: {selectedCustomer.lastActivity}
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500">Nächstes Training</p>
          <p className="text-sm font-bold text-gray-900">{selectedCustomer.nextSession}</p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {view === 'metrics' ? (
          <div className="grid grid-cols-2 gap-3">
            {selectedCustomer.metrics.map((metric, index) => (
              <div
                key={index}
                className="group relative p-4 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className={`p-2 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform`}>
                    <metric.icon className={`h-5 w-5 ${metric.color}`} />
                  </div>
                  {metric.trend && metric.change !== undefined && (
                    <div className={`flex items-center gap-0.5 text-xs font-medium ${
                      getTrendColor(metric.trend, metric.label !== 'Körperfett' && metric.label !== 'Ruhepuls')
                    }`}>
                      {getTrendIcon(metric.trend)}
                      <span>{Math.abs(metric.change)}{metric.unit}</span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500">{metric.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">
                  {metric.value}{metric.unit}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {selectedCustomer.goals.map((goal, index) => (
              <div key={index} className="p-4 bg-white rounded-xl border border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-bold text-gray-900">{goal.title}</h4>
                  <span className="text-xs text-gray-500">Ziel: {goal.target}</span>
                </div>
                <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-400 to-primary-600 rounded-full transition-all duration-500"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">{goal.progress}% erreicht</span>
                  {goal.progress >= 80 && (
                    <TrophyIcon className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl">
              <h4 className="text-sm font-bold text-primary-900 mb-2">
                Trainingsempfehlung
              </h4>
              <p className="text-xs text-primary-700">
                Basierend auf den aktuellen Fortschritten sollte {selectedCustomer.name.split(' ')[0]} 
                den Fokus auf Krafttraining legen. Die Ausdauerwerte sind bereits sehr gut.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}