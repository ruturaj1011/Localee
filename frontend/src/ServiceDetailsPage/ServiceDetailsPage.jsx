import React from 'react';
import ServiceHeading from './components/ServiceHeading';
import Filters from './components/Filters';
import ServiceCard from './components/ServiceCard';
import provider1 from '../assets/Electrician-at-work-e1643101212741.jpg'


const ServiceDetailsPage = () => {
  const serviceProviders = [
    {
      id: 1,
      name: 'ABC Electricians',
      location: 'Mumbai, India',
      rating: 4.5,
      imageUrl: provider1,
      services: ['Wiring', 'Lighting Installation', 'Repairs'],
    },
    {
      id: 2,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: provider1,
      services: ['AC Repairs', 'Heating System Maintenance', 'Emergency Repairs'],
    },
    {
      id: 2,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: '/images/provider2.jpg',
      services: ['AC Repairs', 'Heating System Maintenance', 'Emergency Repairs'],
    },
    {
      id: 2,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: '/images/provider2.jpg',
      services: ['AC Repairs', 'Heating System Maintenance', 'Emergency Repairs'],
    },
  ];
  
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row">
      {/* Left Section - Filters */}
      <div className="w-full md:w-1/3 p-4 bg-blue-600 shadow-lg">
      {/* Service Heading */}
      <ServiceHeading
          title="Electrician Services"
          reviews="(200+ reviews)"
        />
         
        <Filters />
      </div>

      {/* Right Section - Service Cards */}
      <div className="w-full md:w-1/1 p-4">
       
       {/* Search section */}

        {/* Service Cards - Scrollable */}
        <div className="mt-4 h-[calc(100vh-50px)] overflow-y-scroll bg-white rounded-lg shadow p-4 space-y-4">
          {serviceProviders.map((provider) => (
            <ServiceCard key={provider.id} provider={provider} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailsPage;
