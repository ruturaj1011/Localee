import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../contexts/FlashContext.jsx";

const UpdateBooking = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { addFlashMessage } = useFlash();
  const booking = state || {};

  const [form, setForm] = useState({
    customerName: booking.customerName || "",
    phone: booking.phone || "",
    date: booking.date ? booking.date.slice(0, 10) : "",
    time: booking.time || "",
    notes: booking.notes || "",
    address: booking.address || "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Updated Booking:", form);

    const updatedBooking = {
      ...booking,
      customerName: form.customerName,
      phone: form.phone,
      date: form.date,
      time: form.time,
      notes: form.notes,
      address: form.address,
    };

    // console.log("Updated Booking:", updatedBooking);

    try{
      const update = await axios.patch(`${import.meta.env.VITE_BASE_URL}/localee/user/${booking.userId}/bookings/${booking._id}/update`, updatedBooking);

      addFlashMessage("Booking updated successfully.", "success");
      console.log("Booking updated successfully:", update.data);
    }
    catch(err){
      addFlashMessage("Failed to update booking. Please try again.", "error");
      console.error("Error updating booking:", err);
    }
    finally {
      setIsLoading(false);
    }
    navigate(-1); // Go back after update
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6 text-center">Update Booking</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>

        {booking.type === "Appointment" && <div>
          <label className="block mb-1 font-medium">Time</label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
        </div>}

        <div>
          <label className="block mb-1 font-medium">Notes</label>
          <textarea
            name="notes"
            value={form.notes}
            onChange={handleChange}
            placeholder="Additional notes"
            className="w-full p-2 border rounded-md"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Address</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Enter address"
            className="w-full p-2 border rounded-md"
            disabled={booking.type === "Appointment"}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;