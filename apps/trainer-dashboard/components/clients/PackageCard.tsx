import React from 'react';
import { useRouter } from 'next/navigation';
import {
  CalendarDaysIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ChartBarIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import { PACKAGE_COLORS, PACKAGE_LABELS, PackageType } from '@nv/shared/src/types/package';

interface PackageCardProps {
  package: {
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
  };
}

export default function PackageCard({ package: pkg }: PackageCardProps) {
  const router = useRouter();
  
  const daysUntilExpiry = Math.ceil((pkg.endDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  const usagePercentage = Math.round((pkg.usedSessions / pkg.totalSessions) * 100);
  const isExpiringSoon = daysUntilExpiry <= 14;
  const isHighUsage = usagePercentage >= 80;
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };
  
  const formatFrequency = () => {
    if (!pkg.frequency) return null;
    return `${pkg.frequency.amount}x pro ${pkg.frequency.period === 'week' ? 'Woche' : 'Monat'}`;
  };

  return (
    <div
      className={`bg-white rounded-xl border-2 p-6 hover:shadow-lg transition-all duration-200 cursor-pointer relative overflow-hidden ${
        PACKAGE_COLORS[pkg.type].border
      }`}
      onClick={() => router.push(`/clients/${pkg.clientId}`)}
    >
      {/* Status Badge */}
      {(isExpiringSoon || isHighUsage) && (
        <div className="absolute top-4 right-4 flex gap-2">
          {isExpiringSoon && (
            <div className="bg-warning-100 text-warning-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <ExclamationTriangleIcon className="h-3 w-3" />
              Läuft ab
            </div>
          )}
          {isHighUsage && (
            <div className="bg-error-100 text-error-700 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
              <ChartBarIcon className="h-3 w-3" />
              Fast aufgebraucht
            </div>
          )}
        </div>
      )}

      {/* Header */}
      <div className="mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          PACKAGE_COLORS[pkg.type].bg
        } ${PACKAGE_COLORS[pkg.type].text} mb-2`}>
          {PACKAGE_LABELS[pkg.type]}
        </div>
        <h3 className="text-lg font-bold text-gray-900">{pkg.clientName}</h3>
        <p className="text-sm text-gray-600">{pkg.name}</p>
      </div>

      {/* Usage Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Nutzung</span>
          <span className="text-sm font-medium text-gray-900">
            {pkg.usedSessions} / {pkg.totalSessions} Sessions
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              usagePercentage >= 80
                ? 'bg-error-500'
                : usagePercentage >= 60
                ? 'bg-warning-500'
                : 'bg-success-500'
            }`}
            style={{ width: `${usagePercentage}%` }}
          >
            <span className="sr-only">{usagePercentage}% genutzt</span>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">{usagePercentage}% genutzt</p>
      </div>

      {/* Details */}
      <div className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-600">
            <CalendarDaysIcon className="h-4 w-4" />
            Laufzeit
          </span>
          <span className="text-gray-900">
            {formatDate(pkg.startDate)} - {formatDate(pkg.endDate)}
          </span>
        </div>
        
        {pkg.frequency && (
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-gray-600">
              <ArrowPathIcon className="h-4 w-4" />
              Häufigkeit
            </span>
            <span className="text-gray-900">{formatFrequency()}</span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-gray-600">
            <ClockIcon className="h-4 w-4" />
            Verbleibend
          </span>
          <span className={`font-medium ${daysUntilExpiry <= 7 ? 'text-error-600' : 'text-gray-900'}`}>
            {daysUntilExpiry} Tage
          </span>
        </div>
      </div>

      {/* Next Session */}
      {pkg.nextSession && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">Nächster Termin</p>
          <p className="text-sm font-medium text-gray-900">
            {new Intl.DateTimeFormat('de-DE', {
              weekday: 'long',
              day: '2-digit',
              month: '2-digit',
              hour: '2-digit',
              minute: '2-digit',
            }).format(pkg.nextSession)}
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement extend package
          }}
          className="flex-1 text-sm font-medium text-primary-600 hover:text-primary-700 py-2 px-3 border border-primary-200 rounded-lg hover:bg-primary-50 transition-colors"
        >
          Verlängern
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            // TODO: Implement view details
          }}
          className="flex-1 text-sm font-medium text-gray-700 hover:text-gray-900 py-2 px-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Details
        </button>
      </div>
    </div>
  );
}