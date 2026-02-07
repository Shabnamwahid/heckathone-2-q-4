'use client';

import { useState, useEffect } from 'react';
import { Plus, Check, Trash2, Edit3, Loader2 } from 'lucide-react';
import { tasksAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

// Define the Task type
type Task = {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  created_at: string; // Backend returns this in ISO format
  updated_at: string;
  user_id: string;
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isAuthenticated } = useAuth();

  // Load tasks from API
  useEffect(() => {
    if (isAuthenticated) {
      fetchTasks();
    }
  }, [isAuthenticated]);

  const fetchTasks = async () => {
    try {
      setIsLoading(true);
      const response = await tasksAPI.getTasks();
      setTasks(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to load tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      if (editingTask) {
        // Update existing task
        const response = await tasksAPI.updateTask(editingTask.id, {
          title,
          description
        });
        
        setTasks(tasks.map(task => 
          task.id === editingTask.id 
            ? response.data 
            : task
        ));
        setEditingTask(null);
      } else {
        // Add new task
        const response = await tasksAPI.createTask({
          title,
          description
        });
        
        setTasks([...tasks, response.data]);
      }
      
      // Reset form
      setTitle('');
      setDescription('');
    } catch (err: any) {
      setError(err.message || 'Failed to save task');
      console.error('Error saving task:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleTaskCompletion = async (id: string) => {
    try {
      const response = await tasksAPI.toggleTask(id);
      
      setTasks(tasks.map(task => 
        task.id === id 
          ? response.data 
          : task
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update task');
      console.error('Error toggling task:', err);
    }
  };

  const deleteTask = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await tasksAPI.deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err: any) {
        setError(err.message || 'Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const startEditing = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDescription(task.description || '');
  };

  const cancelEdit = () => {
    setEditingTask(null);
    setTitle('');
    setDescription('');
  };

  const incompleteTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Please log in to view your tasks</h2>
          <p className="text-gray-600 mb-6">You need to be logged in to access your task list.</p>
          <a 
            href="/login" 
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">My Tasks</h1>
          <p className="mt-3 text-lg text-gray-600">
            Manage your tasks efficiently and boost your productivity
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 rounded-md bg-red-50 p-4">
            <div className="text-sm text-red-700">{error}</div>
          </div>
        )}

        {/* Add Task Form */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            {editingTask ? 'Edit Task' : 'Add New Task'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="Task title"
                  required
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                  placeholder="Task description"
                />
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-1 animate-spin" />
                    {editingTask ? 'Updating...' : 'Adding...'}
                  </>
                ) : (
                  <>
                    <Plus className="h-5 w-5 mr-1" />
                    {editingTask ? 'Update Task' : 'Add Task'}
                  </>
                )}
              </button>
              {editingTask && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  disabled={isSubmitting}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
          </div>
        ) : (
          <>
            {/* Incomplete Tasks Section */}
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Pending Tasks</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {incompleteTasks.length} tasks
                </span>
              </div>
              
              {incompleteTasks.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="text-gray-400 mb-2">No pending tasks</div>
                  <p className="text-gray-600">Great job! You've completed all your tasks.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {incompleteTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow duration-300"
                    >
                      <div className="flex items-start">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="flex-shrink-0 h-5 w-5 mt-1 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Mark as complete"
                        >
                          {task.completed && (
                            <Check className="h-4 w-4 text-white bg-blue-500 rounded-full" />
                          )}
                        </button>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{task.title}</h3>
                          <p className="text-gray-600 mt-1">{task.description}</p>
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => startEditing(task)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                            aria-label="Edit task"
                          >
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                            aria-label="Delete task"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Completed Tasks Section */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">Completed Tasks</h2>
                <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
                  {completedTasks.length} tasks
                </span>
              </div>
              
              {completedTasks.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <div className="text-gray-400 mb-2">No completed tasks yet</div>
                  <p className="text-gray-600">Complete some tasks to see them here.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4">
                  {completedTasks.map((task) => (
                    <div 
                      key={task.id} 
                      className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 opacity-75"
                    >
                      <div className="flex items-start">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className="flex-shrink-0 h-5 w-5 mt-1 rounded-full border-2 border-gray-300 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                          aria-label="Mark as incomplete"
                        >
                          {task.completed && (
                            <Check className="h-4 w-4 text-white bg-blue-500 rounded-full" />
                          )}
                        </button>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900 line-through">{task.title}</h3>
                          <p className="text-gray-600 mt-1 line-through">{task.description}</p>
                          <div className="mt-3 flex items-center text-sm text-gray-500">
                            <span>Created: {new Date(task.created_at).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex space-x-2 ml-4">
                          <button
                            onClick={() => startEditing(task)}
                            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50 disabled:opacity-50"
                            aria-label="Edit task"
                            disabled
                          >
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                            aria-label="Delete task"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}