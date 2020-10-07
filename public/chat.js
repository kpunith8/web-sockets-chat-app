window.onload = function () {
  // Make connection from client
  var socket = io.connect('https://web-sockets-chat-app.herokuapp.com/');

  // Query DOM
  var message = document.getElementById('message');
  var handle = document.getElementById('handle');
  var btn = document.getElementById('send');
  var output = document.getElementById('output');
  var feedback = document.getElementById('feedback');

  // Emit events
  btn.addEventListener('click', function () {
    socket.emit('chat', {
      message: message.value,
      handle: handle.value
    });
    message.value = "";
  });

  // Execute a function when the user releases a key on the keyboard
  message.addEventListener("keyup", function(event) {
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Trigger the button element with a click
      btn.click();
    }
  });

  message.addEventListener('keypress', function () {
    socket.emit('typing', handle.value);
  });

  // Listen for events
  socket.on('chat', function (data) {
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
  });

  socket.on('typing', function (data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
  });
};
