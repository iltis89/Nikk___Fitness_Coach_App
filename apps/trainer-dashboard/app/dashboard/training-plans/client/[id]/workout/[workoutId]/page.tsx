'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  ArrowLeftIcon,
  ArrowRightIcon,
  PlayIcon,
  StopIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon,
  ClockIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { groupExercisesBySupersets, parseTempoString } from '@/app/utils/training-helpers';
import { WorkoutSummaryModal } from '@/components/training/WorkoutSummaryModal';

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
        { setNumber: 1, targetReps: 6, targetWeight: 20, previousWeight: 17.5, previousReps: 6, completed: false },
        { setNumber: 2, targetReps: 8, targetWeight: 25, previousWeight: 22.5, previousReps: 7, completed: false },
        { setNumber: 3, targetReps: 8, targetWeight: 30, previousWeight: 27.5, previousReps: 8, completed: false },
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
        { setNumber: 1, targetReps: 8, targetWeight: 7.5, previousWeight: 5, previousReps: 8, completed: false },
        { setNumber: 2, targetReps: 8, targetWeight: 10, previousWeight: 7.5, previousReps: 8, completed: false },
        { setNumber: 3, targetReps: 8, targetWeight: 12.5, previousWeight: 10, previousReps: 7, completed: false },
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
        { setNumber: 1, targetReps: '5 p S', targetWeight: 0, previousWeight: 0, previousReps: '5 p S', completed: false },
        { setNumber: 2, targetReps: '7 p S', targetWeight: 0, previousWeight: 0, previousReps: '6 p S', completed: false },
        { setNumber: 3, targetReps: '8 p S', targetWeight: 0, previousWeight: 0, previousReps: '7 p S', completed: false },
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
        { setNumber: 1, targetReps: 10, targetWeight: 80, previousWeight: 70, previousReps: 10, equipmentSetting: 'Stufe 4', completed: false },
        { setNumber: 2, targetReps: 10, targetWeight: 90, previousWeight: 80, previousReps: 10, equipmentSetting: 'Stufe 4', completed: false },
        { setNumber: 3, targetReps: 10, targetWeight: 100, previousWeight: 90, previousReps: 9, equipmentSetting: 'Stufe 4', completed: false },
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
        { setNumber: 1, targetReps: '6-8', targetWeight: 15, previousWeight: 12.5, previousReps: '7', completed: false },
        { setNumber: 2, targetReps: '6-8', targetWeight: 15, previousWeight: 12.5, previousReps: '6', completed: false },
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
    ready: 'bg-gray-200 dark:bg-gray-600',
    eccentric: 'bg-red-500 dark:bg-red-600',
    pause1: 'bg-yellow-500 dark:bg-yellow-600',
    concentric: 'bg-green-500 dark:bg-green-600',
    pause2: 'bg-yellow-500 dark:bg-yellow-600'
  };

  return (
    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="text-xs text-gray-600 dark:text-gray-400 mb-2">Tempo: {tempo}</div>
      <div className="flex space-x-1">
        <div className={`flex-1 h-2 rounded ${currentPhase === 'eccentric' ? phaseColors.eccentric : 'bg-gray-300 dark:bg-gray-600'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'pause1' ? phaseColors.pause1 : 'bg-gray-300 dark:bg-gray-600'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'concentric' ? phaseColors.concentric : 'bg-gray-300 dark:bg-gray-600'}`} />
        <div className={`flex-1 h-2 rounded ${currentPhase === 'pause2' ? phaseColors.pause2 : 'bg-gray-300 dark:bg-gray-600'}`} />
      </div>
      <div className="text-center mt-1 text-sm font-medium text-gray-900 dark:text-gray-100">
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
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [workoutStartTime, setWorkoutStartTime] = useState<Date | null>(null);
  
  // State für Supersatz-spezifische Timer
  const [supersetTimers, setSupersetTimers] = useState<{[key: string]: number}>({});
  const [activeSupersets, setActiveSupersets] = useState<{[key: string]: boolean}>({});
  const [supersetRestTimers, setSupersetRestTimers] = useState<{[key: string]: number}>({});
  const [supersetNotes, setSupersetNotes] = useState<{[key: string]: string}>({});
  
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

  // Supersatz-spezifische Timer
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    
    Object.entries(activeSupersets).forEach(([group, isActive]) => {
      if (isActive) {
        intervals[group] = setInterval(() => {
          setSupersetTimers(prev => ({
            ...prev,
            [group]: (prev[group] || 0) + 1
          }));
        }, 1000);
      }
    });
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [activeSupersets]);

  // Supersatz Rest Timer
  useEffect(() => {
    const intervals: { [key: string]: NodeJS.Timeout } = {};
    
    Object.entries(supersetRestTimers).forEach(([group, time]) => {
      if (time > 0) {
        intervals[group] = setInterval(() => {
          setSupersetRestTimers(prev => ({
            ...prev,
            [group]: Math.max(0, prev[group] - 1)
          }));
        }, 1000);
      }
    });
    
    return () => {
      Object.values(intervals).forEach(interval => clearInterval(interval));
    };
  }, [supersetRestTimers]);

  const handleSetComplete = (exerciseId: string, setIndex: number, supersetGroup: string) => {
    const key = exerciseId;
    const current = completedSets[key] || [];
    
    // Toggle the completion status
    const wasCompleted = current[setIndex];
    current[setIndex] = !wasCompleted;
    setCompletedSets({ ...completedSets, [key]: current });
    
    // Only start rest timer if we're marking as complete (not uncompleting)
    if (!wasCompleted) {
      const exercise = workout.exercises.find(e => e.id === exerciseId);
      if (exercise) {
        setSupersetRestTimers(prev => ({
          ...prev,
          [supersetGroup]: exercise.restSeconds
        }));
      }
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
                  ? { 
                      ...set, 
                      targetWeight: Math.max(0, Math.round((set.targetWeight + delta) * 10) / 10) // Runde auf eine Nachkommastelle
                    }
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

  const calculateWorkoutStats = () => {
    let totalWeight = 0;
    let totalReps = 0;
    let totalSets = 0;
    let completedSetsCount = 0;
    let exercises = 0;
    const personalRecords = Math.random() > 0.7 ? Math.floor(Math.random() * 3) + 1 : 0; // Beispielhafte PR-Berechnung

    workoutData.exercises.forEach((exercise) => {
      const exerciseCompleted = completedSets[exercise.id] || [];
      exercises++;
      
      exercise.sets.forEach((set, index) => {
        totalSets++;
        
        if (exerciseCompleted[index]) {
          completedSetsCount++;
          let reps = 0;
          
          if (typeof set.targetReps === 'string') {
            // Handle "5 p S" format
            const match = set.targetReps.match(/\d+/);
            reps = match ? parseInt(match[0]) * 2 : 0; // *2 für beide Seiten
          } else {
            reps = set.targetReps;
          }
          
          const weight = workoutData.exercises.find(e => e.id === exercise.id)?.sets[index]?.targetWeight || set.targetWeight;
          totalReps += reps;
          totalWeight += weight * reps;
        }
      });
    });

    const duration = workoutStartTime ? Math.floor((new Date().getTime() - workoutStartTime.getTime()) / 1000) : sessionTimer;
    const completionRate = Math.round((completedSetsCount / totalSets) * 100);

    return {
      totalWeight: Math.round(totalWeight),
      totalReps,
      totalSets: completedSetsCount,
      duration,
      exercises,
      personalRecords,
      completionRate
    };
  };

  const handleTrainingEnd = () => {
    const stats = calculateWorkoutStats();
    if (stats.totalSets > 0) {
      setShowSummaryModal(true);
    }
    setIsActive(false);
  };

  const handleTrainingStart = () => {
    setIsActive(true);
    setWorkoutStartTime(new Date());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link 
            href={`/dashboard/training-plans/client/${params.id}`}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <ArrowLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </Link>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{workout.name}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{workout.date} • {workout.description}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-4">
            {isResting && (
              <div className="flex items-center space-x-2 text-sm bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-lg">
                <ClockIcon className="h-5 w-5" />
                <span>Pause: {formatTime(restTimer)}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <ClockIcon className="h-5 w-5" />
              <span>{isActive ? formatTime(sessionTimer) : `~${workout.estimatedDuration} Min`}</span>
            </div>
          </div>
          {!isActive ? (
            <button 
              onClick={handleTrainingStart}
              className="btn-primary"
            >
              <PlayIcon className="mr-2 h-5 w-5" />
              Training starten
            </button>
          ) : (
            <button 
              onClick={handleTrainingEnd}
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
              <div key={group} id={`group-${group}`} className="card dark:bg-gray-800 dark:border-gray-700">
                <div className="card-body">
                  {isSuperset && (
                    <>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Supersatz {group.replace(/[0-9]/g, '')}
                          </h3>
                          {supersetRestTimers[group] > 0 && (
                            <div className="flex items-center gap-2 text-sm bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-lg">
                              <ClockIcon className="h-4 w-4" />
                              <span>Pause: {formatTime(supersetRestTimers[group])}</span>
                            </div>
                          )}
                          {activeSupersets[group] && (
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                              <ClockIcon className="h-4 w-4" />
                              <span>{formatTime(supersetTimers[group] || 0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {exercises.length} Übungen • Pause: {exercises[0].restSeconds}s
                          </span>
                          {!activeSupersets[group] ? (
                            <button
                              onClick={() => setActiveSupersets(prev => ({ ...prev, [group]: true }))}
                              className="btn-primary btn-sm"
                            >
                              <PlayIcon className="mr-1 h-4 w-4" />
                              Starten
                            </button>
                          ) : (
                            <button
                              onClick={() => setActiveSupersets(prev => ({ ...prev, [group]: false }))}
                              className="btn-danger btn-sm"
                            >
                              <StopIcon className="mr-1 h-4 w-4" />
                              Stoppen
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notizen für Supersatz {group.replace(/[0-9]/g, '')}
                        </label>
                        <textarea
                          value={supersetNotes[group] || ''}
                          onChange={(e) => setSupersetNotes(prev => ({ ...prev, [group]: e.target.value }))}
                          placeholder="Notizen zum Supersatz hinzufügen..."
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                          rows={2}
                        />
                      </div>
                    </>
                  )}
                  
                  <div className={`space-y-${isSuperset ? '6' : '0'}`}>
                    {exercises.map((exercise) => {
                      const exerciseKey = exercise.id;
                      const setsCompleted = completedSets[exerciseKey] || [];
                      
                      return (
                        <div key={exercise.id} className={isSuperset ? 'border-l-4 border-primary-200 dark:border-primary-700 pl-4' : ''}>
                          <div className="mb-4">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100">
                                {exercise.supersetGroup && `${exercise.supersetGroup}: `}
                                {exercise.exercise?.name}
                              </h4>
                              {!isSuperset && (
                                <div className="flex items-center gap-3">
                                  {supersetRestTimers[group] > 0 && (
                                    <div className="flex items-center gap-2 text-sm bg-amber-100 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200 px-3 py-1 rounded-lg">
                                      <ClockIcon className="h-4 w-4" />
                                      <span>Pause: {formatTime(supersetRestTimers[group])}</span>
                                    </div>
                                  )}
                                  {activeSupersets[group] && (
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                      <ClockIcon className="h-4 w-4" />
                                      <span>{formatTime(supersetTimers[group] || 0)}</span>
                                    </div>
                                  )}
                                  {!activeSupersets[group] ? (
                                    <button
                                      onClick={() => setActiveSupersets(prev => ({ ...prev, [group]: true }))}
                                      className="btn-primary btn-sm"
                                    >
                                      <PlayIcon className="mr-1 h-4 w-4" />
                                      Starten
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => setActiveSupersets(prev => ({ ...prev, [group]: false }))}
                                      className="btn-danger btn-sm"
                                    >
                                      <StopIcon className="mr-1 h-4 w-4" />
                                      Stoppen
                                    </button>
                                  )}
                                </div>
                              )}
                            </div>
                            
                            <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
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
                                  <span key={v} className="inline-block px-2 py-0.5 text-xs bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 rounded mr-1">
                                    {v}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {exercise.notes && (
                              <div className="mt-2 p-2 bg-amber-50 dark:bg-amber-900/20 rounded text-sm text-amber-800 dark:text-amber-200">
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
                            
                            {/* Spread-Anzeige */}
                            {exercise.sets.length > 1 && (() => {
                              const firstSetWeight = workoutData.exercises.find(e => e.id === exercise.id)?.sets[0]?.targetWeight || exercise.sets[0].targetWeight;
                              const lastSetWeight = workoutData.exercises.find(e => e.id === exercise.id)?.sets[exercise.sets.length - 1]?.targetWeight || exercise.sets[exercise.sets.length - 1].targetWeight;
                              const spread = lastSetWeight - firstSetWeight;
                              
                              if (spread !== 0) {
                                return (
                                  <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                    <div className="flex items-center justify-between text-sm">
                                      <span className="text-blue-700 dark:text-blue-300 font-medium">
                                        Gewichtsspread:
                                      </span>
                                      <span className={`font-semibold ${spread > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                                        {firstSetWeight} kg → {lastSetWeight} kg ({spread > 0 ? '+' : ''}{spread} kg)
                                      </span>
                                    </div>
                                  </div>
                                );
                              }
                              return null;
                            })()}
                          </div>
                          
                          <div className="space-y-2">
                            {exercise.sets.map((set, setIndex) => (
                              <div key={setIndex} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <div className="flex items-center space-x-4">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    Satz {set.setNumber}
                                  </span>
                                  <span className="text-sm text-gray-600 dark:text-gray-400">
                                    {set.targetReps} Wdh
                                  </span>
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center bg-white dark:bg-gray-600 rounded-lg border border-gray-300 dark:border-gray-500">
                                      <button
                                        onClick={() => adjustWeight(exercise.id, setIndex, -0.5)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-l-lg transition-colors text-gray-600 dark:text-gray-300"
                                        aria-label="Gewicht verringern"
                                      >
                                        <MinusIcon className="h-4 w-4" />
                                      </button>
                                      <span className="px-4 text-sm font-medium text-gray-900 dark:text-gray-100 min-w-[80px] text-center">
                                        {workoutData.exercises.find(e => e.id === exercise.id)?.sets[setIndex]?.targetWeight || set.targetWeight} kg
                                        {set.equipmentSetting && ` (${set.equipmentSetting})`}
                                      </span>
                                      <button
                                        onClick={() => adjustWeight(exercise.id, setIndex, 0.5)}
                                        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-r-lg transition-colors text-gray-600 dark:text-gray-300"
                                        aria-label="Gewicht erhöhen"
                                      >
                                        <PlusIcon className="h-4 w-4" />
                                      </button>
                                    </div>
                                    {(set as any).previousWeight !== undefined && (
                                      <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-lg">
                                        <span className="text-xs text-gray-500 dark:text-gray-400">Vorher:</span>
                                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                          {(set as any).previousWeight} kg
                                        </span>
                                        {(() => {
                                          const currentWeight = workoutData.exercises.find(e => e.id === exercise.id)?.sets[setIndex]?.targetWeight || set.targetWeight;
                                          const diff = currentWeight - (set as any).previousWeight;
                                          if (diff > 0) {
                                            return (
                                              <span className="text-xs font-semibold text-green-600 dark:text-green-400">
                                                ↑ +{diff}
                                              </span>
                                            );
                                          } else if (diff < 0) {
                                            return (
                                              <span className="text-xs font-semibold text-red-600 dark:text-red-400">
                                                ↓ {diff}
                                              </span>
                                            );
                                          }
                                          return (
                                            <span className="text-xs text-gray-500 dark:text-gray-400">
                                              =
                                            </span>
                                          );
                                        })()}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <button
                                  onClick={() => handleSetComplete(exercise.id, setIndex, group)}
                                  className={`
                                    px-3 py-1 rounded-lg transition-all duration-200
                                    ${setsCompleted[setIndex]
                                      ? 'bg-success hover:bg-green-600 dark:hover:bg-green-700 text-white flex items-center gap-1'
                                      : 'bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100'
                                    }
                                  `}
                                  title={setsCompleted[setIndex] ? 'Klicken zum Rückgängig machen' : 'Satz als fertig markieren'}
                                >
                                  {setsCompleted[setIndex] ? (
                                    <>
                                      <CheckIcon className="h-5 w-5" />
                                      <span className="text-xs">Fertig</span>
                                    </>
                                  ) : (
                                    'Fertig'
                                  )}
                                </button>
                              </div>
                            ))}
                          </div>
                          
                          {/* Geräte-Einstellungen */}
                          {exercise.exercise?.equipment && exercise.exercise.equipment !== 'Körpergewicht' && (
                            <div className="mt-4">
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Geräte-Einstellungen für {exercise.exercise.equipment}
                              </label>
                              <textarea
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                                placeholder="z.B. Sitzposition: 5, Griffhöhe: 3, Polsterposition: Oberschenkel..."
                                rows={2}
                                defaultValue={(exercise as any).equipmentSettings || ''}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {!isSuperset && (
                    <>
                      <div className="mt-4">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Notizen
                        </label>
                        <textarea
                          value={supersetNotes[group] || ''}
                          onChange={(e) => setSupersetNotes(prev => ({ ...prev, [group]: e.target.value }))}
                          placeholder="Notizen zur Übung hinzufügen..."
                          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-700/50 border border-gray-300 dark:border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                          rows={2}
                        />
                      </div>
                      
                      {/* Weiter Button nur anzeigen wenn es nicht die letzte Übungsgruppe ist */}
                      {index < supersetGroups.length - 1 && (
                        <div className="mt-4 flex justify-end">
                          <button
                            onClick={() => {
                              // Scroll zur nächsten Übungsgruppe
                              const nextGroupElement = document.getElementById(`group-${supersetGroups[index + 1][0]}`);
                              if (nextGroupElement) {
                                nextGroupElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                              }
                            }}
                            className="btn-primary"
                          >
                            Weiter
                            <ArrowRightIcon className="ml-2 h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="space-y-4">
          <div className="card sticky top-4 dark:bg-gray-800 dark:border-gray-700">
            <div className="card-body">
              <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-4">Trainingsfortschritt</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600 dark:text-gray-400">Gesamtfortschritt</span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {Object.values(completedSets).flat().filter(Boolean).length} / 
                      {workout.exercises.reduce((sum, ex) => sum + ex.sets.length, 0)} Sätze
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
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
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">Übungsübersicht</h4>
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
                              <span className="text-sm text-gray-900 dark:text-gray-100">
                                {exercise.supersetGroup && `${exercise.supersetGroup}: `}
                                {exercise.exercise?.name}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400">
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
                  <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                    {isResting && (
                      <button 
                        onClick={() => setIsResting(false)}
                        className="w-full btn-secondary"
                      >
                        Pause überspringen
                      </button>
                    )}
                    <button 
                      onClick={() => setShowSummaryModal(true)}
                      className="w-full btn-primary"
                    >
                      <CheckIcon className="mr-2 h-5 w-5" />
                      Zusammenfassung
                    </button>
                    <button 
                      onClick={handleTrainingEnd}
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

      <WorkoutSummaryModal
        isOpen={showSummaryModal}
        onClose={() => setShowSummaryModal(false)}
        stats={calculateWorkoutStats()}
        clientName="Max Mustermann"
      />
    </div>
  );
}