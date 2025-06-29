'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import {
  HomeIcon,
  UsersIcon,
  ChartBarIcon,
  DocumentTextIcon,
  CalendarIcon,
  ChatBubbleLeftRightIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Kunden', href: '/dashboard/clients', icon: UsersIcon },
  { name: 'Messungen', href: '/dashboard/measurements', icon: ChartBarIcon },
  { name: 'Training', href: '/dashboard/training-plans', icon: DocumentTextIcon },
  { name: 'Kalender', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Nachrichten', href: '/dashboard/messages', icon: ChatBubbleLeftRightIcon },
  { name: 'Einstellungen', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white border-r border-gray-200">
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <Logo size="sm" variant="icon" className="text-primary-600" />
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 text-primary-700' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }
                `}
              >
                <item.icon
                  className={`
                    h-5 w-5 flex-shrink-0 transition-colors
                    ${isActive 
                      ? 'text-primary-600' 
                      : 'text-gray-400 group-hover:text-gray-500'
                    }
                  `}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </nav>
      
      <div className="border-t border-gray-200 p-3">
        <Button variant="secondary" className="w-full justify-start gap-3">
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}