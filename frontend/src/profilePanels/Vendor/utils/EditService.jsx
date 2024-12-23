import React, { useState } from "react";

const EditServiceForm = () => {

  const [selectedService, setSelectedService] = useState(null);


  const handleSave = (updatedService) => {
    console.log("Updated Service:", updatedService);
    setSelectedService(null);
    // Add logic to update the service in the backend or state.
  };

  const handleCancel = () => {
    setSelectedService(null);
  };

  const [formData, setFormData] = useState({ 
    id: 1, 
    name: "Electrician", 
    description: "Fix electrical issues", 
    price: 500, 
    category: "Repair" 
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl mx-auto mt-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Service Name */}
        <div>
          <label htmlFor="name" className="block text-md font-medium text-gray-700">
            Service Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-md text:sm lg:text-lg"
            required
          />
        </div>

        {/* Service Description */}
        <div>
          <label htmlFor="description" className="block text-md font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text:sm lg:text-lg"
            rows="4"
            required
          />
        </div>

        {/* Service Price */}
        <div>
          <label htmlFor="price" className="block text-md font-medium text-gray-700">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text:sm lg:text-lg"
            required
          />
        </div>

        {/* Service Category */}
        <div>
          <label htmlFor="category" className="block text-md font-medium text-gray-700">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text:sm lg:text-lg"
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditServiceForm;
