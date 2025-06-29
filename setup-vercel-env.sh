#!/bin/bash

echo "Setting up Vercel environment variables..."

# Add environment variables for production
echo "true" | vercel env add NEXT_PUBLIC_DEMO_MODE production
echo "AASj8BrBi7ipZh3KZQ2tTR/KI7JNjRg1ddpSgXjz+aU=" | vercel env add JWT_SECRET production
echo "1" | vercel env add NEXT_TELEMETRY_DISABLED production
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS production
echo "60000" | vercel env add NEXT_BUILD_TIMEOUT production
echo "60000" | vercel env add NEXT_COMPILE_TIMEOUT production
echo "true" | vercel env add NEXT_BUILD_CACHE production

# Add for preview
echo "true" | vercel env add NEXT_PUBLIC_DEMO_MODE preview
echo "AASj8BrBi7ipZh3KZQ2tTR/KI7JNjRg1ddpSgXjz+aU=" | vercel env add JWT_SECRET preview
echo "1" | vercel env add NEXT_TELEMETRY_DISABLED preview
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS preview
echo "60000" | vercel env add NEXT_BUILD_TIMEOUT preview
echo "60000" | vercel env add NEXT_COMPILE_TIMEOUT preview
echo "true" | vercel env add NEXT_BUILD_CACHE preview

# Add for development
echo "true" | vercel env add NEXT_PUBLIC_DEMO_MODE development
echo "AASj8BrBi7ipZh3KZQ2tTR/KI7JNjRg1ddpSgXjz+aU=" | vercel env add JWT_SECRET development
echo "1" | vercel env add NEXT_TELEMETRY_DISABLED development
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS development
echo "60000" | vercel env add NEXT_BUILD_TIMEOUT development
echo "60000" | vercel env add NEXT_COMPILE_TIMEOUT development
echo "true" | vercel env add NEXT_BUILD_CACHE development

echo "Environment variables added successfully!"