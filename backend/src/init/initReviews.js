import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import reviews  from "./data.js";

import {Review} from "../models/reviewModel.js";



// console.log(services);
const dbURL = process.env.MONGO_URL;

// Connect to MongoDB Atlas
async function main() {
    await mongoose.connect(dbURL);
}

const initDB = async () => {
    try {
        
        await Review.deleteMany({}); // Clear existing data

        // Insert the new data into the database

        await Review.insertMany(reviews.reviews);
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