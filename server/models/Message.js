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
    image: String,
    created_At: {
        type: Date,
        default: Date.now
    }
})


const Message = mongoose.model("Message", messageSchema, "message");
Message.createCollection();
export default Message;
