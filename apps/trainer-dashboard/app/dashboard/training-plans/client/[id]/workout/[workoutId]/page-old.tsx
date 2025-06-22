'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  PlayIcon,
  PauseIcon,
  StopIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ClockIcon,
  FireIcon,
  ChartBarIcon,
  VideoCameraIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

const workout = {
  id: 'a',
  name: 'Workout A - Unterkörper',
  description: 'Fokus auf Beine und Gesäß mit Grundübungen',
  estimatedDuration: 60,
  exercises: [
    {
      id: 1,
      name: 'Kniebeuge',
      sets: 4,
      reps: '8-10',
      weight: 80,
      rest: 180,
      notes: 'Langsame, kontrollierte Bewegung',
      videoUrl: '#',
      muscleGroups: ['Quadrizeps', 'Gesäß', 'Core'],
      equipment: 'Langhantel',
      previousWeight: 75,
      previousReps: [8, 8, 7, 6],
    },
    {
      id: 2,
      name: 'Rumänisches Kreuzheben',
      sets: 3,
      reps: '10-12',
      weight: 60,
      rest: 120,
      notes: 'Fokus auf Hüftbeugung',
      videoUrl: '#',
      muscleGroups: ['Hamstrings', 'Gesäß', 'Unterer Rücken'],
      equipment: 'Langhantel',
      previousWeight: 60,
      previousReps: [10, 10, 9],
    },
    {
      id: 3,
      name: 'Beinpresse',
      sets: 3,
      reps: '12-15',
      weight: 120,
      rest: 90,
      notes: 'Füße schulterbreit',
      videoUrl: '#',
      muscleGroups: ['Quadrizeps', 'Gesäß'],
      equipment: 'Beinpresse Maschine',
      previousWeight: 110,
      previousReps: [15, 14, 12],
    },
    {
      id: 4,
      name: 'Ausfallschritte',
      sets: 3,
      reps: '10 pro Bein',
      weight: 20,
      rest: 90,
      notes: 'Alternierend',
      videoUrl: '#',
      muscleGroups: ['Quadrizeps', 'Gesäß', 'Core'],
      equipment: 'Kurzhanteln',
      previousWeight: 20,
      previousReps: [10, 10, 9],
    },
    {
      id: 5,
      name: 'Wadenheben',
      sets: 4,
      reps: '15-20',
      weight: 40,
      rest: 60,
      notes: 'Volle Bewegungsamplitude',
      videoUrl: '#',
      muscleGroups: ['Waden'],
      equipment: 'Kurzhanteln',
      previousWeight: 35,
      previousReps: [20, 18, 16, 15],
    },
    {
      id: 6,
      name: 'Plank',
      sets: 3,
      reps: '60 Sek',
      weight: 0,
      rest: 60,
      notes: 'Körperspannung halten',
      videoUrl: '#',
      muscleGroups: ['Core'],
      equipment: 'Körpergewicht',
      previousWeight: 0,
      previousReps: [60, 55, 50],
    },
  ],
};

