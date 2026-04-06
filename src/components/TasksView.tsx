"use client";

import { 
  activeTasks, 
  getTasksByStatus, 
  getTasksByPriority,
  getOverdueTasks,
  type Task,
  type TaskStatus,
  type TaskPriority 
} from "@/data/tasks";
import { getAgentById } from "@/data/agents";

const statusStyles: Record<TaskStatus, { bg: string; text: string; dot: string; label: string }> = {
  active: {
    bg: "bg-green-50",
    text: "text-green-700", 
    dot: "bg-green-500",
    label: "Active"
  },
  blocked: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500", 
    label: "Blocked"
  },
  completed: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    dot: "bg-blue-500",
    label: "Completed"
  },
  cancelled: {
    bg: "bg-gray-50",
    text: "text-gray-600",
    dot: "bg-gray-400",
    label: "Cancelled"
  }
};

const priorityStyles: Record<TaskPriority, { bg: string; text: string; label: string }> = {
  urgent: { bg: "bg-red-100", text: "text-red-700", label: "Urgent" },
  high: { bg: "bg-orange-100", text: "text-orange-700", label: "High" },
  medium: { bg: "bg-blue-100", text: "text-blue-700", label: "Medium" },
  low: { bg: "bg-gray-100", text: "text-gray-600", label: "Low" }
};

function TaskCard({ task }: { task: Task }) {
  const status = statusStyles[task.status];
  const priority = priorityStyles[task.priority];
  const agent = getAgentById(task.assignedTo);
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "completed";
  
  return (
    <div className={`rounded-lg border border-gray-200 p-4 ${status.bg} ${isOverdue ? 'ring-2 ring-red-200' : ''}`}>
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status.dot} ${task.status === "active" ? "animate-pulse" : ""}`} />
          <h3 className="font-semibold text-sm text-gray-900">{task.title}</h3>
        </div>
        <div className="flex gap-2">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${priority.text} ${priority.bg}`}>
            {priority.label}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.text} bg-white/60`}>
            {status.label}
          </span>
        </div>
      </div>
      
      {task.description && (
        <p className="text-sm text-gray-600 mb-2 leading-relaxed">{task.description}</p>
      )}
      
      {task.blockedReason && task.status === "blocked" && (
        <div className="bg-amber-100 border border-amber-200 rounded p-2 mb-2">
          <p className="text-xs text-amber-700">
            <strong>Blocked:</strong> {task.blockedReason}
          </p>
        </div>
      )}
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span>👤 {agent?.name || task.assignedTo}</span>
          {task.dueDate && (
            <span className={isOverdue ? 'text-red-600 font-medium' : ''}>
              📅 {new Date(task.dueDate).toLocaleDateString()}
              {isOverdue && ' (Overdue)'}
            </span>
          )}
        </div>
        <div className="flex gap-2">
          {task.tags.map(tag => (
            <span key={tag} className="bg-white/50 px-2 py-0.5 rounded text-xs">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function TaskSection({ title, tasks, icon }: { title: string; tasks: Task[]; icon?: string }) {
  if (tasks.length === 0) return null;
  
  return (
    <div className="mb-6">
      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
        {icon && <span>{icon}</span>}
        {title} ({tasks.length})
      </h3>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}

export default function TasksView() {
  const activeTasks = getTasksByStatus("active");
  const blockedTasks = getTasksByStatus("blocked");
  const urgentTasks = getTasksByPriority("urgent");
  const overdueTasks = getOverdueTasks();
  
  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{activeTasks.length}</div>
          <div className="text-xs text-gray-500">Active Tasks</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-amber-600">{blockedTasks.length}</div>
          <div className="text-xs text-gray-500">Blocked Tasks</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-600">{urgentTasks.length}</div>
          <div className="text-xs text-gray-500">Urgent Priority</div>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4 text-center">
          <div className="text-2xl font-bold text-red-700">{overdueTasks.length}</div>
          <div className="text-xs text-gray-500">Overdue</div>
        </div>
      </div>
      
      {/* Task Sections */}
      <TaskSection 
        title="🚨 Overdue Tasks" 
        tasks={overdueTasks}
        icon="🚨"
      />
      
      <TaskSection 
        title="⚡ Urgent Tasks" 
        tasks={urgentTasks.filter(t => t.status !== "completed")}
        icon="⚡"
      />
      
      <TaskSection 
        title="🚧 Blocked Tasks (Waiting on Jeff)" 
        tasks={blockedTasks}
        icon="🚧"
      />
      
      <TaskSection 
        title="✅ Active Tasks" 
        tasks={activeTasks}
        icon="✅"
      />
    </div>
  );
}