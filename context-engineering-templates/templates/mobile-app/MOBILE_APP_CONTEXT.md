# Mobile Application Context Template

## 📱 Mobile App Overview

### App Type
- [ ] Native iOS (Swift/SwiftUI)
- [ ] Native Android (Kotlin/Java)
- [ ] Cross-Platform (React Native)
- [ ] Cross-Platform (Flutter)
- [ ] Hybrid (Ionic/Capacitor)
- [ ] PWA Mobile

### Target Platforms
- **iOS**: Minimum version [X.X]
- **Android**: Minimum API level [XX]
- **Tablets**: [Supported/Not Supported]
- **Wearables**: [Apple Watch/WearOS]

## 🏗 Mobile Architecture

### Technology Stack
```json
{
  "framework": "[React Native/Flutter/Native]",
  "version": "[X.X.X]",
  "state-management": "[Redux/MobX/Provider/Bloc]",
  "navigation": "[React Navigation/Flutter Navigator]",
  "ui-components": "[Native Base/Flutter Material]",
  "offline-storage": "[AsyncStorage/SQLite/Realm]",
  "networking": "[Axios/Dio/Native]"
}
```

### Project Structure
```
src/
├── components/          # Reusable UI components
├── screens/            # Screen components
├── navigation/         # Navigation configuration
├── services/           # API and external services
├── store/              # State management
├── utils/              # Helper functions
├── assets/             # Images, fonts, etc.
└── native/             # Platform-specific code
    ├── ios/
    └── android/
```

## 📲 Platform-Specific Features

### iOS Features
- [ ] Push Notifications (APNS)
- [ ] Apple Pay
- [ ] Face ID/Touch ID
- [ ] Siri Shortcuts
- [ ] Widgets
- [ ] App Clips

### Android Features
- [ ] Push Notifications (FCM)
- [ ] Google Pay
- [ ] Biometric Authentication
- [ ] App Shortcuts
- [ ] Widgets
- [ ] Instant Apps

### Permissions Required
```javascript
// iOS Info.plist
{
  "NSCameraUsageDescription": "[Why camera needed]",
  "NSLocationWhenInUseUsageDescription": "[Why location needed]",
  "NSPhotoLibraryUsageDescription": "[Why photos needed]"
}

// Android Manifest
{
  "android.permission.CAMERA": "[Why needed]",
  "android.permission.ACCESS_FINE_LOCATION": "[Why needed]",
  "android.permission.READ_EXTERNAL_STORAGE": "[Why needed]"
}
```

## 🎨 UI/UX Design

### Design System
- **Design Language**: [Material Design/Human Interface]
- **Primary Color**: #[HEX]
- **Typography**: [Font families and sizes]
- **Icons**: [Icon library used]
- **Animations**: [Lottie/Native/Reanimated]

### Screen Layouts
```
1. Onboarding Flow
   - Welcome → Features → Permissions → Sign Up

2. Main Navigation
   - Tab Bar: [Home, Search, Profile, Settings]
   - Drawer: [Additional options]

3. Content Screens
   - List views with pull-to-refresh
   - Detail views with gestures
   - Forms with validation
```

## 🔄 Offline Functionality

### Offline Strategy
- **Data Sync**: [Strategy for syncing when online]
- **Cache Duration**: [How long data stays fresh]
- **Conflict Resolution**: [How conflicts are handled]
- **Queue Management**: [For offline actions]

### Local Storage
```javascript
// Data persistence layers
{
  "user-preferences": "AsyncStorage",
  "cached-content": "SQLite",
  "images": "File System Cache",
  "secure-data": "Keychain/Keystore"
}
```

## 🔐 Security & Authentication

### Authentication Methods
- [ ] Email/Password
- [ ] Social Login (Google, Apple, Facebook)
- [ ] Biometric (FaceID/TouchID/Fingerprint)
- [ ] SMS/OTP
- [ ] Magic Links

### Security Implementation
```javascript
// Secure storage example
import * as Keychain from 'react-native-keychain';

// Store sensitive data
await Keychain.setInternetCredentials(
  'myapp.com',
  username,
  password
);

// Retrieve sensitive data
const credentials = await Keychain.getInternetCredentials('myapp.com');
```

## 📍 Native Features Integration

### Device Features
```javascript
// Camera integration
import { Camera } from 'react-native-camera';

// Location services
import Geolocation from '@react-native-community/geolocation';

// Push notifications
import messaging from '@react-native-firebase/messaging';

// Biometrics
import TouchID from 'react-native-touch-id';
```

### Background Tasks
- [ ] Background Fetch
- [ ] Background Location
- [ ] Silent Push Notifications
- [ ] Background Audio
- [ ] Download Manager

