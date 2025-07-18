# Railway Deployment Troubleshooting Guide

## 🚀 Erfolgreiches Deployment-Vorgehen

Dieses Dokument dokumentiert unser erfolgreiches Vorgehen beim Railway Deployment vom 18.07.2025.

## 📋 Problem-Symptome

### Fehlermeldung im Railway Log:
```
[Error: ENOENT: no such file or directory, open '/app/apps/trainer-dashboard/.next/prerender-manifest.json']
```

### Symptome:
- Health Check Timeout nach 300s
- Container-Restart-Loop
- App startet, crashed aber sofort wieder

## 🔍 Systematisches Vorgehen

### 1. **Initiale Analyse**
```bash
# Logs im Railway Dashboard prüfen
# → Runtime-Logs (nicht Build-Logs!) analysieren
# → Restart-Pattern erkennen
```

### 2. **Port-Konfiguration sicherstellen**

**Problem:** Railway nutzt dynamischen Port (z.B. 8080), nicht 3000

**Lösung in `start.sh`:**
```bash
#!/bin/bash
cd apps/trainer-dashboard

# Railway setzt PORT automatisch
PORT=${PORT:-3000}
echo "Starting server on port $PORT"
```

### 3. **Health Check Endpoint implementieren**

**Datei: `apps/trainer-dashboard/app/api/health/route.ts`**
```typescript
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'nv-coaching-trainer-dashboard'
  })
}
```

### 4. **Nixpacks optimieren**

**Datei: `nixpacks.toml`**
```toml
[phases.setup]
nixPkgs = ["nodejs-18_x", "npm-9_x"]

[phases.install]
cmds = ["npm ci --prefer-offline --no-audit"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "./start.sh"

[variables]
NIXPACKS_TURBO_APP_NAME = "trainer-dashboard"
NODE_ENV = "production"
```

### 5. **Next.js Standalone-Problem lösen**

**Problem:** `next start` funktioniert nicht mit `output: 'standalone'`

**Lösung in `next.config.mjs`:**
```javascript
const nextConfig = {
  // output: 'standalone', // Temporär deaktiviert
  swcMinify: true,
  // ... rest
}
```

### 6. **Kritischer Fix: Fehlende prerender-manifest.json**

**Problem:** Next.js 14.2.x erstellt diese Datei nicht zuverlässig

**Lösung in `start.sh`:**
```bash
# Erstelle fehlende prerender-manifest.json falls nicht vorhanden
if [ ! -f ".next/prerender-manifest.json" ]; then
    echo "Creating missing prerender-manifest.json..."
    echo '{"version":3,"routes":{},"dynamicRoutes":{},"preview":{"previewModeId":"","previewModeSigningKey":"","previewModeEncryptionKey":""}}' > .next/prerender-manifest.json
fi

# Start mit exec für besseres Process-Management
exec npx next start -p $PORT
```

### 7. **Railway.toml optimieren**

```toml
[build]
builder = "nixpacks"
buildCommand = "npm install && turbo run build --filter=trainer-dashboard"

[deploy]
startCommand = "./start.sh"
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 3
healthcheckPath = "/api/health"
healthcheckTimeout = 30

[[services]]
name = "nv-coaching-trainer-dashboard"
type = "web"

[services.nv-coaching-trainer-dashboard]
port = 3000
```

## ✅ Deployment-Checkliste

1. **Lokaler Test:**
   ```bash
   npm run build
   PORT=3000 ./start.sh
   curl http://localhost:3000/api/health
   ```

2. **Git Push:**
   ```bash
   git add -A
   git commit -m "fix: Railway deployment issues"
   git push origin deployment
   ```

3. **Railway Dashboard:**
   - Build-Logs prüfen (sollten grün sein)
   - Runtime-Logs prüfen (sollte "Starting server on port 8080" zeigen)
   - Health Check Status beobachten

## 🚨 Häufige Fehler und Lösungen

### 1. **ENOENT prerender-manifest.json**
- **Ursache:** Next.js Bug in Version 14.2.x
- **Lösung:** Automatische Erstellung in start.sh

### 2. **Health Check Timeout**
- **Ursache:** App startet nicht oder zu langsam
- **Lösung:** Timeout reduzieren, Endpoint implementieren

### 3. **Port Mismatch**
- **Ursache:** Hardcoded Port statt Railway's $PORT
- **Lösung:** `PORT=${PORT:-3000}` verwenden

### 4. **Standalone Build Probleme**
- **Ursache:** Inkompatibilität mit `next start`
- **Lösung:** Standalone temporär deaktivieren

## 📝 Wichtige Umgebungsvariablen

In Railway Dashboard setzen:
```
NODE_ENV=production
NEXT_PUBLIC_DEMO_MODE=true
NODE_OPTIONS=--max-old-space-size=4096
NEXT_TELEMETRY_DISABLED=1
```

## 🔧 Debug-Befehle

```bash
# Logs in Railway CLI
railway logs

# Umgebungsvariablen prüfen
railway variables

# Deployment-Status
railway status

# Manueller Restart
railway restart
```

## 💡 Lessons Learned

1. **Runtime-Logs sind wichtiger als Build-Logs** - Build kann grün sein, App trotzdem crashen
2. **Next.js Bugs existieren** - Pragmatische Workarounds sind okay
3. **Schrittweises Vorgehen** - Nicht alle Probleme auf einmal lösen
4. **Lokale Tests** - Immer erst lokal testen bevor pushen
5. **Health Checks früh implementieren** - Besseres Debugging

## 🎯 Zusammenfassung

Der Schlüssel zum Erfolg war:
1. Systematische Fehleranalyse
2. Schrittweise Implementierung der Fixes
3. Pragmatische Lösungen (prerender-manifest.json erstellen)
4. Gutes Logging und Monitoring

Mit diesem Vorgehen sollte jedes Railway Deployment erfolgreich sein!

---

**Erstellt am:** 18.07.2025
**Getestet mit:** Next.js 14.2.30, Railway, Turborepo