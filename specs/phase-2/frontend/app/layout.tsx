import ClientWrapper from './ClientWrapper';
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
      <body className="min-h-screen antialiased bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 text-zinc-900 dark:text-zinc-100">
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  )
}
