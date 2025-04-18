import React, { useState, useContext, useEffect } from "react";
import { Calendar, User, Menu, X } from "lucide-react";
import Profile from "../Profile";
import Bookings from "./Bookings";
import { Route, Routes, useLocation, Link } from "react-router-dom";
import Navbar from "../../utils/Navbar";
import Footer from "../../utils/Footer";
import EditProfile from "../EditProfile";

import { AuthContext } from "../../contexts/authContext";
import useAuth from "../../utils/authMiddleware";
import BookingDetails from "../BookingDetails";
import UpdateBooking from "./UpdateBooking";

const UserPanel = () => {
  useAuth();

  const { id } = useContext(AuthContext);
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Determine selected menu based on current path
  const getSelectedMenuFromPath = (path) => {
    if (path.includes("/bookings")) return 0;
    if (path.includes("/profile")) return 1;
    return -1;
  };

  const [selectedMenu, setSelectedMenu] = useState(getSelectedMenuFromPath(location.pathname));

  // Update selected menu when route changes
  useEffect(() => {
    setSelectedMenu(getSelectedMenuFromPath(location.pathname));
  }, [location.pathname]);

  const handleMenuClick = (idx) => {
    setSelectedMenu(idx);
    setIsMobileMenuOpen(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="flex flex-1">

        {/* Sidebar - Desktop always visible, Mobile conditional */}
        <aside 
          className={`bg-indigo-700 text-white flex flex-col pt-4 transition-all duration-300 ease-in-out
            ${isMobileMenuOpen ? 'fixed inset-y-0 left-0 w-64 z-40 pt-20' : 'hidden md:flex'}
            md:relative md:w-48 lg:w-64 md:pt-4`}
        >
          <div className="p-4 text-center text-xl font-bold border-b border-indigo-600">
            <span className="bg-gradient-to-r from-indigo-300 to-white bg-clip-text text-transparent">
              User Dashboard
            </span>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">

          <Link 
              to={`/user/${id}/profile`} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${selectedMenu === 1 
                  ? 'bg-indigo-800 text-white shadow-md' 
                  : 'hover:bg-indigo-600 text-indigo-100'}`}
              onClick={() => handleMenuClick(1)}
            >
              <User className="w-5 h-5" />
              <span className="font-medium">Profile</span>
            </Link>

            <Link 
              to={`/user/${id}/bookings`} 
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                ${selectedMenu === 0 
                  ? 'bg-indigo-800 text-white shadow-md' 
                  : 'hover:bg-indigo-600 text-indigo-100'}`}
              onClick={() => handleMenuClick(0)}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">My Bookings</span>
            </Link>
            
          </nav>
          
          <div className="p-4 text-xs text-indigo-300 text-center">
            © 2025 Your Service
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <Routes>
              <Route path="bookings" element={<Bookings />} />
              <Route path="profile" element={<Profile />} />
              <Route path="profile/edit-profile" element={<EditProfile />} />
              <Route path="bookings/:id/details" element={<BookingDetails role={'user'} />} />
              <Route path="bookings/:id/details/update" element={<UpdateBooking />} />
            </Routes>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserPanel;