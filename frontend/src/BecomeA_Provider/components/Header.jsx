import React from 'react';

const Header = () => {
  return (
    <div
      className="relative bg-cover bg-center h-screen flex items-center justify-center text-white"
      style={{
        backgroundImage: 'url("https://tradefixdirect.com/app/uploads/fly-images/244550/DALL%C2%B7E-2024-07-03-10.53.27-A-workshop-with-a-few-young-adults-engaged-in-various-skilled-trades-activities.-One-is-welding-another-is-working-on-an-electrical-circuit-and-one-1-e1720000543554-700x500-c.png")', 
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay for text visibility */}
      
      <div className="relative z-10 text-center px-4 md:px-8 max-w-2xl">
        <h2 className="text-3xl md:text-6xl font-bold mb-4">
          Join Localee - Connect with more customers!
        </h2>
        <p className="text-lg md:text-xl mb-6">
          Expand your business by connecting with local customers looking for trusted providers.
        </p>
        <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300">
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Header;
