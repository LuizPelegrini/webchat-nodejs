/**
 * Controller to receive the request regarding the Messages resource
 * and assign the logic to the corresponding service
 */

import { Request, Response } from 'express';

import CreateMessageService from '../services/CreateMessageService';

class MessagesController {
  async create(request: Request, response: Response): Promise<Response>{
    const { admin_id, user_id, text } = request.body;

    // create a brand new message
    const createMessageService = new CreateMessageService();
    const newMessage = await createMessageService.execute({
      admin_id,
      user_id,
      text
    });

    return response.json(newMessage);
  }
}

export default MessagesController;
