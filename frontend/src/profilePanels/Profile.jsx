import { Edit, Mail, Phone, MapPin, LogOut, User, Clock, Shield } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../contexts/authContext";
import { useFlash } from "../contexts/flashContext";

const Profile = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { logout, isVendorLoggedIn, id } = useContext(AuthContext);
  const navigate = useNavigate();
  const { addFlashMessage } = useFlash();

  async function fetchUser() {
    setIsLoading(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/${id}`);
      setData(res.data);
      setIsLoading(false);
      console.log(res.data);
    } catch (err) {
      addFlashMessage("Failed to load profile data. Please try again.", "error");
      console.error("Error fetching user data:", err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchUser();
  }, []);

  const handleEditBtn = () => {
    if (isVendorLoggedIn()) {
      navigate(`/vendor/${id}/profile/edit-profile`);
    } else {
      navigate(`/user/${id}/profile/edit-profile`);
    }
  };

  // Get initials from name for avatar
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div className="space-y-6">
      {isLoading ? (
        <div className="p-12 text-center">
          <div className="animate-pulse flex justify-center mb-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
          </div>
          <div className="animate-pulse h-4 bg-gray-200 rounded w-1/3 mx-auto"></div>
        </div>
      ) : (
        <>
          {/* Profile Header - Card */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            {/* Banner */}
            <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            <div className="px-6 py-4 flex flex-col md:flex-row md:items-center">
              {/* Avatar - Positioned to overlap banner */}
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md -mt-12 md:-mt-14 flex">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                  {getInitials(data.name)}
                </div>
              </div>
              
              <div className="mt-4 md:mt-0 md:ml-4 flex-1">
                <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
                <p className="text-gray-500 text-sm">{isVendorLoggedIn() ? "Vendor" : "User"}</p>
              </div>
              
              <button 
                className="mt-4 md:mt-0 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-2 text-sm font-medium shadow-sm"
                onClick={handleEditBtn}
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </button>
            </div>
          </div>

          {/* Information Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="mr-2 w-5 h-5 text-indigo-500" />
                Personal Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Phone className="mt-1 mr-3 w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-700">{data.phone || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="mt-1 mr-3 w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-700">{data.email || "Not provided"}</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="mt-1 mr-3 w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-gray-700">
                      {data.city && data.state ? `${data.city}, ${data.state}` : "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Account Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Shield className="mr-2 w-5 h-5 text-indigo-500" />
                Account Information
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="mt-1 mr-3 w-5 h-5 text-indigo-500 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-500">Account Type</p>
                    <p className="text-gray-700">{isVendorLoggedIn() ? "Vendor Account" : "User Account"}</p>
                  </div>
                </div>
                
                {/* Add more account details as needed */}
                <div className="pt-4">
                  <button 
                    onClick={() => {
                      logout();
                      addFlashMessage("You logged out successfully!", "success");
                    }} 
                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors flex items-center gap-2 text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4" />
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Profile;