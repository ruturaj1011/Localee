import mongoose, {Schema} from "mongoose";

const serviceSchema = new Schema({

    serviceName : { type : String, required : true},
    category : { type: String, required : true },
    heroImg : {type: String},
    images : [{ type: String }],
    reviews : {
        type: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Review' 
        }],
        default: []
    },
    address: {type: String},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    }
})

const Service = mongoose.model("Service", serviceSchema);

export { Service};