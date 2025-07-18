#!/bin/bash
cd apps/trainer-dashboard

# Railway setzt PORT automatisch
PORT=${PORT:-3000}
echo "Starting server on port $PORT"

# Prüfe ob standalone build existiert
if [ -f ".next/standalone/server.js" ]; then
    echo "Starting with standalone server..."
    PORT=$PORT node .next/standalone/server.js
else
    echo "Starting with next start..."
    npx next start -p $PORT
fi