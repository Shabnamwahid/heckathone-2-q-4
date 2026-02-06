'use client';

import { useState } from 'react';
import { Plus, Check, Trash2 } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask,
        completed: false,
      };
      setTasks([...tasks, task]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-zinc-800 dark:text-zinc-100 mb-2">
            TodoFlow
          </h1>
          <p className="text-zinc-600 dark:text-zinc-400">
            Your tasks, simplified.
          </p>
        </header>

        <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-xl p-6 border border-zinc-200 dark:border-zinc-700">
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              className="flex-1 px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-zinc-700 dark:text-white"
              onKeyDown={(e) => e.key === 'Enter' && addTask()}
            />
            <button
              onClick={addTask}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-3">
            {tasks.length === 0 ? (
              <p className="text-center text-zinc-500 dark:text-zinc-400 py-4">
                No tasks yet. Add your first task!
              </p>
            ) : (
              tasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center p-3 rounded-lg border ${
                    task.completed
                      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50'
                      : 'bg-white dark:bg-zinc-700 border-zinc-200 dark:border-zinc-600'
                  }`}
                >
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mr-3 flex-shrink-0 w-5 h-5 rounded border flex items-center justify-center ${
                      task.completed
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-zinc-300 dark:border-zinc-600'
                    }`}
                  >
                    {task.completed && <Check className="w-4 h-4" />}
                  </button>
                  <span
                    className={`flex-1 ${
                      task.completed
                        ? 'line-through text-zinc-500 dark:text-zinc-400'
                        : 'text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    {task.title}
                  </span>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 p-1"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}