import { Router } from "express";
import {addNewReview, deleteReview, allReviews} from "../controllers/Reviews.controller.js";

const router = Router();

// Add a new review
router.post("/add", addNewReview);

// Delete a review
router.delete("/:id/delete", deleteReview);

// Get all reviews
router.get("/:serviceId", allReviews);

export default router;