export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Welcome to <span className="text-blue-600">TodoFlow</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto">
            Streamline your productivity with our intuitive task management platform.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border border-slate-100">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">Get Started Today</h2>
          <p className="text-slate-600 mb-8 text-center max-w-md mx-auto">
            Join thousands of users who trust our platform to organize their daily tasks and achieve their goals.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="/login"
              className="px-8 py-3.5 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-300 text-center shadow-sm"
            >
              Sign In to Your Account
            </a>
            <a
              href="/register"
              className="px-8 py-3.5 bg-white text-blue-600 font-semibold rounded-lg border border-blue-200 hover:bg-blue-50 transition-colors duration-300 text-center shadow-sm"
            >
              Create New Account
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 text-center">Organize</h3>
            <p className="text-slate-600 text-center">Keep all your tasks in one centralized location</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 text-center">Track</h3>
            <p className="text-slate-600 text-center">Monitor your progress and important deadlines</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-bold text-lg text-slate-800 mb-2 text-center">Achieve</h3>
            <p className="text-slate-600 text-center">Complete tasks and accomplish your goals</p>
          </div>
        </div>
      </div>
    </div>
  );
}