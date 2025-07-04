'use client';

import React, { useState } from 'react';
import { PlusIcon, BoltIcon } from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';

interface QuickMeasurementCardProps {
  onStartMeasurement: (clientId: string, type: 'full' | 'quick') => void;
}

const recentClients = [
  { id: '1', name: 'Max Mustermann', lastMeasurement: '2024-01-16', packageType: 'personal_training' as const },
  { id: '2', name: 'Anna Schmidt', lastMeasurement: '2024-01-15', packageType: 'online_coaching' as const },
  { id: '3', name: 'Tom Weber', lastMeasurement: '2023-12-20', packageType: 'training_consultation' as const },
  { id: '4', name: 'Lisa Müller', lastMeasurement: '2023-12-18', packageType: 'personal_training' as const },
];

export function QuickMeasurementCard({ onStartMeasurement }: QuickMeasurementCardProps) {
  const [selectedClient, setSelectedClient] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = recentClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Schnellstart Messung</h2>
        <BoltIcon className="h-6 w-6 text-primary-600" />
      </div>

      <div className="space-y-4">
        {/* Client Search/Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kunde auswählen
          </label>
          <input
            type="text"
            placeholder="Kunde suchen..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          
          {searchTerm && filteredClients.length > 0 && (
            <div className="mt-2 border border-gray-200 rounded-lg bg-white shadow-sm max-h-40 overflow-y-auto">
              {filteredClients.map((client) => (
                <button
                  key={client.id}
                  onClick={() => {
                    setSelectedClient(client.id);
                    setSearchTerm(client.name);
                  }}
                  className="w-full px-3 py-2 flex items-center gap-3 hover:bg-gray-50 transition-colors"
                >
                  <ClientAvatar name={client.name} packageType={client.packageType} size="xs" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-gray-900">{client.name}</p>
                    <p className="text-xs text-gray-500">Letzte Messung: {new Date(client.lastMeasurement).toLocaleDateString('de-DE')}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recent Clients Quick Select */}
        <div>
          <p className="text-sm text-gray-600 mb-2">Oder wähle einen aktuellen Kunden:</p>
          <div className="grid grid-cols-2 gap-2">
            {recentClients.slice(0, 4).map((client) => (
              <button
                key={client.id}
                onClick={() => {
                  setSelectedClient(client.id);
                  setSearchTerm(client.name);
                }}
                className={`p-3 rounded-lg border transition-all ${
                  selectedClient === client.id
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ClientAvatar name={client.name} packageType={client.packageType} size="xs" />
                  <span className="text-sm font-medium text-gray-900 truncate">{client.name.split(' ')[1]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => selectedClient && onStartMeasurement(selectedClient, 'quick')}
            disabled={!selectedClient}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-white border-2 border-primary-500 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <BoltIcon className="h-5 w-5" />
            <span className="font-medium">Schnellmessung</span>
          </button>
          <button
            onClick={() => selectedClient && onStartMeasurement(selectedClient, 'full')}
            disabled={!selectedClient}
            className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PlusIcon className="h-5 w-5" />
            <span className="font-medium">Vollständige Messung</span>
          </button>
        </div>

        <p className="text-xs text-gray-600 text-center">
          <strong>Schnellmessung:</strong> Nur Gewicht & wichtigste Hautfalten<br />
          <strong>Vollständig:</strong> Alle 14 YPSI-Messpunkte
        </p>
      </div>
    </div>
  );
}