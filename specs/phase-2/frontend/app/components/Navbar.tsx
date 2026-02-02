'use client';

import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, PlusCircle, User } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white dark:bg-zinc-800 shadow-sm py-4 px-6 border-b border-zinc-200 dark:border-zinc-700">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            TodoFlow
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <Link 
                href="/dashboard" 
                className="flex items-center space-x-1 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </Link>
              <Link 
                href="/tasks" 
                className="flex items-center space-x-1 text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <PlusCircle className="w-5 h-5" />
                <span>Tasks</span>
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-zinc-700 dark:text-zinc-300 text-sm">
                  {user.email}
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-zinc-700 dark:text-zinc-300 hover:text-red-600 dark:hover:text-red-400 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center space-x-4">
              <Link 
                href="/login" 
                className="text-zinc-700 dark:text-zinc-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/register" 
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}