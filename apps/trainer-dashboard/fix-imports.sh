#!/bin/bash

# Replace all @nv/shared/src/types/package imports with local types/package
find . -type f \( -name "*.tsx" -o -name "*.ts" \) -not -path "./node_modules/*" -exec sed -i '' 's|@nv/shared/src/types/package|@/types/package|g' {} +

echo "✅ All imports have been fixed!"