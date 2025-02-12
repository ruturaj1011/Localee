
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';

// middleware/auth.js
const jwt = import('jsonwebtoken');

const authMiddleware = (role) => (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Authentication required" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== role) {
            return res.status(403).json({ message: "Access forbidden" });
        }
        req.user = decoded; // Attach user data to the request
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

const getCoordinates = async (address) => {
    const API_KEY = process.env.GOOGLE_LOCALEE;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${API_KEY}`;
  
    try {
      const response = await axios.get(url);
      const { lat, lng } = response.data.results[0].geometry.location;
      return { lat, lng };
    } catch (error) {
      console.error("Geocoding error:", error);
      return null;
    }
};

export {authMiddleware, getCoordinates};

  