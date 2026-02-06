import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TodoFlow',
  description: 'A modern todo application with authentication',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  );
}