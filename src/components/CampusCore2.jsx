// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiUser, FiLock, FiCheck, FiAlertCircle, FiLogOut } from "react-icons/fi";

// const CampusCore = () => {
//   const [activeTab, setActiveTab] = useState("login");
//   const [authStatus, setAuthStatus] = useState({ 
//     type: null, 
//     message: "" 
//   });
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const [loginData, setLoginData] = useState({ userId: "", password: "" });
//   const [registerData, setRegisterData] = useState({ 
//     userId: "", 
//     password: "", 
//     confirmPassword: "" 
//   });
//   const navigate = useNavigate();

//   // Authentication status timeout cleaner
//   useEffect(() => {
//     let timer;
//     if (authStatus.type) {
//       timer = setTimeout(() => {
//         setAuthStatus({ type: null, message: "" });
//       }, 3000);
//     }
//     return () => clearTimeout(timer);
//   }, [authStatus]);

//   // Check initial auth status
//   useEffect(() => {
//     const token = localStorage.getItem("campusToken");
//     setIsLoggedIn(!!token);
//   }, []);

//   const validateForm = (data, isLogin = false) => {
//     if (!isLogin) {
//       if (!data.userId || !data.password || !data.confirmPassword) {
//         return "All fields are required";
//       }
//       if (data.userId.length < 4) {
//         return "User ID must be at least 4 characters";
//       }
//       if (data.password !== data.confirmPassword) {
//         return "Passwords do not match";
//       }
//     }
    
//     if (data.password.length < 8) {
//       return "Password must be at least 8 characters";
//     }
//     if (!/[A-Z]/.test(data.password)) {
//       return "Password must contain at least one uppercase letter";
//     }
//     if (!/[0-9]/.test(data.password)) {
//       return "Password must contain at least one number";
//     }
//     return null;
//   };

//   const handleLogin = useCallback(async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     const error = validateForm(loginData, true);
//     if (error) {
//       setAuthStatus({ type: "error", message: error });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 1000));
      
//       localStorage.setItem("campusToken", "secure-jwt-token");
//       setIsLoggedIn(true);
//       setAuthStatus({ type: "success", message: "Login successful" });
//       navigate("/admin-dashboard");
//     } catch (err) {
//       setAuthStatus({ type: "error", message: "Authentication failed. Please try again." });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [loginData, navigate]);

//   const handleRegister = useCallback(async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
    
//     const error = validateForm(registerData);
//     if (error) {
//       setAuthStatus({ type: "error", message: error });
//       setIsLoading(false);
//       return;
//     }

//     try {
//       // Simulated API call
//       await new Promise(resolve => setTimeout(resolve, 1500));
      
//       setAuthStatus({ type: "success", message: "Registration successful! Please login" });
//       setActiveTab("login");
//       setRegisterData({ userId: "", password: "", confirmPassword: "" });
//     } catch (err) {
//       setAuthStatus({ type: "error", message: "Registration failed. User may already exist." });
//     } finally {
//       setIsLoading(false);
//     }
//   }, [registerData]);

//   const handleLogout = useCallback(() => {
//     localStorage.removeItem("campusToken");
//     setIsLoggedIn(false);
//     setAuthStatus({ type: "info", message: "Logged out successfully" });
//     navigate("/");
//   }, [navigate]);

//   // Input field components
//   const InputField = ({ 
//     icon, 
//     type, 
//     value, 
//     onChange, 
//     placeholder, 
//     required = true 
//   }) => (
//     <div className="relative mb-4">
//       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//         {icon}
//       </div>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
//         placeholder={placeholder}
//         required={required}
//       />
//     </div>
//   );

//   // Auth status notification component
//   const AuthNotification = () => (
//     authStatus.type && (
//       <div 
//         className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-lg shadow-lg ${
//           authStatus.type === "success" ? "bg-green-500" :
//           authStatus.type === "error" ? "bg-red-500" :
//           "bg-blue-500"
//         } text-white flex items-center animate-fadeIn`}
//       >
//         {authStatus.type === "success" ? (
//           <FiCheck className="mr-2" />
//         ) : (
//           <FiAlertCircle className="mr-2" />
//         )}
//         {authStatus.message}
//       </div>
//     )
//   );

//   return (
//     <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden relative">
//       <AuthNotification />

//       <div className="md:flex min-h-[500px]">
//         {/* Brand Panel */}
//         <div className="bg-gradient-to-br from-blue-600 to-indigo-800 p-8 text-white md:w-2/5 flex flex-col">
//           <div className="mb-8">
//             <h1 className="text-3xl font-bold flex items-center">
//               <span className="bg-white text-blue-600 rounded-lg p-1 mr-2">
//                 <FiUser />
//               </span>
//               Campus Core
//             </h1>
//             <div className="w-12 h-1 bg-blue-300 mt-2 rounded-full"></div>
//           </div>

//           <div className="flex-grow flex items-center">
//             <div>
//               <h2 className="text-4xl font-bold mb-4">Welcome Back,</h2>
//               <p className="text-blue-100 leading-relaxed text-lg">
//                 Your gateway to academic resources, campus connections, and streamlined university management.
//               </p>
//             </div>
//           </div>

//           <div className="mt-8">
//             <div className="flex items-center">
//               <div className="h-0.5 bg-blue-400 flex-grow mr-2"></div>
//               <span className="text-blue-200 text-sm">Secure Academic Portal</span>
//               <div className="h-0.5 bg-blue-400 flex-grow ml-2"></div>
//             </div>
//           </div>
//         </div>

