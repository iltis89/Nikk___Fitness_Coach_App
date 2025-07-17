# Development Workflow Guide

## 🚀 Quick Start Commands

### Essential Commands
```bash
# Initial setup
git clone [repository-url]
npm install
cp .env.example .env
npm run setup

# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run test         # Run tests
npm run lint         # Lint code
npm run format       # Format code

# Database
npm run db:migrate   # Run migrations
npm run db:seed      # Seed database
npm run db:reset     # Reset database

# Code generation
npm run generate:component [name]
npm run generate:api [resource]
npm run generate:migration [name]
```

## 🏗 Project Setup

### 1. Environment Setup
```bash
# Required tools
node --version       # v18+ required
npm --version        # v9+ required
git --version        # v2.30+ required

# Optional tools
docker --version     # For containerization
redis-cli --version  # For caching
```

### 2. Initial Configuration
```bash
# 1. Clone and install
git clone [repo-url]
cd [project-name]
npm install

# 2. Environment variables
cp .env.example .env
# Edit .env with your values

# 3. Database setup
npm run db:setup     # Creates DB, runs migrations, seeds

# 4. Start development
npm run dev
```

### 3. Environment Variables
```env
# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname

# Authentication
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d

# External Services
OPENAI_API_KEY=sk-...
REDIS_URL=redis://localhost:6379

# Email
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=user@example.com
SMTP_PASS=password
```

## 📁 Development Structure

### Where to Add New Code
```
Feature Development:
├── /api/routes/[feature].routes.ts     # API endpoints
├── /api/controllers/[feature].ctrl.ts  # Request handlers
├── /api/services/[feature].service.ts  # Business logic
├── /components/[Feature]/              # UI components
├── /hooks/use[Feature].ts              # React hooks
├── /types/[feature].types.ts           # TypeScript types
└── /tests/[feature].test.ts            # Tests

Database Changes:
├── /prisma/schema.prisma               # Schema updates
├── /prisma/migrations/                 # Generated migrations
└── /prisma/seed.ts                     # Seed data

Configuration:
├── /.env                               # Local environment
├── /config/[service].config.ts         # Service configs
└── /constants/[feature].constants.ts   # Feature constants
```

## 🔧 Common Development Tasks

### Adding a New Feature
```bash
# 1. Create feature branch
git checkout -b feature/[ticket-id]-feature-name

# 2. Generate boilerplate
npm run generate:feature [FeatureName]

# 3. Implement feature
# - Add API endpoints
# - Create UI components
# - Write tests
# - Update documentation

# 4. Test thoroughly
npm run test:feature [FeatureName]
npm run test:e2e

# 5. Submit PR
git add .
git commit -m "feat: add [feature] functionality"
git push origin feature/[ticket-id]-feature-name
```

### Adding a New API Endpoint
```typescript
// 1. Define route in /api/routes/[resource].routes.ts
router.post('/resource', validate(CreateResourceDto), controller.create);

// 2. Implement controller in /api/controllers/[resource].controller.ts
export const create = async (req: Request, res: Response) => {
  const result = await resourceService.create(req.body);
  res.status(201).json({ success: true, data: result });
};

// 3. Add business logic in /api/services/[resource].service.ts
export const create = async (data: CreateResourceDto) => {
  // Validation, processing, database operations
  return await prisma.resource.create({ data });
};

// 4. Add tests
describe('POST /api/resource', () => {
  it('should create a new resource', async () => {
    const response = await request(app)
      .post('/api/resource')
      .send(validData);
    expect(response.status).toBe(201);
  });
});
```

### Database Changes
```bash
# 1. Update schema
# Edit prisma/schema.prisma

# 2. Create migration
npm run db:migrate:create -- --name add_user_preferences

# 3. Apply migration
npm run db:migrate

# 4. Generate types
npm run db:generate

# 5. Update seed data if needed
# Edit prisma/seed.ts
npm run db:seed
```

## 🐛 Debugging Guide

### Common Issues & Solutions

#### TypeScript Errors
```bash
# Check for type errors
npm run typecheck

# Watch mode for continuous checking
npm run typecheck:watch

# Generate missing types
npm run generate:types
```

