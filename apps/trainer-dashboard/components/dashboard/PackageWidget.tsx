import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ExclamationTriangleIcon,
  ArrowRightIcon,
  CalendarDaysIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { PACKAGE_COLORS, PACKAGE_LABELS, PackageType } from '@/types/package';

interface ExpiringPackage {
  id: string;
  clientName: string;
  packageName: string;
  type: PackageType;
  daysUntilExpiry: number;
  usagePercentage: number;
}

const mockExpiringPackages: ExpiringPackage[] = [
  {
    id: '1',
    clientName: 'Anna Schmidt',
    packageName: 'Online Coaching Premium',
    type: 'online_coaching',
    daysUntilExpiry: 5,
    usagePercentage: 85,
  },
  {
    id: '2',
    clientName: 'Tom Weber',
    packageName: 'Trainingsberatung Basic',
    type: 'training_consultation',
    daysUntilExpiry: 7,
    usagePercentage: 90,
  },
  {
    id: '3',
    clientName: 'Lisa Müller',
    packageName: '20er Karte PT',
    type: 'personal_training',
    daysUntilExpiry: 14,
    usagePercentage: 95,
  },
];

export default function PackageWidget() {
  const router = useRouter();
  
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Paket-Übersicht</h3>
        <button
          onClick={() => router.push('/clients?view=packages')}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Alle anzeigen →
        </button>
      </div>
      
      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {mockExpiringPackages.map((pkg) => (
          <div
            key={pkg.id}
            className="group p-4 bg-gradient-to-r from-white to-gray-50 rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200 cursor-pointer"
            onClick={() => router.push('/clients?view=packages')}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    PACKAGE_COLORS[pkg.type].bg
                  } ${PACKAGE_COLORS[pkg.type].text}`}>
                    {PACKAGE_LABELS[pkg.type]}
                  </span>
                  {pkg.daysUntilExpiry <= 7 && (
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                  )}
                </div>
                <p className="font-semibold text-gray-900">{pkg.clientName}</p>
                <p className="text-sm text-gray-600">{pkg.packageName}</p>
              </div>
              <ArrowRightIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <CalendarDaysIcon className="h-4 w-4" />
                  Ablauf
                </span>
                <span className={`font-medium ${
                  pkg.daysUntilExpiry <= 7 ? 'text-red-600' : 'text-gray-900'
                }`}>
                  {pkg.daysUntilExpiry} Tage
                </span>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-1 text-gray-600">
                  <ChartBarIcon className="h-4 w-4" />
                  Nutzung
                </span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${
                        pkg.usagePercentage >= 90
                          ? 'bg-red-500'
                          : pkg.usagePercentage >= 70
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${pkg.usagePercentage}%` }}
                    />
                  </div>
                  <span className="font-medium text-gray-900 text-xs">
                    {pkg.usagePercentage}%
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Quick extend action
                }}
                className="flex-1 text-xs font-medium text-primary-600 hover:text-primary-700 py-1.5 px-2 border border-primary-200 rounded-md hover:bg-primary-50 transition-colors"
              >
                Verlängern
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // TODO: Send reminder
                }}
                className="flex-1 text-xs font-medium text-gray-700 hover:text-gray-900 py-1.5 px-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                Erinnern
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between text-sm">
          <div>
            <p className="font-medium text-gray-900">3 Pakete laufen bald ab</p>
            <p className="text-xs text-gray-500">2 mit hoher Nutzung</p>
          </div>
          <button className="text-primary-600 hover:text-primary-700 font-medium">
            Aktionen →
          </button>
        </div>
      </div>
    </div>
  );
}