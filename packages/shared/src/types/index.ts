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
  date: Date;
  weight?: number;
  bodyFatPercent?: number;
  // Hautfaltenmessungen
  biceps?: number;
  triceps?: number;
  subscapular?: number;
  suprailiac?: number;
  abdominal?: number;
  thigh?: number;
  chest?: number;
}

export interface TrainingPlan {
  id: string;
  clientId: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate?: Date;
  isActive: boolean;
  workouts: Workout[];
}

export interface Workout {
  id: string;
  name: string;
  dayOfWeek?: number;
  exercises: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: string;
  exercise: Exercise;
  sets: number;
  reps: string;
  rest?: number;
  weight?: number;
  notes?: string;
}

export interface Exercise {
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