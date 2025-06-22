# NV Coaching Platform - Datenbank Schema

## Übersicht
PostgreSQL Datenbank mit Prisma ORM für Type-Safety und Migrations.

## Core Entities

### User (Basis für Trainer & Kunden)
```prisma
model User {
  id                String   @id @default(cuid())
  email             String   @unique
  passwordHash      String
  role              UserRole @default(CLIENT)
  firstName         String
  lastName          String
  phoneNumber       String?
  dateOfBirth       DateTime?
  profileImageUrl   String?
  
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
  lastLoginAt       DateTime?
  
  // Relations
  clientProfile     Client?
  trainerProfile    Trainer?
  sentMessages      Message[] @relation("SentMessages")
  receivedMessages  Message[] @relation("ReceivedMessages")
}

enum UserRole {
  TRAINER
  CLIENT
  ADMIN
}
```

### Trainer
```prisma
model Trainer {
  id              String   @id @default(cuid())
  userId          String   @unique
  user            User     @relation(fields: [userId], references: [id])
  
  bio             String?
  specializations String[]
  certifications  String[]
  yearsExperience Int?
  
  // Relations
  clients         Client[]
  createdPlans    TrainingPlan[]
}
```

### Client
```prisma
model Client {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])
  trainerId         String
  trainer           Trainer  @relation(fields: [trainerId], references: [id])
  
  // Personal Data
  height            Float?   // in cm
  activityLevel     ActivityLevel?
  goals             String[]
  medicalConditions String[]
  notes             String?
  
  // Relations
  measurements      Measurement[]
  trainingPlans     TrainingPlan[]
  nutritionPlans    NutritionPlan[]
  appointments      Appointment[]
  trainingLogs      TrainingLog[]
  
  @@index([trainerId])
}

enum ActivityLevel {
  SEDENTARY
  LIGHTLY_ACTIVE
  MODERATELY_ACTIVE
  VERY_ACTIVE
  EXTREMELY_ACTIVE
}
```

### Measurement (Hautfaltenmessung & Körperanalyse)
```prisma
model Measurement {
  id              String   @id @default(cuid())
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  
  date            DateTime @default(now())
  weight          Float?   // in kg
  
  // Hautfaltenmessungen in mm
  biceps          Float?
  triceps         Float?
  subscapular     Float?
  suprailiac      Float?
  abdominal       Float?
  thigh           Float?
  chest           Float?
  midaxillary     Float?
  supraspinale    Float?
  medialCalf      Float?
  
  // Berechnete Werte
  bodyFatPercent  Float?
  leanMass        Float?
  fatMass         Float?
  
  // Umfänge in cm
  waist           Float?
  hip             Float?
  chest           Float?
  armRight        Float?
  armLeft         Float?
  thighRight      Float?
  thighLeft       Float?
  
  // KI-Analyse
  anomalyDetected Boolean @default(false)
  anomalyNotes    String?
  
  notes           String?
  images          String[] // URLs zu Fotos
  
  createdAt       DateTime @default(now())
  
  @@index([clientId, date])
}
```

### TrainingPlan
```prisma
model TrainingPlan {
  id              String   @id @default(cuid())
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  trainerId       String
  trainer         Trainer  @relation(fields: [trainerId], references: [id])
  
  name            String
  description     String?
  startDate       DateTime
  endDate         DateTime?
  isActive        Boolean  @default(true)
  
  // Relations
  workouts        Workout[]
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  @@index([clientId, isActive])
}
```

### Workout
```prisma
model Workout {
  id              String   @id @default(cuid())
  trainingPlanId  String
  trainingPlan    TrainingPlan @relation(fields: [trainingPlanId], references: [id])
  
  name            String
  dayOfWeek       Int?     // 1-7
  orderIndex      Int
  
  // Relations
  exercises       WorkoutExercise[]
  logs            TrainingLog[]
}
```

### Exercise
```prisma
model Exercise {
  id              String   @id @default(cuid())
  name            String
  category        String
  muscleGroups    String[]
  equipment       String?
  difficulty      Difficulty
  
  description     String?
  instructions    String[]
  videoUrl        String?
  imageUrls       String[]
  
  // Relations
  workoutExercises WorkoutExercise[]
  
  @@unique([name])
}

enum Difficulty {
  BEGINNER
  INTERMEDIATE
  ADVANCED
}
```