#### Database Issues
```bash
# Reset database
npm run db:reset

# Check migration status
npm run db:migrate:status

# Rollback last migration
npm run db:migrate:rollback
```

#### Build Failures
```bash
# Clean build artifacts
npm run clean

# Fresh install
rm -rf node_modules package-lock.json
npm install

# Check for circular dependencies
npm run check:circular
```

### Debug Tools
```javascript
// Server debugging
DEBUG=app:* npm run dev

// Client debugging
localStorage.setItem('debug', 'app:*');

// Database query logging
DATABASE_URL="postgresql://...?log=true"

// Performance profiling
NODE_OPTIONS='--inspect' npm run dev
```

## 🧪 Testing Workflow

### Test Structure
```
tests/
├── unit/           # Unit tests
├── integration/    # Integration tests
├── e2e/           # End-to-end tests
└── fixtures/      # Test data

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e
```

### Writing Tests
```typescript
// Unit test example
describe('UserService', () => {
  beforeEach(() => {
    // Setup
  });

  it('should create a user', async () => {
    // Test implementation
  });

  afterEach(() => {
    // Cleanup
  });
});

// Integration test example
describe('API: /users', () => {
  it('POST /users creates a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com' });
    
    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty('id');
  });
});
```

## 🚢 Deployment Process

### Pre-deployment Checklist
- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Performance benchmarks met

### Deployment Steps
```bash
# 1. Merge to main
git checkout main
git pull origin main
git merge --no-ff feature/your-feature

# 2. Tag release
git tag -a v1.2.3 -m "Release version 1.2.3"
git push origin v1.2.3

# 3. Deploy to staging
npm run deploy:staging

# 4. Run smoke tests
npm run test:smoke

# 5. Deploy to production
npm run deploy:production

# 6. Monitor deployment
npm run monitor:production
```

## 📊 Monitoring & Maintenance

### Health Checks
```bash
# API health
curl http://api.example.com/health

# Database health
npm run db:health

# Redis health
npm run cache:health
```

### Performance Monitoring
```javascript
// Log slow queries
prisma.$on('query', (e) => {
  if (e.duration > 100) {
    console.warn('Slow query:', e.query, e.duration);
  }
});

// Monitor API response times
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    if (duration > 500) {
      console.warn(`Slow endpoint: ${req.method} ${req.path} - ${duration}ms`);
    }
  });
  next();
});
```

## 🔐 Security Checklist

### Development Security
- [ ] No secrets in code
- [ ] Environment variables for sensitive data
- [ ] Input validation on all endpoints
- [ ] SQL injection prevention (use ORM)
- [ ] XSS protection enabled
- [ ] CORS properly configured
- [ ] Rate limiting implemented
- [ ] Authentication required where needed

### Security Commands
```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix

# Check for exposed secrets
npm run security:secrets

# Run security tests
npm run test:security
```

## 🎯 Best Practices

### Code Quality
1. **Write tests first** (TDD)
2. **Small, focused commits**
3. **Descriptive variable names**
4. **Handle errors gracefully**
5. **Document complex logic**

### Performance
1. **Profile before optimizing**
2. **Cache expensive operations**
3. **Lazy load when possible**
4. **Optimize database queries**
5. **Monitor bundle size**

### Collaboration
1. **Clear PR descriptions**
2. **Review code thoroughly**
3. **Communicate blockers early**
4. **Update documentation**
5. **Share knowledge**

## 📚 Resources

### Documentation
- [API Documentation](/docs/api)
- [Architecture Guide](/docs/architecture)
- [Contributing Guide](/CONTRIBUTING.md)
- [Security Policy](/SECURITY.md)

### Tools & Extensions
- **VS Code Extensions**:
  - ESLint
  - Prettier
  - GitLens
  - Thunder Client
  - Prisma

### Useful Scripts
```json
{
  "scripts": {
    "dev:debug": "NODE_OPTIONS='--inspect' npm run dev",
    "analyze": "ANALYZE=true npm run build",
    "deps:check": "npm-check-updates",
    "deps:update": "npm-check-updates -u && npm install",
    "clean:all": "rm -rf node_modules dist .next .turbo && npm install"
  }
}
```