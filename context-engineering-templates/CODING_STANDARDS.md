# Coding Standards & Best Practices

## 🎯 Core Principles

### 1. KISS - Keep It Simple, Stupid
- Prefer simple, readable solutions
- Avoid over-engineering
- If it takes more than 5 seconds to understand, refactor

### 2. DRY - Don't Repeat Yourself
- Extract common logic into functions/components
- Use configuration over duplication
- Create reusable utilities

### 3. YAGNI - You Aren't Gonna Need It
- Build only what's required now
- Avoid speculative features
- Add complexity only when proven necessary

### 4. SOLID Principles
- **S**ingle Responsibility
- **O**pen/Closed
- **L**iskov Substitution
- **I**nterface Segregation
- **D**ependency Inversion

## 📝 Code Style Guidelines

### TypeScript/JavaScript

#### Naming Conventions
```typescript
// Classes: PascalCase
class UserService {}

// Interfaces: PascalCase with 'I' prefix (optional)
interface IUserData {}
interface UserData {} // Preferred

// Functions/Methods: camelCase
function calculateTotal() {}
const getUserById = () => {}

// Constants: UPPER_SNAKE_CASE
const MAX_RETRIES = 3;
const API_BASE_URL = 'https://api.example.com';

// Variables: camelCase
const userName = 'John';
let isLoading = false;

// Private members: underscore prefix
class Service {
  private _cache = new Map();
}

// Enums: PascalCase with UPPER_SNAKE_CASE values
enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
  GUEST = 'GUEST'
}
```

#### Type Safety
```typescript
// ✅ GOOD: Explicit types
function calculatePrice(quantity: number, price: number): number {
  return quantity * price;
}

// ❌ BAD: Implicit any
function calculatePrice(quantity, price) {
  return quantity * price;
}

// ✅ GOOD: Type guards
function isUser(obj: unknown): obj is User {
  return obj !== null && 
         typeof obj === 'object' && 
         'id' in obj && 
         'email' in obj;
}

// ✅ GOOD: Discriminated unions
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };
```

#### Error Handling
```typescript
// ✅ GOOD: Explicit error handling
async function fetchUser(id: string): Promise<Result<User>> {
  try {
    const user = await api.get(`/users/${id}`);
    return { success: true, data: user };
  } catch (error) {
    console.error('Failed to fetch user:', error);
    return { success: false, error: error.message };
  }
}

// ✅ GOOD: Custom error classes
class ValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

### React/Component Guidelines

#### Component Structure
```tsx
// ✅ GOOD: Functional component with TypeScript
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  label, 
  onClick, 
  variant = 'primary',
  disabled = false 
}) => {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
```

#### Hooks Best Practices
```typescript
// ✅ GOOD: Custom hook with clear return
function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [userId]);

  return { user, loading, error };
}

// ✅ GOOD: Memoization when needed
const expensiveValue = useMemo(
  () => computeExpensiveValue(props.data),
  [props.data]
);
```

## 🏗 Architecture Patterns

### Folder Structure
```
src/
├── components/          # Reusable UI components
│   ├── common/         # Generic components
│   └── specific/       # Feature-specific components
├── features/           # Feature-based modules
│   └── auth/
│       ├── components/
│       ├── hooks/
│       ├── services/
│       └── types.ts
├── hooks/              # Global custom hooks
├── services/           # API and external services
├── utils/              # Helper functions
├── types/              # Global TypeScript types
└── constants/          # App-wide constants
```

### Service Layer Pattern
```typescript
// services/api/base.service.ts
class BaseApiService {
  protected async request<T>(
    method: string,
    endpoint: string,
    data?: any
  ): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method,
      headers: this.getHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    if (!response.ok) {
      throw new ApiError(response.status, await response.text());
    }
    
    return response.json();
  }
}

// services/api/user.service.ts
class UserService extends BaseApiService {
  async getUser(id: string): Promise<User> {
    return this.request<User>('GET', `/users/${id}`);
  }
  
