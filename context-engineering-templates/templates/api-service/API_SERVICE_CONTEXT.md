# API Service Context Template

## 🔌 API Service Overview

### Service Type
- [ ] RESTful API
- [ ] GraphQL API
- [ ] gRPC Service
- [ ] WebSocket Server
- [ ] Microservice
- [ ] Serverless Functions

### Service Characteristics
- **Purpose**: [What this API does]
- **Consumers**: [Web apps, Mobile apps, Other services]
- **Scale**: [Expected requests per second]
- **SLA**: [Uptime requirements]

## 🏗 Architecture

### Technology Stack
```yaml
runtime: [Node.js/Python/Go/Java]
framework: [Express/FastAPI/Gin/Spring]
database: [PostgreSQL/MongoDB/DynamoDB]
cache: [Redis/Memcached]
queue: [RabbitMQ/SQS/Kafka]
container: [Docker/Kubernetes]
```

### Service Structure
```
src/
├── api/
│   ├── routes/         # Route definitions
│   ├── controllers/    # Request handlers
│   ├── middleware/     # Custom middleware
│   └── validators/     # Input validation
├── services/           # Business logic
├── models/            # Data models
├── repositories/      # Data access layer
├── utils/             # Helper functions
├── config/            # Configuration
└── tests/             # Test files
```

## 📊 Data Models

### Core Entities
```typescript
// User entity
interface User {
  id: string;
  email: string;
  passwordHash: string;
  profile: UserProfile;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;
}

// Define other core entities
interface [Entity] {
  // Properties
}
```

### Database Schema
```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes
CREATE INDEX idx_users_email ON users(email);
```

## 🔐 Authentication & Authorization

### Authentication Strategy
```javascript
// JWT implementation
const generateToken = (user) => {
  return jwt.sign(
    { 
      id: user.id, 
      email: user.email,
      roles: user.roles 
    },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

// Middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};
```

### Authorization Levels
```javascript
// Role-based access control
const authorize = (requiredRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles;
    const hasPermission = requiredRoles.some(role => 
      userRoles.includes(role)
    );
    
    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    next();
  };
};

// Usage
router.get('/admin', 
  authenticate, 
  authorize(['admin']), 
  adminController.dashboard
);
```

## 🌐 API Endpoints

### Endpoint Structure
```yaml
# Standard CRUD endpoints
GET    /api/v1/resources          # List all
GET    /api/v1/resources/:id      # Get one
POST   /api/v1/resources          # Create
PATCH  /api/v1/resources/:id      # Update
DELETE /api/v1/resources/:id      # Delete

# Additional endpoints
POST   /api/v1/resources/:id/action    # Perform action
GET    /api/v1/resources/:id/related   # Get related data
```

### Request/Response Format
```typescript
// Standard response format
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

// Pagination
interface PaginationParams {
  page: number;
  limit: number;
  sort?: string;
  order?: 'asc' | 'desc';
}
```

## 🔄 Data Validation

### Input Validation
```javascript
// Using Joi/Yup/Zod
const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  name: z.string().min(2).max(50),
  age: z.number().int().positive().max(120).optional()
});

// Validation middleware
const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid input',
          details: error.errors
        }
      });
    }
  };
};
```

## 🚦 Rate Limiting

### Rate Limit Configuration
```javascript
// Rate limiting setup
const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests',
  standardHeaders: true,
  legacyHeaders: false,
});

// Different limits for different endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5, // Stricter limit for auth endpoints
  skipSuccessfulRequests: true,
});

app.use('/api/', rateLimiter);
app.use('/api/auth/', authLimiter);
```

## 💾 Caching Strategy

