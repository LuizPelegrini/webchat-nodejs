import express from 'express';
import './database'; // create database connection
import routes from './routes';

// initializing express
const app = express();

app.use(express.json()); // to make express handle json data upon receiving a request
app.use(routes);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});

