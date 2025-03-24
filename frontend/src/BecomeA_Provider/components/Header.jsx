import React from 'react';

const Header = () => {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-16 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Join Localee
          </h2>
          <h3 className="text-2xl text-blue-200 mb-6">Connect with more customers!</h3>
          <p className="text-lg text-gray-200 mb-8">
            Expand your business by connecting with local customers looking for trusted providers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow-lg transition duration-300">
              Get Started
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold rounded-lg transition duration-300">
              Learn More
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-blue-500 rounded-lg blur opacity-30"></div>
            <div className="relative bg-gray-900 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-800 p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">🔧</span>
                  <span className="text-white font-medium">Skilled Trades</span>
                </div>
                <div className="bg-blue-800 p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">🏠</span>
                  <span className="text-white font-medium">Home Services</span>
                </div>
                <div className="bg-blue-800 p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">⚡</span>
                  <span className="text-white font-medium">Electrical</span>
                </div>
                <div className="bg-blue-800 p-4 rounded-lg flex flex-col items-center text-center">
                  <span className="text-3xl mb-2">🚿</span>
                  <span className="text-white font-medium">Plumbing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;