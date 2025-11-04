import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true
    },
    slug: {
        type:String,
        requird: true,
        unique: true,
        index: true
    },
    category: {
        type:String,
        default: ''
    },
    description: {
        type:String,
        default: ''
    },
    image: {
        type:String,
        default: ''
    },
    content: {
        type: String,
        default: ''
    },

    status: {
        type: String,
        enum : ["draft","published"],
        default: "draft"
    }


}, {timestamps: true})

export default mongoose.model("Blog", blogSchema)