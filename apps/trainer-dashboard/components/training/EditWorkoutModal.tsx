'use client';

import React, { useState, useEffect } from 'react';
import { Modal } from '@/components/ui/Modal';
import { 
  PlusIcon, 
  TrashIcon,
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  FireIcon
} from '@heroicons/react/24/outline';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  rest: string;
  notes?: string;
}

interface EditWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  workout: {
    id: string;
    name: string;
    exercises: Exercise[];
    duration: string;
    focus: string;
  };
  onSave: (updatedWorkout: any) => void;
}

export function EditWorkoutModal({ isOpen, onClose, workout, onSave }: EditWorkoutModalProps) {
  const [workoutName, setWorkoutName] = useState(workout.name);
  const [exercises, setExercises] = useState<Exercise[]>(workout.exercises);
  const [duration, setDuration] = useState(workout.duration);
  const [focus, setFocus] = useState(workout.focus);

  useEffect(() => {
    setWorkoutName(workout.name);
    setExercises(workout.exercises);
    setDuration(workout.duration);
    setFocus(workout.focus);
  }, [workout]);

  const handleAddExercise = () => {
    const newExercise: Exercise = {
      id: `ex-${Date.now()}`,
      name: '',
      sets: 3,
      reps: '8-12',
      rest: '90s'
    };
    setExercises([...exercises, newExercise]);
  };

  const handleRemoveExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const handleExerciseChange = (id: string, field: keyof Exercise, value: any) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const handleMoveExercise = (index: number, direction: 'up' | 'down') => {
    const newExercises = [...exercises];
    if (direction === 'up' && index > 0) {
      [newExercises[index], newExercises[index - 1]] = [newExercises[index - 1], newExercises[index]];
    } else if (direction === 'down' && index < exercises.length - 1) {
      [newExercises[index], newExercises[index + 1]] = [newExercises[index + 1], newExercises[index]];
    }
    setExercises(newExercises);
  };

  const handleSave = () => {
    const updatedWorkout = {
      ...workout,
      name: workoutName,
      exercises: exercises.filter(ex => ex.name.trim() !== ''),
      duration,
      focus
    };
    onSave(updatedWorkout);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Training bearbeiten" size="lg">
      <div className="space-y-6">
        {/* Workout Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Workout Name
          </label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Duration and Focus */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <ClockIcon className="inline h-4 w-4 mr-1" />
              Dauer
            </label>
            <input
              type="text"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="z.B. 60 Min"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <FireIcon className="inline h-4 w-4 mr-1" />
              Fokus
            </label>
            <input
              type="text"
              value={focus}
              onChange={(e) => setFocus(e.target.value)}
              placeholder="z.B. Brust, Schultern, Trizeps"
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Exercises */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Übungen
            </label>
            <button
              onClick={handleAddExercise}
              className="flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300"
            >
              <PlusIcon className="h-4 w-4" />
              Übung hinzufügen
            </button>
          </div>

          <div className="space-y-3">
            {exercises.map((exercise, index) => (
              <div key={exercise.id} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                <div className="grid grid-cols-12 gap-2 items-center">
                  {/* Exercise Name */}
                  <div className="col-span-4">
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(e) => handleExerciseChange(exercise.id, 'name', e.target.value)}
                      placeholder="Übungsname"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Sets */}
                  <div className="col-span-2">
                    <input
                      type="number"
                      value={exercise.sets}
                      onChange={(e) => handleExerciseChange(exercise.id, 'sets', parseInt(e.target.value) || 0)}
                      placeholder="Sätze"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Reps */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) => handleExerciseChange(exercise.id, 'reps', e.target.value)}
                      placeholder="Wdh"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Rest */}
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={exercise.rest}
                      onChange={(e) => handleExerciseChange(exercise.id, 'rest', e.target.value)}
                      placeholder="Pause"
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm text-center focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>

                  {/* Actions */}
                  <div className="col-span-2 flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleMoveExercise(index, 'up')}
                      disabled={index === 0}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowUpIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleMoveExercise(index, 'down')}
                      disabled={index === exercises.length - 1}
                      className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ArrowDownIcon className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleRemoveExercise(exercise.id)}
                      className="p-1 text-red-400 hover:text-red-600 dark:hover:text-red-300"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Notes */}
                <div className="mt-2">
                  <input
                    type="text"
                    value={exercise.notes || ''}
                    onChange={(e) => handleExerciseChange(exercise.id, 'notes', e.target.value)}
                    placeholder="Notizen (optional)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Abbrechen
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
          >
            Änderungen speichern
          </button>
        </div>
      </div>
    </Modal>
  );
}