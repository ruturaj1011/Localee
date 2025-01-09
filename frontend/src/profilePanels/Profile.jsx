import { Edit, Mail, Phone, MapPin } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext} from "../contexts/authContext";

const Profile = () => {

  const navigate = useNavigate();

  const {logout, userData} = useContext(AuthContext);

  const handleEditBtn = () => {

    if(userData.role == "vendor"){
      navigate("/vendor/123/profile/edit-profile");
    }
    else{
      navigate("/user/123/profile/edit-profile");
    }
    
  }

  return (
    <div className="p-6 bg-white shadow-lg rounded-md max-w-3xl mx-auto space-y-6 mt-8">
      {/* Profile Header */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold text-red-500">
          JD
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
        </div>
        <button className="ml-auto px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 flex items-center gap-2" onClick={handleEditBtn}>
          <Edit className="w-4 h-4" />
          Edit Profile
        </button>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-50 p-4 rounded-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Your Information</h3>
        <div className="space-y-3">
          <p className="flex items-center text-gray-600">
            <Phone className="mr-2 w-5 h-5 text-indigo-500" />
            +91 234 567 890
          </p>
          <p className="flex items-center text-gray-600">
            <Mail className="mr-2 w-5 h-5 text-indigo-500" />
            johndoe@example.com
          </p>
          <p className="flex items-center text-gray-600">
            <MapPin className="mr-2 w-5 h-5 text-indigo-500" />
            394 Late Avenue Oklahoma City Oklahoma OK 73109
          </p>
        </div>
      </div>

      {/* Account Actions */}
      <div className="flex justify-left gap-12 items-center bg-gray-50 p-4 rounded-md">
        
        <button onClick={logout} className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600">
          Log Out
        </button>

      </div>
    </div>
  );
};

export default Profile;
