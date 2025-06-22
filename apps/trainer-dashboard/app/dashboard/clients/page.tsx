import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const clients = [
  {
    id: 1,
    name: 'Max Mustermann',
    age: 35,
    email: 'max@example.com',
    phone: '+49 123 456789',
    lastTraining: '2024-01-15',
    status: 'active',
    goal: 'Muskelaufbau',
  },
  {
    id: 2,
    name: 'Anna Schmidt',
    age: 28,
    email: 'anna@example.com',
    phone: '+49 234 567890',
    lastTraining: '2024-01-14',
    status: 'active',
    goal: 'Gewichtsreduktion',
  },
  {
    id: 3,
    name: 'Tom Weber',
    age: 42,
    email: 'tom@example.com',
    phone: '+49 345 678901',
    lastTraining: '2024-01-10',
    status: 'inactive',
    goal: 'Fitness',
  },
  {
    id: 4,
    name: 'Lisa Müller',
    age: 31,
    email: 'lisa@example.com',
    phone: '+49 456 789012',
    lastTraining: '2024-01-16',
    status: 'active',
    goal: 'Athletik',
  },
];

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Kunden</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verwalte deine Kunden und deren Trainingspläne
          </p>
        </div>
        <button className="btn-primary">
          <PlusIcon className="mr-2 h-5 w-5" aria-hidden="true" />
          Neuer Kunde
        </button>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="mb-4 flex items-center justify-between">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="Kunden suchen..."
                className="input pl-10"
              />
              <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex items-center space-x-2">
              <select className="input w-auto">
                <option>Alle Status</option>
                <option>Aktiv</option>
                <option>Inaktiv</option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Alter</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Kontakt</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Ziel</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Letztes Training</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="pb-3 text-left text-sm font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {clients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-medium text-primary-700">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-sm text-gray-900">{client.age}</td>
                    <td className="py-4">
                      <p className="text-sm text-gray-900">{client.email}</p>
                      <p className="text-sm text-gray-500">{client.phone}</p>
                    </td>
                    <td className="py-4 text-sm text-gray-900">{client.goal}</td>
                    <td className="py-4 text-sm text-gray-900">
                      {new Date(client.lastTraining).toLocaleDateString('de-DE')}
                    </td>
                    <td className="py-4">
                      <span className={`badge ${
                        client.status === 'active' ? 'badge-success' : 'badge-warning'
                      }`}>
                        {client.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}