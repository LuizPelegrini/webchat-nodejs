/**
 * Service to update a Connection in the database
 */


import { getCustomRepository } from 'typeorm';
import Connection from '../entities/Connection';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

interface IRequestDTO{
  id: string;
  socket_id: string;
}

class UpdateConnectionService{
  public async execute({id, socket_id} : IRequestDTO): Promise<Connection>{
    const connectionsRepository = getCustomRepository(ConnectionsRepository);
    const connection = await connectionsRepository.findOne({
      where: {
        id,
      }
    });
    connection.socket_id = socket_id;

    await connectionsRepository.save(connection);
    return connection;
  }

  // updates connection admin_id based on the user_id
  public async executeAdmin(user_id: string, admin_id: string): Promise<void>{
    const connectionsRepository = getCustomRepository(ConnectionsRepository);
    await connectionsRepository
      .createQueryBuilder()
      .update(Connection)
      .set({admin_id})
      .where('user_id = :user_id', {
        user_id
      })
      .execute();
  }
}

export default UpdateConnectionService;