//         {/* Auth Panel */}
//         <div className="p-8 md:w-3/5">
//           {isLoggedIn ? (
//             <div className="text-center py-10">
//               <div className="mx-auto bg-green-100 text-green-600 rounded-full p-4 w-16 h-16 flex items-center justify-center mb-6">
//                 <FiCheck className="text-2xl" />
//               </div>
//               <h3 className="text-2xl font-semibold mb-4 text-gray-800">Authentication Verified</h3>
//               <p className="text-gray-600 mb-8 max-w-md mx-auto">
//                 You have successfully accessed the Campus Core system. Manage your academic profile and campus services.
//               </p>
//               <div className="flex flex-col sm:flex-row justify-center gap-4">
//                 <button
//                   onClick={handleLogout}
//                   className="bg-red-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-red-700 transition duration-300 shadow-md hover:shadow-lg flex items-center justify-center"
//                 >
//                   <FiLogOut className="mr-2" />
//                   Logout
//                 </button>
//                 <button
//                   onClick={() => navigate("/admin-dashboard")}
//                   className="bg-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg"
//                 >
//                   Dashboard Portal
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <>
//               <div className="flex border-b border-gray-200 mb-8">
//                 {["login", "register"].map((tab) => (
//                   <button
//                     key={tab}
//                     className={`py-3 px-6 font-medium text-lg transition-colors ${
//                       activeTab === tab
//                         ? "text-blue-600 border-b-2 border-blue-600 font-semibold"
//                         : "text-gray-500 hover:text-gray-700"
//                     }`}
//                     onClick={() => setActiveTab(tab)}
//                   >
//                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
//                   </button>
//                 ))}
//               </div>

//               {activeTab === "login" && (
//                 <div className="max-w-md mx-auto">
//                   <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
//                     Secure Sign In
//                   </h3>

//                   <form className="space-y-4" onSubmit={handleLogin}>
//                     <InputField
//                       icon={<FiUser className="text-gray-400" />}
//                       type="text"
//                       value={loginData.userId}
//                       onChange={(e) => setLoginData({ ...loginData, userId: e.target.value })}
//                       placeholder="University ID"
//                     />

//                     <InputField
//                       icon={<FiLock className="text-gray-400" />}
//                       type="password"
//                       value={loginData.password}
//                       onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//                       placeholder="Password"
//                     />

//                     <div className="flex justify-between items-center pt-2">
//                       <label className="flex items-center text-gray-600">
//                         <input
//                           type="checkbox"
//                           className="rounded text-blue-600 focus:ring-blue-500"
//                         />
//                         <span className="ml-2">Remember credentials</span>
//                       </label>
//                       <button
//                         type="button"
//                         className="text-blue-600 hover:underline text-sm"
//                       >
//                         Forgot Password?
//                       </button>
//                     </div>

//                     <div className="pt-6">
//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium transition-all ${
//                           isLoading
//                             ? "opacity-75 cursor-not-allowed"
//                             : "hover:bg-blue-700 hover:shadow-lg"
//                         } shadow-md flex justify-center items-center`}
//                       >
//                         {isLoading ? (
//                           <>
//                             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
//                             </svg>
//                             Authenticating...
//                           </>
//                         ) : (
//                           "Access Portal"
//                         )}
//                       </button>
//                     </div>
//                   </form>
//                 </div>
//               )}

//               {activeTab === "register" && (
//                 <div className="max-w-md mx-auto">
//                   <h3 className="text-2xl font-semibold mb-8 text-gray-800 text-center">
//                     New Account Registration
//                   </h3>

//                   <form className="space-y-4" onSubmit={handleRegister}>
//                     <InputField
//                       icon={<FiUser className="text-gray-400" />}
//                       type="text"
//                       value={registerData.userId}
//                       onChange={(e) => setRegisterData({ ...registerData, userId: e.target.value })}
//                       placeholder="Create University ID"
//                     />

//                     <InputField
//                       icon={<FiLock className="text-gray-400" />}
//                       type="password"
//                       value={registerData.password}
//                       onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
//                       placeholder="Create Password"
//                     />

//                     <InputField
//                       icon={<FiLock className="text-gray-400" />}
//                       type="password"
//                       value={registerData.confirmPassword}
//                       onChange={(e) => setRegisterData({ ...registerData, confirmPassword: e.target.value })}
//                       placeholder="Confirm Password"
//                     />

//                     <div className="pt-4">
//                       <button
//                         type="submit"
//                         disabled={isLoading}
//                         className={`w-full bg-indigo-600 text-white py-3 rounded-lg font-medium transition-all ${
//                           isLoading
//                             ? "opacity-75 cursor-not-allowed"
//                             : "hover:bg-indigo-700 hover:shadow-lg"
//                         } shadow-md flex justify-center items-center`}
//                       >
//                         {isLoading ? "Processing Request..." : "Register Account"}
//                       </button>
//                     </div>
//                   </form>

//                   <div className="mt-10 p-4 bg-blue-50 rounded-lg border border-blue-100">
//                     <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
//                       <FiAlertCircle className="mr-2" />
//                       Security Requirements
//                     </h4>
//                     <ul className="text-sm text-blue-700 list-disc pl-5 space-y-1">
//                       <li>Minimum 8 character password</li>
//                       <li>At least one uppercase letter</li>
//                       <li>At least one number</li>
//                       <li>University ID must be unique</li>
//                     </ul>
//                   </div>
//                 </div>
//               )}
//             </>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="bg-gray-50 py-4 px-8 border-t border-gray-100">
//         <p className="text-center text-gray-500 text-sm">
//           © {new Date().getFullYear()} Campus Core. All rights reserved. | 
//           <span className="mx-2">Privacy Policy</span> | 
//           <span className="mx-2">Terms of Service</span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default CampusCore;