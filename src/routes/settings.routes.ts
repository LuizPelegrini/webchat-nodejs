/**
 * Settings Router
 */

import { Router } from "express";
import SettingsController from "../controllers/SettingsController";

const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.post('/', settingsController.create); // create a new settings
settingsRouter.get('/:username', settingsController.index); // get the settings for a specific username

export default settingsRouter;
