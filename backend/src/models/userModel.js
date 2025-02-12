import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        phone: { type: String, required: true },
        city : {type: String, required: true},
        state : {type: String, required: true},
        address: { type: String },
        geoLocation: {
            type: { lat: Number, lng: Number },
            default: null,
        },
        token: { type: String },

        role: { type: String, enum: ["user", "vendor"], required: true }, // Determines user type

        bookings : {
            type: [{ 
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Booking' 
            }],
            default: []
        },

        // Vendor-specific fields (only applicable when role is "vendor")
        businessName: { type: String, default: "" },
        servicesOffered: { type: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Service' 
        }], default: [] },
        profileCompleted: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
    }
);

const User = mongoose.model( "User", userSchema);

export { User };
