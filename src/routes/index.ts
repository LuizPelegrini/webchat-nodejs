/**
 * Main routes file that delegates to the corresponding router, based on the requested resource
 */

import { Router } from 'express';

import settingsRouter from './settings.routes';
import usersRouter from './users.routes';

const routes = Router();
routes.use('/settings', settingsRouter); // settings router
routes.use('/users', usersRouter);

export default routes;
