import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Todo App',
  description: 'A multi-user todo application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-zinc-50 dark:bg-zinc-950 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  )
}
