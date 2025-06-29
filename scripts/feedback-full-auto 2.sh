#!/bin/bash

# Full Auto Feedback Processor
# This script provides 100% automation by creating instruction files that you can process

FEEDBACK_DIR="./feedback-screenshots"
ARCHIVE_DIR="./feedback-screenshots/archive"
PROCESSED_FILE=".feedback-processed.txt"
INSTRUCTION_FILE="FEEDBACK_AUTO_INSTRUCTION.md"
CHECK_INTERVAL=30

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Ensure directories exist
mkdir -p "$FEEDBACK_DIR"
mkdir -p "$ARCHIVE_DIR"

echo -e "${GREEN}🚀 100% Automated Feedback Processor${NC}"
echo -e "📁 Watching: $FEEDBACK_DIR"
echo -e "⏱️  Check interval: ${CHECK_INTERVAL}s"
echo -e "📋 Instructions will be created in: $INSTRUCTION_FILE\n"

# Function to create instruction file
create_instruction() {
    local files=("$@")
    
    cat > "$INSTRUCTION_FILE" << EOF
# 🤖 AUTOMATISCHE FEEDBACK-VERARBEITUNG

## Neue Screenshots gefunden!

### Screenshots zu verarbeiten:
EOF

    for file in "${files[@]}"; do
        echo "- $file" >> "$INSTRUCTION_FILE"
    done

    cat >> "$INSTRUCTION_FILE" << EOF

### Automatische Anweisungen:
1. Führe aus: \`FEEDBACK-REVIEW\`
2. Implementiere alle markierten Änderungen
3. Nach Fertigstellung führe aus:
   \`\`\`bash
   # Markiere als bearbeitet
   node scripts/mark-feedback-complete.js ${files[@]}
   
   # Archiviere Screenshots
   ./scripts/feedback-full-auto.sh --archive ${files[@]}
   \`\`\`

### Status:
- Zeitstempel: $(date)
- Anzahl Screenshots: ${#files[@]}
- Automatischer Modus: AKTIV

---
*Diese Datei wurde automatisch generiert. Nach Bearbeitung kann sie gelöscht werden.*
EOF

    echo -e "${GREEN}✅ Instruction file created: $INSTRUCTION_FILE${NC}"
}

# Function to archive files
archive_files() {
    shift # Remove --archive flag
    local files=("$@")
    
    for file in "${files[@]}"; do
        if [ -f "$FEEDBACK_DIR/$file" ]; then
            timestamp=$(date +"%Y-%m-%dT%H-%M-%S")
            archive_name="${timestamp}_${file}"
            mv "$FEEDBACK_DIR/$file" "$ARCHIVE_DIR/$archive_name"
            echo -e "${GREEN}📦 Archived: $file → archive/$archive_name${NC}"
        fi
    done
}

# Handle archive command
if [ "$1" == "--archive" ]; then
    archive_files "$@"
    exit 0
fi

# Main monitoring loop
while true; do
    # Find new screenshots
    new_files=()
    while IFS= read -r -d '' file; do
        basename=$(basename "$file")
        # Check if not already processed
        if ! grep -q "^$basename$" "$PROCESSED_FILE" 2>/dev/null; then
            new_files+=("$basename")
        fi
    done < <(find "$FEEDBACK_DIR" -maxdepth 1 \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -print0)
    
    if [ ${#new_files[@]} -gt 0 ]; then
        echo -e "\n${YELLOW}🆕 Found ${#new_files[@]} new screenshot(s):${NC}"
        printf '%s\n' "${new_files[@]}"
        
        # Create instruction file
        create_instruction "${new_files[@]}"
        
        # Mark as processed (to avoid re-processing)
        for file in "${new_files[@]}"; do
            echo "$file" >> "$PROCESSED_FILE"
        done
        
        # Send notification
        if command -v osascript &> /dev/null; then
            osascript -e "display notification \"${#new_files[@]} neue Screenshots! Siehe $INSTRUCTION_FILE\" with title \"Feedback Auto\""
        fi
        
        echo -e "${YELLOW}⚡ AKTION ERFORDERLICH: Öffne $INSTRUCTION_FILE und folge den Anweisungen${NC}\n"
    fi
    
    sleep $CHECK_INTERVAL
done