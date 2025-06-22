// Helper functions for training features

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise?: {
    id: string;
    name: string;
    category: string;
    equipment: string;
    muscleGroups: string[];
    variations?: string[];
    unilateral?: boolean;
  };
  supersetGroup?: string;
  orderInSuperset?: number;
  orderInWorkout: number;
  tempo?: string;
  restSeconds: number;
  notes?: string;
  sets: Array<{
    setNumber: number;
    targetReps: number | string;
    targetWeight: number;
    targetRPE?: number;
    actualReps?: number;
    actualWeight?: number;
    actualRPE?: number;
    equipmentSetting?: string;
    completed: boolean;
    completedAt?: Date;
  }>;
}

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

export function parseTempoString(tempo: string): { eccentric: number; pause1: number; concentric: number; pause2: number } | null {
  const parts = tempo.split('/');
  if (parts.length !== 4) return null;
  
  return {
    eccentric: parts[0] === 'H' ? -1 : parseInt(parts[0]),
    pause1: parts[1] === 'H' ? -1 : parseInt(parts[1]),
    concentric: parts[2] === 'H' ? -1 : parseInt(parts[2]),
    pause2: parts[3] === 'H' ? -1 : parseInt(parts[3]),
  };
}