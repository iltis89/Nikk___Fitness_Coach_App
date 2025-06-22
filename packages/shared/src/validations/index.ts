import { z } from 'zod';

// User validation schemas
export const LoginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
});

export const RegisterSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
  firstName: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein'),
  lastName: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein'),
  role: z.enum(['CLIENT', 'TRAINER']),
});

// Measurement validation
export const MeasurementSchema = z.object({
  weight: z.number().min(20).max(300).optional(),
  biceps: z.number().min(0).max(100).optional(),
  triceps: z.number().min(0).max(100).optional(),
  subscapular: z.number().min(0).max(100).optional(),
  suprailiac: z.number().min(0).max(100).optional(),
  abdominal: z.number().min(0).max(100).optional(),
  thigh: z.number().min(0).max(100).optional(),
  chest: z.number().min(0).max(100).optional(),
  notes: z.string().optional(),
});

// Training validation
export const CreateTrainingPlanSchema = z.object({
  name: z.string().min(3, 'Name muss mindestens 3 Zeichen lang sein'),
  description: z.string().optional(),
  startDate: z.date(),
  endDate: z.date().optional(),
});

export const WorkoutExerciseSchema = z.object({
  exerciseId: z.string(),
  sets: z.number().min(1).max(10),
  reps: z.string(),
  rest: z.number().min(0).max(600).optional(),
  weight: z.number().min(0).max(500).optional(),
  notes: z.string().optional(),
});

// Appointment validation
export const CreateAppointmentSchema = z.object({
  clientId: z.string(),
  startTime: z.date(),
  endTime: z.date(),
  title: z.string().min(3),
  location: z.string().optional(),
  notes: z.string().optional(),
});

// AI validation
export const AIPromptSchema = z.object({
  prompt: z.string().min(10).max(1000),
  context: z.record(z.any()).optional(),
});