  async updateUser(id: string, data: Partial<User>): Promise<User> {
    return this.request<User>('PATCH', `/users/${id}`, data);
  }
}
```

## 🧪 Testing Standards

### Test Structure
```typescript
describe('UserService', () => {
  describe('getUser', () => {
    it('should return user data for valid ID', async () => {
      // Arrange
      const userId = '123';
      const expectedUser = { id: userId, name: 'John' };
      
      // Act
      const result = await userService.getUser(userId);
      
      // Assert
      expect(result).toEqual(expectedUser);
    });
    
    it('should throw error for invalid ID', async () => {
      // Test error cases
    });
  });
});
```

### Testing Best Practices
- Write tests before fixing bugs
- Test behavior, not implementation
- Use descriptive test names
- Follow AAA pattern (Arrange, Act, Assert)
- Mock external dependencies

## 🔒 Security Guidelines

### Input Validation
```typescript
// Always validate and sanitize input
import { z } from 'zod';

const UserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100),
  age: z.number().int().positive().max(150),
});

function validateUser(data: unknown): User {
  return UserSchema.parse(data);
}
```

### Sensitive Data
```typescript
// ❌ BAD: Hardcoded secrets
const API_KEY = "sk-1234567890";

// ✅ GOOD: Environment variables
const API_KEY = process.env.API_KEY;

// ✅ GOOD: Never log sensitive data
console.log('User logged in:', { 
  id: user.id, 
  email: user.email 
  // Never include: password, tokens, etc.
});
```

## 🚀 Performance Guidelines

### Optimization Strategies
```typescript
// ✅ GOOD: Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// ✅ GOOD: Debounce expensive operations
const debouncedSearch = useMemo(
  () => debounce(searchFunction, 300),
  [searchFunction]
);

// ✅ GOOD: Virtual scrolling for long lists
<VirtualList
  items={items}
  height={600}
  itemHeight={50}
  renderItem={renderItem}
/>
```

### Bundle Size
- Use dynamic imports for large dependencies
- Tree-shake unused code
- Analyze bundle with webpack-bundle-analyzer
- Target < 200KB initial JS bundle

## 📦 Git Conventions

### Branch Naming
- `feature/[ticket-id]-brief-description`
- `fix/[ticket-id]-brief-description`
- `chore/brief-description`
- `hotfix/critical-issue`

### Commit Messages
```bash
# Format: <type>(<scope>): <subject>

feat(auth): add OAuth2 integration
fix(ui): resolve button alignment issue
docs(api): update endpoint documentation
refactor(user): extract validation logic
test(auth): add integration tests
chore(deps): update dependencies
```

### PR Guidelines
- Keep PRs small (< 400 lines changed)
- Write descriptive PR descriptions
- Include screenshots for UI changes
- Link related issues
- Ensure all tests pass

## 🎨 UI/UX Code Standards

### Component Props
```typescript
// ✅ GOOD: Consistent prop interfaces
interface ComponentProps {
  // Required props first
  id: string;
  title: string;
  
  // Optional props with defaults
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  
  // Event handlers
  onClick?: () => void;
  onChange?: (value: string) => void;
  
  // Style overrides last
  className?: string;
  style?: React.CSSProperties;
}
```

### Accessibility
```tsx
// ✅ GOOD: Accessible components
<button
  aria-label="Close dialog"
  aria-pressed={isPressed}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  <CloseIcon aria-hidden="true" />
</button>

// ✅ GOOD: Semantic HTML
<nav aria-label="Main navigation">
  <ul role="list">
    <li><a href="/home">Home</a></li>
  </ul>
</nav>
```

## 🔄 Code Review Checklist

### Before Submitting PR
- [ ] Code follows style guidelines
- [ ] No hardcoded values
- [ ] Error handling implemented
- [ ] Tests written/updated
- [ ] No console.logs in production code
- [ ] Documentation updated
- [ ] Performance impact considered
- [ ] Security implications reviewed

### Review Focus Areas
1. **Logic Correctness**: Does it solve the problem?
2. **Code Quality**: Is it maintainable?
3. **Performance**: Will it scale?
4. **Security**: Are there vulnerabilities?
5. **Testing**: Is it properly tested?
6. **Documentation**: Will others understand it?

## 📚 Resources & Tools

### Recommended Tools
- **Linting**: ESLint with TypeScript
- **Formatting**: Prettier
- **Type Checking**: TypeScript strict mode
- **Testing**: Jest/Vitest + React Testing Library
- **Documentation**: JSDoc for complex functions

### Configuration Files
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true
  }
}
```

```javascript
// .eslintrc.js
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  rules: {
    'no-console': 'warn',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'react/react-in-jsx-scope': 'off'
  }
};
```