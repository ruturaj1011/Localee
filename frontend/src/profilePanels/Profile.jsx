import { Edit, Mail, Phone, MapPin } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

import { AuthContext} from "../contexts/authContext";

const Profile = () => {

  const [data, setData] = useState({});

  const {logout, isVendorLoggedIn, id} = useContext(AuthContext);

    async function fetchVendor() {
      try {
          const res = await axios.get(`http://localhost:8000/localee/${id}`);
          setData(res.data);
          // console.log(res.data);
      } catch (err) {
          console.error("Error fetching vendor data:", err);
      }
    }

    useEffect(() => {
      fetchVendor();
    }, []);

  // console.log(data);

  const navigate = useNavigate();

  const handleEditBtn = () => {

    if(isVendorLoggedIn()){
      navigate(`/vendor/${id}/profile/edit-profile`);
    }
    else{
      navigate(`/user/${id}/profile/edit-profile`);
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
          <h2 className="text-2xl font-semibold text-gray-800">{data.name}</h2>
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
            {data.phone}
          </p>
          <p className="flex items-center text-gray-600">
            <Mail className="mr-2 w-5 h-5 text-indigo-500" />
            {data.email}
          </p>
          <p className="flex items-center text-gray-600">
            <MapPin className="mr-2 w-5 h-5 text-indigo-500" />
            {data.city}, {data.state}
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
