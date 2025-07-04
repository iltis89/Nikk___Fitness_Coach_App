# 📸 Feedback Screenshots Workflow

## Workflow-Anleitung

1. **Screenshots erstellen**: Nutze Screenshot-Tool mit Annotationen
2. **Benennung**: `01_dashboard.png`, `02_clients.png`, etc.
3. **Ablage**: Alle Screenshots in diesem Ordner speichern
4. **Claude triggern**: Einfach "FEEDBACK-REVIEW" schreiben

## Claude's Analyse-Prozess

Für jeden Screenshot:
1. **Visuell analysieren**: Was soll geändert werden?
2. **Sub-Agent zuweisen**: 
   - UI-UPDATE: Für Design-Änderungen
   - FEATURE-ADD: Für neue Funktionen
   - FIX: Für Bug-Fixes
3. **Automatische Umsetzung**: Mit Priorität nach Nummer

## Beispiel-Kommentare auf Screenshots

- "Button größer machen"
- "Farbe ändern zu Blau"
- "Neues Feature: Export-Button"
- "Text ändern zu..."
- "Spacing vergrößern"

## Status-Tracking

Claude erstellt automatisch eine TODO-Liste mit allen gefundenen Tasks.