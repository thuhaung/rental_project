import mongoose from "mongoose";

const chatroomSchema = mongoose.Schema({
    user: {
        type: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        validate: [(array) => array.length > 2, "Chatroom size exceeds 2 users."]
    }
});

const Chatroom = mongoose.model(chatroomSchema);
export default Chatroom;