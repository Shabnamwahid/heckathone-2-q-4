import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            <span className="block">Streamline Your Tasks with</span>
            <span className="block text-blue-600 mt-2">TodoFlow</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            A modern, secure todo application that helps you organize your life. Manage your tasks efficiently with our intuitive interface.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Get started
              </Link>
            </div>
            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Task Management</h3>
            </div>
            <p className="text-gray-600">
              Organize your tasks efficiently with our intuitive interface. Create, update, and manage your to-dos with ease.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Secure Authentication</h3>
            </div>
            <p className="text-gray-600">
              Your data is protected with industry-standard security measures. Rest assured that your tasks are private and secure.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <div className="bg-purple-100 p-3 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="ml-4 text-lg font-medium text-gray-900">Responsive Design</h3>
            </div>
            <p className="text-gray-600">
              Access your tasks anywhere, anytime. Our application works seamlessly across all devices.
            </p>
          </div>
        </div>
        
        <div className="mt-16 bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">How TodoFlow Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Sign Up</h3>
                <p className="mt-2 text-gray-600">Create your account in seconds</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Add Tasks</h3>
                <p className="mt-2 text-gray-600">Create and organize your tasks</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Track Progress</h3>
                <p className="mt-2 text-gray-600">Monitor your productivity</p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-blue-100 rounded-full p-4 w-16 h-16 flex items-center justify-center">
                  <span className="text-blue-600 font-bold text-xl">4</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Achieve Goals</h3>
                <p className="mt-2 text-gray-600">Complete tasks and stay organized</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}