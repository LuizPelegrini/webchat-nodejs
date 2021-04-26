import { getCustomRepository } from 'typeorm';
import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

class FetchUserByEmailService{
  public async execute(email: string): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);
    return await usersRepository.findByEmail(email);
  }
}

export default FetchUserByEmailService;
