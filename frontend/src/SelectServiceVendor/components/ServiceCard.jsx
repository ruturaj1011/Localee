import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ provider }) => {

  const navigate = useNavigate();

  const handleProviderClick = () => {
    navigate(`/serviceInfo`);
  }

  return (
    <div
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-xl mx-auto border border-gray-200"
      role="button"
      onClick={() => handleProviderClick()}
    >
      {/* Image Section */}
      <div className="w-32 h-32 flex-shrink-0">
        <img
          src={provider.imageUrl}
          alt={provider.name}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Details Section */}
      <div className="flex-grow p-4">

        {/* Provider Name */}
        <h3 className="text-lg font-bold text-gray-800 truncate">
          {provider.name}
        </h3>

        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mt-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
          <span>{provider.location}</span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-3 text-sm">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1" />
          <span className="text-yellow-600 font-medium">{provider.rating ? provider.rating : "-"}</span>
          {/* <span className="text-gray-500 ml-2">(50 reviews)</span> */}
        </div>
      </div>

    </div>
  );
};

// Define PropTypes
ServiceCard.propTypes = {
  provider: PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    // rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ServiceCard;
