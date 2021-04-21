/**
 * Controller to receive the request regarding the Settings resource
 * and assign the logic to the corresponding service
 */

import { Request, Response } from 'express';
import CreateSettingsService from '../services/CreateSettingsService';

class SettingsController {
  public async create(request: Request, response: Response){
    const { chat, username } = request.body;

    // creating a service to create a settings register in the database
    const createSettingsService = new CreateSettingsService();

    try{
      const settings = await createSettingsService.execute({
        chat,
        username
      });
      return response.json(settings);
    }catch(err){
      // in case the user already exists
      return response.status(400).json({error: err.message});
    }
  }
}

export default SettingsController;
