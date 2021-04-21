/**
 * Settings Router
 */

import { Router } from "express";
import SettingsController from "../controllers/SettingsController";

const settingsRouter = Router();
const settingsController = new SettingsController();

settingsRouter.post('/', settingsController.create); // create a new settings

export default settingsRouter;