### Cache Implementation
```javascript
// Redis caching
const cache = {
  get: async (key) => {
    const value = await redis.get(key);
    return value ? JSON.parse(value) : null;
  },
  
  set: async (key, value, ttl = 3600) => {
    await redis.setex(key, ttl, JSON.stringify(value));
  },
  
  invalidate: async (pattern) => {
    const keys = await redis.keys(pattern);
    if (keys.length) {
      await redis.del(...keys);
    }
  }
};

// Cache middleware
const cacheMiddleware = (ttl = 3600) => {
  return async (req, res, next) => {
    const key = `cache:${req.originalUrl}`;
    const cached = await cache.get(key);
    
    if (cached) {
      return res.json(cached);
    }
    
    // Store original send function
    const originalSend = res.json;
    res.json = function(data) {
      res.json = originalSend;
      cache.set(key, data, ttl);
      return res.json(data);
    };
    
    next();
  };
};
```

## 🔍 Logging & Monitoring

### Logging Strategy
```javascript
// Structured logging
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger.info({
      method: req.method,
      url: req.url,
      status: res.statusCode,
      duration,
      ip: req.ip,
      userAgent: req.get('user-agent')
    });
  });
  
  next();
});
```

### Monitoring Setup
```javascript
// Health check endpoint
app.get('/health', async (req, res) => {
  const health = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    checks: {
      database: await checkDatabase(),
      redis: await checkRedis(),
      memory: process.memoryUsage(),
    }
  };
  
  const isHealthy = Object.values(health.checks).every(
    check => check.status === 'ok'
  );
  
  res.status(isHealthy ? 200 : 503).json(health);
});

// Metrics collection
const prometheus = require('prom-client');
const httpRequestDuration = new prometheus.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code']
});
```

## 🧪 Testing Strategy

### Test Structure
```javascript
// Unit test example
describe('UserService', () => {
  describe('createUser', () => {
    it('should create a new user', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123'
      };
      
      const user = await userService.createUser(userData);
      
      expect(user).toHaveProperty('id');
      expect(user.email).toBe(userData.email);
    });
    
    it('should hash the password', async () => {
      // Test password hashing
    });
  });
});

// Integration test example
describe('POST /api/users', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        email: 'test@example.com',
        password: 'password123'
      });
    
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

## 🚀 Deployment

### Deployment Configuration
```yaml
# Docker configuration
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]

# Kubernetes deployment
apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-service
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api-service
  template:
    metadata:
      labels:
        app: api-service
    spec:
      containers:
      - name: api
        image: api-service:latest
        ports:
        - containerPort: 3000
        env:
        - name: NODE_ENV
          value: "production"
```

### Environment Management
```bash
# Development
NODE_ENV=development
DATABASE_URL=postgresql://localhost/dev_db
REDIS_URL=redis://localhost:6379

# Production
NODE_ENV=production
DATABASE_URL=postgresql://prod-server/prod_db
REDIS_URL=redis://prod-redis:6379
```

## 🔒 Security Best Practices

### Security Measures
```javascript
// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// SQL injection prevention
// Always use parameterized queries
const user = await db.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
```

## 📈 Performance Optimization

### Optimization Strategies
```javascript
// Database query optimization
// Use indexes
await db.query(`
  CREATE INDEX CONCURRENTLY idx_users_email 
  ON users(email)
`);

// Batch operations
const batchInsert = async (records) => {
  const chunks = chunk(records, 1000);
  
  for (const chunk of chunks) {
    await db.transaction(async (trx) => {
      await trx('table').insert(chunk);
    });
  }
};

// Connection pooling
const pool = new Pool({
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});
```

## 📦 API Documentation

### Documentation Strategy
```yaml
# OpenAPI/Swagger specification
openapi: 3.0.0
info:
  title: API Service
  version: 1.0.0
  description: API service documentation

paths:
  /users:
    get:
      summary: List users
      parameters:
        - in: query
          name: page
          schema:
            type: integer
          description: Page number
      responses:
        200:
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/UserList'
```

### API Client SDKs
```javascript
// Auto-generate client SDKs
// TypeScript
export class ApiClient {
  constructor(private baseUrl: string, private apiKey: string) {}
  
  async getUsers(params?: GetUsersParams): Promise<User[]> {
    // Implementation
  }
}
```