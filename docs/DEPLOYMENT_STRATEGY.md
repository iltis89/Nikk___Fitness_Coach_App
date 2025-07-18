# NV Coaching Platform - Deployment Strategy

## 🎯 Ziel
Reales Test-Setup für Nikk (Trainer) und 5 Testkunden, damit beide Seiten (Dashboard & Mobile App) mit echten Daten getestet werden können.

## 🏗️ Architektur-Übersicht

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Nikks PC      │     │    Supabase     │     │  Kunde iPhone   │
│                 │     │                 │     │                 │
│  Dashboard      │────▶│   Database      │◀────│   Mobile App    │
│  (Vercel)       │     │   + Auth        │     │   (Expo)        │
└─────────────────┘     │   + API         │     └─────────────────┘
                        └─────────────────┘
```

## 📦 Hosting-Komponenten

### 1. **Backend (Datenbank + API)**
- **Service:** Supabase
- **Beinhaltet:**
  - PostgreSQL Datenbank
  - REST API (automatisch generiert)
  - Authentication Service
  - Realtime Subscriptions
- **URL:** `https://[projekt-name].supabase.co`
- **Kosten:** Kostenlos (500MB DB, 2GB Bandwidth, 50k Auth Users)

### 2. **Trainer Dashboard (Web)**
- **Service:** Railway
- **Technologie:** Next.js
- **Features:**
  - Automatische Deploys bei Git Push
  - SSL Zertifikat inklusive
  - Integrierte PostgreSQL möglich
- **URL:** `https://nv-dashboard.up.railway.app`
- **Kosten:** $5 Credit/Monat (Hobby Plan)

### 3. **Mobile App**
- **Service:** Expo + EAS (Expo Application Services)
- **Distribution:**
  - Entwicklung: Expo Go App
  - Testing: TestFlight (iOS)
  - Produktion: App Store
- **Features:**
  - Over-the-Air Updates
  - Asset Hosting
  - Push Notifications
- **Kosten:** Kostenlos (Entwicklung), $99/Jahr (App Store)

## 💰 Kostenübersicht

| Service | Free Tier | Bezahlt | Für 5 Tester ausreichend? |
|---------|-----------|---------|---------------------------|
| Supabase | 500MB DB, 2GB Transfer | $25/Monat | ✅ Ja |
| Vercel | 100GB Transfer | $20/Monat | ✅ Ja |
| Expo | Unlimited für Dev | $29/Monat | ✅ Ja |
| **TOTAL** | **$0/Monat** | $74/Monat | ✅ Kostenlos ausreichend |

## 🔄 Datenfluss-Beispiele

### Nikk legt neuen Kunden an:
```
1. Dashboard (Vercel) 
   ↓
2. POST /api/clients zu Supabase
   ↓
3. Kunde in PostgreSQL gespeichert
   ↓
4. Confirmation zurück ans Dashboard
```

### Kunde führt Training durch:
```
1. Mobile App (Expo)
   ↓
2. GET /api/workouts von Supabase
   ↓
3. Workout anzeigen
   ↓
4. POST /api/workout-logs nach Completion
   ↓
5. Realtime Update an Dashboard
```

## 🚀 Deployment Steps

### Phase 1: Backend Setup (30 Min)
1. Supabase Account erstellen
2. Neues Projekt anlegen
3. Database Schema importieren
4. Auth konfigurieren
5. API Keys notieren

### Phase 2: Dashboard Deployment (20 Min)
1. Vercel Account erstellen
2. GitHub Repo verbinden
3. Environment Variables setzen:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_KEY`
4. Deploy triggern

### Phase 3: Mobile App Setup (30 Min)
1. Expo/EAS Account erstellen
2. App konfigurieren mit Supabase
3. Development Build erstellen
4. TestFlight Setup (optional)

### Phase 4: Testing (10 Min)
1. Nikk: Testkunden anlegen
2. Kunden: App installieren & einloggen
3. Funktionen durchgehen
4. Feedback sammeln

## 🔐 Security Considerations

- **Row Level Security (RLS)** in Supabase aktivieren
- **API Keys** nur in Environment Variables
- **HTTPS** überall enforced
- **JWT Tokens** für Authentication
- **Rate Limiting** für API Calls

## 📊 Skalierungs-Pfad

```
5 Tester → 50 Beta User → 500 Early Access → 5000 Kunden
   ↓           ↓              ↓                ↓
Kostenlos   Kostenlos    $25/Monat      $100+/Monat
```

## 🛠️ Alternative Optionen

### Option 2: Railway + Vercel
- **Pro:** Mehr Kontrolle über Backend
- **Contra:** Komplexeres Setup
- **Kosten:** ~$10-15/Monat

### Option 3: AWS Amplify
- **Pro:** Sehr skalierbar
- **Contra:** Steile Lernkurve
- **Kosten:** Pay-per-use

### Option 4: Firebase
- **Pro:** Google Integration
- **Contra:** NoSQL Datenbank
- **Kosten:** Großzügiger Free Tier

## ✅ Nächste Schritte

1. [ ] Entscheidung über Hosting-Provider
2. [ ] Accounts erstellen
3. [ ] Backend Schema finalisieren
4. [ ] CI/CD Pipeline einrichten
5. [ ] Monitoring Setup
6. [ ] Backup-Strategie definieren

## 📞 Support & Dokumentation

- **Supabase Docs:** https://supabase.com/docs
- **Vercel Docs:** https://vercel.com/docs
- **Expo Docs:** https://docs.expo.dev

---

*Letzte Aktualisierung: 17.01.2025*