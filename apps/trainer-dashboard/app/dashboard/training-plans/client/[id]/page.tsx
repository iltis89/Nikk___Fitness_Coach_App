'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  PlusIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon
} from '@heroicons/react/24/outline';

const client = {
  id: 1,
  name: 'Max Mustermann',
  currentPlan: {
    id: 1,
    name: 'Muskelaufbau Anfänger',
    startDate: '2024-01-01',
    endDate: '2024-03-25',
    duration: '12 Wochen',
    frequency: '3x pro Woche',
    phase: 'Woche 4 von 12',
    progress: 25,
    workouts: [
      {
        id: 'a',
        name: 'Workout A - Unterkörper',
        exercises: 6,
        duration: '60 Min',
        lastCompleted: '2024-01-20',
        timesCompleted: 4,
      },
      {
        id: 'b',
        name: 'Workout B - Oberkörper Push',
        exercises: 7,
        duration: '55 Min',
        lastCompleted: '2024-01-18',
        timesCompleted: 3,
      },
      {
        id: 'c',
        name: 'Workout C - Oberkörper Pull',
        exercises: 6,
        duration: '50 Min',
        lastCompleted: '2024-01-16',
        timesCompleted: 3,
      },
    ],
    weeklySchedule: [
      { day: 'Montag', workout: 'Workout A' },
      { day: 'Mittwoch', workout: 'Workout B' },
      { day: 'Freitag', workout: 'Workout C' },
    ],
  },
  statistics: {
    totalWorkouts: 10,
    missedWorkouts: 1,
    avgDuration: 55,
    compliance: 91,
    lastWorkout: '2024-01-20',
    nextWorkout: 'Workout B - Heute 16:00',
  },
  history: [
    { date: '2024-01-20', workout: 'Workout A', duration: 62, completed: true },
    { date: '2024-01-18', workout: 'Workout B', duration: 58, completed: true },
    { date: '2024-01-16', workout: 'Workout C', duration: 52, completed: true },
    { date: '2024-01-15', workout: 'Workout A', duration: 0, completed: false },
    { date: '2024-01-13', workout: 'Workout B', duration: 54, completed: true },
  ],
};

const tabs = [
  { id: 'overview', name: 'Übersicht', icon: ChartBarIcon },
  { id: 'current-plan', name: 'Aktueller Plan', icon: DocumentTextIcon },
  { id: 'history', name: 'Verlauf', icon: ClockIcon },
  { id: 'schedule', name: 'Wochenplan', icon: CalendarDaysIcon },
];

export default function ClientTrainingPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'overview');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard/training-plans" 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Training - {client.name}</h1>
            <p className="text-sm text-gray-500">{client.currentPlan.name}</p>
          </div>
        </div>
        <button className="btn-primary">
          <PlusIcon className="mr-2 h-5 w-5" />
          Neuer Plan
        </button>
      </div>

      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${isActive 
                    ? 'border-primary-500 text-primary-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className={`
                  -ml-0.5 mr-2 h-5 w-5 transition-colors
                  ${isActive ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500'}
                `} />
                {tab.name}
              </button>
            );
          })}
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Trainings absolviert</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{client.statistics.totalWorkouts}</p>
                  </div>
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-primary-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Compliance Rate</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{client.statistics.compliance}%</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ø Trainingsdauer</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{client.statistics.avgDuration} Min</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Verpasste Trainings</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900">{client.statistics.missedWorkouts}</p>
                  </div>
                  <div className="p-3 bg-red-50 rounded-lg">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Nächstes Training</h3>
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900">Workout B - Oberkörper Push</h4>
                    <span className="badge badge-primary">Heute 16:00</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>• 7 Übungen geplant</p>
                    <p>• Geschätzte Dauer: 55 Minuten</p>
                    <p>• Fokus: Brust, Schultern, Trizeps</p>
                  </div>
                  <button className="mt-4 w-full btn-primary">
                    <PlayIcon className="mr-2 h-5 w-5" />
                    Training starten
                  </button>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Planfortschritt</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Gesamtfortschritt</span>
                      <span className="font-medium text-gray-900">{client.currentPlan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${client.currentPlan.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phase</span>
                      <span className="font-medium text-gray-900">{client.currentPlan.phase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Startdatum</span>
                      <span className="font-medium text-gray-900">
                        {new Date(client.currentPlan.startDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Enddatum</span>
                      <span className="font-medium text-gray-900">
                        {new Date(client.currentPlan.endDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Letzte Trainingseinheiten</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900">Datum</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900">Workout</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900">Dauer</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {client.history.map((session, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="py-3 text-sm text-gray-900">
                          {new Date(session.date).toLocaleDateString('de-DE')}
                        </td>
                        <td className="py-3 text-sm text-gray-900">{session.workout}</td>
                        <td className="py-3 text-sm text-gray-900">
                          {session.duration > 0 ? `${session.duration} Min` : '-'}
                        </td>
                        <td className="py-3">
                          {session.completed ? (
                            <span className="badge badge-success">Abgeschlossen</span>
                          ) : (
                            <span className="badge badge-error">Verpasst</span>
                          )}
                        </td>
                        <td className="py-3 text-right">
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
      )}

      {activeTab === 'current-plan' && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{client.currentPlan.name}</h2>
                  <p className="text-sm text-gray-500">
                    {client.currentPlan.duration} • {client.currentPlan.frequency}
                  </p>
                </div>
                <button className="btn-secondary">
                  Plan bearbeiten
                </button>
              </div>

              <div className="space-y-4">
                {client.currentPlan.workouts.map((workout) => (
                  <div key={workout.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{workout.name}</h3>
                        <p className="text-sm text-gray-500 mt-1">
                          {workout.exercises} Übungen • {workout.duration}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{workout.timesCompleted}x</p>
                          <p className="text-xs text-gray-500">absolviert</p>
                        </div>
                        <button className="btn-primary">
                          <PlayIcon className="mr-2 h-5 w-5" />
                          Starten
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Wochenrhythmus</h3>
                <div className="space-y-3">
                  {client.currentPlan.weeklySchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <span className="font-medium text-gray-900">{schedule.day}</span>
                      <span className="text-sm text-gray-600">{schedule.workout}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 mb-4">Trainingshinweise</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Immer 5-10 Minuten aufwärmen</li>
                  <li>• Zwischen den Sätzen 2-3 Minuten Pause</li>
                  <li>• Bei Schmerzen Training abbrechen</li>
                  <li>• Fokus auf saubere Technik</li>
                  <li>• Gewichte progressiv steigern</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}