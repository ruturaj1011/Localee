import React, { useEffect, useState } from 'react';
import ServiceHeading from './components/ServiceHeading';
import Filters from './components/Filters';
import ServiceCard from './components/ServiceCard';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import { useLocation } from 'react-router-dom';
import { useFlash } from '../contexts/flashContext';

const SelectServiceVendor = () => {
  const { addFlashMessage } = useFlash();
  const Location = useLocation();
  const { service, location, coordinates, minRating } = Location.state || {};

  const [serviceProviders, setServiceProviders] = useState([]);
  const [loading, setLoading] = useState(false); // New loading state

  const fetchServices = async () => {
    if (!coordinates || !service) return;
    setLoading(true); // Start loading
    try {
      const response = await fetch(
        `http://localhost:8000/fetch/nearby/services?lat=${coordinates.lat}&lng=${coordinates.lng}&service=${service}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      const storedProviders = data.storedServices.map((item) => ({
        id: item._id,
        service: item.category,
        name: item.serviceName,
        description: item.description,
        email: item.email,
        whatsappNumber: item.whatsappNumber,
        contactNumber: item.contactNumber,
        address: item.address,
        city: item.city,
        state: item.state,
        zip: item.zip,
        location: item.address || 'No address provided',
        rating: item.rating || 'No rating',
        reviews: item.reviews || [],
        imageUrl: item.heroImg || 'https://placehold.co/400',
        imagesUrl: item.images || [],
        owner: item.owner,
      }));

      const googleProviders = data.googleResults
        .map((item) => ({
          id: item.place_id,
          service: service,
          name: item.name,
          location: item.vicinity || 'No address provided',
          rating: item.rating || 'No rating',
          imageUrl: item.photos
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_LOCALEE}`
            : 'https://placehold.co/400',
        }))
        .filter((provider) => provider.rating >= minRating);

      setServiceProviders([...storedProviders, ...googleProviders]);
      console.log(serviceProviders);
    } catch (error) {
      console.error('Error fetching service providers:', error);
      addFlashMessage('Failed to load service providers. Please try again.', 'error');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchServices();
  }, [coordinates, service]);

  // Skeleton component
  const SkeletonCard = () => (
    <div className="flex animate-pulse bg-white rounded-xl overflow-hidden border border-gray-100 w-full max-w-2xl">
      {/* Image Skeleton - 40% width like the actual card */}
      <div className="w-2/5 h-48 bg-gray-200"></div>

      {/* Content Skeleton */}
      <div className="flex-grow p-5 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 rounded-full w-3/4"></div>

        {/* Tagline (2 lines) */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-full w-full"></div>
          <div className="h-4 bg-gray-200 rounded-full w-5/6"></div>
        </div>

        {/* Location */}
        <div className="flex items-center space-x-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
          <div className="h-4 bg-gray-200 rounded-full w-2/3"></div>
        </div>

        {/* Rating */}
        <div className="flex items-center">
          <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
        </div>

        {/* Service Category Badge */}
        <div className="h-6 w-24 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 bg-blue-600 shadow-lg">
          <ServiceHeading title={`${service} `} reviews="(200+ reviews)" />
          <Filters serviceProviders={serviceProviders} />
        </div>

        <div className="w-full md:w-2/3 p-4">
          <div className="hide-scrollbar mt-2 h-[calc(100vh-50px)] overflow-y-scroll bg-white rounded-lg shadow p-4 space-y-4">
            {loading ? (
              <>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </>
            ) : serviceProviders.length > 0 ? (
              serviceProviders.map((provider) => (
                <ServiceCard key={provider.id} provider={provider} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                <div className="mb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-400 mx-auto"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No service providers found
                </h3>
                <p className="text-gray-500 max-w-md">
                  We couldn't find any services matching your criteria. Try adjusting your search filters.
                </p>
                
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectServiceVendor;
