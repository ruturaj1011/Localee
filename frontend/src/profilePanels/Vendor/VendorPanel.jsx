import React, { useContext, useState, useEffect } from "react";
import { Calendar, User, Logs, Menu, ChevronLeft } from "lucide-react";
import { Route, Routes, Link, useLocation } from "react-router-dom";

import Bookings from "./Bookings";
import Profile from "../Profile";
import YourServices from "./YourServices";
import EditServiceForm from "./utils/EditService";
import AddNewService from "./utils/AddNewService";
import ServiceDetails from "./utils/ServiceDetails";
import Navbar from "../../utils/Navbar";
import Footer from "../../utils/Footer";
import BookingDetails from "../BookingDetails";
import EditProfile from "../EditProfile";
import { AuthContext } from "../../contexts/authContext";
import useAuth from "../../utils/authMiddleware";

const VendorPanel = () => {
    const { id } = useContext(AuthContext);
    const location = useLocation();
    
    useAuth();

    // State for sidebar collapsible on mobile
    const [sidebarOpen, setSidebarOpen] = useState(true);
    
    // Determine which menu item is active based on current path
    const [selectedMenu, setSelectedMenu] = useState(-1);

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/bookings')) {
            setSelectedMenu(0);
        } else if (path.includes('/profile')) {
            setSelectedMenu(1);
        } else if (path.includes('/yourServices')) {
            setSelectedMenu(2);
        }
    }, [location.pathname]);

    const handleMenuClick = (idx) => {
        setSelectedMenu(idx);
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            
            <div className="flex flex-1">
                
                {/* Sidebar */}
                <aside 
                    id="vendor-sideBar" 
                    className={`${
                        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
                    } fixed md:relative z-10 w-64 bg-gradient-to-b from-indigo-700 to-indigo-600 text-white flex flex-col h-screen transition-transform duration-300 ease-in-out shadow-xl md:translate-x-0 md:w-48 lg:w-64`}
                >
                    <div className="p-5 text-center font-bold border-b border-indigo-500 flex items-center justify-between">
                        <h2 className="text-xl">Vendor Panel</h2>
                        <button 
                            className="md:hidden text-white"
                            onClick={toggleSidebar}
                            aria-label="Close sidebar"
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                    </div>
                    
                    <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                        <Link 
                            to={`/vendor/${id}/bookings`} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                selectedMenu === 0 
                                    ? 'bg-white text-indigo-700 font-medium shadow-md' 
                                    : 'text-white hover:bg-indigo-500'
                            }`} 
                            onClick={() => handleMenuClick(0)}
                        >
                            <Calendar className="w-5 h-5" />
                            <span>Bookings</span>
                        </Link>
                        
                        <Link 
                            to={`/vendor/${id}/profile`} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                selectedMenu === 1 
                                    ? 'bg-white text-indigo-700 font-medium shadow-md' 
                                    : 'text-white hover:bg-indigo-500'
                            }`} 
                            onClick={() => handleMenuClick(1)}
                        >
                            <User className="w-5 h-5" />
                            <span>Profile</span>
                        </Link>
                        
                        <Link 
                            to={`/vendor/${id}/yourServices`} 
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                selectedMenu === 2 
                                    ? 'bg-white text-indigo-700 font-medium shadow-md' 
                                    : 'text-white hover:bg-indigo-500'
                            }`} 
                            onClick={() => handleMenuClick(2)}
                        >
                            <Logs className="w-5 h-5" />
                            <span>Your Services</span>
                        </Link>
                    </nav>
                    
                    <div className="p-4 text-xs text-indigo-200 border-t border-indigo-500 text-center">
                        © 2025 Vendor Dashboard
                    </div>
                </aside>

                {/* Overlay for mobile when sidebar is open */}
              

                {/* Main Content */}
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-5 mb-6">
                        <Routes>
                            <Route path="bookings" element={<Bookings />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="profile/edit-profile" element={<EditProfile />} />
                            <Route path="yourServices" element={<YourServices />} />
                            <Route path="yourServices/service/:serviceId/edit" element={<EditServiceForm />} />
                            <Route path="yourServices/service/:serviceId" element={<ServiceDetails />} />
                            <Route path="yourServices/addNewService" element={<AddNewService />} />
                            <Route path="bookings/:id/details" element={<BookingDetails role={'vendor'} />} />
                        </Routes>
                    </div>
                </main>
            </div>

            <Footer />
        </div>
    );
};

export default VendorPanel;