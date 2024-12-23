import React from 'react';

function BookingsDetails() {

    const handleAction = (id, action) => {
        console.log(`Booking ID: ${id} | Action: ${action}`);
    };
    
    return ( 
        <div>
            <div className="flex gap-2">
                  <button
                    onClick={() => handleAction(booking.id, "accept")}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleAction(booking.id, "reject")}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  >
                    Reject
                  </button>
            </div>
        </div>
    );
}

export default BookingsDetails;