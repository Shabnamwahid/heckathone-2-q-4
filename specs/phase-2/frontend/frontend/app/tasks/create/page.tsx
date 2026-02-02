'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import TaskForm from '@/components/TaskForm';

export default function CreateTaskPage() {
  const router = useRouter();

  const handleSave = () => {
    // Redirect to tasks list after saving
    router.push('/tasks');
  };

  const handleCancel = () => {
    // Redirect back to tasks list
    router.push('/tasks');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Task</h1>
          <TaskForm onSave={handleSave} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}