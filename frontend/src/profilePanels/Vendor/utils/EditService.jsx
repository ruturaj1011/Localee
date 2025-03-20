import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaTrash, FaUpload } from "react-icons/fa"; // Icons for actions

const EditService = () => {
  const { id, serviceId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const serviceData = location.state?.service; // Get service data passed via state

  const [formData, setFormData] = useState({
    serviceName: serviceData?.serviceName || "",
    category: serviceData?.category || "",
    heroImg: serviceData?.heroImg || "",
    images: serviceData?.images || [], // Existing images (URLs)
    description: serviceData?.description || "",
    email: serviceData?.email || "",
    whatsappNumber: serviceData?.whatsappNumber || "",
    contactNumber: serviceData?.contactNumber || "",
    address: serviceData?.address || "",
    city: serviceData?.city || "",
    state: serviceData?.state || "",
    zip: serviceData?.zip || "",
  });

  const [loading, setLoading] = useState(false); // Loading state

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle new image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  // Remove an image (existing or new)
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const formData2 = new FormData();

      // Append non-image fields
      Object.keys(formData).forEach((key) => {
        if (key !== "images") {
          formData2.append(key, formData[key]);
        }
      });

      // Append new images
      formData.images.forEach((img) => {
        if (img instanceof File) {
          formData2.append("images", img);
        }
      });

      // Append existing image URLs
      const existingImages = formData.images.filter((img) => typeof img === "string");
      formData2.append("existingImages", JSON.stringify(existingImages));

      // Send the request
      const response = await axios.put(
        `http://localhost:8000/vendor/${id}/services/${serviceId}/edit`,
        formData2,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (response.status === 200) {
        alert("Service updated successfully.");
        navigate(`/vendor/${id}/yourServices/service/${serviceId}`);
      }
    } catch (err) {
      alert("Failed to update service.");
      console.error(err);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Edit Service</h2>
      <form onSubmit={handleSubmit} className="space-y-8" encType="multipart/form-data">
        {/* Service Name */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Service Name</label>
          <input
            type="text"
            name="serviceName"
            placeholder="Service Name"
            value={formData.serviceName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            required
          />
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Images</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group">
                <img
                  src={typeof img === "string" ? img : URL.createObjectURL(img)}
                  alt={`Service Image ${index + 1}`}
                  className="w-full h-40 object-cover rounded-lg transform transition-transform group-hover:scale-105"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                >
                  <FaTrash className="text-sm" />
                </button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 transition-colors">
              <FaUpload className="mr-2 text-gray-500" />
              <span className="text-gray-500">Upload New Images</span>
              <input
                type="file"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-2">Description</label>
          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
            rows="4"
            required
          />
        </div>

        {/* Address */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">Address</label>
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-500 mb-2">ZIP Code</label>
            <input
              type="text"
              name="zip"
              placeholder="ZIP Code"
              value={formData.zip}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 transition-all"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // Disable button when loading
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Updating...
            </div>
          ) : (
            "Update Service"
          )}
        </button>
      </form>
    </div>
  );
};

export default EditService;