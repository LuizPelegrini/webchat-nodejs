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
import ListUserMessageService from '../services/ListUserMessagesService';
import FindAllConnectionsWithoutAdminService from '../services/FindAllConnectionsWithoutAdminService';

interface IParams{
  text: string;
  email: string;
}

// fired whenever an attendee connects
io.on('connect', (socket: Socket) => {
  const createConnectionService = new CreateConnectionService();
  const createMessageService = new CreateMessageService();

  const socket_id = socket.id;
  let user = null;

  // list to event 'attendee_first_access' which is fired on the client-side (browser)
  socket.on('attendee_first_access', async params => {
    const { email, text } = params as IParams;

    const fetchUserByEmailService = new FetchUserByEmailService();
    const createUserService = new CreateUserService();
    const fetchConnectionByUserIdService = new FetchConnectionByUserIdService();
    const listUserMessageService = new ListUserMessageService();
    const findAllConnectionsWithoutAdminService = new FindAllConnectionsWithoutAdminService();

    // check if the user already is registered in the database based on its email
    user = await fetchUserByEmailService.execute(email);
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
    });

    // get all messages from this user to show in the chat history
    const allMessages = await listUserMessageService.execute(user.id);

    // emit event so frontend can list all messages
    socket.emit('attendee_list_all_messages', allMessages);

    const allConnectionsWithoutAdmin = await findAllConnectionsWithoutAdminService.execute();
    // broadcast to all attendants a connection has been created/updated
    io.emit('attendant_list_all_users', allConnectionsWithoutAdmin);
  });

  // when attendee frontend send a message
  socket.on('attendee_send_message', async params => {
    const { text, socket_admin_id } = params;

    // adding message to database
    const message = await createMessageService.execute({
      text,
      user_id: user.id
    });

    // forwarding the text to the corresponding attendant socket
    io.to(socket_admin_id).emit('attendant_receive_message', {
      message,
      attendee_socket_id: socket_id,
    });
  });
});
