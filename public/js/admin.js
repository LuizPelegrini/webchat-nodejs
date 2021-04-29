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

    messages.forEach((message) => {
      const createDiv = document.createElement('div');

      if (message.admin_id === null) {
        createDiv.className = "admin_message_client";

        createDiv.innerHTML = `<span>${user.email} </span>`;
        createDiv.innerHTML += `<span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date">${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}</span>`;
      } else {
        createDiv.className = "admin_message_admin";

        createDiv.innerHTML = `Attendant: <span>${message.text}</span>`;
        createDiv.innerHTML += `<span class="admin_date>${dayjs(
          message.created_at
        ).format("DD/MM/YYYY HH:mm:ss")}`;
      }

      divMessages.appendChild(createDiv);
    });
  });
}
