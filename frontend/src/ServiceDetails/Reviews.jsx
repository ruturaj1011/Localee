import React, { useState } from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import { PenIcon, Star, Trash } from 'lucide-react';
import axios from 'axios';

function Reviews({ reviews, rating, totalRatings, serviceId, owner, isStored }) {
    
    let [showReviewForm, setShowReviewForm] = useState(false);

    // console.log("rev" , reviews);

    const id = localStorage.getItem("id");

    let [review, setReview] = useState({
        message: "",
        rating: 5,
        serviceId: serviceId,
        owner: owner,
    });

    const [hover, setHover] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReview({ ...review, [name]: value });
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        console.log(review);

        try {
            await axios.post("http://localhost:8000/reviews/add", review)
            alert("Review submitted successfully");
        }
        catch (err) {
            alert("Failed to submit review");
        }

        setReview({
            message: "",
            rating: 5,
            serviceId: serviceId,
            owner: owner,
        });
        setShowReviewForm(false);

        window.location.reload();
    };

    const deleteReview = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/reviews/${id}/delete`, { serviceId, owner: id });
            alert("Review deleted successfully");
        }
        catch (err) {
            alert("Failed to delete review");
        }
        window.location.reload();
    };

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <div className="mb-4 flex justify-between items-center">
                <h3 className="text-lg font-semibold">Reviews</h3>

                <div className='flex items-center justify-evenly space-x-4'>
                    <div className="flex items-center space-x-2">
                        <span className="text-yellow-500 text-lg">{rating}</span>
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill={i < rating ? "gold" : "gray"}
                                    className="bi bi-star"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.396.208-.863-.1-.743-.577L5.07 9.865 1.37 6.343c-.319-.31-.152-.888.283-.94l4.993-.723 2.06-4.931c.198-.478.846-.478 1.044 0l2.06 4.931 4.993.723c.435.052.602.63.283.94l-3.7 3.522 1.201 4.001c.12.477-.347.785-.743.577L8 12.47l-3.657 2.973a.537.537 0 0 1-.731-.073l-1.201-4.001L3.612 15.443z" />
                                </svg>
                            ))}
                        </div>
                        <span className="text-gray-600 text-sm">({totalRatings} reviews)</span>
                    </div>

                    {isStored && (
                        <button
                        onClick={() => setShowReviewForm(true)}
                        className="flex items-center gap-1 px-3 py-1 rounded-md bg-indigo-100 text-black text-sm font-medium shadow-md hover:shadow-xl transition duration-300 hover:scale-105"
                    >
                        <PenIcon className="w-3.5 h-3.5" />
                    </button>
                    )}
                </div>
            </div>

            <div className="max-h-60 overflow-y-scroll space-y-4 hide-scrollbar">
                {reviews?.map((rev, index) => (
                    <div key={index} className="border-b pb-4">
                        <div className="flex items-center space-x-3 justify-between">
                            <div className="flex items-center space-x-2">
                                
                                    <img
                                        src={rev.authorPhoto}
                                        alt={rev.author}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                
                                <div>
                                    <h4 className="font-medium text-gray-900">{rev.author}</h4>
                                    <p className="text-gray-500 text-sm">
                                        {rev.time} • {rev.relativeTime}
                                    </p>
                                </div>
                            </div>

                            <div className='text-gray-500'>
                                {isStored && id === rev.owner && (

                                    <button className='hover:text-gray-950' onClick={() => deleteReview(rev.id)}><Trash size={16} /></button>
                                )}
                            </div>
                        </div>

                        <p className="text-gray-600 text-sm mt-2">{rev.text}</p>

                        <div className="flex items-center mt-2">
                            {[...Array(5)].map((_, i) => (
                                <svg
                                    key={i}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill={i < rev.rating ? "gold" : "gray"}
                                    className="bi bi-star"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M3.612 15.443c-.396.208-.863-.1-.743-.577L5.07 9.865 1.37 6.343c-.319-.31-.152-.888.283-.94l4.993-.723 2.06-4.931c.198-.478.846-.478 1.044 0l2.06 4.931 4.993.723c.435.052.602.63.283.94l-3.7 3.522 1.201 4.001c.12.477-.347.785-.743.577L8 12.47l-3.657 2.973a.537.537 0 0 1-.731-.073l-1.201-4.001L3.612 15.443z" />
                                </svg>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {showReviewForm && (
                <div className="mt-4 pt-4 border-t-2 border-indigo-600">
                    {}
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                        <div>
                            <label htmlFor="review" className="block text-sm font-medium text-gray-700">Review</label>
                            <textarea
                                id="review"
                                name="message"
                                className="mt-1 p-2 w-full border rounded-md"
                                value={review.message}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                            <div className="flex gap-1">
                                {[...Array(5)].map((_, index) => {
                                    const starValue = index + 1;
                                    return (
                                        <Star
                                            key={index}
                                            size={24}
                                            className="cursor-pointer"
                                            fill={starValue <= (hover || review.rating) ? '#FACC15' : '#E5E7EB'} // Yellow for filled, Gray for empty
                                            stroke={starValue <= (hover || review.rating) ? '#FACC15' : '#E5E7EB'}
                                            onClick={() => setReview({ ...review, rating: starValue })}
                                            onMouseEnter={() => setHover(starValue)}
                                            onMouseLeave={() => setHover(null)}
                                        />

                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none">
                                Submit Review
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Reviews;