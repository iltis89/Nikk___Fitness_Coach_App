# NV Coaching Platform - Projektanforderungen

## 1. Projektziel
Entwicklung einer zweiteiligen Fitness-Coaching-Plattform für Personal Trainer Nikk Viererbl:
- **Trainer-Dashboard** (Webanwendung) für effiziente Kundenbetreuung
- **Kunden-App** (Mobile) als Trainingsbegleiter

## 2. Kunde
- **Name**: Nikk Viererbl (NV Coaching)
- **Typ**: Einzelner Personal Trainer mit eigenem Studio in Weßling
- **Kunden**: ~50 aktive Kunden
- **Trainingsart**: Functional Strength Training
- **Philosophie**: "Only what gets measured gets managed"

## 3. Funktionale Anforderungen

### Trainer-Dashboard
#### Kernfunktionen
- Kundenverwaltung (Profile, Kontaktdaten, Historie)
- Trainingsplanung & -dokumentation
- Hautfaltenmessung & Körperanalyse-Tracking (YPSI-Methode)
- Ernährungspläne verwalten
- Fortschrittstracking mit Visualisierungen
- Terminverwaltung/Kalender

#### KI-Features (Priorität 1)
- Vorhersage von Trainingsfortschritten
- Anomalie-Erkennung bei ungewöhnlichen Messwerten
- KI-gestützte Ernährungsplan-Erstellung

### Kunden-App
#### Basis-Features
- Einsicht in Trainings- und Ernährungspläne
- Fortschritts-Dashboard (Körperwerte, Kraftentwicklung)
- Termine mit Nikk verwalten
- Kommunikation mit Nikk (Chat/Nachrichten)

#### Erweiterte Features
- Trainings-Logging (Gewichte, Wiederholungen)
- Ernährungs-Tagebuch
- Erinnerungen für Training/Mahlzeiten
- Zugang zu Übungsvideos
- Urlaubsmodus mit angepassten Plänen
- **Video-Upload** für Übungsausführung
- **KI-Coach** als digitaler Zwilling von Nikk

## 4. UI/UX Anforderungen
- **Design**: Hell, minimalistisch
- **Prinzip**: "Weniger ist mehr" - kein Mehraufwand für Kunden
- **Zielgruppe**: Alle Altersklassen (einfache Bedienbarkeit)
- **Fokus**: Der Kunde steht im Vordergrund

## 5. Technische Anforderungen
- **Budget**: Kostengünstige Lösung für MVP
- **Skalierung**: Vorbereitung für späteres SaaS-Produkt
- **Offline**: App muss auch ohne Internet funktionieren
- **DSGVO**: Später wichtig (Gesundheitsdaten)
- **Integration**: Vorerst keine externen Integrationen

## 6. Entwicklung
- **Team**: Solo-Entwickler mit KI-Assistenten
- **Repository**: Monorepo-Ansatz
- **Workflow**: Einfacher Feature-Branch-Workflow

## 7. Zukunftsvision
- Start als MVP mit Nikk
- Erprobung und Verfeinerung
- Potentielle Entwicklung zu SaaS-Produkt für andere Trainer