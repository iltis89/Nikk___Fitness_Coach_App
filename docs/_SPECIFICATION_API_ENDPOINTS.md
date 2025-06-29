# NV Coaching Platform - API Endpoints

## Base URL
- Development: `http://localhost:3000/api/v1`
- Production: `https://api.nv-coaching.de/v1`

## Authentication
Alle Endpoints (außer Auth) benötigen Bearer Token im Header:
```
Authorization: Bearer <jwt-token>
```

## Endpoints

### Authentication
```
POST   /auth/register          # Neue Registrierung
POST   /auth/login             # Login
POST   /auth/refresh           # Token erneuern
POST   /auth/logout            # Logout
POST   /auth/forgot-password   # Passwort vergessen
POST   /auth/reset-password    # Passwort zurücksetzen
GET    /auth/me                # Aktueller User
```

### Users
```
GET    /users/:id              # User Details
PATCH  /users/:id              # User updaten
DELETE /users/:id              # User löschen
POST   /users/:id/avatar       # Profilbild upload
```

### Clients (Trainer only)
```
GET    /clients                # Alle Kunden
POST   /clients                # Neuer Kunde
GET    /clients/:id            # Kunden-Details
PATCH  /clients/:id            # Kunde updaten
DELETE /clients/:id            # Kunde löschen
GET    /clients/:id/progress   # Fortschritts-Übersicht
```

### Measurements
```
GET    /clients/:id/measurements              # Alle Messungen
POST   /clients/:id/measurements              # Neue Messung
GET    /measurements/:id                      # Messung Details
PATCH  /measurements/:id                      # Messung updaten
DELETE /measurements/:id                      # Messung löschen
POST   /measurements/:id/analyze              # KI-Analyse starten
GET    /clients/:id/measurements/latest       # Letzte Messung
GET    /clients/:id/measurements/comparison   # Vergleich (Query: from, to)
```

### Training Plans
```
GET    /clients/:id/training-plans           # Alle Pläne
POST   /clients/:id/training-plans           # Neuer Plan
GET    /training-plans/:id                   # Plan Details
PATCH  /training-plans/:id                   # Plan updaten
DELETE /training-plans/:id                   # Plan löschen
POST   /training-plans/:id/activate          # Plan aktivieren
POST   /training-plans/:id/duplicate         # Plan duplizieren
```

### Workouts
```
GET    /training-plans/:id/workouts          # Alle Workouts
POST   /training-plans/:id/workouts          # Neues Workout
GET    /workouts/:id                         # Workout Details
PATCH  /workouts/:id                         # Workout updaten
DELETE /workouts/:id                         # Workout löschen
POST   /workouts/:id/exercises               # Übung hinzufügen
```

### Exercises
```
GET    /exercises                            # Alle Übungen (mit Filter)
POST   /exercises                            # Neue Übung
GET    /exercises/:id                        # Übung Details
PATCH  /exercises/:id                        # Übung updaten
DELETE /exercises/:id                        # Übung löschen
GET    /exercises/search                     # Übungen suchen
```

### Training Logs
```
GET    /clients/:id/training-logs            # Alle Logs
POST   /training-logs                        # Neuer Log
GET    /training-logs/:id                    # Log Details
PATCH  /training-logs/:id                    # Log updaten
DELETE /training-logs/:id                    # Log löschen
POST   /training-logs/:id/videos             # Video upload
```

### Nutrition Plans
```
GET    /clients/:id/nutrition-plans          # Alle Ernährungspläne
POST   /clients/:id/nutrition-plans          # Neuer Plan
GET    /nutrition-plans/:id                  # Plan Details
PATCH  /nutrition-plans/:id                  # Plan updaten
DELETE /nutrition-plans/:id                  # Plan löschen
POST   /nutrition-plans/generate             # KI-Plan generieren
```

### Appointments
```
GET    /appointments                         # Alle Termine (mit Filter)
POST   /appointments                         # Neuer Termin
GET    /appointments/:id                     # Termin Details
PATCH  /appointments/:id                     # Termin updaten
DELETE /appointments/:id                     # Termin löschen
GET    /appointments/available-slots         # Freie Termine
```

### Messages
```
GET    /messages                             # Alle Nachrichten
POST   /messages                             # Neue Nachricht
GET    /messages/:id                         # Nachricht Details
PATCH  /messages/:id/read                    # Als gelesen markieren
GET    /messages/unread-count                # Ungelesene Anzahl
```

### AI Services
```
POST   /ai/chat                              # Chat mit Digital Twin
POST   /ai/analyze-form                      # Video-Analyse
POST   /ai/predict-progress                  # Fortschritts-Vorhersage
POST   /ai/detect-anomalies                  # Anomalie-Erkennung
POST   /ai/generate-nutrition-plan           # Ernährungsplan erstellen
GET    /ai/interactions                      # Chat-Historie
```

### Analytics (Trainer Dashboard)
```
GET    /analytics/overview                   # Dashboard-Übersicht
GET    /analytics/client-progress/:id        # Kunden-Fortschritt
GET    /analytics/revenue                    # Umsatz-Statistiken
GET    /analytics/retention                  # Kunden-Bindung
```

### Uploads
```
POST   /upload/image                         # Bild upload
POST   /upload/video                         # Video upload
GET    /upload/signed-url                    # Signed URL für S3
```

## Query Parameters

### Pagination
```
?page=1&limit=20
```

### Sorting
```
?sort=createdAt&order=desc
```

### Filtering
```
?status=active&category=strength
```

### Date Ranges
```
?from=2024-01-01&to=2024-12-31
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    // Response data
  },
  "meta": {
    "page": 1,
    "limit": 20,
    "total": 100,
    "totalPages": 5
  }
}
```

### Error Response
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

## Status Codes
- `200` OK
- `201` Created
- `204` No Content
- `400` Bad Request
- `401` Unauthorized
- `403` Forbidden
- `404` Not Found
- `422` Unprocessable Entity
- `429` Too Many Requests
- `500` Internal Server Error

## Rate Limiting
- Standard: 100 requests per minute
- AI Endpoints: 10 requests per minute
- Uploads: 20 requests per hour

## Webhooks (Future)
```
POST /webhooks/measurement-anomaly
POST /webhooks/goal-achieved
POST /webhooks/plan-completed
```