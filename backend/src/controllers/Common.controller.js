import dotenv from 'dotenv';
dotenv.config();

import Booking from '../models/bookingModel.js';
import { User } from '../models/userModel.js';


// book service
const bookService = async (req, res) => {

    try {

        const { type, customerName, vendorName, serviceCategory, phone, date, time, address, notes, userId, vendorId, serviceId } = req.body;

        // console.log( type, customerName, vendorName, serviceCategory, phone, date, time, address, notes, userId, vendorId, serviceId);
        
        if (!customerName || !vendorName|| !phone || !date || !serviceId) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        
        const bookingData = {
            type,
            userId,
            customerName,
            vendorName,
            serviceCategory,
            phone,
            date,
            time: time || null,
            address: address || '',
            notes: notes || '',
            vendorId: vendorId || null,
            serviceId
        };
        
        const newBooking = new Booking(bookingData);
        await newBooking.save();

        // Update user and vendor booking references
        await User.findByIdAndUpdate(userId, { $push: { bookings: newBooking._id } });
        if (vendorId) {      
            await User.findByIdAndUpdate(vendorId, { $push: { bookings: newBooking._id } });
        }
        
        res.status(201).json({ message: 'Booking successful', booking: newBooking });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

// booking history | upcoming bookings
const bookingHistoryAndUpcoming = async (req, res) => {
    try {
        const { id } = req.params;

        const vendor = await User.findById(id).populate("bookings");

        const pendingBookings = vendor.bookings.filter(booking => booking.status === "pending");
        const acceptedBookings = vendor.bookings.filter(booking => booking.status === "accepted");
        const bookingHistory = vendor.bookings.filter(booking => booking.status === "completed" || booking.status === "cancelled");

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
            return res.status(400).json({ message: "Booking already completed or cancelled" });
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

        res.status(200).json({ message: `Booking ${updatedStatus} successfully`, booking });
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

        // Select only completed/cancelled/rejected bookings
        const removableBookings = user.bookings
            .filter(booking => 
                ["completed", "cancelled", "rejected"].includes(booking.status)
            )
            .map(booking => booking._id);

        if (removableBookings.length === 0) {
            return res.status(200).json({ message: "No history to clear" });
        }

        // Remove references from user's bookings array
        user.bookings = user.bookings.filter(booking => 
            !removableBookings.includes(booking._id.toString())
        );
        await user.save();

        // Check if any other users/vendors still have these bookings
        const vendorCount = await User.countDocuments({ bookings: { $in: removableBookings } });

        if (vendorCount === 0) {
            await BookingModel.deleteMany({ _id: { $in: removableBookings } });
        }

        return res.status(200).json({ message: "History cleared successfully" });

    } catch (err) {
        console.error("Error clearing history:", err);
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

// update booking details
const updateBooking = async (req, res) => {

    const {bookingId}  = req.params;
    const { customerName, phone, date, time, notes, address } = req.body;

    try{

        const booking = await Booking.findByIdAndUpdate( bookingId, {customerName, phone, date, time, notes, address}, {new : true, runValidators:true});

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking updated successfully", booking });

    }
    catch(err){
        console.error("Error updating booking:", err);
        res.status(500).json({ message: "Server error", error: err.message })
    };
    
};


export { bookService, bookingHistoryAndUpcoming, updateBookingStatus, clearBookingHistory, updateBooking };