import { Router } from "express";
import {addNewService, deleteService, updateService, yourAllServices, serviceDetails} from '../controllers/Vendor.controller.js';
import {upload, cloudinary} from '../config/cloudinary.js';

// import { authMiddleware } from "../middleware.js";

const router = Router();

// Get all services
router.get('/:id/services', yourAllServices);

// Get service details
router.get('/:id/:serviceId', serviceDetails);

// Add a new service
router.post('/:vendorId/addNewService', upload.array('images', 6), addNewService);

// Delete a service
router.delete('/:vendorId/services/:serviceId/delete', deleteService);

// Update a service
router.put('/:vendorId/services/:serviceId/edit', upload.array('images', 6), updateService);



export default router;