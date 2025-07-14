import React, { useState, useEffect } from 'react'; // Import useEffect
import { useNavigate } from 'react-router-dom';

const CampusCore = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showLoginSuccess, setShowLoginSuccess] = useState(false);
  const [showLogoutSuccess, setShowLogoutSuccess] = useState(false); // New state for logout success
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state to track login status
  const [loginData, setLoginData] = useState({ userId: '', password: '' });
  const [registerData, setRegisterData] = useState({ userId: '', password: '', confirmUserId: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Simulate checking login status (e.g., from local storage)
  useEffect(() => {
    const userToken = localStorage.getItem('userToken'); // Or check context/Redux store
    if (userToken) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!loginData.userId || !loginData.password) {
      setError('User ID and Password are required.');
      return;
    }
    if (loginData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // TODO: Send credentials securely to backend API using HTTPS
    // Example:
    // const response = await fetch('/api/login', { method: 'POST', body: JSON.stringify(loginData) });
    // if (response.ok) { /* handle login */ }
    // For demo, simulate login
    setIsLoggedIn(true);
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 2000);
    navigate('/admin-dashboard');
  };

  const handleRegisterLogin = async (e) => {
    e.preventDefault();
    setError('');
    // Basic validation
    if (!registerData.userId || !registerData.password || !registerData.confirmUserId || !registerData.confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (registerData.userId !== registerData.confirmUserId) {
      setError('User IDs do not match.');
      return;
    }
    if (registerData.password !== registerData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // TODO: Send registration data securely to backend API using HTTPS
    // Example:
    // const response = await fetch('/api/register', { method: 'POST', body: JSON.stringify(registerData) });
    // if (response.ok) { /* handle registration */ }
    setShowLoginSuccess(true);
    setTimeout(() => setShowLoginSuccess(false), 2000);
    // Optionally switch to login tab
    setActiveTab('login');
  };

  const handleLogout = () => {
    // Clear any session data
    localStorage.removeItem('userToken'); // Remove the dummy token
    setIsLoggedIn(false); // Update login status
    setShowLogoutSuccess(true); // Show logout success message
    setTimeout(() => setShowLogoutSuccess(false), 2000); // Hide after 2 seconds
    navigate('/'); // Redirect to the home/login page
  };

  return (
    <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
      {/* Login Success Message */}
      {showLoginSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          Login Successful
        </div>
      )}

      {/* Logout Success Message */}
      {showLogoutSuccess && (
        <div className="fixed top-6 right-6 z-50 bg-yellow-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          Logged Out Successfully
        </div>
      )}

      {error && (
        <div className="fixed top-20 right-6 z-50 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          {error}
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

        {/* Right Panel - Forms / Logout Button */}
        <div className="p-8 md:w-3/5">
          {isLoggedIn ? (
            // Show logout button if logged in
            <div className="text-center animate-fadeIn">
              <h3 className="text-xl font-semibold mb-6 text-gray-800">You are logged in!</h3>
              <p className="text-gray-600 mb-8">
                Welcome back to Campus Core. You can access your dashboard now.
              </p>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg"
              >
                Logout
              </button>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/admin-dashboard')}
                  className="text-blue-600 hover:underline"
                >
                  Go to Dashboard
                </button>
              </div>
            </div>
          ) : (
            // Show login/register tabs if not logged in
            <>
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
                        value={loginData.userId}
                        onChange={e => setLoginData({ ...loginData, userId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your user ID"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={loginData.password}
                        onChange={e => setLoginData({ ...loginData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your password"
                        required
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
                        value={registerData.userId}
                        onChange={e => setRegisterData({ ...registerData, userId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Create your user ID"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                      <input
                        type="password"
                        value={registerData.password}
                        onChange={e => setRegisterData({ ...registerData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Create a password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm User Id</label>
                      <input
                        type="text"
                        value={registerData.confirmUserId}
                        onChange={e => setRegisterData({ ...registerData, confirmUserId: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Re-enter your user ID"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                      <input
                        type="password"
                        value={registerData.confirmPassword}
                        onChange={e => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Re-enter your password"
                        required
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
            </>
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