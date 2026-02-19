import mongoose from "mongoose";

const quickLeadSchema =  new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    },
    countryCode: String,

    purpose: {
        type: String,
        required: true
    },

    pageSource: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('QuickLead', quickLeadSchema)