// specs/phase-2/frontend/app/dashboard/page.tsx

'use client';

import { CheckCircle, Clock, AlertTriangle, Calendar, User, BarChart3, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Dashboard() {
  const [filter, setFilter] = useState('All');

  const taskCards = [
    { id: 1, title: 'Pending Tasks', count: 12, icon: Clock, color: 'text-blue-500' },
    { id: 2, title: 'Completed', count: 24, icon: CheckCircle, color: 'text-green-500' },
    { id: 3, title: 'Overdue', count: 3, icon: AlertTriangle, color: 'text-red-500' },
    { id: 4, title: 'Due Today', count: 7, icon: Calendar, color: 'text-purple-500' },
    { id: 5, title: 'Assigned to Me', count: 18, icon: User, color: 'text-indigo-500' },
    { id: 6, title: 'Productivity', count: '85%', icon: BarChart3, color: 'text-orange-500' },
  ];

  const sampleTasks = [
    { id: 1, title: 'Complete project proposal', status: 'Pending', priority: 'High', dueDate: '2023-06-15' },
    { id: 2, title: 'Review team feedback', status: 'Completed', priority: 'Medium', dueDate: '2023-06-10' },
    { id: 3, title: 'Prepare presentation', status: 'Pending', priority: 'Low', dueDate: '2023-06-20' },
    { id: 4, title: 'Update documentation', status: 'Pending', priority: 'Medium', dueDate: '2023-06-18' },
  ];

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-6 sm:mb-8">
          My Tasks
        </h1>

        <div className="mb-6 sm:mb-8">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search tasks..."
              className="w-full p-3 pl-10 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white transition-all duration-300"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {['All', 'Pending', 'Completed'].map((filterOption) => (
              <button
                key={filterOption}
                onClick={() => setFilter(filterOption)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === filterOption
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-zinc-700 border border-gray-200 dark:border-zinc-700'
                }`}
              >
                {filterOption}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-8">
          {taskCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <div
                key={card.id}
                className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{card.title}</h3>
                    <p className="text-3xl font-bold mt-2 text-gray-900 dark:text-white">{card.count}</p>
                  </div>
                  <div className={`${card.color} bg-opacity-20 p-3 rounded-full`}>
                    <IconComponent size={40} className={card.color} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 sm:mb-6">Recent Tasks</h2>
          <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl shadow-sm overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-zinc-800">
              <thead className="bg-gray-50 dark:bg-zinc-800">
                <tr>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Task</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Due Date</th>
                  <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Priority</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-zinc-900 divide-y divide-gray-200 dark:divide-zinc-800">
                {sampleTasks.map((task) => (
                  <tr key={task.id} className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{task.title}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{task.dueDate}</td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        task.priority === 'High'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                          : task.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      }`}>
                        {task.priority}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}