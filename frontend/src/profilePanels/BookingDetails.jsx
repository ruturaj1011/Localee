import React from "react";
import { useLocation, useNavigate } from "react-router-dom";


const BookingDetails = ({ role }) => {
  const { state: booking } = useLocation();

  if (!booking) {
    return <div className="text-center text-gray-500">No booking details available.</div>;
  }

  const id = localStorage.getItem("id");

  const navigate = useNavigate();

  function onUpdateClick() {
    navigate(`/user/${id}/bookings/${booking._id}/details/update`, { state: booking });
  }

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Booking Details</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
        <Detail label="Customer Name" value={booking.customerName} />
        <Detail label="Vendor Name" value={booking.vendorName} />
        <Detail label="Service Category" value={booking.serviceCategory} />
        <Detail label="Address" value={booking.address} />
        <Detail label="Phone" value={booking.phone} />
        <Detail label="Type" value={booking.type} />
        <Detail label="Status" value={booking.status} />
        <Detail label="Date" value={new Date(booking.date).toLocaleDateString()} />
        <Detail label="Time" value={booking.time} />
        <Detail label="Notes" value={booking.notes} />
        <Detail label="Created At" value={new Date(booking.createdAt).toLocaleString()} />
        <Detail label="Updated At" value={new Date(booking.updatedAt).toLocaleString()} />
      </div>

      {role === "user" && (
        <div className="flex gap-4 pt-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
            Cancel Booking
          </button>
          <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-100 transition" onClick={onUpdateClick}>
            Update Booking
          </button>
        </div>
      )}

      {role === "vendor" && (
        <div className="flex gap-4 pt-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition">
            Accept Booking
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition">
            Reject Booking
          </button>
        </div>
      )}
    </div>
  );
};

const Detail = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium">{value || "—"}</p>
  </div>
);

export default BookingDetails;
