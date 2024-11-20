import React, { useState } from "react";

const bookingsData = [
  {
    id: 1,
    service: "Plumbing",
    vendor: "John Doe",
    date: "2024-11-21",
    time: "10:00 AM",
    location: "123 Main Street, City",
    status: "Pending", // Can be 'Pending', 'Accepted', or 'Rejected'
  },
  {
    id: 2,
    service: "Electrical Repair",
    vendor: "Jane Smith",
    date: "2024-11-22",
    time: "02:00 PM",
    location: "456 Elm Street, City",
    status: "Accepted",
  },
  
];

const BookingsHistory = () => {
  const [bookings, setBookings] = useState(bookingsData);

  const cancelBooking = (id) => {
    const confirmCancel = window.confirm("Are you sure you want to cancel this booking?");
    if (confirmCancel) {
      setBookings(bookings.filter((booking) => booking.id !== id));
    }
  };

  const getStatusBadge = (status) => {
    let badgeClass = "";

    switch (status) {
      case "Accepted":
        badgeClass = "bg-green-100 text-green-800";
        break;
      case "Rejected":
        badgeClass = "bg-red-100 text-red-800";
        break;
      case "Pending":
        badgeClass = "bg-yellow-100 text-yellow-800";
        break;
      default:
        badgeClass = "bg-gray-100 text-gray-800";
    }

    return (
      <span
        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${badgeClass}`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="p-6 bg-gray-100">
      <h2 className="text-2xl font-bold mb-4">Bookings History</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map((booking) => (
          <div
            key={booking.id}
            className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg"
          >
            <h3 className="text-xl font-semibold">{booking.service}</h3>
            <p className="text-gray-700">Vendor: {booking.vendor}</p>
            <p className="text-gray-700">Date: {booking.date}</p>
            <p className="text-gray-700">Time: {booking.time}</p>
            <p className="text-gray-700">Location: {booking.location}</p>
            <div className="mt-2">Status: {getStatusBadge(booking.status)}</div>
            <button
              onClick={() => cancelBooking(booking.id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookingsHistory;
