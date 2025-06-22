'use client';

import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          Willkommen zurück, Nikk
        </h2>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="relative rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary-500"></span>
        </button>
        
        <button className="flex items-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors">
          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}