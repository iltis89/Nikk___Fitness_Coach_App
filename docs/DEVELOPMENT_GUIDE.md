# 🚀 NV Coaching Platform - Development Guide

Dies ist die zentrale Entwicklungsdokumentation. Alle anderen Workflow-Dokumente sind veraltet.

## Quick Reference

### Power Commands für schnelle Entwicklung

| Command | Beschreibung | Beispiel |
|---------|--------------|----------|
| `FEATURE-ADD` | Komplettes Feature mit allen Aspekten | `FEATURE-ADD: Ernährungsplan-System` |
| `UI-UPDATE` | Intelligente UI-Änderungen | `UI-UPDATE: Dark Mode` |
| `CRUD` | Instant Resource Management | `CRUD: Client Management` |
| `FIX` | Bug Fix mit Root Cause Analyse | `FIX: Dashboard Performance` |
| `OPTIMIZE` | Performance-Optimierung | `OPTIMIZE: Load Time < 1s` |
| `SECURITY-AUDIT` | Sicherheits-Check | `SECURITY-AUDIT: DSGVO` |

### Sub-Agent Triggers (für granulare Kontrolle)

| Agent | Trigger | Fokus |
|-------|---------|-------|
| Product | `PROD:` | Business Value, Requirements |
| Architect | `ARCH:` | System Design, Struktur |
| Coder | `CODE:` | Implementation |
| Tester | `TEST:` | Tests & QA |
| Reviewer | `REVIEW:` | Code Quality & Security |

## Workflow für neue Features

### 1. Schnellster Weg (Empfohlen)
```
FEATURE-ADD: [Feature Name]
```
Aktiviert automatisch alle nötigen Sub-Agents in der richtigen Reihenfolge.

### 2. Manueller Weg (für Spezialfälle)
```
PROD: Definiere Business Case
ARCH: Plane Architektur  
CODE: Implementiere
TEST: Schreibe Tests
REVIEW: Prüfe Qualität
```

## Konkrete Beispiele für Nikks Projekt

### Trainingsplan-System
```
FEATURE-ADD: Trainingsplan mit Supersets und Tempo

Automatisch passiert:
- Erkennt Excel-Import Bedarf
- Implementiert Drag-Drop Editor
- YPSI-spezifische Features
- Offline-Sync
- PDF Export
```

### Quick Input für Messungen
```
UI-UPDATE: Schnelleingabe Gewicht während Termin

Erstellt:
- Floating Action Button
- Numpad Modal
- Keyboard Shortcuts (Ctrl+M)
- Auto-Save mit Toast
```

### Performance Fix
```
FIX: Dashboard lädt 5 Sekunden

Analysiert → Findet N+1 Queries → Implementiert Eager Loading → Verifiziert
```

## Projekt-spezifische Informationen

### Business-Kontext
- **Zielgruppe**: Personal Trainer (Nikk) mit 50 Kunden
- **Hauptziel**: 50% Zeitersparnis bei Admin-Aufgaben
- **MVP-Timeline**: 4 Wochen

### Technische Constraints
- **Performance**: LCP < 2.5s, Bundle < 200KB
- **Offline-First**: Alle Kernfeatures ohne Internet
- **Mobile-First**: Optimiert für Trainer-Smartphones
- **DSGVO**: Verschlüsselung für Gesundheitsdaten

### Design-Prinzipien
- Minimalistisch & Hell
- Große Touch-Targets (50+ Jahre Zielgruppe)
- Excel-ähnliche Interfaces bevorzugt
- "Weniger ist mehr"

## Integration mit Tools

### Git Workflow
```bash
# Features erstellen automatisch Branches
FEATURE-ADD: Payment System
→ Creates: feature/payment-system

# Atomic Commits pro Sub-Agent
git log zeigt: "feat(api): Add payment endpoints"
```

### Deployment
```bash
# Automatisches Vercel Deployment
DEPLOY: Production
→ Build → Test → Deploy → Monitor
```

## Häufige Szenarien

### MVP Sprint (1 Woche)
```
Tag 1: FEATURE-ADD: Auth System
Tag 2: FEATURE-ADD: Client Management
Tag 3: FEATURE-ADD: Trainingsplan Basics  
Tag 4: UI-UPDATE: Polish & Responsive
Tag 5: SECURITY-AUDIT: Launch-Ready Check
```

### Bug Fix Session
```
FIX: [Problem]
→ Reproduziert → Root Cause → Fix → Test → Deploy
```

### Performance Sprint
```
OPTIMIZE: Alle Seiten < 2s
OPTIMIZE: Bundle Size < 150KB
OPTIMIZE: Offline Performance
```

## Best Practices

### ✅ DO
- Nutze Power Commands für Geschwindigkeit
- Vertraue der Swarm Intelligence
- Definiere klare Business Value
- Denke in User Stories

### ❌ DON'T  
- Micromanage Sub-Agents
- Über-dokumentieren
- Perfektionismus (MVP first!)
- Features ohne Zeitersparnis

## Notfall-Commands

```bash
# Rollback bei Problemen
ROLLBACK: Last Change

# Status Check
STATUS: Active Tasks

# Hilfe
HELP: [Command]
```

---

**Remember**: Das Ziel ist Nikk in 4 Wochen live zu bringen. Speed > Perfection!