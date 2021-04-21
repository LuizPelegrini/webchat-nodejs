/**
 * User Router
 * */

import { Router } from "express";
import UsersController from "../controllers/UsersController";

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', usersController.create); // create a new user

export default usersRouter;