## 🚀 Performance Optimization

### Performance Targets
- **App Launch**: < [X] seconds
- **Screen Transitions**: < [X]ms
- **List Scrolling**: 60 FPS
- **Memory Usage**: < [X]MB
- **Battery Impact**: Minimal

### Optimization Techniques
```javascript
// List optimization
<FlatList
  data={data}
  renderItem={renderItem}
  keyExtractor={keyExtractor}
  windowSize={10}
  maxToRenderPerBatch={10}
  removeClippedSubviews={true}
  getItemLayout={getItemLayout} // For fixed height items
/>

// Image optimization
<FastImage
  source={{ uri: imageUrl }}
  style={styles.image}
  resizeMode={FastImage.resizeMode.cover}
/>

// Memoization
const MemoizedComponent = React.memo(Component, arePropsEqual);
```

## 📊 Analytics & Monitoring

### Analytics Events
```javascript
// Track user actions
analytics.track('button_pressed', {
  screen: 'home',
  button: 'start_workout',
  timestamp: Date.now()
});

// Track screen views
analytics.screen('ProfileScreen', {
  userId: user.id
});

// Track errors
crashlytics.recordError(error, {
  screen: currentScreen,
  action: lastAction
});
```

### Performance Monitoring
- **Crash Reporting**: [Crashlytics/Sentry]
- **Performance**: [Firebase Performance/Custom]
- **User Sessions**: [Analytics tool]
- **A/B Testing**: [Platform used]

## 🧪 Testing Strategy

### Test Types
```javascript
// Unit tests
describe('UserService', () => {
  it('should fetch user data', async () => {
    const user = await UserService.getUser('123');
    expect(user).toHaveProperty('id');
  });
});

// Integration tests
describe('Login Flow', () => {
  it('should navigate to home after login', async () => {
    // Test navigation flow
  });
});

// E2E tests (Detox/Appium)
describe('Complete User Journey', () => {
  it('should complete onboarding', async () => {
    await device.launchApp();
    await element(by.id('get-started')).tap();
    // Continue test...
  });
});
```

## 📦 Build & Deployment

### Build Configuration
```json
// iOS build settings
{
  "ios": {
    "bundleIdentifier": "com.company.app",
    "buildNumber": "1.0.0",
    "supportsTablet": true,
    "infoPlist": {
      "CFBundleDisplayName": "App Name"
    }
  }
}

// Android build settings
{
  "android": {
    "package": "com.company.app",
    "versionCode": 1,
    "adaptiveIcon": {
      "foregroundImage": "./assets/adaptive-icon.png"
    }
  }
}
```

### Release Process
1. **Version Bump**: Update version numbers
2. **Build**: Generate release builds
3. **Testing**: Run automated tests
4. **Code Signing**: Sign with certificates
5. **Upload**: Submit to stores
6. **Release Notes**: Write changelog

## 🏪 App Store Optimization

### Store Listing
- **App Name**: [Name]
- **Keywords**: [Keyword list]
- **Description**: [Short and long descriptions]
- **Screenshots**: [Required sizes and content]
- **App Preview**: [Video requirements]

### Rating & Reviews
- **In-App Review**: [When to prompt]
- **Response Strategy**: [How to handle reviews]
- **Rating Threshold**: [Minimum for prompts]

## 🔄 Update Strategy

### Update Mechanisms
- [ ] App Store/Play Store Updates
- [ ] Over-the-Air Updates (CodePush)
- [ ] Force Update for Critical Changes
- [ ] A/B Testing Updates

### Version Management
```javascript
// Version check
const currentVersion = DeviceInfo.getVersion();
const latestVersion = await api.getLatestVersion();

if (isUpdateRequired(currentVersion, latestVersion)) {
  showUpdatePrompt();
}
```

## 🌐 Localization

### Supported Languages
- [ ] English (en)
- [ ] German (de)
- [ ] Spanish (es)
- [ ] [Other languages]

### Implementation
```javascript
// i18n setup
import i18n from 'i18n-js';
import * as Localization from 'expo-localization';

i18n.translations = {
  en: require('./locales/en.json'),
  de: require('./locales/de.json'),
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

// Usage
<Text>{i18n.t('welcome.title')}</Text>
```

## 💰 Monetization

### Revenue Models
- [ ] Premium/Freemium
- [ ] In-App Purchases
- [ ] Subscriptions
- [ ] Ads
- [ ] Paid App

### Implementation
```javascript
// In-app purchases
import * as InAppPurchases from 'react-native-iap';

const products = await InAppPurchases.getProducts(productIds);
const purchase = await InAppPurchases.requestPurchase(productId);
```