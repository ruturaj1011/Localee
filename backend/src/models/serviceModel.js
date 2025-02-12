import mongoose, { Schema } from "mongoose";

const serviceSchema = new Schema({
    serviceName: { type: String, required: true },
    category: { type: String, required: true },
    heroImg: { type: String },
    images: [{ type: String }],
    description: { type: String },
    email: { type: String, required: true },
    whatsappNumber: { type: String, required: true },
    contactNumber: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    location: { type: { type: String, enum: ["Point"], default: "Point" }, coordinates: [Number] },
    reviews: {
        type: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' 
        }],
        default: []
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }
});
serviceSchema.index({ location: "2dsphere" });

const Service = mongoose.model("Service", serviceSchema);

export { Service };