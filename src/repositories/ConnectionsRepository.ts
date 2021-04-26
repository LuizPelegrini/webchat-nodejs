/**
 * Repository to manipulate Connections table
 * */


import { Repository, EntityRepository } from 'typeorm';
import Connection from '../entities/Connection';

@EntityRepository(Connection)
class ConnectionsRepository extends Repository<Connection>{
  public async findByUserId(user_id: string): Promise<Connection>{
    return this.findOne({
      where: {
        user_id,
      }
    });
  }

}

export default ConnectionsRepository;
