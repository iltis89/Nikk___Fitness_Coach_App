import React from 'react';
import {
  UserIcon,
  CalendarIcon,
  FireIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@/types/package';

const clients = [
  { 
    id: 1, 
    name: 'Max Mustermann', 
    initials: 'MM',
    lastTraining: 'Heute', 
    nextAppointment: 'Morgen, 09:00',
    status: 'active',
    streak: 12,
    packageType: 'personal_training' as PackageType,
  },
  { 
    id: 2, 
    name: 'Anna Schmidt', 
    initials: 'AS',
    lastTraining: 'Gestern', 
    nextAppointment: 'Mi, 14:00',
    status: 'active',
    streak: 8,
    packageType: 'personal_training' as PackageType,
  },
  { 
    id: 3, 
    name: 'Tom Weber', 
    initials: 'TW',
    lastTraining: 'vor 3 Tagen', 
    nextAppointment: 'Fr, 10:30',
    status: 'warning',
    streak: 3,
    packageType: 'training_consultation' as PackageType,
  },
  { 
    id: 4, 
    name: 'Lisa Müller', 
    initials: 'LM',
    lastTraining: 'vor 5 Tagen', 
    nextAppointment: 'Do, 16:00',
    status: 'warning',
    streak: 1,
    packageType: 'online_coaching' as PackageType,
  },
  { 
    id: 5, 
    name: 'Peter Klein', 
    initials: 'PK',
    lastTraining: 'vor 1 Woche', 
    nextAppointment: '-',
    status: 'inactive',
    streak: 0,
    packageType: null,
  },
];

export default function ClientsList() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'warning': return 'bg-yellow-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-50 border-green-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'inactive': return 'bg-red-50 border-red-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Aktive Kunden</h3>
        <div className="flex items-center gap-2">
          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-600">{clients.length}</span>
        </div>
      </div>
      <div className="space-y-3 flex-1 overflow-y-auto scrollbar-hide">
        {clients.map((client, index) => (
          <div 
            key={client.id} 
            className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:shadow-md cursor-pointer ${getStatusBg(client.status)}`}
            tabIndex={0}
            role="article"
            aria-label={`Kunde ${client.name}`}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="relative">
              <ClientAvatar 
                name={client.name} 
                packageType={client.packageType}
                size="md"
                className="shadow-sm group-hover:shadow-md transition-shadow"
              />
              <div className={`absolute -bottom-1 -right-1 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(client.status)}`} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-gray-900 truncate group-hover:text-primary-700 transition-colors">
                  {client.name}
                </p>
                {client.streak > 5 && (
                  <div className="flex items-center gap-0.5 px-2 py-0.5 bg-orange-100 rounded-full">
                    <FireIcon className="h-3 w-3 text-orange-600" />
                    <span className="text-xs font-bold text-orange-600">{client.streak}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4 mt-1">
                <p className="text-xs text-gray-600">
                  <span className="font-medium">Training:</span> {client.lastTraining}
                </p>
                {client.status === 'warning' && (
                  <ExclamationCircleIcon className="h-4 w-4 text-yellow-600" aria-label="Warnung" />
                )}
              </div>
            </div>
            
            <div className="text-right flex-shrink-0">
              {client.nextAppointment !== '-' ? (
                <div className="flex items-center gap-1 text-xs">
                  <CalendarIcon className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="font-semibold text-gray-900">{client.nextAppointment.split(',')[0]}</p>
                    <p className="text-gray-500">{client.nextAppointment.split(',')[1]?.trim()}</p>
                  </div>
                </div>
              ) : (
                <span className="text-xs text-gray-400">Kein Termin</span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100">
        <button className="w-full text-sm font-medium text-primary-600 hover:text-primary-700 transition-colors">
          Alle Kunden anzeigen →
        </button>
      </div>
    </div>
  );
}