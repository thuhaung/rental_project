import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    })
    try {
        const conversation = await Conversation.find({ "members": newConversation.members });
        if (conversation.length == 0) {
            try {
                const savedConversation = await newConversation.save();
                res.status(200).json(savedConversation)
            } catch (error) {
                res.status(500).json('Cannot saved');
            }
        }
        else {
            res.status(200).json(conversation);
        }
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            members: { $in: [req.params.userId] }
        })
        res.status(200).json(conversations);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const newMessage = async (req, res) => {
    const newMessage = new Message(req.body);
    try {
        const savedMessage = await newMessage.save();
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}