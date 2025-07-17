'use client';

import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  TrashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CalendarDaysIcon,
  ClockIcon,
  FireIcon,
  AcademicCapIcon,
  ArrowPathIcon,
  CheckIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  tempo?: string;
  notes?: string;
}

interface Workout {
  id: string;
  name: string;
  description: string;
  exercises: Exercise[];
  estimatedDuration: number;
  focus: string[];
}

interface TrainingPhase {
  id: string;
  name: string;
  weeks: number;
  focus: string;
  workouts: string[]; // workout IDs
}

interface WeeklySchedule {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
  monday2?: string;
  tuesday2?: string;
  wednesday2?: string;
  thursday2?: string;
  friday2?: string;
  saturday2?: string;
  sunday2?: string;
}

interface TrainingPlan {
  id?: string;
  name: string;
  goal: string;
  duration: number; // weeks
  frequency: number; // per week
  phases: TrainingPhase[];
  workouts: Workout[];
  weeklySchedule: WeeklySchedule;
  notes?: string;
}

interface TrainingPlanEditorProps {
  plan?: TrainingPlan;
  clientName: string;
  onSave: (plan: TrainingPlan) => void;
  onCancel: () => void;
}

const TRAINING_GOALS = [
  'Muskelaufbau',
  'Kraftaufbau', 
  'Fettabbau',
  'Athletik',
  'Rehabilitation',
  'Allgemeine Fitness'
];

const FOCUS_AREAS = [
  'Brust',
  'Rücken',
  'Schultern',
  'Arme',
  'Beine',
  'Core',
  'Ganzkörper',
  'Oberkörper',
  'Unterkörper'
];

const EXERCISE_DATABASE = [
  // Brust
  { name: 'Bankdrücken', category: 'Brust' },
  { name: 'Schrägbankdrücken', category: 'Brust' },
  { name: 'Fliegende', category: 'Brust' },
  { name: 'Dips', category: 'Brust' },
  
  // Rücken
  { name: 'Klimmzüge', category: 'Rücken' },
  { name: 'Kreuzheben', category: 'Rücken' },
  { name: 'Rudern', category: 'Rücken' },
  { name: 'Latzug', category: 'Rücken' },
  
  // Beine
  { name: 'Kniebeugen', category: 'Beine' },
  { name: 'Beinpresse', category: 'Beine' },
  { name: 'Ausfallschritte', category: 'Beine' },
  { name: 'Wadenheben', category: 'Beine' },
  
  // Schultern
  { name: 'Schulterdrücken', category: 'Schultern' },
  { name: 'Seitheben', category: 'Schultern' },
  { name: 'Face Pulls', category: 'Schultern' },
  
  // Arme
  { name: 'Bizepscurls', category: 'Arme' },
  { name: 'Trizepsdrücken', category: 'Arme' },
  { name: 'Hammercurls', category: 'Arme' },
];

