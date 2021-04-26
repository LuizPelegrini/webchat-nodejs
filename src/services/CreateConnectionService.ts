/**
 * Service to create a new Connection in the database
 */

import { getCustomRepository } from 'typeorm';

import ConnectionsRepository from '../repositories/ConnectionsRepository';
import Connection from '../entities/Connection';

interface IRequestDTO{
  id?: string;
  admin_id?:string;
  socket_id:string;
  user_id: string;
}

class CreateConnectionService{
  public async execute({ id, admin_id, user_id, socket_id }: IRequestDTO): Promise<Connection>{
    const connectionRepository = getCustomRepository(ConnectionsRepository);
    const connection = connectionRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    });

    await connectionRepository.save(connection);

    return connection;
  }
}

export default CreateConnectionService;
