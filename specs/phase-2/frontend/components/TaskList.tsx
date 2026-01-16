'use client';

import { useState, useEffect } from 'react';
import apiClient from '@/lib/api';
import TaskForm from './TaskForm';

interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get('/api/tasks');
      setTasks(response.data);
    } catch (err) {
      setError('Failed to fetch tasks');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    setShowForm(false);
    setEditingTask(null);
    fetchTasks(); // Refresh the task list
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleDelete = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await apiClient.delete(`/api/tasks/${taskId}`);
        fetchTasks(); // Refresh the task list
      } catch (err) {
        setError('Failed to delete task');
        console.error('Error deleting task:', err);
      }
    }
  };

  const toggleCompletion = async (task: Task) => {
    try {
      await apiClient.patch(`/api/tasks/${task.id}/complete`);
      fetchTasks(); // Refresh the task list
    } catch (err) {
      setError('Failed to update task');
      console.error('Error updating task:', err);
    }
  };

  // Filter tasks based on selected filter
  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true; // 'all' filter
  });

  if (loading) return <div className="text-center py-10">Loading tasks...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Todo List</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
        >
          Add Task
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      {/* Filter buttons */}
      <div className="flex space-x-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1 rounded ${filter === 'all' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`px-3 py-1 rounded ${filter === 'active' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-3 py-1 rounded ${filter === 'completed' ? 'bg-indigo-600 text-white' : 'bg-gray-200'}`}
        >
          Completed
        </button>
      </div>

      {/* Task list */}
      <div className="bg-white shadow-md rounded">
        {filteredTasks.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No tasks found. {tasks.length > 0 ? 'Change your filter or' : ''} Create your first task!</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredTasks.map((task) => (
              <li key={task.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleCompletion(task)}
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <span className={`ml-3 text-sm ${task.completed ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                      {task.title}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEdit(task)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(task.id)}
                      className="text-red-600 hover:text-red-900 text-sm font-medium"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {task.description && (
                  <div className="mt-2 ml-7 text-sm text-gray-500">
                    {task.description}
                  </div>
                )}
                <div className="mt-2 ml-7 text-xs text-gray-400">
                  Created: {new Date(task.created_at).toLocaleDateString()} | 
                  Updated: {new Date(task.updated_at).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Task form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              {editingTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <TaskForm 
              task={editingTask || undefined} 
              onSave={handleSave} 
              onCancel={() => {
                setShowForm(false);
                setEditingTask(null);
              }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}