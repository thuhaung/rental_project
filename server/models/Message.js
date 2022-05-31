import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    conversation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation"
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    text: {
        type: String,
        maxLength: 200
    },
    contains_image: {
        type: Boolean,
        default: false
    },
    created_At: {
        type: Date,
        default: Date.now
    },
    seen: {
        type: Boolean,
        default: false
    }
})


const Message = mongoose.model("Message", messageSchema, "message");
Message.createCollection();
export default Message;
