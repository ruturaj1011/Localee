import dotenv from "dotenv";
dotenv.config();
import {upload, cloudinary} from '../config/cloudinary.js';
import { getCoordinates } from '../middleware.js';

import { Service } from '../models/serviceModel.js';
import { User } from '../models/userModel.js';
import { Review } from '../models/reviewModel.js';


// Add new service
const addNewService = async (req, res) => {
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
};

// Delete service
const deleteService = async (req, res) => {
  try {
    const { vendorId, serviceId } = req.params;

    // Find the service
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Step 1: Delete images from Cloudinary
    for (const imageUrl of service.images) {
      // Extract public ID from the image URL
      const publicId = imageUrl.split("/").pop().split(".")[0]; // Example: "localee/services/abc123"
      await cloudinary.uploader.destroy(`localee/services/${publicId}`);
    }

    // Step 2: Delete reviews associated with the service
    if (service.reviews && service.reviews.length > 0) {
      await Review.deleteMany({ _id: { $in: service.reviews } }); // Delete reviews by their IDs
    }

    // Step 3: Delete the service from the database
    await Service.findByIdAndDelete(serviceId);

    // Step 4: Remove service reference from the vendor
    await User.findByIdAndUpdate(vendorId, { $pull: { servicesOffered: serviceId } });

    res.status(200).json({ message: "Service and associated reviews deleted successfully", service });
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update service
const updateService = async (req, res) => {
    try {
      const { vendorId, serviceId } = req.params;
      const updatedData = req.body;
  
      // Parse existingImages from the request body
      const existingImages = JSON.parse(updatedData.existingImages || "[]");
  
      // Fetch the existing service
      const existingService = await Service.findById(serviceId);
      if (!existingService) {
        return res.status(404).json({ error: "Service not found" });
      }
  
      // Step 1: Handle new image uploads
      const newImageUrls = [];
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: "localee/services", // Optional: Organize images in a folder
        });
        newImageUrls.push(result.secure_url); // Store Cloudinary URL
      }
  
      // Step 2: Handle removed images
      const removedImages = existingService.images.filter(
        (img) => !existingImages.includes(img)
      );
      for (const imgUrl of removedImages) {
        const publicId = imgUrl.split("/").pop().split(".")[0]; // Extract public ID from URL
        await cloudinary.uploader.destroy(`localee/services/${publicId}`); // Delete from Cloudinary
      }
  
      // Step 3: Combine existing and new image URLs
      const updatedImages = [
        ...existingImages, // Keep existing images that weren't removed
        ...newImageUrls, // Add new images
      ];
  
      // Step 4: Update the service in the database
      const updatedService = await Service.findByIdAndUpdate(
        serviceId,
        { ...updatedData, images: updatedImages },
        { new: true }
      );
  
      res.status(200).json({ message: "Service updated successfully", service: updatedService });
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ error: "Internal server error" });
    }
};

// Get all services
const yourAllServices = async (req, res) => {
    try {
        const { id } = req.params;

        const vendor = await User.findById(id).populate("servicesOffered");

        // console.log(vendor.servicesOffered);
        res.json(vendor.servicesOffered);
    } catch (error) {
        console.error("Error fetching services:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Get service details
const serviceDetails = async (req, res) => {
    try {
        const { serviceId } = req.params;

        const service = await Service.findById(serviceId);
        // console.log(service);
        res.status(200).json(service);
    } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export { addNewService, deleteService, updateService, yourAllServices, serviceDetails };