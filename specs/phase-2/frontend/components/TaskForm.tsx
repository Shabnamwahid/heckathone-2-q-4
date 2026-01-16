'use client';

import { useState } from 'react';
import apiClient from '@/lib/api';

interface Task {
  id?: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TaskFormProps {
  task?: Task;
  onSave: () => void;
  onCancel: () => void;
}

export default function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [title, setTitle] = useState(task?.title || '');
  const [description, setDescription] = useState(task?.description || '');
  const [completed, setCompleted] = useState(task?.completed || false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      setError('Title is required');
      return;
    }

    try {
      if (task && task.id) {
        // Update existing task
        await apiClient.put(`/api/tasks/${task.id}`, {
          title,
          description,
          completed
        });
      } else {
        // Create new task
        await apiClient.post('/api/tasks', {
          title,
          description,
          completed
        });
      }
      
      onSave();
    } catch (err) {
      setError(task ? 'Failed to update task' : 'Failed to create task');
      console.error(`Error ${task ? 'updating' : 'creating'} task:`, err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title *
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Task title"
        />
      </div>
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Task description (optional)"
          rows={3}
        />
      </div>
      <div className="mb-6 flex items-center">
        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
          className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="completed" className="text-gray-700 text-sm">
          Completed
        </label>
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {task ? 'Update Task' : 'Create Task'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}