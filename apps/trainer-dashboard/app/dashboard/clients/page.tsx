'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientsTable from '@/components/clients/ClientsTable';
import PackageOverview from '@/components/clients/PackageOverview';
import { Button } from '@/components/ui/Button';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function ClientsPage() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [view, setView] = useState<'table' | 'packages'>('table');

  return (
    <div>
      <div>
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-50">Kunden</h1>
          <p className="mt-1 sm:mt-2 text-sm text-gray-600 dark:text-gray-400">
            Verwalten Sie Ihre Kunden und deren Trainingspakete
          </p>
        </div>

        {/* Controls */}
        <div className="mb-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Kunden suchen..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-50 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-primary-500 dark:focus:border-primary-400 touch-manipulation"
            />
          </div>
          
          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setView('table')}
                className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors touch-manipulation ${
                  view === 'table'
                    ? 'bg-white dark:bg-[rgb(20,25,45)] text-gray-900 dark:text-gray-50 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                <span className="sm:hidden">Liste</span>
                <span className="hidden sm:inline">Tabelle</span>
              </button>
              <button
                onClick={() => setView('packages')}
                className={`px-3 sm:px-4 py-2 text-sm font-medium rounded-md transition-colors touch-manipulation ${
                  view === 'packages'
                    ? 'bg-white dark:bg-[rgb(20,25,45)] text-gray-900 dark:text-gray-50 shadow-sm'
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                Pakete
              </button>
            </div>
            
            <Button
              onClick={() => router.push('/dashboard/clients/new')}
              variant="primary"
              size="sm"
              className="flex items-center gap-1.5"
            >
              <PlusIcon className="h-4 w-4" />
              <span className="hidden sm:inline">Neuer Kunde</span>
              <span className="sm:hidden">Neu</span>
            </Button>
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