document.querySelector("#start_chat").addEventListener("click", (event) => {
  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';


  const socket = io(); // establish a connection with server. URL defaults to the url of the server that served the page

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

  let socket_admin_id = null;

  // upon connecting to websocket...
  socket.on('connect', () => {
    // ...emit the first access event
    socket.emit('attendee_first_access', { email, text }, (call, err) => {
      if(err)
        console.error(err);
      else
        console.log(call)
    });
  });

  // upon receiving a list of messages from server...
  socket.on('attendee_list_all_messages', messages => {
    const message_user_template = document.getElementById('message-user-template').innerHTML;
    const message_admin_template = document.getElementById('admin-template').innerHTML;

    messages.forEach(message => {
      // if no admin_id in the message, it means the message has been sent from attendee
      if(message.admin_id === null){
        // get the template and render the values in their respective keys
        const rendered = Mustache.render(message_user_template, {
          message: message.text, // message is the variable between {{}} in the DOM
          email,
        });

        // inject the template in the 'messages' div
        document.getElementById('messages').innerHTML += rendered;
      }else{
        const rendered = Mustache.render(message_admin_template, {
          message_admin: message.text,
        });

        document.getElementById('messages').innerHTML += rendered;
      }
    });
  });

  // upon receiving a message from attendant
  socket.on('attendant_send_message', message => {
    // caching the socket id, so the attendee can reply to this socket
    socket_admin_id = message.socket_id;

    // rendering attendant message
    const template_admin = document.getElementById('admin-template').innerHTML;
    const rendered = Mustache.render(template_admin, {
      message_admin: message.text,
    });

    // and adding to the chat
    document.getElementById("messages").innerHTML += rendered;
  });
});
