import mongoose from "mongoose";

const chatroomSchema = mongoose.Schema({
    user: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        validate: [(array) => array.length > 2, "Chatroom size exceeds 2 users."]
    },
    messages: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        content: String,
        image: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
});

const Chatroom = mongoose.model(chatroomSchema);
export default Chatroom;