import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import services  from "./data.js";

import {Service} from "../models/serviceModel.js";


// MongoDB connection string from environment variables
// console.log("Mongo URL:", process.env.MONGO_URL);

console.log(services);
const dbURL = process.env.MONGO_URL;

// Connect to MongoDB Atlas
async function main() {
    await mongoose.connect(dbURL);
}

const initDB = async () => {
    try {
        
        await Service.deleteMany({}); // Clear existing data

        // Insert the new data into the database

        await Service.insertMany(services.data);
        console.log("Data initialized successfully");

    } catch (error) {
        console.error("Error initializing data:", error);
    } finally {
        // Close the database connection after operations
        mongoose.connection.close();
    }
};

main()
    .then(() => {
        console.log("Connected to DB");
        initDB(); // Initialize the database after connection
    })
    .catch((err) => {
        console.error("Error connecting to DB:", err);
    });
