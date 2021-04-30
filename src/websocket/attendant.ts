/**
 * Defines the events that the attendant (the person who is helping) will listen to
*/

import { Socket } from 'socket.io';
import { io } from '../http';
import FindAllConnectionsWithoutAdminService from '../services/FindAllConnectionsWithoutAdminService';
import ListUserMessagesService from '../services/ListUserMessagesService';
import FetchConnectionByUserIdService from '../services/FetchConnectionByUserIdService';
import CreateMessageService from '../services/CreateMessageService';
import UpdateConnectionService from '../services/UpdateConnectionSerivce';

// as soon as the attendant connects to the server...
io.on('connect', async (socket: Socket) => {
  const findAllConnectionsWithoutAdminService = new FindAllConnectionsWithoutAdminService();
  const listUserMessagesService = new ListUserMessagesService();
  const fetchConnectionByUserIdService = new FetchConnectionByUserIdService();
  const createMessageService = new CreateMessageService();
  const updateConnectionService = new UpdateConnectionService();

  // ...get all connections without an attendant
  const allConnectionsWithoutAdmin = await findAllConnectionsWithoutAdminService.execute();

  // instead of socket.emit, use io.emit to broadcast the event for all attendants that connected to the websocket server
  io.emit('attendant_list_all_users', allConnectionsWithoutAdmin);

  // listen for when the attendant clicks on the 'Assist'
  socket.on('attendant_list_messages_by_user', async(params, callback) => {
    const { user_id } = params;

    // retrieving all messages from the user
    const allMessages = await listUserMessagesService.execute(user_id);

    // returning them via callback
    callback(allMessages);
  });

  // event fired by the attendant front end when it sends a message
  socket.on('attendant_send_message', async(params) => {
    const { user_id, text } = params;

    // creating a new message
    await createMessageService.execute({
      text,
      user_id,
      admin_id: socket.id, // to simplify, the admin_id of message is the socket id in which the attendant is connected to
    });

    // find the socket in which the given user is connected to
    const { socket_id } = await fetchConnectionByUserIdService.execute(user_id);

    // sending to a specific socket (in which the user is connected to)
    io.to(socket_id).emit('attendee_receive_message', {
      text,
      socket_id: socket.id, // sending the attendant socket id, so the user can send message back
    });

  });

  // this event is called when the attendant clicks on the Assist button
  socket.on('attendant_in_call', async (params) => {
    const { user_id } = params;

    // set the admin for the connection that has this user_id
    await updateConnectionService.executeAdmin(user_id, socket.id);

    // tell all attendants to update their list of users without admin (e.g. waiting for assistance)
    const allConnectionsWithoutAdmin = await findAllConnectionsWithoutAdminService.execute();
    io.emit('attendant_list_all_users', allConnectionsWithoutAdmin);
  });
});
