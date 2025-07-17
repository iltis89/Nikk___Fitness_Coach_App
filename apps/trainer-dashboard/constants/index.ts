// Zentrale Konstanten für die Trainer Dashboard App

// Zeitdauer Optionen (in Minuten)
export const DURATION_OPTIONS = [
  { value: 30, label: '30 Min' },
  { value: 45, label: '45 Min' },
  { value: 60, label: '60 Min' },
  { value: 90, label: '90 Min' },
  { value: 120, label: '120 Min' },
] as const;

// Wellness Check Limits
export const WELLNESS_LIMITS = {
  MIN_VALUE: 1,
  MAX_VALUE: 10,
  DEFAULT_VALUE: 5,
} as const;

// Standard Adressen (für Development)
export const DEFAULT_ADDRESS = {
  street: 'Musterstraße 123',
  zip: '80331',
  city: 'München',
  country: 'Deutschland',
} as const;

// Trainingsplan Konstanten
export const TRAINING_DEFAULTS = {
  REST_BETWEEN_SETS: 90, // Sekunden
  REST_BETWEEN_EXERCISES: 120, // Sekunden
  DEFAULT_SETS: 3,
  DEFAULT_REPS: '8-12',
} as const;

// Gewichtsinkrement für Plus/Minus Buttons
export const WEIGHT_INCREMENT = 2.5; // kg

// Status Optionen
export const CLIENT_STATUS_OPTIONS = [
  { value: 'active', label: 'Aktiv', color: 'success' },
  { value: 'paused', label: 'Pausiert', color: 'warning' },
  { value: 'inactive', label: 'Inaktiv', color: 'error' },
] as const;

// Package Types
export const PACKAGE_OPTIONS = [
  { value: 'basic', label: 'Basic Paket' },
  { value: 'premium', label: 'Premium Paket' },
  { value: 'vip', label: 'VIP Paket' },
] as const;

// Geschlechts-Optionen
export const GENDER_OPTIONS = [
  { value: 'male', label: 'Männlich' },
  { value: 'female', label: 'Weiblich' },
  { value: 'other', label: 'Divers' },
] as const;

// Kalender Einstellungen
export const CALENDAR_CONFIG = {
  START_HOUR: 6,
  END_HOUR: 22,
  SLOT_DURATION: 15, // Minuten
  DEFAULT_DURATION: 60, // Minuten
} as const;

// Farben für verschiedene Event-Typen
export const EVENT_COLORS = {
  training: '#3B82F6', // blue-500
  consultation: '#8B5CF6', // purple-500
  measurement: '#10B981', // green-500
} as const;

// Nachrichten Templates
export const MESSAGE_TEMPLATES = {
  WELCOME: 'Willkommen im Training, {name}!',
  TRAINING_COMPLETE: 'Super Training, {name}! Weiter so! 💪',
  NEW_RECORD: 'Neuer persönlicher Rekord! 🎉',
  REMINDER: 'Nicht vergessen: Training am {date} um {time} Uhr',
} as const;

// API Endpoints (für zukünftige Integration)
export const API_ENDPOINTS = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
  CLIENTS: '/api/clients',
  MEASUREMENTS: '/api/measurements',
  WORKOUTS: '/api/workouts',
  CALENDAR: '/api/calendar',
} as const;

// Validierungs-Regeln
export const VALIDATION_RULES = {
  MIN_AGE: 16,
  MAX_AGE: 100,
  MIN_WEIGHT: 30,
  MAX_WEIGHT: 300,
  MIN_BODY_FAT: 3,
  MAX_BODY_FAT: 50,
  PHONE_REGEX: /^[\d\s\-\+\(\)]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

// Chart Farben (für Statistiken)
export const CHART_COLORS = {
  primary: '#3B82F6',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  neutral: '#6B7280',
} as const;

// Responsive Breakpoints (zusätzlich zu Tailwind)
export const BREAKPOINTS = {
  mobile: 640,
  tablet: 768,
  desktop: 1024,
  wide: 1280,
} as const;

// Animation Durations (in ms)
export const ANIMATION_DURATION = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const;

// Locale Einstellungen
export const LOCALE_CONFIG = {
  DEFAULT_LOCALE: 'de-DE',
  CURRENCY: 'EUR',
  DATE_FORMAT: 'DD.MM.YYYY',
  TIME_FORMAT: 'HH:mm',
} as const;