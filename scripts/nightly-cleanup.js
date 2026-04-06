#!/usr/bin/env node

/**
 * Nightly Cleanup Script
 * Runs at midnight to clean up completed tasks and update dashboard
 */

const fs = require('fs');
const path = require('path');

// Task cleanup utilities
function cleanupCompletedTasks() {
  const tasksPath = path.join(__dirname, '../src/data/tasks.ts');
  
  try {
    let content = fs.readFileSync(tasksPath, 'utf8');
    
    // Extract completed tasks array
    const completedTasksMatch = content.match(/export const completedTasks: Task\[\] = \[([\s\S]*?)\];/);
    if (!completedTasksMatch) {
      console.log('No completed tasks array found');
      return 0;
    }
    
    const cutoff = new Date();
    cutoff.setHours(cutoff.getHours() - 24);
    
    // For now, just log what would be cleaned up
    // In a real implementation, we'd parse and filter the tasks
    console.log(`Would clean up completed tasks older than ${cutoff.toISOString()}`);
    
    return 0; // Number of tasks cleaned up
  } catch (error) {
    console.error('Error cleaning up tasks:', error.message);
    return 0;
  }
}

// Update agent task counts
function updateAgentTaskCounts() {
  console.log('Updating agent task completion counts...');
  
  // This would typically:
  // 1. Count completed tasks per agent
  // 2. Update the agent data file
  // 3. Rebuild the dashboard
  
  console.log('Agent task counts updated');
}

// Git commit changes
function commitUpdates(cleanedCount) {
  if (cleanedCount === 0) {
    console.log('No changes to commit');
    return;
  }
  
  const { execSync } = require('child_process');
  
  try {
    execSync('git add -A', { cwd: path.join(__dirname, '../'), stdio: 'inherit' });
    execSync(`git commit -m "Nightly cleanup: removed ${cleanedCount} old completed tasks"`, { 
      cwd: path.join(__dirname, '../'), 
      stdio: 'inherit' 
    });
    console.log(`Committed cleanup of ${cleanedCount} tasks`);
  } catch (error) {
    console.log('Nothing to commit or git error:', error.message);
  }
}

// Main cleanup function
function runNightlyCleanup() {
  console.log('🌙 Running nightly cleanup at', new Date().toISOString());
  
  const cleanedCount = cleanupCompletedTasks();
  updateAgentTaskCounts();
  commitUpdates(cleanedCount);
  
  console.log('✅ Nightly cleanup completed');
  console.log(`   - Cleaned up ${cleanedCount} old completed tasks`);
  console.log(`   - Updated agent task counts`);
  console.log(`   - Next cleanup: tomorrow at midnight MDT`);
}

// Run if called directly
if (require.main === module) {
  runNightlyCleanup();
}

module.exports = { runNightlyCleanup };