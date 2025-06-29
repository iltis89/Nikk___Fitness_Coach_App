# 📸 Einfacher Screenshot-Feedback Workflow

## So funktioniert's:

### 1. Screenshot erstellen & annotieren
- Mache einen Screenshot der Änderung
- Füge Anmerkungen/Markierungen hinzu
- Speichere im Ordner: `feedback-screenshots/`

### 2. Feedback Review triggern
```
FEEDBACK-REVIEW
```

### 3. Claude verarbeitet automatisch:
- ✅ Analysiert alle Screenshots im Ordner
- ✅ Implementiert die gewünschten Änderungen
- ✅ Archiviert bearbeitete Screenshots

## Ordnerstruktur:
```
feedback-screenshots/
├── neue-screenshots.png      # Hier Screenshots ablegen
└── archive/                  # Bearbeitete Screenshots (automatisch)
    └── 2025-06-29T12-30-00_screenshot.png
```

## Befehle:

- `FEEDBACK-REVIEW` - Startet die Verarbeitung
- Screenshots werden automatisch nach `archive/` verschoben

## Das war's! 🎯

Einfach, effektiv und ohne komplizierte Automation.