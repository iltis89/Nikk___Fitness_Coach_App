'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ChartBarIcon, 
  CalendarIcon, 
  FunnelIcon,
  ArrowDownTrayIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@/types/package';
import { MeasurementDetailModal } from '@/components/measurements/MeasurementDetailModal';
import { ClientMeasurementHistoryModal } from '@/components/measurements/ClientMeasurementHistoryModal';
import { QuickMeasurementCard } from '@/components/measurements/QuickMeasurementCard';
import { QuickWellnessCheck } from '@/components/measurements/QuickWellnessCheck';
import { MeasurementStats } from '@/components/measurements/MeasurementStats';
import { MeasurementWizard } from '@/components/measurements/MeasurementWizard';
import { formatDate } from '@/utils/dateFormatters';

// Mock data - TODO: Replace with API calls
const measurements = [
  {
    id: 1,
    client: 'Max Mustermann',
    clientId: '1',
    packageType: 'personal_training' as PackageType,
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
    clientId: '2',
    packageType: 'online_coaching' as PackageType,
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

const stats = {
  totalMeasurements: 156,
  measurementsThisWeek: 12,
  averageBodyFatChange: -1.8,
  clientsImproving: 38,
};

const topProgressClients = [
  { id: '1', name: 'Max Mustermann', packageType: 'personal_training' as PackageType, change: '-2.3% Körperfett', trend: 'down' },
  { id: '2', name: 'Lisa Müller', packageType: 'online_coaching' as PackageType, change: '+1.2kg Muskelmasse', trend: 'up' },
  { id: '3', name: 'Tom Weber', packageType: 'training_consultation' as PackageType, change: '-3.5kg Gewicht', trend: 'down' },
];

const upcomingMeasurements = [
  { name: 'Tom Weber', daysUntil: 2 },
  { name: 'Anna Schmidt', daysUntil: 5 },
  { name: 'Sarah Johnson', daysUntil: 7 },
];

export default function MeasurementsPage() {
  const router = useRouter();
  const [selectedMeasurement, setSelectedMeasurement] = useState<typeof measurements[0] | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedClientForHistory, setSelectedClientForHistory] = useState<{ name: string; packageType: PackageType } | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardConfig, setWizardConfig] = useState<{ clientId: string; clientName: string; type: 'full' | 'quick' } | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('all');
  const [activeTab, setActiveTab] = useState<'overview' | 'table'>('overview');

  const handleStartMeasurement = (clientId: string, type: 'full' | 'quick') => {
    // TODO: Get client name from API
    const client = measurements.find(m => m.clientId === clientId);
    if (client) {
      setWizardConfig({ clientId, clientName: client.client, type });
      setShowWizard(true);
    }
  };

  const handleViewMeasurementDetails = (measurementId: number) => {
    const measurement = measurements.find(m => m.id === measurementId);
    if (measurement) {
      setSelectedMeasurement(measurement);
      setShowDetailModal(true);
    }
  };

  const handleWizardSubmit = (data: any) => {
    console.log('New measurement:', data);
    // TODO: API call to save measurement
    setShowWizard(false);
    setWizardConfig(null);
  };

  const handleWellnessCheckSubmit = (clientId: string, data: any) => {
    console.log('Wellness check for client:', clientId, data);
    // TODO: API call to save wellness check data
    // Show success message
  };

  const filteredMeasurements = measurements.filter(m =>
    m.client.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Messungen</h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Verfolge die Fortschritte deiner Kunden mit der YPSI Hautfaltenmethode
          </p>
        </div>
        
        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'overview' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Übersicht
          </button>
          <button
            onClick={() => setActiveTab('table')}
            className={`px-4 py-2 rounded-md transition-colors ${
              activeTab === 'table' 
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm' 
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
            }`}
          >
            Tabelle
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Stats Overview */}
          <MeasurementStats stats={stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Wellness Check */}
            <div className="lg:col-span-1">
              <QuickWellnessCheck onSubmit={handleWellnessCheckSubmit} />
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-6">
              {/* Top Progress */}
              <div className="card">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Top Fortschritte</h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Letzte 30 Tage</span>
                  </div>
                  <div className="space-y-3">
                    {topProgressClients.map((client, index) => (
                      <div 
                        key={index} 
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => {
                          setSelectedClientForHistory({ 
                            name: client.name, 
                            packageType: client.packageType 
                          });
                          setShowHistoryModal(true);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <ClientAvatar 
                            name={client.name} 
                            packageType={client.packageType}
                            size="sm"
                          />
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</p>
                            <p className={`text-xs ${client.trend === 'down' ? 'text-green-600 dark:text-green-400' : 'text-blue-600 dark:text-blue-400'}`}>
                              {client.change}
                            </p>
                          </div>
                        </div>
                        <ChartBarIcon className={`h-5 w-5 ${client.trend === 'down' ? 'text-green-500 dark:text-green-400' : 'text-blue-500 dark:text-blue-400'}`} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Upcoming Measurements */}
              <div className="card">
                <div className="card-body">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Anstehende Messungen</h3>
                    <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <div className="space-y-3">
                    {upcomingMeasurements.map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-900/10 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-amber-100 dark:bg-amber-900/20 rounded-lg">
                            <CalendarIcon className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{client.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Fällig in {client.daysUntil} Tagen</p>
                          </div>
                        </div>
                        <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                          Termin planen
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Table View */
        <div className="card">
          <div className="card-body">
            {/* Table Controls */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Kunde suchen..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                  />
                </div>
                <select
                  value={filterPeriod}
                  onChange={(e) => setFilterPeriod(e.target.value)}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400"
                >
                  <option value="all">Alle Zeiten</option>
                  <option value="week">Diese Woche</option>
                  <option value="month">Dieser Monat</option>
                  <option value="quarter">Dieses Quartal</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
                <ArrowDownTrayIcon className="h-5 w-5" />
                Export
              </button>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">
                      <div className="flex items-center gap-1">
                        Kunde
                        <span className="text-xs font-normal text-gray-500 dark:text-gray-400">(klicken für Historie)</span>
                      </div>
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Datum</th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Gewicht</th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Körperfett %</th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Muskelmasse</th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Summe Hautfalten</th>
                    <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMeasurements.map((measurement) => {
                    const totalSkinfold = Object.values(measurement.measurements).reduce((sum, val) => sum + val, 0);
                    return (
                      <tr key={measurement.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="py-4">
                          <div 
                            className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => {
                              setSelectedClientForHistory({ 
                                name: measurement.client, 
                                packageType: measurement.packageType 
                              });
                              setShowHistoryModal(true);
                            }}
                          >
                            <ClientAvatar 
                              name={measurement.client} 
                              packageType={measurement.packageType}
                              size="sm"
                            />
                            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                              {measurement.client}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-gray-900 dark:text-gray-100">
                          {formatDate(measurement.date, 'long')}
                        </td>
                        <td className="py-4 text-sm text-gray-900 dark:text-gray-100">{measurement.weight} kg</td>
                        <td className="py-4 text-sm text-gray-900 dark:text-gray-100">{measurement.bodyFat}%</td>
                        <td className="py-4 text-sm text-gray-900 dark:text-gray-100">{measurement.muscleMass} kg</td>
                        <td className="py-4 text-sm text-gray-900 dark:text-gray-100">{totalSkinfold} mm</td>
                        <td className="py-4 text-right">
                          <button 
                            onClick={() => {
                              setSelectedMeasurement(measurement);
                              setShowDetailModal(true);
                            }}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium"
                          >
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
      )}

      {/* Modals */}
      <MeasurementDetailModal
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setSelectedMeasurement(null);
        }}
        measurement={selectedMeasurement}
      />

      {selectedClientForHistory && (
        <ClientMeasurementHistoryModal
          isOpen={showHistoryModal}
          onClose={() => {
            setShowHistoryModal(false);
            setSelectedClientForHistory(null);
          }}
          clientName={selectedClientForHistory.name}
          packageType={selectedClientForHistory.packageType}
          onViewDetails={handleViewMeasurementDetails}
        />
      )}

      {showWizard && wizardConfig && (
        <MeasurementWizard
          isOpen={showWizard}
          onClose={() => {
            setShowWizard(false);
            setWizardConfig(null);
          }}
          clientId={wizardConfig.clientId}
          clientName={wizardConfig.clientName}
          measurementType={wizardConfig.type}
          onSubmit={handleWizardSubmit}
        />
      )}
    </div>
  );
}