import mongoose, {Schema} from 'mongoose';

const bookingSchema = new Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    vendorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    serviceId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Service', 
        required: true 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['pending', 'completed', 'cancelled'],
        default: 'pending' 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;