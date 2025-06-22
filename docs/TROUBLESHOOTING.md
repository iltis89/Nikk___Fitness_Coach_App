# Troubleshooting Guide

## 🔧 Häufige Probleme & Lösungen

### Installation Probleme

#### `npm install` schlägt fehl
```bash
# Cache leeren und neu versuchen
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### Node Version Fehler
```bash
# Node Version prüfen
node --version  # Sollte >= 18.0.0 sein

# Mit nvm updaten
nvm install 18
nvm use 18
```

### TypeScript Fehler

#### "Cannot find module '@nv/shared'"
```bash
# Shared package bauen
cd packages/shared
npm run build
cd ../..
```

#### Type Errors nach Änderungen
```bash
# TypeScript neustarten
npm run typecheck

# In VSCode: Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### Datenbank Probleme

#### "Cannot connect to database"
1. PostgreSQL läuft? `brew services list`
2. Credentials in `.env.local` korrekt?
3. Datenbank existiert? `createdb nv_coaching`

#### Prisma Migrations
```bash
# Schema pushen (Development)
npx prisma db push

# Migration erstellen
npx prisma migrate dev --name init

# Prisma Studio öffnen
npx prisma studio
```

### Development Server

#### Port bereits belegt
```bash
# Prozess auf Port 3000 finden
lsof -i :3000

# Prozess beenden
kill -9 <PID>

# Oder anderen Port nutzen
PORT=3001 npm run dev
```

#### Hot Reload funktioniert nicht
1. Dateien in korrektem Verzeichnis?
2. `.next` Ordner löschen und neu starten
3. Browser Cache leeren

### Mobile App (React Native)

#### Metro Bundler Fehler
```bash
# Cache leeren
npx react-native start --reset-cache

# iOS Pods neu installieren
cd apps/mobile-app/ios
pod install
cd ../../..
```

#### Expo Probleme
```bash
# Expo Cache leeren
expo start -c

# Expo Updates
expo doctor
```

### Performance Probleme

#### Langsamer Build
```bash
# Turbo Cache leeren
rm -rf .turbo
npm run build
```

#### Memory Leaks
```bash
# Node Memory erhöhen
NODE_OPTIONS="--max-old-space-size=4096" npm run dev
```

### Git Probleme

#### Große Dateien
```bash
# .gitignore prüfen
git rm -r --cached node_modules
git rm -r --cached .next
git commit -m "Remove tracked files"
```

### KI-Features

#### OpenAI API Fehler
1. API Key in `.env.local` gesetzt?
2. Credits vorhanden?
3. Rate Limits beachten

#### Offline-Modus
1. Service Worker registriert?
2. Cache Strategien konfiguriert?
3. IndexedDB verfügbar?

## 🚨 Notfall-Befehle

### Kompletter Reset
```bash
# ⚠️ Vorsicht: Löscht alle lokalen Änderungen!
git clean -fdx
npm install
npm run setup
```

### Logs prüfen
```bash
# Server Logs
npm run dev 2>&1 | tee dev.log

# Prisma Logs
DEBUG="prisma:*" npm run dev
```

## 📞 Weitere Hilfe

1. Check `docs/` Ordner für mehr Dokumentation
2. GitHub Issues durchsuchen
3. KI-Assistant fragen mit Kontext aus CLAUDE.md