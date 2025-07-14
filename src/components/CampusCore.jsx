import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CampusCore = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleLogin = (e) => {
    e.preventDefault();
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 4000); // Show for 2 seconds
    // Add your login validation logic here
    // If login is successful:
    navigate('/admin-dashboard');
  };

  const handleRegisterLogin = (e) => {
    e.preventDefault();
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 2000); // Show for 2 seconds
    // You can add registration logic here
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
      {/* Login Success Message */}
      {showLoginSuccess && (
        // <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
        //   Login Successful
        // </div>
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-xl shadow-xl animate-slide-in-down transition-all duration-500">
  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
  </svg>
  <span className="font-semibold tracking-wide">Login Successful</span>
</div>

      )}
      
      <div className="md:flex">
        {/* Left Panel - Welcome Section */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white md:w-2/5 flex flex-col">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Campus Core</h1>
            <div className="w-12 h-1 bg-blue-300 mt-2 rounded-full"></div>
          </div>
          
          <div className="flex-grow flex items-center">
            <div>
              <h2 className="text-4xl font-bold mb-4">Welcome,</h2>
              <p className="text-blue-100 leading-relaxed">
                Access your academic resources, connect with peers, and manage your campus experience.
              </p>
            </div>
          </div>
          
          <div className="mt-8 flex space-x-2">
            {[1, 2, 3].map((item) => (
              <div key={item} className="w-3 h-3 rounded-full bg-blue-300"></div>
            ))}
          </div>
        </div>
        
        {/* Right Panel - Forms */}
        <div className="p-8 md:w-3/5">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8">
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'login' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('login')}
            >
              Login
            </button>
            <button 
              className={`py-2 px-4 font-medium ${activeTab === 'register' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'}`}
              onClick={() => setActiveTab('register')}
            >
              Register
            </button>
          </div>
          
          {/* Login Form */}
          {activeTab === 'login' && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">User Login</h3>
              
              <form className="space-y-6" onSubmit={handleLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Id</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your user ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="pt-4">
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          )}
          
          {/* Register Form */}
          {activeTab === 'register' && (
            <div className="animate-fadeIn">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">Register</h3>
              
              <form className="space-y-6" onSubmit={handleRegisterLogin}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User Id</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create your user ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Create a password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm User Id</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Re-enter your user ID"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Re-enter your password"
                  />
                </div>
                
                <div className="pt-2 flex justify-between items-center">
                  <button 
                    type="submit"
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 shadow-md hover:shadow-lg"
                  >
                    Request
                  </button>
                  
                  <div className="text-sm text-gray-600">
                    <p>Ready to login?</p>
                  </div>
                </div>
              </form>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-blue-800 font-medium text-center">
                  Ready Register Login
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <div className="bg-gray-50 py-4 px-8 border-t border-gray-100">
        <p className="text-center text-gray-500 text-sm">
          © 2023 Campus Core. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default CampusCore;