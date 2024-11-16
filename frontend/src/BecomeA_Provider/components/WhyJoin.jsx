import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faStar, faCalendarAlt, faBullhorn } from '@fortawesome/free-solid-svg-icons'; // Import icons

const WhyJoin = () => {
  const benefits = [
    {
      title: 'Increase Visibility',
      description: 'Get noticed by more local customers actively looking for trusted service providers like you.',
      icon: faEye,
    },
    {
      title: 'Receive Reviews and Ratings',
      description: 'Build credibility with customer reviews and ratings that help attract more clients.',
      icon: faStar,
    },
    {
      title: 'Booking and Payment Tools',
      description: 'Manage bookings and payments easily, all from within the Localee platform.',
      icon: faCalendarAlt,
    },
    {
      title: 'Promotions',
      description: 'Take advantage of promotions and marketing tools to reach even more potential customers.',
      icon: faBullhorn,
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Why Join Localee?
        </h2>
        <p className="text-lg text-gray-600 mb-10">
          Discover the benefits of connecting with local customers through Localee.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <FontAwesomeIcon icon={benefit.icon} className="h-10 w-10 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyJoin;
