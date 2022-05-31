import Conversation from "../models/conversation.js";
import Message from "../models/message.js";

export const newConversation = async (req, res) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId],
        rental: req.body.rentalId
    })
    try {
        const conversation = await Conversation.find({ "members": newConversation.members });
        if (conversation.length == 0) {
            try {
                const savedConversation = await newConversation.save();
                res.status(200).json(savedConversation)
            } catch (error) {
                res.status(500).json("Cannot save.");
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
        const conversationId = savedMessage.conversation;
        await Conversation.findByIdAndUpdate(conversationId, {latest_message: {text: savedMessage.text, sender: savedMessage.sender}});
        res.status(200).json(savedMessage);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getMessages = async (req, res) => {
    try {
        const messages = await Message.find({
            conversation: req.params.conversationId,
        })
        res.status(200).send(messages);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getLatestMessage = async (req, res) => {
    const conversationId = req.params.id;
    if (conversationId) {
        try {
            const conversation = await Conversation.findOne({_id: conversationId});
            const messageId = conversation.latest_message;
            const message = await Message.findOne({_id: messageId});
            res.status(200).send(message);
        } catch (error) {
            res.status(500).json(error);
        }
    }
}