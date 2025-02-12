import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting: ", formData);

    await axios.post(
      `http://localhost:8000/localee/vendor/${id}/addNewService`,
      formData,
      { headers: { "Content-Type": "application/json" } }
    )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setFormData({
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
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add a New Service</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="serviceName" placeholder="Service Name" value={formData.serviceName} onChange={handleChange} className="p-3 border rounded w-full" required />
          
          <div className="relative">
            <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="p-3 border rounded w-full" />
            {filteredCategories.length > 0 && (
              <ul className="absolute bg-white border rounded w-full mt-1 z-10">
                {filteredCategories.map((cat) => (
                  <li key={cat.title} onClick={() => handleSelectCategory(cat.title)} className="p-2 hover:bg-gray-200 cursor-pointer">
                    {cat.title}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="p-3 border rounded w-full" required />
        
        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="whatsappNumber" placeholder="WhatsApp Number" value={formData.whatsappNumber} onChange={handleChange} className="p-3 border rounded w-full" required />
          <input type="text" name="contactNumber" placeholder="Contact Number" value={formData.contactNumber} onChange={handleChange} className="p-3 border rounded w-full" required />
        </div>

        <textarea name="description" placeholder="Service Description" value={formData.description} onChange={handleChange} className="p-3 border rounded w-full" rows="4" required></textarea>

        <input type="text" name="address" placeholder="Street Address" value={formData.address} onChange={handleChange} className="p-3 border rounded w-full" required />

        <div className="grid grid-cols-2 gap-4">
          <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} className="p-3 border rounded w-full" required />
          <input type="text" name="state" placeholder="State" value={formData.state} onChange={handleChange} className="p-3 border rounded w-full" required />
        </div>

        <input type="text" name="zip" placeholder="ZIP Code" value={formData.zip} onChange={handleChange} className="p-3 border rounded w-full" required />

        <button type="submit" className="w-full p-3 bg-indigo-600 text-white font-semibold rounded hover:bg-indigo-700">Submit</button>
      </form>
    </div>
  );
};

export default AddService;
