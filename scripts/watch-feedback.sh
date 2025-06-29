#!/bin/bash

# Automated Screenshot Feedback Monitor
# This script watches for new screenshots and triggers feedback processing

FEEDBACK_DIR="./feedback-screenshots"
PROCESSED_DIR="./feedback-screenshots/processed"
WATCH_INTERVAL=30 # seconds
LAST_CHECK_FILE=".last-feedback-check"

# Create directories if they don't exist
mkdir -p "$FEEDBACK_DIR"
mkdir -p "$PROCESSED_DIR"

# Initialize last check time if file doesn't exist
if [ ! -f "$LAST_CHECK_FILE" ]; then
    echo "0" > "$LAST_CHECK_FILE"
fi

echo "🔍 Starting Feedback Screenshot Monitor..."
echo "📁 Watching: $FEEDBACK_DIR"
echo "⏱️  Check interval: ${WATCH_INTERVAL}s"
echo ""

while true; do
    # Get last check timestamp
    LAST_CHECK=$(cat "$LAST_CHECK_FILE")
    
    # Find new screenshots (PNG/JPG) modified after last check
    NEW_FILES=$(find "$FEEDBACK_DIR" -maxdepth 1 \( -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" \) -newer "$LAST_CHECK_FILE" 2>/dev/null | grep -v "/processed/")
    
    if [ ! -z "$NEW_FILES" ]; then
        echo "🆕 Found new screenshots:"
        echo "$NEW_FILES"
        echo ""
        echo "🤖 Triggering FEEDBACK-REVIEW..."
        
        # Here you would trigger Claude - for now, we'll create a trigger file
        echo "FEEDBACK-REVIEW" > .feedback-trigger
        echo "Timestamp: $(date)" >> .feedback-trigger
        echo "Files: $NEW_FILES" >> .feedback-trigger
        
        # Optional: Send notification (macOS)
        if command -v osascript &> /dev/null; then
            osascript -e 'display notification "New feedback screenshots detected!" with title "NV Coaching Platform"'
        fi
        
        echo "✅ Feedback review triggered!"
        echo ""
    fi
    
    # Update last check timestamp
    touch "$LAST_CHECK_FILE"
    
    # Wait before next check
    sleep $WATCH_INTERVAL
done