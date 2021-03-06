/**
 * Controller to receive the request regarding the Settings resource
 * and assign the logic to the corresponding service
 */

import { Request, Response } from 'express';
import CreateSettingsService from '../services/CreateSettingsService';
import FetchSettingsByUsernameService from '../services/FetchSettingsByUsernameService';
import UpdateSettingService from '../services/UpdateSettingService';

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

  // used when the page is loaded, so we need to check whether or not the chat feature is enabled for the application
  public async index(request: Request, response: Response){
    const { username } = request.params;

    const fetchSettingsByUsernameService = new FetchSettingsByUsernameService();
    const settings = await fetchSettingsByUsernameService.execute(username);

    return response.json(settings);
  }

  // just adding a way so we can change the settings via a route
  public async update(request: Request, response: Response){
    const { username } = request.params;
    const { chat } = request.body;

    const updateSettingService = new UpdateSettingService();
    await updateSettingService.execute(username, chat);

    return response.json({ message: 'settings changed'});
  }
}

export default SettingsController;
