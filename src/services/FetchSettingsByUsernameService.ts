import { getCustomRepository } from 'typeorm';

import SettingsRepository from '../repositories/SettingsRepository';
import Setting from '../entities/Setting';

class FetchSettingsByUsernameService{
  public async execute(username: string):Promise<Setting>{
    const settingsRepository = getCustomRepository(SettingsRepository);
    return settingsRepository.findByUsername(username);
  }
}

export default FetchSettingsByUsernameService;
