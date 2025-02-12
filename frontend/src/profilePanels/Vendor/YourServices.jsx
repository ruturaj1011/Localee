import { Edit, Plus } from "lucide-react";
import {useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { useContext } from "react";

const YourServices = () => {

  const { id } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleEditBtn = () => {
    navigate(`/vendor/${id}/yourServices/service/edit`);
  };
  const handleAddService = () => {
    navigate(`/vendor/${id}/yourServices/addNewService`);
  };

  const services = [
    {
      id: 1,
      name: "Haircut",
      description: "Professional haircut services for men and women.",
      image: "https://via.placeholder.com/100x100?text=Haircut",
    },
    {
      id: 2,
      name: "Photography",
      description: "Capture your moments with high-quality photography.",
      image: "https://via.placeholder.com/100x100?text=Photography",
    },
    {
      id: 3,
      name: "Moving Services",
      description: "Reliable moving services to make your relocation smooth.",
      image: "https://via.placeholder.com/100x100?text=Moving",
    },
    {
      id: 4,
      name: "Custom Repairs",
      description: "Expert repair solutions for all your needs.",
      image: "https://via.placeholder.com/100x100?text=Repairs",
    },
  ];

  return (
    <div className="p-6 mt-4 bg-white shadow-lg rounded-md max-w-5xl mx-auto space-y-6">
      {/* Section Header */}
      <div className="flex justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Your Services</h2>
        <button className="ml-auto px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2" onClick={handleAddService}>
            <Plus className="w-6 h-6" />
            Add Service
        </button>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {services.map((service) => (
          <div
            key={service.id}
            className="relative p-4 border rounded-md shadow bg-gray-50 flex gap-4"
          >
            {/* Edit Icon */}
            <button onClick={handleEditBtn} className="absolute top-3 right-3 text-gray-500 hover:text-gray-700">
              <Edit className="w-5 h-5" />
            </button>

            {/* Service Image */}
            <img
              src={service.image}
              alt={service.name}
              className="w-20 h-20 rounded object-cover"
            />

            {/* Service Details */}
            <div className="flex flex-col justify-center">
              <h3 className="text-lg font-semibold text-gray-800">
                {service.name}
              </h3>
              <p className="text-gray-600">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default YourServices;

