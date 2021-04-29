// if attendant access the webpage, connect it immediatelly
const socket = io();
let connectionsUsers = [];

// websocket server will emit 'attendant_list_all_users' as soon as any attendant connects to the websocket server
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

// function to be called when attendant chooses an attendee
function call(socket_id){
  const { user, user_id } = connectionsUsers.find(connection => connection.socket_id === socket_id);

  const admin_template = document.getElementById('admin_template').innerHTML;
  const rendered = Mustache.render(admin_template, {
    email: user.email,
    id: user_id
  });

  document.getElementById('supports').innerHTML += rendered;

  const params = {
    user_id,
  };
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
  createDiv.innerHTML = `Attendant: <span>${inputEl.value}</span>`;
  createDiv.innerHTML += `<span class="admin_date">${dayjs(
    Date.now()
  ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
  divMessagesEl.appendChild(createDiv);

  // clearing the input
  inputEl.value = '';
}
