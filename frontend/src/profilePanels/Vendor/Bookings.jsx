import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFlash } from "../../contexts/flashContext";

import { 
  CalendarDays, 
  MapPin, 
  Phone, 
  ClipboardList, 
  User, 
  Trash2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ChevronRight, 
  RefreshCw,
  Info,
  Filter
} from "lucide-react";

function Bookings() {

  const { addFlashMessage } = useFlash();

  const [bookings, setBookings] = useState({
    pending: [],
    accepted: [],
    history: []
  });
  const [activeTab, setActiveTab] = useState("upcoming");
  const [loading, setLoading] = useState(true);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({
    serviceType: "all",
    dateRange: "all"
  });

  const id = localStorage.getItem("id");
  const role = localStorage.getItem("role");
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://localhost:8000/localee/${role}/${id}/bookingslist`);
      setBookings({
        pending: res.data.pendingBookings,
        accepted: res.data.acceptedBookings,
        history: res.data.bookingHistory
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
      addFlashMessage("Failed to fetch bookings", "error");
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAccept = async (bookingId, e) => {
    e.stopPropagation();
    try {
      setLoading(true);
      await axios.patch(`http://localhost:8000/localee/${role}/${id}/acceptBooking/${bookingId}`);
      fetchBookings();
      addFlashMessage("Booking accepted successfuly", "success");
    } catch (err) {
      console.error(err);
      addFlashMessage("Failed to accept booking", "error");
      setLoading(false);
    }
  };

  const handleReject = async (bookingId, e) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to reject this booking?")) {
      try {
        setLoading(true);
        await axios.patch(`http://localhost:8000/localee/${role}/${id}/rejectBooking/${bookingId}`);
        addFlashMessage("Booking rejected successfully", "success");
        fetchBookings();
      } catch (err) {
        console.error(err);
        addFlashMessage("Failed to reject booking", "error");
        setLoading(false);
      }
    }
  };

  const onClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all history? This cannot be undone.")) {
      try {
        setLoading(true);
        const res = await axios.delete(`http://localhost:8000/localee/${role}/${id}/bookings/clearHistory`);
        addFlashMessage("booking history cleared successfully", "success");
        fetchBookings();
      } catch (error) {
        console.error("Error clearing bookings:", error);
        addFlashMessage("Failed to clear booking history", "error");
        setLoading(false);
      }
    }
  };

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getUpcomingBookings = () => {
    return [...bookings.pending, ...bookings.accepted].sort((a, b) => {
      return new Date(a.date + " " + a.time) - new Date(b.date + " " + b.time);
    });
  };

  const BookingCard = ({ booking, isPending = false }) => {
    const statusColors = {
      accepted: "bg-green-100 text-green-800 border-green-200",
      pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
      rejected: "bg-red-100 text-red-800 border-red-200",
      cancelled: "bg-red-100 text-red-800 border-red-200",
      completed: "bg-blue-100 text-blue-800 border-blue-200"
    };

    return (
      <div 
        onClick={() => navigate(`/vendor/${id}/bookings/${booking._id}/details`, { state: booking })}
        className="bg-white border rounded-xl shadow-sm hover:shadow-md transition cursor-pointer relative p-0 overflow-hidden"
      >
        <div className="flex flex-col h-full">
          {/* Color bar at top based on status */}
          <div className={`h-1 w-full ${
            booking.status === "accepted" ? "bg-green-500" :
            booking.status === "pending" ? "bg-yellow-500" :
            booking.status === "rejected" || booking.status === "cancelled" ? "bg-red-500" :
            "bg-blue-500"
          }`}></div>
          
          <div className="p-5 flex-grow">
            <div className="flex justify-between items-start">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User size={18} className="text-gray-600" /> {booking.customerName}
              </h3>
              <span className={`px-3 py-1 text-xs font-bold rounded-full border ${statusColors[booking.status] || "bg-gray-100 text-gray-800"}`}>
                {booking.status}
              </span>
            </div>
            
            <p className="text-sm flex items-center gap-1 mt-1 text-gray-600">
              <ClipboardList size={16} /> {booking.serviceCategory} ({booking.type})
            </p>

            <div className="mt-4 space-y-3 text-sm">
              <p className="flex items-center gap-2 text-gray-700">
                <CalendarDays size={16} className="text-blue-500" /> 
                <span className="font-medium">{formatDate(booking.date)}</span> at <span className="font-medium">{booking.time}</span>
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} className="text-red-500" /> {booking.address}
              </p>
              <p className="flex items-center gap-2 text-gray-700">
                <Phone size={16} className="text-green-500" /> {booking.phone}
              </p>
              {booking.notes && (
                <div className="flex items-start gap-2 text-gray-700 bg-gray-50 p-2 rounded-md">
                  <Info size={16} className="mt-1 text-gray-500" /> 
                  <p className="flex-1">{booking.notes}</p>
                </div>
              )}
            </div>
          </div>

          {isPending && (
            <div className="p-3 bg-gray-50 flex justify-end gap-2 border-t">
              <div
                
                className="px-4 py-1.5 rounded-lg font-medium text-gray-700 border border-gray-300 hover:bg-gray-100 text-sm"
              >
                Reject
              </div>
              <div
                
                className="px-4 py-1.5 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 text-sm"
              >
                Accept
              </div>
            </div>
          )}
          
        </div>
      </div>
    );
  };

  // Skeleton loader for booking cards
  const BookingSkeleton = () => (
    <div className="bg-white border rounded-xl shadow-sm p-5 h-52">
      <div className="flex justify-between">
        <div className="h-6 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-6 w-20 bg-gray-200 animate-pulse rounded-full"></div>
      </div>
      <div className="h-5 w-48 mt-2 bg-gray-200 animate-pulse rounded"></div>
      <div className="mt-4 space-y-3">
        <div className="h-5 w-40 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-5 w-full bg-gray-200 animate-pulse rounded"></div>
        <div className="h-5 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    </div>
  );

  // Tab navigation component
  const TabNavigation = () => (
    <div className="flex border-b mb-6">
      <button
        className={`px-6 py-3 font-medium text-sm ${
          activeTab === "upcoming"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("upcoming")}
      >
        Upcoming
        {bookings.pending.length > 0 && (
          <span className="ml-2 bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
            {bookings.pending.length} new
          </span>
        )}
      </button>
      <button
        className={`px-6 py-3 font-medium text-sm ${
          activeTab === "history"
            ? "border-b-2 border-blue-500 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
        onClick={() => setActiveTab("history")}
      >
        History
      </button>
    </div>
  );

  // Filter component
  const FilterComponent = () => (
    <div className={`bg-white p-5 rounded-xl shadow-md mb-6 ${filterOpen ? 'block' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={filters.serviceType}
            onChange={(e) => setFilters({...filters, serviceType: e.target.value})}
          >
            <option value="all">All Services</option>
            <option value="tour">Tours</option>
            <option value="activity">Activities</option>
            <option value="consultation">Consultations</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
          <select 
            className="w-full p-2 border rounded-lg"
            value={filters.dateRange}
            onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
          >
            <option value="all">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button 
          className="text-sm font-medium text-blue-600 hover:text-blue-800"
          onClick={() => setFilters({serviceType: "all", dateRange: "all"})}
        >
          Reset Filters
        </button>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen p-4 sm:p-6 md:p-10 bg-gray-50">

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">My Bookings</h1>
          
          <div className="flex mt-4 sm:mt-0 space-x-2">
            <button 
              onClick={() => setFilterOpen(!filterOpen)} 
              className="px-4 py-2 text-sm font-medium flex items-center gap-1 border rounded-lg hover:bg-gray-50"
            >
              <Filter size={16} /> Filters
            </button>
            <button 
              onClick={fetchBookings}
              className="px-4 py-2 text-sm font-medium flex items-center gap-1 border rounded-lg hover:bg-gray-50"
            >
              <RefreshCw size={16} /> Refresh
            </button>
          </div>
        </div>
        
        <FilterComponent />
        <TabNavigation />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <BookingSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {activeTab === "upcoming" && (
              <>
                {bookings.pending.length > 0 && (
                  <div className="mb-8">
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-yellow-700">
                      <Clock size={18} /> Pending Approval ({bookings.pending.length})
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {bookings.pending.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} isPending={true} />
                      ))}
                    </div>
                  </div>
                )}

                {bookings.accepted.length > 0 ? (
                  <div>
                    <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-green-700">
                      <CheckCircle size={18} /> Confirmed ({bookings.accepted.length})
                    </h2>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      {bookings.accepted.map((booking) => (
                        <BookingCard key={booking._id} booking={booking} />
                      ))}
                    </div>
                  </div>
                ) : (
                  bookings.pending.length === 0 && (
                    <div className="text-center py-12 bg-white rounded-xl border">
                      <CalendarDays size={48} className="mx-auto text-gray-300 mb-4" />
                      <h3 className="text-xl font-medium text-gray-700 mb-2">No Upcoming Bookings</h3>
                      <p className="text-gray-500 max-w-md mx-auto">
                        You don't have any upcoming bookings at the moment. When customers book your services, they'll appear here.
                      </p>
                    </div>
                  )
                )}
              </>
            )}

            {activeTab === "history" && (
              <>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-700">
                    Past Bookings ({bookings.history.length})
                  </h2>
                  {bookings.history.length > 0 && (
                    <button 
                      className="flex items-center text-sm font-medium px-3 py-1.5 rounded-lg border hover:bg-gray-50 text-red-600" 
                      onClick={onClearHistory}
                    >
                      <Trash2 size={16} className="mr-1" /> Clear History
                    </button>
                  )}
                </div>
                
                {bookings.history.length > 0 ? (
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {bookings.history.map((booking) => (
                      <BookingCard key={booking._id} booking={booking} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-xl border">
                    <ClipboardList size={48} className="mx-auto text-gray-300 mb-4" />
                    <h3 className="text-xl font-medium text-gray-700 mb-2">No Booking History</h3>
                    <p className="text-gray-500 max-w-md mx-auto">
                      Your booking history appears here after you've completed services or when bookings are cancelled/rejected.
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default Bookings;