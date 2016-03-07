var app = require('express')();

app.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html');
});

var port = process.env.port || 8080;

var server = app.listen(port, () => {
  console.log("listening on port", port);
});

var io = require('socket.io')(server);

io.on('connection', socket => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('a user disconnected');
  })

  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});