import React, { useState } from 'react';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    providerName: '',
    businessName: '',
    serviceCategories: '',
    contactInfo: '',
    location: '',
    certifications: null,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, certifications: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic (e.g., API call or form validation)
    console.log(formData);
  };

  return (
    <div className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg ">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Join Localee</h2>
        <form onSubmit={handleSubmit} className="space-y-6 ">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="providerName" className="block text-gray-700 mb-2">Provider Name</label>
              <input
                type="text"
                id="providerName"
                name="providerName"
                value={formData.providerName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm"
                placeholder="Enter your name"
                required
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full p-3 border rounded-md shadow-sm"
                placeholder="Enter your business name"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="serviceCategories" className="block text-gray-700 mb-2">Service Categories</label>
            <input
              type="text"
              id="serviceCategories"
              name="serviceCategories"
              value={formData.serviceCategories}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm"
              placeholder="List your service categories"
              required
            />
          </div>

          <div>
            <label htmlFor="contactInfo" className="block text-gray-700 mb-2">Contact Info</label>
            <input
              type="text"
              id="contactInfo"
              name="contactInfo"
              value={formData.contactInfo}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm"
              placeholder="Enter your contact info"
              required
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-gray-700 mb-2">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-md shadow-sm"
              placeholder="Enter your location"
              required
            />
          </div>

          <div>
            <label htmlFor="certifications" className="block text-gray-700 mb-2">Upload Certifications/ID</label>
            <input
              type="file"
              id="certifications"
              name="certifications"
              onChange={handleFileChange}
              className="w-full p-3 border rounded-md shadow-sm"
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition duration-300">
              Join Localee
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
