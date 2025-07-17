'use client';

import { useState } from 'react';
import { 
  ArrowLeftIcon,
  PencilIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { ClientAvatar, EditableField, EditableSelect, EditableList, EditableSupplements } from '@/components/ui';
import { PackageType } from '@/types/package';
import { formatDate, calculateAge } from '@/utils/dateFormatters';

// Mock data - TODO: Replace with API call
const client = {
  id: 1,
  name: 'Max Mustermann',
  firstName: 'Max',
  lastName: 'Mustermann',
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

const packageOptions = [
  { value: 'personal_training', label: 'Personal Training' },
  { value: 'small_group', label: 'Small Group' },
  { value: 'online_coaching', label: 'Online Coaching' },
  { value: 'nutrition_only', label: 'Nur Ernährung' },
];

const statusOptions = [
  { value: 'active', label: 'Aktiv' },
  { value: 'inactive', label: 'Inaktiv' },
  { value: 'paused', label: 'Pausiert' },
];

export default function ClientDetailPage({ params }: { params: { id: string } }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [clientData, setClientData] = useState(client);

  const handleSave = async (field: string, value: any) => {
    // TODO: API call to update client
    console.log('Saving', field, value);
    
    // Mock update
    setClientData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
  };

  const handleFieldEdit = (field: string, isEditing: boolean) => {
    if (isEditing) {
      setEditingField(field);
    } else if (editingField === field) {
      setEditingField(null);
    }
  };


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard/clients" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{clientData.name}</h1>
            <p className="text-sm text-gray-500">Kunde seit {formatDate(clientData.joinDate, 'long')}</p>
          </div>
        </div>
        <button 
          onClick={() => setIsEditMode(!isEditMode)}
          className={`btn-${isEditMode ? 'secondary' : 'primary'} inline-flex items-center`}
        >
          <PencilIcon className="mr-2 h-5 w-5" />
          {isEditMode ? 'Bearbeitung beenden' : 'Bearbeiten'}
        </button>
      </div>

      {/* Main Info Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Avatar & Basic Info */}
        <div className="lg:col-span-1">
          <div className="card dark:bg-gray-800 dark:border-gray-700">
            <div className="card-body">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <ClientAvatar 
                    name={clientData.name} 
                    packageType={clientData.packageType}
                    size="xl"
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-white dark:bg-gray-700 rounded-full shadow-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                    <CameraIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
                <div className="mt-4 text-center">
                  {isEditMode ? (
                    <EditableSelect
                      value={clientData.status}
                      options={statusOptions}
                      onSave={(value) => handleSave('status', value)}
                      isEditing={editingField === 'status'}
                      onEditingChange={(isEditing) => handleFieldEdit('status', isEditing)}
                    />
                  ) : (
                    <span className={`badge ${clientData.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                      {clientData.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                    </span>
                  )}
                </div>
                
                <div className="mt-6 w-full space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Paket</p>
                    {isEditMode ? (
                      <EditableSelect
                        value={clientData.packageType}
                        options={packageOptions}
                        onSave={(value) => handleSave('packageType', value)}
                        isEditing={editingField === 'packageType'}
                        onEditingChange={(isEditing) => handleFieldEdit('packageType', isEditing)}
                      />
                    ) : (
                      <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">
                        {packageOptions.find(opt => opt.value === clientData.packageType)?.label}
                      </p>
                    )}
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Aktueller Plan</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 mt-1">{clientData.currentPlan}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact & Personal Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="card dark:bg-gray-800 dark:border-gray-700">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Kontaktinformationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <EnvelopeIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                    <EditableField
                      value={clientData.email}
                      onSave={(value) => handleSave('email', value)}
                      type="email"
                      label="E-Mail"
                      isEditing={isEditMode && editingField === 'email'}
                      onEditingChange={(isEditing) => handleFieldEdit('email', isEditing)}
                      className="flex-1"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <PhoneIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                    <EditableField
                      value={clientData.phone}
                      onSave={(value) => handleSave('phone', value)}
                      type="tel"
                      label="Telefon"
                      isEditing={isEditMode && editingField === 'phone'}
                      onEditingChange={(isEditing) => handleFieldEdit('phone', isEditing)}
                      className="flex-1"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPinIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                    <EditableField
                      value={clientData.address}
                      onSave={(value) => handleSave('address', value)}
                      label="Adresse"
                      isEditing={isEditMode && editingField === 'address'}
                      onEditingChange={(isEditing) => handleFieldEdit('address', isEditing)}
                      className="flex-1"
                    />
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                    <EditableField
                      value={clientData.emergencyContact}
                      onSave={(value) => handleSave('emergencyContact', value)}
                      label="Notfallkontakt"
                      isEditing={isEditMode && editingField === 'emergencyContact'}
                      onEditingChange={(isEditing) => handleFieldEdit('emergencyContact', isEditing)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="card dark:bg-gray-800 dark:border-gray-700">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Persönliche Informationen</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <CalendarDaysIcon className="h-5 w-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <div className="flex-1">
                    <EditableField
                      value={clientData.birthDate}
                      onSave={(value) => handleSave('birthDate', value)}
                      type="date"
                      label="Geburtsdatum"
                      isEditing={isEditMode && editingField === 'birthDate'}
                      onEditingChange={(isEditing) => handleFieldEdit('birthDate', isEditing)}
                    />
                    {!isEditMode && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {calculateAge(clientData.birthDate)} Jahre alt
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Goals, Medical, Supplements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <EditableList
              items={clientData.goals}
              onSave={(items) => handleSave('goals', items)}
              label="Trainingsziele"
              placeholder="Neues Ziel hinzufügen"
              isEditing={isEditMode && editingField === 'goals'}
              onEditingChange={(isEditing) => handleFieldEdit('goals', isEditing)}
              badgeColor="primary"
            />
            
            <div className="mt-6">
              <EditableList
                items={clientData.medicalConditions}
                onSave={(items) => handleSave('medicalConditions', items)}
                label="Medizinische Hinweise"
                placeholder="Neuen Hinweis hinzufügen"
                isEditing={isEditMode && editingField === 'medicalConditions'}
                onEditingChange={(isEditing) => handleFieldEdit('medicalConditions', isEditing)}
                badgeColor="warning"
              />
            </div>
          </div>
        </div>

        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <EditableSupplements
              supplements={clientData.supplements}
              onSave={(supplements) => handleSave('supplements', supplements)}
              isEditing={isEditMode && editingField === 'supplements'}
              onEditingChange={(isEditing) => handleFieldEdit('supplements', isEditing)}
            />
          </div>
        </div>
      </div>

      {/* Progress, Appointments, Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Aktuelle Fortschritte</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Gewicht</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{clientData.measurements.latest.weight} kg</p>
                  <p className={`text-xs ${clientData.progress.weightChange < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {clientData.progress.weightChange > 0 ? '+' : ''}{clientData.progress.weightChange} kg
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center pb-3 border-b dark:border-gray-700">
                <span className="text-sm text-gray-600 dark:text-gray-400">Körperfett</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{clientData.measurements.latest.bodyFat}%</p>
                  <p className={`text-xs ${clientData.progress.bodyFatChange < 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {clientData.progress.bodyFatChange > 0 ? '+' : ''}{clientData.progress.bodyFatChange}%
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600 dark:text-gray-400">Muskelmasse</span>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{clientData.measurements.latest.muscleMass} kg</p>
                  <p className={`text-xs ${clientData.progress.muscleMassChange > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {clientData.progress.muscleMassChange > 0 ? '+' : ''}{clientData.progress.muscleMassChange} kg
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                Letzte Messung: {formatDate(clientData.measurements.latest.date, 'long')}
              </p>
            </div>
          </div>
        </div>

        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Nächste Termine</h3>
            <div className="space-y-3">
              {clientData.upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {formatDate(appointment.date, 'short')}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{appointment.time} - {appointment.type}</p>
                  </div>
                  <CalendarIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t dark:border-gray-700">
              <Link href="/dashboard/calendar" className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium">
                Alle Termine anzeigen →
              </Link>
            </div>
          </div>
        </div>

        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Schnellaktionen</h3>
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

      {/* Notes */}
      {(clientData.notes || isEditMode) && (
        <div className="card dark:bg-gray-800 dark:border-gray-700">
          <div className="card-body">
            <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-3">Trainer-Notizen</h3>
            {isEditMode ? (
              <EditableField
                value={clientData.notes}
                onSave={(value) => handleSave('notes', value)}
                isEditing={editingField === 'notes'}
                onEditingChange={(isEditing) => handleFieldEdit('notes', isEditing)}
                multiline
                placeholder="Notizen zum Kunden hinzufügen..."
                className="mt-2"
              />
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{clientData.notes}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}