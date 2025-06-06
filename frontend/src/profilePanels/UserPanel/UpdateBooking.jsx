import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../contexts/flashContext";

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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
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
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UpdateBooking;
