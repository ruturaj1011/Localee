import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const services = [
  { title: "Electrician" }, { title: "Plumber" }, { title: "Carpenter" }, { title: "Home Cleaning" },
  { title: "Pest Control" }, { title: "Home Painter" }, { title: "Interior Designer" }, { title: "Architect" },
  { title: "Bike Mechanic" }, { title: "Car Mechanic" }, { title: "Car Wash Service" },
  { title: "Bike Rental" }, { title: "Car Rental" }, { title: "Car Dealer" }, { title: "Garage Service" },
  { title: "Salon for Men" }, { title: "Salon for Women" }, { title: "Makeup Artist" }, { title: "Mehendi Artist" },
  { title: "Tattoo Artist" }, { title: "Massage Therapist" }, { title: "Physiotherapist" },
  { title: "Tuition Teacher" }, { title: "Music Teacher" }, { title: "Dance Instructor" },
  { title: "Yoga Trainer" }, { title: "Gym Trainer" }, { title: "Driving Instructor" },
  { title: "Legal Consultant" }, { title: "Tax Consultant" }, { title: "CA Services" },
  { title: "Real Estate Broker" }, { title: "Packers and Movers" }, { title: "Event Planner" },
  { title: "Wedding Photographer" }, { title: "Caterer" }, { title: "DJ Services" },
  { title: "Courier Services" }, { title: "Laundry Services" }, { title: "Xerox & Printing Shop" },
  { title: "Security Guard Services" }, { title: "Old Age Care Services" }, { title: "Baby Care Services" },
  { title: "House Construction" }, { title: "Property Developer" }, { title: "Tour & Travel Agent" },
  { title: "Tailor" }, { title: "Pet Grooming" }, { title: "Cook & Chef Services" }
];

const AddService = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    heroImg: "",
    images: [],
    description: "",
    email: "",
    whatsappNumber: "",
    contactNumber: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [filteredCategories, setFilteredCategories] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "category") {
      if (value.trim() === "") {
        setFilteredCategories([]);
      } else {
        const filtered = services
          .filter((service) =>
            service.title.toLowerCase().includes(value.toLowerCase())
          )
          .slice(0, 5);
        setFilteredCategories(filtered);
      }
    }
  };

  const handleSelectCategory = (category) => {
    setFormData({ ...formData, category });
    setFilteredCategories([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting: ", formData);

    const formData2 = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData.images.forEach((file) => formData2.append("images", file));
      } else {
        formData2.append(key, formData[key]);
      }
    });

    try {
      const service = await axios.post(
        `http://localhost:8000/localee/vendor/${id}/addNewService`,
        formData2,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (service.status === 201) {
        navigate(-1);
        alert("Service added successfully.");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to add service. Please try again.");
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
  };

  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Add a New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Service Name</label>
            <input
              type="text"
              name="serviceName"
              placeholder="Service Name"
              value={formData.serviceName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
            {filteredCategories.length > 0 && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg w-full mt-1 z-10 shadow-lg">
                {filteredCategories.map((cat) => (
                  <li
                    key={cat.title}
                    onClick={() => handleSelectCategory(cat.title)}
                    className="p-3 hover:bg-gray-100 cursor-pointer transition-colors"
                  >
                    {cat.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number</label>
            <input
              type="text"
              name="whatsappNumber"
              placeholder="WhatsApp Number"
              value={formData.whatsappNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
            <input
              type="text"
              name="contactNumber"
              placeholder="Contact Number"
              value={formData.contactNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Images</label>
            <input
              type="file"
              multiple
              onChange={handleImageUpload}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(img)}
                  alt="Uploaded"
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full text-xs hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Description</label>
          <textarea
            name="description"
            placeholder="Service Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            rows="4"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Street Address</label>
          <input
            type="text"
            name="address"
            placeholder="Street Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input
              type="text"
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">ZIP Code</label>
          <input
            type="text"
            name="zip"
            placeholder="ZIP Code"
            value={formData.zip}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddService;