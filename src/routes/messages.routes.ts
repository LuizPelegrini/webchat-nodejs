/**
 * Messages Router
 */

import { Router } from "express";
import MessagesController from '../controllers/MessagesController';

const messagesController = new MessagesController();

const messagesRouter = Router();
messagesRouter.post('/', messagesController.create); // create a new message
messagesRouter.get('/:id', messagesController.list); // list all messages from a user

export default messagesRouter;
