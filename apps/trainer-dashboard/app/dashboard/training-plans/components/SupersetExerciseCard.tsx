'use client';

import { useState } from 'react';
import { WorkoutExercise, ExerciseSet } from '@nv/shared';
import { formatWeightDisplay, formatRestTime } from '@nv/shared';
import { 
  ClockIcon, 
  PlusIcon, 
  MinusIcon,
  CheckIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

interface SupersetExerciseCardProps {
  exercises: WorkoutExercise[];
  groupName: string;
  onSetComplete: (exerciseId: string, setIndex: number, data: Partial<ExerciseSet>) => void;
  onWeightChange: (exerciseId: string, setIndex: number, weight: number) => void;
}

export default function SupersetExerciseCard({
  exercises,
  groupName,
  onSetComplete,
  onWeightChange
}: SupersetExerciseCardProps) {
  const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
  
  const isSuperSet = exercises.length > 1;
  const groupLabel = isSuperSet ? groupName : '';
  
  return (
    <div className="card">
      <div className="card-body">
        {isSuperSet && (
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Supersatz {groupLabel}
            </h3>
            <span className="text-sm text-gray-500">
              {exercises.length} Übungen
            </span>
          </div>
        )}
        
        <div className={`space-y-${isSuperSet ? '4' : '0'}`}>
          {exercises.map((exercise, index) => (
            <div key={exercise.id} className={isSuperSet ? 'border rounded-lg p-4' : ''}>
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900">
                    {isSuperSet && `${groupLabel}${index + 1}: `}
                    {exercise.exercise?.name || 'Übung laden...'}
                  </h4>
                  
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    {exercise.tempo && (
                      <span className="flex items-center">
                        <ClockIcon className="h-4 w-4 mr-1" />
                        Tempo: {exercise.tempo}
                      </span>
                    )}
                    <span>Pause: {formatRestTime(exercise.restSeconds)}</span>
                  </div>
                  
                  {exercise.notes && (
                    <div className="mt-2 p-2 bg-amber-50 rounded text-sm text-amber-800">
                      <InformationCircleIcon className="h-4 w-4 inline mr-1" />
                      {exercise.notes}
                    </div>
                  )}
                </div>
                
                <button
                  onClick={() => setExpandedExercise(
                    expandedExercise === exercise.id ? null : exercise.id
                  )}
                  className="text-sm text-primary-600 hover:text-primary-700"
                >
                  {expandedExercise === exercise.id ? 'Weniger' : 'Details'}
                </button>
              </div>
              
              <div className="space-y-2">
                {exercise.sets.map((set, setIndex) => (
                  <div 
                    key={setIndex}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="text-sm font-medium text-gray-700">
                        Satz {set.setNumber}
                      </span>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {set.targetReps} Wdh
                        </span>
                        
                        <div className="flex items-center">
                          <button
                            onClick={() => onWeightChange(
                              exercise.id, 
                              setIndex, 
                              Math.max(0, set.targetWeight - 2.5)
                            )}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <MinusIcon className="h-3 w-3" />
                          </button>
                          
                          <span className="mx-2 text-sm font-medium">
                            {formatWeightDisplay(set.targetWeight, set.equipmentSetting)}
                          </span>
                          
                          <button
                            onClick={() => onWeightChange(
                              exercise.id, 
                              setIndex, 
                              set.targetWeight + 2.5
                            )}
                            className="p-1 hover:bg-gray-200 rounded"
                          >
                            <PlusIcon className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => onSetComplete(exercise.id, setIndex, {
                        completed: !set.completed,
                        actualWeight: set.targetWeight,
                        actualReps: typeof set.targetReps === 'number' 
                          ? set.targetReps 
                          : parseInt(set.targetReps.toString()),
                        completedAt: new Date()
                      })}
                      className={`
                        px-3 py-1 rounded-lg transition-colors
                        ${set.completed 
                          ? 'bg-success text-white' 
                          : 'bg-white border border-gray-300 hover:bg-gray-100'
                        }
                      `}
                    >
                      {set.completed ? (
                        <CheckIcon className="h-5 w-5" />
                      ) : (
                        'Fertig'
                      )}
                    </button>
                  </div>
                ))}
              </div>
              
              {expandedExercise === exercise.id && exercise.exercise && (
                <div className="mt-4 pt-4 border-t space-y-2">
                  <p className="text-sm text-gray-600">
                    <strong>Equipment:</strong> {exercise.exercise.equipment}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Muskelgruppen:</strong> {exercise.exercise.muscleGroups.join(', ')}
                  </p>
                  {exercise.exercise.instructions && (
                    <p className="text-sm text-gray-600">
                      <strong>Anleitung:</strong> {exercise.exercise.instructions}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}