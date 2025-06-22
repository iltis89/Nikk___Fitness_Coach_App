'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  PlayIcon,
  StopIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { groupExercisesBySupersets, parseTempoString } from '@/app/utils/training-helpers';

// Beispiel-Workout mit neuen Features (wie aus Nikks Excel)
const workout = {
  id: 'a',
  name: 'Woche 1 - Tag 1',
  date: '8/3',
  description: 'Unterkörper-fokussiertes Training mit Supersätzen',
  estimatedDuration: 60,
  exercises: [
    {
      id: '1',
      exerciseId: 'squat-1',
      exercise: {
        id: 'squat-1',
        name: 'Langhantel Kniebeuge Fersen Erhöht',
        category: 'Beine',
        equipment: 'Langhantel',
        muscleGroups: ['Quadrizeps', 'Gesäß', 'Core'],
        variations: ['Fersen erhöht'],
      },
      supersetGroup: 'A1',
      orderInSuperset: 1,
      orderInWorkout: 1,
      tempo: '4/0/1/0',
      restSeconds: 90,
      notes: 'Langsame, kontrollierte Bewegung',
      sets: [
        { setNumber: 1, targetReps: 6, targetWeight: 20, completed: false },
        { setNumber: 2, targetReps: 8, targetWeight: 25, completed: false },
        { setNumber: 3, targetReps: 8, targetWeight: 30, completed: false },
      ],
    },
    {
      id: '2',
      exerciseId: 'bench-1',
      exercise: {
        id: 'bench-1',
        name: '30° KH Schrägbank drücken neutral Bamboo Bench',
        category: 'Brust',
        equipment: 'Kurzhanteln',
        muscleGroups: ['Brust', 'Schultern', 'Trizeps'],
        variations: ['Bamboo Bench'],
      },
      supersetGroup: 'A2',
      orderInSuperset: 2,
      orderInWorkout: 2,
      tempo: 'H/0/0/H',
      restSeconds: 90,
      sets: [
        { setNumber: 1, targetReps: 8, targetWeight: 7.5, completed: false },
        { setNumber: 2, targetReps: 8, targetWeight: 10, completed: false },
        { setNumber: 3, targetReps: 8, targetWeight: 12.5, completed: false },
      ],
    },
    {
      id: '3',
      exerciseId: 'split-1',
      exercise: {
        id: 'split-1',
        name: 'Front Foot Elevated Split Squat',
        category: 'Beine',
        equipment: 'Körpergewicht',
        muscleGroups: ['Quadrizeps', 'Gesäß', 'Core'],
        unilateral: true,
      },
      supersetGroup: 'B1',
      orderInSuperset: 1,
      orderInWorkout: 3,
      tempo: '4/0/1/0',
      restSeconds: 75,
      sets: [
        { setNumber: 1, targetReps: '5 p S', targetWeight: 0, completed: false },
        { setNumber: 2, targetReps: '7 p S', targetWeight: 0, completed: false },
        { setNumber: 3, targetReps: '8 p S', targetWeight: 0, completed: false },
      ],
    },
    {
      id: '4',
      exerciseId: 'row-1',
      exercise: {
        id: 'row-1',
        name: 'Rudern m. Seil z. Hals proniert',
        category: 'Rücken',
        equipment: 'Kabelzug',
        muscleGroups: ['Oberer Rücken', 'Hintere Schultern'],
      },
      supersetGroup: 'B2',
      orderInSuperset: 2,
      orderInWorkout: 4,
      tempo: '3/0/1/2',
      restSeconds: 75,
      sets: [
        { setNumber: 1, targetReps: 10, targetWeight: 80, equipmentSetting: 'Stufe 4', completed: false },
        { setNumber: 2, targetReps: 10, targetWeight: 90, equipmentSetting: 'Stufe 4', completed: false },
        { setNumber: 3, targetReps: 10, targetWeight: 100, equipmentSetting: 'Stufe 4', completed: false },
      ],
    },
    {
      id: '5',
      exerciseId: 'curl-1',
      exercise: {
        id: 'curl-1',
        name: 'Reverse SZ Curl',
        category: 'Arme',
        equipment: 'SZ-Stange',
        muscleGroups: ['Bizeps', 'Unterarme'],
      },
      supersetGroup: 'C',
      orderInWorkout: 5,
      tempo: '3/1/1/0',
      restSeconds: 120,
      sets: [
        { setNumber: 1, targetReps: '6-8', targetWeight: 15, completed: false },
        { setNumber: 2, targetReps: '6-8', targetWeight: 15, completed: false },
      ],
    },
  ],
};

