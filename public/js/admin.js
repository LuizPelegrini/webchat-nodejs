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

function call(socket_id){
  const { user, user_id } = connectionsUsers.find(connection => connection.socket_id === socket_id);

  const admin_template = document.getElementById('admin_template').innerHTML;
  const rendered = Mustache.render(admin_template, {
    email: user.email,
    id: user_id
  });

  document.getElementById('supports').innerHTML += rendered;
}
