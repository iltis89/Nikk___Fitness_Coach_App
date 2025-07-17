# API Specification

## 🌐 API Overview

### Base Information
- **Base URL**: `https://api.[domain].com/v1`
- **Protocol**: HTTPS only
- **Format**: JSON
- **Versioning**: URL path (v1, v2)
- **Rate Limiting**: [Limits]

### Authentication
```
Authorization: Bearer [token]
```

## 📋 Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/refresh` | Refresh token | Yes |
| POST | `/auth/logout` | Logout user | Yes |

### [Resource 1] - [z.B. Users]
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | List all users | Yes |
| GET | `/users/:id` | Get user details | Yes |
| POST | `/users` | Create new user | Yes |
| PATCH | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

## 📊 Data Models

### User Model
```typescript
interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}
```

### [Model 2]
```typescript
interface [ModelName] {
  // Properties
}
```

## 🔍 Query Parameters

### Pagination
```
GET /resources?page=1&limit=20
```

### Filtering
```
GET /resources?status=active&category=tech
```

### Sorting
```
GET /resources?sort=createdAt&order=desc
```

### Search
```
GET /resources?q=search+term
```

## 📤 Request Examples

### POST Create Resource
```bash
curl -X POST https://api.example.com/v1/resources \
  -H "Authorization: Bearer [token]" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Example",
    "description": "Example description"
  }'
```

### GET with Filters
```bash
curl -X GET "https://api.example.com/v1/resources?status=active&limit=10" \
  -H "Authorization: Bearer [token]"
```

## 📥 Response Format

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

## 🚦 Status Codes

### Success Codes
- `200 OK` - Request successful
- `201 Created` - Resource created
- `204 No Content` - Success, no content

### Client Error Codes
- `400 Bad Request` - Invalid request
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Access denied
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation error

### Server Error Codes
- `500 Internal Server Error` - Server error
- `502 Bad Gateway` - Gateway error
- `503 Service Unavailable` - Service down

## 🔒 Security

### Headers
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000
```

### CORS Configuration
```javascript
{
  origin: ['https://app.example.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}
```

## ⚡ Rate Limiting

### Limits by Endpoint Type
| Endpoint Type | Requests | Window |
|---------------|----------|--------|
| Authentication | 5 | 15 min |
| Read (GET) | 100 | 1 min |
| Write (POST/PATCH) | 20 | 1 min |
| Delete | 10 | 1 min |

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1617714000
```

## 🔄 Webhooks

### Available Events
- `user.created`
- `user.updated`
- `[resource].created`
- `[resource].deleted`

### Webhook Payload
```json
{
  "event": "user.created",
  "timestamp": "2024-01-01T00:00:00Z",
  "data": {
    // Event specific data
  }
}
```

## 📝 API Versioning

### Version Strategy
- Major versions in URL path
- Minor versions via headers
- Deprecation notice: 6 months

### Version Header
```
API-Version: 2024-01-01
```

## 🧪 Testing

### Test Environment
- **Base URL**: `https://api-test.[domain].com/v1`
- **Test Credentials**: Available in `.env.test`

### Postman Collection
- Import: `[link-to-collection]`
- Environment: `[link-to-environment]`

## 📚 SDKs & Libraries

### Official SDKs
- JavaScript/TypeScript: `npm install @company/api-sdk`
- Python: `pip install company-api`
- Go: `go get github.com/company/api-sdk-go`

### Code Examples
```typescript
import { ApiClient } from '@company/api-sdk';

const client = new ApiClient({
  apiKey: process.env.API_KEY
});

const users = await client.users.list({
  page: 1,
  limit: 20
});
```

## 🆘 Support & Contact

### Documentation
- Full Docs: [https://docs.api.example.com]
- OpenAPI Spec: [/api/v1/openapi.json]

### Support Channels
- Email: api-support@example.com
- Discord: [invite-link]
- Issues: [github-issues-link]