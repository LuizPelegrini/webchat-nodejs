import { http } from './http';
import './websocket/attendee';
import './websocket/attendant';

// let HTTP server running instead of express
http.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});