export default function WorkoutDetailPage() {
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(0);
  const [timer, setTimer] = useState(0);
  const [completedSets, setCompletedSets] = useState<{[key: string]: boolean[]}>({});
  const [actualWeights, setActualWeights] = useState<{[key: number]: number}>({});
  const [actualReps, setActualReps] = useState<{[key: string]: number}>({});

  const handleSetComplete = (exerciseId: number, setIndex: number) => {
    const key = `${exerciseId}`;
    const current = completedSets[key] || [];
    current[setIndex] = true;
    setCompletedSets({ ...completedSets, [key]: current });
  };

  const adjustWeight = (exerciseId: number, delta: number) => {
    const current = actualWeights[exerciseId] || workout.exercises.find(e => e.id === exerciseId)?.weight || 0;
    setActualWeights({ ...actualWeights, [exerciseId]: Math.max(0, current + delta) });
  };

  const getActualWeight = (exerciseId: number) => {
    return actualWeights[exerciseId] || workout.exercises.find(e => e.id === exerciseId)?.weight || 0;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href={`/dashboard/training-plans/client/${params.id}`}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{workout.name}</h1>
            <p className="text-sm text-gray-500">{workout.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <ClockIcon className="h-5 w-5" />
            <span>{timer > 0 ? `${Math.floor(timer / 60)}:${(timer % 60).toString().padStart(2, '0')}` : `~${workout.estimatedDuration} Min`}</span>
          </div>
          {!isActive ? (
            <button 
              onClick={() => setIsActive(true)}
              className="btn-primary"
            >
              <PlayIcon className="mr-2 h-5 w-5" />
              Training starten
            </button>
          ) : (
            <button 
              onClick={() => setIsActive(false)}
              className="btn-danger"
            >
              <StopIcon className="mr-2 h-5 w-5" />
              Beenden
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {workout.exercises.map((exercise, index) => {
            const isCurrentExercise = currentExercise === index;
            const exerciseKey = `${exercise.id}`;
            const setsCompleted = completedSets[exerciseKey] || [];
            
            return (
              <div 
                key={exercise.id}
                className={`card ${isCurrentExercise && isActive ? 'ring-2 ring-primary-500' : ''}`}
              >
                <div className="card-body">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        {index + 1}. {exercise.name}
                      </h3>
                      <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                        <span>{exercise.equipment}</span>
                        <span>•</span>
                        <span>{exercise.muscleGroups.join(', ')}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <VideoCameraIcon className="h-5 w-5 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                        <InformationCircleIcon className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Sätze</p>
                      <p className="text-base font-semibold text-gray-900">{exercise.sets}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Wiederholungen</p>
                      <p className="text-base font-semibold text-gray-900">{exercise.reps}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Gewicht</p>
                      <div className="flex items-center space-x-1">
                        <button 
                          onClick={() => adjustWeight(exercise.id, -2.5)}
                          className="p-0.5 hover:bg-gray-100 rounded"
                        >
                          <MinusIcon className="h-4 w-4 text-gray-600" />
                        </button>
                        <p className="text-base font-semibold text-gray-900 min-w-[40px] text-center">
                          {getActualWeight(exercise.id)} kg
                        </p>
                        <button 
                          onClick={() => adjustWeight(exercise.id, 2.5)}
                          className="p-0.5 hover:bg-gray-100 rounded"
                        >
                          <PlusIcon className="h-4 w-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Pause</p>
                      <p className="text-base font-semibold text-gray-900">{exercise.rest}s</p>
                    </div>
                  </div>

                  {exercise.notes && (
                    <div className="mb-4 p-3 bg-amber-50 rounded-lg">
                      <p className="text-sm text-amber-800">💡 {exercise.notes}</p>
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sätze</span>
                      <span className="text-gray-600">Letztes Mal: {exercise.previousWeight}kg</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {Array.from({ length: exercise.sets }).map((_, setIndex) => (
                        <button
                          key={setIndex}
                          onClick={() => handleSetComplete(exercise.id, setIndex)}
                          className={`
                            p-3 rounded-lg border-2 transition-all
                            ${setsCompleted[setIndex] 
                              ? 'bg-success text-white border-success' 
                              : 'bg-white border-gray-200 hover:border-gray-300'
                            }
                          `}
                        >
                          <div className="text-center">
                            <p className="text-xs">Satz {setIndex + 1}</p>
                            <p className="font-semibold">
                              {setsCompleted[setIndex] ? (
                                <CheckIcon className="h-5 w-5 mx-auto" />
                              ) : (
                                exercise.reps
                              )}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="card sticky top-4">
            <div className="card-body">
              <h3 className="text-base font-semibold text-gray-900 mb-4">Trainingsfortschritt</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Übungen</span>
                    <span className="font-medium text-gray-900">
                      {currentExercise + 1} / {workout.exercises.length}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${((currentExercise + 1) / workout.exercises.length) * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Übungsübersicht</h4>
                  {workout.exercises.map((exercise, index) => {
                    const exerciseKey = `${exercise.id}`;
                    const setsCompleted = completedSets[exerciseKey] || [];
                    const completedCount = setsCompleted.filter(Boolean).length;
                    
                    return (
                      <div 
                        key={exercise.id}
                        className={`
                          flex items-center justify-between p-2 rounded-lg text-sm
                          ${currentExercise === index ? 'bg-primary-50' : ''}
                        `}
                      >
                        <span className={currentExercise === index ? 'font-medium' : ''}>
                          {exercise.name}
                        </span>
                        <span className="text-gray-500">
                          {completedCount}/{exercise.sets}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {isActive && (
                  <div className="pt-4 border-t space-y-3">
                    <button className="w-full btn-secondary">
                      <PauseIcon className="mr-2 h-5 w-5" />
                      Pause
                    </button>
                    <button 
                      onClick={() => setCurrentExercise(Math.min(currentExercise + 1, workout.exercises.length - 1))}
                      className="w-full btn-primary"
                      disabled={currentExercise >= workout.exercises.length - 1}
                    >
                      Nächste Übung
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="text-base font-semibold text-gray-900 mb-3">Letzte Leistung</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Datum</span>
                  <span className="font-medium text-gray-900">20.01.2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dauer</span>
                  <span className="font-medium text-gray-900">62 Min</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Gesamtvolumen</span>
                  <span className="font-medium text-gray-900">8.420 kg</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}