<h1 align="center">Chatty</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=8257E5&labelColor=000000">
</p>

<br>

## ✨ Technologies

This project was developed using the following technologies during the 5th NextLevelWeek.

- [Node.js](https://nodejs.org/en/)
- [Typescript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/pt-br/)
- [Socket.io](https://socket.io/)

## 💻 Project

Chatty is realtime application that allows a user to communicate with an attendant (admin) using the Websocket Protocol.

## 🚀 How to run:

- Clone this repository
- If you don't have the `database.sqlite` file inside the `src/database` folder, create one and run `yarn typeorm migration:run` to create the database tables.
- Run `yarn dev` to start the application.

All set! The application will be available at `http://localhost:3333`

- To open client view, use `http://localhost:3333/pages/client`
- To open administrator view, use `http://localhost:3333/pages/admin`
