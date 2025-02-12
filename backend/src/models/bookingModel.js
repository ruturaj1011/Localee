import mongoose, {Schema} from 'mongoose';

const bookingSchema = new Schema({

    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User',
        required: true
    },
    type:{
        type: String,
        enum: ['Appointment', 'HomeVisit'],
        required: true
    },
    name : {
        type : String,
        required : true
    },
    phone : {
        type : Number,
        required : true
    },
    address : {
        type : String
    },
    notes : {
        type : String
    },
    vendorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
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