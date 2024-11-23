import React, { useState } from "react";

const completedBookings = [
  {
    id: 1,
    service: "House Cleaning",
    vendor: "John Doe Cleaning Co.",
    date: "2024-11-10",
    time: "10:00 AM",
    location: "Downtown, Block A",
  },
];

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
    <div>
      <div className="p-6 mt-16 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">My Bookings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-md p-4 border hover:shadow-lg flex flex-col justify-between"
            >
              {/* Header Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{booking.service}</h3>
                <p className="text-gray-600 mb-1">Vendor: {booking.vendor}</p>
                <p className="text-gray-600 mb-1">Date: {booking.date}</p>
                <p className="text-gray-600 mb-1">Time: {booking.time}</p>
                <p className="text-gray-600 mb-2">Location: {booking.location}</p>
                <div className="text-sm font-medium mb-2">
                  Status: {getStatusBadge(booking.status)}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => editBooking(booking.id)}
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                  Edit Booking
                </button>
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 mt-16 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Booking History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {completedBookings.map((booking) => (
            <div
              key={booking.id}
              className="bg-white shadow-md rounded-md p-4 border hover:shadow-lg flex flex-col justify-between"
            >
              {/* Header Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">{booking.service}</h3>
                <p className="text-gray-600 mb-1">Vendor: {booking.vendor}</p>
                <p className="text-gray-600 mb-1">Date: {booking.date}</p>
                <p className="text-gray-600 mb-1">Time: {booking.time}</p>
                <p className="text-gray-600 mb-2">Location: {booking.location}</p>
                <div className="text-sm font-medium mb-2">
                  Status: <span className="text-green-600 font-semibold">Completed</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  onClick={() => rateBooking(booking.id)}
                  className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                >
                  Rate Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default BookingsHistory;
