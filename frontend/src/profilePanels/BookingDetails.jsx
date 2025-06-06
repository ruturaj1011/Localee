import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ConfirmationCard from "./ConfirmationCard.jsx";
import axios from "axios";
import { useFlash } from "../contexts/FlashContext.jsx";

const BookingDetails = ({ role }) => {
  const { state: booking } = useLocation();
  const navigate = useNavigate();
  const { addFlashMessage } = useFlash();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [btnRole, setBtnRole] = useState("");

  if (!booking) {
    return <div className="text-center text-gray-500">No booking details available.</div>;
  }

  const id = localStorage.getItem("id");

  function onUpdateClick() {
    if (booking.status === "cancelled"){
      addFlashMessage("Booking is already cancelled.", "info");
      return;
    } // Prevent update if cancelled
    navigate(`/user/${id}/bookings/${booking._id}/details/update`, { state: booking });
  }

  function onBtnClick(status) {
    setIsConfirmationOpen(true);
    setBtnRole(status);
  }

  async function handleConfirm() {
    try {
      const isConfirm = await axios.post(`${import.meta.env.VITE_BASE_URL}/localee/${role}/${id}/bookings/${booking._id}/${btnRole}`);

      if (isConfirm.status === 200) {
        console.log(`Booking ${btnRole} successfully.`);
        addFlashMessage(`Booking ${btnRole} successfully.`, "success");
        setIsConfirmationOpen(false);
      } else {
        addFlashMessage(`Error while ${btnRole} booking. Please try again.`, "error");
        setIsConfirmationOpen(false);
      }

      navigate(-1);
    } catch (err) {
      addFlashMessage(`Error while ${btnRole} booking. Please try again.`, "error");
      console.log(err);
      setIsConfirmationOpen(false);
    }
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

      {/* User Actions */}
      {role === "user" && booking.status !== "cancelled" && booking.status !== "rejected" && (
        <div className="flex gap-4 pt-4">
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition" onClick={() => onBtnClick("cancel")}>
            Cancel Booking
          </button>
          <button
            className={`border border-gray-300 text-gray-700 px-6 py-2 rounded-xl ${
              booking.status === "cancelled" ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100 transition"
            }`}
            onClick={onUpdateClick}
            disabled={booking.status === "cancelled"}
          >
            Update Booking
          </button>
        </div>
      )}

      {/* Vendor Actions */}
      {role === "vendor" && booking.status === "pending" && (
        <div className="flex gap-4 pt-4">
          <button className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600 transition" onClick={() => onBtnClick("accept")}>
            Accept Booking
          </button>
          <button className="bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition" onClick={() => onBtnClick("reject")}>
            Reject Booking
          </button>
        </div>
      )}

      {/* Disabled Button for Vendor if Already Accepted or Rejected */}
      {role === "vendor" && (booking.status === "accepted" || booking.status === "rejected" || booking.status === "cancelled") && (
        <button className="bg-gray-400 text-white px-6 py-2 rounded-xl opacity-50 cursor-not-allowed">
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </button>
      )}

      {/* Confirmation Modal */}
      {isConfirmationOpen && btnRole !== "" && (
        <div className="z-20 fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <ConfirmationCard btnRole={btnRole} onClose={() => setIsConfirmationOpen(false)} onConfirm={handleConfirm} />
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
