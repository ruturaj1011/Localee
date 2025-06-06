import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext.jsx";
import { useContext, useEffect, useState } from "react";
import { Save, User, X } from "lucide-react";
import axios from "axios";
import { useFlash } from "../contexts/flashContext.jsx";

const EditProfile = () => {
  const navigate = useNavigate();
  const { addFlashMessage } = useFlash();
  const { isUserLoggedIn, id } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    state: ""
  });
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState("");

  // Fetch current user data
  useEffect(() => {
    async function fetchUserData() {
      setIsLoading(true);
      try {
        const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/profile/${id}`);
        setFormData({
          name: res.data.name || "",
          phone: res.data.phone || "",
          email: res.data.email || "",
          city: res.data.city || "",
          state: res.data.state || ""
        });
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to load profile data. Please try again.");
        setIsLoading(false);
        addFlashMessage("Failed to load profile data. Please try again.", "error");
      }
    }
    
    fetchUserData();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCancel = () => {
    if (isUserLoggedIn()) {
      navigate(`/user/${id}/profile`);
    } else {
      navigate(`/vendor/${id}/profile`);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/profile/${id}/update`, formData);
      addFlashMessage("Profile updated successfully.", "success");
      navigate(-1);
    } catch (error) {
      console.error("Error updating profile:", error);
      addFlashMessage("Failed to update profile. Please try again.", "error");
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

  if (isLoading) {
    return (
      <div className="p-6 bg-white shadow-sm rounded-lg max-w-3xl mx-auto">
        <div className="animate-pulse space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          </div>
          <div className="h-40 bg-gray-100 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/4 ml-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        {/* Banner */}
        <div className="h-24 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
          <div className="absolute top-4 left-6">
            <h1 className="text-white text-lg font-semibold">Edit Profile</h1>
          </div>
        </div>
        
        <div className="p-6">
          {/* Profile Header */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
            <div className="w-24 h-24 rounded-full bg-white p-1 shadow-md -mt-16 sm:-mt-20 flex">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-2xl font-bold text-white">
                {getInitials(formData.name)}
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="text-lg font-semibold text-gray-800 w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Your name"
              />
            </div>
          </div>

          {/* Editable Contact Information */}
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <User className="mr-2 w-5 h-5 text-indigo-500" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Phone number"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="City"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="State"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button 
              onClick={handleCancel} 
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-1"
              disabled={isSaving}
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
            
            <button 
              onClick={handleSave} 
              className={`px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors flex items-center gap-1 ${isSaving ? 'opacity-75 cursor-not-allowed' : ''}`}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;