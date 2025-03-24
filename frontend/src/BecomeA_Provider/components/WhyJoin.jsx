import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar, faCalendarAlt, faBullhorn } from '@fortawesome/free-solid-svg-icons';

const WhyJoin = () => {
  const benefits = [
    {
      title: 'Increase Visibility',
      description: 'Get noticed by more local customers actively looking for trusted service providers like you.',
      icon: faEye,
      color: 'bg-blue-500',
      hoverColor: 'group-hover:bg-blue-600',
    },
    {
      title: 'Receive Reviews',
      description: 'Build credibility with customer reviews and ratings that help attract more clients.',
      icon: faStar,
      color: 'bg-amber-500',
      hoverColor: 'group-hover:bg-amber-600',
    },
    {
      title: 'Booking Tools',
      description: 'Manage bookings and payments easily, all from within the Localee platform.',
      icon: faCalendarAlt,
      color: 'bg-emerald-500',
      hoverColor: 'group-hover:bg-emerald-600',
    },
    {
      title: 'Promotions',
      description: 'Take advantage of promotions and marketing tools to reach even more potential customers.',
      icon: faBullhorn,
      color: 'bg-purple-500',
      hoverColor: 'group-hover:bg-purple-600',
    },
  ];

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-800 font-medium text-sm mb-4">
            Benefits
          </div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Why Join <span className="text-blue-600">Localee</span>?
          </h2>
          <div className="w-24 h-1 bg-blue-500 rounded mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl text-center">
            Discover how our platform helps service professionals grow their business.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full transform hover:-translate-y-1"
            >
              <div className="p-6 flex-1 flex flex-col">
                <div className={`${benefit.color} text-white w-16 h-16 rounded-lg flex items-center justify-center mb-5 transition-colors duration-300 ${benefit.hoverColor}`}>
                  <FontAwesomeIcon icon={benefit.icon} className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 flex-1">
                  {benefit.description}
                </p>
              </div>
              <div className="px-6 pb-6">
                <button className="text-blue-600 font-medium flex items-center hover:text-blue-800 transition-colors">
                  Learn more
                  <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyJoin;