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
}

export default SettingsRepository;
