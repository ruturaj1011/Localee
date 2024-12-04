import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const VendorLogin = () => {
    const { handleVendorLogin } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await handleVendorLogin(email, password);
            router("/"); // Redirect to dashboard or home after login
        } catch (e) {
            setErrorMessage("Invalid email or password.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
                {/* Left Side Info */}
                <div className="hidden md:block w-1/2 p-6 bg-green-600 text-white rounded-l-lg">
                    <h2 className="text-2xl font-bold mb-4">Join Our Vendor Network</h2>
                    <p className="mb-6">
                        Access tools to manage your services, appointments, and grow your business. 
                        Connect with local customers effortlessly.
                    </p>
                    <button
                        className="px-4 py-2 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-100"
                        onClick={() => router('/auth/user/register')}
                    >
                        Register as user
                    </button>
                </div>
                {/* Right Side Login Form */}
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Vendor Login</h2>
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
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{' '}
                            <button
                                className="text-green-600 hover:underline"
                                onClick={() => router('/auth/vendor/register')}
                            >
                                Register as Vendor
                            </button>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you a user?{' '}
                            <button
                                className="text-green-600 hover:underline"
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
