import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.jsx";
import { useContext } from "react";

const VendorRegister = () => {

    const { handleVendorRegister } = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [address, setAddress] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const router = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const message = await handleVendorRegister(
                name,
                email,
                password,
                phone,
                businessName,
                city,
                state,
                address
            );
            router("/auth/vendor/login"); // Redirect to vendor login after registration
        } catch (e) {
            setErrorMessage("Error occurred during registration.");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-md">
                {/* Left Side Info */}
                <div className="hidden md:block w-1/2 p-6 bg-green-600 text-white rounded-l-lg">
                    <h2 className="text-2xl font-bold mb-4">Start Your Business Journey</h2>
                    <p className="mb-6">
                        Register as a vendor to reach local customers, manage your appointments, and grow your business effectively.
                    </p>
                    <button
                        className="px-4 py-2 bg-white text-green-600 font-semibold rounded-md hover:bg-gray-100"
                        onClick={() => router('/auth/vendor/login')}
                    >
                        Login as Vendor
                    </button>
                </div>
                {/* Right Side Registration Form */}
                <div className="w-full md:w-1/2 p-6">
                    <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Vendor Registration</h2>
                    {errorMessage && (
                        <p className="text-sm text-center text-red-600 mb-4">{errorMessage}</p>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
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
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                            <input
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Business Name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">City</label>
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">State</label>
                            <input
                                type="text"
                                value={state}
                                onChange={(e) => setState(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Address</label>
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                required
                                className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-green-600 text-white font-semibold rounded-md hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Register
                        </button>
                    </form>
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Already have an account?{' '}
                            <button
                                className="text-green-600 hover:underline"
                                onClick={() => router('/auth/vendor/login')}
                            >
                                Login as Vendor
                            </button>
                        </p>
                        <p className="mt-2 text-sm text-gray-600">
                            Are you a user?{' '}
                            <button
                                className="text-green-600 hover:underline"
                                onClick={() => router('/auth/user/login')}
                            >
                                Register as User
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
    
};

export default VendorRegister;
