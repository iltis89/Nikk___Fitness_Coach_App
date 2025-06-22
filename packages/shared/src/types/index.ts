// Core types used across the platform
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'TRAINER' | 'CLIENT' | 'ADMIN';
  profileImageUrl?: string;
}

export interface Client extends User {
  trainerId: string;
  height?: number;
  goals: string[];
  medicalConditions: string[];
}

export interface Measurement {
  id: string;
  clientId: string;
  trainerId: string;
  date: Date;
  
  // Grundmessungen
  weight?: number;
  height?: number;
  
  // Berechnete Werte
  bodyFatPercent?: number;
  muscleMass?: number;
  bmi?: number;
  
  // YPSI Hautfaltenmessungen (14 Punkte)
  chest?: number;
  triceps?: number;
  subscapular?: number;
  midaxillary?: number;
  suprailiac?: number;
  abdominal?: number;
  thigh?: number;
  lowerBack?: number;
  calf?: number;
  chin?: number;
  cheek?: number;
  hamstring?: number;
  quad?: number;
  knee?: number;
  
  // Umfangsmessungen
  neckCircumference?: number;
  shoulderCircumference?: number;
  chestCircumference?: number;
  waistCircumference?: number;
  hipCircumference?: number;
  armCircumference?: number;
  thighCircumference?: number;
  calfCircumference?: number;
  
  // Zusätzliche Daten
  totalSkinfold?: number;
  notes?: string;
  photos?: string[];
}

// Legacy types - will be deprecated
export interface TrainingPlan {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  workouts: LegacyWorkout[];
}

export interface LegacyWorkout {
  id: string;
  name: string;
  dayOfWeek?: number;
  exercises: LegacyWorkoutExercise[];
}

export interface LegacyWorkoutExercise {
  id: string;
  exercise: LegacyExercise;
  sets: number;
  reps: string;
  rest?: number;
  weight?: number;
  notes?: string;
}

export interface LegacyExercise {
  id: string;
  name: string;
  category: string;
  muscleGroups: string[];
  equipment?: string;
  difficulty: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  description?: string;
  instructions: string[];
  videoUrl?: string;
  imageUrls: string[];
}

// Export new advanced training types
export * from './training';