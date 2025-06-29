'use client';

import { useState } from 'react';
import { UserCircleIcon, Bars3Icon } from '@heroicons/react/24/outline';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { EasterEgg } from '@/components/ui/EasterEgg';
import PackageNotifications from '@/components/clients/PackageNotifications';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

export default function Header() {
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const { toggle } = useMobileMenu();

  const toggleEasterEgg = () => {
    setShowEasterEgg(!showEasterEgg);
  };

  return (
    <>
      <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggle}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Menu öffnen"
          >
            <Bars3Icon className="h-6 w-6 text-gray-600" />
          </button>
          <div 
            onClick={toggleEasterEgg}
            className="cursor-pointer select-none"
          >
            <Logo size="md" />
          </div>
          <div className="hidden sm:block h-6 w-px bg-gray-300" />
          <h2 className="hidden sm:block text-lg font-semibold text-gray-900">
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
    <EasterEgg isActive={showEasterEgg} />
    </>
  );
}