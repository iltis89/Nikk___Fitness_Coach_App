'use client';

import React, { useState } from 'react';
import { XMarkIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon, MinusIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@/types/package';
import { formatDate } from '@/utils/dateFormatters';

interface MeasurementHistory {
  id: number;
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  totalSkinfold: number;
}

interface ClientMeasurementHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  clientName: string;
  packageType: PackageType;
  onViewDetails: (measurementId: number) => void;
}

// Mock data - TODO: Replace with API call
const getMeasurementHistory = (clientName: string): MeasurementHistory[] => {
  if (clientName === 'Max Mustermann') {
    return [
      { id: 1, date: '2024-01-16', weight: 85.5, bodyFat: 18.2, muscleMass: 69.7, totalSkinfold: 234 },
      { id: 2, date: '2023-12-16', weight: 87.2, bodyFat: 20.1, muscleMass: 68.4, totalSkinfold: 248 },
      { id: 3, date: '2023-11-16', weight: 88.5, bodyFat: 21.5, muscleMass: 67.8, totalSkinfold: 256 },
      { id: 4, date: '2023-10-16', weight: 89.1, bodyFat: 22.3, muscleMass: 67.2, totalSkinfold: 262 },
      { id: 5, date: '2023-09-16', weight: 90.2, bodyFat: 23.8, muscleMass: 66.5, totalSkinfold: 271 },
    ];
  } else if (clientName === 'Anna Schmidt') {
    return [
      { id: 6, date: '2024-01-15', weight: 65.2, bodyFat: 24.5, muscleMass: 49.2, totalSkinfold: 186 },
      { id: 7, date: '2023-12-15', weight: 66.1, bodyFat: 25.8, muscleMass: 48.8, totalSkinfold: 195 },
      { id: 8, date: '2023-11-15', weight: 67.3, bodyFat: 26.9, muscleMass: 48.3, totalSkinfold: 203 },
    ];
  }
  return [];
};

const getTrend = (current: number, previous: number, isReversed: boolean = false) => {
  const diff = current - previous;
  if (Math.abs(diff) < 0.1) return { icon: MinusIcon, color: 'text-gray-500', value: '0' };
  
  const isPositive = isReversed ? diff < 0 : diff > 0;
  return {
    icon: diff > 0 ? ArrowTrendingUpIcon : ArrowTrendingDownIcon,
    color: isPositive ? 'text-green-600' : 'text-red-600',
    value: `${diff > 0 ? '+' : ''}${diff.toFixed(1)}`
  };
};

export function ClientMeasurementHistoryModal({ 
  isOpen, 
  onClose, 
  clientName, 
  packageType,
  onViewDetails 
}: ClientMeasurementHistoryModalProps) {
  const measurements = getMeasurementHistory(clientName);
  const [selectedMeasurementId, setSelectedMeasurementId] = useState<number | null>(null);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
          onClick={onClose}
        />

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <ClientAvatar
                  name={clientName}
                  packageType={packageType}
                  size="md"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{clientName}</h3>
                  <p className="text-sm text-gray-500 mt-1">Messungshistorie</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {!measurements.length ? (
              <div className="text-center py-8">
                <p className="text-gray-500">Keine Messungen für diesen Kunden gefunden.</p>
              </div>
            ) : (
              <>
                {/* Progress Summary */}
                {measurements.length >= 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Gewicht</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{measurements[0].weight} kg</span>
                        {(() => {
                          const trend = getTrend(measurements[0].weight, measurements[1].weight, true);
                          return (
                            <div className={`flex items-center gap-1 ${trend.color}`}>
                              <trend.icon className="h-3 w-3" />
                              <span className="text-xs font-medium">{trend.value}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Körperfett</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{measurements[0].bodyFat}%</span>
                        {(() => {
                          const trend = getTrend(measurements[0].bodyFat, measurements[1].bodyFat, true);
                          return (
                            <div className={`flex items-center gap-1 ${trend.color}`}>
                              <trend.icon className="h-3 w-3" />
                              <span className="text-xs font-medium">{trend.value}%</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="bg-green-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Muskelmasse</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{measurements[0].muscleMass} kg</span>
                        {(() => {
                          const trend = getTrend(measurements[0].muscleMass, measurements[1].muscleMass);
                          return (
                            <div className={`flex items-center gap-1 ${trend.color}`}>
                              <trend.icon className="h-3 w-3" />
                              <span className="text-xs font-medium">{trend.value}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-3">
                      <p className="text-xs text-gray-500 mb-1">Hautfalten</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{measurements[0].totalSkinfold} mm</span>
                        {(() => {
                          const trend = getTrend(measurements[0].totalSkinfold, measurements[1].totalSkinfold, true);
                          return (
                            <div className={`flex items-center gap-1 ${trend.color}`}>
                              <trend.icon className="h-3 w-3" />
                              <span className="text-xs font-medium">{trend.value}</span>
                            </div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {/* Measurements List */}
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Datum</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gewicht</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Körperfett</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Muskelmasse</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hautfalten</th>
                        <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {measurements.map((measurement, index) => (
                        <tr 
                          key={measurement.id} 
                          className={`hover:bg-gray-50 transition-colors cursor-pointer ${
                            selectedMeasurementId === measurement.id ? 'bg-primary-50' : ''
                          }`}
                          onClick={() => setSelectedMeasurementId(measurement.id)}
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className="text-sm font-medium text-gray-900">
                                {formatDate(measurement.date, 'long')}
                              </span>
                              {index === 0 && (
                                <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
                                  Aktuell
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{measurement.weight} kg</span>
                              {index < measurements.length - 1 && (
                                <span className={`text-xs ${
                                  measurement.weight < measurements[index + 1].weight ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {measurement.weight < measurements[index + 1].weight ? '↓' : '↑'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{measurement.bodyFat}%</span>
                              {index < measurements.length - 1 && (
                                <span className={`text-xs ${
                                  measurement.bodyFat < measurements[index + 1].bodyFat ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {measurement.bodyFat < measurements[index + 1].bodyFat ? '↓' : '↑'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{measurement.muscleMass} kg</span>
                              {index < measurements.length - 1 && (
                                <span className={`text-xs ${
                                  measurement.muscleMass > measurements[index + 1].muscleMass ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {measurement.muscleMass > measurements[index + 1].muscleMass ? '↑' : '↓'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-900">{measurement.totalSkinfold} mm</span>
                              {index < measurements.length - 1 && (
                                <span className={`text-xs ${
                                  measurement.totalSkinfold < measurements[index + 1].totalSkinfold ? 'text-green-600' : 'text-red-600'
                                }`}>
                                  {measurement.totalSkinfold < measurements[index + 1].totalSkinfold ? '↓' : '↑'}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onViewDetails(measurement.id);
                                onClose();
                              }}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-1"
                            >
                              Details
                              <ChevronRightIcon className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Footer */}
                <div className="mt-6 flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    {measurements.length} Messungen gefunden
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="btn-secondary"
                    >
                      Schließen
                    </button>
                    <button
                      onClick={() => {
                        if (selectedMeasurementId) {
                          onViewDetails(selectedMeasurementId);
                          onClose();
                        }
                      }}
                      disabled={!selectedMeasurementId}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Details anzeigen
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}