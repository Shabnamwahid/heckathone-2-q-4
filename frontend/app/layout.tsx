"use client";

import './globals.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Providers from './providers';  // ← YE IMPORT RAKHO (tumhara providers.tsx)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('darkMode') === 'true';
    setDarkMode(saved);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }, [darkMode]);

  return (
    <html lang="en" className={darkMode ? 'dark' : ''}>
      <body className="bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Fixed Navbar */}
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-gray-900 dark:to-gray-800 backdrop-blur-md shadow-sm border-b border-blue-500/30 dark:border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <Link href="/" className="text-2xl font-bold text-white">
                TodoFlow
              </Link>

              <div className="flex items-center gap-6">
                {/* Dark Mode Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-2xl text-white focus:outline-none hover:scale-110 transition"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? '☀️' : '🌙'}
                </button>

                <Link href="/login" className="text-sm font-medium  px-5 py-2 bg-white text-blue-600 rounded-lg hover:text-blue-200 transition">
                  Login
                </Link>
                <Link href="/register" className="text-sm font-medium px-5 py-2 bg-white text-blue-600 rounded-lg hover:text-blue-200 transition ">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </nav>

        {/* AuthProvider wrap + content */}
        <main className="pt-20">
          <Providers>
            {children}
          </Providers>
        </main>
      </body>
    </html>
  );
}