import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faClipboardList, faCalendarCheck, faChartLine } from '@fortawesome/free-solid-svg-icons';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);
  
  const steps = [
    {
      title: 'Sign Up',
      description: 'Create your professional profile in minutes. Add your business details, specialties, and upload photos of your work.',
      icon: faUserPlus,
      color: 'bg-blue-500',
    },
    {
      title: 'List Your Services',
      description: 'Specify your services, pricing structure, and set your availability calendar so customers know when you can be booked.',
      icon: faClipboardList,
      color: 'bg-green-500',
    },
    {
      title: 'Get Bookings',
      description: 'Receive booking requests from local customers. Accept jobs, communicate through our platform, and manage your schedule.',
      icon: faCalendarCheck,
      color: 'bg-purple-500',
    },
    {
      title: 'Grow Your Business',
      description: 'Build your reputation with customer ratings and reviews. Use our analytics to track performance and grow your client base.',
      icon: faChartLine,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div id='how-it-works' className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
            Easy Process
          </span>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to get started and grow your business on Localee.
          </p>
        </div>

        {/* Mobile Timeline */}
        <div className="lg:hidden mb-12">
          <div className="flex justify-between mb-4">
            {steps.map((step, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index === activeStep ? steps[index].color : 'bg-gray-200'
                } ${index === activeStep ? 'text-white' : 'text-gray-500'}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className={`w-16 h-16 ${steps[activeStep].color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
              <FontAwesomeIcon icon={steps[activeStep].icon} className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-center mb-3">{steps[activeStep].title}</h3>
            <p className="text-gray-600 text-center">{steps[activeStep].description}</p>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStep(index)}
                className={`w-2 h-2 rounded-full ${
                  index === activeStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
          <div className="grid grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div 
                  className={`absolute top-0 left-0 right-0 h-1 ${
                    index <= activeStep ? step.color : 'bg-gray-200'
                  }`}
                  style={{ width: index === activeStep ? '50%' : index < activeStep ? '100%' : '0%' }}
                ></div>
                <div 
                  className={`
                    cursor-pointer mb-8 text-center transition-all duration-300
                    ${index === activeStep ? 'transform -translate-y-4' : ''}
                  `}
                  onClick={() => setActiveStep(index)}
                >
                  <div 
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4
                      transition-all duration-300 border-4 border-white
                      ${index <= activeStep ? step.color : 'bg-gray-200'}
                      ${index === activeStep ? 'shadow-lg' : ''}
                    `}
                  >
                    <FontAwesomeIcon icon={step.icon} className="h-5 w-5 text-white" />
                  </div>
                  <h3 className={`text-xl font-bold mb-2 ${index === activeStep ? 'text-gray-800' : 'text-gray-600'}`}>
                    {step.title}
                  </h3>
                </div>
                <div 
                  className={`
                    bg-white p-6 rounded-xl shadow-md transition-all duration-500
                    ${index === activeStep ? 'opacity-100 shadow-lg' : 'opacity-0 h-0 overflow-hidden p-0'}
                  `}
                >
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 text-center">
          <button 
            onClick={() => setActiveStep((activeStep + 1) % steps.length)}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
          >
            {activeStep < steps.length - 1 ? 'Next Step' : 'Get Started Now'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;