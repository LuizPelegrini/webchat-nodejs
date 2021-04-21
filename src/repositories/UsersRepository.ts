import User from '../entities/User';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(User)
class UsersRepository extends Repository<User>{

}

export default UsersRepository;
