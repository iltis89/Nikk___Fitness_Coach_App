# NV Coaching Platform - Coding Standards & Best Practices

## 🎯 Grundprinzipien
1. **KISS** - Keep It Simple, Stupid
2. **DRY** - Don't Repeat Yourself
3. **YAGNI** - You Aren't Gonna Need It
4. **SOLID** - Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion

## 📝 Code Style

### TypeScript/JavaScript
```typescript
// ✅ GOOD: Klare, beschreibende Namen
const calculateBodyFatPercentage = (measurements: SkinFoldMeasurement[]): number => {
  // Berechnung hier
};

// ❌ BAD: Kryptische Abkürzungen
const calcBFP = (m: any[]): number => {
  // ...
};

// ✅ GOOD: Early returns für bessere Lesbarkeit
function validateMeasurement(value: number): boolean {
  if (value < 0) return false;
  if (value > 100) return false;
  return true;
}

// ✅ GOOD: Interfaces für Type Safety
interface TrainingPlan {
  id: string;
  clientId: string;
  exercises: Exercise[];
  createdAt: Date;
  updatedAt: Date;
}
```

### React/React Native
```tsx
// ✅ GOOD: Funktionale Komponenten mit TypeScript
interface ClientCardProps {
  client: Client;
  onPress?: () => void;
}

export const ClientCard: React.FC<ClientCardProps> = ({ client, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{client.name}</Text>
    </TouchableOpacity>
  );
};

// ✅ GOOD: Custom Hooks für wiederverwendbare Logik
const useClientData = (clientId: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['client', clientId],
    queryFn: () => fetchClient(clientId),
  });
  
  return { client: data, isLoading, error };
};
```

## 🏗 Architektur-Patterns

### 1. Feature-Based Structure
```
packages/
  shared/
    src/
      features/
        auth/
          hooks/
          types/
          utils/
        measurements/
          hooks/
          types/
          utils/
```

### 2. API Layer Pattern
```typescript
// api/clients.ts
export const clientsApi = {
  getAll: async (): Promise<Client[]> => {
    const response = await api.get('/clients');
    return response.data;
  },
  
  getById: async (id: string): Promise<Client> => {
    const response = await api.get(`/clients/${id}`);
    return response.data;
  },
  
  create: async (data: CreateClientDto): Promise<Client> => {
    const response = await api.post('/clients', data);
    return response.data;
  },
};
```

### 3. State Management Pattern
```typescript
// Zustand Store
interface AppState {
  currentClient: Client | null;
  measurements: Measurement[];
  
  // Actions
  setCurrentClient: (client: Client) => void;
  addMeasurement: (measurement: Measurement) => void;
}

export const useAppStore = create<AppState>((set) => ({
  currentClient: null,
  measurements: [],
  
  setCurrentClient: (client) => set({ currentClient: client }),
  addMeasurement: (measurement) => 
    set((state) => ({ 
      measurements: [...state.measurements, measurement] 
    })),
}));
```

## 🔒 Security Best Practices

1. **Niemals Secrets im Code**
```typescript
// ❌ BAD
const API_KEY = "sk-1234567890";

// ✅ GOOD
const API_KEY = process.env.OPENAI_API_KEY;
```

2. **Input Validation**
```typescript
// Immer Zod oder ähnliche Libraries verwenden
const MeasurementSchema = z.object({
  value: z.number().min(0).max(100),
  date: z.date(),
  type: z.enum(['biceps', 'triceps', 'chest', 'abdomen']),
});
```

3. **Sanitize User Input**
```typescript
// Besonders bei Video-Uploads und Freitext-Eingaben
import DOMPurify from 'isomorphic-dompurify';

const sanitizedInput = DOMPurify.sanitize(userInput);
```

## 🚀 Performance Guidelines

### 1. Lazy Loading
```typescript
// React Komponenten
const ClientDashboard = lazy(() => import('./ClientDashboard'));

// Daten
const { data } = useQuery({
  queryKey: ['clients'],
  queryFn: fetchClients,
  staleTime: 5 * 60 * 1000, // 5 Minuten
});
```

