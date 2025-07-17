import React, { useState } from 'react';
import { 
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  ArrowTrendingUpIcon,
  BellIcon,
} from '@heroicons/react/24/outline';
import { PACKAGE_COLORS, PACKAGE_LABELS, PackageType } from '@/types/package';
import PackageCard from './PackageCard';

interface PackageData {
  id: string;
  clientName: string;
  clientId: string;
  type: PackageType;
  name: string;
  startDate: Date;
  endDate: Date;
  totalSessions: number;
  usedSessions: number;
  frequency?: {
    amount: number;
    period: 'week' | 'month';
  };
  price: number;
  status: 'active' | 'expiring' | 'expired';
  lastSession?: Date;
  nextSession?: Date;
}

// Mock data
const mockPackages: PackageData[] = [
  {
    id: '1',
    clientName: 'Max Mustermann',
    clientId: '1',
    type: 'personal_training',
    name: '10er Karte Personal Training',
    startDate: new Date('2023-12-01'),
    endDate: new Date('2024-02-29'),
    totalSessions: 10,
    usedSessions: 6,
    frequency: { amount: 2, period: 'week' },
    price: 800,
    status: 'active',
    lastSession: new Date('2024-01-10'),
    nextSession: new Date('2024-01-12'),
  },
  {
    id: '2',
    clientName: 'Anna Schmidt',
    clientId: '2',
    type: 'online_coaching',
    name: 'Online Coaching Premium',
    startDate: new Date('2023-11-15'),
    endDate: new Date('2024-01-30'),
    totalSessions: 12,
    usedSessions: 10,
    price: 299,
    status: 'expiring',
    lastSession: new Date('2024-01-09'),
  },
  {
    id: '3',
    clientName: 'Tom Weber',
    clientId: '3',
    type: 'training_consultation',
    name: 'Trainingsberatung Basic',
    startDate: new Date('2023-12-15'),
    endDate: new Date('2024-01-20'),
    totalSessions: 4,
    usedSessions: 3,
    frequency: { amount: 1, period: 'month' },
    price: 200,
    status: 'expiring',
    lastSession: new Date('2024-01-08'),
    nextSession: new Date('2024-01-15'),
  },
  {
    id: '4',
    clientName: 'Lisa Müller',
    clientId: '4',
    type: 'personal_training',
    name: '20er Karte Personal Training',
    startDate: new Date('2023-10-01'),
    endDate: new Date('2024-01-31'),
    totalSessions: 20,
    usedSessions: 18,
    frequency: { amount: 3, period: 'week' },
    price: 1500,
    status: 'active',
    lastSession: new Date('2024-01-11'),
  },
];

interface PackageOverviewProps {
  searchTerm: string;
}

export default function PackageOverview({ searchTerm }: PackageOverviewProps) {
  const [filter, setFilter] = useState<'all' | PackageType | 'expiring'>('all');
  
  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = pkg.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    
    if (filter === 'all') return true;
    if (filter === 'expiring') return pkg.status === 'expiring';
    return pkg.type === filter;
  });

  const stats = {
    total: mockPackages.length,
    active: mockPackages.filter(p => p.status === 'active').length,
    expiring: mockPackages.filter(p => p.status === 'expiring').length,
    revenue: mockPackages.reduce((sum, p) => sum + p.price, 0),
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-[rgb(20,25,45)] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Aktive Pakete</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">{stats.active}</p>
            </div>
            <UserGroupIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[rgb(20,25,45)] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Ablaufend</p>
              <p className="text-2xl font-bold text-warning-600 dark:text-warning-500">{stats.expiring}</p>
            </div>
            <ExclamationTriangleIcon className="h-8 w-8 text-warning-500" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[rgb(20,25,45)] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Gesamtwert</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">€{stats.revenue.toLocaleString()}</p>
            </div>
            <ArrowTrendingUpIcon className="h-8 w-8 text-success-500 dark:text-success-400" />
          </div>
        </div>
        
        <div className="bg-white dark:bg-[rgb(20,25,45)] rounded-xl border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Benachrichtigungen</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">3</p>
            </div>
            <BellIcon className="h-8 w-8 text-primary-500 dark:text-primary-400" />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'all'
              ? 'bg-gray-900 dark:bg-primary-600 text-white'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          Alle ({stats.total})
        </button>
        <button
          onClick={() => setFilter('expiring')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            filter === 'expiring'
              ? 'bg-warning-500 text-white dark:text-gray-900'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />
          Ablaufend ({stats.expiring})
        </button>
        {Object.entries(PACKAGE_LABELS).map(([type, label]) => (
          <button
            key={type}
            onClick={() => setFilter(type as PackageType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              filter === type
                ? `${PACKAGE_COLORS[type as PackageType].bg} ${PACKAGE_COLORS[type as PackageType].text} ${PACKAGE_COLORS[type as PackageType].border}`
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Package Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <PackageCard key={pkg.id} package={pkg} />
        ))}
      </div>

      {/* Empty State */}
      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">Keine Pakete gefunden</p>
        </div>
      )}
    </div>
  );
}