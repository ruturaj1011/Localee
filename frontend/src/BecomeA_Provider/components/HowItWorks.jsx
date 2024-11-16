import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faCalendarCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  const steps = [
    {
      title: 'Sign Up',
      description: 'Register and create your profile.',
      icon: faUserPlus,
    },
    {
      title: 'List Your Services',
      description: 'Add your services and set availability.',
      icon: faClipboardList,
    },
    {
      title: 'Get Bookings',
      description: 'Start receiving customer bookings.',
      icon: faCalendarCheck,
    },
    {
      title: 'Grow Your Business',
      description: 'Build a reputation with ratings and reviews.',
      icon: faChartLine,
    },
  ];

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">How It Works</h2>
        <p className="text-lg text-gray-600 mb-12">
          Simple steps to get started and grow your business on Localee.
        </p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 text-center">
              <FontAwesomeIcon icon={step.icon} className="h-12 w-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
