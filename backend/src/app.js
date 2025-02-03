import dotenv from 'dotenv';
dotenv.config();

import express from "express";
import {createServer} from "node:http";

import mongoose from "mongoose";
import cors from "cors";

import AuthRoutes from "./routes/AuthRoutes.js";

const app = express();

const server = createServer(app);

app.use(cors());
app.use(express.json({limit : "40kb"}));
app.use(express.urlencoded({limit:"40kb", extended: true }));

app.use("/auth", AuthRoutes);

app.get("/localee", async (req, res) => {
    try {
        const { lat, lng, service } = req.query;

        if (!lat || !lng || !service) {
            return res.status(400).json({ error: "Missing required parameters (lat, lng, service)" });
        }

        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=1500&keyword=${encodeURIComponent(service)}&key=${process.env.GOOGLE_LOCALEE}`;
        
        const response = await fetch(apiUrl);
        const data = await response.json();

        // console.log(data);

        res.json(data);
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