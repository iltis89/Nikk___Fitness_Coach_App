#!/bin/bash

# NV Coaching Platform - Setup Script

echo "🚀 Setting up NV Coaching Platform..."

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt "18" ]; then
    echo "❌ Node.js 18+ is required. Current version: $(node -v)"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Setup environment
if [ ! -f .env.local ]; then
    echo "🔧 Creating .env.local from .env.example..."
    cp .env.example .env.local
    echo "⚠️  Please update .env.local with your actual values!"
fi

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p packages/shared/src/{types,constants,utils,validations}
mkdir -p packages/ui/src/components
mkdir -p packages/api/src/{routes,controllers,services,middleware}
mkdir -p packages/database/prisma
mkdir -p packages/ai-services/src
mkdir -p apps/trainer-dashboard/src/{pages,features,components}
mkdir -p apps/mobile-app/src/{screens,components,navigation}

echo "✅ Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your database credentials"
echo "2. Run 'npm run dev' to start development"
echo "3. Check out docs/DEVELOPMENT_WORKFLOW.md for guidance"