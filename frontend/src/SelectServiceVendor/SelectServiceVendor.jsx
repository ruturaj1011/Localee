import React, { useEffect, useState } from 'react';
import ServiceHeading from './components/ServiceHeading';
import Filters from './components/Filters';
import ServiceCard from './components/ServiceCard';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';
import { useLocation } from 'react-router-dom';

const SelectServiceVendor = () => {
  
  const Location = useLocation();
  const { service, location, coordinates } = Location.state || {};

  const [serviceProviders, setServiceProviders] = useState([]);

  const fetchServices = async () => {
    if (!coordinates || !service) return;

    try {
      const response = await fetch(
        `http://localhost:8000/localee?lat=${coordinates.lat}&lng=${coordinates.lng}&service=${service}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      const providers = data.results.map((item) => ({
        id: item.place_id,
        service: service,
        name: item.name,
        location: item.vicinity,
        rating: item.rating,
        imageUrl: item.photos
          ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=${item.photos[0].photo_reference}&key=${import.meta.env.VITE_GOOGLE_LOCALEE}`
          : 'https://placehold.co/400',
      }));

      setServiceProviders(providers);
    } catch (error) {
      console.error('Error fetching service providers:', error);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [coordinates, service]);

  return (
    <>
      <Navbar />
      <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
        <div className="w-full md:w-1/3 p-4 bg-blue-600 shadow-lg">
          <ServiceHeading title={`${service} `} reviews="(200+ reviews)" />
          <Filters />
        </div>

        <div className="w-full md:w-2/3 p-4">
          <div className="hide-scrollbar mt-2 h-[calc(100vh-50px)] overflow-y-scroll bg-white rounded-lg shadow p-4 space-y-4">
            {serviceProviders.length > 0 ? (
              serviceProviders.map((provider) => <ServiceCard key={provider.id} provider={provider} />)
            ) : (
              <p className="text-center text-gray-600">No service providers found.</p>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SelectServiceVendor;