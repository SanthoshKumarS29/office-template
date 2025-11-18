import mongoose from "mongoose";

const seoSchema = new mongoose.Schema({
    slug: {
        type:String,
        required: true,
        unique: true
    },
    metaTitle: {
        type: String
    },
    metaDescription: {
        type: String
    },
    metaKeyword: {
        type: String
    }
}, {timestamps: true})

export default mongoose.model("Seo", seoSchema)