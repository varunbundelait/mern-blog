import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        // required: true
    },
    description: {
        type: String,
        // required:true
    },
    thumbnail: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    category: {
        type: String
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    isPublished:{
        type:Boolean,
        default:false
    }


}, { timestamps: true })

export const Blog = mongoose.model("Blog", blogSchema)