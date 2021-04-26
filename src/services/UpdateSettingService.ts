/**
 * Service to update a Setting in the database
 */


import { getCustomRepository } from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepository';

class UpdateSettingService{
  public async execute(username: string, chat: boolean): Promise<void>{
    const settingsRepository = getCustomRepository(SettingsRepository);
    await settingsRepository.updateByUsername(username, chat);
  }
}

export default UpdateSettingService;
