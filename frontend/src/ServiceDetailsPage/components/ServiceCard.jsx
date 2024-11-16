import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faStar } from '@fortawesome/free-solid-svg-icons';

const ServiceCard = ({ provider }) => {
  return (
    <div
      className="flex flex-col sm:flex-row bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-lg mx-auto"
      onClick={() => alert(`You clicked on ${provider.name}`)}
    >
      {/* Image Section */}
      <div className="w-full sm:w-1/2">
        <img
          src={provider.imageUrl}
          alt={provider.name}
          className="h-40 sm:h-full w-full object-cover "
        />
      </div>

      {/* Details Section */}
      <div className="w-full sm:w-2/3 p-4">
        {/* Provider Name */}
        <h3 className="text-lg font-semibold text-gray-800">{provider.name}</h3>

        {/* Location Badge */}
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-500 mr-2" />
          <span className="bg-blue-100 text-blue-600 text-xs font-medium px-2 py-1 rounded-full">
            {provider.location}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-400 mr-1" />
          <span className="text-yellow-600 font-medium">{provider.rating}</span>
          <span className="text-gray-500 text-sm ml-2">(50 reviews)</span>
        </div>

        {/* Services Offered */}
        <div className="mt-4">
          <h4 className="text-sm font-semibold text-gray-700">Services Provided:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 mt-2">
            {provider.services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
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
    rating: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

export default ServiceCard;
