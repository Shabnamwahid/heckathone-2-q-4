"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in by checking for token in localStorage
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Redirect to home page
    router.push('/');
    router.refresh(); // Refresh to update navbar state
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              TodoFlow
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-10">
            <Link href="/" className="text-slate-700 hover:text-blue-600 font-medium text-lg">
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link href="/tasks" className="text-slate-700 hover:text-blue-600 font-medium text-lg">
                  Tasks
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-slate-700 hover:text-blue-600 font-medium text-lg"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="text-slate-700 hover:text-blue-600 font-medium text-lg">
                  Login
                </Link>
                <Link href="/register" className="text-slate-700 hover:text-blue-600 font-medium text-lg">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-3 rounded-lg text-slate-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="h-7 w-7"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-4 pt-4 pb-5 space-y-3 bg-white shadow-xl">
            <Link
              href="/"
              className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  href="/tasks"
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Tasks
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="block w-full text-left px-4 py-3 rounded-xl text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block px-4 py-3 rounded-xl text-lg font-medium text-slate-700 hover:text-blue-600 hover:bg-slate-50"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}