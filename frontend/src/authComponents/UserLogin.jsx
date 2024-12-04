import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const UserLogin = () => {
    const { handleUserLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleUserLogin(email, password);
            router("/findServices"); // Redirect to home after login
        } catch (e) {
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
                {/* Left Side Info */}
                <div className="hidden md:block w-1/2 p-6 bg-indigo-600 text-white rounded-l-lg">
                    <h2 className="text-2xl font-bold mb-4">Welcome Back!</h2>
                    <p className="mb-6">
                        Log in to access your account, browse services, and manage bookings effortlessly. 
                        Stay connected with local service providers.
                    </p>
                    <button
                        className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-md hover:bg-gray-100"
                        onClick={() => router('/auth/vendor/register')}
                    >
                        Become a Vendor
                    </button>
                </div>
                {/* Right Side Login Form */}
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">User Login</h2>
                    {errorMessage && (
                        <p className="text-sm text-center text-red-600 mb-4">{errorMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                className="text-indigo-600 hover:underline"
                                onClick={() => router('/auth/user/register')}
                            >
                                Register
                            </button>
                            
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you a vendor?{' '}
                            <button
                                className="text-indigo-600 hover:underline"
                                onClick={() => router('/auth/vendor/login')}
                            >
                                Login as Vendor
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default UserLogin;
