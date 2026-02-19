import mongoose from "mongoose";

const Career = new mongoose.Schema({
    name:{type: String, required: true},
    email: { type : String, required: true},
    phoneNumber: { type: String, required: true},
    countryCode: { type: String, required: true},

    jobRole: { type: String, required: true},
    experience: { type: String, required: true},

    resume: { type: String},
    createdAt: {
        type: Date, 
        default: Date.now
    }
})

export default mongoose.model("career", Career)