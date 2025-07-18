#!/bin/bash
cd apps/trainer-dashboard

# Railway setzt PORT automatisch
PORT=${PORT:-3000}
echo "Starting server on port $PORT"

# Erstelle fehlende prerender-manifest.json falls nicht vorhanden
if [ ! -f ".next/prerender-manifest.json" ]; then
    echo "Creating missing prerender-manifest.json..."
    echo '{"version":3,"routes":{},"dynamicRoutes":{},"preview":{"previewModeId":"","previewModeSigningKey":"","previewModeEncryptionKey":""}}' > .next/prerender-manifest.json
fi

# Prüfe ob standalone build existiert
if [ -f ".next/standalone/server.js" ]; then
    echo "Starting with standalone server..."
    PORT=$PORT node .next/standalone/server.js
else
    echo "Starting with next start..."
    exec npx next start -p $PORT
fi