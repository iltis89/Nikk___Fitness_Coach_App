# AI Agent Instructions

## 🤖 Agent Configuration

### Primary Directives
1. **Code Quality First** - Always prioritize clean, maintainable code
2. **Security by Default** - Never compromise on security
3. **Performance Aware** - Consider performance implications
4. **User Experience Focus** - Optimize for end-user experience
5. **Documentation** - Document complex logic and decisions

### Behavioral Guidelines
- Be proactive but not presumptuous
- Ask for clarification when requirements are ambiguous
- Suggest best practices and improvements
- Warn about potential issues or anti-patterns
- Provide reasoning for technical decisions

## 🎭 Swarm Agent System

### Sub-Agent Activation
When working on complex tasks, you can activate specialized sub-agents:

```bash
# Power Commands (Full Swarm Activation)
FEATURE-ADD: [Name]    # Complete feature with all agents
UI-UPDATE: [Change]    # Smart UI modifications
CRUD: [Resource]       # Instant Model+API+UI+Tests
FIX: [Bug]            # Root cause analysis + fix
OPTIMIZE: [Metric]     # Performance optimization
FEEDBACK-REVIEW        # Process visual feedback

# Individual Agent Triggers
PROD:   # Product requirements & planning
ARCH:   # System architecture design
CODE:   # Implementation
TEST:   # Testing strategy & execution
REVIEW: # Code quality review
UI/UX:  # Design & frontend
DEVOPS: # Infrastructure & deployment
```

### Swarm Communication
Agents communicate autonomously to:
- Share discoveries and insights
- Request assistance from specialists
- Validate decisions collectively
- Learn from each other's outputs

For detailed swarm workflows, see: `SWARM_AGENT_WORKFLOW.md`

## 🎯 Task Execution

### Task Understanding
```
When receiving a task:
1. Analyze requirements thoroughly
2. Identify potential edge cases
3. Consider security implications
4. Plan implementation approach
5. Estimate complexity and effort
```

### Implementation Strategy
```
For each feature:
1. Review existing code patterns
2. Follow established conventions
3. Write tests first (TDD)
4. Implement incrementally
5. Refactor for clarity
6. Document as needed
```

## 💻 Code Generation Rules

### TypeScript/JavaScript
```typescript
// ALWAYS use TypeScript with strict typing
// PREFER functional programming patterns
// AVOID any type unless absolutely necessary
// USE descriptive variable and function names

// ✅ GOOD
interface UserData {
  id: string;
  email: string;
  createdAt: Date;
}

async function fetchUserById(userId: string): Promise<UserData> {
  // Implementation
}

// ❌ AVOID
function getData(id: any) {
  // Unclear function name, any type, no return type
}
```

### React Components
```tsx
// PREFER functional components with TypeScript
// USE proper prop interfaces
// IMPLEMENT error boundaries where appropriate
// OPTIMIZE with memo/useCallback when needed

interface ComponentProps {
  title: string;
  onAction: () => void;
  children?: React.ReactNode;
}

export const Component: React.FC<ComponentProps> = memo(({ 
  title, 
  onAction, 
  children 
}) => {
  // Component implementation
});
```

### API Design
```typescript
// FOLLOW RESTful conventions
// USE consistent response formats
// IMPLEMENT proper error handling
// VALIDATE all inputs

// Response format
{
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    page: number;
    total: number;
  };
}
```

## 🔍 Code Review Criteria

### Before Implementing
- [ ] Is this the simplest solution?
- [ ] Does it follow existing patterns?
- [ ] Are there security concerns?
- [ ] Will it scale appropriately?
- [ ] Is it testable?

### After Implementation
- [ ] Code is clean and readable
- [ ] No hardcoded values
- [ ] Proper error handling
- [ ] Tests are comprehensive
- [ ] Documentation is clear
- [ ] No console.logs in production
- [ ] Performance is acceptable

## 🚀 Feature Development

### Standard Feature Workflow
```bash
1. Understand requirements
2. Design data model
3. Create API endpoints
4. Implement business logic
5. Build UI components
6. Write comprehensive tests
7. Handle edge cases
8. Optimize performance
9. Document usage
```

### Feature Checklist
```markdown
## Feature: [Name]

### Planning
- [ ] Requirements clear
- [ ] Design approved
- [ ] Dependencies identified
- [ ] Timeline estimated

### Implementation
- [ ] Database schema updated
- [ ] API endpoints created
- [ ] Business logic implemented
- [ ] UI components built
- [ ] Tests written
- [ ] Documentation updated

### Quality
- [ ] Code reviewed
- [ ] Tests passing
- [ ] Performance verified
- [ ] Security checked
- [ ] Accessibility confirmed
```

## 🛡 Security Guidelines

### Always Check
1. **Input Validation** - Validate all user inputs
2. **Authentication** - Verify user identity
3. **Authorization** - Check permissions
4. **Data Sanitization** - Clean user data
5. **Encryption** - Protect sensitive data

### Never Do
- Store passwords in plain text
- Trust user input without validation
- Expose sensitive information in logs
- Use eval() or similar dangerous functions
- Hardcode secrets or credentials

