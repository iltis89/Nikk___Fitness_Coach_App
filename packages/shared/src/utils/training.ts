import { ExerciseSet, WorkoutExercise, Workout, TempoExplanation } from '../types/training';

// Tempo utilities
export function parseTempoString(tempo: string): TempoExplanation | null {
  const parts = tempo.split('/');
  if (parts.length !== 4) return null;
  
  return {
    eccentric: parts[0] === 'H' ? -1 : parseInt(parts[0]),
    pause1: parts[1] === 'H' ? -1 : parseInt(parts[1]),
    concentric: parts[2] === 'H' ? -1 : parseInt(parts[2]),
    pause2: parts[3] === 'H' ? -1 : parseInt(parts[3]),
  };
}

export function formatTempo(tempo: TempoExplanation): string {
  const format = (value: number) => value === -1 ? 'H' : value.toString();
  return `${format(tempo.eccentric)}/${format(tempo.pause1)}/${format(tempo.concentric)}/${format(tempo.pause2)}`;
}

export function calculateTempoTime(tempo: TempoExplanation, reps: number): number {
  const totalPerRep = 
    (tempo.eccentric === -1 ? 2 : tempo.eccentric) +
    (tempo.pause1 === -1 ? 2 : tempo.pause1) +
    (tempo.concentric === -1 ? 2 : tempo.concentric) +
    (tempo.pause2 === -1 ? 2 : tempo.pause2);
  
  return totalPerRep * reps;
}

// Volume calculations
export function calculateSetVolume(set: ExerciseSet): number {
  const weight = set.actualWeight ?? set.targetWeight;
  const reps = set.actualReps ?? (
    typeof set.targetReps === 'number' ? set.targetReps : 
    parseInt(set.targetReps.toString().split('-')[0]) // Take lower bound of range
  );
  return weight * reps;
}

export function calculateExerciseVolume(exercise: WorkoutExercise): number {
  return exercise.sets
    .filter(set => set.completed)
    .reduce((total, set) => total + calculateSetVolume(set), 0);
}

export function calculateWorkoutVolume(workout: Workout): number {
  return workout.exercises.reduce((total, exercise) => 
    total + calculateExerciseVolume(exercise), 0
  );
}

// Superset grouping
export function groupExercisesBySupersets(exercises: WorkoutExercise[]): Map<string, WorkoutExercise[]> {
  const groups = new Map<string, WorkoutExercise[]>();
  
  exercises.forEach(exercise => {
    const group = exercise.supersetGroup || `single_${exercise.id}`;
    if (!groups.has(group)) {
      groups.set(group, []);
    }
    groups.get(group)!.push(exercise);
  });
  
  // Sort exercises within each group
  groups.forEach(groupExercises => {
    groupExercises.sort((a, b) => (a.orderInSuperset || 0) - (b.orderInSuperset || 0));
  });
  
  return groups;
}

// One Rep Max calculations
export function calculateOneRM(weight: number, reps: number, formula: 'epley' | 'brzycki' | 'lander' = 'epley'): number {
  if (reps === 1) return weight;
  
  switch (formula) {
    case 'epley':
      return weight * (1 + reps / 30);
    case 'brzycki':
      return weight / (1.0278 - 0.0278 * reps);
    case 'lander':
      return (100 * weight) / (101.3 - 2.67123 * reps);
    default:
      return weight * (1 + reps / 30);
  }
}

export function calculatePercentageOf1RM(oneRM: number, percentage: number): number {
  return Math.round(oneRM * (percentage / 100));
}

// RPE utilities
export function rpeToPercentage(rpe: number): number {
  // Rough conversion table
  const rpeTable: Record<number, number> = {
    10: 100,
    9.5: 97.5,
    9: 95,
    8.5: 92.5,
    8: 90,
    7.5: 87.5,
    7: 85,
    6.5: 82.5,
    6: 80,
  };
  
  return rpeTable[rpe] || 70;
}

export function calculateRPEWeight(oneRM: number, rpe: number): number {
  return calculatePercentageOf1RM(oneRM, rpeToPercentage(rpe));
}

// Progress tracking
export function calculateProgressionPercentage(current: number, previous: number): number {
  if (previous === 0) return 0;
  return ((current - previous) / previous) * 100;
}

// Rest timer
export function formatRestTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

// Set status helpers
export function isSetComplete(set: ExerciseSet): boolean {
  return set.completed && set.actualReps !== undefined && set.actualWeight !== undefined;
}

export function getCompletedSetsCount(exercise: WorkoutExercise): number {
  return exercise.sets.filter(isSetComplete).length;
}

// Workout status
export function calculateWorkoutProgress(workout: Workout): number {
  const totalSets = workout.exercises.reduce((total, ex) => total + ex.sets.length, 0);
  const completedSets = workout.exercises.reduce((total, ex) => 
    total + getCompletedSetsCount(ex), 0
  );
  
  return totalSets > 0 ? (completedSets / totalSets) * 100 : 0;
}

// Parse rep ranges
export function parseRepRange(reps: string): { min: number; max: number; perSide?: boolean } | null {
  // Check for "per side" notation
  if (reps.toLowerCase().includes('p s') || reps.includes('p/s')) {
    const num = parseInt(reps.replace(/p\s?S|p\/s/gi, '').trim());
    return { min: num, max: num, perSide: true };
  }
  
  // Check for range notation
  if (reps.includes('-')) {
    const [min, max] = reps.split('-').map(n => parseInt(n.trim()));
    return { min, max };
  }
  
  // Single number
  const num = parseInt(reps);
  if (!isNaN(num)) {
    return { min: num, max: num };
  }
  
  return null;
}

// Format weight with equipment settings
export function formatWeightDisplay(weight: number, equipmentSetting?: string): string {
  let display = `${weight}kg`;
  if (equipmentSetting) {
    display += ` (${equipmentSetting})`;
  }
  return display;
}