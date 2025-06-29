'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientsTable from '@/components/clients/ClientsTable';
import PackageOverview from '@/components/clients/PackageOverview';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ClientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'table' | 'packages'>('table');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Kunden</h1>
          <p className="mt-2 text-sm text-gray-600">
            Verwalten Sie Ihre Kunden und deren Trainingspakete
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Kunden suchen..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setView('table')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  view === 'table'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Tabelle
              </button>
              <button
                onClick={() => setView('packages')}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  view === 'packages'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Pakete
              </button>
            </div>
            
            <button
              onClick={() => router.push('/clients/new')}
              className="btn btn-primary"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              Neuer Kunde
            </button>
          </div>
        </div>

        {/* Content */}
        {view === 'table' ? (
          <ClientsTable searchTerm={searchTerm} />
        ) : (
          <PackageOverview searchTerm={searchTerm} />
        )}
      </div>
    </div>
  );
}