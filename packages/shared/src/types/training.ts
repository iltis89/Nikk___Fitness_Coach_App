export interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  muscleGroups: string[];
  variations?: string[]; // ["Fat Gripz", "Bamboo Bench", "Fersen erhöht"]
  unilateral?: boolean; // Einarmig/Einbeinig
  instructions?: string;
  videoUrl?: string;
  imageUrl?: string;
}

export interface ExerciseSet {
  setNumber: number;
  targetReps: number | string; // "6-8" oder "10 p S" (pro Seite)
  targetWeight: number;
  targetRPE?: number; // Rate of Perceived Exertion (1-10)
  
  // Tracking
  actualReps?: number;
  actualWeight?: number;
  actualRPE?: number;
  equipmentSetting?: string; // "Stufe 4", "Pin 10", "Band Rot"
  completed: boolean;
  completedAt?: Date;
  notes?: string;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  exercise?: Exercise; // Populated when needed
  
  // Supersatz-Gruppierung
  supersetGroup?: string; // "A1", "A2", "B1", "B2", "C"
  orderInSuperset?: number;
  orderInWorkout: number;
  
  // Erweiterte Parameter
  tempo?: string; // "4/0/1/0" oder "H/0/0/H" (H = Hold/Halten)
  restSeconds: number;
  notes?: string;
  
  // Flexible Satz-Struktur
  sets: ExerciseSet[];
}

export interface WorkoutTemplate {
  id: string;
  name: string;
  description?: string;
  exercises: WorkoutExercise[];
  estimatedDuration: number; // Minuten
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[]; // ["Hypertrophie", "Kraft", "Ganzkörper"]
}

export interface Workout {
  id: string;
  clientId: string;
  templateId?: string;
  name: string;
  date: Date;
  
  // Status
  status: 'planned' | 'in_progress' | 'completed' | 'skipped';
  startedAt?: Date;
  completedAt?: Date;
  
  // Daten
  exercises: WorkoutExercise[];
  
  // Metriken
  totalVolume?: number; // kg
  totalSets?: number;
  totalReps?: number;
  duration?: number; // Minuten
  
  // Feedback
  overallRPE?: number;
  notes?: string;
  trainerNotes?: string;
}

// Periodisierung & Zyklen
export interface TrainingPhase {
  id: string;
  weekNumber: number;
  name: string; // "Woche 1", "Deload", "Test Week"
  focus: string; // "Hypertrophie", "Kraft", "Technik"
  workouts: PlannedWorkout[];
  notes?: string;
}

export interface TrainingCycle {
  id: string;
  clientId: string;
  name: string; // "10-8-6-15 Wave", "Posterior Chain Activation"
  startDate: Date;
  endDate: Date;
  duration: number; // Wochen
  status: 'planned' | 'active' | 'completed' | 'paused';
  phases: TrainingPhase[];
  goals: string[];
  notes?: string;
}

export interface PlannedWorkout {
  id: string;
  phaseId: string;
  date: Date;
  dayInWeek: number; // 1-7
  workoutTemplateId: string;
  workoutTemplate?: WorkoutTemplate;
  plannedExercises: WorkoutExercise[];
  completed: boolean;
  actualWorkoutId?: string;
  notes?: string;
}

// Krafttests & Benchmarks
export interface StrengthBenchmark {
  id: string;
  clientId: string;
  exerciseId: string;
  exercise?: Exercise;
  testDate: Date;
  testType: '1RM' | '3RM' | '5RM' | 'AMRAP' | 'TIME';
  
  // Ergebnisse
  weight?: number;
  reps?: number;
  time?: number; // Sekunden
  distance?: number; // Meter
  
  // Berechnungen
  estimatedOneRM?: number;
  wilksScore?: number; // Für Powerlifting
  
  // Kontext
  bodyweight?: number;
  conditions?: string; // "Müde", "Gut erholt", etc.
  notes?: string;
}

// Progression Tracking
export interface ProgressionRule {
  id: string;
  name: string;
  type: 'linear' | 'wave' | 'auto_regulated';
  
  // Linear Progression
  weightIncrement?: number; // kg
  repsIncrement?: number;
  
  // Wave Progression
  wavePattern?: number[]; // [10, 8, 6, 15]
  
  // Auto-Regulation
  rpeTarget?: number;
  rpeRange?: [number, number]; // [7, 9]
  
  deloadFrequency?: number; // Alle X Wochen
  deloadPercentage?: number; // 0.7 = 70% des Gewichts
}

// Tempo-Erklärung Helper
export interface TempoExplanation {
  eccentric: number; // Sekunden für exzentrische Phase (ablassen)
  pause1: number; // Pause am tiefsten Punkt
  concentric: number; // Sekunden für konzentrische Phase (drücken/ziehen)
  pause2: number; // Pause am höchsten Punkt
}

// Moved to utils/training.ts to avoid duplication

// Helper Types
export type SupersetGroup = 'A' | 'B' | 'C' | 'D' | 'E';
export type SupersetOrder = '1' | '2' | '3' | '4';
export type ExerciseCategory = 'compound' | 'isolation' | 'cardio' | 'mobility' | 'core';
export type EquipmentType = 'barbell' | 'dumbbell' | 'cable' | 'machine' | 'bodyweight' | 'band' | 'other';