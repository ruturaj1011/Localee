import mongoose from 'mongoose';
const { Schema } = mongoose;

const reviewSchema = new Schema({
    auther: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    },
    comment: { 
        type: String, 
        maxlength: 500 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Review = mongoose.model('Review', reviewSchema);

export {Review};