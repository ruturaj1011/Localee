import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Phone, ClipboardList, User, Trash2 } from "lucide-react";
import { useFlash } from "../../contexts/flashContext";

function Bookings() {
  const { addFlashMessage } = useFlash();
  const [pendingBookings, setPendingBookings] = useState([]);
  const [acceptedBookings, setAcceptedBookings] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/localee/${role}/${id}/bookingslist`);
      setPendingBookings(res.data.pendingBookings);
      setAcceptedBookings(res.data.acceptedBookings);
      setBookingHistory(res.data.bookingHistory);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      navigate(-1);
      addFlashMessage("Failed to load bookings. Please try again.", "error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      await axios.patch(`http://localhost:8000/localee/${role}/${id}/acceptBooking/${bookingId}`);
      setPendingBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: "Accepted" } : b))
      );
      addFlashMessage("Booking accepted successfully.", "success");
    } catch (err) {
      console.error(err);
      addFlashMessage("Failed to accept booking. Please try again.", "error");
    }
  };

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

  const BookingCard = ({ booking, showAccept }) => (
    <div
      onClick={() => navigate(`/vendor/${id}/bookings/${booking._id}/details`, { state: booking })}
      className="bg-white border rounded-xl shadow p-5 hover:shadow-lg transition cursor-pointer relative"
    >
      <div className="absolute top-3 right-3">
        <span
          className={`px-3 py-1 text-xs font-bold rounded-full ${
            booking.status === "accepted"
              ? "bg-green-500 text-white"
              : booking.status === "pending"
              ? "bg-yellow-500 text-white"
              : booking.status === "rejected"
              ? "bg-red-100 text-red-800"
              : booking.status === "cancelled"
              ? "bg-red-100 text-red-800"
              : booking.status === "completed"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-500 text-white"
          }`}
        >
          {booking.status}
        </span>
      </div>

      <h3 className="text-lg font-semibold flex items-center gap-2">
        <User size={18} /> {booking.customerName}
      </h3>
      <p className="text-sm flex items-center gap-1 mt-1">
        <ClipboardList size={16} /> {booking.serviceCategory} ({booking.type})
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p className="flex items-center gap-2">
          <CalendarDays size={16} /> {booking.date} at {booking.time}
        </p>
        <p className="flex items-center gap-2">
          <MapPin size={16} /> {booking.address}
        </p>
        <p className="flex items-center gap-2">
          <Phone size={16} /> {booking.phone}
        </p>
        {booking.notes && (
          <p className="flex items-start gap-2">
            <ClipboardList size={16} className="mt-1" /> {booking.notes}
          </p>
        )}
      </div>

      {showAccept && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAccept(booking._id);
          }}
          disabled={booking.status === "Accepted"}
          className={`mt-5 px-5 py-1 rounded-lg font-bold text-white ${
            booking.status === "accepted"
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {booking.status === "accepted" ? "Accepted" : "Accept"}
        </button>
      )}
    </div>
  );

  return (
    <main className="min-h-screen p-10 bg-gray-100">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>

      {loading ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-48 bg-gray-200 animate-pulse rounded-xl"></div>
          ))}
        </div>
      ) : (
        <div className="grid gap-10 lg:grid-cols-2">
          <section className="bg-white p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Upcoming Bookings</h2>
            <div className="space-y-6">
              {[...pendingBookings, ...acceptedBookings].map((b) => (
                <BookingCard key={b._id} booking={b} showAccept />
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Booking History</h2>
            <button className="flex items-center text-sm font-medium px-3 py-1 rounded-full border hover:border-gray-700" onClick={() => onClearAll()}>
            Clear All <Trash2 size={18} className="ml-2" />
          </button>
            <div className="space-y-6">
              {bookingHistory.map((b) => (
                <BookingCard key={b._id} booking={b} />
              ))}
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Bookings;