interface TempoTimerProps {
  tempo: string;
  isActive: boolean;
  currentPhase: 'ready' | 'eccentric' | 'pause1' | 'concentric' | 'pause2';
}

function TempoTimer({ tempo, isActive, currentPhase }: TempoTimerProps) {
  const parsed = parseTempoString(tempo);
  if (!parsed) return null;

  const phaseNames = {
    ready: 'Bereit',
    eccentric: 'Ablassen',
    pause1: 'Halten',
    concentric: 'Drücken/Ziehen',
    pause2: 'Halten'
  };

  const phaseColors = {
    ready: 'bg-gray-200',
    eccentric: 'bg-red-500',
    pause1: 'bg-yellow-500',
    concentric: 'bg-green-500',
    pause2: 'bg-yellow-500'
  };

  return (
    <div className="mt-2 p-3 bg-gray-50 rounded-lg">
      <div className="text-xs text-gray-600 mb-2">Tempo: {tempo}</div>
      <div className="flex space-x-1">
        <div className={`flex-1 h-2 rounded ${currentPhase === 'eccentric' ? phaseColors.eccentric : 'bg-gray-300'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'pause1' ? phaseColors.pause1 : 'bg-gray-300'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'concentric' ? phaseColors.concentric : 'bg-gray-300'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'pause2' ? phaseColors.pause2 : 'bg-gray-300'}`} />
      </div>
      <div className="text-center mt-1 text-sm font-medium">
        {phaseNames[currentPhase]}
      </div>
    </div>
  );
}

