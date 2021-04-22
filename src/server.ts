import { http } from './http';
import './websocket/attendee';

// let HTTP server running instead of express
http.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});

