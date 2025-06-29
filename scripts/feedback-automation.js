#!/usr/bin/env node

/**
 * Automated Feedback Screenshot Processor
 * Watches for new screenshots and processes them automatically
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const FEEDBACK_DIR = path.join(__dirname, '../feedback-screenshots');
const PROCESSED_DIR = path.join(FEEDBACK_DIR, 'processed');
const ARCHIVE_DIR = path.join(FEEDBACK_DIR, 'archive');
const STATE_FILE = path.join(__dirname, '../.feedback-state.json');
const CHECK_INTERVAL = 30000; // 30 seconds

// Ensure directories exist
if (!fs.existsSync(FEEDBACK_DIR)) {
  fs.mkdirSync(FEEDBACK_DIR, { recursive: true });
}
if (!fs.existsSync(PROCESSED_DIR)) {
  fs.mkdirSync(PROCESSED_DIR, { recursive: true });
}
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

// Load or initialize state
let state = { 
  processedFiles: [],
  pendingReview: [],
  archived: []
};
if (fs.existsSync(STATE_FILE)) {
  state = JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function saveState() {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function getScreenshots() {
  const files = fs.readdirSync(FEEDBACK_DIR);
  return files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.png', '.jpg', '.jpeg'].includes(ext) && !state.processedFiles.includes(file);
  });
}

function triggerFeedbackReview(screenshots) {
  console.log('🤖 Triggering FEEDBACK-REVIEW...');
  
  // Create a trigger file for Claude to detect
  const triggerContent = {
    command: 'FEEDBACK-REVIEW',
    timestamp: new Date().toISOString(),
    screenshots: screenshots,
    status: 'pending'
  };
  
  fs.writeFileSync(
    path.join(__dirname, '../.feedback-trigger.json'),
    JSON.stringify(triggerContent, null, 2)
  );
  
  // Send desktop notification (macOS)
  if (process.platform === 'darwin') {
    exec(`osascript -e 'display notification "New feedback screenshots ready for review!" with title "NV Coaching Platform"'`);
  }
}

function moveToArchive(filename) {
  const sourcePath = path.join(FEEDBACK_DIR, filename);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveName = `${timestamp}_${filename}`;
  const archivePath = path.join(ARCHIVE_DIR, archiveName);
  
  try {
    fs.renameSync(sourcePath, archivePath);
    console.log(`📦 Archived: ${filename} → archive/${archiveName}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to archive ${filename}:`, error.message);
    return false;
  }
}

function checkForProcessedFiles() {
  // Check if Claude has marked files as processed
  const triggerPath = path.join(__dirname, '../.feedback-trigger.json');
  
  if (fs.existsSync(triggerPath)) {
    const trigger = JSON.parse(fs.readFileSync(triggerPath, 'utf8'));
    
    if (trigger.status === 'completed' && trigger.processedFiles) {
      console.log('\n✅ Processing completed files...');
      
      trigger.processedFiles.forEach(file => {
        if (moveToArchive(file)) {
          // Remove from pending and add to archived
          state.pendingReview = state.pendingReview.filter(f => f !== file);
          state.archived.push(file);
        }
      });
      
      saveState();
      
      // Clean up trigger file
      fs.unlinkSync(triggerPath);
      console.log('🧹 Cleaned up trigger file\n');
    }
  }
}

function checkForNewScreenshots() {
  // First check for processed files
  checkForProcessedFiles();
  
  const newScreenshots = getScreenshots();
  
  if (newScreenshots.length > 0) {
    console.log(`\n🆕 Found ${newScreenshots.length} new screenshot(s):`);
    newScreenshots.forEach(file => console.log(`   - ${file}`));
    
    // Trigger feedback review
    triggerFeedbackReview(newScreenshots);
    
    // Mark files as pending review
    state.processedFiles.push(...newScreenshots);
    state.pendingReview.push(...newScreenshots);
    saveState();
    
    console.log('✅ Feedback review triggered!\n');
  }
}

// Main monitoring loop
console.log('🔍 Starting Automated Feedback Monitor');
console.log(`📁 Watching: ${FEEDBACK_DIR}`);
console.log(`⏱️  Check interval: ${CHECK_INTERVAL / 1000}s\n`);

// Initial check
checkForNewScreenshots();

// Set up monitoring
setInterval(checkForNewScreenshots, CHECK_INTERVAL);

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping feedback monitor...');
  saveState();
  process.exit(0);
});