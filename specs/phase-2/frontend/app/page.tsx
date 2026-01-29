export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Streamline Your <span className="text-blue-600">Productivity</span> with TodoFlow
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            The professional task management solution trusted by teams worldwide to organize workflows and achieve goals.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-10 mb-16 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Get Started in Seconds</h2>
          <p className="text-slate-600 mb-8 text-center max-w-md mx-auto">
            Join thousands of professionals who rely on our platform to stay organized and productive.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-5">
            <a
              href="/login"
              className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors duration-300 text-center shadow-md"
            >
              Sign In to Your Account
            </a>
            <a
              href="/register"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors duration-300 text-center shadow-md"
            >
              Create New Account
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3 text-center">Centralized Organization</h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Keep all your tasks in one secure, accessible location with our intuitive interface.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3 text-center">Progress Tracking</h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Monitor your progress with real-time updates and important deadline notifications.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 hover:shadow-lg transition-all duration-300">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-xl text-slate-800 mb-3 text-center">Goal Achievement</h3>
            <p className="text-slate-600 text-center leading-relaxed">
              Complete tasks efficiently and accomplish your personal and professional objectives.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}