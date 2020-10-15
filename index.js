
const express = require('express');
var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.use(express.static('public'));
let rooms = {};

io.on('connect', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(socket);
    socket.broadcast.emit('chat message', msg);
  });
});

app.get('/', (req, res) => {
  res.sendFile('static/Chat/index.html');
});

app.get('/get-rooms', (req, res) => {
  res.send(rooms);
});

app.post('/create-room', (req, res) => {
  const formData = req.query;
  rooms[formData.roomName] = {
    currentMembers : 0
  }
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
