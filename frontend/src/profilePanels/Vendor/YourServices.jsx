import { Edit, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useFlash } from "../../contexts/flashContext.jsx";

const YourServices = () => {
  const id = localStorage.getItem("id");
  const { addFlashMessage } = useFlash();
  const navigate = useNavigate();

  const handleAddService = () => {
    navigate(`/vendor/${id}/yourServices/addNewService`);
  };

  const serviceClick = (serviceId) => {
    navigate(`/vendor/${id}/yourServices/service/${serviceId}`);
  };

  const [services, setServices] = useState([]);

  async function fetchServices() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/vendor/${id}/services`);
      setServices(response.data);
    } catch (error) {
      console.error("Error fetching services:", error);
      addFlashMessage("Failed to load services. Please try again.", "error");
    }
  }

  useEffect(() => {
    fetchServices();
  }, [id]);

  return (
    <div className="p-6 md:p-8 mt-6 bg-white shadow-md rounded-lg max-w-6xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">Your Services</h2>
        <button 
          className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 shadow-md transition-all"
          onClick={handleAddService}
        >
          <Plus className="w-5 h-5 md:w-6 md:h-6" />
          <span className="hidden sm:inline">Add Service</span>
        </button>
      </div>

      {/* Responsive Service Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <div
            key={service._id}
            onClick={() => serviceClick(service._id)}
            className="relative p-4 sm:p-5 border rounded-lg shadow-md bg-gray-50 hover:shadow-lg transition-transform transform hover:scale-[1.03] cursor-pointer"
          >
            {/* Edit Icon */}
            <button 
              onClick={(e) => { e.stopPropagation(); serviceClick(service._id); }} 
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            {/* Service Image */}
            <img
              src={service.heroImg || "https://via.placeholder.com/150?text=Service"}
              alt={service.serviceName}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover mx-auto"
            />

            {/* Service Details */}
            <div className="mt-3 sm:mt-4 text-center">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900">{service.serviceName}</h3>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourServices;