var express = require('express');
var socket = require('socket.io');

var app = express();

// Static files access
app.use(express.static('public'));
var port = process.env.PORT || 5000;
var server = app.listen(port, () => {
  console.log('Server running at port: ' + port);
});

// Socket setup
var io = socket(server);

io.on('connection', (socket) => {
  // console.log('Socket connection made', socket.id);

  // Handle chat event
  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });

  // Handle typing event
  socket.on('typing', function (data) {
    socket.broadcast.emit('typing', data);
  });
});
