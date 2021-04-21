/**
 * Repository to manipulate Settings table
 * */

import { Repository, EntityRepository } from 'typeorm';

import Setting from '../entities/Setting';

@EntityRepository(Setting)
class SettingsRepository extends Repository<Setting> {

}

export default SettingsRepository;
