import mongoose from "mongoose";

const rentalSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    property_type: {
        type: String,
        required: true,
        enum: ["Apartment", "Room", "House"]
    },
    num_of_bedrooms: {
        type: Number,
        required: true,
        default: 0
    },
    images: [{
        type: String
    }],
    num_of_bathrooms: {
        type: Number,
        required: true,
        default: 1
    },
    amenities: [{
        type: String,
        enum: ["TV", "Kitchen", "Parking", "Washer", "AC", "Fridge", "Wifi", "Air conditioning"]
    }],
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    rent: {
        type: Number,
        required: true
    },
    deposit: {
        type: Number,
        required: true
    },
    electricity: {
        type: Number,
        required: true
    },
    water: {
        type: Number,
        required: true
    },
    is_available: {
        type: Boolean,
        default: true
    },
    review: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    },
    address: {
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
            required: true,
            enum: ["Ho Chi Minh City", "Hanoi"]
        },
        location: {
            type: {
                type: String, 
                enum: ["Point"]
            },
            coordinates: [Number]
        }
    }
})

const Rental = mongoose.model("Rental", rentalSchema, "rental");
Rental.createCollection();
export default Rental;