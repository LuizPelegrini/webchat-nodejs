// if attendant access the webpage, connect it immediatelly
const socket = io();
let connectionsUsers = [];
let connectionsInSupport = [];

// websocket server will emit 'attendant_list_all_users' to update the list of users not yet assisted by an attendant
socket.on('attendant_list_all_users', connections => {
  connectionsUsers = connections; // cache the connections
  const listUsersEl = document.getElementById('list_users');
  const template = document.getElementById('template').innerHTML;

  // clear the list first
  listUsersEl.innerHTML = '';

  connections.forEach(connection => {
    const rendered = Mustache.render(template, {
      id: connection.socket_id,
      email: connection.user.email,
    });

    listUsersEl.innerHTML += rendered;
  });
});

// fired by the attendee websocket when it sends a message
socket.on('attendant_receive_message', params => {
  const {
    message: { text, user_id, created_at },
    attendee_socket_id
  } = params;

  // find the user among the connections currently in support
  const { user } = connectionsInSupport.find(connection => connection.socket_id === attendee_socket_id);

  const divMessages = document.getElementById(`allMessages${user_id}`);
  const createDiv = document.createElement('div');

  createDiv.className = "admin_message_client";

  const divEl = document.createElement('div');
  divEl.innerHTML = `<span>${user.email} </span>`;
  divEl.innerHTML += `<span>${text}</span>`;
  divEl.innerHTML += `<span class="admin_date">${dayjs(created_at).format("DD/MM/YYYY HH:mm:ss")}</span>`;
  createDiv.append(divEl);
  divMessages.appendChild(createDiv);

  // move the scroll to the bottom, so the recently received message is easily visible
  divMessages.scrollTop = divMessages.scrollHeight;
});

function call(socket_id){
  const connection = connectionsUsers.find(connection => connection.socket_id === socket_id);
  connectionsInSupport.push(connection);
  const { user, user_id } = connection;

  const admin_template = document.getElementById('admin_template').innerHTML;
  const rendered = Mustache.render(admin_template, {
    email: user.email,
    id: user_id
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id
  };

  // request attendant websocket to update the connection (by setting the admin_id to the connection)
  socket.emit('attendant_in_call', params);

  // request all messages from this user
  socket.emit('attendant_list_messages_by_user', params, messages => {
    const divMessages = document.getElementById(`allMessages${user_id}`);

    // show the messages
    messages.forEach((message) => {
      const createDiv = document.createElement('div');

      if (message.admin_id === null) {
        createDiv.className = "admin_message_client";

        const divEl = document.createElement('div');
        divEl.innerHTML = `<span>${user.email} </span>`;
        divEl.innerHTML += `<span>${message.text}</span>`;
        divEl.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
        createDiv.append(divEl);
        divMessages.appendChild(createDiv);
      } else {
        createDiv.className = "admin_message_admin";

        const divEl = document.createElement('div');
        divEl.innerHTML = `Attendant: <span>${message.text}</span>`;
        divEl.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;

        createDiv.append(divEl);
        divMessages.appendChild(createDiv);
      }

    });
  });
}

function sendMessage(user_id){
  const inputEl = document.getElementById(`send_message_${user_id}`);
  const params = {
    text: inputEl.value,
    user_id,
  };

  // send message to websocket server (which will forward to the specific user, e.g the socket which this user is connected to)
  socket.emit('attendant_send_message', params);

  // creating attendant message balloon in the chat
  const divMessagesEl = document.getElementById(`allMessages${user_id}`);
  const createDiv = document.createElement('div');
  createDiv.className = "admin_message_admin";

  const divEl = document.createElement('div');
  divEl.innerHTML = `Attendant: <span>${inputEl.value}</span>`;
  divEl.innerHTML += `<span class="admin_date">${dayjs(
    Date.now()
  ).format("DD/MM/YYYY HH:mm:ss")}</span>`;

  createDiv.append(divEl);
  divMessagesEl.appendChild(createDiv);

  // clearing the input
  inputEl.value = '';

  // move the scroll to the bottom, so the recently received message is easily visible
  divMessagesEl.scrollTop = divMessagesEl.scrollHeight;
}
