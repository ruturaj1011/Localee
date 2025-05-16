import dotenv from "dotenv";
dotenv.config();

import Booking from "../models/bookingModel.js";
import { User } from "../models/userModel.js";

import sendEmail from "../utils/sendEmail.js";

// book service
const bookService = async (req, res) => {
  try {
    const {
      type,
      customerName,
      vendorName,
      serviceCategory,
      phone,
      date,
      time,
      address,
      notes,
      userId,
      vendorId,
      serviceId,
    } = req.body;

    if (!customerName || !vendorName || !phone || !date || !serviceId) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const bookingData = {
      type,
      userId,
      customerName,
      vendorName,
      serviceCategory,
      phone,
      date,
      status: vendorId ? "pending" : "accepted",
      time: time || null,
      address: address || "",
      notes: notes || "",
      vendorId: vendorId || null,
      serviceId,
    };

    const newBooking = new Booking(bookingData);
    await newBooking.save();

    await User.findByIdAndUpdate(userId, {
      $push: { bookings: newBooking._id },
    });

    if (vendorId) {
      await User.findByIdAndUpdate(vendorId, {
        $push: { bookings: newBooking._id },
      });
    }

    // Get user and vendor email
    const user = await User.findById(userId);
    const vendor = vendorId ? await User.findById(vendorId) : null;

    const message = `
        Hi ${customerName},

        Your appointment request for the service "${serviceCategory}" has been submitted successfully.

        Booking Details:
        Type: ${type}
        Customer Name: ${customerName}
        Notes: ${notes || "None"}
        Phone: ${phone}
        Vendor: ${vendorName}
        Date: ${date}
        Time: ${time || "Not specified"}
        Address: ${address || "Not provided"}

        You will be notified once the vendor accepts your request.

        Thanks,  
        Team LocalLee
    `;

    if (user?.email) {
      await sendEmail(user.email, "Appointment Request Submitted", message);
    }

    if (vendor?.email) {
      const vendorMessage = `
        Hi ${vendor.name},

        You have received a new appointment request for your service "${serviceCategory}".

        Booking Details:
        Type: ${type}
        Customer Name: ${customerName}
        Notes: ${notes || "None"}
        Phone: ${phone}
        Date: ${date}
        Time: ${time || "Not specified"}
        Address: ${address || "Not provided"}

        Please log in to your account to accept or manage the booking.

        Thanks,  
        Team LocalLee
    `;
      await sendEmail(vendor.email, "New Appointment Request", vendorMessage);
    }
    // ✅ EMAIL LOGIC ENDS HERE

    res
      .status(201)
      .json({ message: "Booking successful", booking: newBooking });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// booking history | upcoming bookings
const bookingHistoryAndUpcoming = async (req, res) => {
  try {
    const { id } = req.params;

    const vendor = await User.findById(id).populate("bookings");

    const pendingBookings = vendor.bookings.filter(
      (booking) => booking.status === "pending"
    );
    const acceptedBookings = vendor.bookings.filter(
      (booking) => booking.status === "accepted"
    );
    const bookingHistory = vendor.bookings.filter(
      (booking) =>
        booking.status === "completed" ||
        booking.status === "cancelled" ||
        booking.status === "rejected"
    );

    // console.log(pendingBookings, acceptedBookings, bookingHistory);

    res.json({ pendingBookings, acceptedBookings, bookingHistory });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update booking status
const updateBookingStatus = async (req, res) => {
  const { id, bookingId, status } = req.params;

  try {
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "completed" || booking.status === "cancelled") {
      return res
        .status(400)
        .json({ message: "Booking already completed or cancelled" });
    }

    let updatedStatus;
    if (status === "accept") {
      updatedStatus = "accepted";
    } else if (status === "reject") {
      updatedStatus = "rejected";
    } else if (status === "cancel") {
      updatedStatus = "cancelled";
    } else {
      return res.status(400).json({ message: "Invalid status" });
    }

    booking.status = updatedStatus;
    await booking.save();


    const user = await User.findById(booking.userId);
    const vendor = booking.vendorId ? await User.findById(booking.vendorId) : null;

    if (user?.email) {
      const message = `
        Hi ${booking.customerName},

        Your booking request for the service "${booking.serviceCategory}" has been ${updatedStatus} by ${updatedStatus == "cancelled" ? "you" : "the Vendor"}.

        Booking Details:
        Type: ${booking.type}
        Vendor: ${booking.vendorName}
        Date: ${booking.date}
        Time: ${booking.time || "Not specified"}
        Address: ${booking.address || "Not provided"}
        Notes: ${booking.notes || "None"}

        Status: ${updatedStatus.toUpperCase()}

        Thank you for using LocalLee!
        `;

      await sendEmail(user.email, `Booking ${updatedStatus}`, message);
    }

    res
      .status(200)
      .json({ message: `Booking ${updatedStatus} successfully`, booking });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};


// clear booking history
const clearBookingHistory = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).populate("bookings");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Filter out completed, cancelled, or rejected bookings
    const removableBookings = user.bookings.filter((booking) =>
      ["completed", "cancelled", "rejected"].includes(booking.status)
    );

    if (removableBookings.length === 0) {
      return res.status(200).json({ message: "No booking history to clear." });
    }

    // Extract booking IDs for deletion
    const removableBookingIds = removableBookings.map((booking) => booking._id);

    // Remove from user's bookings
    user.bookings = user.bookings.filter(
      (booking) => !removableBookingIds.includes(booking._id)
    );
    await user.save();

    // Delete bookings if no other users have them
    await Booking.deleteMany({
      _id: { $in: removableBookingIds },
      $nor: [
        {
          _id: {
            $in: (
              await User.find({ bookings: { $in: removableBookingIds } })
            ).flatMap((u) => u.bookings),
          },
        },
      ],
    });

    res.status(200).json({ message: "Booking history cleared successfully." });
  } catch (error) {
    console.error("Error clearing booking history:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// update booking details
const updateBooking = async (req, res) => {
  const { bookingId } = req.params;
  const { customerName, phone, date, time, notes, address } = req.body;

  try {
    const booking = await Booking.findByIdAndUpdate(
      bookingId,
      { customerName, phone, date, time, notes, address },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking updated successfully", booking });
  } catch (err) {
    console.error("Error updating booking:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export {
  bookService,
  bookingHistoryAndUpcoming,
  updateBookingStatus,
  clearBookingHistory,
  updateBooking,
};
