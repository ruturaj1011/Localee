import React, { useState, useEffect } from "react";
import { Edit, Trash2, Trash, MapPin, CalendarDays, Clock, Phone, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SkeletonCard = () => (
  <div className="animate-pulse p-5 mb-4 bg-gray-200 rounded-xl border">
    <div className="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-2/5 mb-2"></div>
    <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
  </div>
);

const Bookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const bookings = await axios.get(
        `http://localhost:8000/localee/${role}/${id}/bookingslist`
      );
      setPendingBookings(bookings.data.pendingBookings);
      setAcceptedBookings(bookings.data.acceptedBookings);
      setBookingHistory(bookings.data.bookingHistory);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [id]);

  const navigate = useNavigate();

  const onBookingClick = (booking) => {
    navigate(`/user/${id}/bookings/${booking.id}/details`, { state: booking });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      accepted: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      pending: "bg-yellow-100 text-yellow-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${
          statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  const onClearAll = async () => {
    try {
      const res = await axios.delete(`http://localhost:8000/localee/${role}/${id}/bookings/clearHistory`);
      console.log(res.data.message);
      fetchBookings();
    } catch (error) {
      console.error("Error clearing bookings:", error);
    }
  }

  return (
    <div>
      <main className="flex-1 bg-gray-100 p-6 mt-4">
        <h1 className="text-3xl font-bold mb-6">Your Bookings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Bookings */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Upcoming Bookings</h2>

            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            ) : [...pendingBookings, ...acceptedBookings].length > 0 ? (
              [...pendingBookings, ...acceptedBookings].map((booking) => (
                <div
                  key={booking._id}
                  className="p-5 mb-4 bg-gray-50 rounded-xl border hover:shadow-md cursor-pointer transition"
                  onClick={() => onBookingClick(booking)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">
                      {booking.serviceCategory || booking.service}
                    </h3>
                    <button
                      onClick={(e) => e.stopPropagation()}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-gray-600 mt-1">
                    Vendor:{" "}
                    <span className="font-medium">
                      {booking.vendorName || booking.vendor}
                    </span>
                  </p>

                  <div className="m-2 text-gray-900 text-sm">
                    <div className="flex items-center my-1">
                      <Type className="w-4 h-4 mr-1" />
                      {booking.type}
                    </div>
                    <div className="flex items-center my-1">
                      <CalendarDays className="w-4 h-4 mr-1" />
                      {booking.date}
                    </div>
                    {booking.time && (
                      <div className="flex items-center my-1">
                        <Clock className="w-4 h-4 mr-1" />
                        {booking.time}
                      </div>
                    )}
                    <div className="flex items-center my-1">
                      <MapPin className="w-4 h-4 mr-1" />
                      {booking.address || booking.location}
                    </div>
                    <div className="flex items-center my-1">
                      <Phone className="w-4 h-4 mr-1" />
                      {booking.phone}
                    </div>
                    
                  </div>

                  <div className="mt-3">{getStatusBadge(booking.status)}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No upcoming bookings</p>
              </div>
            )}
          </div>

          {/* Booking History */}
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold mb-4">Booking History</h2>
              <button className="flex items-center text-sm font-medium px-3 py-1 rounded-full border hover:border-gray-700" onClick={() => onClearAll()}>
                Clear All <Trash2 size={18} className="ml-2" />
              </button>
            </div>

            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            ) : bookingHistory.length > 0 ? (
              bookingHistory.map((history) => (
                <div
                  key={history._id}
                  className="p-5 mb-4 bg-gray-50 rounded-xl border hover:shadow-md transition"
                >
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-lg">{history.name}</p>
                    <button>
                      <Trash size={16} strokeWidth={1.25} />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Service: <span className="font-medium">{history.service}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{history.date}</p>
                  <div className="mt-2">{getStatusBadge(history.status)}</div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-gray-500">
                <p>No booking history available</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Bookings;
