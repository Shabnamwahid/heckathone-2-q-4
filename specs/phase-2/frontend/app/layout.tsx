import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SaaS Platform',
  description: 'Professional SaaS Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <nav className="fixed top-0 left-0 right-0 h-16 bg-slate-900 flex items-center justify-between px-6 shadow-md z-50">
          <div className="flex items-center space-x-2">
            <span className="text-white text-xl font-semibold">SaaS Platform</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-white hover:text-gray-300 transition-colors">
              Login
            </Link>
            <Link href="/register" className="text-white hover:text-gray-300 transition-colors">
              Register
            </Link>
          </div>
        </nav>
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  );
}