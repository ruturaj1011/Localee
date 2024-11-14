import React from 'react';
import SearchServices from './SearchServices';

const HeroSection = () => {
  return (
    <section className="bg-indigo-50 text-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center lg:text-left">
        <h1 className="text-3xl lg:text-5xl text-center font-bold mb-6 pt-14" >
          Find Trusted Local Services Easily
        </h1>

        <SearchServices />
      </div>
    </section>
  );
};

export default HeroSection;
