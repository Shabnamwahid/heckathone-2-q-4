import Navbar from '../components/Navbar';
import './globals.css';

export const metadata = {
  title: 'TodoFlow - Professional Task Management',
  description: 'Streamline your productivity with TodoFlow, the professional task management solution',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
