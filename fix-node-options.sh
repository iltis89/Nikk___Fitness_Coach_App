#!/bin/bash

echo "Removing NODE_OPTIONS from all environments..."

# Remove from all environments
yes | vercel env rm NODE_OPTIONS production
yes | vercel env rm NODE_OPTIONS preview  
yes | vercel env rm NODE_OPTIONS development

echo "NODE_OPTIONS removed. Now adding correct version..."

# Add correct NODE_OPTIONS
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS production
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS preview
echo "--max-old-space-size=4096" | vercel env add NODE_OPTIONS development

echo "Done!"