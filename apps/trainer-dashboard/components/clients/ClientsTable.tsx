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
import { ClientAvatar } from '@/components/ui';

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

  const handleClientClick = (clientId: string) => {
    router.push(`/dashboard/clients/${clientId}`);
  };

  return (
    <div>
      {/* Mobile Card View */}
      <div className="block md:hidden space-y-4">
        {filteredClients.map((client) => (
          <div
            key={client.id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 touch-manipulation"
            onClick={() => handleClientClick(client.id)}
          >
            {/* Client Header */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <ClientAvatar 
                  name={client.name} 
                  packageType={client.activePackage?.type}
                  size="sm"
                />
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{client.name}</h3>
                  {client.activePackage && (
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                      PACKAGE_COLORS[client.activePackage.type].bg
                    } ${PACKAGE_COLORS[client.activePackage.type].text} ${
                      PACKAGE_COLORS[client.activePackage.type].border
                    } border mt-1`}>
                      {PACKAGE_LABELS[client.activePackage.type]}
                    </span>
                  )}
                </div>
              </div>
              <ChartBarIcon className="h-5 w-5 text-gray-400" />
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <EnvelopeIcon className="h-4 w-4 text-gray-400" />
                <span className="truncate">{client.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <PhoneIcon className="h-4 w-4 text-gray-400" />
                <span>{client.phone}</span>
              </div>
            </div>

            {/* Package Usage */}
            {client.activePackage && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-500">Nutzung</span>
                  <span className="text-sm font-medium text-gray-900">
                    {client.activePackage.usagePercentage}%
                  </span>
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
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-gray-500">
                    {client.activePackage.name}
                  </p>
                  {client.activePackage.expiresIn <= 7 && (
                    <span className="flex items-center gap-1 text-xs text-yellow-600">
                      <ExclamationTriangleIcon className="h-3 w-3" />
                      {client.activePackage.expiresIn}d
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Sessions Info */}
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <div className="text-xs text-gray-500">
                <div>Nächster Termin</div>
                <div className="font-medium text-gray-900">{formatDate(client.nextSession)}</div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{client.totalSessions}</div>
                <div className="text-xs text-gray-500">Sessions</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
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
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => handleClientClick(client.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <ClientAvatar 
                        name={client.name} 
                        packageType={client.activePackage?.type}
                        size="sm"
                      />
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
              </tr>
            ))}
          </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}