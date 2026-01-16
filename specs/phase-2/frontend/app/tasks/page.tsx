'use client';

import { useState, useEffect } from 'react';
import TaskList from '@/components/TaskList';

export default function TasksPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <TaskList />
      </div>
    </div>
  );
}