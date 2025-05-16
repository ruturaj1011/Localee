import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../../contexts/flashContext";

const ServiceCard = ({ provider }) => {
  const { addFlashMessage } = useFlash();
  const navigate = useNavigate();

  const handleProviderClick = async (placeId) => {
    try {
      if (!provider.owner) {
        const response = await fetch(
          `http://localhost:8000/google/${provider.service}/${placeId}`
        );
        const data = await response.json();
        const details = simplifyGoogleData(data);
        navigate(`/serviceInfo/${provider.service}/${placeId}`, { state: { details } });
      } else {
        const details = simplifyStoredData(provider);
        navigate(`/serviceInfo/${provider.service}/${provider.id}`, { state: { details } });
      }
    } catch (error) {
      console.error("Error fetching provider details:", error);
      addFlashMessage("Failed to fetch provider details. Please try again.", "error");
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
      reviews: data.reviews?.map(review => ({
        author: review.author_name,
        authorPhoto: review.profile_photo_url,
        rating: review.rating,
        text: review.text,
        time: new Date(review.time * 1000).toLocaleDateString(),
        relativeTime: review.relative_time_description
      })),
      isStored: false
    };
  }

  function simplifyStoredData(data) {
    let images2 = data.imagesUrl.map((image) => ({
      url: image,
    }));
    return {
      place_id: provider.id,
      serviceCategory: provider.service,
      address: data.address,
      phone: data.contactNumber,
      whatsapp: data.whatsappNumber,
      email: data.email,
      name: data.name,
      images: images2 || [],
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
      owner: data.owner,
      isStored: true
    };
  }

  return (
    <div
      className="flex items-stretch bg-white rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer w-full max-w-2xl mx-auto border border-gray-100 hover:border-blue-100 hover:transform hover:-translate-y-1"
      role="button"
      onClick={() => handleProviderClick(provider.id)}
    >
      {/* Image Section - wider with 40% width */}
      <div className="w-2/5 h-auto flex-shrink-0 overflow-hidden">
        <img
          src={provider.imageUrl == 
            "https://placehold.co/400" ? "/service_placeholder.png" : provider.imageUrl}
          alt={provider.name}
          className="h-52 w-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Details Section */}
      <div className="flex-grow p-5 space-y-3">
        {/* Provider Name */}
        <div className="mb-1">
          <h3 className="text-xl font-bold text-gray-800">
            {provider.name}
          </h3>
        </div>

        {/* Tagline or Short Description */}
        {provider.tagline && (
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {provider.tagline}
          </p>
        )}

        {/* Location - now with multiline support */}
        <div className="flex items-start space-x-2 text-gray-600">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-blue-400 w-4 h-4 mt-1 flex-shrink-0" />
          <span className="text-sm break-words whitespace-normal">
            {provider.location}
          </span>
        </div>

        {/* Rating with visual enhancements */}
        <div className="flex items-center space-x-2 mt-4">
          <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
            <FontAwesomeIcon icon={faStar} className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-semibold text-gray-700 ml-1">
              {provider.rating ? provider.rating : "-"}
            </span>
            {provider.rating && (
              <span className="text-xs text-gray-500 ml-1">/5</span>
            )}
          </div>
        </div>

        {/* Service Category Badge */}
        <div className="mt-4">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full uppercase font-semibold tracking-wide">
            {provider.service}
          </span>
        </div>
      </div>
    </div>
  );
};

ServiceCard.propTypes = {
  provider: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    rating: PropTypes.number,
    service: PropTypes.string.isRequired,
    owner: PropTypes.bool,
    tagline: PropTypes.string,
  }).isRequired,
};

export default ServiceCard;