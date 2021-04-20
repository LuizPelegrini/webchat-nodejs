import express from 'express';
import './database'; // create database connection

// initializing express
const app = express();

app.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});

app.get('/', (request, response) => {
  return response.json({message: 'ola NLW 05!'});
});

app.post('/', (request, response) => {

});
