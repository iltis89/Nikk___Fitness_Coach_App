# 🚀 NV Coaching Platform - Deployment Guide

## Schnell-Deployment für Trainer Dashboard

### Vorbereitung (einmalig)

1. **Vercel Account erstellen** (kostenlos):
   - Gehe zu [vercel.com/signup](https://vercel.com/signup)
   - Mit GitHub/GitLab/Bitbucket oder E-Mail registrieren

2. **Vercel CLI installieren**:
```bash
npm install -g vercel
```

### Deployment in 2 Minuten

1. **Terminal öffnen und zum Projekt navigieren**:
```bash
cd "/Users/marcusgorner/Desktop/Fitness Coaching App/nv-coaching-platform/apps/trainer-dashboard"
```

2. **Deploy Befehl ausführen**:
```bash
vercel --prod
```

3. **Bei der ersten Verwendung**:
   - E-Mail bestätigen (Check deine Mails)
   - Setup and deploy? → **Y**
   - Scope auswählen → Dein Username
   - Link to existing project? → **N**
   - Project name? → **nv-coaching-trainer** (oder Enter für Default)
   - Directory? → **Enter** (nutzt aktuellen Ordner)
   - Build settings? → **Enter** (nutzt Defaults)

### 🎉 Fertig!

Nach ca. 1-2 Minuten erhältst du eine URL wie:
- `https://nv-coaching-trainer.vercel.app`
- `https://nv-coaching-trainer-xxxxx.vercel.app`

Diese URL kannst du direkt an deinen Trainer schicken!

## Was der Trainer sehen kann

### Hauptbereiche:
1. **Dashboard** - Übersicht mit Statistiken
2. **Kunden** - Liste aller Kunden
3. **Training** ⭐ - Das neue Feature!
   - Kunde auswählen
   - Trainingsplan ansehen
   - Workout starten und durchführen
4. **Messungen** - YPSI Hautfaltenmessung
5. **Kalender** - Terminverwaltung
6. **Nachrichten** - Chat-System
7. **Einstellungen** - Profilverwaltung

### Test-Workflow für Training:
1. Gehe zu "Training" im Menü
2. Klicke auf "Max Mustermann" (Beispiel-Kunde)
3. Sieh dir den Trainingsplan an
4. Klicke auf "Starten" bei einem Workout
5. Teste die Übungsansicht mit Gewichtsanpassung

## Updates deployen

Wenn du Änderungen gemacht hast:
```bash
vercel --prod
```

## Probleme?

### Build-Fehler?
```bash
npm install
npm run build
```

### Lokaler Test vor Deployment:
```bash
npm run dev
```

## Alternative: GitHub + Automatisches Deployment

1. Code zu GitHub pushen
2. In Vercel Dashboard → "Import Project"
3. Repository auswählen
4. Root Directory: `apps/trainer-dashboard`
5. Automatisches Deployment bei jedem Push!

---

**Tipp**: Speichere die Deployment-URL, damit du sie jederzeit an den Trainer schicken kannst!