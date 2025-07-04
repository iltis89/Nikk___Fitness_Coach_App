# Claude Feedback Helper

## 🤖 Für Claude: So arbeitest du mit dem automatisierten Feedback-System

### 1. Screenshots verarbeiten
Wenn du `FEEDBACK-REVIEW` ausführst:
1. Analysiere alle Screenshots im `feedback-screenshots/` Ordner
2. Implementiere die gewünschten Änderungen
3. Markiere die Screenshots als bearbeitet

### 2. Screenshots als bearbeitet markieren
Nach erfolgreicher Bearbeitung, führe aus:

```bash
node scripts/mark-feedback-complete.js
```

Oder wenn nur bestimmte Screenshots bearbeitet wurden:
```bash
node scripts/mark-feedback-complete.js "screenshot1.png" "screenshot2.png"
```

### 3. Was passiert dann?
- Der Feedback-Monitor erkennt die Markierung
- Screenshots werden automatisch nach `feedback-screenshots/archive/` verschoben
- Archivierte Dateien bekommen einen Zeitstempel: `2025-06-29T12-30-00_original-name.png`

### 4. Workflow-Status prüfen
Die `.feedback-state.json` zeigt:
```json
{
  "processedFiles": ["file1.png", "file2.png"],  // Bereits erkannt
  "pendingReview": ["file1.png"],                // Warten auf Bearbeitung
  "archived": ["2025-06-29_file3.png"]           // Erfolgreich archiviert
}
```

### 5. Best Practices
- Führe `FEEDBACK-REVIEW` regelmäßig aus
- Markiere IMMER bearbeitete Screenshots mit dem Helper-Script
- Bei Fehlern werden Screenshots NICHT archiviert und können erneut bearbeitet werden

### 6. Automatischer Check (Vorschlag)
Du könntest periodisch prüfen:
```bash
if [ -f ".feedback-trigger.json" ]; then
  # Neue Screenshots verfügbar
  FEEDBACK-REVIEW
  node scripts/mark-feedback-complete.js
fi
```

## 📁 Ordnerstruktur

```
feedback-screenshots/
├── neue-screenshots.png        # Neue Screenshots hier ablegen
├── processed/                  # Temporär (wird nicht mehr genutzt)
└── archive/                    # Bearbeitete Screenshots
    └── 2025-06-29T12-30-00_screenshot.png
```

## 🔄 Vollständiger Ablauf

1. **User** legt Screenshot in `feedback-screenshots/`
2. **Monitor** erkennt neue Datei und erstellt `.feedback-trigger.json`
3. **Claude** führt `FEEDBACK-REVIEW` aus
4. **Claude** implementiert Änderungen
5. **Claude** führt `node scripts/mark-feedback-complete.js` aus
6. **Monitor** verschiebt Screenshot nach `archive/`

Das System ist jetzt vollständig automatisiert! 🚀