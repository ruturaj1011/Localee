import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { id } = useContext(AuthContext);

  const data = location.state?.data || {};

  console.log(data);

  const [formData, setFormData] = useState({
    name: data.name || "",
    phone: data.phone || "",
    email: data.email || "",
    city: data.city || "",
    state: data.state || ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:8000/profile/${id}/update`, formData);
      alert("Profile updated successfully");
      navigate(-1);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-indigo-600">
          {formData.name.charAt(0).toUpperCase()}
        </div>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="text-2xl font-semibold text-gray-800 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <label className="block text-gray-600">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button onClick={handleSave} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;