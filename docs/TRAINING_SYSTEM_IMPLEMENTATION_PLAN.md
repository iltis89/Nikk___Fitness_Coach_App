# 🏋️ Implementierungsplan: Nikks Advanced Training System

## 📋 Übersicht
Dieser Plan beschreibt die schrittweise Integration von Nikks professioneller Trainingsmethodik in unsere bestehende Plattform.

## 🎯 Ziele
- Vollständige Abbildung der Excel-basierten Trainingsplanung
- Beibehaltung der Benutzerfreundlichkeit
- Skalierbare Architektur für zukünftige Erweiterungen

## 📊 Phase 1: Datenmodell-Erweiterung (Priorität: HOCH)

### 1.1 Erweiterte Übungsstruktur

```typescript
// packages/shared/src/types/training.ts

interface Exercise {
  id: string;
  name: string;
  category: string;
  equipment: string;
  muscleGroups: string[];
  // NEU:
  variations?: string[]; // ["Fat Gripz", "Bamboo Bench", "Fersen erhöht"]
  unilateral?: boolean; // Einarmig/Einbeinig
}

interface WorkoutExercise {
  id: string;
  exerciseId: string;
  // NEU: Supersatz-Gruppierung
  supersetGroup?: string; // "A1", "A2", "B1", "B2", "C"
  orderInSuperset?: number;
  
  // NEU: Erweiterte Parameter
  tempo?: string; // "4/0/1/0" oder "H/0/0/H"
  restSeconds: number;
  notes?: string;
  
  // NEU: Flexible Satz-Struktur
  sets: ExerciseSet[];
}

interface ExerciseSet {
  setNumber: number;
  targetReps: number | string; // "6-8" oder "10 p S" (pro Seite)
  targetWeight: number;
  targetRPE?: number; // Rate of Perceived Exertion
  
  // Tracking
  actualReps?: number;
  actualWeight?: number;
  actualRPE?: number;
  equipmentSetting?: string; // "Stufe 4", "Pin 10"
  completed: boolean;
  completedAt?: Date;
}
```

### 1.2 Periodisierung & Zyklen

```typescript
interface TrainingCycle {
  id: string;
  name: string; // "10-8-6-15 Wave", "Posterior Chain Activation"
  duration: number; // Wochen
  phases: TrainingPhase[];
}

interface TrainingPhase {
  id: string;
  weekNumber: number;
  name: string; // "Woche 1", "Deload"
  workouts: PlannedWorkout[];
}

interface PlannedWorkout {
  id: string;
  date: Date;
  dayInWeek: number; // 1-7
  workoutTemplate: WorkoutTemplate;
  completed: boolean;
  actualWorkout?: CompletedWorkout;
}
```

### 1.3 Krafttest-Tracking

```typescript
interface StrengthBenchmark {
  id: string;
  exerciseId: string;
  testDate: Date;
  maxWeight?: number;
  maxReps?: number;
  estimatedOneRM?: number;
  bodyweight?: number;
  notes?: string;
}
```

## 🛠 Phase 2: UI/UX Anpassungen (Priorität: HOCH)

### 2.1 Workout-Durchführung Redesign

**Neue Features:**
- **Supersatz-Ansicht**: Gruppierte Übungen (A1/A2) werden zusammen angezeigt
- **Tempo-Timer**: Visueller Timer für Tempo-Vorgaben (4/0/1/0)
- **Set-by-Set Tracking**: Jeder Satz kann unterschiedliche Gewichte/Reps haben
- **Quick Notes**: Schnelle Notizen während des Trainings

**UI Mockup:**
```
┌─────────────────────────────────────┐
│ A1: Kniebeuge Fersen Erhöht        │
│ Tempo: 4/0/1/0 | Pause: 90s        │
├─────────────────────────────────────┤
│ Satz 1: 6 Wdh @ 20kg  [✓]         │
│ Satz 2: 8 Wdh @ 25kg  [✓]         │
│ Satz 3: 8 Wdh @ 30kg  [ ]         │
├─────────────────────────────────────┤
│ A2: 30° KH Schrägbank             │
│ Tempo: H/0/0/H | Pause: 90s        │
├─────────────────────────────────────┤
│ Satz 1: 8 Wdh @ 7.5kg [✓]         │
│ Satz 2: 8 Wdh @ 10kg  [ ]         │
│ Satz 3: 8 Wdh @ 12.5kg [ ]        │
└─────────────────────────────────────┘
```

### 2.2 Trainingsplan-Editor

**Neue Funktionen:**
- **Template-Bibliothek**: "10-8-6-15", "German Volume Training", etc.
- **Drag & Drop Supersätze**: Übungen zu Supersätzen gruppieren
- **Zyklus-Planer**: 4-18 Wochen Pläne mit automatischer Progression
- **Import von Excel**: CSV-Import für bestehende Pläne