export default function WorkoutDetailPage() {
  const params = useParams();
  const [isActive, setIsActive] = useState(false);
  const [restTimer, setRestTimer] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [sessionTimer, setSessionTimer] = useState(0);
  const [completedSets, setCompletedSets] = useState<{[key: string]: boolean[]}>({});
  const [workoutData, setWorkoutData] = useState(workout);
  const [currentTempoPhase, setCurrentTempoPhase] = useState<'ready' | 'eccentric' | 'pause1' | 'concentric' | 'pause2'>('ready');
  
  // Group exercises by supersets
  const supersetGroups = groupExercisesBySupersets(workout.exercises);

  // Rest timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isResting && restTimer > 0) {
      interval = setInterval(() => {
        setRestTimer(prev => prev - 1);
      }, 1000);
    } else if (restTimer === 0) {
      setIsResting(false);
    }
    return () => clearInterval(interval);
  }, [isResting, restTimer]);

  // Session timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        setSessionTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive]);

  const handleSetComplete = (exerciseId: string, setIndex: number) => {
    const key = exerciseId;
    const current = completedSets[key] || [];
    current[setIndex] = true;
    setCompletedSets({ ...completedSets, [key]: current });
    
    // Start rest timer
    const exercise = workout.exercises.find(e => e.id === exerciseId);
    if (exercise) {
      setRestTimer(exercise.restSeconds);
      setIsResting(true);
    }
  };

  const adjustWeight = (exerciseId: string, setIndex: number, delta: number) => {
    setWorkoutData((prev: any) => ({
      ...prev,
      exercises: prev.exercises.map((ex: any) => 
        ex.id === exerciseId 
          ? {
              ...ex,
              sets: ex.sets.map((set: any, idx: number) => 
                idx === setIndex 
                  ? { ...set, targetWeight: Math.max(0, set.targetWeight + delta) }
                  : set
              )
            }
          : ex
      )
    }));
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
            <p className="text-sm text-gray-500">{workout.date} • {workout.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-4">
            {isResting && (
              <div className="flex items-center space-x-2 text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-lg">
                <ClockIcon className="h-5 w-5" />
                <span>Pause: {formatTime(restTimer)}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <ClockIcon className="h-5 w-5" />
              <span>{isActive ? formatTime(sessionTimer) : `~${workout.estimatedDuration} Min`}</span>
            </div>
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
          {Array.from(supersetGroups.entries()).map(([group, exercises]) => {
            const isSuperset = !group.startsWith('single_');
            
            return (
              <div key={group} className="card">
                <div className="card-body">
                  {isSuperset && (
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Supersatz {group.replace(/[0-9]/g, '')}
                      </h3>
                      <span className="text-sm text-gray-500">
                        {exercises.length} Übungen • Pause: {exercises[0].restSeconds}s
                      </span>
                    </div>
                  )}
                  
                  <div className={`space-y-${isSuperset ? '6' : '0'}`}>
                    {exercises.map((exercise) => {
                      const exerciseKey = exercise.id;
                      const setsCompleted = completedSets[exerciseKey] || [];
                      
                      return (
                        <div key={exercise.id} className={isSuperset ? 'border-l-4 border-primary-200 pl-4' : ''}>
                          <div className="mb-4">
                            <h4 className="font-medium text-gray-900">
                              {exercise.supersetGroup && `${exercise.supersetGroup}: `}
                              {exercise.exercise?.name}
                            </h4>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500">
                              <span>{exercise.exercise?.equipment}</span>
                              <span>•</span>
                              <span>{exercise.exercise?.muscleGroups.join(', ')}</span>
                              {exercise.tempo && (
                                <>
                                  <span>•</span>
                                  <span className="flex items-center">
                                    <ClockIcon className="h-4 w-4 mr-1" />
                                    Tempo: {exercise.tempo}
                                  </span>
                                </>
                              )}
                            </div>
                            
                            {exercise.exercise?.variations && (
                              <div className="mt-2">
                                {exercise.exercise.variations.map(v => (
                                  <span key={v} className="inline-block px-2 py-0.5 text-xs bg-primary-100 text-primary-700 rounded mr-1">
                                    {v}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {exercise.notes && (
                              <div className="mt-2 p-2 bg-amber-50 rounded text-sm text-amber-800">
                                <InformationCircleIcon className="h-4 w-4 inline mr-1" />
                                {exercise.notes}
                              </div>
                            )}
                            
                            {exercise.tempo && isActive && (
                              <TempoTimer 
                                tempo={exercise.tempo} 
                                isActive={isActive} 
                                currentPhase={currentTempoPhase}
                              />
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div key={setIndex} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm font-medium text-gray-700">
                                    Satz {set.setNumber}
                                  </span>
                                  <span className="text-sm text-gray-600">
                                    {set.targetReps} Wdh
                                  </span>
                                  <div className="flex items-center">
                                    <button
                                      onClick={() => adjustWeight(exercise.id, setIndex, -2.5)}
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <MinusIcon className="h-3 w-3" />
                                    </button>
                                    <span className="mx-2 text-sm font-medium">
                                      {set.targetWeight} kg
                                      {set.equipmentSetting && ` (${set.equipmentSetting})`}
                                    </span>
                                    <button
                                      onClick={() => adjustWeight(exercise.id, setIndex, 2.5)}
                                      className="p-1 hover:bg-gray-200 rounded"
                                    >
                                      <PlusIcon className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleSetComplete(exercise.id, setIndex)}
                                  className={`
                                    px-3 py-1 rounded-lg transition-colors
                                    ${setsCompleted[setIndex]
                                      ? 'bg-success text-white'
                                      : 'bg-white border border-gray-300 hover:bg-gray-100'
                                    }
                                  `}
                                >
                                  {setsCompleted[setIndex] ? (
                                    <CheckIcon className="h-5 w-5" />
                                  ) : (
                                    'Fertig'
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
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
                    <span className="text-gray-600">Gesamtfortschritt</span>
                    <span className="font-medium text-gray-900">
                      {Object.values(completedSets).flat().filter(Boolean).length} / 
                      {workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)} Sätze
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(Object.values(completedSets).flat().filter(Boolean).length / 
                          workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-900">Übungsübersicht</h4>
                  {Array.from(supersetGroups.entries()).map(([group, exercises]) => {
                    const isSuperset = !group.startsWith('single_');
                    
                    return (
                      <div key={group} className="space-y-1">
                        {isSuperset && (
                          <p className="text-xs font-medium text-gray-600 px-2">
                            Supersatz {group.replace(/[0-9]/g, '')}
                          </p>
                        )}
                        {exercises.map((exercise) => {
                          const exerciseKey = exercise.id;
                          const setsCompleted = completedSets[exerciseKey] || [];
                          const completedCount = setsCompleted.filter(Boolean).length;
                          
                          return (
                            <div 
                              key={exercise.id}
                              className={`
                                flex items-center justify-between p-2 rounded-lg text-sm
                                ${isSuperset ? 'ml-4' : ''}
                              `}
                            >
                              <span className="text-sm">
                                {exercise.supersetGroup && `${exercise.supersetGroup}: `}
                                {exercise.exercise?.name}
                              </span>
                              <span className="text-gray-500">
                                {completedCount}/{exercise.sets.length}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                {isActive && (
                  <div className="pt-4 border-t space-y-3">
                    {isResting && (
                      <button 
                        onClick={() => setIsResting(false)}
                        className="w-full btn-secondary"
                      >
                        Pause überspringen
                      </button>
                    )}
                    <button 
                      onClick={() => setIsActive(false)}
                      className="w-full btn-danger"
                    >
                      <StopIcon className="mr-2 h-5 w-5" />
                      Training beenden
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}