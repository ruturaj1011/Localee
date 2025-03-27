import React, { useState, useEffect } from "react";
import { Edit, Trash2, Trash, MapPin, CalendarDays, Clock, Phone, Type } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useFlash } from "../../contexts/flashContext";

const SkeletonCard = () => (
  <div className="animate-pulse p-5 mb-4 bg-gray-100 rounded-xl border">
    <div className="h-5 bg-gray-200 rounded w-1/3 mb-3"></div>
    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-2/5 mb-2"></div>
    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
  </div>
);

const Bookings = () => {
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("upcoming");

  const { addFlashMessage } = useFlash();
  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

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
      addFlashMessage("Failed to load bookings. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [id]);

  const onClearAll = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/localee/${role}/${id}/bookings/clearHistory`
      );

      setBookingHistory([]);
      addFlashMessage(
        `History deleted successfully!`,
        "success"
      );
      
    } catch (error) {
      console.error("Error clearing bookings:", error);
      addFlashMessage(
        error.response?.data?.message || "Failed to clear booking history",
        "error"
      );
    }
  };

  const onBookingClick = (booking) => {
    navigate(`/user/${id}/bookings/${booking.id}/details`, { state: booking });
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      accepted: "bg-green-100 text-green-800 border border-green-200",
      rejected: "bg-red-100 text-red-800 border border-red-200",
      pending: "bg-yellow-100 text-yellow-800 border border-yellow-200",
      completed: "bg-blue-100 text-blue-800 border border-blue-200",
      cancelled: "bg-red-100 text-red-800 border border-red-200",
    };
    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${statusStyles[status.toLowerCase()] || "bg-gray-100 text-gray-800 border border-gray-200"
          }`}
      >
        {status}
      </span>
    );
  };

  const renderBookingCard = (booking) => (
    <div
      key={booking._id}
      className="p-5 mb-4 bg-white rounded-xl border border-gray-200 hover:shadow-md cursor-pointer transition-all duration-200 transform hover:-translate-y-1"
      onClick={() => onBookingClick(booking)}
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-bold text-gray-800">
          {booking.serviceCategory || booking.service}
        </h3>
        <div className="flex items-center space-x-2">
          {getStatusBadge(booking.status)}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/user/${id}/bookings/${booking.id}/edit`, { state: booking });
            }}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 p-1 rounded-full"
            aria-label="Edit booking"
          >
            <Edit className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-gray-600 mt-1 mb-3">
        <span className="font-medium">{booking.vendorName || booking.vendor}</span>
      </p>

      <div className="grid grid-cols-2 gap-2 text-gray-700 text-sm">
        <div className="flex items-center my-1">
          <Type className="w-4 h-4 mr-2 text-gray-500" />
          <span>{booking.type}</span>
        </div>
        <div className="flex items-center my-1">
          <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
          <span>{booking.date}</span>
        </div>
        {booking.time && (
          <div className="flex items-center my-1">
            <Clock className="w-4 h-4 mr-2 text-gray-500" />
            <span>{booking.time}</span>
          </div>
        )}
        <div className="flex items-center my-1">
          <MapPin className="w-4 h-4 mr-2 text-gray-500" />
          <span className="truncate">{booking.address || booking.location}</span>
        </div>
        <div className="flex items-center my-1">
          <Phone className="w-4 h-4 mr-2 text-gray-500" />
          <span>{booking.phone}</span>
        </div>
      </div>
    </div>
  );

  const renderHistoryCard = (history) => (
    <div
      key={history._id}
      className="p-5 mb-4 bg-white rounded-xl border border-gray-200 hover:shadow-sm transition"
    >
      <div className="flex justify-between items-center">
        <p className="font-medium text-lg text-gray-800">{history.name}</p>
        <button
          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-100"
          aria-label="Remove from history"
        >
          <Trash size={16} strokeWidth={1.25} />
        </button>
      </div>
      <p className="text-gray-600 mt-1">
        <span className="font-medium">{history.service}</span>
      </p>
      <div className="flex justify-between items-center mt-2">
        <p className="text-gray-500 text-sm">{history.date}</p>
        {getStatusBadge(history.status)}
      </div>
    </div>
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Bookings</h1>
        <p className="text-gray-600 mb-6">Manage your upcoming appointments and booking history</p>

        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 font-medium text-sm mr-4 border-b-2 ${activeTab === "upcoming"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("upcoming")}
          >
            Upcoming Bookings
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm border-b-2 ${activeTab === "history"
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            onClick={() => setActiveTab("history")}
          >
            Booking History
          </button>
        </div>

        {/* Content Area */}
        {activeTab === "upcoming" ? (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Upcoming Bookings</h2>
              <div className="text-sm text-gray-500">
                {[...pendingBookings, ...acceptedBookings].length} booking(s)
              </div>
            </div>

            {loading ? (
              Array(3)
                .fill(0)
                .map((_, i) => <SkeletonCard key={i} />)
            ) : [...pendingBookings, ...acceptedBookings].length > 0 ? (
              [...pendingBookings, ...acceptedBookings].map(renderBookingCard)
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 mb-2">
                  <CalendarDays className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No upcoming bookings</h3>
                <p className="text-gray-500">You don't have any scheduled appointments at the moment.</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="mb-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Booking History</h2>
              {bookingHistory.length > 0 && (
                <button
                  className="flex items-center text-sm font-medium px-3 py-1.5 rounded-full border border-gray-300 hover:bg-gray-100 transition-colors"
                  onClick={onClearAll}
                >
                  Clear All <Trash2 size={16} className="ml-2" />
                </button>
              )}
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
                    <p className="font-medium text-lg">{history.customerName}</p>
                    <button>
                      <Trash size={16} strokeWidth={1.25} />
                    </button>
                  </div>
                  <p className="text-gray-600 mt-1">
                    Service: <span className="font-medium">{history.serviceCategory + "(" + history.type + ")"}</span>
                  </p>
                  <p className="text-gray-500 text-sm mt-1">{history.date}</p>
                  <div className="mt-2">{getStatusBadge(history.status)}</div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center bg-white rounded-xl border border-gray-200">
                <div className="text-gray-400 mb-2">
                  <Clock className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-1">No booking history</h3>
                <p className="text-gray-500">Your past bookings will appear here.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Bookings;