'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import apiClient from '@/lib/api';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    if (!token) {
      setIsLoggedIn(false);
      router.push('/auth/login');
      return;
    }
    
    setIsLoggedIn(true);
    fetchTasks();
  }, [router]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/tasks');
      setTasks(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    try {
      const response = await apiClient.patch(`/api/tasks/${taskId}/complete`);
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      ));
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await apiClient.delete(`/api/tasks/${taskId}`);
      setTasks(tasks.filter(task => task.id !== taskId));
    } catch (err) {
      setError('Failed to delete task');
      console.error('Error deleting task:', err);
    }
  };

  if (isLoggedIn === null) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return null; // Redirect handled by useEffect
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
          <button 
            onClick={() => {
              localStorage.removeItem('jwt_token');
              router.push('/auth/login');
            }}
            className="text-indigo-600 hover:text-indigo-900"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Task</h2>
          <TaskForm onTaskAdded={fetchTasks} />
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">No tasks yet. Add your first task above!</p>
              </div>
            ) : (
              tasks.map((task) => (
                <div key={task.id} className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTaskCompletion(task.id)}
                      className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className={`ml-3 text-gray-700 ${task.completed ? 'line-through' : ''}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex space-x-3">
                    <button
                      onClick={() => {
                        // Navigate to edit page
                        router.push(`/tasks/edit/${task.id}`);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// TaskForm component
function TaskForm({ onTaskAdded }: { onTaskAdded: () => void }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      await apiClient.post('/api/tasks', {
        title,
        description,
        completed: false
      });
      
      setTitle('');
      setDescription('');
      setError('');
      onTaskAdded(); // Refresh tasks
    } catch (err) {
      setError('Failed to create task');
      console.error('Error creating task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          placeholder="Task title"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md p-2 border"
          placeholder="Task description (optional)"
        />
      </div>
      <div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Add Task
        </button>
      </div>
    </form>
  );
}