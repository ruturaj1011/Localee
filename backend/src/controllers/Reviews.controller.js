import dotenv from "dotenv";
dotenv.config();

import { Review } from '../models/reviewModel.js';
import { Service } from '../models/serviceModel.js';
import { User } from '../models/userModel.js';


// Add a new review
const addNewReview = async (req, res) => {

    const { message, rating, serviceId, owner } = req.body;

    const review = Review({
        comment: message,
        rating,
        author: owner
    })

    try{
        await review.save();
        await Service.findByIdAndUpdate(serviceId, { $push: { reviews: review._id } });
        res.status(201).json({ message: "Review added successfully", review });
    }
    catch(err){
        console.error("Error adding review:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Delete a review
const deleteReview = async (req, res) => {
    
        const { id } = req.params;
        const {serviceId, owner} = req.body;
    
        try {

            const review = await Review.findById(id);
    
            if (!review) {
                return res.status(404).json({ message: "Review not found" });
            }

            await Review.findByIdAndDelete(id);

            await Service.findByIdAndUpdate(serviceId, { $pull: { reviews: review._id } });
    
            res.status(200).json({ message: "Review deleted successfully", review });
        } catch (error) {
            console.error("Error deleting review:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
};

// Get all reviews
const allReviews = async (req, res) => {
    
        const { serviceId } = req.params;
    
        try {
            const reviews = await Service.findById(serviceId).populate("reviews");
            
            // console.log(reviews);

            const updatedReviews = await Promise.all(reviews.reviews.map(async (review) => {

                const user = await User.findById(review.author);

                return {
                    id: review._id,
                    text: review.comment,
                    rating: review.rating,
                    author: user.name,
                    owner: review.author,
                    authorPhoto: "https://placehold.co/400",
                    time: review.createdAt
                };
            }));

            // console.log(updatedReviews);

            res.json(updatedReviews);
        } catch (error) {
            console.error("Error fetching reviews:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
};

export { addNewReview, deleteReview, allReviews };