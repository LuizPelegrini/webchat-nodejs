/**
 * Controller to receive requests regarding the User resource
 * and assign the logic to the corresponding service
 */
import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

class UsersController {
  async create(request: Request, response: Response): Promise<Response>{
    const { email } = request.body;

    // creating or returning an existing user
    const createUserService = new CreateUserService();
    const user = await createUserService.execute(email);

    return response.json(user);
  }
}

export default UsersController;
