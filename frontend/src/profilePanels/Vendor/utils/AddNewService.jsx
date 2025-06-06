import { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Icon for removing images
import { useFlash } from "../../../contexts/flashContext.jsx";

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
  { title: "Tailor" }, { title: "Pet Grooming" }, { title: "Cook & Chef Services" },

  // Newly Added Services
  { title: "Stationery Shop" }, { title: "Medical Store" }, { title: "Grocery Store" }, { title: "Bakery" },
  { title: "Sweet Shop" }, { title: "Mobile Repair" }, { title: "Laptop Repair" }, { title: "Hardware Store" },
  { title: "Flower Shop" }, { title: "Gift Shop" }, { title: "Bookstore" }, { title: "Cyber Cafe" },
  { title: "Internet Cafe" }, { title: "Coaching Institute" }, { title: "School" }, { title: "College" },
  { title: "Play School" }, { title: "Daycare Center" }, { title: "PG/Hostel" },
  { title: "Restaurant" }, { title: "Cafe" }, { title: "Hotel" }, { title: "Resort" }, { title: "Lodge" },
  { title: "Petrol Pump" }, { title: "Diesel Bunk" }, { title: "CNG Station" }, { title: "ATM" },
  { title: "Bank Branch" }, { title: "Clinic" }, { title: "Hospital" }, { title: "Diagnostic Lab" },
  { title: "Blood Bank" }, { title: "Pharmacy" }, { title: "Insurance Agent" },
  { title: "Repair & Maintenance" }, { title: "Shoe Repair" }, { title: "Watch Repair" },
  { title: "Photocopy & Lamination" }, { title: "Delivery Services" }, { title: "Furniture Store" },
  { title: "Electronics Store" }, { title: "Mobile Store" }, { title: "Supermarket" }, { title: "Mini Mart" }
];


const AddService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addFlashMessage } = useFlash();

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
  const [loading, setLoading] = useState(false); // Loading state

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
    setLoading(true); // Start loading

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
        `${import.meta.env.VITE_BASE_URL}/vendor/${id}/addNewService`,
        formData2,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (service.status === 201) {
        navigate(-1);
        addFlashMessage("Service added successfully.", "success");
      }
    } catch (err) {
      console.error(err);
      addFlashMessage("Failed to add service. Please try again.", "error");
    } finally {
      setLoading(false); // Stop loading
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
    <div className="max-w-6xl mx-auto bg-white p-8 shadow-2xl rounded-xl">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Add a New Service</h2>
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
        <div className="relative">
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
                  src={URL.createObjectURL(img)}
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
              Submitting...
            </div>
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddService;