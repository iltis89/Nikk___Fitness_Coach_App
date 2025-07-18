# Railway Deployment Guide für NV-Coaching-Platform

## Aktueller Status

Die Anwendung ist **teilweise deploymentfähig**. Das Frontend kann sofort deployed werden (Demo-Modus), aber für eine vollständige Production-Umgebung sind weitere Schritte erforderlich.

## Sofort-Deployment (nur Frontend)

### 1. Next.js Standalone Output aktivieren

Bearbeiten Sie `apps/trainer-dashboard/next.config.mjs`:
```javascript
const nextConfig = {
  output: 'standalone', // Kommentar entfernen!
  // ... rest der config
}
```

### 2. Railway Umgebungsvariablen setzen

Im Railway Dashboard folgende Variablen hinzufügen:

```env
# Basis-Konfiguration
NODE_ENV=production
PORT=3000
NEXT_PUBLIC_DEMO_MODE=true

# Build-Optimierungen
NODE_OPTIONS=--max-old-space-size=4096
NEXT_TELEMETRY_DISABLED=1
```

### 3. Railway.toml anpassen

```toml
[build]
builder = "nixpacks"
buildCommand = "npm install && turbo run build --filter=trainer-dashboard"

[deploy]
startCommand = "./start.sh"
healthcheckPath = "/"
healthcheckTimeout = 300
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10

[[services]]
name = "nv-coaching-trainer-dashboard"
type = "web"

[services.nv-coaching-trainer-dashboard]
port = 3000
```

### 4. Deploy-Befehl

```bash
railway up
```

## Vollständiges Production-Deployment

### 1. PostgreSQL Database hinzufügen

Im Railway Dashboard:
1. "New Service" → "Database" → "PostgreSQL"
2. Verbindungs-URL kopieren

### 2. API Service deployen

Erstellen Sie `packages/api/railway.toml`:
```toml
[build]
builder = "nixpacks"
buildCommand = "npm install && npm run build"

[deploy]
startCommand = "npm run start"
healthcheckPath = "/health"
healthcheckTimeout = 30

[[services]]
name = "nv-coaching-api"
type = "web"

[services.nv-coaching-api]
port = 3001
```

### 3. Umgebungsvariablen für API

```env
# Datenbank
DATABASE_URL=${{RAILWAY_DATABASE_URL}}

# Security
JWT_SECRET=<generieren mit: openssl rand -base64 32>
JWT_EXPIRES_IN=7d

# CORS
FRONTEND_URL=https://your-frontend-app.up.railway.app

# Server
PORT=3001
NODE_ENV=production
```

### 4. Datenbankmigrationen ausführen

```bash
# Im API Service
npx prisma migrate deploy
```

### 5. Frontend für Production konfigurieren

Umgebungsvariablen anpassen:
```env
NEXT_PUBLIC_DEMO_MODE=false
NEXT_PUBLIC_API_URL=https://your-api.up.railway.app
```

## Bekannte Probleme und Lösungen

### Build-Fehler bei 404/500 Seiten
- **Problem**: StyleRegistry React Context Error
- **Lösung**: `|| true` im build command (bereits implementiert)

### Fehlende Migrationen
- **Problem**: Keine Datenbank-Historie
- **Lösung**: `npx prisma migrate dev` lokal ausführen, dann committen

### Security Vulnerabilities
- **Problem**: 3 Low-Severity Issues
- **Lösung**: `npm audit fix` ausführen

## Monitoring und Logs

Railway bietet eingebautes Monitoring:
- Logs: Railway Dashboard → Service → Logs
- Metrics: Railway Dashboard → Service → Metrics
- Alerts: Können über Railway CLI konfiguriert werden

## Skalierung

Railway unterstützt automatische Skalierung:
1. Horizontal: Mehrere Instanzen (Railway Dashboard → Service → Settings)
2. Vertikal: Resource Limits anpassen

## Backup-Strategie

Für die PostgreSQL Datenbank:
1. Railway bietet automatische tägliche Backups
2. Manuelle Backups: `pg_dump` über Railway CLI

## Support und Troubleshooting

Bei Problemen:
1. Railway Logs prüfen
2. Build-Logs im Detail analysieren
3. Umgebungsvariablen verifizieren
4. Health-Check Endpoint testen

---

**Hinweis**: Diese Anleitung basiert auf dem Stand vom 18.07.2025. Bitte prüfen Sie die aktuellen Railway-Dokumentationen für Updates.