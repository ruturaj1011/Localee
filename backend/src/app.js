import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import {createServer} from "node:http";

import mongoose from "mongoose";
import cors from "cors";

import Booking from './models/bookingModel.js';
import { Service } from './models/serviceModel.js';
import { User } from './models/userModel.js';
import { Review } from './models/reviewModel.js';

import { getCoordinates } from './middleware.js';

import AuthRoutes from "./routes/AuthRoutes.js";

import {upload, cloudinary} from './config/cloudinary.js';

const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/auth", AuthRoutes);

const searchNearbyServices = async ( lat, lng, serviceType, maxDistance) => {

    if (!lat || !lng) return {};
  
    const services = await Service.find({
      category: serviceType, // Search specific service
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: [lng, lat] },
          $maxDistance: maxDistance || 2000 // Default: 2km
        }
      }
    });
  
    return services;
};
app.get("/localee", async (req, res) => {
    try {

        const { lat, lng, service } = req.query;

        if (!lat || !lng || !service) {
            return res.status(400).json({ error: "Missing required parameters (lat, lng, service)" });
        }

        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&keyword=${encodeURIComponent(service)}&key=${process.env.GOOGLE_LOCALEE}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        const storedServices = await searchNearbyServices(lat, lng, service, 2000);

        // console.log(storedServices);

        const combinedResults = {
            storedServices,
            googleResults: data.results
        };

        res.json(combinedResults);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

app.get("/localee/:service/:place_id", async (req, res) => {
    try {
      const { place_id } = req.params;  // Match the name of the URL parameter here
  
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,photos,editorial_summary&key=${process.env.GOOGLE_LOCALEE}`;
  
      const response = await fetch(detailsUrl);
      const placeData = await response.json();
  
      res.json(placeData.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// Booking
app.post('/localee/book', async (req, res) => {

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
});

app.post("/localee/vendor/:vendorId/addNewService", upload.array('images', 6), async (req, res) => {
    try {
        const { vendorId } = req.params;
        const {
            serviceName, category, email, whatsappNumber, 
            contactNumber, description, address, city, state, zip
        } = req.body;

        // console.log("Received files:", req.files);

        const add = `${address}, ${city}, ${state}, ${zip}`;
        const { lat, lng } = await getCoordinates(add);

        // Validate required fields
        if (!serviceName || !category || !email || !whatsappNumber || !contactNumber || !address || !city || !state || !zip) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        // Extract Cloudinary URLs from req.files
        const imageUrls = req.files.map(file => file.path); // Cloudinary URL is stored in file.path

        // Separate heroImg from the uploaded images (if available)
        const heroImg = imageUrls.length > 0 ? imageUrls[0] : ""; // First image as hero image

        // console.log(heroImg, imageUrls);

        // Create service object
        const newService = new Service({
            serviceName,
            category,
            heroImg,
            images: imageUrls,
            email,
            whatsappNumber,
            contactNumber,
            description: description || "",
            address,
            city,
            state,
            zip,
            location: { type: "Point", coordinates: [lng, lat] },
            owner: vendorId
        });

        // Save to DB
        await newService.save();

        // Update vendor with new service
        await User.findByIdAndUpdate(vendorId, { $push: { servicesOffered: newService._id } });

        res.status(201).json({ message: "Service added successfully", service: newService });
    } catch (error) {
        console.error("Error adding service:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// profile info
app.get("/localee/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const data = await User.findById(id);

        // console.log(data);

        res.json(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.post("/profile/:id/update", async (req, res) => {

    const { id } = req.params;
    const { name, phone, email, city, state } = req.body;

    try {
        const updatedProfile = await User.findByIdAndUpdate(id, { name, phone, email, city, state }, { new: true, runValidators: true });

        // console.log(updatedProfile);
        res.status(200).json({ message: "Profile updated successfully", updatedProfile });
    }
    catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
  

// Reviews
app.post("/reviews/add", async (req, res) => {

    const { message, rating, serviceId, owner } = req.body;

    const review = Review({
        comment: message,
        rating,
        author: owner
    })

    try{
        await review.save();
        await Service.findByIdAndUpdate(serviceId, { $push: { reviews: review._id } });
        res.status(201).json({ message: "Review added successfully", review });
    }
    catch(err){
        console.error("Error adding review:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
app.delete("/reviews/:id/delete", async (req, res) => {
    
        const { id } = req.params;
        const {serviceId, owner} = req.body;
    
        try {

            const review = await Review.findById(id);
    
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            await Review.findByIdAndDelete(id);

            await Service.findByIdAndUpdate(serviceId, { $pull: { reviews: review._id } });
    
            res.status(200).json({ message: "Review deleted successfully", review });
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
})
app.get("/reviews/:serviceId", async (req, res) => {
    
        const { serviceId } = req.params;
    
        try {
            const reviews = await Service.findById(serviceId).populate("reviews");
            
            // console.log(reviews);

            const updatedReviews = await Promise.all(reviews.reviews.map(async (review) => {

                const user = await User.findById(review.author);

                return {
                    id: review._id,
                    text: review.comment,
                    rating: review.rating,
                    author: user.name,
                    owner: review.author,
                    authorPhoto: "https://placehold.co/400",
                    time: review.createdAt
                };
            }));

            console.log(updatedReviews);

            res.json(updatedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
});

// Services
app.get("/localee/vendor/:id/services", async (req, res) => {
    try {
        const { id } = req.params;

        const vendor = await User.findById(id).populate("servicesOffered");

        // console.log(vendor.servicesOffered);
        res.json(vendor.servicesOffered);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// bookings history | upcoming bookings
app.get("/localee/:role/:id/bookingslist", async (req, res) => {
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
});

app.post("/localee/:role/:id/bookings/:bookingId/:status", async (req, res) => {
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
});

app.delete("/localee/:role/:id/bookings/clearHistory", async (req, res) => {
    
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
});

app.patch("/localee/:role/:id/bookings/:bookingId/update", async (req, res) => {

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
    
});




const PORT = 8000;
const MONGO_URL = process.env.MONGO_URL;

const start = async () => {

    const connectionDb = await mongoose.connect(MONGO_URL);
    console.log(`MONGO Connected DB Host : ${connectionDb.connection.host}`);

    server.listen(PORT, () => {
        console.log(`Listening on port ${PORT}`);
    });
}

start();