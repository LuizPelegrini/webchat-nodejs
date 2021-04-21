/**
 * Service to create a new Message in the database
 */

import { getCustomRepository } from 'typeorm';
import Message from '../entities/Message';
import MessagesRepository from '../repositories/MessagesRepository';

// Data to be received from request
interface IRequestDTO{
  admin_id?: string; // optional. as the admin might not immediatelly join the chat
  user_id: string;
  text: string;
}

class CreateMessageService{
  async execute({admin_id, user_id, text}: IRequestDTO): Promise<Message>{
    const messagesRepository = getCustomRepository(MessagesRepository);
    const message = messagesRepository.create({
      admin_id,
      text,
      user_id
    });

    // saving the message into database
    await messagesRepository.save(message);

    return message;
  }
}

export default CreateMessageService;
