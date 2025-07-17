'use client';

import React from 'react';
import { XMarkIcon, ChartBarIcon, CalendarIcon, ScaleIcon } from '@heroicons/react/24/outline';
import { Modal, ClientAvatar } from '@/components/ui';
import { PackageType } from '@/types/package';
import { formatDate } from '@/utils/dateFormatters';
import { BodyCompositionChart } from './BodyCompositionChart';

interface Measurement {
  id: number;
  client: string;
  packageType: PackageType;
  date: string;
  weight: number;
  bodyFat: number;
  muscleMass: number;
  measurements: {
    [key: string]: number;
  };
}

interface MeasurementDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  measurement: Measurement | null;
}

const ypsiSiteNames: { [key: string]: string } = {
  chest: 'Brust',
  triceps: 'Trizeps',
  subscapular: 'Subscapular',
  midaxillary: 'Mittlere Achselhöhle',
  suprailiac: 'Suprailiac',
  abdominal: 'Bauch',
  thigh: 'Oberschenkel',
  lowerBack: 'Unterer Rücken',
  calf: 'Wade',
  chin: 'Kinn',
  cheek: 'Wange',
  hamstring: 'Hamstring',
  quad: 'Quadrizeps',
  knee: 'Knie',
};

const getColorForValue = (value: number, max: number): string => {
  const percentage = (value / max) * 100;
  if (percentage < 30) return 'bg-green-100 text-green-800';
  if (percentage < 60) return 'bg-yellow-100 text-yellow-800';
  return 'bg-red-100 text-red-800';
};

export function MeasurementDetailModal({ isOpen, onClose, measurement }: MeasurementDetailModalProps) {
  if (!measurement) return null;

  const totalSkinfold = Object.values(measurement.measurements).reduce((sum, val) => sum + val, 0);
  const maxSkinfold = Math.max(...Object.values(measurement.measurements));

  // Group measurements by body region
  const upperBody = ['chest', 'triceps', 'subscapular', 'midaxillary'];
  const core = ['suprailiac', 'abdominal', 'lowerBack'];
  const lowerBody = ['thigh', 'hamstring', 'quad', 'calf', 'knee'];
  const head = ['chin', 'cheek'];

  const renderMeasurementGroup = (title: string, keys: string[]) => (
    <div>
      <h4 className="text-sm font-semibold text-gray-900 mb-3">{title}</h4>
      <div className="space-y-2">
        {keys.map((key) => {
          const value = measurement.measurements[key];
          if (value === undefined) return null;
          
          return (
            <div key={key} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{ypsiSiteNames[key]}</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full transition-all"
                    style={{ width: `${(value / maxSkinfold) * 100}%` }}
                  />
                </div>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${getColorForValue(value, maxSkinfold)}`}>
                  {value} mm
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <ClientAvatar
              name={measurement.client}
              packageType={measurement.packageType}
              size="md"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{measurement.client}</h3>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <CalendarIcon className="h-4 w-4" />
                  <span>{formatDate(measurement.date, 'long')}</span>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <ScaleIcon className="h-4 w-4" />
                  <span>{measurement.weight} kg</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Gewicht</span>
              <ScaleIcon className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-2xl font-semibold text-gray-900">{measurement.weight} kg</p>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Körperfett</span>
              <ChartBarIcon className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-2xl font-semibold text-blue-900">{measurement.bodyFat}%</p>
          </div>
          
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Muskelmasse</span>
              <ChartBarIcon className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-2xl font-semibold text-green-900">{measurement.muscleMass} kg</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-500">Hautfalten Gesamt</span>
              <ChartBarIcon className="h-4 w-4 text-purple-400" />
            </div>
            <p className="text-2xl font-semibold text-purple-900">{totalSkinfold} mm</p>
          </div>
        </div>

        {/* Body Composition Chart */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <BodyCompositionChart
            weight={measurement.weight}
            bodyFat={measurement.bodyFat}
            muscleMass={measurement.muscleMass}
          />
        </div>

        {/* Detailed Measurements */}
        <div className="border-t pt-6">
          <h3 className="text-base font-semibold text-gray-900 mb-4">Detaillierte Hautfaltenmessungen</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderMeasurementGroup('Oberkörper', upperBody)}
              {renderMeasurementGroup('Kopf', head)}
            </div>
            <div className="space-y-6">
              {renderMeasurementGroup('Rumpf', core)}
              {renderMeasurementGroup('Unterkörper', lowerBody)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 pt-6 border-t flex justify-end gap-3">
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Schließen
          </button>
          <button className="btn-primary">
            Vergleichen
          </button>
        </div>
      </div>
    </Modal>
  );
}