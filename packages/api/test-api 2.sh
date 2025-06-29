#!/bin/bash
# Quick API Test Script

echo "🧪 Testing NV Coaching API..."

# Health check
echo -e "\n1. Health Check:"
curl -s http://localhost:3001/health | jq

# API Info
echo -e "\n2. API Info:"
curl -s http://localhost:3001/api/v1 | jq

# Register
echo -e "\n3. Register User:"
curl -s -X POST http://localhost:3001/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "nikk@nv-coaching.de",
    "password": "Test123456!",
    "firstName": "Nikk",
    "lastName": "Viererbl"
  }' | jq

echo -e "\n✅ API Test Complete!"