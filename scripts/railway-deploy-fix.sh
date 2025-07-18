#!/bin/bash
# Railway Deployment Quick Fix Script
# Verwendung: ./scripts/railway-deploy-fix.sh

echo "🚀 Railway Deployment Fix Script"
echo "================================"

# 1. Port-Konfiguration prüfen
echo "✅ Checking start.sh for PORT configuration..."
if grep -q 'PORT=${PORT:-3000}' start.sh; then
    echo "   PORT configuration is correct"
else
    echo "   ⚠️  PORT configuration needs update in start.sh"
fi

# 2. Health Check Endpoint prüfen
echo "✅ Checking for health endpoint..."
if [ -f "apps/trainer-dashboard/app/api/health/route.ts" ]; then
    echo "   Health endpoint exists"
else
    echo "   ⚠️  Creating health endpoint..."
    mkdir -p apps/trainer-dashboard/app/api/health
    cat > apps/trainer-dashboard/app/api/health/route.ts << 'EOF'
export async function GET() {
  return Response.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'nv-coaching-trainer-dashboard'
  })
}
EOF
fi

# 3. Nixpacks.toml prüfen
echo "✅ Checking nixpacks.toml..."
if [ -f "nixpacks.toml" ] && grep -q "NIXPACKS_TURBO_APP_NAME" nixpacks.toml; then
    echo "   Nixpacks configuration is correct"
else
    echo "   ⚠️  Updating nixpacks.toml..."
    cat > nixpacks.toml << 'EOF'
[phases.setup]
nixPkgs = ["nodejs-18_x", "npm-9_x"]

[phases.install]
cmds = ["npm ci --prefer-offline --no-audit"]

[phases.build]
cmds = ["npm run build"]

[start]
cmd = "./start.sh"

[variables]
NIXPACKS_TURBO_APP_NAME = "trainer-dashboard"
NODE_ENV = "production"
EOF
fi

# 4. Next.js Standalone prüfen
echo "✅ Checking next.config.mjs..."
if grep -q "output: 'standalone'" apps/trainer-dashboard/next.config.mjs; then
    echo "   ⚠️  Standalone output should be disabled for Railway"
else
    echo "   Standalone output is correctly disabled"
fi

# 5. Prerender-manifest Fix in start.sh
echo "✅ Checking start.sh for prerender-manifest fix..."
if grep -q "prerender-manifest.json" start.sh; then
    echo "   Prerender-manifest fix is in place"
else
    echo "   ⚠️  start.sh needs prerender-manifest fix"
fi

# 6. Build lokal testen
echo ""
echo "📦 Testing build locally..."
npm run build

# 7. Zusammenfassung
echo ""
echo "🎯 Summary:"
echo "==========="
echo "1. Run: npm run build"
echo "2. Test: PORT=3000 ./start.sh"
echo "3. Check: curl http://localhost:3000/api/health"
echo "4. Deploy: git push origin deployment"
echo ""
echo "✨ Done! Check the output above for any warnings."