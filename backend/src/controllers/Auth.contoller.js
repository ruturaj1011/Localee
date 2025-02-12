import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

async function fetchGeoLocation(city, state) {

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(city)}&state=${encodeURIComponent(state)}&countrycodes=IN&format=json&addressdetails=1&limit=1`
    );
    
    const data = await response.json();

    if (data.length > 0) {
      return {
        lat: data[0].lat,
        lon: data[0].lon,
      };
    } else {
      throw new Error("No results found for the given city and state.");
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error.message);
    return null;
  }
}

const userRegister = async (req, res) => {
  
  const { name, email, password, phone, city, state } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.role === "user") {
      return res.status(httpStatus.FOUND).json({ message: "User already exists with this email." });
    }

    if (existingUser && existingUser.role === "vendor") {
      return res.status(httpStatus.FOUND).json({ message: "Email is already registered as a Vendor. Please use another email." });
    }

    const coordinates = await fetchGeoLocation(city, state);
    let geoLocation = coordinates ? { ...coordinates } : undefined;

    const hashedPassword = await bcrypt.hash(password, 11);

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      city: city,
      state: state,
      role: "user",
      geoLocation: geoLocation,
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "User Registered Successfully!" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong! ${e.message}` });
  }
};

const vendorRegister = async (req, res) => {
  const { name, email, password, phone, businessName, city, state, address } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser && existingUser.role === "vendor") {
      return res.status(httpStatus.FOUND).json({ message: "Vendor already exists with this email." });
    }

    if (existingUser && existingUser.role === "user") {
      return res.status(httpStatus.FOUND).json({ message: "Email is already registered as a user. Please log in as a user or use another email." });
    }

    const coordinates = await fetchGeoLocation(city, state);
    let geoLocation = coordinates ? { ...coordinates } : undefined;

    const hashedPassword = await bcrypt.hash(password, 11);

    const newUser = new User({
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
      city: city,
      state: state,
      address: address,
      businessName: businessName,
      geoLocation: geoLocation,
      role: "vendor",
    });

    await newUser.save();

    res.status(httpStatus.CREATED).json({ message: "Vendor Registered Successfully!" });
  } catch (e) {
    res.status(500).json({ message: `Something went wrong! ${e.message}` });
  }
};

const login = async (req, res, role) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please Provide Valid Details" });
  }

  try {
    const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(httpStatus.NOT_FOUND).json({ message: "User Not Found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRY || "1d" }
      );

      

      return res.status(httpStatus.OK).json({ token: token, id: user._id});
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json({ message: "Invalid Username or Password!" });
    }
  } catch (e) {
    return res.status(500).json({ message: `Something went wrong! ${e.message}` });
  }
};

const userLogin = (req, res) => login(req, res, "user");
const vendorLogin = (req, res) => login(req, res, "vendor");

export { userLogin, userRegister, vendorLogin, vendorRegister };
