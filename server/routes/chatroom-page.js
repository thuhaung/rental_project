import express from 'express';
import * as chatroomController from '../controllers/chatroom-page.js'
import { authenticateToken } from '../middleware/authorization.js';

const chatroomRouter = express.Router();


chatroomRouter.get('/conversation/:userId', chatroomController.getConversations);
chatroomRouter.post('/conversation',  chatroomController.newConversation);
chatroomRouter.get('/message/:conversationId', chatroomController.getMessages);
chatroomRouter.post('/message', chatroomController.newMessage);
chatroomRouter.get(`/conversation/:id/latest-message`, chatroomController.getLatestMessage);


export default chatroomRouter;