## 🎨 UI/UX Principles

### Design Guidelines
1. **Consistency** - Use established patterns
2. **Feedback** - Provide clear user feedback
3. **Accessibility** - Support all users
4. **Performance** - Keep interfaces responsive
5. **Simplicity** - Avoid unnecessary complexity

### Component Standards
```tsx
// Accessibility first
<button 
  aria-label="Save changes"
  disabled={isLoading}
  onClick={handleSave}
>
  {isLoading ? <Spinner /> : 'Save'}
</button>

// Error states
{error && (
  <Alert variant="error" role="alert">
    {error.message}
  </Alert>
)}

// Loading states
{isLoading ? (
  <Skeleton />
) : (
  <Content />
)}
```

## 📊 Performance Optimization

### Frontend Optimization
```typescript
// Lazy load components
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// Memoize expensive calculations
const result = useMemo(() => expensiveCalculation(data), [data]);

// Debounce user input
const debouncedSearch = useDebouncedCallback(
  (query) => search(query),
  300
);

// Virtualize long lists
<VirtualList
  items={items}
  renderItem={renderItem}
  itemHeight={50}
/>
```

### Backend Optimization
```typescript
// Use database indexes
await prisma.$executeRaw`
  CREATE INDEX idx_users_email ON users(email);
`;

// Implement caching
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

// Batch operations
const results = await Promise.all(
  ids.map(id => fetchData(id))
);

// Use pagination
const items = await prisma.item.findMany({
  skip: (page - 1) * limit,
  take: limit,
});
```

## 🧪 Testing Requirements

### Test Coverage
- Unit tests for utilities and services
- Integration tests for API endpoints
- Component tests for UI elements
- E2E tests for critical user flows
- Performance tests for bottlenecks

### Test Structure
```typescript
describe('Feature', () => {
  // Setup
  beforeEach(() => {
    // Arrange test environment
  });

  // Happy path
  it('should work correctly with valid input', () => {
    // Test normal operation
  });

  // Edge cases
  it('should handle edge case X', () => {
    // Test boundaries
  });

  // Error cases
  it('should fail gracefully with invalid input', () => {
    // Test error handling
  });

  // Cleanup
  afterEach(() => {
    // Clean up test environment
  });
});
```

## 🔄 Refactoring Guidelines

### When to Refactor
- Code is duplicated in multiple places
- Function/class is too large (>50 lines)
- Logic is hard to understand
- Performance issues identified
- New requirements make current structure inadequate

### Refactoring Process
1. Ensure comprehensive test coverage
2. Make small, incremental changes
3. Run tests after each change
4. Document significant changes
5. Review performance impact

## 📝 Documentation Standards

### Code Comments
```typescript
/**
 * Calculates the user's risk score based on their profile.
 * 
 * @param profile - User profile data
 * @returns Risk score between 0-100
 * @throws {ValidationError} If profile data is invalid
 * 
 * @example
 * const score = calculateRiskScore({ age: 25, income: 50000 });
 */
function calculateRiskScore(profile: UserProfile): number {
  // Complex algorithm explanation here
}
```

### README Updates
```markdown
## Feature Name

### Overview
Brief description of what this feature does.

### Usage
```typescript
// Code example showing how to use the feature
```

### Configuration
List any configuration options.

### API Reference
Document public APIs.
```

## 🚨 Error Handling

### Error Patterns
```typescript
// Custom error classes
class BusinessError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode: number = 400
  ) {
    super(message);
    this.name = 'BusinessError';
  }
}

// Consistent error handling
try {
  const result = await riskyOperation();
  return { success: true, data: result };
} catch (error) {
  logger.error('Operation failed:', error);
  
  if (error instanceof BusinessError) {
    return { 
      success: false, 
      error: {
        code: error.code,
        message: error.message
      }
    };
  }
  
  // Generic error response
  return { 
    success: false, 
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred'
    }
  };
}
```

## 🎯 Decision Making

### Technical Decisions
When making technical choices:
1. Consider long-term maintainability
2. Evaluate performance implications
3. Assess security impact
4. Check compatibility requirements
5. Review team expertise

### Trade-offs
Document significant trade-offs:
```markdown
### Decision: Use Redis for session storage

**Pros:**
- Fast access times
- Built-in expiration
- Horizontal scalability

**Cons:**
- Additional infrastructure
- Memory constraints
- Persistence complexity

**Decision:** Proceeded with Redis due to performance requirements
```

## 🔧 Debugging Approach

### Systematic Debugging
1. **Reproduce** - Consistently reproduce the issue
2. **Isolate** - Narrow down the problem area
3. **Hypothesize** - Form theories about the cause
4. **Test** - Verify theories systematically
5. **Fix** - Implement minimal necessary fix
6. **Verify** - Ensure fix works and doesn't break other things

### Debug Helpers
```typescript
// Conditional logging
if (process.env.DEBUG) {
  console.log('Debug info:', { state, props });
}

// Performance timing
console.time('operation');
await expensiveOperation();
console.timeEnd('operation');

// Object inspection
console.dir(complexObject, { depth: null });
```