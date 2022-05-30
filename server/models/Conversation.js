import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    members: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
    },
    latest_message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message"
    },
    created_At: {
        type: Date,
        default: Date.now
    },
    rental: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rental"
    }
})


const Conversation = mongoose.model("Conversation", conversationSchema, "conversation");
Conversation.createCollection();
export default Conversation;