## 💾 Phase 3: Backend-Erweiterungen (Priorität: MITTEL)

### 3.1 API Endpoints

```typescript
// Neue Endpoints
POST   /api/training-cycles          // Neuen Zyklus erstellen
GET    /api/training-cycles/:id      // Zyklus abrufen
PUT    /api/training-cycles/:id      // Zyklus bearbeiten

POST   /api/workouts/from-template   // Workout aus Template erstellen
POST   /api/workouts/:id/sets        // Set-Daten speichern
GET    /api/workouts/history         // Historische Daten für Progression

POST   /api/strength-tests           // Krafttest speichern
GET    /api/strength-tests/history   // Kraftentwicklung
```

### 3.2 Datenbank-Schema Erweiterungen

```sql
-- Neue Tabellen
CREATE TABLE training_cycles (
  id UUID PRIMARY KEY,
  client_id UUID REFERENCES clients(id),
  name VARCHAR(255),
  start_date DATE,
  end_date DATE,
  status VARCHAR(50),
  created_at TIMESTAMP
);

CREATE TABLE workout_exercises_sets (
  id UUID PRIMARY KEY,
  workout_exercise_id UUID REFERENCES workout_exercises(id),
  set_number INTEGER,
  target_reps VARCHAR(20),
  target_weight DECIMAL(5,2),
  actual_reps INTEGER,
  actual_weight DECIMAL(5,2),
  equipment_setting VARCHAR(100),
  completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP
);

CREATE TABLE exercise_superset_groups (
  workout_id UUID REFERENCES workouts(id),
  group_code VARCHAR(10), -- "A1", "A2", "B1"
  exercise_id UUID REFERENCES workout_exercises(id)
);
```

## 📱 Phase 4: Mobile App Anpassungen (Priorität: NIEDRIG)

- Supersatz-freundliche Navigation
- Offline-Sync für komplexe Workouts
- Tempo-Timer mit Haptic Feedback
- Voice-Input für schnelles Tracking

## 🚀 Phase 5: Advanced Features (Priorität: NIEDRIG)

### 5.1 KI-Integration
- **Auto-Regulation**: KI passt Gewichte basierend auf RPE an
- **Formcheck**: Video-Analyse der Übungsausführung
- **Progression-Vorschläge**: KI schlägt nächste Gewichtssteigerung vor

### 5.2 Analytics Dashboard
- **Volume Load Tracking**: Tonnage über Zeit
- **Kraftkurven**: 1RM Entwicklung
- **Compliance Heatmap**: Trainingsfrequenz-Visualisierung

## 📅 Implementierungs-Timeline

### Sprint 1 (Woche 1-2): Datenmodell
- [ ] Erweiterte Types in shared package
- [ ] Datenbank-Migrations
- [ ] API Endpoints Grundgerüst

### Sprint 2 (Woche 3-4): Workout-Durchführung
- [ ] Supersatz-UI
- [ ] Set-by-Set Tracking
- [ ] Tempo-Integration

### Sprint 3 (Woche 5-6): Plan-Editor
- [ ] Template-System
- [ ] Zyklus-Planer
- [ ] CSV-Import

### Sprint 4 (Woche 7-8): Testing & Polish
- [ ] Integration Tests
- [ ] Performance Optimierung
- [ ] User Feedback Integration

## 🎯 Erfolgs-Metriken

1. **Feature-Parität**: 100% der Excel-Funktionen abgebildet
2. **Usability**: Workout-Erfassung < 30 Sekunden pro Übung
3. **Daten-Integrität**: Keine Datenverluste beim Import
4. **Performance**: < 100ms Response Time für alle Operationen

## 🔧 Technische Überlegungen

### State Management
```typescript
// Zustand für komplexe Workout-Sessions
interface WorkoutSessionState {
  currentSuperset: string;
  currentExercise: number;
  currentSet: number;
  restTimer: number;
  tempoPhase: 'eccentric' | 'pause1' | 'concentric' | 'pause2';
  sessionStart: Date;
  completedSets: Record<string, boolean>;
}
```

### Offline-First Architektur
- IndexedDB für Workout-Templates
- Service Worker für Offline-Funktionalität
- Konfliktauflösung bei Sync

## 📝 Nächste Schritte

1. **Feedback von Nikk einholen** zu den geplanten Features
2. **Prototyp** der Supersatz-UI erstellen
3. **Testdaten** aus Excel importieren
4. **User Testing** mit 2-3 Kunden

---

Dieser Plan stellt sicher, dass wir Nikks bewährte Trainingsmethodik vollständig digitalisieren und dabei die Benutzerfreundlichkeit maximieren.