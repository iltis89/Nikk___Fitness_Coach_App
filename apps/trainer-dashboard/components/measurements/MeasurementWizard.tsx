'use client';

import React, { useState } from 'react';
import { XMarkIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { Modal } from '@/components/ui';

interface MeasurementWizardProps {
  isOpen: boolean;
  onClose: () => void;
  clientId: string;
  clientName: string;
  measurementType: 'full' | 'quick';
  onSubmit: (data: any) => void;
}

const quickMeasurementSites = [
  { key: 'weight', name: 'Gewicht', unit: 'kg', step: 0.1, description: 'Körpergewicht in Kilogramm' },
  { key: 'chest', name: 'Brust', unit: 'mm', step: 0.5, description: 'Diagonale Falte zwischen Brustwarze und vorderer Achselhöhle' },
  { key: 'abdominal', name: 'Bauch', unit: 'mm', step: 0.5, description: 'Vertikale Falte 2cm seitlich vom Bauchnabel' },
  { key: 'thigh', name: 'Oberschenkel', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Vorderseite des Oberschenkels' },
  { key: 'suprailiac', name: 'Suprailiac', unit: 'mm', step: 0.5, description: 'Diagonale Falte über dem Hüftknochen' },
];

const allMeasurementSites = [
  { key: 'weight', name: 'Gewicht', unit: 'kg', step: 0.1, description: 'Körpergewicht in Kilogramm' },
  { key: 'chest', name: 'Brust', unit: 'mm', step: 0.5, description: 'Diagonale Falte zwischen Brustwarze und vorderer Achselhöhle' },
  { key: 'triceps', name: 'Trizeps', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Rückseite des Oberarms' },
  { key: 'subscapular', name: 'Subscapular', unit: 'mm', step: 0.5, description: 'Diagonale Falte unter dem Schulterblatt' },
  { key: 'midaxillary', name: 'Mittlere Achselhöhle', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der mittleren Achsellinie' },
  { key: 'suprailiac', name: 'Suprailiac', unit: 'mm', step: 0.5, description: 'Diagonale Falte über dem Hüftknochen' },
  { key: 'abdominal', name: 'Bauch', unit: 'mm', step: 0.5, description: 'Vertikale Falte 2cm seitlich vom Bauchnabel' },
  { key: 'thigh', name: 'Oberschenkel', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Vorderseite des Oberschenkels' },
  { key: 'lowerBack', name: 'Unterer Rücken', unit: 'mm', step: 0.5, description: 'Diagonale Falte über dem Beckenkamm' },
  { key: 'calf', name: 'Wade', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Innenseite der Wade' },
  { key: 'chin', name: 'Kinn', unit: 'mm', step: 0.5, description: 'Vertikale Falte unter dem Kinn' },
  { key: 'cheek', name: 'Wange', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Wange' },
  { key: 'hamstring', name: 'Hamstring', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf der Rückseite des Oberschenkels' },
  { key: 'quad', name: 'Quadrizeps', unit: 'mm', step: 0.5, description: 'Vertikale Falte auf dem Quadrizeps' },
  { key: 'knee', name: 'Knie', unit: 'mm', step: 0.5, description: 'Vertikale Falte über der Kniescheibe' },
];

export function MeasurementWizard({
  isOpen,
  onClose,
  clientId,
  clientName,
  measurementType,
  onSubmit,
}: MeasurementWizardProps) {
  const sites = measurementType === 'quick' ? quickMeasurementSites : allMeasurementSites;
  const [currentStep, setCurrentStep] = useState(0);
  const [measurements, setMeasurements] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');

  const currentSite = sites[currentStep];
  const isLastStep = currentStep === sites.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      // Show summary
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    onSubmit({
      clientId,
      measurements,
      notes,
      date: new Date().toISOString(),
    });
    onClose();
  };

  const handleValueChange = (value: string) => {
    setMeasurements(prev => ({
      ...prev,
      [currentSite.key]: value
    }));
  };

  const isShowingSummary = currentStep === sites.length;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md" showCloseButton={false}>
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {measurementType === 'quick' ? 'Schnellmessung' : 'Vollständige Messung'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">{clientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">
              {isShowingSummary ? 'Zusammenfassung' : `Schritt ${currentStep + 1} von ${sites.length}`}
            </span>
            <span className="text-sm text-gray-600">
              {Math.round(((currentStep + 1) / (sites.length + 1)) * 100)}% abgeschlossen
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / (sites.length + 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Content */}
        {!isShowingSummary ? (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {currentSite.name}
              </h3>
              <p className="text-gray-600">{currentSite.description}</p>
            </div>

            <div className="max-w-xs mx-auto">
              <div className="relative">
                <input
                  type="number"
                  step={currentSite.step}
                  value={measurements[currentSite.key] || ''}
                  onChange={(e) => handleValueChange(e.target.value)}
                  placeholder="0"
                  className="w-full px-4 py-8 text-4xl font-bold text-center border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  autoFocus
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-2xl text-gray-500">
                  {currentSite.unit}
                </span>
              </div>
            </div>

            {/* Quick input buttons for common values */}
            {currentSite.key !== 'weight' && (
              <div className="flex justify-center gap-2">
                {[10, 15, 20, 25, 30].map(value => (
                  <button
                    key={value}
                    onClick={() => handleValueChange(value.toString())}
                    className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    {value}
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Summary */
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Zusammenfassung</h3>
            
            <div className="grid grid-cols-2 gap-3 max-h-64 overflow-y-auto">
              {sites.map(site => (
                <div key={site.key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium text-gray-700">{site.name}:</span>
                  <span className="text-sm font-bold text-gray-900">
                    {measurements[site.key] || '-'} {site.unit}
                  </span>
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Notizen (optional)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Besondere Beobachtungen..."
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={isFirstStep}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeftIcon className="h-5 w-5" />
            Zurück
          </button>

          {!isShowingSummary ? (
            <button
              onClick={handleNext}
              disabled={!measurements[currentSite.key]}
              className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLastStep ? 'Zusammenfassung' : 'Weiter'}
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Messung speichern
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
}