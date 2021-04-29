import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import path from 'path';
import ejs from 'ejs';

import './database'; // create database connection
import routes from './routes';

// initializing express
const app = express();

//-------  IMPORTANT -------
// in order to serve our static files under public directory
app.use(express.static(path.join(__dirname, '..', 'public'))); // allow express to serve our static files under public folder
app.set('views', path.join(__dirname, '..', 'public')); // set a variable call 'views' that once accessed will return the directory of our files
app.engine('html', ejs.renderFile); // for html files, before returning them, EJS template engine must render the page (e.g. insert data into the HTML)
app.set('view engine', 'html'); // set variable 'view engine'

//-------  IMPORTANT -------
const http = createServer(app); // creating an http server from express
const io = new Server(http); // creating a WebSocket server in the HTTP server

//-------  IMPORTANT -------
// whenever a new connection is established with this socket server, this event is fired
io.on('connection', (socket: Socket) => {
  console.log('A new user connected, socket id: ', socket.id);
});

// to return the Attendee page
app.get('/pages/client', (request, response) => {
  return response.render('html/client.html'); // as it is returning an .html file, the template engine will be triggered to render the page
});

// to return the Attendant page
app.get('/pages/admin', (request, response) => {
  return response.render('html/admin.html'); // as it is returning an .html file, the template engine will be triggered to render the page
});

app.use(express.json()); // to make express handle json data upon receiving a request
app.use(routes);

export { http, io };
