'use client';

import { useState } from 'react';
import { ChartBarIcon, PlusIcon, CalendarIcon } from '@heroicons/react/24/outline';

const measurements = [
  {
    id: 1,
    client: 'Max Mustermann',
    date: '2024-01-16',
    weight: 85.5,
    bodyFat: 18.2,
    muscleMass: 69.7,
    measurements: {
      chest: 32,
      triceps: 15,
      subscapular: 22,
      midaxillary: 18,
      suprailiac: 25,
      abdominal: 28,
      thigh: 20,
      lowerBack: 24,
      calf: 12,
      chin: 8,
      cheek: 10,
      hamstring: 16,
      quad: 18,
      knee: 14,
    },
  },
  {
    id: 2,
    client: 'Anna Schmidt',
    date: '2024-01-15',
    weight: 65.2,
    bodyFat: 24.5,
    muscleMass: 49.2,
    measurements: {
      chest: 25,
      triceps: 18,
      subscapular: 20,
      midaxillary: 16,
      suprailiac: 22,
      abdominal: 24,
      thigh: 22,
      lowerBack: 20,
      calf: 14,
      chin: 10,
      cheek: 12,
      hamstring: 18,
      quad: 20,
      knee: 16,
    },
  },
];

const ypsiSites = [
  { key: 'chest', name: 'Brust', description: 'Diagonale Falte zwischen Brustwarze und vorderer Achselhöhle' },
  { key: 'triceps', name: 'Trizeps', description: 'Vertikale Falte auf der Rückseite des Oberarms' },
  { key: 'subscapular', name: 'Subscapular', description: 'Diagonale Falte unter dem Schulterblatt' },
  { key: 'midaxillary', name: 'Mittlere Achselhöhle', description: 'Vertikale Falte auf der mittleren Achsellinie' },
  { key: 'suprailiac', name: 'Suprailiac', description: 'Diagonale Falte über dem Hüftknochen' },
  { key: 'abdominal', name: 'Bauch', description: 'Vertikale Falte 2cm seitlich vom Bauchnabel' },
  { key: 'thigh', name: 'Oberschenkel', description: 'Vertikale Falte auf der Vorderseite des Oberschenkels' },
  { key: 'lowerBack', name: 'Unterer Rücken', description: 'Diagonale Falte über dem Beckenkamm' },
  { key: 'calf', name: 'Wade', description: 'Vertikale Falte auf der Innenseite der Wade' },
  { key: 'chin', name: 'Kinn', description: 'Vertikale Falte unter dem Kinn' },
  { key: 'cheek', name: 'Wange', description: 'Vertikale Falte auf der Wange' },
  { key: 'hamstring', name: 'Hamstring', description: 'Vertikale Falte auf der Rückseite des Oberschenkels' },
  { key: 'quad', name: 'Quadrizeps', description: 'Vertikale Falte auf dem Quadrizeps' },
  { key: 'knee', name: 'Knie', description: 'Vertikale Falte über der Kniescheibe' },
];

export default function MeasurementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState('');
  const [formData, setFormData] = useState({
    weight: '',
    measurements: Object.fromEntries(ypsiSites.map(site => [site.key, ''])),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting measurements:', { client: selectedClient, ...formData });
    setShowForm(false);
    setFormData({
      weight: '',
      measurements: Object.fromEntries(ypsiSites.map(site => [site.key, ''])),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Messungen</h1>
          <p className="mt-1 text-sm text-gray-500">
            Körpermessungen nach der YPSI Hautfaltenmethode
          </p>
        </div>
        <button 
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <PlusIcon className="mr-2 h-5 w-5" />
          Neue Messung
        </button>
      </div>

      {showForm && (
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Neue Messung erfassen</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="label">Kunde</label>
                  <select 
                    className="input"
                    value={selectedClient}
                    onChange={(e) => setSelectedClient(e.target.value)}
                    required
                  >
                    <option value="">Kunde auswählen...</option>
                    <option value="1">Max Mustermann</option>
                    <option value="2">Anna Schmidt</option>
                    <option value="3">Tom Weber</option>
                    <option value="4">Lisa Müller</option>
                  </select>
                </div>
                <div>
                  <label className="label">Gewicht (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    className="input"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    placeholder="85.5"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-900 mb-4">Hautfaltenmessungen (mm)</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {ypsiSites.map((site) => (
                    <div key={site.key}>
                      <label className="label">{site.name}</label>
                      <input
                        type="number"
                        step="0.5"
                        className="input"
                        value={formData.measurements[site.key]}
                        onChange={(e) => setFormData({
                          ...formData,
                          measurements: { ...formData.measurements, [site.key]: e.target.value }
                        })}
                        placeholder="0"
                      />
                      <p className="mt-1 text-xs text-gray-500">{site.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="btn-secondary"
                >
                  Abbrechen
                </button>
                <button type="submit" className="btn-primary">
                  Messung speichern
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Letzte Messungen</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Kunde</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Datum</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Gewicht</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Körperfett %</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Muskelmasse</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Summe Hautfalten</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {measurements.map((measurement) => {
                  const totalSkinfold = Object.values(measurement.measurements).reduce((sum, val) => sum + val, 0);
                  return (
                    <tr key={measurement.id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center">
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                            {measurement.client.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="ml-3 text-sm font-medium text-gray-900">{measurement.client}</span>
                        </div>
                      </td>
                      <td className="py-4 text-sm text-gray-900">
                        {new Date(measurement.date).toLocaleDateString('de-DE')}
                      </td>
                      <td className="py-4 text-sm text-gray-900">{measurement.weight} kg</td>
                      <td className="py-4 text-sm text-gray-900">{measurement.bodyFat}%</td>
                      <td className="py-4 text-sm text-gray-900">{measurement.muscleMass} kg</td>
                      <td className="py-4 text-sm text-gray-900">{totalSkinfold} mm</td>
                      <td className="py-4 text-right">
                        <button className="text-sm text-primary-600 hover:text-primary-700">
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Top Fortschritte diese Woche</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-medium text-success">
                    MM
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Max Mustermann</p>
                    <p className="text-xs text-gray-500">-2.3% Körperfett</p>
                  </div>
                </div>
                <ChartBarIcon className="h-5 w-5 text-success" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success/10 text-sm font-medium text-success">
                    LM
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">Lisa Müller</p>
                    <p className="text-xs text-gray-500">+1.2kg Muskelmasse</p>
                  </div>
                </div>
                <ChartBarIcon className="h-5 w-5 text-success" />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Anstehende Messungen</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Tom Weber</p>
                    <p className="text-xs text-gray-500">Fällig in 2 Tagen</p>
                  </div>
                </div>
                <button className="text-xs text-primary-600 hover:text-primary-700">
                  Termin planen
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CalendarIcon className="h-5 w-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Anna Schmidt</p>
                    <p className="text-xs text-gray-500">Fällig in 5 Tagen</p>
                  </div>
                </div>
                <button className="text-xs text-primary-600 hover:text-primary-700">
                  Termin planen
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}