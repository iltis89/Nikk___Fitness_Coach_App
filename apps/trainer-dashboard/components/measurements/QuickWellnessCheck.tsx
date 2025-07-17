'use client';

import React, { useState } from 'react';
import { SparklesIcon } from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';

interface QuickWellnessCheckProps {
  onSubmit: (clientId: string, data: WellnessData) => void;
}

interface WellnessData {
  energyLevel: number;
  sleepHours: number;
  sleepMinutes: number;
  gripStrength?: number;
  notes: string;
}

const recentClients = [
  { id: '1', name: 'Max Mustermann', lastCheck: '2024-01-16', packageType: 'personal_training' as const },
  { id: '2', name: 'Anna Schmidt', lastCheck: '2024-01-15', packageType: 'online_coaching' as const },
  { id: '3', name: 'Tom Weber', lastCheck: '2023-12-20', packageType: 'training_consultation' as const },
  { id: '4', name: 'Lisa Müller', lastCheck: '2023-12-18', packageType: 'personal_training' as const },
];

export function QuickWellnessCheck({ onSubmit }: QuickWellnessCheckProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [energyLevel, setEnergyLevel] = useState(5);
  const [sleepHours, setSleepHours] = useState(7);
  const [sleepMinutes, setSleepMinutes] = useState(0);
  const [gripStrength, setGripStrength] = useState<number | undefined>(undefined);
  const [notes, setNotes] = useState('');

  const filteredClients = recentClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = () => {
    if (selectedClient) {
      onSubmit(selectedClient, {
        energyLevel,
        sleepHours,
        sleepMinutes,
        gripStrength,
        notes
      });
      // Reset form
      setEnergyLevel(5);
      setSleepHours(7);
      setSleepMinutes(0);
      setGripStrength(undefined);
      setNotes('');
    }
  };

  return (
    <div className="bg-gradient-to-br from-primary-50 dark:from-primary-900/20 to-primary-100 dark:to-primary-800/20 rounded-xl p-6 border border-primary-200 dark:border-primary-700 transition-colors duration-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Quick Check</h2>
        <SparklesIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
      </div>

      <div className="space-y-4">
        {/* Client Search/Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Kunde auswählen
          </label>
          <input
            type="text"
            placeholder="Kunde suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-colors duration-200"
          />
          
          {searchTerm && filteredClients.length > 0 && (
            <div className="mt-2 border border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm max-h-40 overflow-y-auto transition-colors duration-200">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id);
                    setSearchTerm(client.name);
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <ClientAvatar name={client.name} packageType={client.packageType} size="xs" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Letzter Check: {new Date(client.lastCheck).toLocaleDateString('de-DE')}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {selectedClient && (
          <>
            {/* Energy Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Energielevel
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={energyLevel}
                  onChange={(e) => setEnergyLevel(parseInt(e.target.value))}
                  className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="w-12 text-center font-semibold text-primary-600 dark:text-primary-400">
                  {energyLevel}/10
                </span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                <span>Müde</span>
                <span>Energiegeladen</span>
              </div>
            </div>

            {/* Sleep Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Schlafdauer
              </label>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="23"
                    value={sleepHours}
                    onChange={(e) => setSleepHours(Math.max(0, Math.min(23, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Stunden</span>
                </div>
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="0"
                    max="59"
                    step="15"
                    value={sleepMinutes}
                    onChange={(e) => setSleepMinutes(Math.max(0, Math.min(59, parseInt(e.target.value) || 0)))}
                    className="w-16 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">Minuten</span>
                </div>
              </div>
            </div>

            {/* Grip Strength */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Griffkraft (kg)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={gripStrength || ''}
                onChange={(e) => setGripStrength(e.target.value ? parseFloat(e.target.value) : undefined)}
                placeholder="z.B. 45.5"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
              />
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Sonstiges
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Zusätzliche Notizen zum Wohlbefinden..."
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 resize-none transition-colors duration-200"
              />
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 text-white rounded-lg transition-colors font-medium"
            >
              <SparklesIcon className="h-5 w-5" />
              <span>Quick Check speichern</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

<style jsx>{`
  .slider::-webkit-slider-thumb {
    appearance: none;
    width: 20px;
    height: 20px;
    background: rgb(14 165 233);
    cursor: pointer;
    border-radius: 50%;
  }

  .slider::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: rgb(14 165 233);
    cursor: pointer;
    border-radius: 50%;
    border: none;
  }

  .dark .slider::-webkit-slider-thumb {
    background: rgb(56 189 248);
  }

  .dark .slider::-moz-range-thumb {
    background: rgb(56 189 248);
  }
`}</style>