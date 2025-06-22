// Shared constants
export const APP_NAME = 'NV Coaching';

export const ROLES = {
  TRAINER: 'TRAINER',
  CLIENT: 'CLIENT',
  ADMIN: 'ADMIN',
} as const;

export const ACTIVITY_LEVELS = {
  SEDENTARY: 'SEDENTARY',
  LIGHTLY_ACTIVE: 'LIGHTLY_ACTIVE',
  MODERATELY_ACTIVE: 'MODERATELY_ACTIVE',
  VERY_ACTIVE: 'VERY_ACTIVE',
  EXTREMELY_ACTIVE: 'EXTREMELY_ACTIVE',
} as const;

export const MEASUREMENT_TYPES = {
  BICEPS: 'biceps',
  TRICEPS: 'triceps',
  SUBSCAPULAR: 'subscapular',
  SUPRAILIAC: 'suprailiac',
  ABDOMINAL: 'abdominal',
  THIGH: 'thigh',
  CHEST: 'chest',
  MIDAXILLARY: 'midaxillary',
  SUPRASPINALE: 'supraspinale',
  MEDIAL_CALF: 'medialCalf',
} as const;

export const API_ENDPOINTS = {
  AUTH: '/auth',
  CLIENTS: '/clients',
  MEASUREMENTS: '/measurements',
  TRAINING_PLANS: '/training-plans',
  EXERCISES: '/exercises',
  APPOINTMENTS: '/appointments',
  AI: '/ai',
} as const;