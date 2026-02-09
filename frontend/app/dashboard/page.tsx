'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { tasksAPI } from '@/lib/api';

export default function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await tasksAPI.getTasks(userId);
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await tasksAPI.createTask(userId, { title, description });
      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to add task');
      console.error('Error adding task:', err);
    }
  };

  const handleUpdateTask = async (id, updates) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await tasksAPI.updateTask(userId, id, updates);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setError('');
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      await tasksAPI.deleteTask(userId, id);
      setTasks(tasks.filter(task => task.id !== id));
      setError('');
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        throw new Error('User ID not found');
      }
      const response = await tasksAPI.toggleTask(userId, id);
      setTasks(tasks.map(task => task.id === id ? response.data : task));
      setError('');
    } catch (err) {
      setError('Failed to update task');
      console.error('Error toggling task:', err);
    }
  };

  if (!isAuthenticated) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    }
    return <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Redirecting to login...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-200">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-2">Task Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your tasks efficiently</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Task Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit transition-all duration-200 hover:shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Add New Task</h2>

              <form onSubmit={handleAddTask} className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                    rows={3}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800"
                >
                  Add Task
                </button>
              </form>
            </div>
          </div>

          {/* Tasks List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Your Tasks</h2>
                <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-sm font-medium px-3 py-1 rounded-full">
                  {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}
                </span>
              </div>

              {loading ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading your tasks...</p>
                </div>
              ) : tasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">No tasks yet</h3>
                  <p className="text-gray-500 dark:text-gray-400">Get started by adding a new task</p>
                </div>
              ) : (
                <div className="space-y-4 max-h-[calc(100vh-250px)] overflow-y-auto pr-2">
                  {tasks.map(task => (
                    <div
                      key={task.id}
                      className="p-5 bg-white dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-sm transition-shadow duration-200"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start gap-3">
                            <button
                              onClick={() => handleToggleComplete(task.id)}
                              className={`flex-shrink-0 w-5 h-5 mt-1 rounded-full border flex items-center justify-center ${
                                task.completed
                                  ? 'bg-green-500 border-green-500'
                                  : 'border-gray-300 dark:border-gray-500'
                              }`}
                            >
                              {task.completed && (
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                                </svg>
                              )}
                            </button>
                            <div>
                              <h3 className={`text-lg font-medium truncate ${
                                task.completed
                                  ? 'text-gray-500 dark:text-gray-400 line-through'
                                  : 'text-gray-900 dark:text-white'
                              }`}>
                                {task.title}
                              </h3>
                              {task.description && (
                                <p className={`mt-1 text-gray-600 dark:text-gray-300 ${
                                  task.completed ? 'text-gray-400 dark:text-gray-500' : ''
                                }`}>
                                  {task.description}
                                </p>
                              )}
                              <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                                {new Date(task.created_at).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2 flex-shrink-0 mt-3 sm:mt-0">
                          <button
                            onClick={() => handleToggleComplete(task.id)}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition ${
                              task.completed
                                ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/40 dark:text-yellow-300'
                                : 'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-800/40 dark:text-green-300'
                            }`}
                          >
                            {task.completed ? 'Undo' : 'Complete'}
                          </button>
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="px-3 py-1.5 bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/40 dark:text-red-300 rounded-md text-sm font-medium transition"
                          >
                            Delete
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          task.completed
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                        }`}>
                          {task.completed ? (
                            <>
                              <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-green-400" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                              </svg>
                              Completed
                            </>
                          ) : (
                            <>
                              <svg className="-ml-0.5 mr-1.5 h-2 w-2 text-red-400" fill="currentColor" viewBox="0 0 8 8">
                                <circle cx="4" cy="4" r="3" />
                              </svg>
                              Pending
                            </>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}