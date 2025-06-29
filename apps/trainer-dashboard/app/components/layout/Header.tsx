'use client';

import { UserCircleIcon } from '@heroicons/react/24/outline';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import PackageNotifications from '@/components/clients/PackageNotifications';

export default function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6">
      <div className="flex items-center gap-6">
        <Logo size="md" />
        <div className="h-6 w-px bg-gray-300" />
        <h2 className="text-lg font-semibold text-gray-900">
          Willkommen zurück, Nikk
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <PackageNotifications />
        
        <Button variant="secondary" size="sm" className="p-2">
          <UserCircleIcon className="h-6 w-6" aria-hidden="true" />
        </Button>
      </div>
    </header>
  );
}