### WorkoutExercise (Junction Table)
```prisma
model WorkoutExercise {
  id              String   @id @default(cuid())
  workoutId       String
  workout         Workout  @relation(fields: [workoutId], references: [id])
  exerciseId      String
  exercise        Exercise @relation(fields: [exerciseId], references: [id])
  
  orderIndex      Int
  sets            Int
  reps            String   // "8-12" oder "30s"
  rest            Int?     // in Sekunden
  weight          Float?   // in kg
  notes           String?
  
  @@unique([workoutId, orderIndex])
}
```

### TrainingLog
```prisma
model TrainingLog {
  id              String   @id @default(cuid())
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  workoutId       String
  workout         Workout  @relation(fields: [workoutId], references: [id])
  
  date            DateTime @default(now())
  duration        Int?     // in Minuten
  
  // Relations
  exerciseLogs    ExerciseLog[]
  
  notes           String?
  videoUrls       String[] // Formcheck-Videos
  
  @@index([clientId, date])
}
```

### ExerciseLog
```prisma
model ExerciseLog {
  id              String   @id @default(cuid())
  trainingLogId   String
  trainingLog     TrainingLog @relation(fields: [trainingLogId], references: [id])
  exerciseId      String
  
  sets            Json     // [{reps: 12, weight: 50}, ...]
  notes           String?
  rpe             Int?     // Rate of Perceived Exertion 1-10
}
```

### NutritionPlan
```prisma
model NutritionPlan {
  id              String   @id @default(cuid())
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  
  name            String
  startDate       DateTime
  endDate         DateTime?
  isActive        Boolean  @default(true)
  
  dailyCalories   Int
  proteinGrams    Int
  carbsGrams      Int
  fatGrams        Int
  
  mealPlan        Json     // Strukturierter Ernährungsplan
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  // KI-generiert
  aiGenerated     Boolean  @default(false)
  aiPrompt        String?
  
  @@index([clientId, isActive])
}
```

### Appointment
```prisma
model Appointment {
  id              String   @id @default(cuid())
  clientId        String
  client          Client   @relation(fields: [clientId], references: [id])
  
  startTime       DateTime
  endTime         DateTime
  title           String
  location        String?
  
  status          AppointmentStatus @default(SCHEDULED)
  notes           String?
  
  createdAt       DateTime @default(now())
  
  @@index([clientId, startTime])
  @@index([startTime])
}

enum AppointmentStatus {
  SCHEDULED
  CONFIRMED
  CANCELLED
  COMPLETED
  NO_SHOW
}
```

### Message
```prisma
model Message {
  id              String   @id @default(cuid())
  senderId        String
  sender          User     @relation("SentMessages", fields: [senderId], references: [id])
  receiverId      String
  receiver        User     @relation("ReceivedMessages", fields: [receiverId], references: [id])
  
  content         String
  isRead          Boolean  @default(false)
  
  createdAt       DateTime @default(now())
  
  @@index([receiverId, isRead])
  @@index([senderId, receiverId])
}
```

### AIInteraction (Für Digital Twin)
```prisma
model AIInteraction {
  id              String   @id @default(cuid())
  userId          String
  
  prompt          String
  response        String
  context         Json?    // Kontext-Daten
  
  satisfaction    Int?     // 1-5 Bewertung
  wasHelpful      Boolean?
  
  createdAt       DateTime @default(now())
  
  @@index([userId, createdAt])
}
```

## Indizes für Performance

```prisma
// Häufige Queries optimieren
@@index([clientId, date]) // Für Fortschrittsabfragen
@@index([trainerId]) // Für Trainer-Dashboard
@@index([isActive]) // Für aktive Pläne
@@index([startTime]) // Für Kalender-Ansichten
```

## Migration Strategy

1. **Development**: Automatische Migrations mit `prisma migrate dev`
2. **Production**: Explizite Migrations mit `prisma migrate deploy`
3. **Backup**: Tägliche automatische Backups
4. **Seed Data**: Beispieldaten für Entwicklung