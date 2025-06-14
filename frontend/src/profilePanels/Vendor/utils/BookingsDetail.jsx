import { useState } from "react";

function BookingsDetails() {
    const [loadingStates, setLoadingStates] = useState({
        accept: false,
        reject: false
    });

    const handleAction = async (id, action) => {
        // Set loading state for the specific action
        setLoadingStates(prev => ({ ...prev, [action]: true }));
        
        try {
            console.log(`Booking ID: ${id} | Action: ${action}`);
            
            // Simulate async operation (you can replace this with your actual API call)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
        } catch (error) {
            console.error(`Error ${action}ing booking:`, error);
        } finally {
            // Reset loading state
            setLoadingStates(prev => ({ ...prev, [action]: false }));
        }
    };
    
    return ( 
        <div>
            <div className="flex gap-2">
                  <button
                    onClick={() => handleAction("booking-123", "accept")}
                    disabled={loadingStates.accept || loadingStates.reject}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingStates.accept && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction("booking-123", "reject")}
                    disabled={loadingStates.accept || loadingStates.reject}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {loadingStates.reject && (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    )}
                    Reject
                  </button>
            </div>
        </div>
    );
}

export default BookingsDetails;