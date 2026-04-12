#!/usr/bin/env node

/**
 * Nightly Cleanup - 12:00 AM MDT
 *
 * 1. Reads public/done-tasks.json — the list of tasks Jeff marked done via the dashboard
 * 2. Removes those task IDs from src/data/tasks.ts
 * 3. Appends them to src/data/archive.ts with archivedAt timestamp
 * 4. Clears public/done-tasks.json (reset for next day)
 * 5. Writes a daily archive log to archive/daily-cleanup-YYYY-MM-DD.md
 * 6. Commits and pushes to GitHub (triggers Vercel redeploy)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.join(__dirname, '..');

function archiveCompletedTasks() {
  console.log('Starting nightly cleanup...');
  const now = new Date().toISOString();
  const today = new Date().toISOString().split('T')[0];

  try {
    // ── 1. Read done-tasks.json ──────────────────────────────────────────────
    const doneTasksPath = path.join(ROOT, 'public/done-tasks.json');
    let doneTasks = [];
    try {
      doneTasks = JSON.parse(fs.readFileSync(doneTasksPath, 'utf8'));
    } catch {
      console.log('No done-tasks.json found or empty. Nothing to archive.');
    }

    if (!doneTasks || doneTasks.length === 0) {
      console.log('No completed tasks found -- dashboard was already clean, nothing to archive');
      return;
    }

    const doneIds = new Set(doneTasks.map(t => t.taskId));
    console.log(`Archiving ${doneIds.size} tasks: ${[...doneIds].join(', ')}`);

    // ── 2. Parse tasks.ts and remove done tasks ──────────────────────────────
    const tasksPath = path.join(ROOT, 'src/data/tasks.ts');
    let tasksContent = fs.readFileSync(tasksPath, 'utf8');

    // Extract the full tasks array as text using a brace-depth parser
    const arrayStart = tasksContent.indexOf('export const tasks: Task[] = [');
    if (arrayStart === -1) throw new Error('Could not find tasks array in tasks.ts');

    // Find each task object and check if its id matches a done task
    // Strategy: split on top-level task boundaries by finding id: "..." patterns
    const archivedTaskObjects = [];
    const remainingLines = [];
    const lines = tasksContent.split('\n');

    let inTask = false;
    let braceDepth = 0;
    let currentTaskLines = [];
    let currentTaskId = null;
    let inTasksArray = false;
    let closingExports = [];

    for (const line of lines) {
      // Detect start of tasks array
      if (line.includes('export const tasks: Task[] = [')) {
        inTasksArray = true;
        remainingLines.push(line);
        continue;
      }

      // After tasks array ends
      if (!inTasksArray || line.startsWith('export const jeffColumns') || line.startsWith('export const agentColumns')) {
        inTasksArray = false;
        closingExports.push(line);
        continue;
      }

      if (!inTasksArray) {
        remainingLines.push(line);
        continue;
      }

      // Track task object boundaries
      if (!inTask && line.trim() === '{') {
        inTask = true;
        braceDepth = 1;
        currentTaskLines = [line];
        currentTaskId = null;
        continue;
      }

      if (inTask) {
        currentTaskLines.push(line);

        // Count braces
        for (const ch of line) {
          if (ch === '{') braceDepth++;
          if (ch === '}') braceDepth--;
        }

        // Detect id
        const idMatch = line.match(/id:\s*"([^"]+)"/);
        if (idMatch) currentTaskId = idMatch[1];

        // Task object closed
        if (braceDepth === 0) {
          inTask = false;
          if (currentTaskId && doneIds.has(currentTaskId)) {
            // This task is done -- archive it
            const doneEntry = doneTasks.find(t => t.taskId === currentTaskId);
            archivedTaskObjects.push({
              id: currentTaskId,
              lines: currentTaskLines,
              doneAt: doneEntry?.doneAt ?? now,
              title: doneEntry?.title ?? currentTaskId,
            });
          } else {
            // Keep it
            remainingLines.push(...currentTaskLines);
          }
          currentTaskLines = [];
          currentTaskId = null;
          continue;
        }
        continue;
      }

      remainingLines.push(line);
    }

    if (archivedTaskObjects.length === 0) {
      console.log('No matching task IDs found in tasks.ts -- done-tasks.json may be stale');
    } else {
      // Write updated tasks.ts
      const updatedTasks = [...remainingLines, ...closingExports].join('\n');
      fs.writeFileSync(tasksPath, updatedTasks);
      console.log(`Removed ${archivedTaskObjects.length} tasks from tasks.ts`);
    }

    // ── 3. Append to archive.ts ──────────────────────────────────────────────
    const archivePath = path.join(ROOT, 'src/data/archive.ts');
    let archiveContent;
    try {
      archiveContent = fs.readFileSync(archivePath, 'utf8');
    } catch {
      archiveContent = `export interface ArchivedTask {
  id: string;
  title: string;
  doneAt: string;
  archivedAt: string;
}

export const archivedTasks: ArchivedTask[] = [
];`;
    }

    const newEntries = archivedTaskObjects.map(t =>
      `  { id: "${t.id}", title: ${JSON.stringify(t.title)}, doneAt: "${t.doneAt}", archivedAt: "${now}" }`
    );

    const insertPoint = archiveContent.lastIndexOf('];');
    const before = archiveContent.substring(0, insertPoint);
    const hasExisting = before.includes('id:');
    const sep = hasExisting ? ',\n' : '\n';
    const updatedArchive = before + sep + newEntries.join(',\n') + '\n];';
    fs.writeFileSync(archivePath, updatedArchive);
    console.log(`Appended ${newEntries.length} entries to archive.ts`);

    // ── 4. Clear done-tasks.json ─────────────────────────────────────────────
    fs.writeFileSync(doneTasksPath, '[]');
    console.log('Cleared done-tasks.json for next day');

    // ── 5. Write daily log ───────────────────────────────────────────────────
    const logDir = path.join(ROOT, 'archive');
    fs.mkdirSync(logDir, { recursive: true });
    const logPath = path.join(logDir, `daily-cleanup-${today}.md`);
    const logContent = `# Daily Cleanup - ${today}

## Tasks Archived: ${archivedTaskObjects.length}

${archivedTaskObjects.map(t => `- **${t.id}**: ${t.title} (done at ${t.doneAt})`).join('\n')}

**Cleanup completed at:** ${now}
`;
    fs.writeFileSync(logPath, logContent);

    // ── 6. Git commit + push ─────────────────────────────────────────────────
    try {
      execSync('git add .', { cwd: ROOT });
      execSync(`git commit -m "Nightly cleanup: archive ${archivedTaskObjects.length} done tasks (${today})"`, { cwd: ROOT });
      console.log('Committed to git');
      try {
        execSync('git push', { cwd: ROOT });
        console.log('Pushed to GitHub -- Vercel redeploy triggered');
      } catch {
        console.log('Git push failed (check remote/auth)');
      }
    } catch (e) {
      console.log('Git commit failed:', e.message);
    }

  } catch (error) {
    console.error('Cleanup failed:', error.message);
    process.exit(1);
  }

  console.log('Nightly cleanup complete');
}

if (require.main === module) {
  const arg = process.argv[2];
  if (arg === 'test') {
    console.log('Test mode: running cleanup against current done-tasks.json');
  }
  archiveCompletedTasks();
}

module.exports = { archiveCompletedTasks };
