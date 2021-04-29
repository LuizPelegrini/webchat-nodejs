/**
 * Defines the events that the attendant (the person who is helping) will listen to
*/

import { Socket } from 'socket.io';
import { io } from '../http';
import FindAllConnectionsWithoutAdminService from '../services/FindAllConnectionsWithoutAdminService';
import ListUserMessagesService from '../services/ListUserMessagesService';

// as soon as the attendant connects to the server...
io.on('connect', async (socket: Socket) => {
  const findAllConnectionsWithoutAdminService = new FindAllConnectionsWithoutAdminService();
  const listUserMessagesService = new ListUserMessagesService();

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
});
