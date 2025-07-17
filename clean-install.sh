#!/bin/bash

echo "🧹 Cleaning up project..."

# Remove all node_modules directories
find . -name "node_modules" -type d -prune -exec rm -rf '{}' + 2>/dev/null || true

# Remove all build directories
find . -name ".next" -type d -prune -exec rm -rf '{}' + 2>/dev/null || true
find . -name "dist" -type d -prune -exec rm -rf '{}' + 2>/dev/null || true
find . -name ".turbo" -type d -prune -exec rm -rf '{}' + 2>/dev/null || true

# Remove duplicate files
find . -name "* 2" -type d -prune -exec rm -rf '{}' + 2>/dev/null || true
find . -name "* 2.*" -type f -exec rm -f '{}' + 2>/dev/null || true

# Remove package-lock
rm -f package-lock.json

echo "📦 Installing dependencies..."
npm install

echo "✅ Done!"