'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
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
  const router = useRouter();

  const handleLogout = () => {
    // Clear any auth tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
    
    // Redirect to login page
    router.push('/auth/login');
  };

  return (
    <div className="flex h-full flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-colors duration-200">
      <div className="flex h-16 items-center justify-center border-b border-gray-200 dark:border-gray-700">
        {/* Logo entfernt */}
      </div>
      
      <nav className="flex-1 px-3 py-4">
        <div className="flex flex-col gap-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname?.startsWith(`${item.href}/`));
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors
                  ${isActive 
                    ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  }
                `}
              >
                <item.icon
                  className={`
                    h-5 w-5 flex-shrink-0 transition-colors
                    ${isActive 
                      ? 'text-primary-600 dark:text-primary-400' 
                      : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'
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
      
      <div className="border-t border-gray-200 dark:border-gray-700 p-3">
        <Button 
          variant="secondary" 
          className="w-full justify-start gap-3"
          onClick={handleLogout}
        >
          <ArrowRightOnRectangleIcon className="h-5 w-5 text-gray-400 dark:text-gray-500" aria-hidden="true" />
          Abmelden
        </Button>
      </div>
    </div>
  );
}