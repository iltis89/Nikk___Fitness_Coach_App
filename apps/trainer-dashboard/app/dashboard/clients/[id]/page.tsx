'use client';

import { useState } from 'react';
import { 
  ArrowLeftIcon,
  PencilIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CameraIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@nv/shared/src/types/package';

const client = {
  id: 1,
  name: 'Max Mustermann',
  email: 'max@example.com',
  phone: '+49 123 456789',
  birthDate: '1989-03-15',
  joinDate: '2023-06-01',
  status: 'active',
  avatar: null,
  packageType: 'personal_training' as PackageType,
  address: 'Musterstraße 123, 80331 München',
  emergencyContact: 'Maria Mustermann - +49 123 456788',
  medicalConditions: ['Leichte Rückenschmerzen', 'Allergien (Pollen)'],
  goals: ['Muskelaufbau', 'Kraftsteigerung', 'Verbesserung der Körperhaltung'],
  notes: 'Sehr motiviert, kommt immer pünktlich. Achtet auf gute Form bei den Übungen.',
  currentPlan: 'Muskelaufbau Anfänger',
  supplements: [
    { name: 'Whey Protein', startDate: '2023-08-15' },
    { name: 'Kreatin', startDate: '2023-09-01' },
    { name: 'Omega-3', startDate: '2023-06-01' }
  ],
  measurements: {
    latest: {
      date: '2024-01-16',
      weight: 85.5,
      bodyFat: 18.2,
      muscleMass: 69.7,
    },
    previous: {
      date: '2023-12-16',
      weight: 87.2,
      bodyFat: 20.1,
      muscleMass: 68.4,
    },
  },
  progress: {
    weightChange: -1.7,
    bodyFatChange: -1.9,
    muscleMassChange: 1.3,
  },
  upcomingAppointments: [
    { date: '2024-01-24', time: '09:00', type: 'Training' },
    { date: '2024-01-26', time: '09:00', type: 'Training' },
    { date: '2024-01-29', time: '09:00', type: 'Training' },
  ],
};

const tabs = [
  { name: 'Übersicht', icon: ChartBarIcon },
  { name: 'Messungen', icon: ChartBarIcon },
  { name: 'Trainingspläne', icon: DocumentTextIcon },
  { name: 'Termine', icon: CalendarIcon },
  { name: 'Nachrichten', icon: ChatBubbleLeftRightIcon },
];

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [activeTab, setActiveTab] = useState('Übersicht');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/clients" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{client.name}</h1>
            <p className="text-sm text-gray-500">Kunde seit {new Date(client.joinDate).toLocaleDateString('de-DE')}</p>
          </div>
        </div>
        <Link 
          href={`/dashboard/clients/${params.id}/edit`}
          className="btn-primary inline-flex items-center"
        >
          <PencilIcon className="mr-2 h-5 w-5" />
          Bearbeiten
        </Link>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div className="flex-shrink-0">
              <div className="relative">
                <ClientAvatar 
                  name={client.name} 
                  packageType={client.packageType}
                  size="xl"
                />
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
                  <CameraIcon className="h-5 w-5 text-gray-600" />
                </button>
              </div>
              <div className="mt-4 text-center">
                <span className={`badge ${client.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                  {client.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                </span>
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Kontaktinformationen</h3>
                  <dl className="mt-2 space-y-1">
                    <div>
                      <dt className="text-sm text-gray-600">E-Mail</dt>
                      <dd className="text-sm font-medium text-gray-900">{client.email}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Telefon</dt>
                      <dd className="text-sm font-medium text-gray-900">{client.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Adresse</dt>
                      <dd className="text-sm font-medium text-gray-900">{client.address}</dd>
                    </div>
                  </dl>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Persönliche Informationen</h3>
                  <dl className="mt-2 space-y-1">
                    <div>
                      <dt className="text-sm text-gray-600">Geburtsdatum</dt>
                      <dd className="text-sm font-medium text-gray-900">
                        {new Date(client.birthDate).toLocaleDateString('de-DE')} 
                        ({new Date().getFullYear() - new Date(client.birthDate).getFullYear()} Jahre)
                      </dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Notfallkontakt</dt>
                      <dd className="text-sm font-medium text-gray-900">{client.emergencyContact}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-600">Aktueller Plan</dt>
                      <dd className="text-sm font-medium text-gray-900">{client.currentPlan}</dd>
                    </div>
                  </dl>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">Ziele</h3>
                <div className="mt-2 flex flex-wrap gap-2">
                  {client.goals.map((goal, index) => (
                    <span key={index} className="badge badge-primary">{goal}</span>
                  ))}
                </div>
              </div>
              
              {client.medicalConditions.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Medizinische Hinweise</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {client.medicalConditions.map((condition, index) => (
                      <span key={index} className="badge badge-warning">{condition}</span>
                    ))}
                  </div>
                </div>
              )}
              
              {client.supplements && client.supplements.length > 0 && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-500">Supplements</h3>
                  <div className="mt-2 space-y-2">
                    {client.supplements.map((supplement, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <span className="text-sm font-medium text-gray-900">{supplement.name}</span>
                        <span className="text-xs text-gray-500">
                          Seit {new Date(supplement.startDate).toLocaleDateString('de-DE')}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Aktuelle Fortschritte</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Gewicht</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{client.measurements.latest.weight} kg</p>
                  <p className={`text-xs ${client.progress.weightChange < 0 ? 'text-success' : 'text-error'}`}>
                    {client.progress.weightChange > 0 ? '+' : ''}{client.progress.weightChange} kg
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Körperfett</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{client.measurements.latest.bodyFat}%</p>
                  <p className={`text-xs ${client.progress.bodyFatChange < 0 ? 'text-success' : 'text-error'}`}>
                    {client.progress.bodyFatChange > 0 ? '+' : ''}{client.progress.bodyFatChange}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Muskelmasse</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">{client.measurements.latest.muscleMass} kg</p>
                  <p className={`text-xs ${client.progress.muscleMassChange > 0 ? 'text-success' : 'text-error'}`}>
                    {client.progress.muscleMassChange > 0 ? '+' : ''}{client.progress.muscleMassChange} kg
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <p className="text-xs text-gray-500">
                Letzte Messung: {new Date(client.measurements.latest.date).toLocaleDateString('de-DE')}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Nächste Termine</h3>
            <div className="space-y-3">
              {client.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(appointment.date).toLocaleDateString('de-DE', { weekday: 'short', day: 'numeric', month: 'short' })}
                    </p>
                    <p className="text-xs text-gray-500">{appointment.time} - {appointment.type}</p>
                  </div>
                  <CalendarIcon className="h-5 w-5 text-gray-400" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <Link href="/dashboard/calendar" className="text-sm text-primary-600 hover:text-primary-700">
                Alle Termine anzeigen →
              </Link>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-4">Schnellaktionen</h3>
            <div className="space-y-2">
              <button className="w-full btn-primary text-sm">
                Neue Messung
              </button>
              <button className="w-full btn-secondary text-sm">
                Nachricht senden
              </button>
              <button className="w-full btn-secondary text-sm">
                Termin planen
              </button>
              <button className="w-full btn-secondary text-sm">
                Plan anpassen
              </button>
            </div>
          </div>
        </div>
      </div>

      {client.notes && (
        <div className="card">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 mb-2">Notizen</h3>
            <p className="text-sm text-gray-600">{client.notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}