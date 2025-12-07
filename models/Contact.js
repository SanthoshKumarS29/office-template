import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true
    },
    countryCode: String,
    phoneNumber: String,
    message: String,
    formType: {
        type: String,
        enum: ['contact', 'footer'],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('Contact', contactSchema)