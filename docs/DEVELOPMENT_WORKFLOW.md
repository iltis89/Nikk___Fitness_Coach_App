# Development Workflow Guide

## 🚀 Quick Start Befehle

### Häufigste Befehle für KI-Agents
```bash
# Projekt Setup
npm install
npm run dev

# Neue Features
npm run generate:component <name>
npm run generate:api-route <name>
npm run db:migrate

# Testing & Quality
npm run test
npm run lint:fix
npm run typecheck
```

## 📁 Wo gehört was hin?

### Neue API Route
```
packages/api/src/routes/[resource].ts
packages/api/src/controllers/[resource].controller.ts
packages/api/src/services/[resource].service.ts
```

### Neue UI Komponente
```
packages/ui/src/components/[ComponentName]/
  ├── index.tsx
  ├── [ComponentName].tsx
  ├── [ComponentName].test.tsx
  └── styles.ts
```

### Neue App-Feature
```
apps/trainer-dashboard/src/features/[feature]/
  ├── components/
  ├── hooks/
  ├── utils/
  └── types.ts
```

## 🔧 Debugging Tipps

### Häufige Probleme & Lösungen
1. **TypeScript Fehler**: `npm run typecheck -- --watch`
2. **Prisma Sync**: `npm run db:push`
3. **Cache Issues**: `npm run clean && npm install`
4. **Port besetzt**: Check `.env` für PORT Variablen

## 🎯 Feature Development Checkliste

- [ ] Feature in TODO-Liste aufnehmen
- [ ] Datenmodell in Prisma definieren
- [ ] API Endpoints erstellen
- [ ] Frontend Komponenten bauen
- [ ] Tests schreiben
- [ ] Offline-Funktionalität prüfen
- [ ] Performance testen
- [ ] Dokumentation updaten