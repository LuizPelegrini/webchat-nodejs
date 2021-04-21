/**
 * Service to create a new Settings in the database
 */

import { getCustomRepository } from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepository';
import Setting from '../entities/Setting';

// Data to be received from request
interface IRequestDTO{
  chat: boolean;
  username: string;
}

class CreateSettingsService {
  async execute({ chat, username }:IRequestDTO): Promise<Setting>{
    const settingsRepository = getCustomRepository(SettingsRepository);

    // SELECT * FROM settings WHERE username="username" LIMIT 1;
    const userAlreadyExists = await settingsRepository.findOne({username});

    if(userAlreadyExists){
      throw new Error('Settings for this user already exists');
    }

    const settings = settingsRepository.create({
      chat,
      username
    });

    // saving the settings into database
    await settingsRepository.save(settings);
    return settings;
  }
}

export default CreateSettingsService;
