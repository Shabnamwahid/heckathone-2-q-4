'use client';

import Navbar from '../components/Navbar';
import { AuthProvider } from './context/AuthContext';
import { TasksProvider } from './context/TasksContext';
import { ReactNode } from 'react';

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <TasksProvider>
        <Navbar />
        <main>{children}</main>
      </TasksProvider>
    </AuthProvider>
  );
}