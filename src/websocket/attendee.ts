/**
 * Defines the events the attendee (the person who is asking for help) will listen to
*/

import { Socket } from 'socket.io';

import { io } from '../http';
import CreateConnectionService from '../services/CreateConnectionService';
import CreateUserService from '../services/CreateUserService';
import FetchConnectionByUserIdService from '../services/FetchConnectionByUserIdService';
import FetchUserByEmailService from '../services/FetchUserByEmailService';
import UpdateConnectionService from '../services/UpdateConnectionSerivce';
import CreateMessageService from '../services/CreateMessageService';

// fired whenever an attendee connects
io.on('connect', (socket: Socket) => {
  const createConnectionService = new CreateConnectionService();

  const socket_id = socket.id;

  // list to event 'attendee_first_access' which is fired on the client-side (browser)
  socket.on('attendee_first_access', async params => {
    const { email, text } = params;

    const fetchUserByEmailService = new FetchUserByEmailService();
    const createUserService = new CreateUserService();
    const fetchConnectionByUserIdService = new FetchConnectionByUserIdService();
    const createMessageService = new CreateMessageService();

    // check if the user already is registered in the database based on its email
    let user = await fetchUserByEmailService.execute(email);
    if(!user){
      user = await createUserService.execute(email);
    }

    // Check if there is a connection for this user
    const connectionExists = await fetchConnectionByUserIdService.execute(user.id);
    if(connectionExists){
      const updateConnectionService = new UpdateConnectionService();
      await updateConnectionService.execute({
        id: connectionExists.id,
        socket_id,
      });
    }
    // otherwise, create a brand new connection to this user
    else
    {
      await createConnectionService.execute({
        socket_id,
        user_id: user.id
      });
    }

    // inserting the first message in the database
    await createMessageService.execute({
      text,
      user_id: user.id
    })
  });
});
