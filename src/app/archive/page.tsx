"use client";

import { archivedTasks } from "@/data/archive";

export default function ArchivePage() {
  const groupedByDate = archivedTasks.reduce((acc, task) => {
    const date = task.archivedAt.split('T')[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(task);
    return acc;
  }, {} as Record<string, typeof archivedTasks>);

  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a));

  return (
    <div className="min-h-screen">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-[#1e3a5f] min-h-screen p-6 hidden lg:block">
          <h1 className="text-white text-xl font-bold mb-1">Project HQ</h1>
          <p className="text-blue-300 text-xs mb-8">Jeff Oldroyd</p>

          <nav className="space-y-2">
            <a
              href="/"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-white" />
              Dashboard
            </a>
            <a
              href="/future"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-amber-400" />
              Future Projects
            </a>
            <a
              href="/models"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-pink-400" />
              Idea Models
            </a>
            <a
              href="/resources"
              className="w-full text-left px-4 py-3 rounded-lg text-blue-200 hover:bg-white/5 hover:text-white text-sm font-medium block"
            >
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-blue-400" />
              Resources
            </a>
            <div className="w-full text-left px-4 py-3 rounded-lg bg-white/10 text-white text-sm font-medium">
              <span className="inline-block w-2 h-2 rounded-full mr-2 bg-gray-400" />
              Archive
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-10">
          <div className="mb-8">
            <h1 className="text-2xl md:text-3xl font-extrabold text-[#1e3a5f]">Task Archive</h1>
            <p className="text-gray-500 mt-1">
              Completed tasks automatically archived at midnight MDT
            </p>
          </div>

          {archivedTasks.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📁</div>
              <h3 className="text-xl font-bold text-gray-600 mb-2">No archived tasks yet</h3>
              <p className="text-gray-500">
                Completed tasks will appear here after the next midnight cleanup
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              {sortedDates.map((date) => (
                <div key={date} className="space-y-4">
                  <h2 className="text-lg font-bold text-[#1e3a5f] flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-gray-400" />
                    {new Date(date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                    <span className="text-sm font-normal text-gray-500 ml-2">
                      ({groupedByDate[date].length} tasks)
                    </span>
                  </h2>
                  
                  <div className="grid gap-4">
                    {groupedByDate[date].map((task) => (
                      <div
                        key={task.id}
                        className="bg-gray-50 border border-gray-200 rounded-xl p-5"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-gray-700">{task.title}</h3>
                          <div className="flex gap-2">
                            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                              task.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                              task.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                              'bg-gray-100 text-gray-600'
                            }`}>
                              {task.priority}
                            </span>
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
                              Completed
                            </span>
                          </div>
                        </div>
                        
                        {task.description && (
                          <p className="text-sm text-gray-600 mb-3">{task.description}</p>
                        )}
                        
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <div className="flex gap-4">
                            <span>Assigned to: <span className="font-medium">{task.assignedTo}</span></span>
                            <span>Completed: {new Date(task.completedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex gap-1">
                            {task.tags.map((tag) => (
                              <span key={tag} className="bg-gray-200 text-gray-600 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}