### 2. Memoization
```typescript
// Teure Berechnungen
const bodyFatPercentage = useMemo(
  () => calculateBodyFat(measurements),
  [measurements]
);

// Callbacks
const handleSubmit = useCallback((data: FormData) => {
  // ...
}, [dependencies]);
```

### 3. Offline-First
```typescript
// React Query mit Offline Support
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: 'offlineFirst',
      cacheTime: 1000 * 60 * 60 * 24, // 24 Stunden
    },
  },
});
```

## 📱 Mobile-Specific Guidelines

### 1. Touch-Friendly UI
```typescript
// Mindestgrößen für Touch-Targets
const styles = StyleSheet.create({
  button: {
    minHeight: 44, // iOS Human Interface Guidelines
    minWidth: 44,
    padding: 12,
  },
});
```

### 2. Responsive Design
```typescript
// Nutze Dimensions API
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');
const isTablet = width >= 768;
```

## 🧪 Testing Standards

### 1. Unit Tests
```typescript
describe('calculateBodyFatPercentage', () => {
  it('should return correct percentage for valid measurements', () => {
    const measurements = [
      { type: 'biceps', value: 5 },
      { type: 'triceps', value: 10 },
    ];
    
    expect(calculateBodyFatPercentage(measurements)).toBe(15.5);
  });
  
  it('should throw for invalid measurements', () => {
    expect(() => calculateBodyFatPercentage([])).toThrow();
  });
});
```

### 2. Integration Tests
```typescript
describe('ClientAPI', () => {
  it('should create and retrieve a client', async () => {
    const newClient = await clientsApi.create({
      name: 'Test Client',
      email: 'test@example.com',
    });
    
    const retrieved = await clientsApi.getById(newClient.id);
    expect(retrieved.name).toBe('Test Client');
  });
});
```

## 📦 Git Commit Guidelines

### Conventional Commits
```bash
feat: Add skin fold measurement tracking
fix: Correct body fat calculation formula
docs: Update API documentation
style: Format code with prettier
refactor: Extract measurement logic to custom hook
test: Add unit tests for training plan service
chore: Update dependencies
```

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

## 🔄 Code Review Checklist

- [ ] Code folgt den TypeScript Best Practices
- [ ] Keine hardcodierten Werte
- [ ] Fehlerbehandlung implementiert
- [ ] Tests geschrieben/aktualisiert
- [ ] Performance-Auswirkungen bedacht
- [ ] Accessibility berücksichtigt
- [ ] Dokumentation aktualisiert
- [ ] Keine console.logs im Production Code

## 🎨 UI/UX Code Standards

### 1. Konsistente Spacing
```typescript
// Design Tokens verwenden
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

### 2. Semantic Colors
```typescript
export const colors = {
  primary: '#007AFF',
  success: '#34C759',
  warning: '#FF9500',
  error: '#FF3B30',
  
  // Semantic naming
  textPrimary: '#000000',
  textSecondary: '#3C3C43',
  background: '#FFFFFF',
  surface: '#F2F2F7',
};
```

## 🤖 KI-Integration Best Practices

### 1. Prompt Engineering
```typescript
const generateTrainingPlan = async (clientData: ClientProfile) => {
  const prompt = `
    Erstelle einen Trainingsplan für:
    - Name: ${clientData.name}
    - Ziele: ${clientData.goals.join(', ')}
    - Einschränkungen: ${clientData.limitations.join(', ')}
    
    Beachte Nikks Trainingsphilosophie:
    - Functional Strength Fokus
    - Messbare Fortschritte
    - Individuelle Anpassung
  `;
  
  return await aiService.generate(prompt);
};
```

### 2. Response Validation
```typescript
// Immer KI-Antworten validieren
const AiResponseSchema = z.object({
  exercises: z.array(ExerciseSchema),
  sets: z.number().min(1).max(5),
  reps: z.number().min(1).max(30),
});

const validatedResponse = AiResponseSchema.parse(aiResponse);
```

Diese Standards helfen uns, sauberen, wartbaren und skalierbaren Code zu schreiben!