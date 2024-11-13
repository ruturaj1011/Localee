// HowItWorks.js
import React from 'react';
import { FaMapMarkerAlt, FaSearch, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';

function HowItWorks() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-black mb-2">How It Works</h1>
      <h4 className='text-gray-500 text-2xl mb-3'>Get your service needs met in four simple steps</h4>

      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        

        {/* Card 1 - Select Location */}
        <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center text-center">
          <FaMapMarkerAlt className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Select Location</h3>
          <p className="text-gray-700">
            Choose your location to find local services available near you.
          </p>
        </div>

        {/* Card 2 - Find a Service */}
        <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center text-center">
          <FaSearch className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Find a Service</h3>
          <p className="text-gray-700">
            Browse a variety of services from trusted providers in your area.
          </p>
        </div>

        {/* Card 3 - Book Instantly */}
        <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center text-center">
          <FaCalendarCheck className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Book Instantly</h3>
          <p className="text-gray-700">
            Schedule your service at a convenient time that works for you.
          </p>
        </div>

        {/* Card 4 - Get it Done */}
        <div className="p-6 bg-white rounded-lg shadow-xl flex flex-col items-center text-center">
          <FaCheckCircle className="text-blue-600 text-4xl mb-4" />
          <h3 className="text-xl font-semibold mb-2">Get it Done</h3>
          <p className="text-gray-700">
            Sit back and relax while the service provider takes care of it.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
