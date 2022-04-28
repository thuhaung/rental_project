import mongoose from "mongoose";
import mongooseUniqueValidator from "mongoose-unique-validator";
import GeoJSON from "mongoose-geojson-schema";

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
    reviews: [{
        type: Schema.Types.ObjectId, ref: "Review"
    }],
    chatrooms: [{
        type: Schema.Types.ObjectId, ref: "Chatroom"
    }],
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
        geometry: {
            coordinates: {
                type: [Number],
                index: "2dsphere"
            }
        }
    }
});



userSchema.plugin(mongooseUniqueValidator);
const User = mongoose.model("User", userSchema);

export default User;