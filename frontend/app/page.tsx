'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Home() {
  const router = useRouter();
  
  // Check for authentication token
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center my-8">TodoFlow</h1>
        <div className="text-center my-8">
          <Link href="/login" className="bg-blue-500 text-white px-6 py-3 rounded mr-4">Login</Link>
          <Link href="/register" className="bg-green-500 text-white px-6 py-3 rounded">Register</Link>
        </div>
      </div>
    </div>
  );
}