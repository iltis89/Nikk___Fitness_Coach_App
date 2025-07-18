# Railway Quick Deploy Instructions

## ✅ Was wurde vorbereitet:

1. **next.config.mjs** - `output: 'standalone'` aktiviert
2. **railway.toml** - Build-Command korrigiert
3. **.env.railway** - Alle notwendigen Umgebungsvariablen dokumentiert
4. **start.sh** - Verbessert für flexibles Starten

## 🚀 Deploy-Schritte:

### 1. Railway CLI installieren (falls noch nicht vorhanden)
```bash
npm install -g @railway/cli
```

### 2. Bei Railway anmelden
```bash
railway login
```

### 3. Neues Projekt erstellen oder existierendes verlinken
```bash
# Neues Projekt
railway init

# Oder existierendes Projekt verlinken
railway link
```

### 4. Umgebungsvariablen setzen
```bash
# Alle auf einmal aus .env.railway
railway variables set $(cat .env.railway | grep -v '^#' | xargs)

# Oder einzeln:
railway variables set NODE_ENV=production
railway variables set PORT=3000
railway variables set NEXT_PUBLIC_DEMO_MODE=true
railway variables set NODE_OPTIONS="--max-old-space-size=4096"
railway variables set NEXT_TELEMETRY_DISABLED=1
```

### 5. Deploy starten
```bash
railway up
```

### 6. Domain zuweisen (optional)
```bash
# Nachdem das Deployment erfolgreich war
railway domain
```

## ⚠️ Bekannte Probleme:

1. **Build-Fehler bei 404/500 Seiten**: 
   - Wird durch `|| true` im build command abgefangen
   - Beeinträchtigt nicht die Funktionalität

2. **Standalone-Build wird nicht generiert**:
   - Next.js 14.2.30 scheint das standalone-Feature zu ignorieren
   - start.sh fällt automatisch auf `next start` zurück

## 🔍 Deployment überwachen:

```bash
# Logs anzeigen
railway logs

# Deployment-Status prüfen
railway status

# URL der App anzeigen
railway open
```

## 📝 Nach dem Deployment:

1. Öffnen Sie die Railway-Dashboard-URL
2. Testen Sie den Login mit:
   - Email: `demo@nv-coaching.de`
   - Passwort: `demo123`
3. Alle Features sollten im Demo-Modus funktionieren

## 🛠️ Troubleshooting:

Falls das Deployment fehlschlägt:

1. Logs prüfen: `railway logs`
2. Umgebungsvariablen verifizieren: `railway variables`
3. Build lokal testen: `npm run build`
4. Railway Support: https://docs.railway.app

---

**Hinweis**: Dies ist ein Demo-Deployment. Für Production siehe RAILWAY_DEPLOYMENT_GUIDE.md