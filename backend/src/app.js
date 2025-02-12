import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import {createServer} from "node:http";

import mongoose from "mongoose";
import cors from "cors";

import Booking from './models/bookingModel.js';
import { Service } from './models/serviceModel.js';
import { User } from './models/userModel.js';

import { getCoordinates } from './middleware.js';

import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true }));

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

        console.log(storedServices);

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
        const { name, phone, date, time, address, notes, userId, vendorId, serviceId } = req.body;
        
        if (!name || !phone || !date || !serviceId) {
            return res.status(400).json({ message: 'Required fields are missing' });
        }
        
        const bookingData = {
            userId,
            name,
            phone,
            date,
            time: time || null,
            address: address || '',
            notes: notes || '',
            vendorId,
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
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.post("/localee/vendor/:vendorId/addNewService", async (req, res) => {
    try {
        const { vendorId } = req.params;
        const {
            serviceName, category, heroImg, images, email, whatsappNumber, 
            contactNumber, description, address, city, state, zip
        } = req.body;

        const add = `${address}, ${city}, ${state}, ${zip}`;

        const { lat, lng } = await getCoordinates(add);

        // Validate required fields
        if (!serviceName || !category || !email || !whatsappNumber || !contactNumber || !address || !city || !state || !zip) {
            return res.status(400).json({ error: "Required fields are missing" });
        }

        // Create service object
        const newService = new Service({
            serviceName,
            category,
            heroImg: heroImg || "",
            images: images || [],
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