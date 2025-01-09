import React from "react";
import { useLocation } from "react-router-dom";

const BookingDetails = () => {
  const location = useLocation();
  const booking = location.state;

  // Badge class for status
  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return "bg-green-500 text-white";
      case "pending":
        return "bg-yellow-500 text-white";
      case "cancelled":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-400 text-white";
    }
  };

  if (!booking) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-700 to-blue-500">
        <div className="text-center p-6 bg-white rounded-lg shadow-lg max-w-sm">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Booking Details</h2>
          <p className="text-gray-600">It seems like there are no booking details available.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300 ease-in-out">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Booking Details</h2>
        <div className="space-y-6">
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-600 font-medium">Service:</span>
            <span className="text-gray-800 font-semibold">{booking.service}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-600 font-medium">Vendor:</span>
            <span className="text-gray-800 font-semibold">{booking.vendor}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-600 font-medium">Date:</span>
            <span className="text-gray-800 font-semibold">{booking.date}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-600 font-medium">Time:</span>
            <span className="text-gray-800 font-semibold">{booking.time}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-gray-300">
            <span className="text-gray-600 font-medium">Location:</span>
            <span className="text-gray-800 font-semibold">{booking.location}</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-600 font-medium">Status:</span>
            <span
              className={`px-4 py-1 text-sm font-bold rounded-full shadow-md ${getStatusBadgeClass(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
        </div>
        <div className="mt-8 text-center">
          <button
            className="px-8 py-3 bg-[#4F46E5] text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
