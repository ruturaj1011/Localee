import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { useContext } from "react";

const EditProfile = () => {

  const navigate = useNavigate();

  const {userData} = useContext(AuthContext);

  const handleSave = () => {

    if(userData.role = 'user'){
        navigate("/user/123/profile");
    }
    else{
        navigate("/vendor/123/profile");
    }

  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-3xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-indigo-600">
          JD
        </div>
        <div>
          <input type="text" defaultValue="Your name" className="text-2xl font-semibold text-gray-800 w-full p-2 border border-gray-300 rounded-md"/>
        </div>
      </div>

      {/* Editable Contact Information */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-gray-600">Phone</label>
            <input
              type="text"
              defaultValue="+1 234 567 890"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600">Email</label>
            <input
              type="email"
              defaultValue="johndoe@example.com"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-600">Location</label>
            <input
              type="text"
              defaultValue="New York, NY"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button onClick={handleSave} className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600">
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProfile;
