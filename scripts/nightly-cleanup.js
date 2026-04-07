#!/usr/bin/env node

/**
 * Nightly Cleanup - 12:00 AM MDT
 * Archive completed tasks, create archive section
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function archiveCompletedTasks() {
  console.log('🌙 Starting nightly cleanup...');
  const now = new Date().toISOString();
  const today = new Date().toISOString().split('T')[0];
  
  try {
    // Read current tasks
    const tasksPath = path.join(__dirname, '../src/data/tasks.ts');
    const archivePath = path.join(__dirname, '../src/data/archive.ts');
    
    const tasksContent = fs.readFileSync(tasksPath, 'utf8');
    
    // Find completed tasks using regex
    const completedTaskPattern = /{\s*[^}]*status:\s*"completed"[^}]*}/g;
    const completedTasks = [];
    let match;
    
    while ((match = completedTaskPattern.exec(tasksContent)) !== null) {
      // Add archivedAt timestamp to completed task
      const task = match[0];
      const archivedTask = task.replace(/}$/, `,\n    archivedAt: "${now}"\n  }`);
      completedTasks.push(archivedTask);
    }
    
    if (completedTasks.length === 0) {
      console.log('📋 No completed tasks to archive');
      return;
    }
    
    console.log(`📦 Archiving ${completedTasks.length} completed tasks...`);
    
    // Remove completed tasks from active list
    let updatedTasksContent = tasksContent;
    const completedTasksPattern = /{\s*[^}]*status:\s*"completed"[^}]*},?\s*/g;
    updatedTasksContent = updatedTasksContent.replace(completedTasksPattern, '');
    
    // Clean up any trailing commas before closing bracket
    updatedTasksContent = updatedTasksContent.replace(/,\s*\]/g, '\n];');
    
    // Write updated tasks file
    fs.writeFileSync(tasksPath, updatedTasksContent);
    
    // Handle archive file
    let archiveContent;
    try {
      archiveContent = fs.readFileSync(archivePath, 'utf8');
    } catch (err) {
      // Create archive file if it doesn't exist
      archiveContent = `export interface ArchivedTask {
  id: string;
  title: string;
  description?: string;
  assignedTo: string;
  status: "completed" | "cancelled";
  priority: "urgent" | "high" | "medium" | "low";
  createdAt: string;
  updatedAt: string;
  completedAt: string;
  archivedAt: string;
  tags: string[];
}

// Archived tasks (moved from active at midnight daily)
export const archivedTasks: ArchivedTask[] = [
];`;
    }
    
    // Add completed tasks to archive
    const archiveInsertPoint = archiveContent.lastIndexOf('];');
    const beforeBracket = archiveContent.substring(0, archiveInsertPoint);
    const hasExistingTasks = beforeBracket.includes('id:');
    const separator = hasExistingTasks ? ',\n  ' : '\n  ';
    const newArchiveContent = beforeBracket + separator + completedTasks.join(',\n  ') + '\n];';
    
    // Write archive file
    fs.writeFileSync(archivePath, newArchiveContent);
    
    console.log(`✅ Archived ${completedTasks.length} tasks`);
    console.log('🔄 Updated active tasks list');
    
    // Create daily archive log
    const archiveLogPath = path.join(__dirname, `../archive/daily-cleanup-${today}.md`);
    fs.mkdirSync(path.dirname(archiveLogPath), { recursive: true });
    
    const logContent = `# Daily Cleanup - ${today}

## Tasks Archived: ${completedTasks.length}

${completedTasks.map((task, i) => `### Task ${i + 1}
\`\`\`typescript
${task}
\`\`\`

`).join('')}

**Cleanup completed at:** ${now}
**Next cleanup:** ${new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()}
`;
    
    fs.writeFileSync(archiveLogPath, logContent);
    
    // Commit changes
    try {
      execSync('git add .', { cwd: path.join(__dirname, '../') });
      execSync(`git commit -m "Nightly cleanup: Archive ${completedTasks.length} completed tasks (${today})"`, { 
        cwd: path.join(__dirname, '../') 
      });
      console.log('📤 Changes committed to git');
      
      // Try to push if remote exists
      try {
        execSync('git push', { cwd: path.join(__dirname, '../') });
        console.log('🚀 Changes pushed to remote');
      } catch (pushError) {
        console.log('⚠️ Git push failed (no remote or auth issues)');
      }
    } catch (gitError) {
      console.log('⚠️ Git commit failed:', gitError.message);
    }
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
  }
  
  console.log('🌙 Cleanup complete');
}

// Also create a simple manual trigger for testing
function testCleanup() {
  console.log('🧪 Running test cleanup...');
  archiveCompletedTasks();
}

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === 'test') {
    testCleanup();
  } else {
    archiveCompletedTasks();
  }
}

module.exports = { archiveCompletedTasks, testCleanup };