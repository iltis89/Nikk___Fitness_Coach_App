import React from 'react';

const appointments = [
  { id: 1, client: 'Max Mustermann', time: '09:00', type: 'Training' },
  { id: 2, client: 'Anna Schmidt', time: '10:30', type: 'Messung' },
  { id: 3, client: 'Tom Weber', time: '14:00', type: 'Beratung' },
  { id: 4, client: 'Lisa Müller', time: '16:00', type: 'Training' },
];

export default function AppointmentsList() {
  return (
    <div className="p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">Heutige Termine</h3>
        <span className="text-sm text-gray-500">{appointments.length} Termine</span>
      </div>
      <div className="flex flex-col gap-3 flex-1 overflow-y-auto scrollbar-hide">
        {appointments.map((appointment, index) => (
          <div 
            key={appointment.id} 
            className="group flex items-center justify-between rounded-xl border border-gray-200 p-4 hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-md transition-all duration-200 cursor-pointer"
            tabIndex={0}
            role="button"
            aria-label={`Termin mit ${appointment.client} um ${appointment.time}`}
          >
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary-400 to-primary-600 text-sm font-bold text-white shadow-sm group-hover:shadow-md transition-shadow">
                  {appointment.client.split(' ').map(n => n[0]).join('')}
                </div>
                {index === 0 && (
                  <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                )}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">
                  {appointment.client}
                </p>
                <p className="text-xs font-medium text-gray-500 mt-0.5">{appointment.type}</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-gray-900 tabular-nums">
                {appointment.time}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">Uhr</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}