// Gemeinsame Type Definitionen für die Trainer Dashboard App

// Widget Types
export interface WidgetConfig {
  id: string;
  type: string;
  title?: string;
  settings?: Record<string, unknown>;
}

// Layout Types
export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  static?: boolean;
}

// Form Data Types
export interface MeasurementData {
  weight?: number;
  bodyFat?: number;
  muscleMass?: number;
  waist?: number;
  chest?: number;
  arms?: number;
  legs?: number;
  [key: string]: number | undefined;
}

export interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  birthDate: string;
  gender: 'male' | 'female' | 'other';
  address: string;
  emergencyContact: string;
  goals: string[];
  medicalConditions: string[];
  notes?: string;
}

export interface WorkoutData {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  description?: string;
}

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string | number;
  rest: string;
  weight?: number;
  notes?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: unknown;
}

// Event Handler Types
export type FormSubmitHandler<T> = (data: T) => void | Promise<void>;
export type FieldChangeHandler<T> = (field: keyof T, value: T[keyof T]) => void;

// Status Types
export type ClientStatus = 'active' | 'paused' | 'inactive';
export type PackageType = 'basic' | 'premium' | 'vip';
export type AppointmentType = 'training' | 'consultation' | 'measurement';

// Supplement Types
export interface Supplement {
  id: string;
  name: string;
  startDate: string;
  dosage?: string;
  notes?: string;
}

// Progress Types
export interface ProgressData {
  weightChange: number;
  bodyFatChange: number;
  muscleMassChange: number;
  date: string;
}

// Calendar Types
export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  clientId?: string;
  type: AppointmentType;
  notes?: string;
}

// Dashboard Grid Types
export interface DashboardWidget {
  id: string;
  component: string;
  config?: WidgetConfig;
  layout: LayoutItem;
}

// Measurement Types
export interface MeasurementEntry {
  date: string;
  weight: number;
  bodyFat?: number;
  muscleMass?: number;
  measurements?: {
    waist?: number;
    chest?: number;
    arms?: number;
    legs?: number;
  };
}

// Training Plan Types
export interface TrainingPlan {
  id: string;
  name: string;
  clientId: string;
  startDate: string;
  endDate: string;
  phases: TrainingPhase[];
  workouts: Workout[];
}

export interface TrainingPhase {
  id: string;
  name: string;
  weeks: number;
  focus: string;
  intensityLevel: 'low' | 'medium' | 'high';
}

export interface Workout {
  id: string;
  name: string;
  dayOfWeek: number;
  exercises: WorkoutExercise[];
  estimatedDuration: number;
}

export interface WorkoutExercise {
  id: string;
  exerciseId: string;
  sets: Set[];
  supersetGroup?: string;
  orderInWorkout: number;
  tempo?: string;
  restSeconds: number;
  notes?: string;
}

export interface Set {
  setNumber: number;
  targetReps: number | string;
  targetWeight: number;
  completed?: boolean;
  actualReps?: number;
  actualWeight?: number;
}