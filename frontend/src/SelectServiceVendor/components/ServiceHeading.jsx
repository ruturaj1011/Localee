import React from 'react';

const ServiceHeading = ({ title, reviews }) => {
  return (
    <div className="border-b border-gray-300 pb-4 mt-4">
      <h1 className="text-2xl font-bold text-white ">{title}</h1>
      <p className="text-sm text-white  mt-1">{reviews}</p>
    </div>
  );
};

export default ServiceHeading;
