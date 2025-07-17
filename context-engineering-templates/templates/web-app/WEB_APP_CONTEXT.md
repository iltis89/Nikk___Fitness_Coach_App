# Web Application Context Template

## 🌐 Web App Overview

### Application Type
- [ ] Single Page Application (SPA)
- [ ] Server-Side Rendered (SSR)
- [ ] Static Site Generation (SSG)
- [ ] Progressive Web App (PWA)
- [ ] Hybrid Approach

### Target Audience
- **Primary Users**: [Description]
- **User Volume**: [Expected concurrent users]
- **Geographic Distribution**: [Local/Regional/Global]
- **Device Types**: [Desktop/Mobile/Tablet percentages]

## 🎨 Frontend Architecture

### Framework & Libraries
```javascript
{
  "framework": "[React/Vue/Angular/Svelte]",
  "version": "[X.X.X]",
  "ui-library": "[Material-UI/Tailwind/Bootstrap]",
  "state-management": "[Redux/Zustand/MobX/Pinia]",
  "routing": "[React Router/Vue Router/etc]",
  "forms": "[React Hook Form/Formik/etc]",
  "data-fetching": "[React Query/SWR/Apollo]"
}
```

### Component Structure
```
components/
├── common/           # Shared UI components
│   ├── Button/
│   ├── Modal/
│   └── Form/
├── layout/          # Layout components
│   ├── Header/
│   ├── Footer/
│   └── Sidebar/
└── features/        # Feature-specific components
    ├── auth/
    ├── dashboard/
    └── profile/
```

### Design System
- **Colors**: Primary: #[HEX], Secondary: #[HEX]
- **Typography**: Font Family, Sizes, Weights
- **Spacing**: Base unit: [X]px
- **Breakpoints**: Mobile: [X]px, Tablet: [X]px, Desktop: [X]px

## 📱 Responsive Design

### Mobile-First Approach
```css
/* Base mobile styles */
.component { }

/* Tablet and up */
@media (min-width: 768px) { }

/* Desktop and up */
@media (min-width: 1024px) { }
```

### Performance Targets
- **First Contentful Paint**: < [X]s
- **Time to Interactive**: < [X]s
- **Largest Contentful Paint**: < [X]s
- **Cumulative Layout Shift**: < [X]

## 🔌 API Integration

### API Communication
```typescript
// Base API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL;

// API client setup
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for auth
apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Data Management
- **Caching Strategy**: [Cache-first/Network-first/etc]
- **Offline Support**: [Yes/No - Implementation details]
- **Real-time Updates**: [WebSockets/SSE/Polling]

## 🔐 Authentication & Authorization

### Auth Implementation
- **Method**: [JWT/OAuth/SAML/etc]
- **Storage**: [LocalStorage/SessionStorage/Cookies]
- **Token Refresh**: [Strategy]
- **Protected Routes**: [Implementation]

### Permission System
```typescript
// Role-based access control
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
  GUEST = 'guest'
}

// Route protection
<ProtectedRoute 
  path="/admin" 
  requiredRole={UserRole.ADMIN}
  component={AdminDashboard} 
/>
```

## 🎯 Key Features

### Feature List
1. **[Feature 1]**
   - Description: [What it does]
   - Priority: [High/Medium/Low]
   - Status: [Planned/In Progress/Complete]

2. **[Feature 2]**
   - Description: [What it does]
   - Priority: [High/Medium/Low]
   - Status: [Planned/In Progress/Complete]

### User Flows
```
1. Authentication Flow
   Login → Verify → Dashboard → Logout

2. Main User Journey
   Landing → Browse → Select → Action → Confirmation
```

## 🚀 Deployment Strategy

### Build Configuration
```json
{
  "build": {
    "outputDir": "dist",
    "publicPath": "/",
    "sourceMaps": false,
    "optimization": {
      "splitChunks": true,
      "minify": true,
      "treeshake": true
    }
  }
}
```

### Hosting
- **Platform**: [Vercel/Netlify/AWS/etc]
- **CDN**: [CloudFlare/AWS CloudFront/etc]
- **Domain**: [example.com]
- **SSL**: [Let's Encrypt/Custom]

### Environment Management
```bash
# Development
.env.development

# Staging
.env.staging

# Production
.env.production
```

## 📊 Analytics & Monitoring

### Analytics Tools
- **User Analytics**: [Google Analytics/Mixpanel/etc]
- **Error Tracking**: [Sentry/Rollbar/etc]
- **Performance**: [Web Vitals/Lighthouse CI]
- **User Feedback**: [Hotjar/FullStory/etc]

### Monitoring Setup
```javascript
// Error boundary
class ErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    // Log to error tracking service
    errorTracker.logError(error, errorInfo);
  }
}

// Performance monitoring
if ('performance' in window) {
  window.addEventListener('load', () => {
    const perfData = performance.getEntriesByType('navigation')[0];
    analytics.track('page_performance', perfData);
  });
}
```

## 🧪 Testing Strategy

### Test Types
- **Unit Tests**: Components, Utilities
- **Integration Tests**: API interactions
- **E2E Tests**: Critical user flows
- **Visual Regression**: UI consistency

### Test Setup
```javascript
// Jest configuration
module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  }
};
```

## 🔒 Security Considerations

### Frontend Security
- [ ] XSS Prevention
- [ ] CSRF Protection
- [ ] Content Security Policy
- [ ] Secure Cookie Handling
- [ ] Input Sanitization
- [ ] Dependency Scanning

### Security Headers
```javascript
// Security headers configuration
{
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "geolocation=(), microphone=(), camera=()"
}
```

## 📦 Bundle Optimization

### Optimization Techniques
- **Code Splitting**: Route-based, Component-based
- **Lazy Loading**: Images, Components, Routes
- **Tree Shaking**: Remove unused code
- **Compression**: Gzip/Brotli
- **Asset Optimization**: Images, Fonts

### Bundle Analysis
```bash
# Analyze bundle size
npm run build:analyze

# Performance budgets
{
  "budgets": [
    {
      "type": "bundle",
      "name": "main",
      "maximumWarning": "200kb",
      "maximumError": "300kb"
    }
  ]
}
```

## 🌐 Internationalization

### i18n Setup
- **Languages**: [en, de, fr, etc]
- **Library**: [i18next/react-intl/etc]
- **Translation Management**: [Process/Tools]

### Implementation
```javascript
// i18n configuration
i18n.init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

// Usage in components
const { t } = useTranslation();
<h1>{t('welcome.title')}</h1>
```

## 🔄 State Management

### Global State Structure
```typescript
interface AppState {
  auth: {
    user: User | null;
    isAuthenticated: boolean;
  };
  ui: {
    theme: 'light' | 'dark';
    sidebarOpen: boolean;
  };
  data: {
    items: Item[];
    loading: boolean;
    error: Error | null;
  };
}
```

### State Management Patterns
- **Actions**: [Patterns used]
- **Selectors**: [Memoization strategy]
- **Middleware**: [Logging, Async, etc]
- **Persistence**: [Local storage sync]