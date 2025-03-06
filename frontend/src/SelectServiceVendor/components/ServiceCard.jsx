import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ provider }) => {

  const navigate = useNavigate();

  // console.log(provider);

  const handleProviderClick = async (placeId) => {
    try {
      
      if(!provider.owner){

        const response = await fetch(
          `http://localhost:8000/localee/${provider.service}/${placeId}` 
        );
  
        const data = await response.json();
  
        const details = simplifyGoogleData(data);
  
        navigate(`/serviceInfo/${provider.service}/${placeId}`, { state: { details } });
      }
      else{

        // console.log(provider);

        const details = simplifyStoredData(provider);

        // console.log(details);

        navigate(`/serviceInfo/${provider.service}/${provider.id}`, { state: { details }});
      }
    } catch (error) {
      console.error('Error fetching provider details:', error);
    }
  };

  function simplifyGoogleData(data) {
    return {
      place_id: provider.id,
      serviceCategory: provider.service,
      address: data.formatted_address,
      phone: data.formatted_phone_number,
      whatsapp: data.formatted_phone_number,
      name: data.name,
      images: data.photos.map(photo => ({
        height: photo.height,
        width: photo.width,
        url: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=${photo.width}&photoreference=${photo.photo_reference}&key=${import.meta.env.VITE_GOOGLE_LOCALEE}`
      })),
      rating: data.rating,
      totalRatings: data.user_ratings_total,
      website: data.website,
      reviews: data.reviews.map(review => ({
        author: review.author_name,
        authorPhoto: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time * 1000).toLocaleDateString(),
        relativeTime: review.relative_time_description
      }))
    };
  }

  function simplifyStoredData(data) {
    return {
      place_id: provider.id,
      serviceCategory: provider.service,
      address: data.address,
      phone: data.contactNumber,
      whatsapp: data.whatsappNumber,
      email:  data.email,
      name: data.name,
      images: data.images || [],
      rating: data.rating || "No Ratings",
      totalRatings: data.totalRatings || "No Ratings",
      description: data.description,
      website: data.website,
      reviews: data.reviews.map(review => ({
        author: review.author_name,
        authorPhoto: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time * 1000).toLocaleDateString(),
        relativeTime: review.relative_time_description
      })),
      owner: data.owner
    };
  }

  return (
    <div
      className="flex items-center bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer max-w-xl mx-auto border border-gray-200"
      role="button"
      onClick={() => handleProviderClick(provider.id)}
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
