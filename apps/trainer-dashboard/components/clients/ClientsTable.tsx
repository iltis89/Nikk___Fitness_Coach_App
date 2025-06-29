import React from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  CalendarIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { PACKAGE_COLORS, PACKAGE_LABELS, PackageType } from '@nv/shared/src/types/package';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  activePackage?: {
    type: PackageType;
    name: string;
    expiresIn: number; // days
    usagePercentage: number;
  };
  lastSession?: Date;
  nextSession?: Date;
  totalSessions: number;
}

// Mock data
const mockClients: Client[] = [
  {
    id: '1',
    name: 'Max Mustermann',
    email: 'max@example.com',
    phone: '+49 170 1234567',
    activePackage: {
      type: 'personal_training',
      name: '10er Karte Personal Training',
      expiresIn: 45,
      usagePercentage: 60,
    },
    lastSession: new Date('2024-01-10'),
    nextSession: new Date('2024-01-12'),
    totalSessions: 48,
  },
  {
    id: '2',
    name: 'Anna Schmidt',
    email: 'anna@example.com',
    phone: '+49 171 2345678',
    activePackage: {
      type: 'online_coaching',
      name: 'Online Coaching Premium',
      expiresIn: 15,
      usagePercentage: 85,
    },
    lastSession: new Date('2024-01-09'),
    totalSessions: 32,
  },
  {
    id: '3',
    name: 'Tom Weber',
    email: 'tom@example.com',
    phone: '+49 172 3456789',
    activePackage: {
      type: 'training_consultation',
      name: 'Trainingsberatung Basic',
      expiresIn: 5,
      usagePercentage: 90,
    },
    lastSession: new Date('2024-01-08'),
    nextSession: new Date('2024-01-15'),
    totalSessions: 12,
  },
];

interface ClientsTableProps {
  searchTerm: string;
}

export default function ClientsTable({ searchTerm }: ClientsTableProps) {
  const router = useRouter();
  
  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (date?: Date) => {
    if (!date) return '-';
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Kunde
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Aktives Paket
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nutzung
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Termine
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="relative px-6 py-3">
                <span className="sr-only">Aktionen</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => router.push(`/clients/${client.id}`)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-bold">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{client.name}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <EnvelopeIcon className="h-3 w-3" />
                          {client.email}
                        </span>
                        <span className="flex items-center gap-1">
                          <PhoneIcon className="h-3 w-3" />
                          {client.phone}
                        </span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.activePackage ? (
                    <div>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        PACKAGE_COLORS[client.activePackage.type].bg
                      } ${PACKAGE_COLORS[client.activePackage.type].text} ${
                        PACKAGE_COLORS[client.activePackage.type].border
                      } border`}>
                        {PACKAGE_LABELS[client.activePackage.type]}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{client.activePackage.name}</p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">Kein aktives Paket</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {client.activePackage ? (
                    <div className="w-32">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {client.activePackage.usagePercentage}%
                        </span>
                        {client.activePackage.expiresIn <= 7 && (
                          <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            client.activePackage.usagePercentage >= 80
                              ? 'bg-red-500'
                              : client.activePackage.usagePercentage >= 60
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${client.activePackage.usagePercentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Läuft ab in {client.activePackage.expiresIn} Tagen
                      </p>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>Letztes: {formatDate(client.lastSession)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4 text-gray-400" />
                      <span>Nächstes: {formatDate(client.nextSession)}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <ChartBarIcon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{client.totalSessions} Sessions</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/clients/${client.id}/edit`);
                    }}
                    className="text-primary-600 hover:text-primary-900"
                  >
                    Bearbeiten
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}