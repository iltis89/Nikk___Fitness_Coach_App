'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  PlusIcon, 
  MagnifyingGlassIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@nv/shared/src/types/package';

const clients = [
  {
    id: 1,
    name: 'Demo Kunde',
    age: 30,
    packageType: 'personal_training' as PackageType,
    activePlans: 1,
    currentPlan: 'Advanced Training - Nikk Method',
    lastWorkout: '2025-01-20',
    weeklyProgress: 2,
    weeklyGoal: 4,
    nextWorkout: 'Woche 1 - Tag 3',
    status: 'active',
    trainingStyle: 'Hypertrophie mit Supersätzen',
    currentPhase: 'Aufbauphase',
  },
];

export default function TrainingPlansPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all');

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && client.status === 'active') ||
      (filterStatus === 'inactive' && client.status === 'inactive');
    return matchesSearch && matchesStatus;
  });

  const handleClientClick = (clientId: number) => {
    router.push(`/dashboard/training-plans/client/${clientId}`);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Training</h1>
        <p className="mt-1 text-sm text-gray-500">
          Wähle einen Kunden aus, um dessen Trainingspläne zu verwalten
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Kunde suchen..."
            className="input pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          className="input w-full sm:w-auto"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as 'all' | 'active' | 'inactive')}
        >
          <option value="all">Alle Kunden</option>
          <option value="active">Aktive Kunden</option>
          <option value="inactive">Inaktive Kunden</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            onClick={() => handleClientClick(client.id)}
            className="card hover:shadow-lg transition-all duration-200 cursor-pointer group"
          >
            <div className="card-body">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <ClientAvatar 
                    name={client.name} 
                    packageType={client.packageType}
                    size="md"
                  />
                  <div className="ml-3">
                    <h3 className="text-base font-semibold text-gray-900">{client.name}</h3>
                    <p className="text-sm text-gray-500">{client.age} Jahre</p>
                  </div>
                </div>
                <ArrowRightIcon className="h-5 w-5 text-gray-400 group-hover:text-primary-600 transition-colors" />
              </div>

              <div className="space-y-3">
                {client.status === 'active' ? (
                  <>
                    <div>
                      <p className="text-xs text-gray-500">Aktueller Plan</p>
                      <p className="text-sm font-medium text-gray-900">{client.currentPlan}</p>
                      <p className="text-xs text-gray-600 mt-1">{client.trainingStyle} • {client.currentPhase}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-gray-500">Wochenfortschritt</p>
                      <div className="mt-1 flex items-center space-x-2">
                        <div className="flex-1">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${(client.weeklyProgress / client.weeklyGoal) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-xs font-medium text-gray-700">
                          {client.weeklyProgress}/{client.weeklyGoal}
                        </span>
                      </div>
                    </div>

                    <div>
                      <p className="text-xs text-gray-500">Nächstes Workout</p>
                      <p className="text-sm font-medium text-gray-900">{client.nextWorkout}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="text-xs text-gray-500">
                        Letztes Training: {new Date(client.lastWorkout).toLocaleDateString('de-DE')}
                      </span>
                      <span className="badge badge-success">Aktiv</span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-sm text-gray-500 mb-2">Kein aktiver Trainingsplan</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(`/dashboard/training-plans/client/${client.id}?action=new-plan`);
                      }}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Plan erstellen →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Statistiken</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Aktive Kunden</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {clients.filter(c => c.status === 'active').length}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${(clients.filter(c => c.status === 'active').length / clients.length) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Trainingseinheiten diese Woche</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {clients.reduce((sum, client) => sum + client.weeklyProgress, 0)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-2">Durchschnittliche Trainingshäufigkeit</p>
                <p className="text-lg font-semibold text-gray-900">
                  {(clients.filter(c => c.weeklyGoal > 0).reduce((sum, client) => sum + client.weeklyProgress, 0) / 
                    clients.filter(c => c.weeklyGoal > 0).length).toFixed(1)} / Woche
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Schnellaktionen</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary">
                <PlusIcon className="mr-2 h-5 w-5" />
                Neue Übung erstellen
              </button>
              <button className="w-full btn-secondary">
                <DocumentTextIcon className="mr-2 h-5 w-5" />
                Vorlage verwalten
              </button>
              <button className="w-full btn-secondary">
                <ChartBarIcon className="mr-2 h-5 w-5" />
                Fortschrittsberichte
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Anstehende Workouts</h3>
            <div className="space-y-3">
              {clients
                .filter(c => c.status === 'active' && c.nextWorkout)
                .slice(0, 3)
                .map((client) => (
                  <div key={client.id} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{client.name}</p>
                      <p className="text-xs text-gray-500">{client.nextWorkout}</p>
                    </div>
                    <button 
                      onClick={() => handleClientClick(client.id)}
                      className="text-xs text-primary-600 hover:text-primary-700"
                    >
                      Anzeigen →
                    </button>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}