export function TrainingPlanEditor({ plan, clientName, onSave, onCancel }: TrainingPlanEditorProps) {
  const [planData, setPlanData] = useState<TrainingPlan>({
    name: '',
    goal: 'Muskelaufbau',
    duration: 12,
    frequency: 3,
    phases: [],
    workouts: [],
    weeklySchedule: {},
    notes: ''
  });
  
  const [activeStep, setActiveStep] = useState(0);
  const [expandedWorkout, setExpandedWorkout] = useState<string | null>(null);
  const [showExerciseSearch, setShowExerciseSearch] = useState<string | null>(null);
  const [exerciseSearchTerm, setExerciseSearchTerm] = useState('');

  useEffect(() => {
    if (plan) {
      setPlanData(plan);
    }
  }, [plan]);

  const steps = [
    { id: 0, name: 'Grundeinstellungen', icon: AcademicCapIcon },
    { id: 1, name: 'Phasen & Periodisierung', icon: ArrowPathIcon },
    { id: 2, name: 'Workouts erstellen', icon: FireIcon },
    { id: 3, name: 'Wochenplan', icon: CalendarDaysIcon },
    { id: 4, name: 'Überprüfung', icon: CheckIcon }
  ];

  const handleAddPhase = () => {
    const newPhase: TrainingPhase = {
      id: `phase-${Date.now()}`,
      name: `Phase ${planData.phases.length + 1}`,
      weeks: 4,
      focus: '',
      workouts: []
    };
    setPlanData({ ...planData, phases: [...planData.phases, newPhase] });
  };

  const handleAddWorkout = () => {
    const newWorkout: Workout = {
      id: `workout-${Date.now()}`,
      name: `Workout ${String.fromCharCode(65 + planData.workouts.length)}`,
      description: '',
      exercises: [],
      estimatedDuration: 60,
      focus: []
    };
    setPlanData({ ...planData, workouts: [...planData.workouts, newWorkout] });
    setExpandedWorkout(newWorkout.id);
  };

  const handleAddExercise = (workoutId: string, exerciseName?: string) => {
    const newExercise: Exercise = {
      id: `ex-${Date.now()}`,
      name: exerciseName || '',
      sets: 3,
      reps: '8-12',
      rest: '90s',
      tempo: '2-0-2-0'
    };
    
    setPlanData({
      ...planData,
      workouts: planData.workouts.map(w => 
        w.id === workoutId 
          ? { ...w, exercises: [...w.exercises, newExercise] }
          : w
      )
    });
    
    if (exerciseName) {
      setShowExerciseSearch(null);
      setExerciseSearchTerm('');
    }
  };

  const filteredExercises = EXERCISE_DATABASE.filter(ex =>
    ex.name.toLowerCase().includes(exerciseSearchTerm.toLowerCase())
  );

  const renderStep = () => {
    switch (activeStep) {
      case 0: // Grundeinstellungen
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Planname
              </label>
              <input
                type="text"
                value={planData.name}
                onChange={(e) => setPlanData({ ...planData, name: e.target.value })}
                placeholder={`z.B. ${clientName} - Muskelaufbau Programm`}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Trainingsziel
              </label>
              <select
                value={planData.goal}
                onChange={(e) => setPlanData({ ...planData, goal: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {TRAINING_GOALS.map(goal => (
                  <option key={goal} value={goal}>{goal}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dauer (Wochen)
                </label>
                <input
                  type="number"
                  value={planData.duration}
                  onChange={(e) => setPlanData({ ...planData, duration: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="52"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Trainingsfrequenz (pro Woche)
                </label>
                <input
                  type="number"
                  value={planData.frequency}
                  onChange={(e) => setPlanData({ ...planData, frequency: parseInt(e.target.value) || 0 })}
                  min="1"
                  max="7"
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Notizen & Besonderheiten
              </label>
              <textarea
                value={planData.notes}
                onChange={(e) => setPlanData({ ...planData, notes: e.target.value })}
                placeholder="z.B. Verletzungen, Einschränkungen, spezielle Wünsche..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        );

      case 1: // Phasen & Periodisierung
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Trainingsphasen</h3>
              <button
                onClick={handleAddPhase}
                className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700"
              >
                <PlusIcon className="h-4 w-4" />
                Phase hinzufügen
              </button>
            </div>

            <div className="space-y-4">
              {planData.phases.map((phase, index) => (
                <div key={phase.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-4">
                      <input
                        type="text"
                        value={phase.name}
                        onChange={(e) => {
                          const updated = [...planData.phases];
                          updated[index] = { ...phase, name: e.target.value };
                          setPlanData({ ...planData, phases: updated });
                        }}
                        placeholder="Phasenname"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                      />
                    </div>
                    <div className="col-span-2">
                      <input
                        type="number"
                        value={phase.weeks}
                        onChange={(e) => {
                          const updated = [...planData.phases];
                          updated[index] = { ...phase, weeks: parseInt(e.target.value) || 0 };
                          setPlanData({ ...planData, phases: updated });
                        }}
                        min="1"
                        placeholder="Wochen"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center"
                      />
                    </div>
                    <div className="col-span-5">
                      <input
                        type="text"
                        value={phase.focus}
                        onChange={(e) => {
                          const updated = [...planData.phases];
                          updated[index] = { ...phase, focus: e.target.value };
                          setPlanData({ ...planData, phases: updated });
                        }}
                        placeholder="Fokus (z.B. Volumen, Intensität)"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                      />
                    </div>
                    <div className="col-span-1 flex justify-end">
                      <button
                        onClick={() => {
                          const updated = planData.phases.filter(p => p.id !== phase.id);
                          setPlanData({ ...planData, phases: updated });
                        }}
                        className="p-1 text-red-400 hover:text-red-600"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {planData.phases.length === 0 && (
              <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                <p>Noch keine Phasen erstellt.</p>
                <p className="text-sm mt-2">Füge Phasen hinzu, um deinen Plan zu strukturieren.</p>
              </div>
            )}
          </div>
        );

      case 2: // Workouts erstellen
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Workouts</h3>
              <button
                onClick={handleAddWorkout}
                className="flex items-center gap-2 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700"
              >
                <PlusIcon className="h-4 w-4" />
                Workout hinzufügen
              </button>
            </div>

            <div className="space-y-4">
              {planData.workouts.map((workout) => (
                <div key={workout.id} className="border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div
                    className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => setExpandedWorkout(expandedWorkout === workout.id ? null : workout.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">{workout.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {workout.exercises.length} Übungen • {workout.estimatedDuration} Min
                        </p>
                      </div>
                      {expandedWorkout === workout.id ? (
                        <ChevronUpIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  {expandedWorkout === workout.id && (
                    <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="text"
                          value={workout.name}
                          onChange={(e) => {
                            setPlanData({
                              ...planData,
                              workouts: planData.workouts.map(w =>
                                w.id === workout.id ? { ...w, name: e.target.value } : w
                              )
                            });
                          }}
                          placeholder="Workout Name"
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                        <input
                          type="text"
                          value={workout.description}
                          onChange={(e) => {
                            setPlanData({
                              ...planData,
                              workouts: planData.workouts.map(w =>
                                w.id === workout.id ? { ...w, description: e.target.value } : w
                              )
                            });
                          }}
                          placeholder="Beschreibung"
                          className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        />
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Übungen</label>
                          <button
                            onClick={() => setShowExerciseSearch(workout.id)}
                            className="text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700"
                          >
                            <PlusIcon className="h-4 w-4 inline" /> Übung hinzufügen
                          </button>
                        </div>

                        {showExerciseSearch === workout.id && (
                          <div className="mb-4 relative">
                            <input
                              type="text"
                              value={exerciseSearchTerm}
                              onChange={(e) => setExerciseSearchTerm(e.target.value)}
                              placeholder="Übung suchen..."
                              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                              autoFocus
                            />
                            {exerciseSearchTerm && (
                              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                                {filteredExercises.map(ex => (
                                  <button
                                    key={ex.name}
                                    onClick={() => handleAddExercise(workout.id, ex.name)}
                                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm"
                                  >
                                    {ex.name} <span className="text-gray-500">({ex.category})</span>
                                  </button>
                                ))}
                                <button
                                  onClick={() => handleAddExercise(workout.id, exerciseSearchTerm)}
                                  className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-primary-600 dark:text-primary-400"
                                >
                                  "{exerciseSearchTerm}" hinzufügen
                                </button>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="space-y-2">
                          {workout.exercises.map((exercise, exIndex) => (
                            <div key={exercise.id} className="grid grid-cols-12 gap-2 items-center bg-gray-50 dark:bg-gray-900 p-2 rounded">
                              <div className="col-span-4">
                                <input
                                  type="text"
                                  value={exercise.name}
                                  onChange={(e) => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        const updatedExercises = [...w.exercises];
                                        updatedExercises[exIndex] = { ...exercise, name: e.target.value };
                                        return { ...w, exercises: updatedExercises };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  placeholder="Übung"
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm"
                                />
                              </div>
                              <div className="col-span-2">
                                <input
                                  type="number"
                                  value={exercise.sets}
                                  onChange={(e) => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        const updatedExercises = [...w.exercises];
                                        updatedExercises[exIndex] = { ...exercise, sets: parseInt(e.target.value) || 0 };
                                        return { ...w, exercises: updatedExercises };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  placeholder="Sätze"
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center"
                                />
                              </div>
                              <div className="col-span-2">
                                <input
                                  type="text"
                                  value={exercise.reps}
                                  onChange={(e) => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        const updatedExercises = [...w.exercises];
                                        updatedExercises[exIndex] = { ...exercise, reps: e.target.value };
                                        return { ...w, exercises: updatedExercises };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  placeholder="Wdh"
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center"
                                />
                              </div>
                              <div className="col-span-2">
                                <input
                                  type="text"
                                  value={exercise.tempo || ''}
                                  onChange={(e) => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        const updatedExercises = [...w.exercises];
                                        updatedExercises[exIndex] = { ...exercise, tempo: e.target.value };
                                        return { ...w, exercises: updatedExercises };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  placeholder="Tempo"
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center"
                                />
                              </div>
                              <div className="col-span-1">
                                <input
                                  type="text"
                                  value={exercise.rest}
                                  onChange={(e) => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        const updatedExercises = [...w.exercises];
                                        updatedExercises[exIndex] = { ...exercise, rest: e.target.value };
                                        return { ...w, exercises: updatedExercises };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  placeholder="Pause"
                                  className="w-full px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center"
                                />
                              </div>
                              <div className="col-span-1 flex justify-end">
                                <button
                                  onClick={() => {
                                    const updatedWorkouts = planData.workouts.map(w => {
                                      if (w.id === workout.id) {
                                        return { ...w, exercises: w.exercises.filter(e => e.id !== exercise.id) };
                                      }
                                      return w;
                                    });
                                    setPlanData({ ...planData, workouts: updatedWorkouts });
                                  }}
                                  className="p-1 text-red-400 hover:text-red-600"
                                >
                                  <TrashIcon className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => {
                            setPlanData({
                              ...planData,
                              workouts: planData.workouts.filter(w => w.id !== workout.id)
                            });
                          }}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          Workout löschen
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 3: // Wochenplan
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">14-Tage-Plan</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Ordne die Workouts für einen 14-tägigen Zyklus zu.
            </p>

            <div className="space-y-8">
              {/* Woche 1 */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Woche 1</h4>
                <div className="space-y-3">
                  {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => (
                    <div key={day} className="grid grid-cols-3 gap-4 items-center">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {day === 'monday' && 'Montag'}
                        {day === 'tuesday' && 'Dienstag'}
                        {day === 'wednesday' && 'Mittwoch'}
                        {day === 'thursday' && 'Donnerstag'}
                        {day === 'friday' && 'Freitag'}
                        {day === 'saturday' && 'Samstag'}
                        {day === 'sunday' && 'Sonntag'}
                      </label>
                      <div className="col-span-2">
                        <select
                          value={planData.weeklySchedule[day as keyof WeeklySchedule] || ''}
                          onChange={(e) => {
                            setPlanData({
                              ...planData,
                              weeklySchedule: {
                                ...planData.weeklySchedule,
                                [day]: e.target.value || undefined
                              }
                            });
                          }}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        >
                          <option value="">Ruhetag</option>
                          {planData.workouts.map(workout => (
                            <option key={workout.id} value={workout.id}>
                              {workout.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Woche 2 */}
              <div>
                <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-4">Woche 2</h4>
                <div className="space-y-3">
                  {['monday2', 'tuesday2', 'wednesday2', 'thursday2', 'friday2', 'saturday2', 'sunday2'].map((day, index) => {
                    const displayDay = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                    return (
                      <div key={day} className="grid grid-cols-3 gap-4 items-center">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                          {displayDay === 'monday' && 'Montag'}
                          {displayDay === 'tuesday' && 'Dienstag'}
                          {displayDay === 'wednesday' && 'Mittwoch'}
                          {displayDay === 'thursday' && 'Donnerstag'}
                          {displayDay === 'friday' && 'Freitag'}
                          {displayDay === 'saturday' && 'Samstag'}
                          {displayDay === 'sunday' && 'Sonntag'}
                        </label>
                        <div className="col-span-2">
                          <select
                            value={planData.weeklySchedule[day as keyof WeeklySchedule] || ''}
                            onChange={(e) => {
                              setPlanData({
                                ...planData,
                                weeklySchedule: {
                                  ...planData.weeklySchedule,
                                  [day]: e.target.value || undefined
                                }
                              });
                            }}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          >
                            <option value="">Ruhetag</option>
                            {planData.workouts.map(workout => (
                              <option key={workout.id} value={workout.id}>
                                {workout.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Überprüfung
        return (
          <div className="space-y-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Planübersicht</h3>
            
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 space-y-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">{planData.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Ziel: {planData.goal} • {planData.duration} Wochen • {planData.frequency}x pro Woche
                </p>
              </div>

              {planData.phases.length > 0 && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phasen:</h5>
                  <ul className="space-y-1">
                    {planData.phases.map(phase => (
                      <li key={phase.id} className="text-sm text-gray-600 dark:text-gray-400">
                        • {phase.name} ({phase.weeks} Wochen) - {phase.focus}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Workouts:</h5>
                <ul className="space-y-1">
                  {planData.workouts.map(workout => (
                    <li key={workout.id} className="text-sm text-gray-600 dark:text-gray-400">
                      • {workout.name} - {workout.exercises.length} Übungen
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">14-Tage-Plan:</h5>
                
                {/* Woche 1 */}
                <div className="mb-3">
                  <h6 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Woche 1</h6>
                  <div className="grid grid-cols-7 gap-2 text-xs">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, index) => {
                      const dayKey = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'][index];
                      const workoutId = planData.weeklySchedule[dayKey as keyof WeeklySchedule];
                      const workout = planData.workouts.find(w => w.id === workoutId);
                      return (
                        <div key={`week1-${day}`} className="text-center">
                          <div className="font-medium text-gray-700 dark:text-gray-300">{day}</div>
                          <div className={`mt-1 p-2 rounded ${workout ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                            {workout ? workout.name.split(' ')[1] : '-'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Woche 2 */}
                <div>
                  <h6 className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">Woche 2</h6>
                  <div className="grid grid-cols-7 gap-2 text-xs">
                    {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day, index) => {
                      const dayKey = ['monday2', 'tuesday2', 'wednesday2', 'thursday2', 'friday2', 'saturday2', 'sunday2'][index];
                      const workoutId = planData.weeklySchedule[dayKey as keyof WeeklySchedule];
                      const workout = planData.workouts.find(w => w.id === workoutId);
                      return (
                        <div key={`week2-${day}`} className="text-center">
                          <div className="font-medium text-gray-700 dark:text-gray-300">{day}</div>
                          <div className={`mt-1 p-2 rounded ${workout ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                            {workout ? workout.name.split(' ')[1] : '-'}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {planData.notes && (
                <div>
                  <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Notizen:</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{planData.notes}</p>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 0:
        return planData.name && planData.goal && planData.duration > 0 && planData.frequency > 0;
      case 1:
        return true; // Phasen sind optional
      case 2:
        return planData.workouts.length >= planData.frequency && planData.workouts.every(w => w.exercises.length > 0);
      case 3:
        const scheduledWorkouts = Object.values(planData.weeklySchedule).filter(Boolean).length;
        return scheduledWorkouts >= planData.frequency * 2; // Mindestens frequency * 2 für 14 Tage
      case 4:
        return true;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {plan ? 'Trainingsplan bearbeiten' : 'Neuen Trainingsplan erstellen'}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Für {clientName}
          </p>
        </div>

        {/* Steps */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => setActiveStep(step.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    activeStep === step.id
                      ? 'bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : activeStep > step.id
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <step.icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{step.name}</span>
                </button>
                {index < steps.length - 1 && (
                  <div className={`mx-2 h-px w-8 ${
                    activeStep > step.id ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="px-6 py-6">
          {renderStep()}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Abbrechen
          </button>
          <div className="flex gap-3">
            {activeStep > 0 && (
              <button
                onClick={() => setActiveStep(activeStep - 1)}
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Zurück
              </button>
            )}
            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={!canProceed()}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Weiter
              </button>
            ) : (
              <button
                onClick={() => onSave(planData)}
                disabled={!canProceed()}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Plan speichern
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}