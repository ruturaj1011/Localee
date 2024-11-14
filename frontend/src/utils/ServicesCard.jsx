import React from 'react';
import { Wrench, Camera, Home, Scissors, Car, Heart, ArrowRight, ArrowLeft } from 'lucide-react';

const services = [
  { icon: Wrench, name: 'Plumbing', count: '250+ Providers' },
  { icon: Camera, name: 'Photography', count: '180+ Providers' },
  { icon: Home, name: 'Home Cleaning', count: '320+ Providers' },
  { icon: Scissors, name: 'Beauty & Wellness', count: '290+ Providers' },
  { icon: Car, name: 'Auto Services', count: '150+ Providers' },
  { icon: Heart, name: 'Healthcare', count: '200+ Providers' },
];

const ServicesCards = () => {

  const scroll = (direction) => {
    const container = document.getElementById('service-cards');
    const scrollAmount = 300;
    container.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 bg-gray-100 relative">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-left">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Services</h2>
          <p className="mt-3 text-xl text-gray-500">
            Discover our most requested services in your area
          </p>
        </div>

        {/* Scroll Buttons and Service Cards */}
        <div className="flex items-center mt-10">
          <button
            onClick={() => scroll('left')}
            className="bg-indigo-500 p-3 rounded-full text-white hover:bg-indigo-600 focus:outline-none opacity-95"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div
            id="service-cards"
            className="flex overflow-x-scroll gap-4 lg:gap-8 hide-scrollbar py-4 ml-4 mr-4"
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer min-w-[250px] max-w-[300px] relative group"
              >
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mb-4">
                  <service.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{service.name}</h3>
                <p className="text-gray-500 text-sm mt-1 mb-4">{service.count}</p>
                <button
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center"
                >
                  Browse Providers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="bg-indigo-500 p-3 rounded-full text-white hover:bg-indigo-600 focus:outline-none opacity-95"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesCards;
