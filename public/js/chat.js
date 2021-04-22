document.querySelector("#start_chat").addEventListener("click", (event) => {
  const chat_help = document.getElementById('chat_help');
  chat_help.style.display = 'none';

  const chat_in_support = document.getElementById('chat_in_support');
  chat_in_support.style.display = 'block';


  const socket = io(); // establish a connection with server. URL defaults to the url of the server that served the page

  const email = document.getElementById('email').value;
  const text = document.getElementById('txt_help').value;

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
});
