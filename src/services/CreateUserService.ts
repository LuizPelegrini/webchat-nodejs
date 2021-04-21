/**
 * Service to create a new User if it does not exist in the database. Otherwise, return an existing one
 */
import { getCustomRepository } from 'typeorm';

import User from '../entities/User';
import UsersRepository from '../repositories/UsersRepository';

class CreateUserService {
  async execute(email: string): Promise<User>{
    const usersRepository = getCustomRepository(UsersRepository);

    // if user already exists, return it
    const userAlreadyExists = await usersRepository.findOne({email});
    if(userAlreadyExists){
      return userAlreadyExists;
    }

    // otherwise, create a new one
    const newUser = usersRepository.create({email});
    await usersRepository.save(newUser);

    return newUser;
  }
}

export default CreateUserService;
