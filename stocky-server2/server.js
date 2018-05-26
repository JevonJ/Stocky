const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

//Our local port
const port = 4001;

const app = express();

//our server instance
const server = http.createServer(app);

//this creates a socker using the server instance
const io = socketIO(server);

io.on('connection', socket => {
    console.log('New User Connected');

    socket.on('change color', (color) => {
      console.log('Color Changed to: ', color);
      io.sockets.emit('change color', color);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(port, ()=> console.log(`Listening on port ${port}`));
