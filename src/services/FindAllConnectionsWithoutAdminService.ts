/**
 * Service to return all connections without an Attendant (admin)
 */

import Connection from '../entities/Connection';
import { getCustomRepository } from 'typeorm';
import ConnectionsRepository from '../repositories/ConnectionsRepository';

class FindAllConnectionsWithoutAdminService{
  async execute(): Promise<Connection[]>{
    const connectionsRepository = getCustomRepository(ConnectionsRepository);

    const connectionsWithoutAttendant = await connectionsRepository.find({
      where:{ admin_id: null}, // bring all connections without admin
      relations: ['user'], // bring the user information as well
    });

    return connectionsWithoutAttendant;
  }
}

export default FindAllConnectionsWithoutAdminService;
