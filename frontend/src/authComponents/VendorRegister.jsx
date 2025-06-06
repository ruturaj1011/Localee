import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.jsx";
import { useContext } from "react";
import { useFlash } from "../contexts/FlashContext.jsx";

const VendorRegister = () => {
    const { handleVendorRegister } = useContext(AuthContext);
    const { addFlashMessage } = useFlash();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        businessName: "",
        city: "",
        state: "",
        address: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const { name, email, password, phone, businessName, city, state, address } = formData;
            await handleVendorRegister(
                name,
                email,
                password,
                phone,
                businessName,
                city,
                state,
                address
            );
            router("/auth/vendor/login");
            addFlashMessage("Registration successful. Please login to continue.", "success");
        } catch (e) {
            setErrorMessage("Error occurred during registration. Please try again.");
            addFlashMessage("Error occurred during registration. Please try again.", "error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
                <div className="flex flex-col md:flex-row">
                    {/* Left Side - Info Panel */}
                    <div className="md:w-2/5 bg-gradient-to-br from-green-600 to-green-800 text-white p-8">
                        <div className="h-full flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-bold mb-6">Grow Your Business With Us</h2>
                                <div className="space-y-4 mb-8">
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-400 text-green-800">
                                            ✓
                                        </div>
                                        <p className="ml-3 text-lg">Reach local customers effectively</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-400 text-green-800">
                                            ✓
                                        </div>
                                        <p className="ml-3 text-lg">Manage appointments seamlessly</p>
                                    </div>
                                    <div className="flex items-start">
                                        <div className="flex-shrink-0 h-6 w-6 flex items-center justify-center rounded-full bg-green-400 text-green-800">
                                            ✓
                                        </div>
                                        <p className="ml-3 text-lg">Grow your business with analytics</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="w-full px-4 py-3 bg-white text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-colors duration-200 shadow-md"
                                    onClick={() => router('/auth/vendor/login')}
                                >
                                    Already Registered? Sign In
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Right Side - Registration Form */}
                    <div className="md:w-3/5 p-8">
                        <div className="text-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Vendor Registration</h2>
                            <p className="text-gray-600 mt-2">Join our platform and start growing your business today</p>
                        </div>

                        {errorMessage && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
                                <p>{errorMessage}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="••••••••"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="(123) 456-7890"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                                    <input
                                        type="text"
                                        name="businessName"
                                        value={formData.businessName}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="Your Business Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="New York"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                    <input
                                        type="text"
                                        name="state"
                                        value={formData.state}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="NY"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Address</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="123 Business St"
                                    />
                                </div>
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className={`w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                                </button>
                            </div>
                        </form>

                        <div className="mt-8 text-center">
                            <p className="text-sm text-gray-600">
                                Looking to join as a customer?{' '}
                                <button
                                    className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
                                    onClick={() => router('/auth/user/login')}
                                >
                                    Register as User
                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorRegister;