import React from 'react';
import ServiceHeading from './components/ServiceHeading';
import Filters from './components/Filters';
import ServiceCard from './components/ServiceCard';
import Navbar from '../utils/Navbar';
import Footer from '../utils/Footer';



const ServiceDetailsPage = () => {

  const serviceProviders = [
    {
      id: 1,
      name: 'ABC Electricians',
      location: 'Mumbai, India',
      rating: 4.5,
      imageUrl: "https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?t=st=1731408751~exp=1731412351~hmac=e4c53501a1bb2e6596e81ce11e74be606b4be342604f52f38d23aff855a5d82b&w=740"
    },
    {
      id: 2,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: "https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?t=st=1731408751~exp=1731412351~hmac=e4c53501a1bb2e6596e81ce11e74be606b4be342604f52f38d23aff855a5d82b&w=740"
    },
    {
      id: 4,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: '/images/provider2.jpg'

    },
    {
      id: 3,
      name: 'QuickFix Repairs',
      location: 'Delhi, India',
      rating: 4.7,
      imageUrl: '/images/provider2.jpg'
      
    },
  ];
  
  return (
    <>
    <Navbar/>
    <div className="bg-gray-100 min-h-screen flex flex-col md:flex-row pt-16">
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
        <div className="hide-scrollbar mt-2 h-[calc(100vh-50px)] overflow-y-scroll bg-white rounded-lg shadow p-4 space-y-4">
          {serviceProviders.map((provider) => (
            <ServiceCard key={provider.id} provider={provider}/>
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
};

export default ServiceDetailsPage;
