import { 
  UsersIcon, 
  ChartBarIcon, 
  CalendarDaysIcon,
  CurrencyEuroIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Aktive Kunden',
    value: '24',
    change: '+2',
    changeType: 'increase',
    icon: UsersIcon,
  },
  {
    name: 'Termine diese Woche',
    value: '18',
    change: '-3',
    changeType: 'decrease',
    icon: CalendarDaysIcon,
  },
  {
    name: 'Messungen heute',
    value: '4',
    change: '+1',
    changeType: 'increase',
    icon: ChartBarIcon,
  },
  {
    name: 'Umsatz diesen Monat',
    value: '€4,320',
    change: '+12%',
    changeType: 'increase',
    icon: CurrencyEuroIcon,
  },
];

const recentActivities = [
  { id: 1, type: 'measurement', client: 'Max Mustermann', action: 'Messung durchgeführt', time: 'vor 2 Stunden' },
  { id: 2, type: 'plan', client: 'Anna Schmidt', action: 'Neuer Trainingsplan erstellt', time: 'vor 4 Stunden' },
  { id: 3, type: 'appointment', client: 'Tom Weber', action: 'Termin bestätigt', time: 'vor 5 Stunden' },
  { id: 4, type: 'message', client: 'Lisa Müller', action: 'Nachricht erhalten', time: 'gestern' },
];

const upcomingAppointments = [
  { id: 1, client: 'Max Mustermann', time: '09:00', type: 'Training' },
  { id: 2, client: 'Anna Schmidt', time: '10:30', type: 'Messung' },
  { id: 3, client: 'Tom Weber', time: '14:00', type: 'Beratung' },
  { id: 4, client: 'Lisa Müller', time: '16:00', type: 'Training' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Übersicht über deine wichtigsten Kennzahlen und Aktivitäten
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.name} className="card">
            <div className="card-body">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="mt-2 text-3xl font-semibold text-gray-900">{stat.value}</p>
                </div>
                <div className="rounded-lg bg-primary-50 p-3">
                  <stat.icon className="h-6 w-6 text-primary-600" aria-hidden="true" />
                </div>
              </div>
              <div className="mt-4 flex items-center">
                {stat.changeType === 'increase' ? (
                  <ArrowUpIcon className="h-4 w-4 text-success" aria-hidden="true" />
                ) : (
                  <ArrowDownIcon className="h-4 w-4 text-error" aria-hidden="true" />
                )}
                <span className={`ml-1 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-success' : 'text-error'
                }`}>
                  {stat.change}
                </span>
                <span className="ml-2 text-sm text-gray-500">vs. letzten Monat</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-900">Heutige Termine</h2>
            <div className="mt-4 space-y-3">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                      {appointment.client.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{appointment.client}</p>
                      <p className="text-xs text-gray-500">{appointment.type}</p>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">{appointment.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <h2 className="text-lg font-semibold text-gray-900">Letzte Aktivitäten</h2>
            <div className="mt-4 space-y-3">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.client}</span>
                      {' - '}
                      <span className="text-gray-600">{activity.action}</span>
                    </p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}