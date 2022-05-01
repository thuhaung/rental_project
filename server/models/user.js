import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    middle_name: String,
    last_name: {
        type: String,
        required: true
    },
    birthdate: Date,
    email: {
        type: String,
        trim: true,
        required: true,
        minLength: 10,
        maxLength: 255 
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        maxLength: 20
    },
    phone: {
        type: String,
        required: true,
        trim: true,
        minLength: 10,
        maxLength: 10
    },
    profile_pic: String,
    is_verified: {
        type: Boolean,
        default: false
    },
    verification: {
        verification_pic: String,
        government_id: {
            type: String,
            trim: true,
            minLength: 9,
            maxLength: 12
        }
    },
    total_ratings: {
        type: Number,
        default: 0
    },
    rating_count: {
        type: Number,
        default: 0
    },
    reviews: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    chatrooms: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chatroom"
    },
    timestamps: {
        createdAt: "create_at",
        updatedAt: "updated_at"
    },
    location: {
        num: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        ward: String,
        district: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        loc: {
            type: {
                type: String,
                enum: ["Point"]
            },
            coordinates: [Number],
        }
    }
});


userSchema.plugin(mongooseUniqueValidator);
userSchema.index({"loc": "2dsphere"});
const User = mongoose.model("User", userSchema);

export default User;