# NV Coaching Platform

Eine moderne Fitness-Coaching-Plattform für Personal Trainer Nikk Viererbl und seine Kunden.

## 🎯 Projektziele

- **Trainer-Dashboard**: Effiziente Kundenverwaltung und Trainingsplanung
- **Kunden-App**: Einfacher Zugang zu Trainingsplänen und Fortschritt
- **KI-Integration**: Intelligente Trainingsvorhersagen und digitaler Coach

## 🛠 Tech Stack

- **Monorepo**: Turborepo für effiziente Code-Organisation
- **Backend**: Node.js, TypeScript, PostgreSQL, Prisma
- **Web**: Next.js 14, Tailwind CSS
- **Mobile**: React Native mit Expo
- **KI**: OpenAI/Claude API Integration

## 🚀 Schnellstart

### Voraussetzungen

- Node.js 18+
- npm 9+
- PostgreSQL
- Redis (optional für Caching)

### Installation

```bash
# Repository klonen
git clone [repository-url]
cd nv-coaching-platform

# Abhängigkeiten installieren
npm install

# Umgebungsvariablen einrichten
cp .env.example .env.local
# Bearbeite .env.local mit deinen Werten

# Datenbank initialisieren
npm run db:setup

# Entwicklungsserver starten
npm run dev
```

### Verfügbare Befehle

```bash
npm run dev        # Startet alle Apps im Entwicklungsmodus
npm run build      # Erstellt Production Builds
npm run test       # Führt Tests aus
npm run lint       # Prüft Code-Qualität
npm run format     # Formatiert Code
```

## 📁 Projektstruktur

```
nv-coaching-platform/
├── apps/
│   ├── trainer-dashboard/    # Next.js Dashboard für Trainer
│   └── mobile-app/          # React Native App für Kunden
├── packages/
│   ├── shared/              # Gemeinsame Business-Logik
│   ├── ui/                  # UI-Komponenten-Library
│   ├── api/                 # Backend API Server
│   ├── database/            # Datenbank-Schema & Migrationen
│   └── ai-services/         # KI-Integrationen
└── docs/                    # Projektdokumentation
```

## 🔑 Hauptfeatures

### Trainer-Dashboard
- Kundenverwaltung mit detaillierten Profilen
- Hautfaltenmessung & Körperanalyse-Tracking
- KI-gestützte Trainingsplanung
- Terminverwaltung & Kalender

### Kunden-App
- Personalisierte Trainings- & Ernährungspläne
- Fortschrittsverfolgung mit Visualisierungen
- Video-Upload für Übungsausführung
- KI-Coach als digitaler Zwilling von Nikk
- Offline-Funktionalität

## 🎨 Design-Philosophie

- **Minimalistisch**: Fokus auf das Wesentliche
- **Benutzerfreundlich**: Einfache Bedienung für alle Altersgruppen
- **Hell & Freundlich**: Motivierendes, nicht überforderndes Design
- **"Weniger ist mehr"**: Kein unnötiger Aufwand für Nutzer

## 🔒 Sicherheit & Datenschutz

- Verschlüsselte Datenübertragung
- Sichere Authentifizierung mit JWT
- DSGVO-konforme Datenhaltung (in Vorbereitung)
- Keine Speicherung sensibler Daten im Code

## 📈 Deployment

### Entwicklung (MVP)
- **Backend**: Railway oder Render (kostengünstig)
- **Web**: Vercel (kostenloser Tier)
- **Mobile**: Expo EAS Build

### Produktion (später)
- Migration zu AWS/GCP für Skalierbarkeit
- CDN für Video-Inhalte
- Erweiterte Monitoring-Lösungen

## 🤝 Entwicklung

Dieses Projekt wurde für die Zusammenarbeit mit KI-Assistenten optimiert. Siehe `CLAUDE.md` für spezifische Richtlinien.

## 📞 Support

Bei Fragen oder Problemen wenden Sie sich an das Entwicklungsteam.

---

**NV Coaching Platform** - Wissenschaftlich fundiertes Training trifft moderne Technologie