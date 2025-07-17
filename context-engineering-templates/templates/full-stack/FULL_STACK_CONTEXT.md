# Full-Stack Application Context Template

## 🎯 Full-Stack Overview

### Application Architecture
- [ ] Monolithic (Single deployable unit)
- [ ] Microservices (Multiple services)
- [ ] Serverless (Function-based)
- [ ] Hybrid Architecture
- [ ] Monorepo Structure

### Stack Components
```yaml
frontend:
  framework: [Next.js/Nuxt/SvelteKit/Remix]
  ui: [Tailwind/MUI/Chakra/Custom]
  state: [Redux/Zustand/Pinia/Context]

backend:
  runtime: [Node.js/Python/Go/Rust]
  framework: [Express/FastAPI/Gin/Actix]
  database: [PostgreSQL/MongoDB/MySQL]
  cache: [Redis/Memcached]

infrastructure:
  hosting: [Vercel/AWS/GCP/Azure]
  container: [Docker/Kubernetes]
  ci-cd: [GitHub Actions/GitLab CI]
```

## 🏗 Monorepo Structure

### Project Organization
```
project-root/
├── apps/
│   ├── web/                 # Frontend application
│   ├── mobile/              # Mobile app (optional)
│   └── api/                 # Backend API
├── packages/
│   ├── ui/                  # Shared UI components
│   ├── shared/              # Shared utilities/types
│   ├── database/            # Database schemas/migrations
│   └── config/              # Shared configuration
├── services/
│   ├── auth/                # Auth microservice
│   ├── notifications/       # Notification service
│   └── analytics/           # Analytics service
├── infrastructure/
│   ├── docker/              # Docker configurations
│   ├── k8s/                 # Kubernetes manifests
│   └── terraform/           # Infrastructure as code
└── tools/
    ├── scripts/             # Build/deploy scripts
    └── generators/          # Code generators
```

## 🔄 Data Flow Architecture

### Client-Server Communication
```typescript
// API Client (Frontend)
class ApiClient {
  private baseUrl: string;
  private wsConnection: WebSocket;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // REST API calls
  async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...this.getAuthHeaders(),
        ...options?.headers,
      },
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.json());
    }
    
    return response.json();
  }

  // WebSocket connection
  connectWebSocket(userId: string) {
    this.wsConnection = new WebSocket(`${this.wsUrl}/ws?userId=${userId}`);
    this.wsConnection.onmessage = this.handleMessage;
  }
}

// Server API (Backend)
app.use('/api', rateLimiter);
app.use('/api', authenticate);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// WebSocket handling
wss.on('connection', (ws, req) => {
  const userId = getUserIdFromRequest(req);
  connections.set(userId, ws);
  
  ws.on('message', (message) => {
    handleWebSocketMessage(userId, message);
  });
});
```

## 🗄 Database Design

### Schema Design
```sql
-- Core tables
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  username VARCHAR(50) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  token VARCHAR(255) UNIQUE NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_sessions_token ON sessions(token);
CREATE INDEX idx_sessions_expires ON sessions(expires_at);
```

### ORM/Query Builder Setup
```typescript
// Prisma example
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  username  String   @unique
  password  String
  profile   Profile?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

// TypeORM example
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Post, post => post.author)
  posts: Post[];
}
```

## 🔐 Authentication & Session Management

### Auth Flow Implementation
```typescript
// JWT-based authentication
interface AuthService {
  async register(data: RegisterDto): Promise<AuthResponse> {
    // Validate input
    const validated = registerSchema.parse(data);
    
    // Check if user exists
    const existing = await userRepo.findByEmail(validated.email);
    if (existing) {
      throw new ConflictError('User already exists');
    }
    
    // Hash password
    const passwordHash = await bcrypt.hash(validated.password, 10);
    
    // Create user
    const user = await userRepo.create({
      ...validated,
      password: passwordHash,
    });
    
    // Generate tokens
    const tokens = this.generateTokens(user);
    
    return { user, ...tokens };
  }

  async login(data: LoginDto): Promise<AuthResponse> {
    // Implementation
  }

  private generateTokens(user: User) {
    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );
    
    return { accessToken, refreshToken };
  }
}

// Session management
interface SessionManager {
  async createSession(userId: string): Promise<Session>;
  async validateSession(token: string): Promise<Session | null>;
  async invalidateSession(token: string): Promise<void>;
  async invalidateAllUserSessions(userId: string): Promise<void>;
}
```

## 🎨 Shared UI Components

### Component Library Structure
```typescript
// packages/ui/components/Button/Button.tsx
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  onClick,
  children,
}) => {
  const className = cn(
    'button',
    `button--${variant}`,
    `button--${size}`,
    {
      'button--loading': loading,
      'button--disabled': disabled || loading,
    }
  );

  return (
    <button
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
    >
      {loading ? <Spinner /> : children}
    </button>
  );
};

// Export from package
export { Button } from './components/Button';
export { Modal } from './components/Modal';
export { Form, Input, Select } from './components/Form';
```

## 🚀 Full-Stack Features

