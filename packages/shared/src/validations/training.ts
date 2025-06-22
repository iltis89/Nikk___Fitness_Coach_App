import { z } from 'zod';

// Exercise Set Schema
export const exerciseSetSchema = z.object({
  setNumber: z.number().min(1),
  targetReps: z.union([z.number().min(1), z.string()]), // "6-8" oder "10 p S"
  targetWeight: z.number().min(0),
  targetRPE: z.number().min(1).max(10).optional(),
  actualReps: z.number().min(0).optional(),
  actualWeight: z.number().min(0).optional(),
  actualRPE: z.number().min(1).max(10).optional(),
  equipmentSetting: z.string().optional(),
  completed: z.boolean().default(false),
  completedAt: z.date().optional(),
  notes: z.string().optional(),
});

// Workout Exercise Schema
export const workoutExerciseSchema = z.object({
  id: z.string(),
  exerciseId: z.string(),
  supersetGroup: z.string().regex(/^[A-E][1-4]?$/).optional(), // A1, A2, B1, etc.
  orderInSuperset: z.number().optional(),
  orderInWorkout: z.number(),
  tempo: z.string().regex(/^(\d+|H)\/(\d+|H)\/(\d+|H)\/(\d+|H)$/).optional(), // 4/0/1/0 oder H/0/0/H
  restSeconds: z.number().min(0),
  notes: z.string().optional(),
  sets: z.array(exerciseSetSchema).min(1),
});

// Workout Template Schema
export const workoutTemplateSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  description: z.string().optional(),
  exercises: z.array(workoutExerciseSchema),
  estimatedDuration: z.number().min(1),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  tags: z.array(z.string()),
});

// Workout Schema
export const workoutSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  templateId: z.string().optional(),
  name: z.string().min(1),
  date: z.date(),
  status: z.enum(['planned', 'in_progress', 'completed', 'skipped']),
  startedAt: z.date().optional(),
  completedAt: z.date().optional(),
  exercises: z.array(workoutExerciseSchema),
  totalVolume: z.number().optional(),
  totalSets: z.number().optional(),
  totalReps: z.number().optional(),
  duration: z.number().optional(),
  overallRPE: z.number().min(1).max(10).optional(),
  notes: z.string().optional(),
  trainerNotes: z.string().optional(),
});

// Training Phase Schema
export const trainingPhaseSchema = z.object({
  id: z.string(),
  weekNumber: z.number().min(1),
  name: z.string().min(1),
  focus: z.string(),
  workouts: z.array(z.any()), // Will be PlannedWorkout
  notes: z.string().optional(),
});

// Training Cycle Schema
export const trainingCycleSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  name: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  duration: z.number().min(1),
  status: z.enum(['planned', 'active', 'completed', 'paused']),
  phases: z.array(trainingPhaseSchema),
  goals: z.array(z.string()),
  notes: z.string().optional(),
});

// Strength Benchmark Schema
export const strengthBenchmarkSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  exerciseId: z.string(),
  testDate: z.date(),
  testType: z.enum(['1RM', '3RM', '5RM', 'AMRAP', 'TIME']),
  weight: z.number().optional(),
  reps: z.number().optional(),
  time: z.number().optional(),
  distance: z.number().optional(),
  estimatedOneRM: z.number().optional(),
  wilksScore: z.number().optional(),
  bodyweight: z.number().optional(),
  conditions: z.string().optional(),
  notes: z.string().optional(),
});

// Form Schemas for UI
export const createWorkoutExerciseSchema = workoutExerciseSchema.omit({ id: true });
export const updateWorkoutExerciseSchema = workoutExerciseSchema.partial();

export const createWorkoutSchema = workoutSchema.omit({ 
  id: true,
  totalVolume: true,
  totalSets: true,
  totalReps: true,
});

export const completeSetSchema = z.object({
  workoutId: z.string(),
  exerciseId: z.string(),
  setNumber: z.number(),
  actualReps: z.number().min(0),
  actualWeight: z.number().min(0),
  actualRPE: z.number().min(1).max(10).optional(),
  equipmentSetting: z.string().optional(),
  notes: z.string().optional(),
});

// Helper validation functions
export const isValidTempo = (tempo: string): boolean => {
  const regex = /^(\d+|H)\/(\d+|H)\/(\d+|H)\/(\d+|H)$/;
  return regex.test(tempo);
};

export const isValidSupersetGroup = (group: string): boolean => {
  const regex = /^[A-E][1-4]?$/;
  return regex.test(group);
};

// Moved to utils/training.ts to avoid duplication