/**
 * Controller to handle logic over the Settings entity
 */

import { Request, Response } from 'express';
import {getCustomRepository} from 'typeorm';
import SettingsRepository from '../repositories/SettingsRepository';

class SettingsController {
  public async create(request: Request, response: Response){
    const { chat, username } = request.body;
    const settingsRepository = getCustomRepository(SettingsRepository);

    const settings = settingsRepository.create({
      chat,
      username
    });

    // saving the settings into database
    await settingsRepository.save(settings);
    return response.json(settings);
  }
}

export default SettingsController;
