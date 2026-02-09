'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors duration-200">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Streamline Your Tasks with <span className="text-blue-600 dark:text-blue-400">TodoFlow</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              A modern, secure task management application that helps you stay organized and productive. 
              Track, manage, and complete your tasks efficiently.
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/login" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200 transform hover:-translate-y-0.5"
                >
                  Get Started
                </Link>
                <Link 
                  href="/register" 
                  className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-md transition duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Features Section */}
        <section className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Task Management</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Organize your tasks efficiently with our intuitive interface and powerful features.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Secure Authentication</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Enterprise-grade security with JWT authentication to protect your data.
              </p>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access your tasks anywhere, anytime with our responsive cross-platform design.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {!isAuthenticated && (
          <section className="py-16 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Ready to boost your productivity?</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Join thousands of users who trust TodoFlow to manage their daily tasks and achieve their goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/register" 
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-200"
                >
                  Sign Up Free
                </Link>
                <Link 
                  href="/login" 
                  className="px-8 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white font-medium rounded-lg shadow-md transition duration-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Log In
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
