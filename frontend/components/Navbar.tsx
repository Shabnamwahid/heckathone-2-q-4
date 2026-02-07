'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { LogOut, Menu, X, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Tasks', href: '/tasks' },
  ];

  const authLinks = [
    { name: 'Login', href: '/login' },
    { name: 'Register', href: '/register' },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600">TodoFlow</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {isAuthenticated ? (
                navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(link.href)
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))
              ) : (
                authLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      isActive(link.href)
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))
              )}
            </div>
          </div>
          
          <div className="hidden md:flex items-center">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-700">
                  <User className="h-5 w-5 mr-1 text-gray-500" />
                  <span>{user?.full_name || user?.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="ml-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {isAuthenticated ? (
              navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(link.href)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))
            ) : (
              authLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                    isActive(link.href)
                      ? 'bg-blue-50 border-blue-500 text-blue-700'
                      : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                  }`}
                >
                  {link.name}
                </Link>
              ))
            )}
            {!isAuthenticated && (
              <Link
                href="/login"
                className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              >
                Login
              </Link>
            )}
            {isAuthenticated && (
              <div className="flex items-center justify-between px-3 py-2">
                <div className="flex items-center text-base font-medium text-gray-700">
                  <User className="h-5 w-5 mr-2 text-gray-500" />
                  <span>{user?.full_name || user?.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-sm text-gray-700 hover:text-gray-900"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;