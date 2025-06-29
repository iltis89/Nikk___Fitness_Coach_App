# Screenshot Feedback Workflow

## 🚀 Überblick

Dieses System automatisiert den Screenshot-Feedback-Prozess, sodass Claude eigenständig neue Screenshots erkennt und verarbeitet.

## 📋 Optionen für die Automation

### Option 1: Shell Script (Einfach)
```bash
# Starte den Monitor
./scripts/watch-feedback.sh
```

**Vorteile:**
- Keine zusätzlichen Dependencies
- Läuft auf jedem Unix-System
- Einfach zu verstehen

### Option 2: Node.js Script (Erweitert)
```bash
# Starte den Monitor
node scripts/feedback-automation.js
```

**Vorteile:**
- Bessere State-Verwaltung
- JSON-basierte Kommunikation
- Plattformübergreifend

### Option 3: VS Code Task (Integriert)
Füge zu `.vscode/tasks.json` hinzu:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Watch Feedback Screenshots",
      "type": "shell",
      "command": "node",
      "args": ["scripts/feedback-automation.js"],
      "isBackground": true,
      "problemMatcher": [],
      "presentation": {
        "reveal": "always",
        "panel": "dedicated"
      }
    }
  ]
}
```

### Option 4: npm Script (Projekt-integriert)
Füge zu `package.json` hinzu:

```json
{
  "scripts": {
    "feedback:watch": "node scripts/feedback-automation.js",
    "feedback:watch:bg": "node scripts/feedback-automation.js &"
  }
}
```

## 🔧 Erweiterte Integration mit Claude

### Automatischer Trigger
Der Monitor erstellt eine `.feedback-trigger.json` Datei, die Claude erkennen kann:

```json
{
  "command": "FEEDBACK-REVIEW",
  "timestamp": "2025-06-29T12:30:00Z",
  "screenshots": ["screenshot1.png", "screenshot2.png"]
}
```

### Claude Workflow Integration
1. **Polling-Mechanismus**: Claude könnte regelmäßig nach der Trigger-Datei schauen
2. **File Watcher**: Claude könnte einen File Watcher implementieren
3. **Event-basiert**: Integration mit Claude's Event-System

## 📱 Desktop-Benachrichtigungen

### macOS
```bash
osascript -e 'display notification "Neue Screenshots!" with title "Feedback"'
```

### Windows (PowerShell)
```powershell
[Windows.UI.Notifications.ToastNotificationManager, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
[Windows.UI.Notifications.ToastNotification, Windows.UI.Notifications, ContentType = WindowsRuntime] | Out-Null
```

### Linux
```bash
notify-send "Feedback" "Neue Screenshots gefunden!"
```

## 🚦 Workflow-Status

### Status-Datei `.feedback-state.json`
```json
{
  "processedFiles": ["screenshot1.png", "screenshot2.png"],
  "lastCheck": "2025-06-29T12:30:00Z",
  "activeReview": false
}
```

## 🔄 Vollständig automatisierter Workflow

### 1. Systemd Service (Linux/macOS)
Erstelle `/etc/systemd/system/nv-feedback-monitor.service`:

```ini
[Unit]
Description=NV Coaching Feedback Monitor
After=network.target

[Service]
Type=simple
User=youruser
WorkingDirectory=/path/to/nv-coaching-platform
ExecStart=/usr/bin/node scripts/feedback-automation.js
Restart=always

[Install]
WantedBy=multi-user.target
```

### 2. LaunchAgent (macOS)
Erstelle `~/Library/LaunchAgents/com.nv-coaching.feedback.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.nv-coaching.feedback</string>
    <key>ProgramArguments</key>
    <array>
        <string>/usr/local/bin/node</string>
        <string>/path/to/scripts/feedback-automation.js</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
</dict>
</plist>
```

## 🤖 Claude Integration

### Manueller Check (Aktuell)
```
FEEDBACK-REVIEW
```

### Automatischer Check (Vorschlag)
Claude könnte einen internen Timer implementieren:

```typescript
// Pseudo-Code für Claude's internes System
setInterval(async () => {
  const triggerFile = await checkForTriggerFile('.feedback-trigger.json');
  if (triggerFile && triggerFile.command === 'FEEDBACK-REVIEW') {
    await processFeedbackScreenshots();
    await deleteTriggerFile();
  }
}, 30000); // Check every 30 seconds
```

## 📊 Monitoring & Logs

### Log-Rotation
```bash
# Füge zu scripts/feedback-automation.js hinzu
const logFile = fs.createWriteStream('feedback-monitor.log', { flags: 'a' });
process.stdout.write = process.stderr.write = logFile.write.bind(logFile);
```

### Metriken
- Anzahl verarbeiteter Screenshots
- Durchschnittliche Verarbeitungszeit
- Fehlerrate

## 🛠️ Troubleshooting

### Screenshots werden nicht erkannt
1. Prüfe Dateiberechtigungen
2. Stelle sicher, dass der Ordner existiert
3. Überprüfe die Dateiendungen

### Monitor stoppt
1. Überprüfe Logs
2. Stelle sicher, dass keine andere Instanz läuft
3. Prüfe Systemressourcen

## 🗂️ Automatisches Archivieren

### Workflow mit Archivierung
1. **Neue Screenshots** → `feedback-screenshots/`
2. **In Bearbeitung** → Bleibt im Hauptordner
3. **Nach Bearbeitung** → Automatisch nach `feedback-screenshots/archive/`

### Screenshots als bearbeitet markieren
```bash
# Alle Screenshots als bearbeitet markieren
node scripts/mark-feedback-complete.js

# Nur bestimmte Screenshots markieren
node scripts/mark-feedback-complete.js "screenshot1.png" "screenshot2.png"
```

### Archiv-Struktur
```
feedback-screenshots/
└── archive/
    ├── 2025-06-29T10-30-45-123Z_screenshot1.png
    ├── 2025-06-29T11-15-22-456Z_screenshot2.png
    └── 2025-06-29T12-00-00-789Z_screenshot3.png
```

## 🚀 Nächste Schritte

1. **Starte den Monitor**: `npm run feedback:watch`
2. **Lege Screenshot in Ordner**
3. **Warte auf Benachrichtigung**
4. **Führe FEEDBACK-REVIEW aus**
5. **Markiere als bearbeitet**: `node scripts/mark-feedback-complete.js`
6. **Screenshot wird automatisch archiviert**

Der automatisierte Workflow mit Archivierung hält deinen Arbeitsbereich sauber und dokumentiert alle Änderungen!