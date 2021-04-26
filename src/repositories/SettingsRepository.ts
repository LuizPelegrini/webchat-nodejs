/**
 * Repository to manipulate Settings table
 * */

import { Repository, EntityRepository } from 'typeorm';

import Setting from '../entities/Setting';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {
  public async findByUsername(username: string): Promise<Setting>{
    const settings = this.findOne({
      where: {
        username,
      }
    });

    return settings;
  }

  // using another way to update a specific register using TypeORM query builder
  public async updateByUsername(username: string, chat: boolean): Promise<void>{
    await this.createQueryBuilder()
      .update(Setting)
      .set({chat})
      .where('username = :username', {username})
      .execute();
  }
}

export default SettingsRepository;
