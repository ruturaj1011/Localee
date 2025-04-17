import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import {createServer} from "node:http";

import mongoose from "mongoose";
import cors from "cors";

import { Service } from './models/serviceModel.js';


import AuthRoutes from "./routes/AuthRoutes.js";
import ProfileRoutes from "./routes/ProfileRoutes.js";
import ReviewRoutes from "./routes/ReviewsRoutes.js";
import CommonRoutes from "./routes/CommonRoutes.js";
import VendorRoutes from "./routes/VendorRoutes.js";
import ChatRoutes from "./routes/ChatRoutes.js";

import fetch from 'node-fetch';

const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Auth Routes
app.use("/auth", AuthRoutes);

// Profile Routes
app.use("/profile", ProfileRoutes);

// Review Routes
app.use("/reviews", ReviewRoutes);

// Common Routes
app.use("/localee", CommonRoutes);

// Vendor Routes
app.use("/vendor", VendorRoutes);

// Chat Routes
app.use("/api", ChatRoutes);




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

// fetch nearby services
app.get("/fetch/nearby/services", async (req, res) => {
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

        // console.log(combinedResults);

        res.json(combinedResults);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// fetch google place details
app.get("/google/:service/:place_id", async (req, res) => {
    try {
      const { place_id } = req.params;  // Match the name of the URL parameter here
  
      const detailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${place_id}&fields=name,formatted_address,formatted_phone_number,website,rating,user_ratings_total,reviews,photos,opening_hours,editorial_summary&key=${process.env.GOOGLE_LOCALEE}`;
  
      const response = await fetch(detailsUrl);
      const placeData = await response.json();
  
      res.json(placeData.result);
    } catch (error) {
      console.error("Error fetching data:", error);
      res.status(500).json({ error: "Internal Server Error" });
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