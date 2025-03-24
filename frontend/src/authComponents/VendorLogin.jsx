import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const VendorLogin = () => {
    const { handleVendorLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await handleVendorLogin(email, password);
            router("/"); // Redirect to dashboard or home after login
        } catch (e) {
            setErrorMessage("Invalid email or password. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
            <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-xl shadow-xl overflow-hidden">
                {/* Left Side Info */}
                <div className="hidden md:flex flex-col justify-center w-1/2 bg-gradient-to-br from-blue-500 to-blue-700 text-white p-10">
                    <div className="mb-4">
                        <div className="inline-block p-3 bg-blue-400 bg-opacity-30 rounded-full mb-6">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                    <p className="mb-8 text-lg leading-relaxed">
                        Access your vendor dashboard to manage services, appointments, and connect with customers. 
                        Grow your business with our comprehensive tools.
                    </p>
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="p-1 bg-blue-400 bg-opacity-30 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Manage your appointments</span>
                        </div>
                        <div className="flex items-center">
                            <div className="p-1 bg-blue-400 bg-opacity-30 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Attract more customers</span>
                        </div>
                        <div className="flex items-center">
                            <div className="p-1 bg-blue-400 bg-opacity-30 rounded-full mr-3">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span>Track your business growth</span>
                        </div>
                    </div>
                    <div className="mt-10">
                        <button
                            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition duration-300 shadow-md"
                            onClick={() => router('/auth/vendor/register')}
                        >
                            New Vendor? Register Here
                        </button>
                    </div>
                </div>
                {/* Right Side Login Form */}
                <div className="w-full md:w-1/2 p-10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">Vendor Login</h2>
                        <p className="text-gray-600">Login to access your vendor dashboard</p>
                    </div>
                    
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                            <p>{errorMessage}</p>
                        </div>
                    )}
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    placeholder="your@email.com"
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center justify-between mb-1">
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <button
                                    type="button"
                                    className="text-sm text-blue-600 hover:text-blue-800"
                                    onClick={() => router('/auth/vendor/forgot-password')}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300 shadow-md ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Logging in...' : 'Login to Dashboard'}
                        </button>
                    </form>
                    
                    <div className="mt-8 text-center space-y-4">
                        <p className="text-sm text-gray-600">
                            Don't have a vendor account?{' '}
                            <button
                                className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                                onClick={() => router('/auth/vendor/register')}
                            >
                                Register as Vendor
                            </button>
                        </p>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or</span>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600">
                            Looking for user login?{' '}
                            <button
                                className="text-blue-600 font-medium hover:text-blue-800 hover:underline"
                                onClick={() => router('/auth/user/login')}
                            >
                                Login as User
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );  
};

export default VendorLogin;