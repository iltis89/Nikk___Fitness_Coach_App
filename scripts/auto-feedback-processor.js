#!/usr/bin/env node

/**
 * Fully Automated Feedback Processor
 * This script watches for screenshots and automatically processes them
 */

const fs = require('fs');
const path = require('path');
const { exec, spawn } = require('child_process');
const chokidar = require('chokidar');

const FEEDBACK_DIR = path.join(__dirname, '../feedback-screenshots');
const ARCHIVE_DIR = path.join(FEEDBACK_DIR, 'archive');
const PROCESSING_DIR = path.join(FEEDBACK_DIR, '.processing');
const LOG_FILE = path.join(__dirname, '../feedback-processor.log');

// Ensure directories exist
[FEEDBACK_DIR, ARCHIVE_DIR, PROCESSING_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Logging
function log(message) {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  console.log(message);
  fs.appendFileSync(LOG_FILE, logMessage);
}

// Move file to processing
function moveToProcessing(filename) {
  const source = path.join(FEEDBACK_DIR, filename);
  const dest = path.join(PROCESSING_DIR, filename);
  try {
    fs.renameSync(source, dest);
    return true;
  } catch (error) {
    log(`❌ Error moving ${filename} to processing: ${error.message}`);
    return false;
  }
}

// Archive processed file
function archiveFile(filename) {
  const source = path.join(PROCESSING_DIR, filename);
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const archiveName = `${timestamp}_${filename}`;
  const dest = path.join(ARCHIVE_DIR, archiveName);
  
  try {
    fs.renameSync(source, dest);
    log(`📦 Archived: ${filename} → archive/${archiveName}`);
    return true;
  } catch (error) {
    log(`❌ Error archiving ${filename}: ${error.message}`);
    return false;
  }
}

// Process screenshots with Claude
async function processWithClaude(files) {
  log(`🤖 Processing ${files.length} screenshot(s) with Claude...`);
  
  // Create a temporary instruction file for Claude
  const instruction = `
AUTOMATED FEEDBACK PROCESSING

Please analyze the following screenshots and implement the requested changes:
${files.map(f => `- ${f}`).join('\n')}

Screenshots are located in: feedback-screenshots/.processing/

After implementing changes, report back with the status.
`;

  const instructionFile = path.join(__dirname, '../.auto-feedback-instruction.txt');
  fs.writeFileSync(instructionFile, instruction);

  return new Promise((resolve) => {
    // Execute Claude with the feedback review command
    const claudeProcess = spawn('claude', ['--input', instructionFile, 'FEEDBACK-REVIEW'], {
      cwd: path.join(__dirname, '..'),
      shell: true
    });

    let output = '';

    claudeProcess.stdout.on('data', (data) => {
      output += data.toString();
    });

    claudeProcess.stderr.on('data', (data) => {
      log(`⚠️ Claude error: ${data.toString()}`);
    });

    claudeProcess.on('close', (code) => {
      if (code === 0) {
        log('✅ Claude processing completed');
        resolve(true);
      } else {
        log(`❌ Claude process exited with code ${code}`);
        resolve(false);
      }
      
      // Clean up instruction file
      if (fs.existsSync(instructionFile)) {
        fs.unlinkSync(instructionFile);
      }
    });
  });
}

// Process a batch of screenshots
async function processBatch(files) {
  log(`\n🚀 Starting batch processing for ${files.length} file(s)`);
  
  // Move files to processing directory
  const processingFiles = [];
  for (const file of files) {
    if (moveToProcessing(file)) {
      processingFiles.push(file);
    }
  }

  if (processingFiles.length === 0) {
    log('⚠️ No files to process');
    return;
  }

  // Process with Claude
  const success = await processWithClaude(processingFiles);

  if (success) {
    // Archive processed files
    for (const file of processingFiles) {
      archiveFile(file);
    }
    
    // Send notification
    if (process.platform === 'darwin') {
      exec(`osascript -e 'display notification "${processingFiles.length} screenshot(s) processed and archived" with title "Feedback Processed"'`);
    }
  } else {
    // Move files back on failure
    log('⚠️ Processing failed, moving files back...');
    for (const file of processingFiles) {
      const source = path.join(PROCESSING_DIR, file);
      const dest = path.join(FEEDBACK_DIR, file);
      try {
        fs.renameSync(source, dest);
      } catch (error) {
        log(`❌ Error moving ${file} back: ${error.message}`);
      }
    }
  }
}

// Batch queue
let batchQueue = [];
let batchTimeout = null;

function queueForProcessing(filename) {
  batchQueue.push(filename);
  
  // Clear existing timeout
  if (batchTimeout) {
    clearTimeout(batchTimeout);
  }
  
  // Wait 5 seconds to collect more files before processing
  batchTimeout = setTimeout(() => {
    const batch = [...batchQueue];
    batchQueue = [];
    processBatch(batch);
  }, 5000);
}

// Main monitoring
log('🔍 Starting Fully Automated Feedback Processor');
log(`📁 Watching: ${FEEDBACK_DIR}`);
log('🤖 Claude integration: ENABLED');
log('📦 Auto-archive: ENABLED\n');

// Set up file watcher
const watcher = chokidar.watch(FEEDBACK_DIR, {
  ignored: [
    path.join(FEEDBACK_DIR, 'archive/**'),
    path.join(FEEDBACK_DIR, '.processing/**'),
    /(^|[\/\\])\../  // Ignore dotfiles
  ],
  persistent: true,
  ignoreInitial: true
});

watcher.on('add', (filePath) => {
  const filename = path.basename(filePath);
  const ext = path.extname(filename).toLowerCase();
  
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    log(`🆕 New screenshot detected: ${filename}`);
    queueForProcessing(filename);
  }
});

// Handle shutdown
process.on('SIGINT', () => {
  log('\n👋 Shutting down automated processor...');
  watcher.close();
  process.exit(0);
});

// Error handling
process.on('uncaughtException', (error) => {
  log(`💥 Uncaught exception: ${error.message}`);
  console.error(error);
});