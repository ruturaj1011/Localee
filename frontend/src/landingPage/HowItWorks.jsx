import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearch, FaCalendarCheck, FaCheckCircle } from 'react-icons/fa';
import { ArrowRight } from 'lucide-react';

function HowItWorks() {
  const [activeStep, setActiveStep] = useState(null);
  
  const steps = [
    {
      icon: <FaMapMarkerAlt className="text-4xl" />,
      title: "Select Location",
      description: "Choose your location to find local services available near you.",
      color: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      icon: <FaSearch className="text-4xl" />,
      title: "Find a Service",
      description: "Browse a variety of services from trusted providers in your area.",
      color: "bg-gradient-to-r from-indigo-500 to-purple-400"
    },
    {
      icon: <FaCalendarCheck className="text-4xl" />,
      title: "Book Instantly",
      description: "Schedule your service at a convenient time that works for you.",
      color: "bg-gradient-to-r from-green-500 to-emerald-400"
    },
    {
      icon: <FaCheckCircle className="text-4xl" />,
      title: "Get it Done",
      description: "Sit back and relax while the service provider takes care of it.",
      color: "bg-gradient-to-r from-amber-500 to-orange-400"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
      {/* Background circles for visual interest */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 -ml-32 -mt-32"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-100 rounded-full opacity-30 -mr-40 -mb-40"></div>
      
      <div className="relative">
        <h1 className="text-4xl font-bold text-gray-900 mb-3">How It Works</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mb-6"></div>
        <h4 className="text-gray-600 text-xl mb-12 max-w-2xl mx-auto">
          Get your service needs met in four simple steps
        </h4>
        
        {/* Desktop View with Connector Lines */}
        <div className="hidden lg:flex justify-center items-center max-w-6xl mx-auto mb-12">
          {steps.map((step, index) => (
            <React.Fragment key={index}>
              <div 
                className="w-64 relative"
                onMouseEnter={() => setActiveStep(index)}
                onMouseLeave={() => setActiveStep(null)}
              >
                <div className={`
                  p-8 rounded-xl shadow-lg transform transition-all duration-300 h-full
                  ${activeStep === index ? 'scale-105 shadow-xl' : 'hover:scale-105'}
                  ${activeStep === index ? step.color : 'bg-white hover:bg-gray-50'}
                  ${activeStep === index ? 'text-white' : 'text-gray-800'}
                `}>
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5
                    ${activeStep === index ? 'bg-white text-blue-600' : `${step.color} text-white`}
                  `}>
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className={activeStep === index ? 'text-white' : 'text-gray-600'}>
                    {step.description}
                  </p>
                </div>
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
              </div>
              
              {/* Connector Arrow */}
              {index < steps.length - 1 && (
                <div className="flex items-center px-2">
                  <ArrowRight className="text-blue-500 w-8 h-8" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        
        {/* Mobile View */}
        <div className="grid gap-6 lg:hidden max-w-md mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`
                p-6 rounded-xl shadow-md transition-all duration-300 relative
                ${step.color} text-white
              `}
            >
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 rounded-full bg-white flex items-center justify-center">
                <span className="text-gray-800 font-bold text-sm">{index + 1}</span>
              </div>
              
              <div className="flex items-center">
                <div className="bg-white rounded-full p-3 mr-4 text-blue-600">
                  {step.icon}
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-bold mb-1">{step.title}</h3>
                  <p className="text-sm text-white">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Call to Action */}
        <div className="mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-3 rounded-full font-medium shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
            Get Started Now
          </button>
          <p className="text-gray-500 mt-4 text-sm">Join thousands of satisfied customers today</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;