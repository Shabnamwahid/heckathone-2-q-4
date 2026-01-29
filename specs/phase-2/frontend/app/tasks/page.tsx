'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { tasksAPI } from '../../lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Redirect to login if not authenticated
      router.push('/login');
      return;
    }

    // Load tasks on component mount
    loadTasks();
  }, [router]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await tasksAPI.getAll();
      setTasks(data);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newTaskTitle.trim()) {
      setError('Task title is required');
      return;
    }

    try {
      const newTask = await tasksAPI.create({
        title: newTaskTitle,
        description: newTaskDescription,
        completed: false
      });

      setTasks([...tasks, newTask]);
      setNewTaskTitle('');
      setNewTaskDescription('');
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to create task');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await tasksAPI.delete(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to delete task');
    }
  };

  const handleToggleComplete = async (taskId: string) => {
    try {
      const updatedTask = await tasksAPI.toggleComplete(taskId);
      setTasks(tasks.map(task =>
        task.id === taskId ? updatedTask : task
      ));
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const startEditing = (task: Task) => {
    setEditingTaskId(task.id);
    setEditTitle(task.title);
    setEditDescription(task.description || '');
  };

  const handleSaveEdit = async () => {
    if (!editingTaskId) return;

    try {
      const updatedTask = await tasksAPI.update(editingTaskId, {
        title: editTitle,
        description: editDescription
      });

      setTasks(tasks.map(task =>
        task.id === editingTaskId ? updatedTask : task
      ));
      setEditingTaskId(null);
      setError('');
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
  };

  // Show redirect message if loading
  if (loading && tasks.length === 0) {
    return (
      <div className="min-h-[calc(100vh-120px)] flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900">Your Task Dashboard</h1>
          <p className="text-slate-600 mt-3 text-lg">Manage and organize your tasks efficiently</p>
        </div>

        {error && (
          <div className="mb-8 p-5 bg-red-50 text-red-700 rounded-xl border border-red-200 max-w-2xl mx-auto shadow-sm">
            {error}
          </div>
        )}

        {/* Add Task Form */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg p-8 border border-slate-200 max-w-2xl mx-auto">
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">Create New Task</h2>
          <form onSubmit={handleCreateTask} className="space-y-6">
            <div>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 text-lg"
                required
              />
            </div>
            <div>
              <textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Add details (optional)"
                className="w-full px-5 py-4 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700"
                rows={4}
              />
            </div>
            <button
              type="submit"
              className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300 shadow-md text-lg"
            >
              Add New Task
            </button>
          </form>
        </div>

        {/* Tasks List */}
        <div>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-slate-800">Your Tasks</h2>
            <span className="bg-blue-100 text-blue-800 text-base font-medium px-4 py-2 rounded-full">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
            </span>
          </div>

          {tasks.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl shadow-lg border border-slate-200 max-w-2xl mx-auto">
              <div className="mx-auto w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-slate-800 mb-3">No tasks yet</h3>
              <p className="text-slate-600 max-w-md mx-auto text-lg">
                Get started by creating your first task. Organize your day and boost your productivity.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className={`rounded-2xl p-6 shadow-lg transition-all duration-300 border ${
                    task.completed
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-slate-200 hover:shadow-xl'
                  }`}
                >
                  {editingTaskId === task.id ? (
                    // Edit Mode
                    <div className="space-y-5">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-xl font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full px-4 py-3 border border-slate-300 rounded-xl text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={3}
                      />
                      <div className="flex space-x-4 pt-3">
                        <button
                          onClick={handleSaveEdit}
                          className="px-5 py-2.5 bg-green-600 text-white rounded-xl text-base font-medium hover:bg-green-700 transition-colors shadow-sm"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="px-5 py-2.5 bg-slate-200 text-slate-700 rounded-xl text-base font-medium hover:bg-slate-300 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={() => handleToggleComplete(task.id)}
                          className="mt-1.5 mr-4 h-6 w-6 text-blue-600 rounded focus:ring-blue-500 cursor-pointer"
                        />
                        <div className="flex-1">
                          <h3 className={`text-xl font-semibold ${task.completed ? 'line-through text-slate-500' : 'text-slate-800'}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`mt-3 text-slate-600 ${task.completed ? 'line-through' : ''}`}>
                              {task.description}
                            </p>
                          )}
                          <div className="mt-4 text-sm text-slate-500 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Created: {new Date(task.created_at).toLocaleDateString()}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex space-x-3 justify-end">
                        <button
                          onClick={() => startEditing(task)}
                          className="px-4 py-2.5 bg-slate-100 text-slate-700 rounded-xl text-base font-medium hover:bg-slate-200 transition-colors flex items-center shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task.id)}
                          className="px-4 py-2.5 bg-red-100 text-red-700 rounded-xl text-base font-medium hover:bg-red-200 transition-colors flex items-center shadow-sm"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}