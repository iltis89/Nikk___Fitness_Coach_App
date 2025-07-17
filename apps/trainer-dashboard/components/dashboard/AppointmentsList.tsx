import React from 'react';
import { ClientAvatar } from '@/components/ui';
import { PackageType } from '@/types/package';

const appointments = [
  { id: 1, client: 'Max Mustermann', time: '09:00', type: 'Training', packageType: 'personal_training' as PackageType },
  { id: 2, client: 'Anna Schmidt', time: '10:30', type: 'Messung', packageType: 'personal_training' as PackageType },
  { id: 3, client: 'Tom Weber', time: '14:00', type: 'Beratung', packageType: 'training_consultation' as PackageType },
  { id: 4, client: 'Lisa Müller', time: '16:00', type: 'Training', packageType: 'online_coaching' as PackageType },
];

export default function AppointmentsList() {
  // Get current time for highlighting
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const isUpcoming = (time: string) => {
    const [hour, minute] = time.split(':').map(Number);
    return hour > currentHour || (hour === currentHour && minute > currentMinute);
  };
  
  const isNow = (time: string) => {
    const [hour] = time.split(':').map(Number);
    return hour === currentHour;
  };
  
  return (
    <div className="p-5 h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-gray-50">Heutige Termine</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 dark:bg-primary-900/20 px-3 py-1 text-xs font-semibold text-primary-700 dark:text-primary-400">
            <span className="h-2 w-2 rounded-full bg-primary-500 animate-pulse" />
            {appointments.length}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2 flex-1 overflow-y-auto scrollbar-hide">
        {appointments.map((appointment, index) => {
          const upcoming = isUpcoming(appointment.time);
          const current = isNow(appointment.time);
          
          return (
            <div 
              key={appointment.id} 
              className={`group relative flex items-center justify-between rounded-lg border p-3 transition-all duration-200 cursor-pointer
                ${current 
                  ? 'border-primary-400 dark:border-primary-600 bg-primary-50 dark:bg-primary-900/20 shadow-sm' 
                  : upcoming
                  ? 'border-gray-200 dark:border-gray-600 hover:border-primary-300 dark:hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800'
                  : 'border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60'
                }
              `}
              tabIndex={0}
              role="button"
              aria-label={`Termin mit ${appointment.client} um ${appointment.time}`}
            >
              {current && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary-500 rounded-l-lg" />
              )}
              <div className="flex items-center gap-3 pl-2">
                <div className="text-center min-w-[48px]">
                  <span className="text-xl font-bold text-gray-900 dark:text-gray-50 tabular-nums block leading-tight">
                    {appointment.time.split(':')[0]}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 block">
                    :{appointment.time.split(':')[1]}
                  </span>
                </div>
                <div className="h-12 w-px bg-gray-200 dark:bg-gray-700" />
                <div className="relative">
                  <ClientAvatar 
                    name={appointment.client} 
                    packageType={appointment.packageType}
                    size="sm"
                    className="shadow-sm"
                  />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-semibold transition-colors ${
                    current ? 'text-primary-700 dark:text-primary-400' : 'text-gray-900 dark:text-gray-50 group-hover:text-primary-700 dark:group-hover:text-primary-400'
                  }`}>
                    {appointment.client}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{appointment.type}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {current && (
                  <span className="text-xs font-medium text-primary-600 dark:text-primary-400 bg-primary-100 dark:bg-primary-900/20 px-2 py-1 rounded-full">
                    Jetzt
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}