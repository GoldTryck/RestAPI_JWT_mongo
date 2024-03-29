import mongoose from "mongoose";
import User from "./user.model.js";
const taskSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

export default mongoose.model('Task', taskSchema)