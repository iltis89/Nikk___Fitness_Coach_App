# NV Coaching Platform - KI-Agent Dokumentation

## 🚀 Development Quick Reference

### Power Commands (Empfohlen)
```
FEATURE-ADD: [Name]    → Komplettes Feature automatisch
UI-UPDATE: [Change]    → Intelligente UI-Änderungen  
CRUD: [Resource]       → Instant Model+API+UI+Tests
FIX: [Bug]            → Root Cause + Fix + Test
OPTIMIZE: [Metric]     → Performance-Optimierung
```

### Sub-Agent Triggers (für Kontrolle)
```
PROD:   → Business Value definieren
ARCH:   → System Design planen
CODE:   → Implementieren
TEST:   → Tests schreiben
REVIEW: → Code prüfen
```

**Hauptdokumentation**: [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
**UI-Spezifisch**: [UI_SWARM_WORKFLOW.md](./UI_SWARM_WORKFLOW.md)

## Projektübersicht
Dies ist eine Fitness-Coaching-Plattform für Nikk Viererbl (NV Coaching), bestehend aus einem Trainer-Dashboard und einer Kunden-App.

## Technologie-Stack
- **Monorepo**: Turborepo
- **Backend**: Node.js, TypeScript, Express/Fastify, PostgreSQL, Prisma, Redis
- **Trainer-Dashboard**: Next.js 14, TypeScript, Tailwind CSS, Zustand, TanStack Query
- **Mobile App**: React Native mit Expo
- **KI-Services**: OpenAI/Claude API, Vector DB (Pinecone/Weaviate)
- **Deployment**: Vercel (Web), Railway/Render (Backend), Expo EAS (Mobile)

## Projektstruktur
```
nv-coaching-platform/
├── apps/
│   ├── trainer-dashboard/    # Next.js Web-App für Nikk
│   └── mobile-app/           # React Native App für Kunden
├── packages/
│   ├── shared/              # Geteilte Business-Logik & Types
│   ├── ui/                  # Gemeinsame UI-Komponenten
│   ├── api/                 # Backend API
│   ├── database/            # Prisma Schema & Migrations
│   └── ai-services/         # KI-Features & Digital Twin
├── docs/                    # Projektdokumentation
└── infrastructure/          # Docker & Deployment Configs
```

## Wichtige Features

### Trainer-Dashboard
- Kundenverwaltung (50 Kunden)
- Hautfaltenmessung & Körperanalyse
- KI-gestützte Trainingsfortschritt-Vorhersage
- Anomalie-Erkennung bei Messwerten
- KI-Ernährungsplan-Erstellung
- Terminverwaltung

### Kunden-App
- Trainings- und Ernährungspläne
- Fortschritts-Dashboard
- Video-Upload für Übungsausführung
- KI-Coach (Digital Twin von Nikk)
- Offline-Funktionalität
- Minimalistisches, helles Design

## Design-Prinzipien
- **"Weniger ist mehr"** - Kein Mehraufwand für Kunden
- **Minimalistisch & Hell** - Einfache Bedienung für alle Altersgruppen
- **Wissenschaftlich fundiert** - "Only what gets measured gets managed"
- **Offline-First** - Funktioniert auch ohne Internet

## Entwicklungs-Befehle
```bash
# Installation
npm install

# Entwicklung starten
npm run dev

# Build
npm run build

# Tests
npm run test

# Linting
npm run lint

# Type-Checking
npm run typecheck

# Code formatieren
npm run format
```

## KI-Agent Best Practices
1. **Immer TypeScript verwenden** - Für bessere Code-Qualität
2. **Offline-First denken** - React Query mit Cache-Strategien
3. **Minimalistisches UI** - Wenige, klare Aktionen pro Screen
4. **Performance** - Lazy Loading, Code Splitting verwenden
5. **Sicherheit** - Niemals sensible Daten im Code speichern

## Code-Qualität
- **Clean Code**: Siehe `docs/CODING_STANDARDS.md` für detaillierte Richtlinien
- **Keine Kommentare**: Code sollte selbsterklärend sein
- **Testing**: Immer Unit Tests für kritische Funktionen schreiben
- **Error Handling**: Nutzer-freundliche Fehlermeldungen auf Deutsch

## Wichtige Überlegungen
- MVP-Ansatz: Kostengünstig starten, später zu SaaS skalieren
- DSGVO wird später wichtig (Gesundheitsdaten!)
- Fokus auf Benutzerfreundlichkeit für 50+ Jährige
- Video-Uploads benötigen gute Kompression & CDN

## Nächste Schritte
1. Prisma Schema für Datenmodelle erstellen
2. API-Endpunkte definieren
3. UI-Komponenten-Library aufbauen
4. KI-Services integrieren
5. Offline-Sync implementieren

## Projekt-Konventionen
- **Branches**: `feature/`, `fix/`, `chore/` Präfixe verwenden
- **Commits**: Conventional Commits Format (feat, fix, docs, etc.)
- **PR Size**: Maximal 400 Zeilen geändert pro PR
- **Sprache**: Code & Commits auf Englisch, UI & Docs auf Deutsch

## Performance-Ziele
- **Web Vitals**: LCP < 2.5s, FID < 100ms, CLS < 0.1
- **Bundle Size**: < 200KB für initiales JS
- **API Response**: < 200ms für Standard-Queries
- **Offline**: Alle Kern-Features müssen offline funktionieren