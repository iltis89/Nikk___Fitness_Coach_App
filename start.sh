#!/bin/bash
cd apps/trainer-dashboard

# Prüfe ob standalone build existiert
if [ -f ".next/standalone/server.js" ]; then
    echo "Starting with standalone server..."
    node .next/standalone/server.js
else
    echo "Starting with next start..."
    npx next start -p ${PORT:-3000}
fi