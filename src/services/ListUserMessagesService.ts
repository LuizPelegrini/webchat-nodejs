/**
 * Service to list all Messages from a User
 */

import { getCustomRepository } from 'typeorm';
import MessagesRepository from '../repositories/MessagesRepository';
import Message from '../entities/Message';

class ListUserMessagesService{
  async execute(user_id: string):Promise<Message[]>{
    const messagesRepository = getCustomRepository(MessagesRepository);

    // return all messages from a user
    const messages = await messagesRepository.find({
      where: {
        user_id
      },
      relations: ['user']
    });

    return messages;
  }
}

export default ListUserMessagesService;
