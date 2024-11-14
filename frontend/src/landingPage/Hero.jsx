import React from 'react';
import SearchServices from './SerachServices';


function Hero() {
    return ( 
        <section className="relative bg-blue-600 text-white pt-40 pb-20 bg-cover bg-center" style={{ backgroundImage: 'url("https://img.freepik.com/free-photo/man-doing-professional-home-cleaning-service_23-2150359014.jpg?t=st=1731408751~exp=1731412351~hmac=e4c53501a1bb2e6596e81ce11e74be606b4be342604f52f38d23aff855a5d82b&w=740")' }}>
        <div className="absolute inset-0 bg-blue-600 opacity-30"></div> {/* Overlay for image */}
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
          {/* Hero Content */}
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 relative z-10">
            Find Trusted Local Services with Localee
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-gray-200 relative z-10">
            Easily connect with professionals in your area for fast and reliable service.
          </p>
  
          <SearchServices />
        </div>

        <div className="mt-6 flex justify-center space-x-6 text-sm text-gray-500">
              <span className="flex items-center">
                <span className="font-medium text-gray-900">1000+</span>
                <span className="ml-2">Verified Providers</span>
              </span>
              <span className="flex items-center">
                <span className="font-medium text-gray-900">50k+</span>
                <span className="ml-2">Happy Customers</span>
              </span>
              <span className="flex items-center">
                <span className="font-medium text-gray-900">4.8/5</span>
                <span className="ml-2">Average Rating</span>
              </span>
            </div>
      </section>
    );
}

export default Hero;