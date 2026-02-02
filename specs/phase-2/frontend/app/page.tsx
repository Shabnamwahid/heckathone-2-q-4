import { LayoutDashboard, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-zinc-900 dark:to-zinc-950 py-12 sm:py-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 dark:text-white mb-6 leading-tight">
            Streamline Your <span className="text-blue-600 dark:text-blue-400">Productivity</span> with TodoFlow
          </h1>
          <p className="text-lg md:text-xl text-zinc-700 dark:text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-10">
            The professional task management solution trusted by teams worldwide to organize workflows and achieve goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 text-center shadow-lg transform hover:-translate-y-0.5 transition-transform"
            >
              Sign In to Your Account
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-300 font-semibold rounded-xl border border-blue-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700 transition-colors duration-300 text-center shadow-lg"
            >
              Create New Account
            </a>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <LayoutDashboard className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl text-zinc-800 dark:text-zinc-100 mb-4 text-center">Centralized Organization</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed">
              Keep all your tasks in one secure, accessible location with our intuitive interface.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <TrendingUp className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl text-zinc-800 dark:text-zinc-100 mb-4 text-center">Progress Tracking</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed">
              Monitor your progress with real-time updates and important deadline notifications.
            </p>
          </div>
          <div className="bg-white dark:bg-zinc-800 rounded-2xl p-8 shadow-xl border border-zinc-200 dark:border-zinc-700 hover:shadow-2xl transition-shadow duration-300">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center mb-6 mx-auto">
              <CheckCircle className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl text-zinc-800 dark:text-zinc-100 mb-4 text-center">Goal Achievement</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed">
              Complete tasks efficiently and accomplish your personal and professional objectives.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl p-10 text-center text-white shadow-2xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Productivity?</h2>
          <p className="text-blue-100 text-lg mb-6 max-w-2xl mx-auto">
            Join thousands of professionals who rely on TodoFlow to stay organized and achieve their goals.
          </p>
          <a
            href="/register"
            className="inline-block px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors duration-300 shadow-lg"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </div>
  );
}