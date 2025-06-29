'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  HomeIcon,
  UsersIcon,
  CalendarIcon,
  ChartBarIcon,
  DocumentDuplicateIcon,
  Cog6ToothIcon,
  ClipboardDocumentListIcon,
  BeakerIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';
import { Logo } from '@/components/ui/Logo';
import { useMobileMenu } from '@/contexts/MobileMenuContext';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Kunden', href: '/dashboard/clients', icon: UsersIcon },
  { name: 'Kalender', href: '/dashboard/calendar', icon: CalendarIcon },
  { name: 'Messungen', href: '/dashboard/measurements', icon: ChartBarIcon },
  { name: 'Trainingspläne', href: '/dashboard/training-plans', icon: ClipboardDocumentListIcon },
  { name: 'Ernährung', href: '/dashboard/nutrition', icon: HeartIcon },
  { name: 'Vorlagen', href: '/dashboard/templates', icon: DocumentDuplicateIcon },
];

const secondaryNavigation = [
  { name: 'KI-Labor', href: '/dashboard/ai-lab', icon: BeakerIcon },
  { name: 'Einstellungen', href: '/dashboard/settings', icon: Cog6ToothIcon },
];

export default function MobileSidebar() {
  const pathname = usePathname();
  const { isOpen, close } = useMobileMenu();

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50 md:hidden" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/80" />
        </Transition.Child>

        <div className="fixed inset-0 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button type="button" className="-m-2.5 p-2.5" onClick={close}>
                    <span className="sr-only">Seitenleiste schließen</span>
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>

              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                <div className="flex h-16 shrink-0 items-center">
                  <Logo />
                </div>
                <nav className="flex flex-1 flex-col">
                  <ul className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul className="-mx-2 space-y-1">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={close}
                              className={`
                                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                ${pathname === item.href
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                                }
                              `}
                            >
                              <item.icon
                                className={`h-6 w-6 shrink-0 ${
                                  pathname === item.href ? 'text-primary-700' : 'text-gray-400 group-hover:text-primary-700'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                    <li>
                      <div className="text-xs font-semibold leading-6 text-gray-400">Weitere</div>
                      <ul className="-mx-2 mt-2 space-y-1">
                        {secondaryNavigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              href={item.href}
                              onClick={close}
                              className={`
                                group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold
                                ${pathname === item.href
                                  ? 'bg-primary-50 text-primary-700'
                                  : 'text-gray-700 hover:text-primary-700 hover:bg-gray-50'
                                }
                              `}
                            >
                              <item.icon
                                className={`h-6 w-6 shrink-0 ${
                                  pathname === item.href ? 'text-primary-700' : 'text-gray-400 group-hover:text-primary-700'
                                }`}
                                aria-hidden="true"
                              />
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}