### Real-time Features
```typescript
// Server-side events
class RealtimeService {
  private connections: Map<string, WebSocket> = new Map();

  broadcast(event: string, data: any) {
    const message = JSON.stringify({ event, data });
    
    this.connections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(message);
      }
    });
  }

  sendToUser(userId: string, event: string, data: any) {
    const ws = this.connections.get(userId);
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify({ event, data }));
    }
  }
}

// Client-side handling
const useRealtimeConnection = () => {
  const [connected, setConnected] = useState(false);
  const ws = useRef<WebSocket>();

  useEffect(() => {
    ws.current = new WebSocket(WS_URL);
    
    ws.current.onopen = () => setConnected(true);
    ws.current.onclose = () => setConnected(false);
    
    ws.current.onmessage = (event) => {
      const { event: eventType, data } = JSON.parse(event.data);
      handleRealtimeEvent(eventType, data);
    };

    return () => ws.current?.close();
  }, []);

  return { connected, send: ws.current?.send };
};
```

### File Upload System
```typescript
// Backend file handling
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type'));
    }
  },
});

app.post('/api/upload', upload.single('file'), async (req, res) => {
  const fileUrl = await uploadToCloudStorage(req.file);
  res.json({ url: fileUrl });
});

// Frontend upload component
const FileUpload = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percent);
        },
      });
      
      return response.data.url;
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploadZone
      onDrop={handleUpload}
      uploading={uploading}
      progress={progress}
    />
  );
};
```

## 🧪 Full-Stack Testing

### Testing Strategy
```typescript
// E2E tests with Playwright
test.describe('User Registration Flow', () => {
  test('should register a new user', async ({ page }) => {
    await page.goto('/register');
    
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'Password123!');
    await page.click('button[type="submit"]');
    
    await expect(page).toHaveURL('/dashboard');
    await expect(page.locator('h1')).toContainText('Welcome');
  });
});

// API integration tests
describe('POST /api/users', () => {
  it('should create a user and return tokens', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'Password123!',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('accessToken');
    expect(response.body).toHaveProperty('refreshToken');
    
    // Verify user in database
    const user = await prisma.user.findUnique({
      where: { email: 'test@example.com' },
    });
    expect(user).toBeTruthy();
  });
});
```

## 🚢 Deployment Pipeline

### CI/CD Configuration
```yaml
# .github/workflows/deploy.yml
name: Deploy Full-Stack App

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm run test
      - run: npm run test:e2e

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: docker build -t app:${{ github.sha }} .
      - run: docker push app:${{ github.sha }}

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to production
        run: |
          kubectl set image deployment/app app=app:${{ github.sha }}
          kubectl rollout status deployment/app
```

### Environment Configuration
```typescript
// config/environments.ts
export const config = {
  development: {
    api: {
      url: 'http://localhost:3000',
      timeout: 30000,
    },
    database: {
      url: process.env.DATABASE_URL || 'postgresql://localhost/dev',
    },
    redis: {
      url: process.env.REDIS_URL || 'redis://localhost:6379',
    },
  },
  production: {
    api: {
      url: 'https://api.example.com',
      timeout: 10000,
    },
    database: {
      url: process.env.DATABASE_URL,
      pool: {
        min: 2,
        max: 10,
      },
    },
    redis: {
      url: process.env.REDIS_URL,
      tls: true,
    },
  },
};
```

## 📊 Monitoring & Analytics

### Full-Stack Monitoring
```typescript
// Application monitoring
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express({ app }),
  ],
  tracesSampleRate: 1.0,
});

// Performance monitoring
app.use((req, res, next) => {
  const start = process.hrtime.bigint();
  
  res.on('finish', () => {
    const duration = Number(process.hrtime.bigint() - start) / 1e6;
    
    metrics.histogram('http_request_duration_ms', duration, {
      method: req.method,
      route: req.route?.path || 'unknown',
      status: res.statusCode,
    });
  });
  
  next();
});

// Frontend analytics
const Analytics = {
  trackEvent(event: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', event, properties);
    }
  },
  
  trackPageView(path: string) {
    this.trackEvent('page_view', { page_path: path });
  },
  
  trackError(error: Error, context?: Record<string, any>) {
    Sentry.captureException(error, { extra: context });
  },
};
```

## 🔧 Development Workflow

### Local Development Setup
```bash
# Clone and setup
git clone [repository]
cd [project]
npm install

# Setup environment
cp .env.example .env
# Edit .env with your values

# Start databases
docker-compose up -d postgres redis

# Run migrations
npm run db:migrate

# Start development
npm run dev

# Access:
# - Frontend: http://localhost:3000
# - API: http://localhost:3001
# - Database: localhost:5432
# - Redis: localhost:6379
```

### Development Scripts
```json
{
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "format": "prettier --write \"**/*.{ts,tsx,js,jsx,json,md}\"",
    "db:migrate": "prisma migrate dev",
    "db:push": "prisma db push",
    "db:seed": "prisma db seed",
    "generate": "turbo run generate",
    "clean": "turbo run clean && rm -rf node_modules",
    "deploy": "turbo run deploy"
  }
}
```