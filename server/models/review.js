import mongoose from "mongoose";

const reviewSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comment: {
        type: String,
        maxLength: 500
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    }
})

const Review = mongoose.model(reviewSchema);
export default Review;