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
    // Read current tasks and archive files
    const tasksPath = path.join(__dirname, '../src/data/tasks.ts');
    const archivePath = path.join(__dirname, '../src/data/archive.ts');
    
    const tasksContent = fs.readFileSync(tasksPath, 'utf8');
    
    // Simple approach: manually manage completed tasks for now
    // Extract completed tasks by looking for status: "completed"
    const lines = tasksContent.split('\\n');
    const activeTasks = [];
    const completedTasks = [];
    let currentTask = [];
    let inTaskObject = false;
    let taskStatus = '';
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      if (line.trim().startsWith('{')) {
        inTaskObject = true;
        currentTask = [line];
      } else if (line.trim().startsWith('}')) {
        currentTask.push(line);
        inTaskObject = false;
        
        // Determine if this task is completed
        if (taskStatus === 'completed') {
          // Add archivedAt timestamp
          const taskText = currentTask.join('\\n');
          const archivedTask = taskText.replace(/\\}$/, `,\\n    archivedAt: \"${now}\"\\n  }`);
          completedTasks.push(archivedTask);
        } else {
          activeTasks.push(currentTask.join('\\n'));
        }
        
        currentTask = [];
        taskStatus = '';
      } else if (inTaskObject) {
        currentTask.push(line);
        
        // Check if this line contains status
        const statusMatch = line.match(/status: \"(\\w+)\"/);
        if (statusMatch) {
          taskStatus = statusMatch[1];
        }
      } else {
        // Keep non-task lines as they are
        if (!inTaskObject && !line.trim().startsWith('{')) {
          activeTasks.push(line);
        }
      }
    }
    
    if (completedTasks.length === 0) {
      console.log('📋 No completed tasks to archive');
      return;
    }
    
    console.log(`📦 Archiving ${completedTasks.length} completed tasks...`);
    
    // Read current archive
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
    const existingTasks = beforeBracket.includes('{') ? beforeBracket + ',\\n' : beforeBracket;
    const newArchiveContent = existingTasks + completedTasks.join(',\\n') + '\\n];';
    
    // Create new active tasks file with only non-completed tasks
    const taskFileStart = tasksContent.substring(0, tasksContent.indexOf('export const activeTasks'));
    const newTasksContent = taskFileStart + 'export const activeTasks: Task[] = [\\n' + 
      activeTasks.filter(task => task.trim() && !task.includes('export const')).join(',\\n') + '\\n];';
    
    // Write updated files
    fs.writeFileSync(tasksPath, newTasksContent);
    fs.writeFileSync(archivePath, newArchiveContent);
    
    console.log(`✅ Archived ${completedTasks.length} tasks`);
    console.log('🔄 Updated active tasks list');
    
    // Create daily archive log
    const archiveLogPath = path.join(__dirname, `../archive/daily-cleanup-${today}.md`);
    fs.mkdirSync(path.dirname(archiveLogPath), { recursive: true });
    
    const logContent = `# Daily Cleanup - ${today}

## Tasks Archived: ${completedTasks.length}

${completedTasks.map((task, i) => `### Task ${i + 1}
${task}

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
      execSync('git push', { cwd: path.join(__dirname, '../') });
      console.log('📤 Changes committed and deployed');
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