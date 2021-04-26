import { getCustomRepository } from "typeorm";
import Connection from "../entities/Connection";
import ConnectionsRepository from '../repositories/ConnectionsRepository';

class FetchConnectionByUserIdService{
  public async execute(user_id):Promise<Connection>{
    const connectionsRepository = getCustomRepository(ConnectionsRepository);
    const connection = await connectionsRepository.findByUserId(user_id);
    return connection;
  }
}

export default FetchConnectionByUserIdService;
