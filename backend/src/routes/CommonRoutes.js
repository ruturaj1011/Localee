import { Router } from "express";
import {bookService, bookingHistoryAndUpcoming, updateBookingStatus, clearBookingHistory, updateBooking} from "../controllers/Common.controller.js";


const router = Router();

// Book a service
router.post("/:serviceId/book", bookService);

// Booking history and upcoming bookings
router.get("/:role/:id/bookingslist", bookingHistoryAndUpcoming);

// Update booking status
router.post("/:role/:id/bookings/:bookingId/:status", updateBookingStatus);

// Clear booking history
router.delete("/:role/:id/bookings/clearHistory", clearBookingHistory);

// Update booking
router.patch("/:role/:id/bookings/:bookingId/update", updateBooking);


export default router;