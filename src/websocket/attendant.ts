/**
 * Defines the events that the attendant (the person who is helping) will listen to
*/

import { Socket } from 'socket.io';
import { io } from '../http';
import FindAllConnectionsWithoutAdminService from '../services/FindAllConnectionsWithoutAdminService';

// as soon as the attendant connects to the server...
io.on('connect', async (socket: Socket) => {
  // ...get all connections without an attendant
  const findAllConnectionsWithoutAdminService = new FindAllConnectionsWithoutAdminService();
  const allConnectionsWithoutAdmin = await findAllConnectionsWithoutAdminService.execute();

  // instead of socket.emit, use io.emit to broadcast the event for all attendants that connected to the websocket server
  io.emit('attendant_list_all_users', allConnectionsWithoutAdmin);
});
