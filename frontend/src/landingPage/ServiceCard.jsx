import React from 'react';
import { Wrench, Camera, Home, Scissors, Car, Heart, ArrowRight } from 'lucide-react';

const services = [
  { icon: Wrench, name: 'Plumbing', count: '250+ Providers' },
  { icon: Camera, name: 'Photography', count: '180+ Providers' },
  { icon: Home, name: 'Home Cleaning', count: '320+ Providers' },
  { icon: Scissors, name: 'Beauty & Wellness', count: '290+ Providers' },
  { icon: Car, name: 'Auto Services', count: '150+ Providers' },
  { icon: Heart, name: 'Healthcare', count: '200+ Providers' },
];

const PopularServices = () => {

  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">Popular Services</h2>
          <p className="mt-3 text-xl text-gray-500">
            Discover our most requested services in your area
          </p>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div
              key={index}
              className="relative group bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            >
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-50 to-purple-100 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity blur"></div>
              <div className="relative bg-white p-6 rounded-xl">
                <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">{service.name}</h3>
                <p className="mt-2 text-gray-500 text-sm lg:text-lg">{service.count}</p>
                <div className="mt-4">
                  <button
                    className="text-indigo-600 hover:text-indigo-700 font-sm text-sm lg:font-medium lg:text-lg inline-flex items-center"
                  >
                    Browse Providers
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularServices;