/**
 * Router file to specify the routes of the application
 */

import { Router } from 'express';
import SettingsController from './controllers/SettingsController';

const routes = Router();

// Controllers
const settingsController = new SettingsController();

routes.post('/settings', settingsController.create);

export default routes;
