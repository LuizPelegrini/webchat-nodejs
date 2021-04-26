import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User>{
  public async findByEmail(email: string): Promise<User>{
    const user = await this.findOne({
      where: {
        email,
      }
    });
    return user;
  }
}

export default UsersRepository;
