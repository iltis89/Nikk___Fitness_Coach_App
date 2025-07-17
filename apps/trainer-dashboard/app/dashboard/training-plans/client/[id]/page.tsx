'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';
import { EditWorkoutModal } from '@/components/training/EditWorkoutModal';
import { TrainingPlanEditor } from '@/components/training/TrainingPlanEditor';
import { 
  ArrowLeftIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  DocumentTextIcon,
  ClockIcon,
  PlusIcon,
  PlayIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  PencilIcon
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
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
  const [showPlanEditor, setShowPlanEditor] = useState(false);
  const [isCreatingNewPlan, setIsCreatingNewPlan] = useState(false);

  const handleEditWorkout = () => {
    // Mock-Daten für das aktuelle Workout mit Übungen
    const workoutToEdit = {
      id: 'b',
      name: 'Workout B - Oberkörper Push',
      exercises: [
        { id: '1', name: 'Bankdrücken', sets: 4, reps: '8-10', rest: '120s' },
        { id: '2', name: 'Schrägbankdrücken Kurzhanteln', sets: 3, reps: '10-12', rest: '90s' },
        { id: '3', name: 'Schulterdrücken', sets: 3, reps: '8-10', rest: '90s' },
        { id: '4', name: 'Seitheben', sets: 3, reps: '12-15', rest: '60s' },
        { id: '5', name: 'Dips', sets: 3, reps: '8-12', rest: '90s' },
        { id: '6', name: 'Trizepsdrücken am Kabel', sets: 3, reps: '12-15', rest: '60s' },
        { id: '7', name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s' },
      ],
      duration: '55 Min',
      focus: 'Brust, Schultern, Trizeps'
    };
    setSelectedWorkout(workoutToEdit);
    setShowEditModal(true);
  };

  const handleSaveWorkout = (updatedWorkout: any) => {
    console.log('Workout gespeichert:', updatedWorkout);
    // TODO: API-Call zum Speichern des aktualisierten Workouts
    // Hier würde normalerweise ein API-Call erfolgen
    setShowEditModal(false);
  };

  const handleEditPlan = () => {
    setShowPlanEditor(true);
    setIsCreatingNewPlan(false);
  };

  // Konvertiere bestehende Plan-Daten für den Editor
  const convertCurrentPlanToEditorFormat = () => {
    // Erstelle Workouts mit Übungen basierend auf Mock-Daten
    const workouts = [
      {
        id: 'a',
        name: 'Workout A - Unterkörper',
        description: 'Fokus auf Beine und Gesäß',
        exercises: [
          { id: '1', name: 'Kniebeugen', sets: 4, reps: '8-10', rest: '120s', tempo: '2-0-2-0' },
          { id: '2', name: 'Rumänisches Kreuzheben', sets: 3, reps: '10-12', rest: '90s', tempo: '3-0-1-0' },
          { id: '3', name: 'Beinpresse', sets: 3, reps: '12-15', rest: '90s', tempo: '2-0-2-0' },
          { id: '4', name: 'Ausfallschritte', sets: 3, reps: '10/Seite', rest: '60s', tempo: '2-0-1-0' },
          { id: '5', name: 'Wadenheben', sets: 4, reps: '15-20', rest: '60s', tempo: '1-1-1-1' },
          { id: '6', name: 'Plank', sets: 3, reps: '60s', rest: '45s' },
        ],
        estimatedDuration: 60,
        focus: ['Beine', 'Core']
      },
      {
        id: 'b',
        name: 'Workout B - Oberkörper Push',
        description: 'Fokus auf Brust, Schultern und Trizeps',
        exercises: [
          { id: '1', name: 'Bankdrücken', sets: 4, reps: '8-10', rest: '120s', tempo: '2-0-2-0' },
          { id: '2', name: 'Schrägbankdrücken Kurzhanteln', sets: 3, reps: '10-12', rest: '90s', tempo: '2-0-2-0' },
          { id: '3', name: 'Schulterdrücken', sets: 3, reps: '8-10', rest: '90s', tempo: '2-0-1-0' },
          { id: '4', name: 'Seitheben', sets: 3, reps: '12-15', rest: '60s', tempo: '2-0-2-0' },
          { id: '5', name: 'Dips', sets: 3, reps: '8-12', rest: '90s', tempo: '2-0-1-0' },
          { id: '6', name: 'Trizepsdrücken am Kabel', sets: 3, reps: '12-15', rest: '60s', tempo: '2-0-2-0' },
          { id: '7', name: 'Face Pulls', sets: 3, reps: '15-20', rest: '60s', tempo: '2-0-2-0' },
        ],
        estimatedDuration: 55,
        focus: ['Brust', 'Schultern', 'Arme']
      },
      {
        id: 'c',
        name: 'Workout C - Oberkörper Pull',
        description: 'Fokus auf Rücken und Bizeps',
        exercises: [
          { id: '1', name: 'Klimmzüge', sets: 4, reps: '6-10', rest: '120s', tempo: '2-0-2-0' },
          { id: '2', name: 'Rudern am Kabelzug', sets: 3, reps: '10-12', rest: '90s', tempo: '2-0-2-0' },
          { id: '3', name: 'Latzug', sets: 3, reps: '10-12', rest: '90s', tempo: '2-0-2-0' },
          { id: '4', name: 'Kurzhantelrudern', sets: 3, reps: '10/Seite', rest: '60s', tempo: '2-0-1-0' },
          { id: '5', name: 'Bizepscurls', sets: 3, reps: '10-12', rest: '60s', tempo: '2-0-2-0' },
          { id: '6', name: 'Hammercurls', sets: 3, reps: '12-15', rest: '60s', tempo: '2-0-2-0' },
        ],
        estimatedDuration: 50,
        focus: ['Rücken', 'Arme']
      }
    ];

    // Erstelle Phasen basierend auf 12 Wochen Plan
    const phases = [
      {
        id: 'phase-1',
        name: 'Eingewöhnungsphase',
        weeks: 2,
        focus: 'Technik und Grundkraft',
        workouts: ['a', 'b', 'c']
      },
      {
        id: 'phase-2',
        name: 'Volumenphase',
        weeks: 4,
        focus: 'Muskelaufbau durch höheres Volumen',
        workouts: ['a', 'b', 'c']
      },
      {
        id: 'phase-3',
        name: 'Intensitätsphase',
        weeks: 4,
        focus: 'Kraftsteigerung',
        workouts: ['a', 'b', 'c']
      },
      {
        id: 'phase-4',
        name: 'Deload & Peak',
        weeks: 2,
        focus: 'Regeneration und Krafttest',
        workouts: ['a', 'b', 'c']
      }
    ];

    // Wochenplan basierend auf den Mock-Daten
    const weeklySchedule = {
      monday: 'a',
      wednesday: 'b',
      friday: 'c'
    };

    return {
      id: client.currentPlan.id.toString(),
      name: client.currentPlan.name,
      goal: 'Muskelaufbau',
      duration: 12,
      frequency: 3,
      phases,
      workouts,
      weeklySchedule,
      notes: 'Anfängergerechtes Programm mit Fokus auf Grundübungen und progressiver Überlastung.'
    };
  };

  const handleNewPlan = () => {
    setShowPlanEditor(true);
    setIsCreatingNewPlan(true);
  };

  const handleSavePlan = (plan: any) => {
    console.log('Plan gespeichert:', plan);
    // TODO: API-Call zum Speichern des Plans
    setShowPlanEditor(false);
    setIsCreatingNewPlan(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href="/dashboard/training-plans" 
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Training - {client.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{client.currentPlan.name}</p>
          </div>
        </div>
        <button onClick={handleNewPlan} className="btn-primary">
          <PlusIcon className="mr-2 h-5 w-5" />
          Neuer Plan
        </button>
      </div>

      <div className="border-b border-gray-200 dark:border-gray-700">
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
                    ? 'border-primary-500 dark:border-primary-400 text-primary-600 dark:text-primary-400' 
                    : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                  }
                `}
              >
                <tab.icon className={`
                  -ml-0.5 mr-2 h-5 w-5 transition-colors
                  ${isActive ? 'text-primary-500 dark:text-primary-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400'}
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
                    <p className="text-sm text-gray-600 dark:text-gray-400">Trainings absolviert</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{client.statistics.totalWorkouts}</p>
                  </div>
                  <div className="p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg">
                    <CheckCircleIcon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Compliance Rate</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{client.statistics.compliance}%</p>
                  </div>
                  <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <ChartBarIcon className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Ø Trainingsdauer</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{client.statistics.avgDuration} Min</p>
                  </div>
                  <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <ClockIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card">
              <div className="card-body">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Verpasste Trainings</p>
                    <p className="mt-1 text-2xl font-semibold text-gray-900 dark:text-gray-100">{client.statistics.missedWorkouts}</p>
                  </div>
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Nächstes Training</h3>
                <div className="bg-primary-50 dark:bg-primary-900/20 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-gray-900 dark:text-gray-100">Workout B - Oberkörper Push</h4>
                    <span className="badge badge-primary">Heute 16:00</span>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                    <p>• 7 Übungen geplant</p>
                    <p>• Geschätzte Dauer: 55 Minuten</p>
                    <p>• Fokus: Brust, Schultern, Trizeps</p>
                  </div>
                  <div className="mt-4 space-y-2">
                    <Link 
                      href={`/dashboard/training-plans/client/${params.id}/workout/b`}
                      className="w-full btn-primary inline-flex items-center justify-center"
                    >
                      <PlayIcon className="mr-2 h-5 w-5" />
                      Training starten
                    </Link>
                    <button onClick={handleEditWorkout} className="w-full btn-secondary">
                      <PencilIcon className="mr-2 h-5 w-5" />
                      Training bearbeiten
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Planfortschritt</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600 dark:text-gray-400">Gesamtfortschritt</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{client.currentPlan.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${client.currentPlan.progress}%` }}
                      />
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Phase</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">{client.currentPlan.phase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Startdatum</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {new Date(client.currentPlan.startDate).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Enddatum</span>
                      <span className="font-medium text-gray-900 dark:text-gray-100">
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
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Letzte Trainingseinheiten</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Datum</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Workout</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Dauer</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Status</th>
                      <th className="pb-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {client.history.map((session, index) => (
                      <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                        <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
                          {new Date(session.date).toLocaleDateString('de-DE')}
                        </td>
                        <td className="py-3 text-sm text-gray-900 dark:text-gray-100">{session.workout}</td>
                        <td className="py-3 text-sm text-gray-900 dark:text-gray-100">
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
                          <button className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300">
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

      {activeTab === 'current-plan' && showPlanEditor && (
        <TrainingPlanEditor
          plan={isCreatingNewPlan ? undefined : convertCurrentPlanToEditorFormat()}
          clientName={client.name}
          onSave={handleSavePlan}
          onCancel={() => {
            setShowPlanEditor(false);
            setIsCreatingNewPlan(false);
          }}
        />
      )}

      {activeTab === 'current-plan' && !showPlanEditor && (
        <div className="space-y-6">
          <div className="card">
            <div className="card-body">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{client.currentPlan.name}</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {client.currentPlan.duration} • {client.currentPlan.frequency}
                  </p>
                </div>
                <button onClick={handleEditPlan} className="btn-secondary">
                  Plan bearbeiten
                </button>
              </div>

              <div className="space-y-4">
                {client.currentPlan.workouts.map((workout) => (
                  <div key={workout.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">{workout.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {(workout as any).description || `${workout.exercises} Übungen • ${workout.duration}`}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                          {workout.exercises} Übungen • {workout.duration}
                        </p>
                        {(workout as any).features && (
                          <div className="flex flex-wrap gap-1 mt-2">
                            {(workout as any).features.map((feature: string, idx: number) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{workout.timesCompleted}x</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">absolviert</p>
                        </div>
                        <Link 
                          href={`/dashboard/training-plans/client/${params.id}/workout/${workout.id}`}
                          className="btn-primary inline-flex items-center"
                        >
                          <PlayIcon className="mr-2 h-5 w-5" />
                          Starten
                        </Link>
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
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Wochenrhythmus</h3>
                <div className="space-y-3">
                  {client.currentPlan.weeklySchedule.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-gray-100">{schedule.day}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{schedule.workout}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-body">
                <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Trainingshinweise</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
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

      {/* Edit Workout Modal */}
      {showEditModal && selectedWorkout && (
        <EditWorkoutModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          workout={selectedWorkout}
          onSave={handleSaveWorkout}
        />
      )}
    </div>
  );
}