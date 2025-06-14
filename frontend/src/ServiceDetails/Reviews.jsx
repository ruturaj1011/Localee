import { useState } from 'react';
import { PenIcon, Star, Trash } from 'lucide-react';
import axios from 'axios';
import { useFlash } from '../contexts/FlashContext.jsx';

function Reviews({ reviews, rating, totalRatings, serviceId, owner, isStored }) {

    let [showReviewForm, setShowReviewForm] = useState(false);
    let [isSubmitting, setIsSubmitting] = useState(false);
    const { addFlashMessage } = useFlash();

    // console.log("rev" , reviews);

    const id = localStorage.getItem("id");
    const role = localStorage.getItem("role");

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

        setIsSubmitting(true);

        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/reviews/add`, review)
            addFlashMessage("Review added successfully.", "success");
        }
        catch (err) {
            addFlashMessage("Failed to add review. Please try again.", "error");
        }
        finally {
            setIsSubmitting(false);
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
            await axios.delete(`${import.meta.env.VITE_BASE_URL}/reviews/${id}/delete`, { serviceId, owner: id });
            addFlashMessage("Review deleted successfully.", "success");
        }
        catch (err) {
            addFlashMessage("Failed to delete review. Please try again.", "error");
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

                    {isStored && role == "user" && (
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
                                    onError={(e) => e.target.src = 'https://placehold.co/400'}
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
                    { }
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
                                disabled={isSubmitting}
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
                                            className={`cursor-pointer ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
                                            fill={starValue <= (hover || review.rating) ? '#FACC15' : '#E5E7EB'} // Yellow for filled, Gray for empty
                                            stroke={starValue <= (hover || review.rating) ? '#FACC15' : '#E5E7EB'}
                                            onClick={() => !isSubmitting && setReview({ ...review, rating: starValue })}
                                            onMouseEnter={() => !isSubmitting && setHover(starValue)}
                                            onMouseLeave={() => !isSubmitting && setHover(null)}
                                        />

                                    );
                                })}
                            </div>
                        </div>
                        <div>
                            <button 
                                type="submit" 
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                        Submitting...
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Reviews;