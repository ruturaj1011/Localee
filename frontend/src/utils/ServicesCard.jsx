import React from 'react';
import {ArrowRight, ArrowLeft} from "lucide-react"
import { Link } from 'react-router-dom';


const ServicesCards = ({services, category, subHeading, eleId}) => {

  const scroll = (direction) => {
    const container = document.getElementById(eleId);
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
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{category}</h2>
          <p className="mt-3 text-xl text-gray-500">
            {subHeading}
          </p>
        </div>

        {/* Scroll Buttons and Service Cards */}
        <div className="flex items-center mt-10">
          <button
            onClick={() => scroll('left')}
            className="bg-indigo-500 p-3 rounded-full text-white hover:bg-indigo-600 focus:outline-none opacity-95 hidden lg:block md:block"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>

          <div
            id={eleId}
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

                <Link
                  className="text-indigo-600 hover:text-indigo-700 font-medium text-sm inline-flex items-center"
                  to="/services"
                >
                  Browse Providers
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>

          <button
            onClick={() => scroll('right')}
            className="bg-indigo-500 p-3 rounded-full text-white hover:bg-indigo-600 focus:outline-none opacity-95 hidden lg:block md:block"
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

export default ServicesCards;
