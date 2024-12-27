import React from "react";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const booking = location.state;

  if (!booking) {
    return <div className="text-center">No booking details available.</div>;
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Booking Details</h2>
      <p><strong>Service:</strong> {booking.service}</p>
      <p><strong>Vendor:</strong> {booking.vendor}</p>
      <p><strong>Date:</strong> {booking.date}</p>
      <p><strong>Time:</strong> {booking.time}</p>
      <p><strong>Location:</strong> {booking.location}</p>
      <p><strong>Status:</strong> {booking.status}</p>
    </div>
  );
};

export default BookingDetails;
