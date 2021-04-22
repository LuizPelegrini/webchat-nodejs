/**
 * Defines the events the attendee (the person who is asking for help) will listen to
*/

import { Socket } from 'socket.io';

import { io } from '../http';

// fired whenever an attendee connects
io.on('connect', (socket: Socket) => {
  // list to event 'attendee_first_access' which is fired on the client-side (browser)
  socket.on('attendee_first_access', (name, fn) => {
    console.log('attendee accessed it first!');
    fn('returning some data...');
  });
});
