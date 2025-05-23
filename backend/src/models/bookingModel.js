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
    customerName : {
        type : String,
        required : true
    },
    vendorName : {
        type : String,
        required : true
    },
    serviceCategory : {
        type : String,
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
        ref: 'User',
        default: null
    },
    serviceId: { 
        type: String,
        required: true 
    },
    placeId: { 
        type: String, 
    },
    date: { 
        type: Date, 
        required: true 
    },
    time: { 
        type: String, 
        required: function() { return this.type === 'Appointment'; } // Only required for Appointmen
    },
    status: { 
        type: String, 
        enum: ['pending', 'accepted', 'rejected', 'completed', 'cancelled'],
        default: 'pending' 
    }
}, { timestamps: true }); // Automatically adds createdAt and updatedAt fields

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;