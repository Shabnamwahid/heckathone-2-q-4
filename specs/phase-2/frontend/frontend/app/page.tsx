import { LayoutDashboard, TrendingUp, CheckCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-zinc-900 dark:text-white mb-4 sm:mb-6 leading-tight">
            Streamline Your <span className="text-blue-600 dark:text-blue-400">Productivity</span> with TodoFlow
          </h1>
          <p className="text-base md:text-lg text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
            The professional task management solution trusted by teams worldwide to organize workflows and achieve goals.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-800 rounded-xl sm:rounded-2xl shadow-lg p-6 sm:p-10 mb-12 sm:mb-16 border border-zinc-200 dark:border-zinc-700">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-800 dark:text-zinc-100 mb-3 sm:mb-4 text-center">Get Started in Seconds</h2>
          <p className="text-zinc-600 dark:text-zinc-300 mb-6 sm:mb-8 text-center max-w-md mx-auto">
            Join thousands of professionals who rely on our platform to stay organized and productive.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5">
            <a
              href="/login"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-blue-600 text-white font-semibold rounded-lg sm:rounded-xl hover:bg-blue-700 transition-colors duration-300 text-center shadow-md"
            >
              Sign In to Your Account
            </a>
            <a
              href="/register"
              className="px-6 py-3 sm:px-8 sm:py-4 bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-300 font-semibold rounded-lg sm:rounded-xl border border-blue-200 dark:border-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors duration-300 text-center shadow-md"
            >
              Create New Account
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <LayoutDashboard className="text-blue-600 dark:text-blue-400 w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3 text-center">Centralized Organization</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed mt-2">
              Keep all your tasks in one secure, accessible location with our intuitive interface.
            </p>
          </div>
          <div className="flex flex-col bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <TrendingUp className="text-blue-600 dark:text-blue-400 w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3 text-center">Progress Tracking</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed mt-2">
              Monitor your progress with real-time updates and important deadline notifications.
            </p>
          </div>
          <div className="flex flex-col bg-white dark:bg-zinc-900 p-6 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-800 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mb-4 sm:mb-6 mx-auto">
              <CheckCircle className="text-blue-600 dark:text-blue-400 w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="font-bold text-xl text-zinc-800 dark:text-zinc-100 mb-2 sm:mb-3 text-center">Goal Achievement</h3>
            <p className="text-zinc-700 dark:text-zinc-300 text-center leading-relaxed mt-2">
              Complete tasks efficiently and accomplish your personal and professional objectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}