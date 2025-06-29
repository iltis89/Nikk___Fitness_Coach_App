#!/usr/bin/env node

/**
 * Mark feedback screenshots as complete
 * This script is called by Claude after processing screenshots
 */

const fs = require('fs');
const path = require('path');

const TRIGGER_FILE = path.join(__dirname, '../.feedback-trigger.json');

function markComplete(processedFiles = []) {
  try {
    // Read current trigger file
    if (!fs.existsSync(TRIGGER_FILE)) {
      console.error('❌ No active feedback trigger found');
      return false;
    }
    
    const trigger = JSON.parse(fs.readFileSync(TRIGGER_FILE, 'utf8'));
    
    // Update status and processed files
    trigger.status = 'completed';
    trigger.processedFiles = processedFiles.length > 0 ? processedFiles : trigger.screenshots;
    trigger.completedAt = new Date().toISOString();
    
    // Write back
    fs.writeFileSync(TRIGGER_FILE, JSON.stringify(trigger, null, 2));
    
    console.log('✅ Marked feedback as complete');
    console.log(`📋 Processed files: ${trigger.processedFiles.join(', ')}`);
    
    return true;
  } catch (error) {
    console.error('❌ Error marking complete:', error.message);
    return false;
  }
}

// If called directly from command line
if (require.main === module) {
  const args = process.argv.slice(2);
  markComplete(args);
}

module.exports = { markComplete };